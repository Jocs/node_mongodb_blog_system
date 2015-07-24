var express = require('express');
var router = express.Router();
var Blogs = require('../models/blogs');


/* GET single page. */
router.get('/blogs/:blogId', function(req, res, next) {
	Blogs.findById(req.params.blogId,function(err, blogs){
		if(err){
			console.log(err);
		} else {
			Blogs.find({watcher:req.session.name},
				{title:1,comments:1},
				{skip:0,sort:{'date.allUpdateAt':-1}},
				function( err, articles ){
					//console.log(articles);
				if(err) {
					console.log(err);
				} else {
					Blogs.where('tags').in(blogs[0].tags)
						 .where('_id').ne(blogs[0]._id)
					     .skip(0)
					     .limit(5)
					     .select('title voter')
					     .sort('-date.allUpdateAt')
					     .exec(function(err,docs){
						//console.log(docs);
						if(err) console.log(err);
						var art = articles.slice(0,5);
						var array = [];
						articles.forEach(function(ele){
							array.push(ele._id);
						});
						var ids = array.join(',');
						
						//console.log(ids);
						res.render('single', {blogs: blogs,
						                      articles: art,
						                      docs: docs,
						                      ids:ids});
					});	
				}
			});	
		}
	});
});

module.exports = router;
