/**
 * Created by hujianmeng on 14-5-4.
 */

exports.add = function (req, res, next) {
    if (req.method == 'GET') {
        res.render('edit-' + req.url.match(/^\/([\w]+)\//)[1]);
    }
};