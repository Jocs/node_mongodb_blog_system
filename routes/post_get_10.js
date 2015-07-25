var express = require('express');
var router = express.Router();

/* POST get 10 blogs page. */
router.post('/get_10', function(req, res, next) {
	console.log(req.body);
	res.render('get_10',{
		blogs:req.session.blogs.slice(req.body.blogNum, req.body.blogNum + 10)
	});
	/*res.send({
		html: html,
		num: req.session.blogs.slice(req.body.blogNum, req.body.blogNum + 10).length
	});*/
});

module.exports = router;