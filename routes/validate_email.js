var express = require('express');
var router = express.Router();
var Users = require('../models/users');

/* POST content modify page. */
router.post('/validate_email', function(req, res, next) {
	console.log(req.body);
	Users.find(req.body, function(err, msg){
		console.log(msg);
		if(err){
			console.log(err);
		} else {
			var data = {
				pass: msg.length == 0? true: false
			};
			res.send(data);
		}
	});

});

module.exports = router;