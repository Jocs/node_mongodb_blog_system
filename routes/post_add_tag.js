var express = require('express');
var router = express.Router();
var Blogs = require('../models/blogs');

/* POST title modify page. */
router.post('/tag_add/:blogId', function(req, res, next) {
	console.log(req.body);
	Blogs.findById(req.params.blogId, function(err, blogs){
		var tags = blogs[0].tags;
		var isPush = true;
		if(err){
			console.log(err);
		} else {
			for(var i = 0; i < tags.length; i ++){
				if(tags[i]==req.body.tag) isPush = false;
			}
			if(isPush) {
				tags.push(req.body.tag);
			    blogs[0].save(function(err){
				    if(err) console.log(err);
				    res.send(req.body);
			    });
			} else {
				res.send({add: '标签已存在'});
			}
		}
	});

});

module.exports = router;