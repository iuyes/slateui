/**
 * Created by hujianmeng on 14-5-4.
 */

exports.add = function (req, res, next) {
    if (req.method == 'GET') {
        res.render('edit-' + req.url.match(/^\/([\w]+)\//)[1]);
    }
};

/**
 * 获取内容
 * @param req
 * @param res
 * @param next
 */
exports.getArticle = function (req, res, next) {
    var article = {
        "catid": "79",
        "title": "\u540e\u73b0\u4ee3\u95ee\u9898",
        "thumb": "uploadfile\/2013\/1009\/20131009053011250.png",
        "keywords": "",
        "posids": "2",
        "listorder": "0",
        "status": "1",
        "sysadd": "0",
        "islink": "0",
        "username": "liuye",
        "inputtime": "1380187620",
        "updatetime": "1381311043",
        "setcftime": "1381311043",
        "iscontenttype": "1",
        "magazineid": "263",
        "publishstatus": "99",
        "tags": "\u5173\u952e\u8bcd",
        "author": "feeloc",
        "subtitle": "\u540e\u73b0\u4ee3\u95ee\u9898",
        "devices": "1,6",
        "askitem": "2",
        "isendtext": "2",
        "createuser": "liuye",
        "level": "0",
        "isstarttext": "2",
        "pagenum": "1",
        "iphonepagenum": "0",
        "atype": "4",
        "scrollHidden": "0",
        "vurl": "",
        "pageurl": "",
        "author_ename": "feeloc_ename",
        "author_title": "feeloc_title",
        "videostime": "",
        "recatid": "",
        "reaid": "",
        "retips": "",
        "isoffline": "0",
        "appid": "1",
        "readpoint": "0",
        "groupids_view": "",
        "paginationtype": "0",
        "maxcharperpage": "0",
        "template": "",
        "paytype": "0",
        "relation": "",
        "copyfrom": "",
        "allow_comment": "1",
        "subcontent": "提纲",
        "content": "内容",
        "vpictureurls": [],
        "backgroundpic": "",
        "msgtpl": "array (\n 'msgtplipadh' => 'ipadH-shortnews-02',\n 'msgtplipadv' => 'ipadV-shortnews',\n 'msgtpliphone' => 'iphone-shortnews',\n)",
        "long_desc": "长摘要",
        "def_type_setting": "",
        "articleid": "24363",
        "desc": "\u5341\u5e74\u540e\u793e\u4f1a\u666e\u904d\u7684\u5065\u5eb7\u95ee\u9898\uff0c\u51cf\u5bff\uff0c\u90fd\u4e0e\u73b0\u5728\u4eba\u4eec\u7684\u751f\u6d3b\u65b9\u5f0f\u6709\u5173\u3002",
        "key": "ev4bo1",
        "issueid": "263",
        "position": 2,
        "offset": "0:10000:1380187620",
        "url": "http:\/\/develop.bbwc.cn\/dev\/v5\/app1\/issue_263\/articles\/24363\/show-1-2-263-79-24363-1_1381311043.html",
        "weburl": "http:\/\/read.bbwc.cn\/content-1-263-79-24363.html"
    };

    res.json(article);
};