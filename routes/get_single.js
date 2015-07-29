var express = require('express');
var router = express.Router();
var Blogs = require('../models/blogs');


/* GET single page. */
router.get('/blogs/:blogId', function(req, res, next) {
	Blogs.findOne({_id: req.params.blogId})
		 .populate('voter')
		 .exec(function(err, blog){
		 	if(err){
			console.log(err);
			} else {
				Blogs.find({watcher:req.session.loggedIn},
					{title:1,comments:1},
					{skip:0,sort:{'date.allUpdateAt':-1}},
					function( err, articles ){
						//console.log(articles);
					if(err) {
						console.log(err);
					} else {
						Blogs.where('tags').in(blog.tags)
							 .where('_id').ne(blog._id)
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
							res.render('single', {blogs: [blog],
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
