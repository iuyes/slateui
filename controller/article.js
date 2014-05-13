/**
 * Created by hujianmeng on 14-5-4.
 */

exports.add = function (req, res, next) {
    if (req.method == 'GET') {
        res.render('edit-' + req.url.match(/^\/([\w]+)\//)[1]);
    }
};

exports.addContent = function (req, res, next) {
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

    var article = {};
    article[req.param('id')] = {
        "id": req.param('id'),
            "data": {
            "catid": "96",
                "title": "\u975e\u8425\u5229\u827a\u672f\u673a\u6784\u7684\u81ea\u767d",
                "thumb": "",
                "keywords": "",
                "posids": "2",
                "listorder": "0",
                "status": "1",
                "sysadd": "0",
                "islink": "0",
                "username": "hulanjie",
                "inputtime": "1382671469",
                "updatetime": "1382672498",
                "setcftime": "1382672498",
                "iscontenttype": "1",
                "publishstatus": "99",
                "tags": "",
                "author": "",
                "subtitle": "\u975e\u8425\u5229\u827a\u672f\u673a\u6784\u7684\u81ea\u767d",
                "devices": "1,2,3,6",
                "askitem": "0",
                "isendtext": "0",
                "createuser": "hulanjie",
                "level": "0",
                "isstarttext": "0",
                "pagenum": "1",
                "iphonepagenum": "0",
                "atype": "1",
                "scrollHidden": "0",
                "vurl": "",
                "pageurl": "",
                "author_ename": "",
                "author_title": "",
                "videostime": "",
                "recatid": "",
                "reaid": "",
                "retips": "",
                "isoffline": "0",
                "appid": "12",
                "content": "\u5317\u4eac\u3002\u5bf9\u4e8e\u6240\u6709\u4ecd\u5728\u575a\u6301\uff0c\u6216\u5df2\u7ecf\u843d\u5e55\u7684\u4e2d\u56fd\u975e\u8425\u5229\u827a\u672f\u673a\u6784\u800c\u8a00\uff0c9\u6708\u7684\u6cf0\u5eb7\u7a7a\u95f410\u5468\u5e74\u56de\u987e\u5c55\u201c\u4ece\u590d\u5174\u95e8\u5230\u8349\u573a\u5730\uff1a\u6cf0\u5eb7\u7a7a\u95f42003-\u201d\u90fd\u5177\u6709\u7740\u7279\u522b\u610f\u4e49\u3002\u8fd910\u5e74\u662f\u4e2d\u56fd\u5f53\u4ee3\u827a\u672f\u5728\u56fd\u9645\u5e02\u573a\u7684\u4f5c\u7528\u529b\u4e0b\u6500\u4e0a\u9ad8\u5cf0\u3001\u8dcc\u5165\u4f4e\u6f6e\u53c8\u518d\u6b21\u542f\u822a\u7684\u52a8\u8361\u671f\u3002\u8fd1\u5e74\u6765\uff0c\u5e74\u8f7b\u4e00\u4ee3\u7684\u827a\u672f\u884c\u4e1a\u5de5\u4f5c\u8005\u53c8\u5f00\u59cb\u91cd\u89c6\u975e\u8425\u5229\u827a\u672f\u673a\u6784\u63d0\u4f9b\u7684\u673a\u4f1a\u3002\n\u5728\u5f53\u4e0b\u4e2d\u56fd\uff0c\u4ee5\u5f53\u4ee3\u827a\u672f\u4e3a\u6838\u5fc3\u5173\u6ce8\u5bf9\u8c61\uff0c\u5e76\u6709\u4e00\u5b9a\u89c4\u6a21\u548c\u5386\u53f2\u7684\u975e\u8425\u5229\u673a\u6784\u4ecd\u7136\u5c48\u6307\u53ef\u6570\uff0c\u6cf0\u5eb7\u7a7a\u95f4\u662f\u5176\u4e2d\u4e4b\u4e00\u3002\u7ecf\u5386\u4e86\u6cf0\u5eb7\u4eba\u5bff\u5927\u53a6\u9876\u5c42\u591a\u529f\u80fd\u5385\u3001798\u827a\u672f\u533a\u548c\u8349\u573a\u5730\u8fd93\u4e2a\u53d1\u5c55\u65f6\u671f\uff0c\u96b6\u5c5e\u4e8e\u91d1\u878d\u4f01\u4e1a\u7684\u6cf0\u5eb7\u7a7a\u95f4\uff0c\u6709\u7740\u660e\u786e\u533a\u522b\u4e8e\u5176\u4ed6\u975e\u8425\u5229\u673a\u6784\u7684\u5b9a\u4f4d\uff0c\u5373\u5728\u4f5c\u4e3a\u4e00\u4e2a\u7814\u7a76\u3001\u652f\u6301\u5b9e\u9a8c\u827a\u672f\u7684\u4e13\u4e1a\u636e\u70b9\u7684\u540c\u65f6\uff0c\u6709\u7740\u4e00\u4e2a\u660e\u786e\u7684\u670d\u52a1\u4e3b\u4f53\u2014\u2014\u6cf0\u5eb7\u4eba\u5bff\u30022011\u5e74\uff0c\u4e2d\u56fd\u7f8e\u672f\u9986\u4e3e\u529e\u7684\u6cf0\u5eb7\u4eba\u5bff15\u5468\u5e74\u827a\u672f\u54c1\u6536\u85cf\u5c55\u4ee4\u4eba\u5370\u8c61\u6df1\u523b\uff0c\u8fd9\u5176\u4e2d\u4e0d\u4e4f\u6cf0\u5eb7\u7a7a\u95f4\u4f5c\u51fa\u7684\u8d21\u732e\u3002\n\u6cf0\u5eb7\u7a7a\u95f4\u4ee5\u6cf0\u5eb7\u4eba\u5bff\u7684\u957f\u671f\u6295\u5165\u4e3a\u57fa\u7840\uff0c\u81ea\u4e3b\u7b56\u5212\u827a\u672f\u9879\u76ee\uff0c\u5728\u67d0\u79cd\u7a0b\u5ea6\u4e0a\u5145\u5f53\u7740\u7c7b\u4f3c\u56fd\u5916\u7684\u57fa\u91d1\u4f1a\u6240\u626e\u6f14\u7684\u89d2\u8272\u3002\u501f\u52a9\u6b64\u6b21\u56de\u987e\u5c55\uff0c\u6cf0\u5eb7\u7a7a\u95f4\u68b3\u7406\u4e86\u81ea\u8eab\u53d1\u5c55\u548c\u6f14\u5316\u7684\u5386\u53f2\uff0c\u4e5f\u63a2\u7d22\u4e86\u672a\u6765\u7684\u53ef\u80fd\u6027\u3002\n\u5c55\u89c8\u73b0\u573a\u5206\u4e3a\u4e24\u4e2a\u4e3b\u4f53\u90e8\u5206\uff0c\u5927\u5c55\u5385\u5185\u662f\u6cf0\u5eb7\u7a7a\u95f4\u7684\u603b\u76d1\u5510\u6615\u4e66\u5199\u7684\u65e5\u8bb0\u5f0f\u201c\u624b\u7a3f\u201d\uff0c\u7528\u7cbe\u7b80\u7684\u6587\u5b57\u548c\u8d44\u6599\u3001\u5b9e\u7269\u5448\u73b0\u7a7a\u95f4\u7684\u5386\u53f2\uff0c\u52fe\u52d210\u5e74\u95f4\u7684\u53d1\u5c55\u8109\u7edc\u3002\u53e6\u5916\uff0c\u66fe\u5b75\u5316\u201c51m\u00b2\u201d\u7cfb\u5217\u5c55\u89c8\u9879\u76ee\u7684\u5c0f\u5c55\u5385\uff0c\u6b64\u756a\u5219\u88ab\u6539\u9020\u4e3a\u4e00\u4e2a\u79c1\u4eba\u4f1a\u5ba2\u5ba4\uff0c\u7528\u4f5c\u5c55\u89c8\u7684\u53e6\u4e00\u90e8\u5206\u201cChat Chat Chat...\u201d\u9879\u76ee\u7684\u5b9e\u65bd\u5730\u70b9\u3002\u6cf0\u5eb7\u7a7a\u95f4\u9080\u8bf7\u56fd\u5185\u975e\u8425\u5229\u827a\u672f\u673a\u6784\u8d1f\u8d23\u4eba\u6765\u6b64\u8ba8\u8bba\u827a\u672f\u673a\u6784\u7684\u8fd0\u4f5c\u53ca\u5176\u672a\u6765\u3002\n\u6cf0\u5eb7\u7a7a\u95f410\u5e74\u95f4\u4e0d\u4ee3\u7406\u827a\u672f\u5bb6\u3001\u4e0d\u9500\u552e\u4f5c\u54c1\u3001\u4e0d\u51fa\u79df\u573a\u5730\uff0c\u6240\u6709\u5c55\u89c8\u90fd\u662f\u81ea\u4e3b\u7b56\u5212\uff0c\u575a\u6301\u7814\u7a76\u6027\u8d28\u7684\u72ec\u7acb\u51fa\u7248\uff0c\u901a\u8fc7\u5c55\u89c8\u9879\u76ee\u548c\u4f01\u4e1a\u6536\u85cf\u6301\u7eed\u652f\u6301\u56fd\u5185\u5b9e\u9a8c\u6027\u7684\u827a\u672f\u521b\u4f5c\u2026\u2026\u5b83\u5df2\u7ecf\u6210\u4e3a\u4e86\u56fd\u5185\u4eca\u5929\u4ee5\u5f53\u4ee3\u827a\u672f\u4e3a\u4e3b\u4f53\u7684\u975e\u8425\u5229\u673a\u6784\u4e2d\u6b65\u8c03\u8e0f\u5b9e\u7684\u5b58\u5728\u3002\u6cf0\u5eb7\u4eba\u5bff\u8463\u4e8b\u957f\u9648\u4e1c\u5347\u591a\u6b21\u516c\u5f00\u5411\u5a92\u4f53\u8868\u8fbe\u4e86\u4ed6\u7684\u671f\u5180\uff1a\u201c\u6cf0\u5eb7\u7a7a\u95f4\u7684\u4e0b\u4e00\u6b65\u53d1\u5c55\u6709\u53ef\u80fd\u662f\u8981\u8d70\u5411\u7f8e\u672f\u9986\u3002\u6211\u4eec\u7684\u76ee\u6807\u662f\u80fd\u591f\u505a\u6210\u4e2d\u56fd\u7684MoMA\u6216\u8005\u53e4\u6839\u6d77\u59c6\u3002\u201d\u64b0\u6587\uff0f\u5f20\u5915\u8fdc\n\u4ece\u590d\u5174\u95e8\u5230\u8349\u573a\u5730\uff1a\u6cf0\u5eb7\u7a7a\u95f42003-\n\u5317\u4eac\u6cf0\u5eb7\u7a7a\u95f4\n\u81f311\u67089\u65e5",
                "readpoint": "0",
                "groupids_view": "",
                "paginationtype": "0",
                "maxcharperpage": "0",
                "template": "",
                "paytype": "0",
                "relation": "",
                "pictureurls": [],
                "copyfrom": "",
                "allow_comment": "1",
                "subcontent": "",
                "vpictureurls": [{
                "url": "uploadfile\/2013\/1025\/20131025112412880.jpg",
                "alt": "02-\u4e8c\u6761\u56fe\u7247-01\u53f3_ipad"
            }],
                "ipictureurls": [{
                "url": "uploadfile\/2013\/1025\/20131025112425458.jpg",
                "alt": "02-\u4e8c\u6761\u56fe\u7247-01\u53f3_iphone"
            }],
                "backgroundpic": "",
                "msgtpl": "",
                "long_desc": "",
                "def_type_setting": "",
                "key": "ovffd4",
                "articleid": "26244",
                "desc": "\u6cf0\u5eb7\u7a7a\u95f4 10 \u5468\u5e74\u56de\u987e\u5c55\u68b3\u7406\u548c\u68c0\u89c6\u4e86\u673a\u6784\u7684\u8eab\u4efd\u4e0e\u4f7f\u547d",
                "issueid": "293"
        },
        "inputtime": "1382671469",
            "updatetime": "2014-05-12 17:11:06",
            "publishstatus": "99",
            "appid": "12",
            "delete": "0"
    };

    res.json(article);
};