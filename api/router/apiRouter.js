var express = require("express");
var router = express.Router();
var session = require("express-session");
var cookieParser = require("cookie-parser");
const multer = require("multer");
const dotenv = require("dotenv").config();
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
// uuidv4();

// middleware
const auth = require("../middleware/apiLoginCheck");

// agora
const { generateRtcToken, generateRtcToken2, generateRtmToken } = require('../controller/agoraToken');

//session
const oneDay = 1000 * 60 * 60 * 24;
router.use(
  session({
    secret: process.env.SECRET_KEY,
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
    resave: false,
  })
);
router.use(cookieParser());

//multer - File upload path and filename
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/media");
  },
  filename: function (req, file, cb) {
    
    cb(null, file.fieldname + file.originalname);
  },
});

const upload = multer({ storage: storage });

// import login register controller file
var controller = require("../controller/apiController");
const req = require("express/lib/request");

// Logout
router.post("/api-logout", function (req, res) {
  req.session.destroy();
  res.json("logout success");
});

// User registration
router.post("/api-user-registration", controller.api_user_registration);

// User update
router.post(
  "/api_update_user",
  upload.single("profile_pic"),
  auth,
  controller.api_update_user
);

// mobile verification
router.post("/api-mobile-verification", controller.api_mobile_verification);

// resend otp
router.post("/api-resend-otp", controller.api_resend_otp);

// OTP verification
router.post("/api-otp-verification", controller.api_otp_verification);

// User List
router.post("/api-user-list", auth, controller.api_users_find);

// User find by Id
router.post("/api-user-find/:id", auth, controller.api_user_find_by_id);

// User find by mobile
router.post(
  "/api-user-find-by-mobile/:mobile",
  auth,
  controller.api_user_find_by_mobile
);

// #######################################################################################################
// myhub page

// myhub page ( my hub page view and find all data)
router.get("/api-myhub", auth, controller.api_myhub_find_all);

// add health - health
router.post(
  "/api-add-health",
  auth,
  upload.single("attachment"),
  controller.api_add_health
);

// show by id priscription
router.post(
  "/api_show_all_prescription",
  upload.none(),
  controller.api_show_all_prescription
);

// show by id reports
router.post(
  "/api_show_all_report",
  upload.none(),
  controller.api_show_all_report
);

// show multiple files
router.post("/api_show_files", upload.none(), controller.api_show_files);
// add priscription - health
router.post(
  "/api-add-health-prescription",
  auth,
  upload.single("attachment"),
  controller.api_add_prescription
);


// delete health - health
router.post("/api-delete-health/:id", auth, controller.api_delete_health);

// delete priscription - health
router.post(
  "/api-delete-prescription/:id",
  auth,
  controller.api_delete_prescription
);
// add multiple files
router.post(
  "/api_multiple_files",
  upload.array("photos_name", 12),
  controller.api_multiple_files
);
// doctor register - health
router.post(
  "/api-doctor-register",
  auth,
  upload.single("profile_pic"),
  controller.api_doctor_register
);

// community remove in joined
router.post(
  "/api_community_remove_joined",
  upload.none(),
  controller.api_community_remove_joined
);

// add user in community
router.post(
  "/api_community_add_joined",
  upload.none(),
  controller.api_community_add_joined
);

// doctor edit data - health
router.post(
  "/api-doctor-edit/:id",
  auth,
  upload.single("profile_pic"),
  controller.api_doctor_edit
);
// find designation in User for doctor
router.post(
  "/api_find_designation_doctor",
  upload.none(),
  controller.api_find_designation_doctor
);

// community pillar in user
router.post(
  "/api_find_designation_user",
  upload.none(),
  controller.api_find_designation_user
);


// show doctor specific for user
router.post(
  "/api_doctor_show_by_user",
  upload.none(),
  controller.api_doctor_show_by_user
);

// doctor delete - health
router.post("/api-doctor-delete/:id", auth, controller.api_doctor_delete);

// doctor search by name
router.post(
  "/api_search_doctor_by_name",
  auth,
  upload.none(),
  controller.api_search_doctor_by_name
);

// doctor ( search by pincode )
router.post("/api-doctor-search/:pincode", auth, controller.api_search_doctor);

// doctor add for person in my health

// myhub - community pillar
router.post(
  "/api-myhub-community-pillar",
  auth,
  controller.api_community_pillar
);


