var express = require("express");
var router = express.Router();
var session = require("express-session");
var cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const date = require("date-and-time");
var path = require("path");
var fs = require("fs");

var Photos = require("../../models/photosModel");

const {
  checkin,
  sports,
  music,
  movies,
  tvshows,
  books,
} = require("../../models/moreModel");

// model import
var User = require("../../models/model");
var Feed = require("../../models/feedModel");
var Doctor = require("../../models/doctorModel");
const { volunteer, experience, education, skills, languages } = require("../../models/myprofileModel");
var publicservice = require('../../models/publicServiceModal');



// district and pincode model
const { district, area_pincode } = require("../../models/areaPincodeModel");

// event model
const { events, events_discussion } = require("../../models/eventsModel");

// myhub health - report, priscription
const { report, priscription } = require("../../models/myhubModel");

// communities all - communities, communities discussion, communities announcements, communities events, communities gallery, communities events discussion.
const {
  communities,
  communities_events,
  communities_events_discussion_post,
  communities_photos,
  communities_discussion_post,
  communities_announcements_post,
  posts,
  medias,
} = require("../../models/communitiesModel1");

const { friend_requests } = require('../../models/myprofileModel');

//session
const oneDay = 1000 * 60 * 60 * 24;
router.use(
  session({
    secret: process.env.SECRET_KEY,
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
    resave: false,
  })
);
router.use(cookieParser());

// User Registraion
exports.api_user_registration = async (req, res) => {
  const auser = await User.findOne({ mobile: req.body.mobile });

  var user = new User({
    user_type: req.body.user_type,
    fname: req.body.fname,
    lname: req.body.lname,
    username: "",
    email: req.body.email,
    mobile: req.body.mobile,
    dob: req.body.dob,
    gender: req.body.gender,
    pincode: req.body.pincode,
    city: req.body.city,
    state: req.body.state,
    country: req.body.country,
    check: req.body.check,
    birthday: "",
    official: "",
    designation: "",
    blood_group: "",
  });

  if (auser) {
    res.json({ status: "failed", message: "user already exists" });
  } else {
    user
      .save(user)
      .then((user) => {
        res.status(201).json(user);
      })
      .catch((error) => {
        res.status(400).json({
          error: error,
        });
      });
  }
};

// User update
exports.api_update_user = async (req, res) => {
  const { user_id } = req.body;
  try {
    if (user_id) {
      const findId = await User.findOneAndUpdate(
        { _id: user_id },
        {
          $set: {
            designation: req.body.designation,
            official: req.body.official,
            fname: req.body.fname,
            lname: req.body.lname,
            birthday: req.body.birthday,
            gender: req.body.gender,
            blood_group: req.body.blood_group,
            profile_pic:
              typeof req.file == "undefined"
                ? ""
                : `media/${req.file.filename}`,
          },
        }, { new: true }
      );
      res.json(findId);
    } else {
      res.json("please provide id");
    }
  } catch (error) {
    res.json({
      status: "402",
      message: error,
    });
  }
};
// OTP Generate function
function generateOTP() {
  var digits = "0123456789";
  let OTP = "";
  for (let i = 0; i < 6; i++) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }
  return OTP;
}

// mobile verification
exports.api_mobile_verification = async (req, res) => {
  const { mobile } = req.body;
  const user = await User.findOne({ mobile: mobile });

  console.log(user);

  if (!user) {
    res.json({
      status: "failed",
      message: "your mobile number are not registered, please regiser first!",
    });
  } else {
    if (mobile === user.mobile) {
      //otp genrate
      var rnum = generateOTP();
      req.session.userMobile = user.mobile;
      req.session.old_otp = rnum;
      res.status(200).json({
        status: "success",
        message: `otp send this mobile number ${user.mobile} `,
        otp: rnum,
      });
    }
  }
};

// Resend otp
exports.api_resend_otp = (req, res) => {
  if (req.session.userMobile) {
    if (req.session.userMobile === req.body.mobile) {
      var rnum = generateOTP();
      req.session.old_otp = rnum;
      console.log(rnum);
      res.json({
        status: "success",
        message: `otp resend this mobile number ${req.session.userMobile} `,
        otp: rnum,
      });
    } else {
      res.json({ status: "failed", message: "mobile number not metch" });
    }
  } else {
    res.json({ status: "failed", message: "mobile number not found" });
  }
};

// show multiple files
exports.api_show_files = async (req, res) => {
  try {
    if (!req.body.user_id) {
      res.json("please provide user id");
    }
    const data = await Photos.find({
      user: req.body.user_id,
    });
    res.json(data);
  } catch (error) {
    res.json(error + "something wrong");
  }
};


// OTP verification
exports.api_otp_verification = async (req, res) => {
  const old_otp = req.session.old_otp;
  const str_o_otp = JSON.stringify(old_otp);
  const str_n_otp = JSON.stringify(req.body.otp);

  var user = await User.findOne({ mobile: req.body.mobile });

  var pic_url = "https://test.seniorkonnect.com/";

  if (str_o_otp === str_n_otp) {
    if (user) {
      var user_data = {
        userId: user._id,
        userName: user.fname + " " + user.lname,
        profile_pic: user.profile_pic,
        userPic: user.profile_pic,
      };

      const token = jwt.sign(user_data, process.env.TOKEN_SECRET, {
        expiresIn: "1d",
      });

      res.json({
        status: "success",
        message: "login successfully",
        token,
        pic_url,
        user: user,
      });
    } else {
      res.json({ status: "failed", message: "user not found" });
    }
  } else {
    res.json({ status: "failed", message: "wrong otp" });
  }
};

