var mongoose = require('mongoose');
var mongoUri = require('../config').getMongoUri();

mongoose.connect(mongoUri, function (err) {
    if (err) {
        console.log(err);
        console.error('connect to %s error: ', mongoUri, err.message);
        process.exit(1);
    }
});

// models
require('./article');

exports.Article = mongoose.model('Article');