const { Timestamp } = require('mongodb');
var Feed = require('../models/feedModel');
var User = require('../models/model');
const date = require('date-and-time');
var { events, events_discussion } = require('../models/eventsModel');
const { communities, communities_discussion_post, communities_announcements_post, posts } = require('../models/communitiesModel1');
const { district, area_pincode } = require('../models/areaPincodeModel');
const { appreciations, benefits } = require("../models/commercialModel");

const { friend_requests } = require('../models/myprofileModel');

// post create
exports.post_create = async (req, res) => {

    // category: feed, cummunities discussion, communities announcements, events discussion.
    // Id: feed: _id, communities: communities_id, events: events_id.
    // post_type: 1: text, 2: image, 3. video.

    if (!req.body) {
        res.json({ status: 'failed', message: 'form data empty!' });
    }

    const { category, communities_id, events_id, post_type } = req.query;
    const { content, privacy, groups, events, district, pincode } = req.body;

    var files_data = new Array();
    var groups_data = new Array();
    var events_data = new Array();
    var pincode_data = new Array();

    var data = new posts({
        category,
        user_id: req.session.userId,
        post_type,
        post_text: content,
        privacy
    });

    if (communities_id) {
        data.communities_id = communities_id
    }
    if (events_id) {
        data.events_id = events_id;
    }

    if (privacy === 'private') {
        if (groups && groups !== '') {
            for (var g = 0; g < groups.length; g++) {
                groups_data[g] = groups[g];
            }
            data.groups = groups_data;
        }
        else if (events && events !== '') {
            for (var e = 0; e < events.length; e++) {
                events_data[e] = events[e];
            }
            data.events = events_data;
        }
        else if (pincode && district) {
            for (var p = 0; p < pincode.length; p++) {
                pincode_data[p] = pincode[p];
            }
            data.district = district;
            data.pincode = pincode_data;
        }
    }

    console.log(data);


    if (req.files) {
        for (var i = 0; i < req.files.length; i++) {
            files_data[i] = 'media/' + (req.files[i].filename);
        }
        if (post_type === '1' || post_type === 1) {
            for (var ii = 0; ii < req.files.length; ii++) {
                fs.unlink(__dirname + '/../../public/media/' + req.files[ii].filename, function (err) {
                    if (err) return console.log(err);
                    console.log('file deleted successfully');
                });
            }

        }
        else if (post_type === '2' || post_type === 2) {
            data.post_files = files_data;
        }
        else if (post_type === '3' || post_type === 3) {
            data.post_files = files_data;
        }
    }

    data.save()
        .then((data) => {
            res.status(201).redirect(req.get('referer'));
        })
        .catch((error) => {
            res.status(400).json({
                status: 'failed',
                message: 'post create failed, please check your fiels and try again...',
                error: error
            });
        });

}


// post view
exports.feed = async (req, res) => {

    // registered user mobile destroy
    req.session.rmob = false;
    // second user
    req.session.secondUserId = false;

    // find profile pic
    const profile = await User.findById(req.session.userId).exec();

    // find area pincode
    const dist = await district.find().exec();

    // find feeds
    const users = await User.find().exec();


    // find communities
    const comm = await communities.find().exec();

    // find events
    const event = await events.find({ user: req.session.userId }).exec();

    // find discission posts
    const d_post = await communities_discussion_post.find({ user_id: req.session.userId }).exec();

    // find announcement posts
    const a_post = await communities_announcements_post.find({ user_id: req.session.userId }).exec();

    // find events discussion
    const events_dis_post = await events_discussion.find({ user: req.session.userId }).exec();

    // var myKonnetsPost  = await Feed.find().where('user_id').in(myKonnetsId).exec();
    var myKonnetsPost = await posts.find()
        .populate({ path: 'user_id', select: ['fname', 'lname', 'profile_pic'] }).exec();
    console.log(myKonnetsPost);

    // frient request list
    const fri_req_list = await friend_requests.find({ reciever: req.session.userId })
        .populate({ path: 'sender', select: ['_id', 'fname', 'lname', 'profile_pic'] }).exec();


    const my_kon = await User.findById(req.session.userId)
        .populate({ path: 'konnects.user', select: ['_id', 'fname', 'lname', 'profile_pic', 'mobile', 'address'] }).exec();

    // sorting time wise
    myKonnetsPost = myKonnetsPost.sort((a, b) => {
        if (a.date < b.date)
            return -1

        if (a.date > b.date)
            return 1

        if (a.date == b.date) {
            if (a.time < b.time)
                return -1

            if (a.time > b.time)
                return 1

            return 0
        }
    });


    res.render('feed', { notifications: fri_req_list, my_kon, dist, event, comm, users, profile, e_post: events_dis_post, d_post, a_post, post: myKonnetsPost, userid: req.session.userId, username: req.session.userName });

}

