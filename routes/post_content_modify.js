var express = require('express');
var router = express.Router();
var Blogs = require('../models/blogs');

/* POST content modify page. */
router.post('/content_modify/:blogId', function(req, res, next) {
	console.log(req.body);
	var date = {content: req.body.content, date:{updateAt: Date.now()}};
	Blogs.update({_id: req.params.blogId},date, function(err, msg){
		console.log(msg);
		if(err){
			console.log(err);
		} else {
			res.send(req.body);
		}
	});

});

module.exports = router;