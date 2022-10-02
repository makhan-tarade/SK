const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    user_type: {
        type: String,
        required: true,
        default: 'individual',
    },
    fname: {
        type: String,
        required: true,
    },
    lname: { type: String },
    username: { type: String },
    profile_pic: { type: String, default: '' },
    background_pic: { type: String, default: '' },
    email: {
        type: String,
        required: true,
        unique: true
    },   
    mobile: {
        type: String,
        required: true,
        unique: true
    },
    dob: { type: Date },
    gender: { type: String },
    pincode: { type: String },
    city: { type: String },
    state: { type: String },
    country: { type: String },
    check: { type: Boolean },    
    friends: [{
        user: { type: String },
        relation: { type: String },
        createdAt: { type: Date, default: Date.now()}
    }],

    konnects: [{
        user: { type: Schema.Types.ObjectId, ref: 'User' },
        relation: { type: String },
        createdAt: { type: Date, default: Date.now()}
    }],   

    // contact info
    address: { type: String },
    contact_mobile: { type: String },
    contact_email: { type: String },
    birthday: { type: String },
    official: { type: String },
    designation: { type: String },
    blood_group: { type: String },

    // health
    health: [{
        title: { type: String },
        description: { type: String },
        attachment: { type: String },
        report_date: { type: String }
    }],
    prescription: [{
        title: { type: String },
        description: { type: String },
        attachment: { type: String },
        pris_date: { type: String }
    }],

    // myprofile 
    bio: { type: String },
    language: [{
        language: { type: String },
        proficiency: { type: String },        
    }],

    // event participants
    participants: { type: String },
    

    // my account and billing
    linkedin_email: { type: String },
    company_name: { type: String },

    // myprofile 
    privacy:{type: String, default: 'public'},
    visiblity:{type: String, default: 'visible'},

    // followers

    followers:[{type: String}],

    isActive: { type: Boolean, default: true },
    

});

userSchema.set('timestamps', true);

module.exports = mongoose.model('User', userSchema);