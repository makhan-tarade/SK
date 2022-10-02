var User = require("../models/model");
var date = require('date-and-time');

// import models
const { appreciations, benefits } = require("../models/commercialModel");
const { events, events_discussion } = require("../models/eventsModel");
const { communities, communities_events, communities_photos, communities_discussion_post, communities_announcements_post } = require('../models/communitiesModel1');


// commercial about
exports.commercial_about = async (req, res) => {

  const userId = req.session.secondUserId ? req.session.secondUserId : req.session.userId;

  // find user data (profile , contact, etc)
  const user_data = await User.findById(userId).exec();


  const username = user_data.fname + ' ' + user_data.lname;
  const myid = userId;

  // find first user data (profile , contact, etc)
  const user = await User.findById(req.session.userId).exec();

  res.render('commercial_about', { user, profile: user_data, contact: user_data, username, myid });
}

// commercial analytic
exports.commercial_analytics = async (req, res) => {

  const userId = req.session.secondUserId ? req.session.secondUserId : req.session.userId;

  // find user data (profile , contact, etc)
  const user_data = await User.findById(userId).exec();

  const username = user_data.fname + ' ' + user_data.lname;
  const myid = userId;

  // find first user data (profile , contact, etc)
  const user = await User.findById(req.session.userId).exec();

  res.render('commercial_analitics', { user, profile: user_data, contact: user_data, username, myid });
}

// commercial discussion
exports.commercial_discussion = async (req, res) => {

  const userId = req.session.secondUserId ? req.session.secondUserId : req.session.userId;

  // find user data (profile , contact, etc)
  const user_data = await User.findById(userId).exec();

  const username = user_data.fname + ' ' + user_data.lname;
  const myid = userId;

  // find first user data (profile , contact, etc)
  const user = await User.findById(req.session.userId).exec();

  // find feeds
  const users = await User.find().exec();

  // find communities
  const comm = await communities.find().exec();

  // find events
  const event = await events.find({ user: req.session.userId }).exec();

  // find post
  const post = await communities_discussion_post.find().exec();

  res.render('commercial_discussion', { post, comm, event, users, user, profile: user_data, contact: user_data, username, myid, userid: req.session.userId, });
}

// commercial benefits 
exports.commercial_benefits = async (req, res) => {

  const userId = req.session.secondUserId ? req.session.secondUserId : req.session.userId;

  // find user data (profile , contact, etc)
  const user_data = await User.findById(userId).exec();

  const username = user_data.fname + ' ' + user_data.lname;
  const myid = userId;

  // find first user data (profile , contact, etc)
  const user = await User.findById(req.session.userId).exec();


  const benefits_data = await benefits.find({ user: userId }).exec();

  res.render('commercial_benefits', { benefit: benefits_data, user, profile: user_data, contact: user_data, username, myid });
}