// Find all users list
exports.api_users_find = async (req, res) => {
  const users = await User.find()
    .then((data) => {
      return data;
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });

  res.status(200).json({ status: "success", users });
};

// Find One user by Id
exports.api_user_find_by_id = async (req, res) => {
  const user = await User.findById(req.params.id)
    .then((data) => {
      return data;
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });

  res.status(200).json({ status: "success", user });
};

// Find One user by mobile
exports.api_user_find_by_mobile = async (req, res) => {
  const user = await User.findOne({ mobile: req.params.mobile })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });

  res.status(200).json({ status: "success", user });
};

// #########################################################################################
// feed page start
// post image upload

// post view
exports.api_feed = async (req, res) => {
  let post = await posts
    .find()
    .populate({ path: "user_id", select: ["fname", "lname", "profile_pic"] })
    .populate({
      path: "comments.userId",
      select: ["fname", "lname", "profile_pic", "createdAt"],
    })
    .exec();

  post = post.reverse();

  const pic_url = "https://test.seniorkonnect.com/";
  res.status(200).json({
    status: "success",
    message:
      "find all post (feed post, communities discussion post, communities announcements post, events discussion post), post find login user according, post sorting created date wise, post sorting last post first.",
    pic_url,
    post: post,
  });

  // res.json({total_users: users.length, total_post: post.length, users});
};
// show posts
exports.api_show_post = async (req, res) => {
  try {
    if (req.body.event_id) {
      const data = await posts.find({
        events_id: req.body.event_id,
      });
      res.json(data);
    } else {
      res.json("plz provide  id");
    }
  } catch (error) {
    res.json(error + "something wrong");
  }
};


// ################################################# Myhub Page ############################################################
// find all
exports.api_myhub_find_all = async (req, res) => {
  const userId = req.session.secondUserId
    ? req.session.secondUserId
    : req.session.userId;

  // find user data (profile , contact, etc)
  const user_data = await User.findById(userId)
    .then((data) => {
      return data;
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });

  const username = user_data.fname + " " + user_data.lname;
  const myid = userId;
  // const dobf = date.format(new Date(user_data.birthday), date.compile('MM-DD-YYYY'));

  const dob = date.format(new Date(user_data.dob), "MMMM DD, YYYY");

  // find first user data (profile , contact, etc)
  const user = await User.findById(req.session.userId)
    .then((data) => {
      return data;
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });

  // find doctor
  const doctor = await Doctor.find()
    .then((data) => {
      return data;
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });

  res.json({ status: "success", user, user2: user_data, doctor });
};

// find designation in User for doctor
exports.api_find_designation_doctor = async (req, res) => {
  try {
    if (!req.body.fname) {
      const doctor = await User.find({ designation: "Doctor" });
      res.json(doctor);
    }
    // console.log(doctor);
    else {
      const doctor = await User.find({
        $and: [{ fname: req.body.fname }, { designation: "Doctor" }],
      });
      res.json(doctor);
    }
  } catch (error) {
    res.json(error + "something wrong");
  }
};

// add health details and attachments
exports.api_add_health = async (req, res) => {
  const { title, description, user_id } = req.body;

  var data = new report({
    user: req.session.userId,
    title: title,
    user_id: user_id,
    description: description,
    report_date: req.body.report_date,
    attachment: `media/${req.file.filename}`,
    created: new Date(),
  });

  if (!req.file) {
    console.log("file not found");
  } else {
    data
      .save()
      .then((data) => {
        res.status(201).json({
          status: "success",
          message: "report add successfully",
          data,
        });
      })
      .catch((err) => {
        res.status(400).json({
          error: err,
        });
      });
  }
};




// show by id prescription
exports.api_show_all_prescription = async (req, res) => {
  try {
    if (!req.body.user_id) {
      res.json("plz provide user iid");
      return;
    }
    const data = await priscription.find({ user_id: req.body.user_id });
    res.json(data);
  } catch (error) {
    res.json(error);
  }
};

// show report
exports.api_show_all_report = async (req, res) => {
  try {
    if (!req.body.user_id) {
      res.json("plz provide user id");
      return;
    }
    const data = await report.find({ user_id: req.body.user_id });
    if (!data) {
      res.json("plz provide valid id");
    } else {
      res.json(data);
    }
  } catch (error) {
    res.json(error + "something wrong");
  }
};


// add health details and attachments priscription
exports.api_add_prescription = async (req, res) => {
  const { title, description, user_id } = req.body;

  var data = new priscription({
    user: req.session.userId,
    title: title,
    user_id: user_id,
    description: description,
    pris_date: req.body.pris_date,
    attachment: `media/${req.file.filename}`,
    created: new Date(),
  });

  if (!req.file) {
    console.log("file not found");
  } else {
    data
      .save()
      .then((data) => {
        res.status(201).json({
          status: "success",
          message: "priscription add successfully",
          data,
        });
      })
      .catch((err) => {
        res.status(400).json({
          error: err,
        });
      });
  }
};
// delete health
exports.api_delete_health = async (req, res) => {
  const data = await report.findByIdAndDelete(req.params.id);

  if (!data) {
    res.json({ status: "failed", message: "data not found" });
    // res.redirect(req.get('referer'));
  } else {
    res.json({ status: "success", message: "report delete successfully" });
    // res.redirect(req.get('referer'));
  }
};

