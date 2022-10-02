var express = require('express');
var router = express.Router();
const multer = require('multer')
var session = require('express-session');
var cookieParser = require('cookie-parser');

// auth
const auth = require('../middleware/loginCheck');

// controller path
var contactInfoController = require('../controller/contactInfoController');
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

// events page
// router.get('/events', function (req, res, next) {
//     res.render('events');
// });

// events find all
router.get('/contact_info_find', auth, contactInfoController.contact_info_find_all);

// create events
router.post('/create_contact_info', auth, contactInfoController.create_contact_info);

// events find all
router.post('/contact_info_edit/:id', auth, contactInfoController.contact_info_edit);



module.exports = router;
