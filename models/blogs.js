var mongoose = require('mongoose');
var blogSchema = require('../schemas/blogs');
var Blogs = mongoose.model('blog', blogSchema);

module.exports = Blogs;