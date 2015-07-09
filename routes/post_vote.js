var express = require('express');
var router = express.Router();
var Blogs = require('../models/blogs');
var Users = require('../models/users');

/* GET home page. */
router.post('/vote/:blogId', function(req, res, next) {
	console.log(req.body);
	Blogs.findById(req.params.blogId, function(err, blog){
		if(err){
			console.log(err);
		} else {
			var isNew = true;
			blog[0].voter.forEach(function(e){
				if(e == req.body.userName) isNew = false;
			});
			if(isNew&&req.body.isVote==='true'){
				blog[0].voter.unshift(req.body.userName);
			    blog[0].save(function(err){
				if(err) console.log(err);
			    });
			} else if(!isNew){
				for(var i = 0; i < blog[0].voter.length; i ++){
					if(blog[0].voter[i] == req.body.userName){
						blog[0].voter.splice(i,1);
					}
				}
			    blog[0].save(function(err){
			    	if(err) console.log(err);
			    });
			}
			if(blog[0].voter.length == 0){
				res.send({length: blog[0].voter.length,nameArray:[]});
			} else if(blog[0].voter.length == 1){
				res.send({length: blog[0].voter.length,nameArray:[blog[0].voter[0]]});
			} else if(blog[0].voter.length == 2){
				res.send({length: blog[0].voter.length,nameArray:[blog[0].voter[0],blog[0].voter[1]]});
			} else {
				res.send({length: blog[0].voter.length,nameArray:[blog[0].voter[0],blog[0].voter[1],blog[0].voter[2]]});
			}			
		}
	});

});

module.exports = router;