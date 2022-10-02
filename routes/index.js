var express = require('express');
var router = express.Router();
const dotenv = require('dotenv').config();
var axios = require('axios');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var mongoose = require('mongoose');
const Agora = require("agora-access-token");

// Auth
const auth = require('../middleware/loginCheck');

// import model
var User = require('../models/model');
var Profile = require('../models/profileModel');
var ContactInfo = require('../models/contactInfoModel');
var Feed = require('../models/feedModel');
const contact = require('../models/contactModel');

const { friend_requests } = require('../models/myprofileModel');

const { communities, communities_events, communities_events_discussion, communities_photos, communities_discussion_post, communities_announcements_post, posts } = require('../models/communitiesModel1');



var ContactInfo = require("../models/contactInfoModel");

var url = require('url');
var date = require('date-and-time');

const { district, area_pincode } = require('../models/areaPincodeModel');

// import index router
var indexController = require('../controller/indexController');

//session
const oneDay = 1000 * 60 * 60 * 24;
router.use(session({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
    resave: false
}));
router.use(cookieParser());

// email satrt
// nodemailer
var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS
    }
});

router.post('/invite-friends', async (req, res) => {

    if (!req.body) {
        res.json({ status: 'failed', message: 'empty fields!' });
    }

    var email = req.body.email;
    var description = req.body.description;
    var name = req.session.userName;


    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: 'no-reply@seniorkonnect.com', // sender address
        to: `${email}`, // list of receivers
        subject: `Invite from ${name}`, // Subject line
        text: `${name} has Invited you to join Senior Konnect.

    Click Here  https://www.seniorkonnect.com
    
    ${description}`, // plain text body

    });

    console.log(info);

    if (info) {
        res.redirect(req.get('referer'));
    } else {
        res.redirect(req.get('referer'));
    }
})
// email end

/* GET home page. */
router.get('/', function (req, res) {
    console.log("user Id: " + req.session.userId);
    // var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;

    res.render('index');
});

router.get('/experience', function (req, res) {
    res.render('experience');
});

router.get('/register', function (req, res) {
    res.render('register');
});

router.get('/individual', function (req, res) {
    res.render('individual');
});

router.get('/ngo', function (req, res) {
    res.render('ngo');
});

router.get('/policy', function (req, res) {
    res.render('policy');
});


router.get('/terms', function (req, res) {
    res.render('terms');
});


router.get('/about', function (req, res) {
    res.render('about');
});

router.get('/refund', function (req, res) {
    res.render('refund');
});

router.get('/contact', function (req, res) {
    res.render('contact');
});

router.get('/how_it_works', function (req, res) {
    res.render('how_it_works');
});

router.get('/grabit_new', function (req, res) {
    res.render('grabit_new');
});

router.post('/contact-add', async (req, res) => {

    const { name, mobile, remark, email } = req.body;

    const data = new contact({
        name,
        mobile,
        remark,
        email,
        created: new Date(),
    });

    data.save()
        .then(() => {
            res.status(201).redirect(req.get('referer'));
        })
        .catch((error) => {
            res.status(400).json({
                error: error,
            });
        });
})

router.get('/about-new', function (req, res) {
    res.render('about-new');
});

// 

// profile pages
router.get('/profile_about', function (req, res) {
    res.render('profile_about');
});

router.get('/initiative', function (req, res) {
    res.render('initiative');
});

// commercial page
router.get('/commercial', function (req, res) {
    res.render('commercial');
});

router.get('/myprofile_events', function (req, res) {
    if (req.session.login) {
        res.render('myprofile_events');
    } else {
        req.session = false;
        res.redirect('/login');
    }

});




// grab it
router.get('/grabit', async (req, res) => {
    if (req.session.login) {

        const userId = req.session.secondUserId ? req.session.secondUserId : req.session.userId;

        // find user data (profile , contact, etc)
        const user_data = await User.findById(userId).exec();

        const username = user_data.fname + ' ' + user_data.lname;
        const myid = userId;
        // const dobf = date.format(new Date(user_data.birthday), date.compile('MM-DD-YYYY'));

        const dob = date.format(new Date(user_data.dob), "MMMM DD, YYYY");


        // find first user data (profile , contact, etc)
        const user = await User.findById(req.session.userId).exec();

        res.render('grabit', { dob, user, contact: user_data, profile: user_data, myid, username });

    } else {
        req.session = false;
        res.redirect('/login');
    }
});


// 
router.get('/premium_myaccount', async function (req, res) {
    if (req.session.login) {

        const userId = req.session.secondUserId ? req.session.secondUserId : req.session.userId;

        // find user data (profile , contact, etc)
        const user_data = await User.findById(userId).exec();

        const username = user_data.fname + ' ' + user_data.lname;
        const myid = userId;

        // find first user data (profile , contact, etc)
        const user = await User.findById(req.session.userId).exec();

        res.render('premium_myaccount', { user, profile: user_data, contact: user_data, username, myid });
    } else {
        req.session = false;
        res.redirect('/login');
    }
});

