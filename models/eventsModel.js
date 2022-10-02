const { Timestamp } = require('mongodb');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// { events, events_discussion }

// Individual events create model
const createEventSchema = mongoose.Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    participants: [{ type: String }],
    event_image: { type: String },
	community_id: { type: String },
    event_name: { type: String },
    time_zone: { type: String },
    start_date: { type: Date },
	event_log: { type: String },
    start_time: { type: String },
    end_date: { type: Date },
    end_time: { type: String },
    description: { type: String },
	location: { type: String },
    visibility: { type: String },
    district: { type: String },
    pincode: [{ type: String }],
    event_type: { type: String },
    targeted_audience: { type: String },
    reg_or_brod_link: { type: String },
    broadcast: { type: String },
    created: { type: Date },   

});
createEventSchema.set('timestamps', true);
const eventsModel = mongoose.model('events', createEventSchema);

// Indivisual events discussion post model
const eventDiscussionSchema = mongoose.Schema({
    user_id: { type: Schema.Types.ObjectId, ref: 'User' },
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
    created: { type: Date },   

});
eventDiscussionSchema.set('timestamps', true);
const eventsDiscussionModel = mongoose.model('events_discussion', eventDiscussionSchema);

module.exports = {
    events: eventsModel,
    events_discussion: eventsDiscussionModel,
};





