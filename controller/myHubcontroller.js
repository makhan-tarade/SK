// import model
var User = require('../models/model');
var Doctor = require('../models/doctorModel');
const date = require('date-and-time');

var publicservice = require('../models/publicServiceModal');

const { friend_requests } = require('../models/myprofileModel');

// find all
exports.find_all = async (req, res) => {


    const userId = req.session.secondUserId ? req.session.secondUserId : req.session.userId;

    // find user data (profile , contact, etc)
    const user_data = await User.findById(userId).exec();

    const username = user_data.fname + ' ' + user_data.lname;
    const myid = userId;
    // const dobf = date.format(new Date(user_data.birthday), date.compile('MM-DD-YYYY'));

    const dob = date.format(new Date(user_data.dob), "MMMM DD, YYYY");



    // find first user data (profile , contact, etc)
    const user = await User.findById(req.session.userId).exec();

    // find users
    const users = await User.find().exec();

    // find doctor
    const doctor = await Doctor.find().exec();

    // publice services
    const pub = await publicservice.find().exec();

    const my_kon = await User.findById(req.session.userId)
        .populate({ path: 'konnects.user', select: ['_id', 'fname', 'lname', 'profile_pic', 'mobile', 'address'] }).exec();

    // frient request list
    const fri_req_list = await friend_requests.find({ reciever: req.session.userId })
        .populate({ path: 'sender', select: ['_id', 'fname', 'lname', 'profile_pic'] }).exec();


    if (user.user_type === 'individual') {
        res.render('myhub', { notifications: fri_req_list, my_kon, pub, dob, user, doctor, users, contact: user_data, profile: user_data, pUsers: user_data, health: user_data, myid, username });
    } else if (user.user_type === 'premium') {
        res.render('commercial_about', { user, profile: user_data, contact: user_data, username, myid });
    }

}

// add health details and attachments
exports.add_health = async (req, res) => {

    const { title, description, report_date } = req.body;
    const health = {
        title,
        description,
        report_date,
        attachment: 'media/' + req.file.filename,
    }

    const data = await User.findByIdAndUpdate(req.session.userId, { $push: { health: health } }, { useFindAndModify: false });

    if (!req.file) {
        req.json({ status: 'failed', message: 'empty data' })
    } else {
        if (!data) {
            // res.json({ status: 'failed', message: 'data not update' })
            res.redirect(req.get('referer'));
        } else {
            // res.json({ status: 'success', message: 'data update successully' })
            res.redirect(req.get('referer'));

        }

    }
}

// add health details and attachments priscription
exports.add_prescription = async (req, res) => {

    const { title, description, pris_date } = req.body;
    const health = {
        title,
        description,
        pris_date,
        attachment: 'media/' + req.file.filename,
    }

    const data = await User.findByIdAndUpdate(req.session.userId, { $push: { prescription: health } }, { useFindAndModify: false });

    if (!req.body) {
        req.json({ status: 'failed', message: 'empty data' })
    } else {
        if (!data) {
            // res.json({ status: 'failed', message: 'data not update' })
            res.redirect(req.get('referer'));
        } else {
            // res.json({ status: 'success', message: 'data update successully' })
            res.redirect(req.get('referer'));

        }

    }
}

// delete health
exports.delete_health = async (req, res) => {

    const { oi } = req.params;

    User.findById(req.session.userId).then(data => {

        var obj = {
            title: data.health[oi].title,
            description: data.health[oi].description,
            _id: data.health[oi]._id,
        }

        // pull user
        User.findOneAndUpdate(
            { _id: req.session.userId },
            { $pull: { health: obj } },
            function (error, data) {
                if (error) {
                    return error;
                } else {
                    // res.json(data);
                    return data;
                }
            });

        // res.json(data)
        res.redirect(req.get('referer'));

    }).catch(
        (error) => {
            res.status(404).json({
                error: error
            });
        }
    );
}

