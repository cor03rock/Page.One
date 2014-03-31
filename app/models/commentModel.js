var mongoose = require('mongoose');


var commentSchema = mongoose.Schema({

	username: String,
	content : String,
	dateCreated: Date,

});
module.exports = mongoose.model('Comment', commentSchema);