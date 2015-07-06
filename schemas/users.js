var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var users = new Schema({
	name: {
		first: String,
		last: String
	},
	email: {type: String, unique: true},
	password: {type: String, index: true}
});

users.virtual('name.full').get(function(){
	return this.name.first + ' ' + this.name.last;
});

module.exports = users;