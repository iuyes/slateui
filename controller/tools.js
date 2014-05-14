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

exports.upload = function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Allow-Origin', '*');

    var images = [],
        files = [];
    if (req.files.image instanceof Array) {
        Array.prototype.push.apply(files, req.files.image);
    } else {
        files.push(req.files.image);
    }

    for (var i = 0; i < files.length; i++) {
        images.push({
            "url": files[i].path.replace('src', ''),
            "preview": "http://127.0.0.1:3000/" + files[i].path.replace('src', ''),
            "alt": files[i].originalFilename
        });
    }

    res.json({
        status: 'success',
        images: images
    });

};