// pincode
exports.area_pincode = async (req, res) => {

    var dist_name = req.params.district;
    dist_name = dist_name.toUpperCase();


    // find area pincode
    const data = await area_pincode.find({ district: dist_name }).exec();

    res.json({ status: 'success', pincode: data })
}


// events_discussion_post_user
exports.events_discussion_post_user = async (req, res) => {

    var users_id = new Array();

    // find events discussion
    const events_dis_post = await events_discussion.find().exec();

    events_dis_post.forEach(function (e, i) {
        console.log(e.user);
        users_id[i] = e.user;
    })

    const users_data = await User.find().where('_id').in(users_id).exec();

    console.log(users_data);
}





// post view- username
// exports.feed_un = (req, res) => {

//     var userId = req.query.un;
//     console.log('user Id :' + userId);

//     if (req.session.login) {

//         Feed.find({ user_id: userId }).then(
//             (users) => {
//                 var userName = users[0].user_name;
//                 console.log(users.user_name);
//                 res.status(200).render('feed', { post: users, userName, type: users.post_type });
//             }
//         ).catch(
//             (error) => {
//                 res.status(400).json({
//                     error: error
//                 });
//             }
//         );
//     } else {
//         req.session = false;
//         res.redirect('/login');
//     }
// }

// find where condition
// exports.feed_un = (req, res) => {


//     Feed.where('like_color').gte('liked').lte(200)
//         .exec(function (err, result) {
//             if (err) {
//                 console.log(err)
//             } else {
//                 console.log("Result :", result)
//                 res.json(result);
//             }
//         });


// }

// exports.feed_un = (req, res) => {
//     Feed
//         .find({ user_id: '629f2e747563a9a0066d1235' })
//         .then(doc => {
//             console.log(doc)
//             res.json(doc)
//         })
//         .catch(err => {
//             console.error(err)
//         })
// }
// find().all('pets', ['dog', 'cat', 'ferret']);

// add like or remove
exports.like_post = async (req, res) => {

    if (!req.body.post_id || !req.body.user_id) {
        res.json("plz provide post id or user id");
    }
    const data1 = await posts.findOne({
        $and: [{ _id: req.body.post_id }, { like: req.body.user_id }],
    });
    console.log(data1);
    try {
        if (!data1) {
            const data = await posts.findOneAndUpdate(
                { _id: req.body.post_id },
                {
                    $push: { like: req.body.user_id },
                },
                { new: true }
            );
            res.json(data);
        } else {
            const data = await posts.findOneAndUpdate(
                { _id: req.body.post_id },
                {
                    $pull: { like: req.body.user_id },
                },
                { new: true }
            );
            res.json(data);
        }
    } catch (error) {
        res.json(error + " something wrong");
    }
}

