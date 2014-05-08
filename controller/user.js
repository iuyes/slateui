/**
 * Created by hujianmeng on 14-5-4.
 */

exports.login = function (req, res, next) {
    if (req.method == 'GET') {
        res.render('login');
    } else {
        var username = req.body.username,
            password = req.body.password;

        res.json({method: 'login', status: 1});
    }
};

exports.logout = function (req, res, next) {
    res.redirect('/login');
};