// delete health
exports.api_delete_prescription = async (req, res) => {
  const data = await priscription.findByIdAndDelete(req.params.id);

  if (!data) {
    res.json({ status: "failed", message: "data not found" });
    // res.redirect(req.get('referer'));
  } else {
    res.json({
      status: "success",
      message: "priscription delete successfully",
    });
    // res.redirect(req.get('referer'));
  }
};

// doctor Registraion
exports.api_doctor_register = async (req, res, next) => {
  const user = new Array();
  user[0] = { id: req.session.userId };

  const addDoctor = new Doctor({
    user: user,
    profile_pic: req.file.filename,
    name: req.body.name,
    degination: req.body.degination,
    email: req.body.email,
    mobile: req.body.mobile,
    description: req.body.description,
    created: Date.now(),
  });

  const newDoctor = await addDoctor.save();
  console.log(newDoctor);
  res.json({
    status: "success",
    message: "doctor add successfully",
    newDoctor,
  });

  // data
  //   .save()
  //   .then(() => {
  //     res
  //       .status(201)
  //       .json({ status: "success", message: "doctor add successfully", data });
  //   })
  //   .catch((error) => {
  //     res.status(400).json({ error });
  //   });
};
// show doctor
exports.api_doctor_show_by_user = async (req, res) => {
  try {
    if (!req.body.user_id) {
      res.json("plz provide user id");
      return;
    }
    const data = await Doctor.find({
      user: { $elemMatch: { _id: req.body.user_id } },
    });
    res.json(data);
  } catch (error) {
    res.json(error + "something wrong");
  }
};


// delete doctor
exports.api_doctor_delete = async (req, res) => {
  const data = await Doctor.findByIdAndDelete(req.params.id);
  if (!data) {
    res.json({ status: "failed", message: "data not found" });
    // res.redirect(req.get('referer'));
  } else {
    res.json({ status: "success", message: "your data deleted successfully" });
    // res.redirect(req.get('referer'));
  }
};

// edit data doctor
exports.api_doctor_edit = async (req, res) => {
  const data = await Doctor.findByIdAndUpdate(req.params.id, req.body, {
    useFindAndModify: false,
  });
  if (!data) {
    res.json({ status: "failed", message: "data not found" });
    // res.redirect(req.get('referer'));
  } else {
    res.json({ status: "success", message: "your data deleted successfully" });
    // res.redirect(req.get('referer'));
  }
};

// search doctor by name
exports.api_search_doctor_by_name = async (req, res) => {
  const doctor = await Doctor.findOne({ name: req.body.name });
  //   console.log(doctor);
  res.json(doctor);
};

// search doctor by pin code
exports.api_search_doctor = async (req, res) => {
  const doctor = await User.findOne({ pincode: req.params.pincode });
  if (!doctor) {
    res.json({ status: "failed", message: "doctor not found" });
  } else {
    if (doctor.designation.toLowerCase() === "doctor") {
      res.json({ statuis: "success", doctor });
    } else {
      res.json({
        status: "failed",
        message: "this pincode doctor not available",
      });
    }
  }
};

exports.api_community_pillar = async (req, res) => {
  const users = await User.find();
  const cp = new Array();

  if (!users) {
    res.json({ status: "failed", message: "user`s not found" });
  } else {
    // res.json(users)

    // find friend true or false
    users.forEach(function (u2, i) {
      if (
        u2.designation &&
        u2.designation != "" &&
        u2.designation != "doctor" &&
        u2.designation != "Doctor" &&
        u2.designation != "MBBS" &&
        u2.designation != "MD" &&
        u2.designation != "BDS"
      ) {
        if (u2.friends && u2.friends != "") {
          u2.friends.forEach(function (f, i2) {
            if (f.user === "62d800fb1f5fc61bf22b7f99") {
              console.log("user: true");
              cp[i] = { friend: true, cp: u2 };
            }
          });
          res.json(cp);
        }
      }
    });
  }
};

// community pillar in User
exports.api_find_designation_user = async (req, res) => {
  try {
    if (req.body.fname) {
    } else {
      const data = await User.aggregate([
        { $match: { designation: { $ne: "Doctor" } } },
      ]);
      res.json(data);
    }
  } catch (error) {
    res.json(error + "something wrong");
  }
};
//find =d


// delete doctor
exports.api_delete_doctor = async (req, res) => {
  Doctor.findByIdAndDelete(req.params.id, (err, data) => {
    if (err) {
      res.json({
        status: "failed",
        message: "data not delete",
      });
    } else {
      res.json({
        status: "success",
        message: "data delete success ...",
        data: data,
      });
    }
  });
};


