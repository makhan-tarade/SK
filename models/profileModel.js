const { Timestamp } = require('mongodb');
const mongoose = require('mongoose');

const profileSchema = mongoose.Schema({
    profile_pic: { type: String },
    created: { type: Date },

});

module.exports = mongoose.model('Profile', profileSchema);

