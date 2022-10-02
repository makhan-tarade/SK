const { checkins, sports, music, movies, tvshows, books } = require('../models/moreModel');
const User = require('../models/model');

const { friend_requests } = require('../models/myprofileModel');

// checkins find
exports.checkin_find = async (req, res) => {

    const userId = req.session.secondUserId ? req.session.secondUserId : req.session.userId;

    // find user data (profile , contact, etc)
    const user_data = await User.findById(userId).exec();

    const username = user_data.fname + ' ' + user_data.lname;
    const myid = userId;

    // find first user data (profile , contact, etc)
    const user = await User.findById(req.session.userId).exec();

    const users = await User.find().exec();

    const checkin_data = await checkins.find().exec();

    const my_kon = await User.findById(req.session.userId)
        .populate({ path: 'konnects.user', select: ['_id', 'fname', 'lname', 'profile_pic', 'mobile', 'address'] }).exec();

    // frient request list
    const fri_req_list = await friend_requests.find({ reciever: req.session.userId })
        .populate({ path: 'sender', select: ['_id', 'fname', 'lname', 'profile_pic'] }).exec();

    res.render('checks_in', { notifications: fri_req_list, my_kon, checkin: checkin_data, user, contact: user_data, profile: user_data, username, myid });
   


}


// sports find
exports.sports_find = async (req, res) => {

    const userId = req.session.secondUserId ? req.session.secondUserId : req.session.userId;

    // find user data (profile , contact, etc)
    const user_data = await User.findById(userId).exec();

    const username = user_data.fname + ' ' + user_data.lname;
    const myid = userId;

    // find first user data (profile , contact, etc)
    const user = await User.findById(req.session.userId).exec();

    const users = await User.find().exec();

    const sports_data = await sports.find().exec();

    const my_kon = await User.findById(req.session.userId)
    .populate({ path: 'konnects.user', select: ['_id', 'fname', 'lname', 'profile_pic', 'mobile', 'address'] }).exec();

// frient request list
const fri_req_list = await friend_requests.find({ reciever: req.session.userId })
    .populate({ path: 'sender', select: ['_id', 'fname', 'lname', 'profile_pic'] }).exec();

    res.render('sport', { notifications: fri_req_list, my_kon, sports: sports_data, user, contact: user_data, profile: user_data, username, myid });


}

// music find
exports.music_find = async (req, res) => {


    const userId = req.session.secondUserId ? req.session.secondUserId : req.session.userId;

    // find user data (profile , contact, etc)
    const user_data = await User.findById(userId).exec();

    const username = user_data.fname + ' ' + user_data.lname;
    const myid = userId;

    // find first user data (profile , contact, etc)
    const user = await User.findById(req.session.userId).exec();

    const users = await User.find().exec();

    const music_data = await music.find().exec();

    const my_kon = await User.findById(req.session.userId)
    .populate({ path: 'konnects.user', select: ['_id', 'fname', 'lname', 'profile_pic', 'mobile', 'address'] }).exec();

// frient request list
const fri_req_list = await friend_requests.find({ reciever: req.session.userId })
    .populate({ path: 'sender', select: ['_id', 'fname', 'lname', 'profile_pic'] }).exec();

    res.render('music', { notifications: fri_req_list, my_kon, music: music_data, user, contact: user_data, profile: user_data, username, myid });


}

// movies find
exports.movies_find = async (req, res) => {


    const userId = req.session.secondUserId ? req.session.secondUserId : req.session.userId;

    // find user data (profile , contact, etc)
    const user_data = await User.findById(userId).exec();

    const username = user_data.fname + ' ' + user_data.lname;
    const myid = userId;

    // find first user data (profile , contact, etc)
    const user = await User.findById(req.session.userId).exec();

    const users = await User.find().exec();

    const movies_data = await movies.find().exec();

    const my_kon = await User.findById(req.session.userId)
    .populate({ path: 'konnects.user', select: ['_id', 'fname', 'lname', 'profile_pic', 'mobile', 'address'] }).exec();

// frient request list
const fri_req_list = await friend_requests.find({ reciever: req.session.userId })
    .populate({ path: 'sender', select: ['_id', 'fname', 'lname', 'profile_pic'] }).exec();

    res.render('movies', { notifications: fri_req_list, my_kon, movies: movies_data, user, contact: user_data, profile: user_data, username, myid });


}