// edit doctor update
exports.api_doctor_edit = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  var data = {
    user: req.session.userId,
    profile_pic: 'media/' + req.file.filename,

    name: req.body.name,
    degination: req.body.degination,
    email: req.body.email,
    mobile: req.body.mobile,
    description: req.body.description,
  };

  var id = req.params.id;

  Doctor
    .findByIdAndUpdate(id, data, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update User with id=${id}. Maybe Tutorial was not found!`,
        });
      } else return data._id;
    })
    .catch((err) => {
      return err;
    });

  const user2 = await Doctor.findById(id).exec();
  res.json({
    status: "success",
    message: "Doctor updated",

    data: user2,
  });
};




// ####################################################### Communities ###############################################################

// Communities Registraion
exports.api_create_communities = async (req, res) => {
  var data = new communities({
    user: req.userId,
    comm_img: "media/" + req.file.filename,
    group_name: req.body.group_name,
    description: req.body.description,
    community_type: req.body.communities,
    privacy: req.body.privacy,
    charged: req.body.charged,
    rules: req.body.rules,
    start_date: req.body.start_date,
    end_date: req.body.end_date,
  });

  await data
    .save()
    .then((data) => {
      res.status(201).json({
        status: "success",
        message: "communities created successfully... !",
        data: data,
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

// find communities all
exports.api_communities_find_all = async (req, res) => {
  // find communities
  let comm = await communities
    .find()
    .populate({ path: "user", select: ["fname", "lname", "profile_pic"] })
    .exec();
  comm = comm.reverse();

  if (!comm) {
    res.json({
      status: "failed",
      message: "communities not found, please try again...",
    });
  } else {
    res.json({ status: "success", communities: comm });
  }
};

// find communities by user
exports.api_communities_about = async (req, res) => {
  // find communities
  const comm = await communities
    .findById(req.params.id)
    .populate({ path: "user", select: ["fname", "lname", "profile_pic"] })
    .exec();

  const comm2 = {
    members: comm.members,
    _id: comm._id,
    user: comm.user,
    comm_img: comm.comm_img,
    group_name: comm.group_name,
    description: comm.description,
    privacy: comm.privacy,
    rules: comm.rules,
    start_date: comm.start_date,
    end_date: comm.end_date,
    photos_name: comm.photos_name,
    createdAt: comm.createdAt,

    visible: "any one can find this group",
    general: "any one can find this group",

    today_new_post: "14",
    last_month_post: "485",
    total_member: "38349",
    last_week_members: "258",
  };

  if (!comm2) {
    res.json({
      status: "failed",
      message: "communities not found, please try again...",
    });
  } else {
    res.json({ status: "success", communities: comm2 });
  }

  // res.json({ status: 'success', communities: comm });
};

// find communities discussion by user
exports.communities_discussion = async (req, res) => {
  const comm = await posts
    .find({ communities_id: req.params.id, category: "communities discussion" })
    .populate({ path: "user_id", select: ["fname", "lname", "profile_pic"] })
    .exec();

  if (!comm) {
    res.json({
      status: "failed",
      message: "communities announcements post not found, please try again...",
    });
  } else {
    res.json({ status: "success", post: comm });
  }
};

// find communities announcement by user
exports.communities_announcement = async (req, res) => {
  const comm = await posts
    .find({
      communities_id: req.params.id,
      category: "communities announcements",
    })
    .populate({ path: "user_id", select: ["fname", "lname", "profile_pic"] })
    .exec();

  if (!comm) {
    res.json({
      status: "failed",
      message: "communities announcements post not found, please try again...",
    });
  } else {
    res.json({ status: "success", post: comm });
  }
};

// find communities my post by user
exports.communities_photos = async (req, res) => {
  const comm = await medias
    .find({ communities_id: req.params.id, category: "communities" })
    .populate({ path: "user", select: ["fname", "lname", "profile_pic"] })
    .exec();

  if (!comm) {
    res.json({
      status: "failed",
      message: "communities gallery not found, please try again...",
    });
  } else {
    res.json({ status: "success", photos: comm });
  }
};



// find post - events discussion
exports.api_events_discussion = async (req, res) => {

  const comm = await posts.find({ events_id: req.params.id })
    .populate({ path: "user_id", select: ["fname", "lname", "profile_pic"] })
    .exec();

  if (!comm) {
    res.json({
      status: "failed",
      message: "communities announcements post not found, please try again...",
    });
  } else {
    res.json({ status: "success", post: comm });
  }

};

// ######################################################## Events ##################################################################

// events Registration
exports.api_create_events = (req, res, next) => {
  var data = new events({
    user: req.body.user,
    event_image: `media/${req.file.filename}`,
    event_name: req.body.event_name,
    time_zone: req.body.time_zone,
    event_log: req.body.event_log,
    start_date: req.body.start_date,
    community_id: req.body.community_id || "",
    start_time: req.body.start_time,
    end_date: req.body.end_date,
    end_time: req.body.end_time,
    description: req.body.description,
    location: req.body.location,
    visibility: req.body.visibility,
    event_type: req.body.event_type,
    targeted_audience: req.body.targeted_audience,
    reg_or_brod_link: req.body.reg_or_brod_link,
    broadcast: req.body.broadcast,
    created: new Date(),
  });

  data
    .save()
    .then((data) => {
      res.status(201).json({ status: "success", events: data });
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

// find community events in using community_id
exports.api_find_community_events = async (req, res) => {
  try {
    if (req.body.community_id) {
      const data = await events.find({ community_id: req.body.community_id });
      res.json(data);
    } else {
      res.json("plz provide community id");
    }
  } catch (error) {
    res.json(error + "something wrong");
  }
};

// interested add in events
exports.api_events_add_interested = async (req, res) => {
  // const { user_id } = req.body.user_id;
  try {
    if (!req.body.user_id || !req.body.event_id) {
      res.json("plz provide user id ");
      return;
    }
    const findEvent = await events.findOneAndUpdate(
      { _id: req.body.event_id },
      {
        $push: { participants: req.body.user_id },
      },
      { new: true }
    );
    const findUser = await User.find({
      _id: findEvent.participants,
    });
    res.json([findEvent, findUser]);
    // const
  } catch (error) {
    res.json(error);
  }
};
// edit events
exports.api_event_edit = async (req, res) => {
  try {
    if (!req.body.event_id) {
      res.json("plz provide event_id");
      return;
    }

    if (req.file) {
      const data = await events.findOneAndUpdate(
        { _id: req.body.event_id },
        {
          user: req.body.user,
          event_image: `media/${req.file.filename}`,
          event_name: req.body.event_name,
          event_log: req.body.event_log,
          time_zone: req.body.time_zone,
          start_date: req.body.start_date,
          community_id: req.body.community_id || "",
          start_time: req.body.start_time,
          end_date: req.body.end_date,
          end_time: req.body.end_time,
          description: req.body.description,
          location: req.body.location,
          visibility: req.body.visibility,
          event_type: req.body.event_type,
          targeted_audience: req.body.targeted_audience || "",
          reg_or_brod_link: req.body.reg_or_brod_link || "",
          broadcast: req.body.broadcast,
          created: new Date(),
        }
      );

      // console.log(req.file);
      res.json(data);
    } else {
      const data = await events.findOneAndUpdate(
        { _id: req.body.event_id },
        {
          user: req.body.user,
          event_name: req.body.event_name,
          event_log: req.body.event_log,
          time_zone: req.body.time_zone,
          start_date: req.body.start_date,
          community_id: req.body.community_id || "",
          start_time: req.body.start_time,
          end_date: req.body.end_date,
          end_time: req.body.end_time,
          description: req.body.description,
          location: req.body.location,
          visibility: req.body.visibility,
          event_type: req.body.event_type,
          targeted_audience: req.body.targeted_audience || "",
          reg_or_brod_link: req.body.reg_or_brod_link || "",
          broadcast: req.body.broadcast,
          created: new Date(),
        }
      );

      // console.log(req.file);
      res.json(data);
    }
  } catch (error) {
    console.log(error + "something wrong");
    res.json(error + "something wrong");
  }
};

// unInterested remove in events
exports.api_remove_events_user = async (req, res) => {
  try {
    if (req.body.user_id && req.body.event_id) {
      const findEvent = await events.findOneAndUpdate(
        {
          _id: [req.body.event_id],
        },
        {
          $pull: { participants: req.body.user_id },
        },
        { new: true }
      );
      const findUser = await User.find({
        _id: findEvent.participants,
      });
      res.json([findEvent, findUser]);
    } else {
      res.json("plz provide user id or event id");
    }
  } catch (error) {
    res.json(error + "something wrong");
  }
};
// community add in joined
exports.api_community_add_joined = async (req, res) => {
  // const { user_id } = req.body.user_id;
  try {
    if (!req.body.user_id || !req.body.com_id) {
      res.json("plz provide user id ");
      return;
    }
    const findEvent = await communities.findOneAndUpdate(
      { _id: req.body.com_id },
      {
        $push: { members: req.body.user_id },
      },
      { new: true }
    );
    const findUser = await User.find({
      _id: findEvent.members,
    });
    res.json([findEvent, findUser]);
  } catch (error) {
    res.json(error);
  }
};

// community remove in joined
exports.api_community_remove_joined = async (req, res) => {
  // const { user_id } = req.body.user_id;
  try {
    if (!req.body.user_id || !req.body.com_id) {
      res.json("plz provide user id ");
      return;
    }
    const findEvent = await communities.findOneAndUpdate(
      { _id: req.body.com_id },
      {
        $pull: { members: req.body.user_id },
      },
      { new: true }
    );
    const findUser = await User.find({
      _id: findEvent.members,
    });
    res.json([findEvent, findUser]);
  } catch (error) {
    res.json(error);
  }
};


// find events all
exports.api_events_find_all = async (req, res) => {
  console.log(req.userId);

  // find events
  const events_data = await events
    .find()
  .sort({ _id: -1 })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });

  res.json({ status: "success", events: events_data });
};

// find events all
exports.api_event_find = async (req, res) => {
  const findEvent = await events.findOne({ _id: req.params.id });
  const findUser = await User.find({
    _id: findEvent.participants,
  });
  res.json([findEvent, findUser]);
};

// ########################################################### many type post cerate #################################################

//  Feed post: text|| image|| video , communities: discussion || announcements , events: discussion

// ###################################################################################################################################

// post create
exports.api_post_create = async (req, res) => {
  // category: feed, cummunities discussion, communities announcements, events discussion.
  // Id: feed: _id, communities: communities_id, events: events_id.
  // post_type: 1: text, 2: image, 3. video.

  if (!req.body) {
    res.json({ status: "failed", message: "form data empty!" });
  }

  const { category, communities_id, events_id, post_type } = req.query;
  const { content, privacy, groups, events, district, pincode } = req.body;
  // const district = JSON.parse(req.body.district);
  // const pincode = JSON.parse(req.body.pincode);
  var files_data = new Array();
  var groups_data = new Array();
  var events_data = new Array();
  var pincode_data = new Array();

  var data = new posts({
    category,
    user_id: req.userId,
    post_type,
    post_text: content,
    privacy,
  });

  if (communities_id) {
    data.communities_id = communities_id;
  }
  if (events_id) {
    data.events_id = events_id;
  }

  if (privacy === "private") {
    if (groups && groups !== "") {
      for (var g = 0; g < groups.length; g++) {
        groups_data[g] = groups[g];
      }
      data.groups = groups_data;
    } else if (events && events !== "") {
      for (var e = 0; e < events.length; e++) {
        events_data[e] = events[e];
      }
      data.events = events_data;
    } else if (pincode && district) {
      for (var p = 0; p < pincode.length; p++) {
        pincode_data[p] = pincode[p];
      }
      data.district = district;
      data.pincode = pincode_data;
    }
  }

  console.log(data);

  // if (req.files) {
  //     for (var i = 0; i < req.files.length; i++) {
  //         files_data[i] = 'media/' + (req.files[i].filename);
  //     }
  //     // if (post_type === '1' || post_type === 1) {
  //     //     for (var ii = 0; ii < req.files.length; ii++) {
  //     //         fs.unlink(__dirname + '/../../public/media/' + req.files[ii].filename, function(err){
  //     //             if(err) return console.log(err);
  //     //             console.log('file deleted successfully');
  //     //        });
  //     //     }

  //     // }
  //     // else if (post_type === '2' || post_type === 2) {
  //     //     data.post_files = files_data;
  //     // }
  //     // else if (post_type === '3' || post_type === 3) {
  //     //     data.post_files = files_data;
  //     // }

  // }

  if (req.file) {
    data.post_files = "media/" + req.file.filename;
  }

  data
    .save()
    .then((data) => {
      res.status(201).json({
        status: "success",
        message: "your post has been created successfully...",
        post: data,
      });
    })
    .catch((error) => {
      res.status(400).json({
        status: "failed",
        message: "post create failed, please check your fiels and try again...",
        error: error,
      });
    });
};

// posts comment
exports.api_feed_post_comment = (req, res) => {
  var id = req.params.id;

  var obj = {
    userId: req.userId,
    comment: req.body.comment,
  };

  posts.findByIdAndUpdate(
    id,
    { $push: { comments: obj } },
    function (error, data) {
      if (error) {
        res.json(error);
      } else {
        res.json({
          status: "success",
          message: "comment posted succefully...",
        });
      }
    }
  );
};

// ###################################################################################################################################
// { district, area_pincode }
// find pincode
exports.api_pincode_find = (req, res) => {
  var dist = req.params.dist;
  dist = dist.toUpperCase();

  area_pincode
    .find({ district: dist })
    .then((data) => {
      res.status(200).json({
        status: "success",
        message: "find pincode success ...",
        pincode: data,
      });
    })
    .catch((error) => {
      res.status(400).json({
        status: "failed",
        message: "find pincode failed ...",
        error: error,
      });
    });
};

// find district
exports.api_district_find = (req, res) => {
  district
    .find()
    .then((data) => {
      res.status(200).json({
        status: "success",
        message: "find district success ...",
        district: data,
      });
    })
    .catch((error) => {
      res.status(400).json({
        status: "failed",
        message: "find district failed ...",
        error: error,
      });
    });
};

// ################################################## Media / photos ######################################################

// photos add
exports.api_add_photos = (req, res) => {
  var photos = new Array();
  var file_type = new Array();

  const { category, communities_id, events_id } = req.query;

  var data = new medias({
    user: req.userId,
    category,
    communities_id,
    events_id,
  });

  if (req.files) {
    for (var i = 0; i < req.files.length; i++) {
      photos[i] = "media/" + req.files[i].filename;
      file_type[i] = path.extname(req.files[i].filename);
    }
    data.file_type = file_type;
    data.photos_name = photos;
  } else if (req.file) {
    data.file_type = path.extname(req.file.filename);
    data.photos_name = "media/" + req.file.filename;
  }

  data
    .save()
    .then((data) => {
      res.status(201).json({
        status: "success",
        message: "media images added successfully ...",
        photos: data,
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

// find events all
exports.api_photos_find_all = async (req, res) => {
  const category = req.query.category;

  medias
    .find({ category: category })
    .then((data) => {
      res.status(200).json({
        status: "success",
        message: "find photos success ...",
        photos: data,
      });
    })
    .catch((error) => {
      res.status(400).json({
        status: "failed",
        message: "find photos failed ...",
        error: error,
      });
    });
};

// delete photos
exports.api_remove_photos = async (req, res) => {
  //     var { id, photo } = req.query;
  //     // photo = 'media/' + photo;
  //     // find all photos
  //     const photos = await medias.findById(id).exec();
  //     console.log(photos);
  //     var pic =photos.photos_name[photo];
  //     console.log(pic);
  //     // // find photos name
  //     // function pic_name(e) {
  //     //     for (var i = 0; i < photos.photos_name.length; i++) {
  //     //         if (e === photos.photos_name[i]) {
  //     //             return i;
  //     //         }
  //     //     }
  //     // }
  //     // pull photos_name
  //     // const pic = photos.photos_name[pic_name(photo)];
  //     const media = await medias.findByIdAndUpdate(id,
  //         { $pull: { photos_name: pic } },
  //         function (error, data) {
  //             if (error) {
  //                 return error;
  //             } else {
  //                 return data;
  //             }
  //         });
  //     // var filePath = (__dirname + '/../public/photosUpload/' + req.params.photo);
  //     // fs.unlinkSync(filePath);
  // //     fs.unlink(__dirname + '/../../public/photosUpload/' + req.params.photo, function(err){
  // //         if(err) return console.log(err);
  // //         console.log('file deleted successfully');
  // //    });
  //     if(!media){
  //         res.json({status: 'failed', message: 'media photos delete failed ...'})
  //     } else {
  //         res.json({status: 'success', message: 'media photos deleted successfully ...'})
  //     }
};

// ########################################################################################################################

//########################################### books more popup ################################################

// find books
exports.api_books = async (req, res) => {
  const comm = await books
    .find()
    .then((data) => {
      return data;
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });

  res.json({ status: "success", books: comm });
};

// books add user
exports.api_books_user = async (req, res) => {
  if (!req.params.id) {
    res.json({ status: "failed", message: "books not exists...." });
  }

  books.findByIdAndUpdate(
    req.params.id,
    { $push: { user: req.userId } },
    function (error, data) {
      if (!data) {
        res.json({ status: "failed", message: "books not added ..." });
      } else if (data) {
        res.json({
          status: "success",
          message: "books added successfully ...",
        });
      } else {
        res.json(error);
      }
    }
  );
};

// find music
exports.api_music = async (req, res) => {
  const comm = await music
    .find()
    .then((data) => {
      return data;
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });

  res.json({ status: "success", music: comm });
};

// music add user
exports.api_music_user = async (req, res) => {
  console.log(req.params.id);
  music.findByIdAndUpdate(
    req.params.id,
    { $push: { user: req.userId } },
    function (error, data) {
      if (!data) {
        res.json({ status: "failed", message: "music not added ..." });
      } else if (data) {
        res.json({
          status: "success",
          message: "music added successfully ...",
        });
      } else {
        res.json(error);
      }
    }
  );
};

// find movies
exports.api_movies = async (req, res) => {
  const comm = await movies
    .find()
    .then((data) => {
      return data;
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });

  res.json({ status: "success", movies: comm });
};

// movies add user
exports.api_movies_user = async (req, res) => {
  movies.findByIdAndUpdate(
    req.params.id,
    { $push: { user: req.userId } },
    function (error, data) {
      if (!data) {
        res.json({ status: "failed", message: "movies not added ..." });
      } else if (data) {
        res.json({
          status: "success",
          message: "movies added successfully ...",
        });
      } else {
        res.json(error);
      }
    }
  );
};

// find tvshow
exports.api_tvshows = async (req, res) => {
  const comm = await tvshows
    .find()
    .then((data) => {
      return data;
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });

  res.json({ status: "success", tvshows: comm });
};

// tvshows add user
exports.api_tvshows_user = async (req, res) => {
  tvshows.findByIdAndUpdate(
    req.params.id,
    { $push: { user: req.userId } },
    function (error, data) {
      if (!data) {
        res.json({ status: "failed", message: "tvshows not added ..." });
      } else if (data) {
        res.json({
          status: "success",
          message: "tvshows added successfully ...",
        });
      } else {
        res.json(error);
      }
    }
  );
};

// find sport
exports.api_sports = async (req, res) => {
  const comm = await sports
    .find()
    .then((data) => {
      return data;
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });

  res.json({ status: "success", sports: comm });
};

// sports add user
exports.api_sports_user = async (req, res) => {
  sports.findByIdAndUpdate(
    req.params.id,
    { $push: { user: req.userId } },
    function (error, data) {
      if (!data) {
        res.json({ status: "failed", message: "sports not added ..." });
      } else if (data) {
        res.json({
          status: "success",
          message: "sports added successfully ...",
        });
      } else {
        res.json(error);
      }
    }
  );
};


// ######################################### about(my profile) ######################################

// myprofile bio update
exports.api_about_bio_edit = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  var id = req.userId;
  //req.uderID;

  const user_id = await User.findByIdAndUpdate(
    id,
    { bio: req.body.bio },
    { useFindAndModify: false }
  )
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update User with id=${id}. Maybe Tutorial was not found!`,
        });
      } else return data._id;
    })
    .catch((err) => {
      return err;
    });
  const user = await User.findById(id).exec();
  res.json({
    status: "success",
    message: "Bio updated",
    userId: user_id,
    bio: user.bio,
  });
};

