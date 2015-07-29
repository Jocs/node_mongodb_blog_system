var express = require('express');
var router = express.Router();
var Blogs = require('../models/blogs');
var contains = require('../methods/array_contains');

/* POST watch modify page. */
router.post('/watch/:blogId', function(req, res, next) {
	console.log(req.body);
	Blogs.findById(req.params.blogId, function(err, blogs){
		if(err) console.log(err);
		var watchers = blogs[0].watcher;
		var isContain = contains(watchers, req.body.watcher);
		var condition = {_id: req.params.blogId};

		if( isContain ){
			var update = {'$pull':{'watcher': req.body.watcher}};
			Blogs.update(condition, update,function(err){
				if(err) console.log(err);
				res.send({watch: false});
			});
		} else {
			var update = {'$push':{'watcher': req.body.watcher}};
			Blogs.update(condition, update, function(err){
				if(err) console.log(err);
				res.send({watch: true});
			});		
		}
	});

});

module.exports = router;