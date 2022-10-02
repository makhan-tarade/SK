const mongoose = require('mongoose');

const healthReportSchema = mongoose.Schema({    

        // health
        user: { type: String },
        title: { type: String },
        description: { type: String },
        attachment: { type: String },
        report_date: { type: String },
		user_id: { type: String },
        created: { type: String },

});

const reportModel = mongoose.model('report', healthReportSchema);

const healthPriscriptionSchema = mongoose.Schema({
   
    // priscription
        user: { type: String },
        title: { type: String },
        description: { type: String },
        attachment: { type: String },
	user_id: { type: String },
        pris_date: { type: String },
        created: { type: String },
});

const priscriptionModel = mongoose.model('priscription', healthPriscriptionSchema);

module.exports = {
    report: reportModel,
    priscription: priscriptionModel
}