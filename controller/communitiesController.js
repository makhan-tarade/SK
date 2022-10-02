
var User = require("../models/model");
var url = require('url');
var date = require('date-and-time');

const { friend_requests } = require('../models/myprofileModel');

const { communities, communities_events, communities_photos, communities_discussion_post, communities_announcements_post, posts } = require('../models/communitiesModel1');

// Communities Registraion
exports.create_communities = async (req, res) => {

    var data = new communities({
      user: req.session.userId,
      comm_img: 'media/' + req.file.filename,
      group_name: req.body.group_name,
      description: req.body.description,
      community_type: req.body.communities,
      privacy: req.body.privacy,
      charged: req.body.charged,
      rules: req.body.rules,
      start_date: req.body.start_date,
      end_date: req.body.end_date,
    });

    await data.save()
      .then((data) => {
        res.status(201).redirect(req.get('referer'));
      })
      .catch((error) => {
        res.status(400).json({
          error: error,
        });
      });
};

// find communities all
exports.communities_find_all = async (req, res) => {

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

      const users = await User.find().exec();


    // find all by user communities
    var comm = await communities.find().exec();
      comm.reverse();
      const my_kon = await User.findById(req.session.userId)
      .populate({ path: 'konnects.user', select: ['_id', 'fname', 'lname', 'profile_pic', 'mobile', 'address'] }).exec();

  // frient request list
  const fri_req_list = await friend_requests.find({ reciever: req.session.userId })
      .populate({ path: 'sender', select: ['_id', 'fname', 'lname', 'profile_pic'] }).exec();

      if(user.user_type === 'individual'){
        res.render("communities", { notifications: fri_req_list, my_kon, user, comm, contact: user_data, profile: user_data, username, myid,
        });
    } else if (user.user_type === 'premium') {
        res.render('commercial_about', {user, profile: user_data, contact: user_data, username, myid });
    }
}

// group find
exports.group_find = async (req, res) => {
  req.session.comm_id = req.params.id;
  res.redirect('/groups_about')
}

// groups about page
exports.groups_about = async (req, res) => {
 
    if (!req.session.comm_id) {
      res.redirect('/communities');
    } else {

      const userId = req.session.secondUserId ? req.session.secondUserId : req.session.userId;

      // find user data (profile , contact, etc)
      const user_data = await User.findById(userId).exec();

      const username = user_data.fname + ' ' + user_data.lname;
      const myid = userId;

      // find first user data (profile , contact, etc)
      const user = await User.findById(req.session.userId).exec();


      // find community details
      const groups = await communities.findOne({ _id: req.session.comm_id }).exec();

      // find group user details
      const group_user = await User.findById(groups.user).exec();

         // find photos
    const photos = await communities_photos.find().exec();

      res.render("groups_about", { photos, user, groups, group_user, profile: user_data, username, myid });

    }
}

// group discission
exports.groups_discussion = async (req, res) => {
  if (req.session.login) {

    const userId = req.session.secondUserId ? req.session.secondUserId : req.session.userId;

    // find user data (profile , contact, etc)
    const user_data = await User.findById(userId).exec();

    const username = user_data.fname + ' ' + user_data.lname;
    const myid = userId;

    // find first user data (profile , contact, etc)
    const user = await User.findById(req.session.userId).exec();

    // find community details
    const groups = await communities.findOne({ _id: req.session.comm_id }).exec();

    // find group user details
    const group_user = await User.findById(groups.user).exec();

    // find post
    const post = await posts.find({category: 'communities discussion'}).populate({ path: 'user_id', select: ['fname', 'lname', 'profile_pic','degination'] }).exec();

       // find photos
    const photos = await communities_photos.find({user: userId}).exec();

    res.render("groups_discussion", { photos, user, post, groups, group_user, profile: user_data, username, myid });

  } else {
    req.session = false;
    res.redirect("/login");
  }
}

// groups announcement
exports.gorups_announcement = async (req, res) => {

    const userId = req.session.secondUserId ? req.session.secondUserId : req.session.userId;

    // find user data (profile , contact, etc)
    const user_data = await User.findById(userId).exec();

    const username = user_data.fname + ' ' + user_data.lname;
    const myid = userId;

    // find first user data (profile , contact, etc)
    const user = await User.findById(req.session.userId).exec();

    // find community details
    const groups = await communities.findOne({ _id: req.session.comm_id }).exec();

    // find group user details
    const group_user = await User.findById(groups.user).exec();

    // find post
    const post = await posts.find({category: 'communities announcements'}).populate({ path: 'user_id', select: ['fname', 'lname', 'profile_pic','degination'] }).exec();

       // find photos
    const photos = await communities_photos.find({user: userId}).exec();

    res.render("groups_announcement", { photos, user, post, groups, group_user, profile: user_data, username, myid });
}

