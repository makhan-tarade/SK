const { Timestamp } = require('mongodb');
var ContactInfo = require('../models/contactInfoModel');
var User = require('../models/model');
const date = require('date-and-time');

var dob = date.format(new Date(), 'DD/MM/YYYY');
console.log( 'Welcome Makhan Tarade ',dob);

 

// Contact Info Create
exports.create_contact_info = (req, res, next) => {

    var dob = new Date(req.body.birthday);
    var new_dob = date.format(dob, 'DD/MM/YYYY');

    var contactInfo = new ContactInfo({
        address: req.body.address,
        mobile: req.body.mobile,
        email: req.body.email,
        birthday: new_dob,
        
    });

    contactInfo.save().then(
        () => {
            res.status(201).json(contactInfo);
            // res.status(201).redirect('/events');
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
}


// contact info find all
exports.contact_info_find_all = async (req, res) => {
    const contact_info = await ContactInfo.findOne().then(
        (contactInfo) => {            
            return contactInfo;
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
}


// Contact Info update
exports.contact_info_edit = (req, res) => {
    if (!req.body) {
        return res.status(400).json({
            message: "Data to update can not be empty!"
        });
    }

    var id = req.params.id;
    var dob = new Date(req.body.birthday);
    var new_dob = date.format(dob, 'DD/MM/YYYY');

    var contact_data = {
        address: req.body.address,
        contact_mobile: req.body.mobile,
        contact_email: req.body.email,
        birthday: new_dob,
        dob: req.body.birthday,
        official: req.body.official,
        gender: req.body.gender,
        blood_group: req.body.blood_group,
    }

    User.findByIdAndUpdate(req.session.userId , contact_data, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).json({
                    message: `Cannot update User Contact info with id=${id}. Maybe Tutorial was not found!`
                });
            } else //res.status(200).json({ message: "User Contact info was updated successfully." });
                // res.redirect('/communities');
                res.redirect(req.get('referer'));
        })
        .catch(err => {
            res.status(500).json({
                message: "Error updating User Contact info with id=" + id
            });
        });
}