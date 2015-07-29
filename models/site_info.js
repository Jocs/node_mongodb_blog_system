var mongoose = require('mongoose');
var siteInfoSchema = require('../schemas/siteInfo');
var Siteinfo = mongoose.model('siteinfo', siteInfoSchema);

module.exports = Siteinfo;