// Add volunteer
exports.api_add_volunteer = async (req, res) => {
  const {
    organization,
    role,
    cause,
    check,
    start_date,
    end_date,
    start_time,
    end_time,
    description,
  } = req.body;

  var data = new volunteer({
    user: req.userId,
    organization,
    role,
    cause,
    check,
    start_date,
    end_date,
    start_time,
    end_time,
    description,
  });

  data
    .save()
    .then((data) => {
      res.status(201).json({ status: "success", volunteer: data });
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

// edit voluntear experience
exports.api_edit_volunteer = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  var id = req.params.id;

  const user_id = await volunteer
    .findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update User with id=${id}. Maybe Tutorial was not found!`,
        });
      } else return data._id;
    })
    .catch((err) => {
      return err;
    });

  const user2 = await volunteer.findById(id).exec();
  res.json({
    status: "success",
    message: "volunteer updated",
    userId: user_id,
    data: user2,
  });
};

// delete volunteer
exports.api_delete_volunteer = async (req, res) => {
  volunteer.findByIdAndDelete(req.params.id, (err, data) => {
    if (err) {
      res.json({
        status: "failed",
        message: "data not delete",
      });
    } else {
      res.json({
        status: "success",
        message: "data delete success ...",
        data: data,
      });
    }
  });
};

// delete experience
exports.api_delete_experience = async (req, res) => {
  experience.findByIdAndDelete(req.params.id, (err, data) => {
    if (err) {
      res.json({
        status: "failed",
        message: "data not delete",
      });
    } else {
      res.json({
        status: "success",
        message: "data delete success ...",
        data: data,
      });
    }
  });
};

// edit experience
exports.api_edit_experience = async (req, res) => {
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

  experience
    .findByIdAndUpdate(id, data, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update User with id=${id}. Maybe Tutorial was not found!`,
        });
      } else return data._id;
    })
    .catch((err) => {
      return err;
    });

  const user2 = await experience.findById(id).exec();
  res.json({
    status: "success",
    message: "experience updated",

    data: user2,
  });
};

