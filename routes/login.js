var express = require('express');
var router = express.Router();
var User = require('../models/users');

router.post('/login', function(req, res, next ){
	User.findOne({email: req.body.email, password: req.body.password}, 
			function(err, doc){
				if(err) return next(err);
				if(!doc) return res.send('<p>User not found, Go back and try again!</p>');
				req.session.loggedIn = doc._id.toString();
				req.session.name = doc.name.full;
				req.session.email = doc.email;
				//console.log(req.session.loggedIn);
				//console.log(req.session.name);
				res.redirect('/');
			});
});
module.exports = router;