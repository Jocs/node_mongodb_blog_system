var express = require('express');
var router = express.Router();
var Blogs = require('../models/blogs');

/* GET home page. */
router.get('/', function(req, res, next) {
	Blogs.fetch(function(err, blogs){
		if(err){
			console.log(err);
		} else {
			res.render('index', {blogs: blogs});
		}
	});
});

module.exports = router;
