var express = require('express');
var router = express.Router();

/* GET logout page. */
router.get('/logout', function(req, res ){
	console.log('ssss');
	req.session.loggedIn = null;
	req.session.name = null;
	res.redirect('/');
});

module.exports = router;