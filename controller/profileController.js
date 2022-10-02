const { Timestamp } = require('mongodb');
var User = require('../models/model');
var path = require('path');
var fs = require('fs');

// profile pic upload
exports.profile_pic_save = (req, res) => {

    var id = req.session.userId;
    var pic = 'media/' + req.file.filename;

    
    // User.findByIdAndDelete(id, function (err, docs) {
    //     if (err) {
    //         console.log(err)
    //     }
    //     else {
    //         fs.unlink(__dirname + '/../public/' + docs.profile_pic, function (err) {
    //             if (err) return console.log(err);
    //             console.log('file deleted successfully');
    //         });
    //     }
    // });

    User.findByIdAndUpdate(id, { profile_pic: pic }, { new: true })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update User with id=${id}. Maybe Tutorial was not found!`
                });
            } else {

                fs.unlink(__dirname + '/../public/' + data.profile_pic, function (err) {
                    if (err) return console.log(err);
                    console.log('file deleted successfully');
                });

                res.redirect(req.get('referer'));
            }

        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating User with id=" + id
            });
        })
}


// profile pic and degination
exports.pic_work = async (req, res) => {
    if (req.session.login) {

        const { degination, doctor, designer, developer } = req.body;

        function mn() {
            if (degination === "Doctor") {
                return doctor;
            } else if (degination === "UI/Ux Designer") {
                return designer;
            } else if (degination === "Developer") {
                return developer;
            } else {
                return '';
            }
        }

        const profile = {
            degination: mn(),
            profile_pic: 'media/' + req.file.filename,
        }

        var id = req.session.userId;
        User.findByIdAndUpdate(id, profile, { new: true })
            .then(data => {
                if (!data) {
                    res.status(404).send({
                        message: `Cannot update User with id=${id}. Maybe Tutorial was not found!`
                    });
                } else res.redirect(req.get('referer'));
            })
            .catch(err => {
                res.status(500).send({
                    message: "Error updating User with id=" + id
                });
            });
    } else {
        req.session = false;
        res.redirect("/login");
    }
}


// profile pic upload
exports.background_pic_save = (req, res) => {

    var id = req.session.userId;
    var pic = 'media/' + req.file.filename;

    // User.findByIdAndDelete(id, function (err, docs) {
    //     if (err) {
    //         console.log(err)
    //     }
    //     else {
    //         fs.unlink(__dirname + '/../public/' + docs.background_pic, function (err) {
    //             if (err) return console.log(err);
    //             console.log('file deleted successfully');
    //         });
    //     }
    // });

    User.findByIdAndUpdate(id, { background_pic: pic }, { new: true })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update User with id=${id}. Maybe Tutorial was not found!`
                });
            } else {
                
                res.redirect(req.get('referer'));
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating User with id=" + id
            });
        })

}