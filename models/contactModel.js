const mongoose = require('mongoose');

const contactSchema = mongoose.Schema({
    name: { type: String },
    mobile: { type: String },
    remark: { type: String },   
    email: { type: String },
    created: { type: String },  

});

module.exports = mongoose.model('contact', contactSchema);