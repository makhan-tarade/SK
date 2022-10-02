var express = require('express');
var router = express.Router();
const multer = require('multer')
var session = require('express-session');
var cookieParser = require('cookie-parser');

// auth
const auth = require('../middleware/loginCheck');

// controller path
var eventsController = require('../controller/eventsController');
const req = require('express/lib/request');
var groupEventsController = require('../controller/groupEventsController');


//session
const oneDay = 1000 * 60 * 60 * 24;
router.use(session({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
    resave: false
}));

router.use(cookieParser());

//multer - File upload path and filename
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/media')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix + '-' + file.originalname)
    }
});

// Events upload
const upload = multer({ storage: storage });


// events find all
router.get('/events', auth, eventsController.events_find_all);

router.get('/events_about', auth, eventsController.events_about);


router.get('/events_discussion', auth, eventsController.events_discussion);

router.get('/events_participants', auth, eventsController.events_participants);

router.get('/events-about/:id', auth, eventsController.event_find);

// event participents
router.get('/events-participents-add', auth, eventsController.events_participants_add);

// testing
router.post('/testing/:id', auth, eventsController.test_data);


// create events
router.post('/create_events', auth, upload.single('event_image'), eventsController.create_events);

// Events discussion post
router.post('/events-discussion-post-text', auth, eventsController.events_discussion_post_text);

// Events discussion post
router.post('/events-discussion-post-image', auth, upload.single('post_image'), eventsController.events_discussion_post_image);

// Events discussion post
router.post('/events-discussion-post-video', auth, upload.single('post_video'), eventsController.events_discussion_post_video);

// pincode
router.post('/events-area-pincode/:district', auth, eventsController.events_area_pincode);


// group events
// ##################################################################################################

// group event find
router.get('/group-event-find/:id', auth, groupEventsController.group_events_find);

// group event find
router.get('/group_events_about', auth, groupEventsController.group_events_about);

// group event find
router.get('/group_events_discussion', auth, groupEventsController.group_events_discussion);

// group event find
router.get('/group_events_participants', auth, groupEventsController.group_events_participants);






module.exports = router;
