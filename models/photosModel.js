const { Timestamp } = require('mongodb');
const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    user: { type: String },
    created: { type: Date },
    photos_name: [{ type: String }],
    file_type: [{ type: String }],

});

module.exports = mongoose.model('Photos', userSchema);