// doctor edit data - health
router.post("/api-doctor-edit/:id",auth,upload.single("profile_pic"),controller.api_doctor_edit);

// delete doctor
router.post('/api-delete-doctor/:id', auth, controller.api_delete_doctor);


// ######################################################### Communities ################################################################

// create communities
router.post(
  "/api-create-communites",
  auth,
  upload.single("comm_img"),
  controller.api_create_communities
);

// communities find all
router.post("/api-communities", auth, controller.api_communities_find_all);

// communities find by id
router.post(
  "/api-communities-about/:id",
  auth,
  controller.api_communities_about
);

//  communities announcement find by communites_id
router.post(
  "/api-communities-announcement/:id",
  auth,
  controller.communities_announcement
);

//  communities discussion find by communites_id
router.post(
  "/api-communities-discussion/:id",
  auth,
  controller.communities_discussion
);

//  communities my photos find by user communites_id
router.post("/api-communities-photos/:id", auth, controller.communities_photos);

//  communities events discussion find
router.post("/api-events-discussion/:id", auth, controller.api_events_discussion);

// ######################################################### Events ################################################################

// events find all
router.get("/api-events", auth, controller.api_events_find_all);

// events find all
router.get("/api-event/:id", auth, controller.api_event_find);

// add interested in events
router.post(
  "/api_events_add_interested",
  upload.none(),
  controller.api_events_add_interested
); 	

// delete interested in events
router.post(
  "/api_remove_events_user",
  upload.none(),
  controller.api_remove_events_user
);

// find community events in using community_id
router.post(
  "/api_find_community_events",
  auth,
  upload.none(),
  controller.api_find_community_events
);

// create events
router.post(
  "/api-create-events",
  auth,
  upload.single("event_image"),
  controller.api_create_events
);

// update events
router.post(
  "/api_event_edit",
  upload.single("event_image"),
  controller.api_event_edit
);

// #######################################################################################################

// post create
router.post(
  "/api-post-create",
  auth,
  upload.single("post_files"),
  controller.api_post_create
);

// show post by id
router.post("/api_show_post", auth, upload.none(), controller.api_show_post);
// feed page - post view
router.get("/api-feed", auth, controller.api_feed);

// comment
router.post("/api-feed-comment/:id", auth, controller.api_feed_post_comment);

// find district
router.post("/api-district", controller.api_district_find);

// find pincode
router.post("/api-pincode/:dist", controller.api_pincode_find);

// ########################################################################################################

// photos find
router.get("/api-photos", auth, controller.api_photos_find_all);

// Add photos
router.post(
  "/api-add_photos",
  auth,
  upload.array("photos_name", 12),
  controller.api_add_photos
);

// remove photos
router.post("/api-remove_photos", auth, controller.api_remove_photos);

// #######################################################################################################################

// add friend request
router.post('/api-friend-request/:id', auth, controller.add_friends_request);

// friend request response
router.post('/api-friend-response/:id', auth, controller.friend_request_response);

// friend_request_list
router.get('/api-friend-request-list/:id', auth, controller.friend_request_list);

// friend list my konnects
router.get('/konnect-list/:id', auth, controller.konnects_list);

// add relation
router.post('/api-relation', auth, controller.add_relations);

// ######################################################### more popup books ################################################################

// books find all
router.get("/api-books", auth, controller.api_books);

// books user add
router.post("/api-books-add-user/:id", auth, controller.api_books_user);

// sports find all
router.get("/api-sports", auth, controller.api_sports);

// sports user add
router.post("/api-sports-add-user/:id", auth, controller.api_sports_user);

// music find all
router.get("/api-music", auth, controller.api_music);

// music user add
router.post("/api-music-add-user/:id", auth, controller.api_music_user);

// movies find all
router.get("/api-movies", auth, controller.api_movies);

// movies user add
router.post("/api-movies-add-user/:id", auth, controller.api_movies_user);

// tvshows find all
router.get("/api-tvshows", auth, controller.api_tvshows);

// sports user add
router.post("/api-tvshows-add-user/:id", auth, controller.api_tvshows_user);



// ####################################################### about(my profile)###################################################### 

// about bio edit
router.post("/api-about-bio-edit",auth,  controller.api_about_bio_edit);

