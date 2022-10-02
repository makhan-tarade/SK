const { Timestamp } = require("mongodb");
const date = require('date-and-time');
const { events, events_discussion } = require("../models/eventsModel");
var User = require("../models/model");
const { district, area_pincode } = require('../models/areaPincodeModel');
const { posts } = require('../models/communitiesModel1');

const { friend_requests } = require('../models/myprofileModel');



// events Registraion
exports.create_events = (req, res, next) => {

  var pincode_list = new Array();

  const { district, pincode } = req.body;



  var data = new events({
    user: req.session.userId,
    event_image: 'media/' + req.file.filename,
    event_name: req.body.event_name,
    time_zone: req.body.time_zone,
    start_date: req.body.start_date,
    start_time: req.body.start_time,
    end_date: req.body.end_date,
    end_time: req.body.end_time,
    description: req.body.description,
    visibility: req.body.visibility,
    event_type: req.body.event_type,
    targeted_audience: req.body.targeted_audience,
    reg_or_brod_link: req.body.reg_or_brod_link,
    broadcast: req.body.broadcast,    
    created: new Date(),
  });

  if (pincode) {
    for (var j = 0; j < req.body.pincode.length; j++) {
      pincode_list[j] = req.body.pincode[j];
    }
    data.district = district;
    data.pincode = pincode_list;
  }

  data.save()
    .then(() => {
      //res.status(201).json(events);
      // res.status(201).redirect("/events");
      res.status(201).redirect(req.get('referer'));
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });

};

// find events all
exports.events_find_all = async (req, res) => {

  const userId = req.session.secondUserId ? req.session.secondUserId : req.session.userId;

  // find user data (profile , contact, etc)
  const user_data = await User.findById(userId).exec();

  const username = user_data.fname + ' ' + user_data.lname;
  const myid = userId;

  // find first user data (profile , contact, etc)
  const user = await User.findById(req.session.userId).exec();


  const users = await User.find().exec();

  // find events
  const events_data = await events.find({ user: userId }).exec();

  // find area district
  const dist = await district.find().exec();

  const my_kon = await User.findById(req.session.userId)
        .populate({ path: 'konnects.user', select: ['_id', 'fname', 'lname', 'profile_pic', 'mobile', 'address'] }).exec();

    // frient request list
    const fri_req_list = await friend_requests.find({ reciever: req.session.userId })
        .populate({ path: 'sender', select: ['_id', 'fname', 'lname', 'profile_pic'] }).exec();

  if (user.user_type === 'individual') {
    res.render("event", { dist, notifications: fri_req_list, my_kon, user, events: events_data, profile: user_data, contact: user_data, username, myid });
  } else if (user.user_type === 'premium') {
    res.render('commercial_about', { user, profile: user_data, contact: user_data, username, myid });
  }
};

// pincode
exports.events_area_pincode = async (req, res) => {

  var dist_name = req.params.district;
  dist_name = dist_name.toUpperCase();


  // find area pincode
  const data = await area_pincode.find({ district: dist_name }).exec();

  res.json({ status: 'success', pincode: data });

}

// event find
exports.event_find = async (req, res) => {
  req.session.event_id = req.params.id;
  res.redirect('/events_about')
}

exports.test_data = async (req, res) => {
  // find events by id
  const events = await events.findById(req.params.id)
    .then((e) => {
      const d = {
        _id: e._id,
        user: e.user,
        event_name: e.event_name,
        event_image: e.event_image,
        start_date: e.start_date,
        end_date: e.end_date,
        start_time: e.start_time,
        end_time: e.end_time,
        description: e.description,
        visibility: e.visibility,
        event_type: e.event_type,
        targeted_audience: e.targeted_audience,
        reg_or_broad_link: e.reg_or_broad_link,
        created: e.created,
        day: date.format(new date(e.start_date), 'dddd'),
        // month: date.format(new date(e.start_date), 'mmm'),
        // year: date.format(new date(e.start_date), 'YYYY'),
        // date: date.format(new date(e.start_date), 'DD'),
      }
      // return d;
      res.json(d);
    })
}

// event about page
exports.events_about = async (req, res) => {

  if (!req.session.event_id) {
    res.redirect('/events');
  } else {

    const userId = req.session.secondUserId ? req.session.secondUserId : req.session.userId;

    // find user data (profile , contact, etc)
    const user_data = await User.findById(userId).exec();

    const username = user_data.fname + ' ' + user_data.lname;
    const myid = userId;

    // find first user data (profile , contact, etc)
    const user = await User.findById(req.session.userId).exec();

    // find events by id
    const events_data = await events.findById(req.session.event_id)
      .then((e) => {
        const d = {
          _id: e._id,
          user: e.user,
          event_name: e.event_name,
          event_image: e.event_image,
          start_date: e.start_date,
          end_date: e.end_date,
          start_time: e.start_time,
          end_time: e.end_time,
          description: e.description,
          visibility: e.visibility,
          event_type: e.event_type,
          targeted_audience: e.targeted_audience,
          reg_or_broad_link: e.reg_or_broad_link,
          created: e.created,
          // day: date.format(new date(e.start_date), 'dddd'),
          // month: date.format(new date(e.start_date), 'mmm'),
          // year: date.format(new date(e.start_date), 'YYYY'),
          // date: date.format(new date(e.start_date), 'DD'),
        }
        return d;
      })
      .catch((error) => {
        res.status(400).json({
          error: error,
        });
      });

    res.render("events_about", { user, events: events_data, profile: user_data, username, myid });
  }
};

