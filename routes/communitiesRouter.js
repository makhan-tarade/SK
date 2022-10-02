var express = require('express');
var router = express.Router();
const multer = require('multer')
var session = require('express-session');
var cookieParser = require('cookie-parser');
var Profile = require('../models/profileModel');
var User = require('../models/model');


// auth
const auth = require('../middleware/loginCheck');

// controller path
var communitiesController = require('../controller/communitiesController');
var groupEventsController = require('../controller/groupEventsController');
const req = require('express/lib/request');


//session
const oneDay = 1000 * 60 * 60 * 24;
router.use(session({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
    resave: false
}));

router.use(cookieParser());

//multer - communities file upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/media')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix + '-' + file.originalname)
    }
});


const upload = multer({ storage: storage });

// communites page
// router.get('/communities', function (req, res, next) {
//     res.render('communities');
// });

// communities find all
router.get('/communities', auth, communitiesController.communities_find_all);

// create communities
router.post('/create_communites', auth, upload.single('comm_img'), communitiesController.create_communities);

router.get('/group-about/:id', auth, communitiesController.group_find);

// groups about page
router.get('/groups_about', auth, communitiesController.groups_about);

// groups discussion page
router.get('/groups_discussion', auth, communitiesController.groups_discussion);

// groups annocement
router.get('/groups_announcement', auth, communitiesController.gorups_announcement);

// groups bridge
router.get('/groups_bridge', auth, communitiesController.groups_bridge);

// groups pillars
router.get('/groups_pillars', auth, communitiesController.groups_pillars);

// groups events
router.get('/groups_event', auth, communitiesController.groups_events);

// groups media
router.get('/groups_media', auth, communitiesController.groups_media);

// groups media photos upload
router.post('/groups_media_upload', auth, upload.array('photos_name'), communitiesController.groups_media_photos);

// groups media photos remove
router.get('/group_media_remove/:id/:photo', auth, communitiesController.groups_media_photos_remove);

// group events create
router.post('/group_create_events', auth, upload.single('event_image'), groupEventsController.group_create_events );


//groups discussion post text
router.post('/groups-discussion-post-text', auth, communitiesController.groups_discussion_post_text);

// post image upload
router.post('/groups-discussion-post-image', auth, upload.array('post_image', 12), communitiesController.groups_discussion_post_image);

// post vedio upload
router.post('/groups-discussion-post-video', auth, upload.array('post_video',12), communitiesController.groups_discussion_post_video);

//groups announcements post text
router.post('/groups-announcement-post-text', auth, communitiesController.groups_announcements_post_text);

// post image upload
router.post('/groups-announcement-post-image', auth, upload.array('post_image',12), communitiesController.groups_announcements_post_image);

// post vedio upload
router.post('/groups-announcement-post-video', auth, upload.array('post_video',12), communitiesController.groups_announcements_post_video);

// groups about edit
router.post('/groups_about_edit/:id', auth, communitiesController.groups_about_edit);



module.exports = router;