// groups bridge
exports.groups_bridge = async (req, res) => {

    const userId = req.session.secondUserId ? req.session.secondUserId : req.session.userId;

    // find user data (profile , contact, etc)
    const user_data = await User.findById(userId).exec();

    const username = user_data.fname + ' ' + user_data.lname;
    const myid = userId;

    // find first user data (profile , contact, etc)
    const user = await User.findById(req.session.userId).exec();

    // find community details
    const groups = await communities.findOne({ _id: req.session.comm_id }).exec();

    // find group user details
    const group_user = await User.findById(groups.user).exec();

       // find photos
    const photos = await communities_photos.find().exec();

    res.render("groups_bridge", { photos, user, groups, group_user, profile: user_data, username, myid });
}

// groups pillars
exports.groups_pillars = async (req, res) => {

    const userId = req.session.secondUserId ? req.session.secondUserId : req.session.userId;

    // find user data (profile , contact, etc)
    const user_data = await User.findById(userId).exec();

    const username = user_data.fname + ' ' + user_data.lname;
    const myid = userId;

    // find first user data (profile , contact, etc)
    const user = await User.findById(req.session.userId).exec();

    // find community details
    const groups = await communities.findById(req.session.comm_id).exec();

    // find group user details
    const group_user = await User.findById(groups.user).exec();

       // find photos
    const photos = await communities_photos.find({user: userId}).exec();

    res.render("groups_pillars", { photos, user, groups, group_user, profile: user_data, username, myid });
}

// group events find
exports.groups_events = async (req, res) => {

    const userId = req.session.secondUserId ? req.session.secondUserId : req.session.userId;

    // find user data (profile , contact, etc)
    const user_data = await User.findById(userId).exec();

    const username = user_data.fname + ' ' + user_data.lname;
    const myid = userId;

    // find first user data (profile , contact, etc)
    const user = await User.findById(req.session.userId).exec();

    // find community details
    const groups = await communities.findById(req.session.comm_id ).exec();
    // find group events
    const events = await communities_events.find()
      .then((data) => {
        var d = new Array();
        data.forEach((e, index) => {
          d[data.length - index] = {
            _id: e._id,
            user: e.user,
            event_name: e.event_name,
            start_date: date.format(e.start_date, date.compile('DD MMM')),
            end_date: date.format(e.end_date, date.compile('DD MMM')),
            event_image: e.event_image,
          }
        });
        return d;
      })
      .catch((error) => {
        res.status(400).json({
          error: error,
        });
      });

    // find group user details
    const group_user = await User.findById(groups.user).exec();

       // find photos
    const photos = await communities_photos.find().exec();

    res.render("groups_event", { photos, user, events, groups, group_user, profile: user_data, username, myid });
}

// groups media
exports.groups_media = async (req, res) => {

    const userId = req.session.secondUserId ? req.session.secondUserId : req.session.userId;

    // find user data (profile , contact, etc)
    const user_data = await User.findById(userId).exec();

    const username = user_data.fname + ' ' + user_data.lname;
    const myid = userId;

    // find first user data (profile , contact, etc)
    const user = await User.findById(req.session.userId).exec();

    // find photos
    const photos = await communities_photos.find().exec();

    // find community details
    const groups = await communities.findOne({ _id: req.session.comm_id }).exec();

    // find group user details
    const group_user = await User.findById(groups.user).exec();

    res.render("groups_media", { user, groups, group_user, profile: user_data, photos, username, myid });
}


