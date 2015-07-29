var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//统计站点信息的collection。如CV下载次数等。
var cvinfoSchema = new Schema({
	downloaderid: String,
	downloader: String,
	email: String,
	times:Number,
	date: {
		createAt:{
			type: Date, default: Date.now()
		},
	    updateAt:{
	    	type:Date, default: Date.now()
	    }
	}
});
cvinfoSchema.pre('save', function(next){
	if(this.isNew){
		this.date.createAt = this.date.updateAt = Date.now();
		this.times = 1;
	} else {
		this.date.updateAt = Date.now();
		this.times ++;
	}
	next();
});

module.exports = cvinfoSchema;