// Add experience
exports.api_add_experience = async (req, res) => {
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

  data
    .save()
    .then((data) => {
      res.status(201).json({ status: "success", experience: data });
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

// Add education
exports.api_add_education = async (req, res) => {
  const {
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
  } = req.body;

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
  });

  data
    .save()
    .then((data) => {
      res.status(201).json({ status: "success", education: data });
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

// multiple files
exports.api_multiple_files = (req, res) => {
  try {
    if (!req.files || !req.body.user_id) {
      res.json("plz provide files or user id ");
    } else {
      console.log("hii");
      var photos = new Array();
      var file_type = new Array();

      console.log(req.files.length);

      for (var i = 0; i < req.files.length; i++) {
        photos[i] = "media/" + req.files[i].filename;
        file_type[i] = path.extname(req.files[i].filename);
      }

      photos = new Photos({
        user: req.body.user_id,
        created: new Date(),
        photos_name: photos,
        file_type: file_type,
      });

      photos
        .save()
        .then(() => {
          res.status(201).json(photos);
          // res.status(201).redirect("/photos");
          // res.json(photos);
        })
        .catch((error) => {
          res.status(400).json({
            error: error,
          });
        });
    }
  } catch (err) {
    res.json(err + "something wrong");
  }
};


// edit education
exports.api_edit_education = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const {
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
  } = req.body;

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
  };

  var id = req.params.id;

  education
    .findByIdAndUpdate(id, data, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update User with id=${id}. Maybe Tutorial was not found!`,
        });
      } else return data._id;
    })
    .catch((err) => {
      return err;
    });

  const user2 = await education.findById(id).exec();
  res.json({
    status: "success",
    message: "education updated",

    data: user2,
  });
};

// delete education
exports.api_delete_education = async (req, res) => {
  education.findByIdAndDelete(req.params.id, (err, data) => {
    if (err) {
      res.json({
        status: "failed",
        message: "data not delete",
      });
    } else {
      res.json({
        status: "success",
        message: "data delete success ...",
        data: data,
      });
    }
  });
};

// delete language
exports.api_delete_languages = async (req, res) => {
  languages.findByIdAndDelete(req.params.id, (err, data) => {
    if (err) {
      res.json({
        status: "failed",
        message: "data not delete",
      });
    } else {
      res.json({
        status: "success",
        message: "data delete success ...",
        data: data,
      });
    }
  });
};

// add languages
exports.api_add_languages = async (req, res) => {
  var data = new languages({
    user: req.session.userId,
    language: req.body.language,
    proficiency: req.body.proficiency,
  });

  data
    .save()
    .then((data) => {
      res.status(201).json({ status: "success", languages: data });
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};


// edit languages
exports.api_edit_languages = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  var id = req.params.id;

  const user_id = await languages
    .findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update User with id=${id}. Maybe Tutorial was not found!`,
        });
      } else return data._id;
    })
    .catch((err) => {
      return err;
    });

  const user2 = await languages.findById(id).exec();
  res.json({
    status: "success",
    message: "languages updated",
    userId: user_id,
    data: user2,
  });
};