// group media photos upload
exports.groups_media_photos = async (req, res) => {

    var photos = new Array();

    for (var i = 0; i < req.files.length; i++) {
      photos[i] = 'media/' + (req.files[i].filename);
    }

    photos = new communities_photos({
      user: req.session.userId,
      created: new Date(),
      photos_name: photos,
    });

    photos.save().then((data) => {
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

// groups media photos remove
exports.groups_media_photos_remove = async (req, res) => {

  // find all photos
  const photos = await communities_photos.findById(req.params.id).exec();

  // find photos name
  function pic_name(e) {
    for (var i = 0; i < photos.photos_name.length; i++) {
      if (e === photos.photos_name[i]) {
        return i;
      }
    }
  }

  // pull photos_name 
  const pic = photos.photos_name[pic_name(req.params.photo)];
  communities_photos.findOneAndUpdate(
    { _id: req.params.id },
    { $pull: { photos_name: pic } },
    function (error, data) {
      if (error) {
        return error;
      } else {
        return data;
      }
    });

  res.redirect(req.get('referer'));
}

//groups discussion post text
exports.groups_discussion_post_text = async (req, res) => {
 
    var user = new communities_discussion_post({
      user_id: req.session.userId,
      user_name: req.session.userName,
      profile_pic: req.body.profile_pic,
      work: req.body.work,

      post_type: 1,
      post_text: req.body.post_text,

      like: new Array(),
      like_color: '',
      shared: new Array(),
      comments: new Array(),
      created: new Date(),
    });

    if (!req.body) {
      res.json({status: 'failed', message: 'input field empty!'})
    } else {
      user.save().then((data) => {
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


// groups discussion post image upload
exports.groups_discussion_post_image = async (req, res) => {

    var images = new Array();       

        for (var i = 0; i < req.files.length; i++) {
            images[i] = 'media/' + (req.files[i].filename);
        }

    var user = new communities_discussion_post({
      user_id: req.session.userId,
      user_name: req.session.userName,
      profile_pic: req.body.profile_pic,
      work: req.body.work,

      post_type: 2,
      post_text: req.body.post_text,
      post_image: images,

      like: new Array(),
      like_color: '',
      shared: new Array(),
      comment: new Array(),
      created: new Date(),
    });
   

    if (!req.files) {
      res.json({status: 'failed', message: 'image field empty!'})
    } else {
      user.save().then((user) => {
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


// groups discussion post video upload
exports.groups_discussion_post_video = async (req, res) => {

    var videos = new Array();       

        for (var i = 0; i < req.files.length; i++) {
            videos[i] = 'media/' + (req.files[i].filename);
        }

    var user = new communities_discussion_post({
      user_id: req.session.userId,      

      post_type: 3,
      post_text: req.body.post_text,
      post_video: videos,

      like: new Array(),
      
      shared: new Array(),
      comment: new Array(),
      created: new Date(),
    });    

    if (!req.files) {
      res.json({status: 'failed', message: 'video field empty!'});
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


// announcements post
//groups announcements post text
exports.groups_announcements_post_text = async (req, res) => {
  
    var user = new communities_announcements_post({
      user_id: req.session.userId,
      user_name: req.session.userName,
      profile_pic: req.body.profile_pic,
      work: req.body.work,

      post_type: 1,
      post_text: req.body.post_text,

      like: new Array(),
      like_color: '',
      shared: new Array(),
      comments: new Array(),
      created: new Date(),
    });

    if (!req.body) {
      res.json({status: 'failed', message: 'input field empty!'})
    } else {
      user.save().then((data) => {
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


// groups announcements post image upload
exports.groups_announcements_post_image = async (req, res) => {

    var images = new Array();       

        for (var i = 0; i < req.files.length; i++) {
            images[i] = 'media/' + (req.files[i].filename);
        }

    var user = new communities_announcements_post({
      user_id: req.session.userId,     

      post_type: 2,
      post_text: req.body.post_text,
      post_image: images,

      like: new Array(),
      
      shared: new Array(),
      comment: new Array(),
      created: new Date(),
    });   

    if (!req.files) {
      res.json({status: 'failed', message: 'image field empty!'})
    } else {
      user.save().then((user) => {
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


// groups announcements post video upload
exports.groups_announcements_post_video = async (req, res) => {

    var videos = new Array();       

        for (var i = 0; i < req.files.length; i++) {
            videos[i] = 'media/' + (req.files[i].filename);
        }

    var user = new communities_announcements_post({
      user_id: req.session.userId,

      post_type: 3,
      post_text: req.body.post_text,
      post_video: videos,

      like: new Array(),
     
      shared: new Array(),
      comment: new Array(),
      created: new Date(),
    });

    if (!req.files) {
      res.json({status: 'failed', message: 'video field empty!'})
    } else {
      user.save().then((user) => {
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

// ###################################################################################################################################
// group about edit

exports.groups_about_edit = (req, res) => {
  if (!req.body) {
      return res.status(400).json({
          message: "Data to update can not be empty!"
      });
  }
 
  var id=req.params.id;

  communities.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
          if (!data) {
              res.status(404).json({
                  message: `Cannot update User Contact info with id=${id}. Maybe Tutorial was not found!`
              });
          } else //res.status(200).json({ message: "User Contact info was updated successfully." });
              // res.redirect('/communities');
              res.redirect(req.get('referer'));
      })
      .catch(err => {
          res.status(500).json({
              message: "Error updating User Contact info with id=" + id
          });
      });
}
