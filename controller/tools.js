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

//    res.json({aid: 49, status: "success", filepath: "/home/jinxin/uploadfile/cms/2014/0509/536c74a69afa7.jpeg", path: "2014/0509/536c74a69afa7.jpeg", preview: "http://develop.jinxin.bbwc.cn/uploadfile/cms/2014/0509/536c74a69afa7.jpeg"});
    res.json({aid: 50, status: "success", filepath: "/home/jinxin/uploadfile/cms/2014/0509/536c7557a577d.jpg", path: "2014/0509/536c7557a577d.jpg", preview: "http://develop.jinxin.bbwc.cn/uploadfile/cms/2014/0509/536c7557a577d.jpg"});
};