// delete health
exports.delete_prescription = async (req, res) => {

    const { oi } = req.params;

    User.findById(req.session.userId).then(data => {

        var obj = {
            title: data.prescription[oi].title,
            description: data.prescription[oi].description,
            _id: data.prescription[oi]._id,
        }

        // pull user
        User.findOneAndUpdate(
            { _id: req.session.userId },
            { $pull: { prescription: obj } },
            function (error, data) {
                if (error) {
                    return error;
                } else {
                    // res.json(data);
                    return data;
                }
            });

        // res.json(data)
        res.redirect(req.get('referer'));

    }).catch(
        (error) => {
            res.status(404).json({
                error: error
            });
        }
    );
}


// doctor Registraion
exports.doctor_register = (req, res, next) => {

    const user = new Array();
    user[0] = { id: req.session.userId }

    var data = new Doctor({
        user: user,
        profile_pic: 'media/' + req.file.filename,
        name: req.body.name,
        degination: req.body.degination,
        email: req.body.email,
        mobile: req.body.mobile,
        description: req.body.description,
    });

    data.save()
        .then((data) => {
            res.status(201).redirect(req.get('referer'));
        })
        .catch((error) => {
            res.status(400).json({
                error: error,
            });
        });
};

// search doctor by pin code
exports.search_doctor = async (req, res) => {
    const doctor = await User.findOne({ pincode: req.params.pincode })
    if (!doctor) {
        res.json({ status: 'failed', message: 'doctor not found' })
    } else {
        if (doctor.degination.toLowerCase() === 'doctor') {
            res.json({ statuis: 'success', doctor })
        } else {
            res.json({ status: 'failed', message: 'this pincode doctor not available' })
        }
    }
}

exports.community_pillar = async (req, res) => {
    const users = await User.find();
    const cp = new Array();

    if (!users) {
        res.json({ status: 'failed', message: 'users not found' })
    } else {

        // res.json(users)

        // find friend true or false
        users.forEach(function (u2, i) {
            if (u2.degination && u2.degination != '' && u2.degination != 'doctor' && u2.degination != 'Doctor' && u2.degination != 'MBBS' && u2.degination != 'MD' && u2.degination != 'BDS') {
                if (u2.friends && u2.friends != '') {
                    u2.friends.forEach(function (f, i2) {
                        if (f.user === '62d800fb1f5fc61bf22b7f99') {
                            cp[i] = { friend: true, cp: u2 }
                        }
                    })
                    res.json(cp)

                }

            }
        })



    }
}

// delete doctor
exports.doctor_delete = async (req, res) => {

    const data = await Doctor.findByIdAndDelete(req.params.id);
    if (!data) {
        // res.json({status: 'failed', message: 'data not found'})
        res.redirect(req.get('referer'));
    } else {
        // res.json({status: 'success', message: 'your data deleted successfully'})
        res.redirect(req.get('referer'));
    }

}

// edit data doctor
exports.doctor_edit = async (req, res) => {

    var id = req.body.id;

    var doctor = {
        profile_pic: 'media/' + req.file.filename,
        name: req.body.name,
        degination: req.body.degination,
        email: req.body.email,
        mobile: req.body.mobile,
        description: req.body.description,
    };

    Doctor.findByIdAndUpdate(id, doctor, { useFindAndModify: false })
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
}

// -------------------------------------------------------------------------------------------------------------------------------
// friend request and relation
// add friends
exports.add_friends_request = async (req, res) => {

    var fri_req = new friend_requests({
        sender: req.session.userId,
        reciever: req.params.id,
        request: true,
        response: false,
        action: 'pending',
        message: '',
    })

    fri_req.save()
        .then((data) => {
            res.redirect(req.get('referer'));
        })
        .catch((error) => {
            res.json(error);
        })
}

// accept and reject friend request
exports.friend_request_response = async (req, res) => {

    findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then((data) => {
            res.redirect(req.get('referer'));
        })
        .catch((error) => {
            res.json(error);
        })
}



// accept and reject friend request
exports.add_relations = async (req, res) => {

    const { id, relation, } = req.query;
    try {
      if (id && relation) {
        const findId = await User.findOneAndUpdate(
          { _id: req.session.userId, 'konnects._id': id },
          {
            $set: {
              'konnects.$.relation': relation,
              },
          }, { new: true }
        );
        res.redirect(req.get('referer'));
      } else {
        res.json("please provide id");
      }
    } catch (error) {
      res.json({
        status: "402",
        message: error,
      });
    }
  }
