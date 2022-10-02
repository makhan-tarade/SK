const User = require('../models/model');
const { communities, communities_events, communities_photos, communities_discussion_post, communities_announcements_post } = require('../models/communitiesModel1');


// admin
exports.admin = async (req, res) => {
    // find users
    const users = await User.find()
      .then((data) => {
        return data;
      })
      .catch((error) => {
        res.status(400).json({
          error: error,
        });
      });


      res.render(__dirname + '/../admin/index', { users }); 
}


// admin dashboard
exports.admin_dashboard = async (req, res) => {
    // find users
    const users = await User.find()
      .then((data) => {
        return data;
      })
      .catch((error) => {
        res.status(400).json({
          error: error,
        });
      });


      res.render(__dirname + '/../admin/index', { users }); 
}



// admin dashboard
exports.admin_free_user = async (req, res) => {
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
    res.render(__dirname + '/../admin/new_free_user', { users2 }); 
}

