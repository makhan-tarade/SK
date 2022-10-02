var express = require('express');
var router = express.Router();
const dotenv = require('dotenv').config();
const jwt = require('jsonwebtoken');
const Agora = require("agora-access-token");

// user login check
router.use((req, res, next) => {
    if (req.session.login) {
        // try {
        //     const decode = jwt.verify(req.body.token, process.env.TOKEN_SECRET);           
        // }
        // catch (err) {            
        //     res.redirect('/login');
        // }
        next();

    } else {
        req.session = false;
        res.redirect('/login');
    }
})



module.exports = router;