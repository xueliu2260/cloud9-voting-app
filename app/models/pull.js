var mongoose = require('mongoose');

var pullSchema = mongoose.Schema({
	name : String,
	createdBy: String,
	optionListAndResult : [{opt:String,count:Number}]
});

module.exports = mongoose.model('pullList',pullSchema);