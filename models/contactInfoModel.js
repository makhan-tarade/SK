const mongoose = require('mongoose');

const createContactInfoSchema = mongoose.Schema({

    address: { type: String },
    mobile: { type: String },
    email: { type: String },
    birthday: { type: String },
});

module.exports = mongoose.model('ContactInfo', createContactInfoSchema);
