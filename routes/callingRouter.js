var express = require('express');
var router = express.Router();
const dotenv = require('dotenv').config();
const { v4: uuidv4 } = require('uuid');

// middleware
const auth = require('../middleware/loginCheck');

// controller
const callingController = require('../controller/callingController');

// nocache
const nocache = (req, res, next) => {
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    res.header('expires', '-1');
    res.header('Pragma', 'no-cache');
    next();
}

// Agora web video call
router.get('/video-call', async (req, res) => {   

    // get channel
    let channel = req.query.channel;   

    // get uid
    let uid = req.query.uid;    

    // get token
    let token = req.query.token;
    if (!token || token == '') {
        res.redirect('/feed');
    }
    
    let callingData = { token, channel, uid };
    
    res.render('videocall', { callingData });
})

router.get('/stream', async (req, res) => {
    res.render('stream');
})

// Agora Token access
router.get('/access_token', nocache, callingController.token_generate);

// Agora Token access
router.get('/access_token2', nocache, callingController.token_generate2);

// Audio call
router.get('/voice-call', async (req, res) => {
    // get channel
    let channel = req.query.channel;   

    // get uid
    let uid = req.query.uid;    

    // get token
    let token = req.query.token;
    // if (!token || token == '') {
    //     res.redirect('/feed');
    // }
    
    let callingData = { token, channel, uid };

    res.render('voicecall', { callingData });
})


module.exports = router;