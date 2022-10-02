var express = require('express');
var router = express.Router();
const multer = require('multer')
var session = require('express-session');
var cookieParser = require('cookie-parser');

// Auth
const auth = require('../middleware/loginCheck');
var commercialController =require('../controller/commercialController');



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


const upload = multer({ storage: storage });



// commercial about
router.get('/commercial_about', auth, commercialController.commercial_about);

// commercial events
router.get('/commercial_events', auth, commercialController.commercial_events);

// commercial analitics
router.get('/commercial_analitics', auth, commercialController.commercial_analytics);

// commercial apriciation
router.get('/commercial_appriciation', auth, commercialController.commercial_appriciation);

//  commercial discussion
router.get('/commercial_discussion', auth, commercialController.commercial_discussion);

// commercialfollowers
router.get('/commercial_followers', auth, commercialController.commercial_followers);

// commercial pillars
router.get('/commercial_pillars', auth, commercialController.commercial_pillars);

// commercial benefits
router.get('/commercial_benefits', auth, commercialController.commercial_benefits);

// commercial benefits add
router.post('/commercial-benefits-add', auth, upload.single('image'), commercialController.commercial_benefits_add);

// commercial media
router.get('/commercial_media', auth, commercialController.commercial_media);

// commercial feedback
router.get('/commercial_feedback', auth, commercialController.commercial_feedback);

// appeciations post text
router.post('/appreciation-post-text', auth, commercialController.appreciation_post_create_text);

// appeciations post image
router.post('/appreciation-post-image', auth, upload.single('post_image'), commercialController.appreciation_post_create_image);

// appeciations post video
router.post('/appreciation-post-video', auth, upload.single('post_video'), commercialController.appreciation_post_create_video);

// events find by id
router.get('/commercial-events-about-find/:id', auth, commercialController.commercial_events_find);

// events about
router.get('/commercial-events-about', auth, commercialController.commercial_events_about);

// events discussion
router.get('/commercial-events-discussion', auth, commercialController.commercial_events_discussion);

// events participants
router.get('/commercial-events-participants', auth, commercialController.commercial_events_participants);

// commercial follow unfollow
router.get('/commercial-follow/:id', auth, commercialController.commercial_followers_join);

// --------------------------------------------------------------------------------------------
// grabit benifits inner page
router.get("/grabit_inner", auth, commercialController.grabit_inner_page);


module.exports = router;