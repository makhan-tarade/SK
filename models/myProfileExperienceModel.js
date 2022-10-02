const mongoose = require('mongoose');

const userSchema = mongoose.Schema({  
   
    
    // Add Experience
    user: { type: String },
    title: { type: String },
    expertise: { type: String },
    company_name: { type: String },
    location: { type: String },
    check: { type: String },
    start_month: { type: String },
    end_month: { type: String },
    start_year: { type: String },
    end_year: { type: String },
    check2: { type: String },
    headline: { type: String },
    industry: { type: String },
    description: { type: String },
    created: { type: Date },
    // add media (pending)

  
});

module.exports = mongoose.model('experience', userSchema);