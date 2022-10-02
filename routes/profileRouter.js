var express = require('express');
var router = express.Router();
const multer = require('multer')
var session = require('express-session');
var cookieParser = require('cookie-parser');

// auth
const auth = require('../middleware/loginCheck');

// controller path
var profileController = require('../controller/profileController');
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


// profile pic
router.post('/profile_pic_save', auth, upload.single('profile_pic'), profileController.profile_pic_save);

// profile pic and work
router.post('/profile_pic_work', auth, upload.single('profile_pic'), profileController.pic_work);

// background img
router.post('/background_pic_work', auth, upload.single('background_pic'), profileController.background_pic_save);

module.exports = router;
