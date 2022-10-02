const { Timestamp } = require('mongodb');
const mongoose = require('mongoose');

const createEventSchema = mongoose.Schema({
    user: { type: String },
    event_image: { type: String },
    event_name: { type: String },
    time_zone: { type: String },
    start_date: { type: Date },
    start_time: { type: String },
    end_date: { type: Date },
    end_time: { type: String },
    description: { type: String },
    visibility: { type: String },
    event_type: { type: String },
    targeted_audience: { type: String },
    reg_or_brod_link: { type: String },
    broadcast: { type: String },
    created: { type: Date },

});
createEventSchema.set('timestamps', true);

module.exports = mongoose.model('commercialEvents', createEventSchema);