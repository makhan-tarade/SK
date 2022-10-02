
var User = require('../models/model');
var express = require('express');
var router = express.Router();
var session = require('express-session');
var cookieParser = require('cookie-parser');


//session
const oneDay = 1000 * 60 * 60 * 24;
router.use(session({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
    resave: false
}));
router.use(cookieParser());



// User Registraion
exports.user_registration = async (req, res) => {

    const auser = await User.findOne({ mobile: req.body.mobile });

    var user = new User({
        user_type: req.body.user_type,
        fname: req.body.fname,
        lname: req.body.lname,
        username: req.body.fname + req.body.lname,
        email: req.body.email,
        mobile: req.body.mobile,
        pincode: req.body.pincode,
        check: req.body.check,
        created: new Date(),
        friends: new Array(),
        rofile_pic: '',
    });

    if (auser) {
        res.json({ status: 'failed', message: 'user already exists' });
    } else {

        user.save(user).then(
            (user) => {

                // res.status(201).render('login', { mobile: user.mobile });
                req.session.rmob = user.mobile;
                res.json({ status: 'success', message: 'user registration successfully' });
            }
        ).catch(
            (error) => {
                res.status(400).json({
                    error: error
                });
            }
        );
    }
}


// OTP Generate function
function generateOTP() {

    var digits = '0123456789';
    let OTP = '';
    for (let i = 0; i < 6; i++) {
        OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
}

// mobile verification
exports.mobile_verification = async (req, res) => {
    const { mobile } = req.body;
    const user = await User.findOne({ mobile: mobile });

    // console.log(user)

    if (!user) {
        res.json({ status: 'failed', message: 'your mobile number are not registered, please regiser first!' })
    } else {
        if (mobile === user.mobile) {
            //otp genrate
            var rnum = generateOTP();
            req.session.userMobile = user.mobile;
            req.session.old_otp = rnum;
            res.json({ status: 'success', message: 'otp send your registered mobile number' });
        }
    }
}

// Resend otp
exports.resend_otp = (req, res) => {

    // if (req.session.userMobile) {

    var rnum = generateOTP();
    req.session.old_otp = rnum;
    console.log(rnum);
    // res.json('success');
    res.redirect('/otp')


    // } else {
    //     res.json('mobile number not found')
    // }
}


// OTP verification
exports.otp_verification = async (req, res) => {

    var old_otp = req.session.old_otp;

    var digit1 = req.body.digit1;
    var digit2 = req.body.digit2;
    var digit3 = req.body.digit3;
    var digit4 = req.body.digit4;
    var digit5 = req.body.digit5;
    var digit6 = req.body.digit6;

    var new_otp = digit1 + digit2 + digit3 + digit4 + digit5 + digit6;

    console.log(digit1 + digit2 + digit3 + digit4 + digit5 + digit6, old_otp);

    var str_o_otp = JSON.stringify(old_otp);
    var str_n_otp = JSON.stringify(new_otp);

    console.log(str_o_otp + ' ' + str_n_otp);

    const user = await User.findOne({ mobile: req.session.userMobile });

    if (str_o_otp === str_n_otp) {
        if (!user) {
            console.log({ status: 'failed', message: 'user not found' })
        }
        else {
            console.log("otp matched");
            req.session.login = user.mobile;
            req.session.userId = user._id;
            req.session.userName = user.fname + " " + user.lname;
            req.session.profilePic = user.profile_pic;

            console.log(req.session.userId);
            // const token = jwt.sign({ userId: user._id }, process.env.TOKEN_SECRET, { expiresIn: '1800s' });
            res.redirect('/feed');
        }
    } else {
        console.log("otp not metched");
        res.redirect('/otp');
    }
}