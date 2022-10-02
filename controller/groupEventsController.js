// var groupEvents = require("../models/groupEventsModel");

var User = require("../models/model");
const { communities, communities_events, communities_events_discussion, communities_photos, communities_discussion_post, communities_announcements_post } = require('../models/communitiesModel1');

// events Registraion
exports.group_create_events = (req, res) => {
    if (req.session.login) {
        var events = new communities_events({
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

        console.log(events);

        events
            .save()
            .then(() => {
                res.status(201).redirect(req.get('referer'));
            })
            .catch((error) => {
                res.status(400).json({
                    error: error,
                });
            });
    } else {
        req.session = false;
        res.redirect("/login");
    }
};


// event find
exports.group_events_find = async (req, res) => {
    req.session.g_event_id = req.params.id;
    res.redirect('/group_events_about')
}


// group events about
exports.group_events_about = async (req, res) => {
    if (req.session.login) {
        if (!req.session.g_event_id) {
          res.redirect('/group_events');
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
          const user = await User.findById(req.session.userId)
            .then((data) => {
              return data;
            })
            .catch((error) => {
              res.status(400).json({
                error: error,
              });
            });
    
          // find events by id
          const events = await communities_events.findById(req.session.g_event_id)
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
    
          res.render("group_events_about", { user, events, profile: user_data, username, myid });
        }
      } else {
        req.session = false;
        res.redirect("/login");
      }
}

// group events discussion
exports.group_events_discussion = async (req, res) => {
    if (req.session.login) {
        if (!req.session.g_event_id) {
          res.redirect('/group_events');
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
          const user = await User.findById(req.session.userId)
            .then((data) => {
              return data;
            })
            .catch((error) => {
              res.status(400).json({
                error: error,
              });
            });
    
          // find events by id
          const events = await communities_events.findById(req.session.g_event_id)
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
    
          res.render("group_events_discussion", { user, events, profile: user_data, username, myid });
        }
      } else {
        req.session = false;
        res.redirect("/login");
      }
}

// group events participants
exports.group_events_participants = async (req, res) => {
    if (req.session.login) {
        if (!req.session.g_event_id) {
          res.redirect('/group_events');
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
          const user = await User.findById(req.session.userId)
            .then((data) => {
              return data;
            })
            .catch((error) => {
              res.status(400).json({
                error: error,
              });
            });
    
          // find events by id
          const events = await communities_events.findById(req.session.g_event_id)
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
    
          res.render("group_events_participants", { user, events, profile: user_data, username, myid });
        }
      } else {
        req.session = false;
        res.redirect("/login");
      }
}



