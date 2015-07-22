var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Users = require('../models/users');

var commentsSchema = new Schema({
	author: String,
	reply: String,
	comment: String,
	hidden: {type: Boolean, default:false},
	date: {type: Date, default: Date.now()}
});

var blogSchema = new Schema({
	title: String,
	author: String,
	content: String,
	comments: [commentsSchema],
	tags:[String],
	date: {
		createAt:{
			type:Date,
			default: Date.now()
		},
		updateAt:{
			type:Date,
			default: Date.now()
		},
		allUpdateAt:{
			type: Date,
			default: Date.now()
		}
	},
	hidden: {
		     type: Boolean,
	         default:false
	    },
	voter: [String],
	watcher:[String]
	
});




blogSchema.pre('save', function(next){
	if(this.isNew){
		this.date.createAt = this.date.updateAt = this.date.allUpdateAt = Date.now();
	} else {
		this.date.allUpdateAt = Date.now();
	}
	next();
});

blogSchema.statics = {
	fetch: function( cb ){
		return this.find({})
		           .sort({'date.allUpdateAt':-1})
		           .exec( cb );
	},
	findById: function( id, cb ){
		return this.find({_id: id})
				   .exec( cb );
	},
	findMostVote: function(limit, cb){
		var query =  this.find({});
		    query.limit(limit);
		    query.exec(cb);
		    return query;
	}
};

module.exports = blogSchema;











