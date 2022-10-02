var express = require('express');
var router = express.Router();
const dotenv = require('dotenv').config();
const jwt = require('jsonwebtoken');
const Agora = require("agora-access-token");

// user login check
router.use((req, res, next) => {
    if (req.session.login) {
        
        res.redirect('/feed');

    } else {
       next();
    }
})



module.exports = router;