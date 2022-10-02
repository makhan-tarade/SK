// Agora Token
const { RtcTokenBuilder, RtcRole } = require('agora-access-token');



// Agora 

const APP_ID = process.env.APP_ID;
const APP_CERTIFICATE = process.env.APP_CERTIFICATE;


exports.token_generate = async (req, res) => {
    // set response header
    res.header('Acess-Controle-Allow-Origin', '*');

    // get channel name
    const channelName = req.query.channelName;
    if (!channelName) {
        return res.status(500).json({ 'error': 'channel is required' });
    }

    // get uid
    let uid = req.query.uid;
    if (!uid || uid == '') {
        uid = 0;
        // uid = Math.floor(Math.random() * 100000);
    }

    // get role
    let role = RtcRole.SUBSCRIBER;
    if (req.query.role == 'publisher') {
        role = RtcRole.PUBLISHER;
    }

    //get the expire time
    let expireTime = req.query.expireTime;
    if (!expireTime || expireTime == '') {
        expireTime = 1800;
    } else {
        expireTime = parseInt(expireTime, 10);
    }

    // calculate privilege expire time
    const currenTime = Math.floor(Date.now() / 1000);
    const privilegeExpireTime = currenTime + expireTime;

    // build the token
    const token = RtcTokenBuilder.buildTokenWithUid(APP_ID, APP_CERTIFICATE, channelName, uid, role, privilegeExpireTime);

    // res.redirect(`/video-call?token=${token}&channel=${channelName}&uid=${uid}`);
    const link = `/video-call?token=${token}&channel=${channelName}&uid=${uid}`;
    res.json(link);
}

// voice call
exports.token_generate2 = async (req, res) => {
    // set response header
    res.header('Acess-Controle-Allow-Origin', '*');

    // get channel name
    const channelName = req.query.channelName;
    if (!channelName) {
        return res.status(500).json({ 'error': 'channel is required' });
    }

    // get uid
    let uid = req.query.uid;
    if (!uid || uid == '') {
        uid = 0;
        // uid = Math.floor(Math.random() * 100000);
    }

    // get role
    let role = RtcRole.SUBSCRIBER;
    if (req.query.role == 'publisher') {
        role = RtcRole.PUBLISHER;
    }

    //get the expire time
    let expireTime = req.query.expireTime;
    if (!expireTime || expireTime == '') {
        expireTime = 1800;
    } else {
        expireTime = parseInt(expireTime, 10);
    }

    // calculate privilege expire time
    const currenTime = Math.floor(Date.now() / 1000);
    const privilegeExpireTime = currenTime + expireTime;


    // build the token
    const token = RtcTokenBuilder.buildTokenWithUid(APP_ID, APP_CERTIFICATE, channelName, uid, role, privilegeExpireTime);

    //    res.redirect(`/voice-call?token=${token}&channel=${channelName}&uid=${uid}`);
    const link = `/voice-call?token=${token}&channel=${channelName}&uid=${uid}`;
    res.json(link);

}