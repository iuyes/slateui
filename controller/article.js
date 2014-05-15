/**
 * Created by hujianmeng on 14-5-4.
 */

var Article = require('../proxy').Article;

/**
 * 显示添加文章页
 * @param req
 * @param res
 * @param next
 */
exports.add = function (req, res, next) {

    res.render('edit-' + req.url.match(/^\/([\w]+)\//)[1]);

};

/**
 *
 * @param req
 * @param res
 * @param next
 */
exports.addArticle = function (req, res, next) {

    var article = req.body.data;
    Article.add(JSON.parse(article), function (err, d) {
        if (!err) {
            res.json({status: 'success'});
        }
    });

};

/**
 * 获取内容
 * @param req
 * @param res
 * @param next
 */
exports.getArticle = function (req, res, next) {

    Article.get({_id: '537384992ea486c28f000001'}, function (err, articles) {
        if (err) {
            return next;
        } else {
            var article = {};
            article[req.param('id')] = {
                "id": req.param('id'),
                "data": articles[0],
                "inputtime": "1382671469",
                "updatetime": "2014-05-12 17:11:06",
                "publishstatus": "99",
                "appid": "12",
                "delete": "0"
            };
            res.json(article);
        }
    });

};

/**
 * 编辑文章
 * @param req
 * @param res
 * @param next
 */
exports.editArticle = function (req, res, next) {

    var id = req.param('id'),
        article = req.body.data;

    Article.updateById(id, JSON.parse(article), null, function (a, b) {
        console.log(a);
        console.log(b);
    });
};