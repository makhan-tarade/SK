const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    user: [{
        id: { type: String },        
    }],
    service_no: { type: String },
    service_name: { type: String },   
    service_address: { type: String },    
    service_pincode: { type: String },
    service_pic: { type: String }, 
    service_city: { type: String },
    service_email: { type: String },  
 
});
userSchema.set('timestamps', true);
module.exports = mongoose.model('public_services', userSchema);