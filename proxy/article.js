var models = require('../models');
var Article = models.Article;

/**
 * 添加文章
 * @param args
 * @param callback
 */
exports.add = function (args, callback) {
    var article = new Article();

    for (var arg in args) {
        article[arg] = args[arg];
    }

    article.save(callback);
};

/**
 *
 * 获取文章
 *
 */
exports.get = function (condition, callback) {
    Article.find(condition, callback);
};

/**
 *
 * 根据ID更新文章
 * @param id
 * @param update
 * @param options
 *
 */
exports.updateById = function (id, update, options, callback) {
    Article.findByIdAndUpdate(id, update, options, callback);
};