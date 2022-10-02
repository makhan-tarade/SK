var User = require('../models/model')
var path = require('path');
var fs = require('fs');

const { friend_requests } = require('../models/myprofileModel');

const { volunteer, experience, education, skills, languages } = require('../models/myprofileModel');
const Skills = skills;

exports.find_all = async (req, res) => {
    

        const userId = req.session.secondUserId ? req.session.secondUserId : req.session.userId;

        // find user data (profile , contact, etc)
        const user_data = await User.findById(userId).exec();

        const username = user_data.fname + ' ' + user_data.lname;
        const myid = userId;

        // find first user data (profile , contact, etc)
        const user = await User.findById(req.session.userId).exec();

            const users = await User.find().exec();

        // find volunteer
        const vol = await volunteer.find({user: userId}).exec();

        // find experience
        const exp = await experience.find({user: userId}).exec();

        // find experience
        const edu = await education.find({user: userId}).exec();

        // find experience
        const ski = await Skills.find({user: userId}).exec();

        // find experience
        const lang = await languages.find({user: userId}).exec();

        const my_kon = await User.findById(req.session.userId)
        .populate({ path: 'konnects.user', select: ['_id', 'fname', 'lname', 'profile_pic', 'mobile', 'address'] }).exec();

    // frient request list
    const fri_req_list = await friend_requests.find({ reciever: req.session.userId })
        .populate({ path: 'sender', select: ['_id', 'fname', 'lname', 'profile_pic'] }).exec();

        if(user.user_type === 'individual'){
            res.render('myprofile', { lang, notifications: fri_req_list, my_kon, volunteer: vol, experience: exp, education: edu, skills: ski, user, contact: user_data, profile: user_data, pUsers: user_data, username, myid });
        } else if (user.user_type === 'premium') {
            res.render('commercial_about', {user, profile: user_data, contact: user_data, username, myid });
        }    

   
}

