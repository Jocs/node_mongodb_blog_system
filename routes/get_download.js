var express = require('express');
var router = express.Router();
var Siteinfo = require('../models/site_info');

/* GET download page. */
router.get('/download/:fileName', function(req, res ){
	//console.log('ssss');
	var data = {
		downloaderid: req.session.loggedIn,
		downloader: req.session.name,
		email: req.session.email
	};
	Siteinfo.find(data, function(err, doc){
		if(err) console.log(err);
		if(doc.length == 0){
			var siteinfo = new Siteinfo(data).save(function(err){
				if(err) console.log(err);
			});
		} else {
			doc[0].save(function(err){
				if(err) console.log(err);
			});
		}
	});
	var fileName = req.params.fileName;
	console.log(fileName);
	var file = __dirname.slice(0,__dirname.indexOf('routes')) + 'public/files/' + fileName;
	res.download(file);
});

module.exports = router;