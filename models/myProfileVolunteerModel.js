const mongoose = require('mongoose');

const userSchema = mongoose.Schema({    

    // Add Volunteers Experience
    user: { type: String },
    organization: { type: String },
    role: { type: String },
    cause: { type: String },
    check: { type: String },
    start_date: { type: Date },
    end_date: { type: Date },
    start_time: { type: String },
    end_time: { type: String },
    description: { type: String },
    created: { type: Date },
   
});

module.exports = mongoose.model('volunteer', userSchema);