// myprofile bio update
exports.bio_update = async (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    var id = req.session.userId;

    User.findByIdAndUpdate(id, { bio: req.body.bio }, { useFindAndModify: false })
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


// myprofile language update
exports.language_update = async (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    var id = req.session.userId;
    var obj = { language: req.body.language, proficiency: req.body.proficiency }

    User.findOneAndUpdate(
        { _id: id },
        { $push: { language: obj } },
        function (error, success) {
            if (error) {
                res.json(error);
            } else {
                res.redirect(req.get('referer'));
            }
        });
}


// myprofile language update
exports.language_edit = async (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    var id = req.session.userId;
    var o = req.params.id;
    var language = [];

    var obj = { language: req.body.language, proficiency: req.body.proficiency }

    User.findOneAndUpdate(
        { _id: id },
        { $set: { language: obj } },
        { new: true, upsert: true },

        function (error, success) {
            if (error) {
                res.json(error);
            } else {
                res.redirect(req.get('referer'));
            }
        });
}

// add languages 
exports.add_languages = async (req,res) => {

    if(!req.body) {
        res.json({status: 'failed', message: 'empty form '});
    }

    console.log(req.body)

    var data = new languages({
        user: req.session.userId,
        language: req.body.language,
        proficiency: req.body.proficiency
    })

    console.log(data);

    data.save()
    .then((data) => {
        res.status(201).redirect(req.get('referer'));
    })
    .catch((error) =>{
        res.json({
            status: 'failed',
            error: error,
        })
    })
}

// edit languages
exports.edit_languages = async (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    var id = req.params.id;

    languages.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
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

// delete language
exports.delete_languages  = async (req, res) => {
    languages.findByIdAndDelete(req.params.id)
    .then((data) => {
        res.status(200).redirect(req.get('referer'));
    })
    .catch((error) =>{
        res.json({
            status: 'failed',
            error: error,
        })
    })
}


// Add volunteer
exports.add_volunteer = async (req, res) => {
    
        const { organization, role, cause, check, start_date, end_date, start_time, end_time, description } = req.body;

        var data = new volunteer({
            user: req.session.userId,
            organization,
            role,
            cause,
            check,
            start_date,
            end_date,
            start_time,
            end_time,
            description,
            created: new Date(),
        });

        await data.save(data)
            .then((data) => {
                res.status(201).redirect(req.get('referer'));
            })
            .catch((err) => {
                res.status(400).json({
                    error: err,
                });
            });
}

// edit voluntear experience
exports.edit_volunteer = async (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    var id = req.params.id;

    volunteer.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
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

// delete volunteer
exports.delete_volunteer = async (req, res) => {
    volunteer.findByIdAndDelete(req.params.id, (err, data) => {
        if (err){
            res.redirect(req.get('referer'));
        }
        else{
            res.redirect(req.get('referer'));
        }
    })
}

// Add experience
exports.add_experience = async (req, res) => {
    

    const {
        title,
        expertise,
        company_name,
        location,
        check,
        start_month,
        start_year,
        end_month,
        end_year,
        check2,
        headline,
        industry,
        description,
      } = req.body;
    
      var data = new experience({
        user: req.session.userId,
        title,
        expertise,
        company_name,
        location,
        check,
        start_month,
        start_year,
        end_month,
        end_year,
        check2,
        headline,
        industry,
        description,
        image: "media/" + req.file.filename,
      });

        await data.save()
            .then((data) => {
                res.status(201).redirect(req.get('referer'));
            })
            .catch((err) => {
                res.status(400).json({
                    error: err,
                });
            });
}

// edit experience
exports.edit_experience = async (req, res) => {

    if (!req.body) {
        return res.status(400).send({
          message: "Data to update can not be empty!",
        });
      }
    
      const {
        title,
        expertise,
        company_name,
        location,
        check,
        start_month,
        start_year,
        end_month,
        end_year,
        check2,
        headline,
        industry,
        description,
      } = req.body;
    
      var data = {
        user: req.session.userId,
        title,
        expertise,
        company_name,
        location,
        check,
        start_month,
        start_year,
        end_month,
        end_year,
        check2,
        headline,
        industry,
        description,
        image: "media/" + req.file.filename,
      };
    
      var id = req.params.id;

    experience.findByIdAndUpdate(id, data, { useFindAndModify: false })
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

// delete experience
exports.delete_experience = async (req, res) => {
    experience.findByIdAndDelete(req.params.id, (err, data) => {
        if (err){
            res.redirect(req.get('referer'));
        }
        else{
            res.redirect(req.get('referer'));
        }
    })
}

// Add education
exports.add_education = async (req, res) => {

        const { school, degree, field_of_study, start_month, start_year, end_month, end_year, field_of_expertise, activities_and_societies, description } = req.body;

        var data = new education({
            user: req.session.userId,
            school,
            degree,
            field_of_study,
            start_month,
            start_year,
            end_month,
            end_year,
            field_of_expertise,
            activities_and_societies,
            description,
            image: "media/" + req.file.filename,
            created: new Date(),
            last_update: new Date(),
        });

        await data.save(data)
            .then((data) => {
                res.status(201).redirect(req.get('referer'));
            })
            .catch((err) => {
                res.status(400).json({
                    error: err,
                });
            });
}

// edit education
exports.edit_education = async (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const { school, degree, field_of_study, start_month, start_year, end_month, end_year, field_of_expertise, activities_and_societies, description } = req.body;

    var data = {
        user: req.session.userId,
        school,
        degree,
        field_of_study,
        start_month,
        start_year,
        end_month,
        end_year,
        field_of_expertise,
        activities_and_societies,
        description,
        image: "media/" + req.file.filename,
        created: new Date(),
        last_update: new Date(),
    };

    var id = req.params.id;

    education.findByIdAndUpdate(id, data, { useFindAndModify: false })
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

// delete education
exports.delete_education = async (req, res) => {
    education.findByIdAndDelete(req.params.id, (err, data) => {
        if (err){
            res.redirect(req.get('referer'));
        }
        else{
            res.redirect(req.get('referer'));
        }
    })
}

// Add skills
exports.add_skills = async (req, res) => {

        const { skills } = req.body;

        var sk = new Array();       

        for (var i = 0; i < skills.length; i++) {
            sk[i] = skills[i];            
        }

        var data = new Skills({
            user: req.session.userId,
            skills: sk,
            created: new Date(),
        });

        await data.save(data)
            .then((data) => {
                res.status(201).redirect(req.get('referer'));
            })
            .catch((err) => {
                res.status(400).json({
                    error: err,
                });
            });
}


// Add skills
exports.add_skills_demo = async (req, res) => {
    // find volunteer
    volunteer.find().exec();
    console.log(volunteer);
   

}


// ######################################################################################################################################
// premium user profile update
exports.premium_user_profile_edit = (req, res) => {
    if (!req.body) {
        return res.status(400).json({
            message: "Data to update can not be empty!"
        });
    }
   
    var id=req.session.userId;

    User.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
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