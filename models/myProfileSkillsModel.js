const mongoose = require('mongoose');

const userSchema = mongoose.Schema({  
    
    // Add Skills
    user: { type: String },
    skills: [{ type: String }],   
    created: { type: Date },
});

module.exports = mongoose.model('skills', userSchema);