// benefits add
exports.commercial_benefits_add = async (req, res) => {

  var user = new benefits({
    user: req.session.userId,
    title: req.body.title,
    category: req.body.category,
    description: req.body.description,
    image: 'media/' + req.file.filename,
    link: req.body.link,
    created: new Date(),
  });

  if (!req.file) {
    console.log("file not found");
  } else {
    user.save().then(
      (user) => {
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

// commercial appriciation
exports.commercial_appriciation = async (req, res) => {

  const userId = req.session.secondUserId ? req.session.secondUserId : req.session.userId;

  // find user data (profile , contact, etc)
  const user_data = await User.findById(userId).exec();

  const username = user_data.fname + ' ' + user_data.lname;
  const myid = userId;

  // find first user data (profile , contact, etc)
  const user = await User.findById(req.session.userId).exec();

  // find post
  const post = await appreciations.find().exec();

  res.render('commercial_appriciation', { post, user, profile: user_data, contact: user_data, username, myid, userid: req.session.userId, });
}

// commercial followers
exports.commercial_followers = async (req, res) => {

  const userId = req.session.secondUserId ? req.session.secondUserId : req.session.userId;

  // find user data (profile , contact, etc)
  const user_data = await User.findById(userId).exec();

  const username = user_data.fname + ' ' + user_data.lname;
  const myid = userId;

  // find first user data (profile , contact, etc)
  const user = await User.findById(req.session.userId).exec();

  res.render('commercial_followers', { user, profile: user_data, contact: user_data, username, myid });
}

// commercial pillars
exports.commercial_pillars = async (req, res) => {

  const userId = req.session.secondUserId ? req.session.secondUserId : req.session.userId;

  // find user data (profile , contact, etc)
  const user_data = await User.findById(userId).exec();

  const username = user_data.fname + ' ' + user_data.lname;
  const myid = userId;

  // find first user data (profile , contact, etc)
  const user = await User.findById(req.session.userId).exec();

  res.render('commercial_pillars', { user, profile: user_data, contact: user_data, username, myid });
}

// commercial events
exports.commercial_events = async (req, res) => {

  const userId = req.session.secondUserId ? req.session.secondUserId : req.session.userId;

  // find user data (profile , contact, etc)
  const user_data = await User.findById(userId).exec();

  const username = user_data.fname + ' ' + user_data.lname;
  const myid = userId;

  // find first user data (profile , contact, etc)
  const user = await User.findById(req.session.userId).exec();

  // find events
  const events_data = await events.find().exec();

  res.render('commercial_events', { user, events: events_data, profile: user_data, contact: user_data, username, myid });
}

// commercial media
exports.commercial_media = async (req, res) => {

  const userId = req.session.secondUserId ? req.session.secondUserId : req.session.userId;

  // find user data (profile , contact, etc)
  const user_data = await User.findById(userId).exec();

  const username = user_data.fname + ' ' + user_data.lname;
  const myid = userId;

  // find first user data (profile , contact, etc)
  const user = await User.findById(req.session.userId).exec();

  res.render('commercial_media', { user, profile: user_data, contact: user_data, username, myid });
}

// commercial feedback
exports.commercial_feedback = async (req, res) => {

  const userId = req.session.secondUserId ? req.session.secondUserId : req.session.userId;

  // find user data (profile , contact, etc)
  const user_data = await User.findById(userId).exec();

  const username = user_data.fname + ' ' + user_data.lname;
  const myid = userId;

  // find first user data (profile , contact, etc)
  const user = await User.findById(req.session.userId).exec();

  res.render('commercial_feedback', { user, profile: user_data, contact: user_data, username, myid });
}

// commercial appreciations text
exports.appreciation_post_create_text = async (req, res) => {
  var user = new appreciations({
    user: req.session.userId,

    post_type: 1,
    post_text: req.body.post_text,

    like: new Array(),
    shared: new Array(),
    comments: new Array(),
    created: new Date(),
  });

  if (!req.body) {
    console.log("file not found");
  } else {
    user.save().then(
      (user) => {
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

// commercial appreciations image
exports.appreciation_post_create_image = async (req, res) => {
  var user = new appreciations({
    user: req.session.userId,

    post_type: 2,
    post_text: req.body.post_text,
    post_image: 'media/' + req.file.filename,

    like: new Array(),
    shared: new Array(),
    comment: new Array(),
    created: new Date(),
  });

  console.log(user);

  if (!req.file) {
    console.log("file not found");
  } else {
    user.save().then(
      (user) => {
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

// commercial appreciations video
exports.appreciation_post_create_video = async (req, res) => {
  var user = new appreciations({
    user: req.session.userId,

    post_type: 3,
    post_text: req.body.post_text,
    post_video: 'media/' + req.file.filename,

    like: new Array(),
    shared: new Array(),
    comment: new Array(),
    created: new Date(),
  });

  if (!req.file) {
    console.log("file not found");
  } else {
    user.save().then(
      (user) => {
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


// events
// event find
exports.commercial_events_find = async (req, res) => {
  req.session.commercial_event_id = req.params.id;
  res.redirect('/commercial-events-about');
}

// events about
exports.commercial_events_about = async (req, res) => {
  if (!req.session.commercial_event_id) {
    res.redirect('/commercial_events');
  } else {

    const userId = req.session.secondUserId ? req.session.secondUserId : req.session.userId;

    // find user data (profile , contact, etc)
    const user_data = await User.findById(userId)
      .then((data) => {
        return data;
      })
      .catch((error) => {
        res.status(400).json({
          error: error,
        });
      });

    const username = user_data.fname + ' ' + user_data.lname;
    const myid = userId;

    // find first user data (profile , contact, etc)
    const user = await User.findById(req.session.userId).exec();

    // find events by id
    const events_data = await events.findById(req.session.commercial_event_id)
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

    res.render("commercial_events_about", { user, events: events_data, profile: user_data, username, myid });
  }
}

// events discussion
exports.commercial_events_discussion = async (req, res) => {
  if (!req.session.commercial_event_id) {
    res.redirect('/commercial_events');
  } else {

    const userId = req.session.secondUserId ? req.session.secondUserId : req.session.userId;

    // find user data (profile , contact, etc)
    const user_data = await User.findById(userId).exec();

    const username = user_data.fname + ' ' + user_data.lname;
    const myid = userId;

    // find first user data (profile , contact, etc)
    const user = await User.findById(req.session.userId).exec();

    // find events by id
    const events_data = await events.findById(req.session.commercial_event_id)
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

    res.render("commercial_events_discussion", { user, events: events_data, profile: user_data, username, myid });
  }
}

// events participants
exports.commercial_events_participants = async (req, res) => {
  if (!req.session.commercial_event_id) {
    res.redirect('/commercial_events');
  } else {

    const userId = req.session.secondUserId ? req.session.secondUserId : req.session.userId;

    // find user data (profile , contact, etc)
    const user_data = await User.findById(userId).exec();

    const username = user_data.fname + ' ' + user_data.lname;
    const myid = userId;

    // find first user data (profile , contact, etc)
    const user = await User.findById(req.session.userId).exec();

    // find events by id
    const events_data = await events.findById(req.session.commercial_event_id)
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

    res.render("commercial_events_participants", { user, events: events_data, profile: user_data, username, myid });
  }
}

// ##################################################################################################################################

exports.commercial_followers_join = async (req, res) => {


  var id = req.session.userId;


  // find events by id
  const ed = await User.findById(req.params.id).exec();

  if (ed.followers.length > 0) {

    var x = new Array();

    ed.followers.forEach(function (ep, i) {
      if (ep === id) {
        x.push(i);
      }
    })

    var epc = x.length;
    obj = id;

    if (x.length > 0) {
      User.findByIdAndUpdate(
        req.params.id,
        { $pull: { followers: obj } },
        function (error, success) {
          if (error) {
            res.json(error);
          } else {
            res.redirect(req.get('referer'));
          }
        });
    }
    else if (x.length === 0) {
      User.findByIdAndUpdate(
        req.params.id,
        { $push: { followers: obj } },
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

    User.findByIdAndUpdate(
      req.params.id,
      { $push: { followers: obj } },
      function (error, success) {
        if (error) {
          res.json(error);
        } else {
          res.redirect(req.get('referer'));
        }
      });
  }
}

// ------------------------------------------------------------------------------------------------------------------------------------------
// grabit inner page
exports.grabit_inner_page = async (req, res) => {

  const { id, category } = req.query;
  var benefit;
  var benefit_all;

  const userId = req.session.secondUserId
    ? req.session.secondUserId
    : req.session.userId;

  // find user data (profile , contact, etc)
  const user_data = await User.findById(userId).exec();

  const username = user_data.fname + " " + user_data.lname;
  const myid = userId;

  // find first user data (profile , contact, etc)
  const user = await User.findById(req.session.userId).exec();
 

  if (!id || id === '' || !category || category === '') {
    res.redirect('/commercial_benefits');
  }

  else if (id && category) {
    // benifits find
    benefit = await benefits.findById(id).exec();

    // benifits find
    benefit_all = await benefits.find({ user: userId, category: category }).exec();
  }

  res.render("grabit_new_inner", {
    user,
    benefit,
    benefit_all,
    contact: user_data,
    profile: user_data,
    username,
    userid: myid,
    myid,
  });
}
