var express = require('express');
var router = express.Router();
const dotenv = require('dotenv').config();
const jwt = require('jsonwebtoken');
const Agora = require("agora-access-token");

// user login check
// Bearer
router.use((req, res, next) => {  

    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }            
            
            req.userId = user.userId;
            req.userName = user.userName;
            req.userPic = user.profile_pic;
            req.profile_pic = user.profile_pic;

            console.log('userdata',user);

            next();
        });
    } else {
        res.sendStatus(401);
    }
});

module.exports = router;