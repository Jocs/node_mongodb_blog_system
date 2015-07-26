var express = require('express');
var router = express.Router();

/* GET logout page. */
router.get('/span_to_svg', function(req, res ){
	//console.log('ssss');
	res.render('arrow_svg');
});

module.exports = router;