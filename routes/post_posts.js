var express = require('express');
var router = express.Router();
var Blogs = require('../models/blogs');

/* GET home page. */
router.post('/post', function(req, res, next) {
	console.log(req.body.content);
	req.body.tags = req.body.tags.split(' ');
	var post = new Blogs(req.body).save(function(err){
		            if(err) return next(err);
		            res.redirect('/');
		        });
});

module.exports = router;