const mongoose = require('mongoose');

const userSchema = mongoose.Schema({  
   
    
    // Add Experience
    user: { type: String },
    school: { type: String },
    degree: { type: String },
    field_of_study: { type: String }, 
    start_month: { type: String },
    end_month: { type: String },
    start_year: { type: String },
    end_year: { type: String },
    field_of_expertise: { type: String },
    activities_and_societies: { type: String },  
    description: { type: String },
    created: { type: Date },
    // add media (pending)   
  
});

module.exports = mongoose.model('education', userSchema);