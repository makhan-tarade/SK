const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// { communities, communities_events, communities_events_discussion, communities_photos, communities_discussion_post, communities_announcements_post }
// Create communities model
const createCommunitiesSchema = mongoose.Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },    
    comm_img: { type: String },
    group_name: { type: String },
    description: { type: String },
    community_type: { type: String },
    privacy: { type: String, default: 'public' },
    visibility: { type: String, default: 'visible' },
    charged: { type: String },
    rules: { type: String },
    start_date: { type: Date },
    end_date: { type: Date },

    // photos upload
    photos_name: [{ type: String }],
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    // created: { type: Date },

});
createCommunitiesSchema.set('timestamps', true);
const communitesModel = mongoose.model('communities', createCommunitiesSchema);


// Communities discussion post model
const communitiesDiscussionPostSchema = mongoose.Schema({
    category: { type: String, default: 'communities discussion' },
    communities_id: { type: String},
    user_id: { type: Schema.Types.ObjectId, ref: 'User' },
    post_type: { type: String },
    post_text: { type: String },
    post_image: [{ type: String }],
    post_video: [{ type: String }],

    like: [{ type: String }],
    like_color: { type: String },
    shared: [{
        userId: String,
        time: String,
    }],
    comments: [
        {
            userId: String,
            comment: String,
            time: String,
        },
    ],
    // created: { type: Date },
});
communitiesDiscussionPostSchema.set('timestamps', true);
const communitiesDiscussionPostModel = mongoose.model('communities_discussion_post', communitiesDiscussionPostSchema);

// Communities announcements post model
const communitiesAnnouncementsPostSchema = mongoose.Schema({
    category: { type: String, default: 'communities announcements' },
    communities_id: { type: String},
    user_id: { type: Schema.Types.ObjectId, ref: 'User' },
    post_type: { type: String },
    post_text: { type: String },
    post_image: [{ type: String }],
    post_video: [{ type: String }],
    like: [{ type: String }],
    shared: [{
        userId: String,
        time: String,
    }],
    comments: [
        {
            userId: String,
            comment: String,
            time: String,
        }
    ],
    // created: { type: Date },
});
communitiesAnnouncementsPostSchema.set('timestamps', true);
const communitiesAnnouncementsPostModel = mongoose.model('communities_announcements_post', communitiesAnnouncementsPostSchema);


// communities photos model
const communitiesPhotosSchema = mongoose.Schema({
    category: { type: String, default: 'communities' },    
    communities_id: { type: String},
    user: { type: Schema.Types.ObjectId, ref: 'User' },    
    photos_name: [{ type: String }],
    created: { type: Date },
});
communitiesPhotosSchema.set('timestamps', true);
const communitiesPhotosModel = mongoose.model('communities_photos', communitiesPhotosSchema);


// Communities Events create model
const communitiesEventSchema = mongoose.Schema({
    category: { type: String, default: 'communities events' },
    communities_id: { type: String},
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    event_image: { type: String },
    event_name: { type: String },
    time_zone: { type: String },
    start_date: { type: Date },
    start_time: { type: String },
    end_date: { type: Date },
    end_time: { type: String },
    description: { type: String },
    visibility: { type: String },
    event_type: { type: String },
    targeted_audience: { type: String },
    reg_or_brod_link: { type: String },
    broadcast: { type: String },
    // created: { type: Date },

});
communitiesEventSchema.set('timestamps', true);
const communitiesEventsModel = mongoose.model('communities_events', communitiesEventSchema);

// Communities events discussion post model
const CommunitiesEventsDiscussionSchema = mongoose.Schema({
    category: { type: String, default: 'events' },
    communities_id: { type: String},
    events_id: { type: Schema.Types.ObjectId, ref: 'communities_events' },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    post_type: { type: String },
    post_text: { type: String },    
    post_image: [{ type: String }],
    post_video: [{ type: String }],
    privacy: { type: String },    
    like: [{ type: String }],
    shared: [{
        userId: String,
        time: String,
    }],
    comments: [
        {
            userId: String,
            comment: String,
            time: String,
        },
    ],
    // created: { type: Date },

});
CommunitiesEventsDiscussionSchema.set('timestamps', true);
const communitiesEventsDiscussionModel = mongoose.model('communities_events_discussion_post', CommunitiesEventsDiscussionSchema);


// post model
const postSchema = new Schema({
    category: { type: String, required: true },
    communities_id: { type: String},
    events_id: { type: String},
    user_id: { type: Schema.Types.ObjectId, ref: 'User', requred: true },
    post_type: { type: String, required: true },
    post_text: { type: String },
    post_files: [{ type: String }],
    groups: [{ type: String }],
    events: [{ type: String }],
    district: { type: String },
    pincode: [{ type: String }],    

    like: [{ type: String }],
    shared: [{
        userId: String,
        time: String,
    }],
    comments: [
        {       
            userId: { type: Schema.Types.ObjectId, ref: 'User', requred: true },     
            comment: { type: String },
            createdAt: { type: Date, default: Date.now() },
        },
    ],
    // created: { type: Date },
});
postSchema.set('timestamps', true);
const postModel = mongoose.model('posts', postSchema);


// media photos model
const mediaPhotosSchema = mongoose.Schema({
    category: { type: String, required: true },    
    communities_id: { type: String },
    events_id: { type: String },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },    
    photos_name: [{ type: String }],
});
mediaPhotosSchema.set('timestamps', true);
const mediaModel = mongoose.model('medias', mediaPhotosSchema);


module.exports = {
    communities: communitesModel,
    communities_events: communitiesEventsModel,
    communities_events_discussion_post: communitiesEventsDiscussionModel,
    communities_photos: communitiesPhotosModel,
    communities_discussion_post: communitiesDiscussionPostModel,
    communities_announcements_post: communitiesAnnouncementsPostModel,
    posts: postModel,
    medias: mediaModel,
};
