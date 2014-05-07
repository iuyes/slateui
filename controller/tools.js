/**
 * Created by hujianmeng on 14-5-4.
 */

exports.directory = function (req, res, next) {
    if (req.method == 'GET') {
        res.render('app-list');
    } else {
        var username = req.body.username,
            password = req.body.password;

        res.json({method: 'login', status: 1});
    }
};