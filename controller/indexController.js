
var User = require('../models/model');

// register
exports.register = (req, res) => {
    var user = new User({
        user_type: req.body.user_type,
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        mobile: req.body.mobile,
        pincode: req.body.pincode,
    });

    user.save().then(
        () => {
            res.status(201).json({
                message: 'Post saved successfully!'
            });
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
}


// find all
exports.find = (req, res) => {
    User.find().then(
        (users) => {
            res.status(200).json(users);
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
}

// find one
exports.findone = (req, res) => {
    User.findOne({
        _id: req.params.id
    }).then(
        (user) => {
            res.status(200).json(user);
        }
    ).catch(
        (error) => {
            res.status(404).json({
                error: error
            });
        }
    );
}


// update
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    var id = req.params.id;

    User.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update User with id=${id}. Maybe Tutorial was not found!`
                });
            } else res.send({ message: "User was updated successfully." });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating User with id=" + id
            });
        });
}


// delete
exports.delete = (req, res) => {
    User.deleteOne({
        _id: req.params.id
    }).then(
        (user) => {
            res.status(200).json(user);
        }
    ).catch(
        (error) => {
            res.status(404).json({
                error: error
            });
        }
    );
}


// find friends
exports.find_friends = async (req, res) => {    

    // find users
    const users = await User.find().then(
        (data) => {

            return data;
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );   
   
    res.json(users);
}