// Add volunteer
router.post('/api-add-volunteer', auth, controller.api_add_volunteer);

// edit volunteer
router.post('/api-edit-volunteer/:id', auth, controller.api_edit_volunteer);

// delet volunteer
router.post('/api-delete-volunteer/:id', auth, controller.api_delete_volunteer);


// Add experience
router.post('/api-add-experience', auth, upload.single('image'), controller.api_add_experience);

// edit education
router.post('/api-edit-experience/:id', auth,  upload.single('image'), controller.api_edit_experience);


// delete education
router.post('/api-delete-experience/:id', auth, controller.api_delete_experience);

// Add education
router.post('/api-add-education', auth, upload.single('image'), controller.api_add_education);

// edit education
router.post('/api-edit-education/:id', auth,  upload.single('image'), controller.api_edit_education);


// delet education
router.post('/api-delete-education/:id', auth, controller.api_delete_education);

// delet languauge
router.post('/api-delete-language/:id', auth, controller.api_delete_languages);

// add language
router.post('/api-add-language', auth, controller.api_add_languages);

// edit language
router.post('/api-edit-languages/:id', auth, controller.api_edit_languages);

// public service
router.post("/api-publicService", auth, controller.api_publicService);




// Agora Token
const { RtcTokenBuilder, RtcRole } = require("agora-access-token");

const APP_ID = process.env.APP_ID;
const APP_CERTIFICATE = process.env.APP_CERTIFICATE;

const nocache = (req, res, next) => {
  res.header("Cache-Control", "private, no-cache, no-store, must-revalidate");
  res.header("expires", "-1");
  res.header("Pragma", "no-cache");
  next();
};

const generateAccesstoken = (req, res) => {
  // set response header
  res.header("Acess-Controle-Allow-Origin", "*");

  // get channel name
  const channelName = req.query.channelName;
  if (!channelName) {
    return res.status(500).json({ error: "channel is required" });
  }

  // get uid
  let uid = req.query.uid;
  if (!uid || uid == "") {
    uid = 0;
  }

  // get role
  let role = RtcRole.SUBSCRIBER;
  if (req.query.role == "publisher") {
    role = RtcRole.PUBLISHER;
  }

  //get the expire time
  let expireTime = req.query.expireTime;
  if (!expireTime || expireTime == "") {
    expireTime = 3600;
  } else {
    expireTime = parseInt(expireTime, 10);
  }

  // calculate privilege expire time
  const currenTime = Math.floor(Date.now() / 1000);
  const privilegeExpireTime = currenTime + expireTime;

  // build the token
  const token = RtcTokenBuilder.buildTokenWithUid(
    APP_ID,
    APP_CERTIFICATE,
    channelName,
    uid,
    role,
    privilegeExpireTime
  );

  // return the token
  return res.json({ token: token });
};

router.get("/api-access_token", nocache, generateAccesstoken);

// Agora Token
// ################################################### Agora new API #################################################################

// generateRtcToken();
// generateRtmToken();

// RTC Token
router.get('/api-generate-rtc-token', async (req, res) => {
  const {channel, uid } = req.query;
  if(!channel || channel === '' || !uid || uid === ''){
    res.json({
      status: 'failed',
      message: 'parameter required ...'
    })
  }
  else {

   const token =  generateRtcToken(channel, uid);

    res.json({
      status: 'success',
      message: 'Agora RTC Token generate success ...',
      token: token
    })
  }

})


// RTC Token with account
router.get('/api-generate-rtc-token2', async (req, res) => {
  const {channel, uid, account } = req.query;
  if(!channel || channel === '' || !uid || uid === '' || !account || account === ''){
    res.json({
      status: 'failed',
      message: 'parameter required ...'
    })
  }
  else {

   const token =  generateRtcToken(channel, uid, account);

    res.json({
      status: 'success',
      message: 'Agora RTC Token with account generate success ...',
      token: token
    })
  }

})

// RTM Token
router.get('/api-generate-rtm-token', async (req, res) => {
  const { account } = req.query;
  if( !account || account === ''){
    res.json({
      status: 'failed',
      message: 'parameter required ...'
    })
  }
  else {
    const token = generateRtmToken(account);

    res.json({
      status: 'success',
      message: 'Agora RTM Token generate success ...',
      token: token
    })
  }
})


module.exports = router;
