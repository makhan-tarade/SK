const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    user: [{
        id: { type: String },        
    }],
    name: { type: String },
    profile_pic: { type: String },   
    degination: { type: String },    
    email: { type: String },
    mobile: { type: String },
    description: { type: String }, 
    created: { type: Date },  
});

module.exports = mongoose.model('Doctor', userSchema);