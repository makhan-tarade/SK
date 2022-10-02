var express = require("express");
var router = express.Router();
var session = require("express-session");
const multer = require('multer')
var cookieParser = require("cookie-parser");
var path = require("path");

// models
const User = require("../models/model");

// models
const publicService = require("../models/publicServiceModal");

const { district, area_pincode } = require('../models/areaPincodeModel');


//multer - File upload path and filename
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, 'public/media')
  },
  filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix + '-' + file.originalname)
  }
});

const upload = multer({ storage: storage });

const { events, events_discussion } = require("../models/eventsModel");
var Feed = require("../models/feedModel");
const {
  checkins,
  sports,
  music,
  movies,
  tvshows,
  books,
} = require("../models/moreModel");
const {
  communities,
  communities_events,
  communities_events_discussion,
  communities_photos,
  communities_discussion_post,
  communities_announcements_post,
} = require("../models/communitiesModel1");
// import controller
const adminController = require("../controller/adminController");

//session
const oneDay = 1000 * 60 * 60 * 24;
router.use(
  session({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
    resave: false,
  })
);
router.use(cookieParser());

// admin
router.get("/admin", adminController.admin);

// admin dashboard
router.get("/admin/dashboard", adminController.admin_dashboard);

router.get("/admin/free_user", async (req, res) => {
  // find users
  const users2 = await User.find()
    .then((data) => {
      return data;
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
  res.render(__dirname + "/../admin/new_free_user", { users2 });
});

//premium user
router.get("/admin/premium_user", async (req, res) => {
  // find premium users
  const users2 = await User.find()
    .then((data) => {
      return data;
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
  res.render(__dirname + "/../admin/new_premium_user", { users2 });
});

// ######################################################################################################
// delete  free & premium user

// free & premium  delete
router.get("/free-user-delete/:id", async (req, res) => {
  const data = await User.findByIdAndDelete(req.params.id);
  if (!data) {
    // res.json({status: 'failed', message: 'data not found'})
    res.redirect(req.get("referer"));
  } else {
    // res.json({status: 'success', message: 'your data deleted successfully'})
    res.redirect(req.get("referer"));
  }
});

// community
router.get("/admin/communities", async (req, res) => {
  // find community
  const community = await communities
    .find()
    .then((data) => {
      return data;
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
  res.render(__dirname + "/../admin/new_community", { community });
});

// #####################################################################################################
// community  delete
router.get("/community-delete/:id", async (req, res) => {
  const data = await communities.findByIdAndDelete(req.params.id);
  if (!data) {
    // res.json({status: 'failed', message: 'data not found'})
    res.redirect(req.get("referer"));
  } else {
    // res.json({status: 'success', message: 'your data deleted successfully'})
    res.redirect(req.get("referer"));
  }
});

// private group
router.get("/admin/group_private", async (req, res) => {
  // find private group
  const community = await communities
    .find()
    .then((data) => {
      return data;
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
  res.render(__dirname + "/../admin/new_group_private", { community });
});

// public group
router.get("/admin/group_public", async (req, res) => {
  // find private group
  const community = await communities
    .find()
    .then((data) => {
      return data;
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
  res.render(__dirname + "/../admin/new_group_public", { community });
});

// events

router.get("/admin/events", async (req, res) => {
  // find
  const event = await events
    .find()
    .then((data) => {
      return data;
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
  res.render(__dirname + "/../admin/new_event", { event });
});

router.get("/admin/demo", async (req, res) => {
  res.render(__dirname + "/../admin/demo");
});

// group events

router.get("/admin/group-events", async (req, res) => {
  // find
  const groupevent = await communities_events
    .find()
    .then((data) => {
      return data;
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
  res.render(__dirname + "/../admin/new_group_event", { groupevent });
});

// #####################################################################################################
// community event  delete
router.get("/community-events-delete/:id", async (req, res) => {
  const data = await communities_events.findByIdAndDelete(req.params.id);
  if (!data) {
    // res.json({status: 'failed', message: 'data not found'})
    res.redirect(req.get("referer"));
  } else {
    // res.json({status: 'success', message: 'your data deleted successfully'})
    res.redirect(req.get("referer"));
  }
});

// community Announcement

router.get("/admin/group-announcement", async (req, res) => {
  // find
  const groupAnnounncement = await communities_announcements_post
    .find()
    .then((data) => {
      return data;
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
  res.render(__dirname + "/../admin/new_group_announcement", {
    groupAnnounncement,
  });
});

// #####################################################################################################
// community announcement  delete
router.get("/community-announcement-delete/:id", async (req, res) => {
  const data = await communities_announcements_post.findByIdAndDelete(
    req.params.id
  );
  if (!data) {
    // res.json({status: 'failed', message: 'data not found'})
    res.redirect(req.get("referer"));
  } else {
    // res.json({status: 'success', message: 'your data deleted successfully'})
    res.redirect(req.get("referer"));
  }
});

// community discussion

router.get("/admin/group-discussion", async (req, res) => {
  // find
  const groupdiscussion = await communities_discussion_post
    .find()
    .then((data) => {
      return data;
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
  res.render(__dirname + "/../admin/new_group_discussion", { groupdiscussion });
});

// #####################################################################################################
// community discussion  delete
router.get("/community-discussion-delete/:id", async (req, res) => {
  const data = await communities_discussion_post.findByIdAndDelete(
    req.params.id
  );
  if (!data) {
    // res.json({status: 'failed', message: 'data not found'})
    res.redirect(req.get("referer"));
  } else {
    // res.json({status: 'success', message: 'your data deleted successfully'})
    res.redirect(req.get("referer"));
  }
});

// community Photos

router.get("/admin/group-photos", async (req, res) => {
  // find
  const groupPhotos = await communities_photos
    .find()
    .then((data) => {
      return data;
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
  res.render(__dirname + "/../admin/new_group_photos", { groupPhotos });
});

// #####################################################################################################
// community Gallery  delete
router.get("/community-photos-delete/:id", async (req, res) => {
  const data = await communities_photos.findByIdAndDelete(req.params.id);
  if (!data) {
    // res.json({status: 'failed', message: 'data not found'})
    res.redirect(req.get("referer"));
  } else {
    // res.json({status: 'success', message: 'your data deleted successfully'})
    res.redirect(req.get("referer"));
  }
});

// event discussion

router.get("/admin/event-discussion", async (req, res) => {
  // find
  const eventdiscussion = await events_discussion
    .find()
    .then((data) => {
      return data;
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
  res.render(__dirname + "/../admin/new_event_discussion", { eventdiscussion });
});

// feed post
router.get("/admin/feed_post", async (req, res) => {
  // find
  const post = await Feed.find()
    .then((data) => {
      return data;
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
  res.render(__dirname + "/../admin/new_feed_post", { post });
});

// #####################################################################################################
// feed post  delete
router.get("/feed-post-delete/:id", async (req, res) => {
  const data = await Feed.findByIdAndDelete(req.params.id);
  if (!data) {
    // res.json({status: 'failed', message: 'data not found'})
    res.redirect(req.get("referer"));
  } else {
    // res.json({status: 'success', message: 'your data deleted successfully'})
    res.redirect(req.get("referer"));
  }
});






// sport
router.get("/admin/sport", async (req, res) => {
  // find
  const sport = await sports
    .find()
    .then((data) => {
      return data;
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
  res.render(__dirname + "/../admin/new_sport", { sport });
});


// checkin
router.get("/admin/checkin", async (req, res) => {
  // find
  const checkin = await checkins
    .find()
    .then((data) => {
      return data;
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
  res.render(__dirname + "/../admin/new_checkin", { checkin });
});


//#####################################################################################################################################

//sports add

router.post("/sport-add", upload.single('sport_pic'), (req, res) => {
  var data = new sports({
    city: req.body.city,
    state: req.body.state,
    country: req.body.country, 
    sport_pic: 'media/' + req.file.filename,
  });

  data.save()
    .then((data) => {
      res.redirect("/admin/sport");
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
});


//checkin add

router.post("/checkin-add", upload.single('checkin_pic'), (req, res) => {
  var data = new checkins({
    city: req.body.city,
    state: req.body.state,
    country: req.body.country, 
    checkin_pic: 'media/' + req.file.filename,
  });

  data.save()
    .then((data) => {
      res.redirect("/admin/checkin");
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
});

// #####################################################################################################
// sport  delete
router.get("/sport-delete/:id", async (req, res) => {
  const data = await sports.findByIdAndDelete(req.params.id);
  if (!data) {
    // res.json({status: 'failed', message: 'data not found'})
    res.redirect(req.get("referer"));
  } else {
    // res.json({status: 'success', message: 'your data deleted successfully'})
    res.redirect(req.get("referer"));
  }
});

// #####################################################################################################
// sport  delete
router.get("/checkin-delete/:id", async (req, res) => {
  const data = await checkins.findByIdAndDelete(req.params.id);
  if (!data) {
    // res.json({status: 'failed', message: 'data not found'})
    res.redirect(req.get("referer"));
  } else {
    // res.json({status: 'success', message: 'your data deleted successfully'})
    res.redirect(req.get("referer"));
  }
});



// music
router.get("/admin/music", async (req, res) => {
  // find
  const musics = await music
    .find()
    .then((data) => {
      return data;
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
  res.render(__dirname + "/../admin/new_music", { musics });
});


//#####################################################################################################################################

// Music add

router.post("/music-add", upload.single('music_pic'), (req, res) => {
  var data = new music({
    music_name: req.body.music_name,

    music_pic: 'media/' + req.file.filename,
  });

  data.save()
    .then((data) => {
      res.redirect("/admin/music");
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
});


// #####################################################################################################
// music  delete
router.get("/music-delete/:id", async (req, res) => {
  const data = await music.findByIdAndDelete(req.params.id);
  if (!data) {
    // res.json({status: 'failed', message: 'data not found'})
    res.redirect(req.get("referer"));
  } else {
    // res.json({status: 'success', message: 'your data deleted successfully'})
    res.redirect(req.get("referer"));
  }
});



// movies
router.get("/admin/movies", async (req, res) => {
  // find
  const movie = await movies
    .find()
    .then((data) => {
      return data;
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
  res.render(__dirname + "/../admin/new_movies", { movie });
});

//#####################################################################################################################################

// Movies add

router.post("/movies-add", upload.single('movies_pic'), (req, res) => {
  var data = new movies({
    movies_name: req.body.movies_name,

    movies_pic: 'media/' + req.file.filename,
  });

  data.save()
    .then((data) => {
      res.redirect("/admin/movies");
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
});


// #####################################################################################################
// movies  delete
router.get("/movies-delete/:id", async (req, res) => {
  const data = await movies.findByIdAndDelete(req.params.id);
  if (!data) {
    // res.json({status: 'failed', message: 'data not found'})
    res.redirect(req.get("referer"));
  } else {
    // res.json({status: 'success', message: 'your data deleted successfully'})
    res.redirect(req.get("referer"));
  }
});




// tvshow
router.get("/admin/tvshow", async (req, res) => {
  // find
  const tvshow = await tvshows
    .find()
    .then((data) => {
      return data;
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
  res.render(__dirname + "/../admin/new_tvshow", { tvshow });
});

//#####################################################################################################################################

// tvshow add

router.post("/tvshow-add", upload.single('tvshow_pic'), (req, res) => {
  var data = new tvshows({
    tvshow_name: req.body.tvshow_name,

    tvshow_pic: 'media/' + req.file.filename,
  });

  data.save()
    .then((data) => {
      res.redirect("/admin/tvshow");
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
});


// #####################################################################################################
// tvshow  delete
router.get("/tvshow-delete/:id", async (req, res) => {
  const data = await tvshows.findByIdAndDelete(req.params.id);
  if (!data) {
    // res.json({status: 'failed', message: 'data not found'})
    res.redirect(req.get("referer"));
  } else {
    // res.json({status: 'success', message: 'your data deleted successfully'})
    res.redirect(req.get("referer"));
  }
});


// books
router.get("/admin/books", async (req, res) => {
  // find
  const book = await books
    .find()
    .then((data) => {
      return data;
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
  res.render(__dirname + "/../admin/new_books", { book });
});

//#####################################################################################################################################

// books add by admin panel

// book add

router.post("/book-add", upload.single('book_pic'), (req, res) => {
  var data = new books({
    book_name: req.body.book_name,
 
    book_pic: 'media/' + req.file.filename,
  });

  data.save()
    .then((data) => {
      res.redirect("/admin/books");
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
});

// #####################################################################################################
// books  delete
router.get("/books-delete/:id", async (req, res) => {
  const data = await books.findByIdAndDelete(req.params.id);
  if (!data) {
    // res.json({status: 'failed', message: 'data not found'})
    res.redirect(req.get("referer"));
  } else {
    // res.json({status: 'success', message: 'your data deleted successfully'})
    res.redirect(req.get("referer"));
  }
});





// ################################################################ public service ##################################################
// public services

router.get("/admin/publicService", async (req, res) => {
  // find
  const data = await publicService
    .find()
    .then((data) => {
      return data;
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });

       // find area pincode
       const dist = await district.find().exec();
  res.render(__dirname + "/../admin/new_public_service", {pub: data,dist });
});


//#####################################################################################################################################

// public Service add

router.post("/public-services-add", upload.single('service_pic'), (req, res) => {
  var data = new publicService({
    service_no: req.body.service_no,
    service_name: req.body.service_name,
    service_address: req.body.service_address,
    service_pincode: req.body.service_pincode,
    service_city: req.body.service_city,
    service_email: req.body.service_email,
    service_pic: 'media/' + req.file.filename,
  });

  data.save()
    .then((data) => {
      res.redirect("/admin/publicService");
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
});

// #####################################################################################################
// public Services  delete
router.get("/public-delete/:id", async (req, res) => {
  const data = await publicService.findByIdAndDelete(req.params.id);
  if (!data) {
    // res.json({status: 'failed', message: 'data not found'})
    res.redirect(req.get("referer"));
  } else {
    // res.json({status: 'success', message: 'your data deleted successfully'})
    res.redirect(req.get("referer"));
  }
});

router.get("/admin/demo", async (req, res) => {
  res.render(__dirname + "/../admin/demo");
});

router.get("/admin/lock", async (req, res) => {
  res.render(__dirname + "/../admin/lock");
});

router.get("/admin/login", async (req, res) => {
  res.render(__dirname + "/../admin/login");
});

router.get("/admin/register", async (req, res) => {
  res.render(__dirname + "/../admin/register");
});

module.exports = router;
