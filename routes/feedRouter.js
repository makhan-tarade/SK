var express = require('express');
var router = express.Router();
const multer = require('multer')
var session = require('express-session');
var cookieParser = require('cookie-parser');

// import middleware
const auth = require('../middleware/loginCheck');

// controller path
var feedController = require('../controller/feedController');
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

// feed page - post view
router.get('/feed', auth, feedController.feed);

// feed page - post view
// router.get('/feed_un', feedController.feed_un);

// post image upload
router.post('/post-create', auth, upload.array('post_files',12), feedController.post_create);

// post delete

// like
router.post('/feed-like', auth, feedController.feed_post_like);

// like1
//router.post('/feed-like1', feedController.feed_post_like1);

router.get('/feed-like-show', auth, feedController.feed_post_like_show);

// share
router.post('/feed-share', auth, feedController.feed_post_share);

// comment
router.post('/feed-comment', auth, feedController.feed_post_comment);

// comment show
router.post('/feed-comment-show', auth, feedController.feed_post_comment_show);

// like and dislike
router.post("/like_post", upload.none(), feedController.like_post);

// searchbar search friends
router.post('/search', auth, feedController.search_friends);

// find user profile
router.get('/user-profile', auth, feedController.user_profile);

// events discussion post user id
router.get('/feed-events-user', auth, feedController.events_discussion_post_user);

router.get('/area-pincode/:district', auth, feedController.area_pincode);

// ------------------------------------------- Ajax -------------------------------
// find post
router.get('/find-feed-post', auth, feedController.find_post);

// find post
router.get('/find-feed-post-testing', auth, feedController.find_post_testing);

// find my post and my konnects posts
router.get('/find-all-post', auth, feedController.find_all_post);

// nested object
router.get('/find-nested', feedController.find_nested);

// ---------------------------------------------------- grabit ----------------------------------------------

// grabit benefits
router.get('/benefits', auth, feedController.grabit_benefits)

// grabit benifits inner page
router.get("/benefits-inner", auth, feedController.benefits_inner_page);

// ------------------------------------------------------- myhub feed -------------------------------------------------------

// second user
router.use('/home/:id', async (req, res) => {
    req.session.secondUserId = req.params.id;
    res.redirect('/home');
})

// home page 
router.get('/home', auth, feedController.myhub_feed_page);

module.exports = router;