// like
exports.feed_post_like = (req, res) => {

    var id = req.body.id;
    posts.findOne({ _id: id })
        .then((post) => {
            if (post.like >= 0) {
                console.log('Like: ' + post.like);
                var like = post.like;
                var color = post.like_color;

                if (color === '') {
                    color = 'liked';
                    like = like + 1;

                    //res.status(200).json(like);

                    posts.findByIdAndUpdate(id, { like: like, like_color: color }, { useFindAndModify: false })
                        .then(data => {
                            if (!data) {
                                res.status(404).send({
                                    message: `Cannot update User with id=${id}. Maybe Tutorial was not found!`
                                });
                            } else res.json(data);
                        })
                        .catch(err => {
                            res.status(500).send({
                                message: "Error updating User with id=" + id
                            });
                        });
                }
                else {
                    color = '';
                    like = like - 1;
                    //res.status(200).json(like);

                    posts.findByIdAndUpdate(id, { like: like, like_color: color }, { useFindAndModify: false })
                        .then(data => {
                            if (!data) {
                                res.status(404).send({
                                    message: `Cannot update User with id=${id}. Maybe Tutorial was not found!`
                                });
                            } else res.json(data);
                        })
                        .catch(err => {
                            res.status(500).send({
                                message: "Error updating User with id=" + id
                            });
                        });
                }


            } else {
                res.send('like not found');
            }
        })
        .catch(
            (error) => {
                res.status(404).json({
                    error: error
                });
            }
        );





    // if (!req.body) {
    //     return res.status(400).send({
    //         message: "Data to update can not be empty!"
    //     });
    // }

    // var id = req.body.id;

    // User.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    //     .then(data => {
    //         if (!data) {
    //             res.status(404).send({
    //                 message: `Cannot update User with id=${id}. Maybe Tutorial was not found!`
    //             });
    //         } else res.send({ message: "User was updated successfully." });
    //     })
    //     .catch(err => {
    //         res.status(500).send({
    //             message: "Error updating User with id=" + id
    //         });
    //     });
}


// like-show
exports.feed_post_like_show = (req, res) => {

    var id = req.body.id;

    posts.findById(id)
        .then((data) => {
            res.status(200).json(data);
        })
        .catch(
            (error) => {
                res.status(404).json({
                    error: error
                });
            }
        );
}


// share
exports.feed_post_share = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    // share var
    var id = req.body.id;
    var user_id = req.session.userId;
    var time = new Date();
    var obj = { userId: user_id, time: time }

    // find first
    posts.findById(id).then((data) => {

        //console.log(data.shared.length)
        function fuid() {
            var sd;
            for (let i = 0; i < data.shared.length; i++) {
                sd = data.shared[i];
                //console.log(sd)

                if ('userId' in sd == true) {
                    //console.log(sd.userId)
                    return sd.userId;
                }

            }
        }

        var shared_user_id = fuid();

        if (user_id == shared_user_id) {
            res.json('post already shared');
        }
        else {
            posts.findByIdAndUpdate(id,
                { $push: { shared: obj } },
                function (error, success) {
                    if (error) {
                        res.json(error);
                    } else {
                        res.json('shared succesfully');
                    }
                });
        }
    })
        .catch((error) => {
            res.json(error);
        }
        );
}


// comment
exports.feed_post_comment = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    var id = req.body.id;

    var obj = {
        userId: req.session.userId,
        name: req.session.userName,
        pic: req.session.profilePic,
        comment: req.body.comment,
        time: new Date(),
    }

    posts.findByIdAndUpdate(id,
        { $push: { comments: obj } },
        function (error, data) {
            if (error) {
                res.json(error);
            } else {
                res.json(data);
            }
        });
}


// comment show
exports.feed_post_comment_show = (req, res) => {
    var id = req.body.id;

    posts.findById(id).populate('comments.userId').then((data) => {
        res.status(200).json(data);
    })
        .catch((error) => {
            res.json(error);
        });
}


// // like post
// exports.feed_post_like1 = (req, res) => {
//     if (!req.body) {
//         return res.status(400).send({
//             message: "Data to update can not be empty!"
//         });
//     }

//     // like var
//     var id = req.body.id;
//     var user_id = req.session.userId;
//     var time = new Date();
//     var obj = { userId: user_id, time: time }

//     // find first
//     Feed.findOne({ _id: id }).then(
//         (data) => {

//             //console.log(data.like.length)
//             function fuid() {
//                 var sd;
//                 for (let i = 0; i < data.like.length; i++) {
//                     sd = data.like[i];
//                     //console.log(sd)

//                     if ('userId' in sd === true) {
//                         console.log(sd._id);
//                         console.log(sd.userId);
//                         return sd.userId;
//                     }

//                 }
//             }
//             console.log(fuid())

//             var like_user_id = fuid();
//             console.log('userId :' + like_user_id)
//             //console.log('userId :' + req.session.userId)
//             console.log('if uid :' + user_id)
//             console.log('if _id :' + like_user_id)

