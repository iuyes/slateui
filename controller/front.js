/**
 * Created by hujianmeng on 14-5-4.
 */

var path = require('path');
var fs = require('fs');
var escape = require('escape-html');
var hljs = require('highlight.js');

/**
 * 前端模板文件管理
 * @param req
 * @param res
 * @param next
 */
exports.templates = function (req, res, next) {
    var rootPath = path.dirname(process.mainModule.filename),
        files = fs.readdirSync(path.join(rootPath, '/views')),
        templates = [];

    files.forEach(function (file) {
        var fileStat = fs.lstatSync(path.join(rootPath, '/views', file));
        if (!fileStat.isDirectory()) {
            templates.push(file)
        }
    });

    res.render('front/templates', {templates: templates});
};

/**
 * 获取模板的详细内容
 * @param req
 * @param res
 * @param next
 */
exports.getTemplate = function (req, res, next) {
    var templateName = req.params['name'],
        rootPath = path.dirname(process.mainModule.filename),
        filePath = path.join(rootPath, '/views', new Buffer(templateName, 'base64').toString('utf-8'));

    fs.readFile(filePath, function (err, data) {
        if (err) throw err;
        res.json({status: 1, data: hljs.highlightAuto(data.toString()).value});
    });
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