var express = require('express');
var router = express.Router();
const multer = require('multer')
var session = require('express-session');
var cookieParser = require('cookie-parser');

// controller path
// var myHubController = require('../controller/myHubcontroller');
// const req = require('express/lib/request');
var myprofileController = require('../controller/myprofileController');

const auth = require('../middleware/loginCheck');


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

// myprofile
router.get('/myprofile', auth, myprofileController.find_all);

// myprofile bio update
router.post('/myprofile-bio-edit', auth, myprofileController.bio_update);

// myprofile langage update
router.post('/add-language', auth, myprofileController.add_languages);

// myprofile langage update
router.post('/edit-language/:id', auth, myprofileController.edit_languages);

// delet volunteer
router.get('/delete-language/:id', auth, myprofileController.delete_languages);


// Add volunteer
router.post('/add-volunteer', auth, myprofileController.add_volunteer);

// edit volunteer
router.post('/edit-volunteer/:id', auth, myprofileController.edit_volunteer);

// delet volunteer
router.get('/delete-volunteer/:id', auth, myprofileController.delete_volunteer);

// Add experience
router.post('/add-experience', auth, upload.single('image'), myprofileController.add_experience);

// edit education
router.post('/edit-experience/:id', auth, upload.single('image'), myprofileController.edit_experience);

// delete education
router.get('/delete-experience/:id', auth, myprofileController.delete_experience);

// Add education
router.post('/add-education', auth, upload.single('image'), myprofileController.add_education);

// edit education
router.post('/edit-education/:id', auth, upload.single('image'), myprofileController.edit_education);

// delet education
router.get('/delete-education/:id', auth, myprofileController.delete_education);

// Add skills
router.post('/add-skills', auth, myprofileController.add_skills);

// demo
router.post('/add-skills-demo', auth, myprofileController.add_skills_demo);

// ####################################################################################################################################
// premium_user_profile_edit 

router.post('/premium-user-profile-edit', auth, myprofileController.premium_user_profile_edit);

module.exports = router;