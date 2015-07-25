var express = require('express');
var router = express.Router();
var Blogs = require('../models/blogs');

//把返回的文章按点赞数量进行排序的方法
function compare( array ){
			for(var i = 0; i < array.length; i ++){
				for(var j = 0; j < array.length - i -1; j ++){
					if(array[j].voter.length < array[j + 1].voter.length){
						var swap = array[j];
						array[j] = array[j+1];
						array[j+1] = swap;
					}
				}
			}
		}

/* GET home page. */
router.get('/', function(req, res, next) {
	Blogs.fetch(function(err, blogs){
		if(err){
			console.log(err);
		} else {
			req.session.blogs = blogs;
			Blogs.find({watcher:req.session.name},
				{title:1,comments:1},
				{skip:0,sort:{'date.allUpdateAt':-1}},
				function( err, articles ){
					//console.log(articles);
				if(err) {
					console.log(err);
				} else {
					Blogs.find({},
						function(err,docs){
						if(err) console.log(err);
						compare(docs);
						var docs5 = docs.slice(0,5);
						var art = articles.slice(0,5);
						var blogs10 = blogs.slice(0,10);
						var array = [];
						articles.forEach(function(ele){
							array.push(ele._id);
						});
						var ids = array.join(',');
						//console.log(ids);
						res.render('index', {blogs: blogs10,
						                      articles: art,
						                      docs: docs5,
						                      ids:ids});
					});	
				}
			});	
		}
	});
});

module.exports = router;
