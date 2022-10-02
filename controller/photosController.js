const { Timestamp } = require('mongodb');
var Photos = require('../models/photosModel');
var User = require('../models/model');
var path = require('path');
var fs = require('fs');

const { friend_requests } = require('../models/myprofileModel');

// events Registraion
exports.add_photos = (req, res) => {

        var photos = new Array();
        var file_type = new Array();

        console.log(req.files.length)

        for (var i = 0; i < req.files.length; i++) {
            photos[i] = 'media/' + (req.files[i].filename);
            file_type[i] = path.extname(req.files[i].filename);
        }

        photos = new Photos({
            user: req.session.userId,
            created: new Date(),
            photos_name: photos,
            file_type: file_type,
        });

        photos.save().then(
            () => {
                //res.status(201).json(photos);
                res.status(201).redirect('/photos');
            }
        ).catch(
            (error) => {
                res.status(400).json({
                    error: error
                });
            }
        );
}

// find events all
exports.photos_find_all = async (req, res) => {

        const userId = req.session.secondUserId ? req.session.secondUserId : req.session.userId;

        // find user data (profile , contact, etc)
        const user_data = await User.findById(userId).exec();

        const username = user_data.fname + ' ' + user_data.lname;
        const myid = userId;

        // find first user data (profile , contact, etc)
        const user = await User.findById(req.session.userId).exec();

        const users = await User.find().exec();

        // find photos
        const photos = await Photos.find().exec();

        const my_kon = await User.findById(req.session.userId)
        .populate({ path: 'konnects.user', select: ['_id', 'fname', 'lname', 'profile_pic', 'mobile', 'address'] }).exec();

    // frient request list
    const fri_req_list = await friend_requests.find({ reciever: req.session.userId })
        .populate({ path: 'sender', select: ['_id', 'fname', 'lname', 'profile_pic'] }).exec();

        if (user.user_type === 'individual') {
            res.render('photos', { notifications: fri_req_list, my_kon, user, photos: photos, contact: user_data, profile: user_data, username, myid })
        } else if (user.user_type === 'premium') {
            res.render('commercial_about', { user, profile: user_data, contact: user_data, username, myid });
        }
}

// delete photos
exports.remove_photos = async (req, res) => {

    // find all photos
    const photos = await Photos.findById(req.params.id).exec();

    // find photos name
    function pic_name(e) {
        for (var i = 0; i < photos.photos_name.length; i++) {
            if (e === photos.photos_name[i]) {
                return i;
            }
        }
    }

    // pull photos_name 
    const pic = photos.photos_name[pic_name(req.params.photo)];
    Photos.findOneAndUpdate(
        { _id: req.params.id },
        { $pull: { photos_name: pic } },
        function (error, data) {
            if (error) {
                return error;
            } else {
                return data;
            }
        });    

    // var filePath = (__dirname + '/../public/photosUpload/' + req.params.photo);
    // fs.unlinkSync(filePath);

    fs.unlink(__dirname + '/../public/photosUpload/' + req.params.photo, function(err){
        if(err) return console.log(err);
        console.log('file deleted successfully');
   });

    res.redirect('/photos');

}
