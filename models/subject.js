var mongoose = require("mongoose");

var subjectSchema = new mongoose.Schema({
	subjectName : {type: String, unique: true},
	subjectCode : {type: String, unique: true},
	semester    : Number
});

module.exports = mongoose.model("Subject", subjectSchema);