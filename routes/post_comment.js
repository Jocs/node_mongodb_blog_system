var express = require('express');
var router = express.Router();
var Blogs = require('../models/blogs');

/* GET home page. */
router.post('/comment/:blogId', function(req, res, next) {
	console.log(req.body);
	Blogs.findById(req.params.blogId, function(err, blog){
		console.log(blog);
		if(err){
			console.log(err);
		} else {
			blog[0].comments.addToSet(req.body);
			blog[0].save(function(err){
				if(err) {
					console.log(err);
				} else {
					res.send({comments:blog[0].comments,name:req.session.name});
				}
			});
		}
	});

});

module.exports = router;