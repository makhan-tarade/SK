const { Timestamp } = require('mongodb');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
        
    category: { type: String, default: 'feed' },
    user_id: { type: Schema.Types.ObjectId, ref: 'User' },
    profile_name: { type: String },
    profile_pic: { type: String },
    post_type: { type: String , required: true},
    post_text: { type: String },
    post_image: [{ type: String }],
    post_video: [{ type: String }],
    privacy: { type: String },
    group: { type: String },
    event: { type: String },
    district: { type: String },
    pincode: [{ type: String }],
    like: [{ type: String }],
    like_color: { type: String },
    shared: [{
        userId: String,
        time: String,
    }],
    comments: [
        {
            userId: String,
            name: String,
            profile_pic: String,
            pic: String,
            comment: String,
            createdAt: {
                type: Date,
                default: Date.now()
            }
        },
    ]

});
userSchema.set('timestamps', true);


module.exports = mongoose.model('Feed', userSchema);