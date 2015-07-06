var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/login/:email', function(req, res, next) {
  res.render('index', {loginEmail: req.params.email});
});

module.exports = router;