// tvshows find
exports.tvshows_find = async (req, res) => {



    const userId = req.session.secondUserId ? req.session.secondUserId : req.session.userId;

    // find user data (profile , contact, etc)
    const user_data = await User.findById(userId).exec();

    const username = user_data.fname + ' ' + user_data.lname;
    const myid = userId;

    // find first user data (profile , contact, etc)
    const user = await User.findById(req.session.userId).exec();

    const users = await User.find().exec();

    const tvshows_data = await tvshows.find().exec();

    const my_kon = await User.findById(req.session.userId)
        .populate({ path: 'konnects.user', select: ['_id', 'fname', 'lname', 'profile_pic', 'mobile', 'address'] }).exec();

    // frient request list
    const fri_req_list = await friend_requests.find({ reciever: req.session.userId })
        .populate({ path: 'sender', select: ['_id', 'fname', 'lname', 'profile_pic'] }).exec();

    res.render('tv_show', { notifications: fri_req_list, my_kon, tvshows: tvshows_data, user, contact: user_data, profile: user_data, username, myid });


}

// books find
exports.books_find = async (req, res) => {


    const userId = req.session.secondUserId ? req.session.secondUserId : req.session.userId;

    // find user data (profile , contact, etc)
    const user_data = await User.findById(userId).exec();

    const username = user_data.fname + ' ' + user_data.lname;
    const myid = userId;

    // find first user data (profile , contact, etc)
    const user = await User.findById(req.session.userId).exec();

    const users = await User.find().exec();

    const books_data = await books.find().exec();

    const my_kon = await User.findById(req.session.userId)
        .populate({ path: 'konnects.user', select: ['_id', 'fname', 'lname', 'profile_pic', 'mobile', 'address'] }).exec();

    // frient request list
    const fri_req_list = await friend_requests.find({ reciever: req.session.userId })
        .populate({ path: 'sender', select: ['_id', 'fname', 'lname', 'profile_pic'] }).exec();

    res.render('books', { notifications: fri_req_list, my_kon, books: books_data, user, contact: user_data, profile: user_data, username, myid });


}



//check in add user
exports.checkin_add_user = async (req, res) => {

    checkins.findByIdAndUpdate(
        req.body.id,
        { $push: { user: req.session.userId } },
        function (error, data) {
            if (error) {
                res.json(error);
            } else {
                res.redirect(req.get('referer'));
            }
        });
}

//sports in add user
exports.sports_add_user = async (req, res) => {

    sports.findByIdAndUpdate(
        req.body.id,
        { $push: { user: req.session.userId } },
        function (error, data) {
            if (error) {
                res.json(error);
            } else {
                res.redirect(req.get('referer'));
            }
        });
}

//music in add user
exports.music_add_user = async (req, res) => {

    music.findByIdAndUpdate(
        req.body.id,
        { $push: { user: req.session.userId } },
        function (error, data) {
            if (error) {
                res.json(error);
            } else {
                res.redirect(req.get('referer'));
            }
        });
}

//movies in add user
exports.movies_add_user = async (req, res) => {

    movies.findByIdAndUpdate(
        req.body.id,
        { $push: { user: req.session.userId } },
        function (error, data) {
            if (error) {
                res.json(error);
            } else {
                res.redirect(req.get('referer'));
            }
        });
}

//tvshows in add user
exports.tvshows_add_user = async (req, res) => {

    tvshows.findByIdAndUpdate(
        req.body.id,
        { $push: { user: req.session.userId } },
        function (error, data) {
            if (error) {
                res.json(error);
            } else {
                res.redirect(req.get('referer'));
            }
        });
}

// books add user
exports.books_add_user = async (req, res) => {

    books.findByIdAndUpdate(
        req.body.id,
        { $push: { user: req.session.userId } },
        function (error, data) {
            if (error) {
                res.json(error);
            } else {
                res.redirect(req.get('referer'));
            }
        });
}
