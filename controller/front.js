/**
 * Created by hujianmeng on 14-5-4.
 */

var path = require('path');

/**
 * 前端模板文件管理
 * @param req
 * @param res
 * @param next
 */
exports.templates = function (req, res, next) {
    var templateDir = path.join(__dirname, 'views');

    res.render('front/templates');
};

/**
 * 前端模块管理
 * @param req
 * @param res
 * @param next
 */
exports.modules = function (req, res, next) {
    var templateDir = path.join(__dirname, 'views');

    res.render('front/modules');
};