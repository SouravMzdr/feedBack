var mongoose = require("mongoose");

var teacherSchema = new mongoose.Schema({
	name: {type: String, unique: true},
	image: String,
	subjects:[
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Subject"
		}	

	],
	branch: String

});

module.exports = mongoose.model("Teacher", teacherSchema);