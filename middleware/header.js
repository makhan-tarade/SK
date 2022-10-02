var express = require('express');
var router = express.Router();
const date = require('date-and-time');

// model
var User = require('../models/model');

// header
router.use( async (req, res, next) => {

    const userId = req.session.secondUserId ? req.session.secondUserId : req.session.userId;

        // find user data (profile , contact, etc)
        const user_data = await User.findById(userId)
            .then((data) => {
                return data;
            })
            .catch((error) => {
                res.status(400).json({
                    error: error,
                });
            });

        const username = user_data.fname + ' ' + user_data.lname;
        const myid = userId;
        // const dobf = date.format(new Date(user_data.birthday), date.compile('MM-DD-YYYY'));

        const dob = date.format(new Date(user_data.dob), "MMMM DD, YYYY");     
       
        // find first user data (profile , contact, etc)
        const user = await User.findById(req.session.userId)
            .then((data) => {
                return data;
            })
            .catch((error) => {
                res.status(400).json({
                    error: error,
                });
            });

            next();
});



module.exports = router;