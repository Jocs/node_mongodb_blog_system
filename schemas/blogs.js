var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var blogSchema = new Schema({
	title: String,
	author: String,
	body: String,
	comments: [comments],
	date: {
		createAt:{
			type:date,
			default: Date.now()
		},
		updateAt:{
			type:date,
			default: Date.now()
		}
	},
	hidden: Boolean,
	meta: {
		vote: {
			type: Number,
			default: 0
		}
	}
});

var comments = new Schema({
	author: String,
	comment: String,
	date: {type: Date, default: Date.now()}
});


blogSchema.pre('save', function(next){
	if(this.isNew){
		this.date.createAt = this.date.updateAt = Date.now();
	} else {
		this.date.updateAt = Date.now();
	}
	next();
});

blogSchema.statics = {
	fetch: function( cb ){
		return this.find({})
		           .sort('date.updateAt')
		           .exec( cb );
	},
	findById: function( id, cb ){
		return this.find({_id: id})
				   .exec( cb );
	}
};

module.exports = blogSchema;











