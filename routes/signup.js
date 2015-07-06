var express = require('express');
var router = express.Router();
var Users = require('../models/users');

/* Post signup的数据 */
router.post('/signup', function(req, res, next) {
  var user = new Users(req.body).save(function(err, user){
  	if(err) {
  		console.log(err);
  	} else {
  		res.redirect('/login/' + req.body.email );
  	}
  });
});

module.exports = router;