var mongoose = require('mongoose');
var userSchema = require('../schemas/users');
var Users = mongoose.model('user', userSchema);

module.exports = Users;