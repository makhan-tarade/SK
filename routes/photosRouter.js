var express = require('express');
var router = express.Router();
const multer = require('multer')
var session = require('express-session');
var cookieParser = require('cookie-parser');
var Profile = require('../models/profileModel');

// auth
const auth = require('../middleware/loginCheck');

// controller path
var photosController = require('../controller/photosController');
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
router.get('/photos', auth, photosController.photos_find_all);

// Add photos
// router.post('/add_photos', upload.single('photos_name'), photosController.add_photos);

router.post('/add_photos', auth, upload.array('photos_name', 12), photosController.add_photos);

// remove photos
router.get('/remove_photos/:id/:photo', auth, photosController.remove_photos);




module.exports = router;