//             if (user_id === like_user_id) {
//                 res.json('post already liked');
//             }
//             else {
//                 console.log('like user id does not meched')
//                 Feed.findOneAndUpdate(
//                     { _id: id },
//                     { $push: { like: obj } },
//                     function (error, success) {
//                         if (error) {
//                             res.json(error);
//                         } else {
//                             res.json('like succesfully');
//                         }
//                     });
//             }
//         }

//     ).catch(
//         (error) => {

//             res.json(error);
//         }
//     );

// }




// let mt = new Array();
// mt = { myname: "makhan", othername: 'raj' };
// console.log(mt);

// console.log('myname' in mt);

// console.log(mt.myname)

// if ('myname' in mt === false) {
//     car.make = 'Suzuki';
//   }


// Search friends (find users)
exports.search_friends = async (req, res) => {
    // find feeds

    var search = req.body.search;
    const s = search.split(' ');
    console.log(s);

    const search_pin = await User.find({ $or: [{ fname: s[0] }, { lname: s[1] }] }).then(
        (users) => {

            var d = new Array();
            users.forEach((e, index) => {

                d[index] = {
                    profile_pic: e.profile_pic,
                    fullname: e.fname + ' ' + e.lname,
                    pincode: e.pincode,
                    mobile: e.mobile,
                }

            });
            return d;
        }
    ).catch(
        (error) => {
            return error;
        }
    );

    res.status(200).json(search_pin);
}


// user profile
exports.user_profile = async (req, res) => {

    const mobile = req.query.m;
    const user = await User.findOne({ mobile: mobile });

    if (!user) {
        res.json({ status: 'failed', message: 'user does not found' })
    } else {
        if (mobile === user.mobile) {

            // find feeds
            const post = await posts.findOne();

            res.json({ status: 'success', user, profile: user, post })
        }
    }
}

// find post 
exports.find_post = async (req, res) => {
    // find feeds
    const post = await posts.find().exec();

    res.json({ status: 'success', message: 'feed post ', post })
}

// feed page testing - ( multiple post find and sorting time wise )
exports.find_post_testing = async (req, res) => {

    var post = new Array();
    var count = 0;

    // find feeds
    const post_feed = await posts.find().exec();

    // find discission posts
    const post_dis = await communities_discussion_post.find().exec();

    // find announcement posts
    const post_ann = await communities_announcements_post.find().exec();

    // merge post 1
    post_feed.forEach(function (pf, pfi) {
        post[pfi] = pf;
    });

    count = post.length;

    // merge post 2
    post_dis.forEach(function (pd, pdi) {
        post[pdi + count] = pd;
    });

    count = post.length;

    // merge post 3
    post_ann.forEach(function (pa, pai) {
        post[pai + count] = pa;
    })

    // count total posts
    count = post.length;
    console.log(count);


    // sorting time wise
    post = post.sort((a, b) => {
        if (a.date < b.date)
            return -1

        if (a.date > b.date)
            return 1

        if (a.date == b.date) {
            if (a.time < b.time)
                return -1

            if (a.time > b.time)
                return 1

            return 0
        }
    });

    // merge posts display all
    var tt;
    post.forEach(function (p, i) {
        tt = date.format(p.created, 'DD/MM/YYYY HH:mm:ss');
        console.log(tt, p.user_name);
    })

    // res.json({status: 'success', message: 'feed post ', post })
}


// find all post
exports.find_all_post = async (req, res) => {

    // find users
    const users = await User.find().exec();
    console.log(users.length);

    // find my konnects
    let friends = new Array();

    users.forEach(function (u, ui) {
        u.friends.forEach(function (uf, ufi) {
            if (uf.user === '62ea73bb101462a5fc203c56') {
                friends[ui] = u._id;
            }
        })
    })

    console.log(friends.length);


    const konnects = await User.find().where('_id').in(friends).exec();
    console.log(konnects);

    var myKonnetsId = new Array();
    myKonnetsId[0] = '62ea73bb101462a5fc203c56';

    console.log(myKonnetsId);

    var abc = myKonnetsId.length;

    konnects.forEach(function (k, ki) {
        myKonnetsId[ki + abc] = k._id;
    })

    console.log(myKonnetsId);

    const myKonnetsPost = await posts.find().where('user_id').in(myKonnetsId).exec();

    var mypost = new Array();
    myKonnetsPost.forEach(function (mp, mpi) {
        mp.pincode.forEach(function (pin, pi) {

            if (profile.pincode === pin) {
                mypost[mpi] = mp;
            }
        })
    })



    //    console.log(myKonnetsPost);

    res.json({
        status: 'success',
        message: 'feed, communities discussion post and communities annoucements post...',
        result: mypost
    })
}


