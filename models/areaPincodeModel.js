const { Timestamp } = require('mongodb');
const mongoose = require('mongoose');

// { district, area_pincode }
// district model
const districtSchema = mongoose.Schema({   
    district: { type: String },    
});

const districtModel = mongoose.model('district', districtSchema);

// area pincode model
const areaPincodeSchema = mongoose.Schema({
   
    district: { type: String },
    pincode: { type: String },
    area: { type: String },
    pin: { type: String },
    latitude: { type: String },
    longitude: { type: String },

});

const areaPincodemodel = mongoose.model('area_pincode', areaPincodeSchema);

module.exports = {
    district: districtModel,
    area_pincode: areaPincodemodel
}