// 
router.get('/premium_billing', async function (req, res) {
    if (req.session.login) {

        const userId = req.session.secondUserId ? req.session.secondUserId : req.session.userId;

        // find user data (profile , contact, etc)
        const user_data = await User.findById(userId).exec();

        const username = user_data.fname + ' ' + user_data.lname;
        const myid = userId;

        // find first user data (profile , contact, etc)
        const user = await User.findById(req.session.userId).exec();

        res.render('premium_billing', { user, profile: user_data, contact: user_data, username, myid });
    } else {
        req.session = false;
        res.redirect('/login');
    }
});

// 
router.get('/premium_currentplans', async function (req, res) {
    if (req.session.login) {

        const userId = req.session.secondUserId ? req.session.secondUserId : req.session.userId;

        // find user data (profile , contact, etc)
        const user_data = await User.findById(userId).exec();

        const username = user_data.fname + ' ' + user_data.lname;
        const myid = userId;

        // find first user data (profile , contact, etc)
        const user = await User.findById(req.session.userId).exec();

        res.render('premium_currentplans', { user, profile: user_data, contact: user_data, username, myid });
    } else {
        req.session = false;
        res.redirect('/login');
    }
});


// 
router.get('/premium_chooseplan', async function (req, res) {
    if (req.session.login) {

        const userId = req.session.secondUserId ? req.session.secondUserId : req.session.userId;

        // find user data (profile , contact, etc)
        const user_data = await User.findById(userId).exec();

        const username = user_data.fname + ' ' + user_data.lname;
        const myid = userId;

        // find first user data (profile , contact, etc)
        const user = await User.findById(req.session.userId).exec();

        res.render('premium_chooseplan', { user, profile: user_data, contact: user_data, username, myid });
    } else {
        req.session = false;
        res.redirect('/login');
    }
});

// 
router.get('/premium_pendingplans', async function (req, res) {
    if (req.session.login) {

        const userId = req.session.secondUserId ? req.session.secondUserId : req.session.userId;

        // find user data (profile , contact, etc)
        const user_data = await User.findById(userId).exec();

        const username = user_data.fname + ' ' + user_data.lname;
        const myid = userId;

        // find first user data (profile , contact, etc)
        const user = await User.findById(req.session.userId).exec();

        res.render('premium_pendingplans', { user, profile: user_data, contact: user_data, username, myid });
    } else {
        req.session = false;
        res.redirect('/login');
    }
});

// 
router.get('/premium_invoice', async function (req, res) {
    if (req.session.login) {

        const userId = req.session.secondUserId ? req.session.secondUserId : req.session.userId;

        // find user data (profile , contact, etc)
        const user_data = await User.findById(userId).exec();

        const username = user_data.fname + ' ' + user_data.lname;
        const myid = userId;

        // find first user data (profile , contact, etc)
        const user = await User.findById(req.session.userId).exec();

        res.render('premium_invoice', { user, profile: user_data, contact: user_data, username, myid });
    } else {
        req.session = false;
        res.redirect('/login');
    }
});


// 
router.get('/activity', function (req, res) {
    if (req.session.login) {
        res.render('activity');
    } else {
        req.session = false;
        res.redirect('/login');
    }
});

// 
router.get('/activity', function (req, res) {
    if (req.session.login) {
        res.render('activity');
    } else {
        req.session = false;
        res.redirect('/login');
    }
});

// konnect page
router.get('/konnects', auth, async function (req, res) {

    const userId = req.session.secondUserId ? req.session.secondUserId : req.session.userId;

    // find user data (profile , contact, etc)
    const user_data = await User.findById(userId).exec();

    const username = user_data.fname + ' ' + user_data.lname;
    const myid = userId;

    // find first user data (profile , contact, etc)
    const user = await User.findById(req.session.userId).exec();

    // find users
    const users = await User.find().exec();

    const my_kon = await User.findById(req.session.userId)
        .populate({ path: 'konnects.user', select: ['_id', 'fname', 'lname', 'profile_pic', 'mobile', 'address'] }).exec();

    // frient request list
    const fri_req_list = await friend_requests.find({ reciever: req.session.userId })
        .populate({ path: 'sender', select: ['_id', 'fname', 'lname', 'profile_pic'] }).exec();


    if (user.user_type === 'individual') {
        res.render('konnects', { notifications: fri_req_list, my_kon, user, users, contact: user_data, profile: user_data, username, userid: myid, myid });
    } else if (user.user_type === 'premium') {
        res.render('commercial_about', { user, profile: user_data, contact: user_data, username, myid });
    }
});


