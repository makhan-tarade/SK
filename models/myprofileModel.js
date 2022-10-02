const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// volunteer
const myProfileVolunteer = mongoose.Schema({    

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
   
});
myProfileVolunteer.set('timestamps', true);
const volunteerModel = mongoose.model('volunteer', myProfileVolunteer);


// experience
const myProfileExperience = mongoose.Schema({   
    
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
    last_update: { type: Date },
    // add media (pending)  
});
myProfileExperience.set('timestamps', true);
const experienceModel = mongoose.model('experience', myProfileExperience);

// education
const myProfileEducation = mongoose.Schema({   
    
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
    last_update: { type: Date },
    // add media (pending)   
  
});
myProfileEducation.set('timestamps', true);
const educationModel = mongoose.model('education', myProfileEducation);

// skills
const myProfileSkillsSchema = mongoose.Schema({
    
    // Add Skills
    user: { type: String },
    skills: [{ type: String }],
});
myProfileSkillsSchema.set('timestamps', true);
const skillsModel = mongoose.model('skills', myProfileSkillsSchema);

// language model
const myProfileLangugeSchema = mongoose.Schema({
    
    user: { type: String },
    language: { type: String },
    proficiency: { type: String },
    
});
myProfileLangugeSchema.set('timestamps', true);
const languageModel = mongoose.model('languages', myProfileLangugeSchema);


// add friends notification model
const addFriendSchema = mongoose.Schema({

    sender: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    reciever: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    request: { type: Boolean, default: true },
    response: { type: Boolean, default: false },
    action: { type: String , default: 'pending'},
    channel: { type: String },
    message: { type: String },
    
});
addFriendSchema.set('timestamps', true);
const addFriendsModel = mongoose.model('friend_requests', addFriendSchema);

module.exports = {
    volunteer: volunteerModel,
    experience: experienceModel,
    education: educationModel,
    skills: skillsModel,
    languages: languageModel,
    friend_requests: addFriendsModel,
}