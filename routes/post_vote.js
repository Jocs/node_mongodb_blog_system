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
				if(e == req.body.userId) isNew = false;
			});
			if(isNew&&req.body.isVote==='true'){
				blog[0].voter.unshift(req.body.userId);
			    blog[0].save(function(err){
				if(err) console.log(err);
			    });
			} else if(!isNew){
				for(var i = 0; i < blog[0].voter.length; i ++){
					if(blog[0].voter[i] == req.body.userId || blog[0].voter[i] == ''){
						blog[0].voter.splice(i,1);
					}
				}
			    blog[0].save(function(err){
			    	if(err) console.log(err);
			    });
			}
			var nameArray = [],len = Math.min(3,blog[0].voter.length);
			if(len != 0){
				for(var i = 0; i < len; i ++){
					Users.findById(blog[0].voter[i],function(err, doc){
						console.log(doc);
						nameArray.push(doc.name.full);
						if(nameArray.length == len){
							res.send({length: blog[0].voter.length,nameArray: nameArray});		
						}	
					});
				} 
			} else {
					res.send({length:0,nameArray:[]});
				} 
			
			
		}
	});

});

module.exports = router;