// public services

// find public services
exports.api_publicService = async (req, res) => {
  const comm = await publicservice
    .find()
    .then((data) => {
      return data;
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });

  res.json({ status: "success", publicservice: comm });
};


// #############################################################################################################################



// add friends
exports.add_friends_request = async (req, res) => {

  var fri_req = new friend_requests({
    sender: req.userId,
    reciever: req.params.id,
    request: true,
    response: false,
    action: 'pending',
    channel: req.userId + req.params.id,
    message: '',
  })

  fri_req.save()
    .then((data) => {
      res.json({
        status: 'success',
        message: 'your friend request send successfully ...',
        data: data
      })
    })
    .catch((error) => {
      res.json(error);
    })
}

// accept and reject friend request
exports.friend_request_response = async (req, res) => {

  if (!req.body) {
    res.json('empty data');
  }

  const { action } = req.body;

  var data = {};

  if (action === 'accept') {
    data = {
      response: true,
      action: 'accept'
    }
  }
  else if (action === 'reject') {
    data = {
      response: false,
      action: 'reject'
    }
  }

  const f_res = await friend_requests.findByIdAndUpdate(req.params.id, data, { new: true });

  if (action === 'accept') {
    var friends = { user: f_res.reciever, relation: 'friend' };
    const sen = await User.findByIdAndUpdate(f_res.sender, { $push: { konnects: friends } }, { new: true });

    var friends2 = { user: f_res.sender, relation: 'friend' };
    const rec = await User.findByIdAndUpdate(f_res.reciever, { $push: { konnects: friends } }, { new: true });
  }


  const res_data = await friend_requests.findById(req.params.id).exec();

  res.json({
    status: 'success',
    message: 'your friend request action success ...',
    data: res_data
  })
}


// friend request listing
exports.friend_request_list = async (req, res) => {

  friend_requests.find({ sender: req.params.id })
    .then((data) => {
      res.json({
        status: 'success',
        data: data
      })
    })
    .catch((error) => {
      res.json(error);
    })
}

// konnects list
exports.konnects_list = async (req, res) => {
  User.findById(req.params.id)
    .populate({ path: 'konnects.user', select: ['_id', 'fname', 'lname', 'profile_pic', 'mobile', 'email', 'pincode'] })
    .then((data) => {
      res.json({
        status: 'success',
        message: 'your all friends list find success ...',
        data: data
      })
    })
    .catch((error) => {
      res.json(error)
    })
}


// add relation
exports.add_relations = async (req, res) => {

  const { id, relation, } = req.query;
  try {
    if (id && relation) {
      const findId = await User.findOneAndUpdate(
        { _id: req.userId, 'konnects._id': id },
        {
          $set: {
            'konnects.$.relation': relation,
            },
        }, { new: true }
      );
      res.json(findId);
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