// coominSoon
router.get('/comming_soon', function (req, res) {
    if (req.session.login) {
        res.render('commingSoon');
    } else {
        req.session = false;
        res.redirect('/login');
    }
});


// like post - userid
router.post('/like/:id', async (req, res) => {
    if (req.session.login) {
        var id = req.params.id;
        var userid;


        Feed.findById(id).then(data => {

            var user = req.body.user;
            var count = data.like.length;

            // find user
            function uid(e) {
                for (var i = 0; i < count; i++) {
                    if (data.like[i] === e) {
                        return data.like[i];
                    }
                }
            }

            const uid_id = uid(user);

            // check user
            if (uid_id === user) {
                // pull user
                Feed.findOneAndUpdate(
                    { _id: id },
                    { $pull: { like: user } },
                    function (error, data) {
                        if (error) {
                            return error;
                        } else {
                            // res.json(data);
                            return data;
                        }
                    });
                // res.json('Unliked')
                function like() {
                    // res.redirect(req.get('referer'));
                    res.json(data)
                }
                setTimeout(like, 1000);
            }
            else {
                // push user
                Feed.findOneAndUpdate(
                    { _id: id },
                    { $push: { like: user } },
                    function (error, data) {
                        if (error) {
                            return error;
                        } else {
                            // res.json(data);
                            return data;
                        }
                    });

                // res.json('Liked')
                function unlike() {
                    // res.redirect(req.get('referer'));
                    res.json(data)
                }
                setTimeout(unlike, 1000);
            }


        }).catch(
            (error) => {
                res.status(404).json({
                    error: error
                });
            }
        );
    } else {
        req.session = false;
        res.redirect('/login');
    }

});

// grabit
router.get('/lifestyle', async (req, res) => {
    if (req.session.login) {

        const userId = req.session.secondUserId ? req.session.secondUserId : req.session.userId;

        // find user data (profile , contact, etc)
        const user_data = await User.findById(userId).exec();

        const username = user_data.fname + ' ' + user_data.lname;
        const myid = userId;

        // find first user data (profile , contact, etc)
        const user = await User.findById(req.session.userId).exec();

        res.render('grabit1', { user, contact: user_data, profile: user_data, username, userid: myid, myid });
    }
    else {
        req.session = false;
        res.redirect('/login');
    }
})

// lifstyle benefits
router.get('/lifestyle-new', async (req, res) => {
    if (req.session.login) {

        const userId = req.session.secondUserId ? req.session.secondUserId : req.session.userId;

        // find user data (profile , contact, etc)
        const user_data = await User.findById(userId).exec();

        const username = user_data.fname + ' ' + user_data.lname;
        const myid = userId;

        // find first user data (profile , contact, etc)
        const user = await User.findById(req.session.userId).exec();

        res.render('grabit-lifestyle', { user, contact: user_data, profile: user_data, username, userid: myid, myid });
    }
    else {
        req.session = false;
        res.redirect('/login');
    }
})

router.get('/wealth', async (req, res) => {
    if (req.session.login) {

        const userId = req.session.secondUserId ? req.session.secondUserId : req.session.userId;

        // find user data (profile , contact, etc)
        const user_data = await User.findById(userId).exec();

        const username = user_data.fname + ' ' + user_data.lname;
        const myid = userId;

        // find first user data (profile , contact, etc)
        const user = await User.findById(req.session.userId).exec();

        res.render('grabit-wealth', { user, contact: user_data, profile: user_data, username, userid: myid, myid });
    }
    else {
        req.session = false;
        res.redirect('/login');
    }
})

router.get('/health', async (req, res) => {
    if (req.session.login) {

        const userId = req.session.secondUserId ? req.session.secondUserId : req.session.userId;

        // find user data (profile , contact, etc)
        const user_data = await User.findById(userId).exec();

        const username = user_data.fname + ' ' + user_data.lname;
        const myid = userId;

        // find first user data (profile , contact, etc)
        const user = await User.findById(req.session.userId).exec();

        res.render('grabit-health', { user, contact: user_data, profile: user_data, username, userid: myid, myid });
    }
    else {
        req.session = false;
        res.redirect('/login');
    }
})






// test data
router.post('/sortpost', async (req, res) => {

    const data = await User.find();
    if (!data) {
        res.json({ status: 'failed' })
    } else {
        //    var a = data.sort('pincode');
        res.json({ status: 'success', data })
    }
});



// find friends
router.get('/find-friends', indexController.find_friends);

// find friends
router.get('/find-pin/:pin', async (req, res) => {

    const pin = await area_pincode.findOne({ pin: req.params.pin }).exec();

    if (!pin) {
        res.json({
            status: 'failed',
            message: 'pin not found ...',
        });
    } else {
        res.json({
            status: 'success',
            message: 'pin find success ...',
            result: pin.pin
        });
    }

});


// router.post('/makhan', indexController.makhan);




module.exports = router;