// find nested
exports.find_nested = async (req, res) => {

    const data = await posts.aggregate(
        [
            {
                $lookup: {
                    from: "User",
                    localField: "lname",
                    foreignField: "user_id",
                    as: "users"
                }
            }
        ])




    res.json(data)


}


// benefits inner page
exports.benefits_inner_page = async (req, res) => {

    const { id, category } = req.query;
    var benefit;
    var benefit_all;

    if (!id || id === '' || !category || category === '') {
        res.redirect('/feed');
    }

    else if (id && category) {
        // benifits find
        benefit = await benefits.findById(id).exec();

        // benifits find
        benefit_all = await benefits.find({ category: category }).exec();
    }

    const userId = req.session.secondUserId
        ? req.session.secondUserId
        : req.session.userId;

    // find user data (profile , contact, etc)
    const user_data = await User.findById(userId).exec();

    const username = user_data.fname + " " + user_data.lname;
    const myid = userId;

    // find first user data (profile , contact, etc)
    const user = await User.findById(req.session.userId).exec();



    res.render("grabit_new_inner_individual", {
        user,
        benefit,
        benefit_all,
        contact: user_data,
        profile: user_data,
        username,
        userid: myid,
        myid,
    });
}

// grabit benefts
exports.grabit_benefits = async (req, res) => {

    const { category } = req.query;
    var benefits_data;

    if (!category || category === '') {
        res.redirect('/feed');
    }

    // benefits find all
    else if (category) {
        benefits_data = await benefits.find({ category: req.query.category }).exec();
        benefits_data = benefits_data.reverse();
    }

    const userId = req.session.secondUserId ? req.session.secondUserId : req.session.userId;

    // find user data (profile , contact, etc)
    const user_data = await User.findById(userId).exec();

    const username = user_data.fname + ' ' + user_data.lname;
    const myid = userId;

    // find first user data (profile , contact, etc)
    const user = await User.findById(req.session.userId).exec();

    res.render('grabit-benefit', { benefits_data, user, contact: user_data, profile: user_data, username, userid: myid, myid });

}

// ------------------------------------------------- myhub feed ---------------------------------------------------------------------------
// myhub feed page
exports.myhub_feed_page = async (req, res) => {
    const userId = req.session.secondUserId ? req.session.secondUserId : req.session.userId;

    // find user data (profile , contact, etc)
    const user_data = await User.findById(userId).exec();

    const username = user_data.fname + ' ' + user_data.lname;
    const myid = userId;

    // find first user data (profile , contact, etc)
    const user = await User.findById(req.session.userId).exec();

    const users = await User.find().exec();

    // find group discussion post
    const group_post = await communities_discussion_post.find().exec();

    // find feed post
    const post = await posts.find({ user_id: req.session.userId })
        .populate({ path: 'user_id', select: ['_id', 'fname', 'lname', 'profile_pic'] }).exec();

    const my_kon = await User.findById(req.session.userId)
        .populate({ path: 'konnects.user', select: ['_id', 'fname', 'lname', 'profile_pic', 'mobile', 'address'] }).exec();

    // frient request list
    const fri_req_list = await friend_requests.find({ reciever: req.session.userId })
        .populate({ path: 'sender', select: ['_id', 'fname', 'lname', 'profile_pic'] }).exec();

    if (user.user_type === 'individual') {
        res.render("home", { notifications: fri_req_list, my_kon, user, post, group_user: user_data, contact: user_data, profile: user_data, username, myid });
    } else if (user.user_type === 'premium') {
        res.render('commercial_about', { user, profile: user_data, contact: user_data, username, myid });
    }
}