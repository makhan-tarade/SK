const { Timestamp } = require('mongodb');
const mongoose = require('mongoose');

// Appreciations
const appreciationSchema = mongoose.Schema({
    user: { type: String },    
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
appreciationSchema.set('timestamps', true);
const appreciationsModel = mongoose.model('appreciations', appreciationSchema);

// Benifits
const benefitSchema = mongoose.Schema({
    user: { type: String },    
    title: { type: String },
    category: { type: String },
    description: { type: String },
    image: { type: String },
    link: { type: String },    
    created: { type: Date },
});
benefitSchema.set('timestamps', true);
const benefitsModel = mongoose.model('benefits', benefitSchema);


module.exports = {
    appreciations: appreciationsModel,
    benefits: benefitsModel,
};