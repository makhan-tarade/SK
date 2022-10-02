var express = require('express');
var router = express.Router();
var session = require('express-session');
var cookieParser = require('cookie-parser');

// auth
const auth = require('../middleware/logedin');


//session
const oneDay = 1000 * 60 * 60 * 24;
router.use(session({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
    resave: false
}));
router.use(cookieParser());

// import login register controller file
var loginRegisterController = require('../controller/loginRegisterController');


// login
router.get('/login', auth, function (req, res) {
    const mobile = req.session.rmob ? req.session.rmob : '';
    res.render('login', { mobile });
});

// User registration
router.post('/user-registration', loginRegisterController.user_registration);

// Logout
router.get('/logout', function (req, res) {
    req.session.destroy();
    res.redirect('/login');
});

// mobile verification
router.post('/mobile-verification', loginRegisterController.mobile_verification);

// otp page
router.get('/otp', function (req, res, next) {
    var otp = req.session.old_otp;
    res.render('otp', { otp: otp });
});

// resend otp
router.get('/resend-otp', loginRegisterController.resend_otp);

// OTP verification
router.post('/otp-verification', loginRegisterController.otp_verification);


module.exports = router;