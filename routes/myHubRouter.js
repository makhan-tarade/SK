var express = require('express');
var router = express.Router();
const multer = require('multer')
var session = require('express-session');
var cookieParser = require('cookie-parser');

// auth
const auth = require('../middleware/loginCheck');

// controller path
var myHubController = require('../controller/myHubcontroller');
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
  
// multer storage
const upload = multer({ storage: storage });

// myhub page ( my hub page view and find all data)
router.get('/myhub', auth, myHubController.find_all);

// add health - health
router.post('/add-health', auth, upload.single('attachment'), myHubController.add_health);

// add priscription - health
router.post('/add-health-prescription', auth, upload.single('attachment'), myHubController.add_prescription);

// delete health - health
router.get('/delete-health/:oi', auth, myHubController.delete_health);

// delete priscription - health
router.get('/delete-prescription/:oi', auth, myHubController.delete_prescription);

// doctor add - health
router.post('/doctor-register', auth, upload.single('profile_pic'), myHubController.doctor_register);

// doctor ( search by pincode )
router.post('/doctor-search/:pincode', auth, myHubController.search_doctor);

// myhub - community pillar 
router.post('/myhub-community-pillar', auth, myHubController.community_pillar);

// doctor register - health
router.post('/doctor-register', auth, upload.single('profile_pic'), myHubController.doctor_register);

// doctor edit data - health
router.post('/doctor-edit', auth, upload.single('profile_pic'), myHubController.doctor_edit);

// doctor delete - health
router.get('/doctor-delete/:id', auth, myHubController.doctor_delete);

// --------------------------------------------------------------------------------------------------------------------------------
// friend request and relation
// add friend request
router.get('/friend-request/:id', myHubController.add_friends_request);

// friend request response
router.get('/friend-response/:id', myHubController.friend_request_response);

// add relation
router.post('/api-relation', auth, myHubController.add_relations);

module.exports = router;