// event discussion page
exports.events_discussion = async (req, res) => {

  if (!req.session.event_id) {
    res.redirect('/events');
  } else {

    const userId = req.session.secondUserId ? req.session.secondUserId : req.session.userId;

    // find user data (profile , contact, etc)
    const user_data = await User.findById(userId).exec();

    const username = user_data.fname + ' ' + user_data.lname;
    const myid = userId;

    // find first user data (profile , contact, etc)
    const user = await User.findById(req.session.userId).exec();

    // find events by id
    const events_data = await events.findById(req.session.event_id).exec();

    // find events discussion posts
    const events_discussion_posts = await posts.find({ category: 'events' }).populate({ path: 'user_id', select: ['fname', 'lname', 'profile_pic','degination'] }).exec();

    res.render("events_discussion", { post: events_discussion_posts, user, events: events_data, profile: user_data, username, myid });
  }
};

// event participants page
exports.events_participants = async (req, res) => {

  if (!req.session.event_id) {
    res.redirect('/events');
  } else {

    const userId = req.session.secondUserId ? req.session.secondUserId : req.session.userId;

    // find user data (profile , contact, etc)
    const user_data = await User.findById(userId).exec();

    const username = user_data.fname + ' ' + user_data.lname;
    const myid = userId;

    // find first user data (profile , contact, etc)
    const user = await User.findById(req.session.userId).exec();

    // find events by id
    const events_data = await events.findById(req.session.event_id).exec();

    var x = new Array();
    var participants = new Array();
    var ed = events_data;
    ed.participants.forEach(function (ep, i) {

      participants[i] = ep;

      if (ep === userId) {
        x.push(i);
      }
    })

    var epc = x.length;

    const eps = await User.find().where('_id').in(participants).exec();

    res.render("events_participants", { eps, epc, user, user_data, events: events_data, profile: user_data, username, myid });
  }
};


// events participants add
exports.events_participants_add = async (req, res) => {

  if (!req.session.event_id) {
    res.redirect('/events');
  } else {

    const eventid = req.session.event_id;
    const id = req.session.userId;

    // find events by id
    const ed = await events.findById(eventid).exec();

    if (ed.participants.length > 0) {

      var x = new Array();

      ed.participants.forEach(function (ep, i) {
        if (ep === id) {
          x.push(i);
        }
      })

      var epc = x.length;
      obj = id;

      if (x.length > 0) {
        events.findByIdAndUpdate(
          eventid,
          { $pull: { participants: obj } },
          function (error, success) {
            if (error) {
              res.json(error);
            } else {
              res.redirect(req.get('referer'));
            }
          });
      }
      else if (x.length === 0) {
        events.findByIdAndUpdate(
          eventid,
          { $push: { participants: obj } },
          function (error, success) {
            if (error) {
              res.json(error);
            } else {
              res.redirect(req.get('referer'));
            }
          });
      }

    } else {

      var obj = id;

      events.findByIdAndUpdate(
        eventid,
        { $push: { participants: obj } },
        function (error, success) {
          if (error) {
            res.json(error);
          } else {
            res.redirect(req.get('referer'));
          }
        });
    }



  }

}



// ########################################### Events discussion posts ########################################################

// Events discussion post text upload
exports.events_discussion_post_text = async (req, res) => {
  var post = new events_discussion({
    user_id: req.session.userId,

    post_type: 1,
    post_text: req.body.post_text,

    like: new Array(),
    shared: new Array(),
    comments: new Array(),
    created: new Date(),
  });

  if (!req.body) {
    res.json({ status: 'failed', message: 'your post is empty, please fill in the required fields' });
  } else {
    post.save().then(
      (post) => {
        res.status(201).redirect(req.get('referer'));
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
  }
}

// Events discussion post image upload
exports.events_discussion_post_image = async (req, res) => {
  var post = new events_discussion({
    user_id: req.session.userId,

    post_type: 2,
    post_text: req.body.post_text,
    post_image: 'media/' + req.file.filename,

    like: new Array(),
    shared: new Array(),
    comments: new Array(),
    created: new Date(),
  });

  if (!req.file) {
    res.json({ status: 'failed', message: 'your post is empty, please fill in the required fields' });
  } else {
    post.save().then(
      (post) => {
        res.status(201).redirect(req.get('referer'));
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
  }
}

// Events discussion post video upload
exports.events_discussion_post_video = async (req, res) => {
  var post = new events_discussion({
    user_id: req.session.userId,

    post_type: 3,
    post_text: req.body.post_text,
    post_video: 'media/' + req.file.filename,

    like: new Array(),
    shared: new Array(),
    comments: new Array(),
    created: new Date(),
  });

  if (!req.file) {
    res.json({ status: 'failed', message: 'your post is empty, please fill in the required fields' });
  } else {
    post.save().then(
      (post) => {
        res.status(201).redirect(req.get('referer'));
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
  }
}