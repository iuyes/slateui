/**
 * Created by hujianmeng on 14-5-4.
 */

exports.list = function (req, res, next) {
    if (req.method == 'GET') {
        res.render('app-list');
    } else {

    }
};

/**
 * 根据用户信息得到APP列表
 * @param req
 * @param res
 * @param next
 */
exports.getApps = function (req, res, next) {
    var apps = {
        apps: [
            {
                appName: '商业周刊简体版',
                appId: Math.ceil(Math.random() * new Date().getTime()),
                columns: [
                    {
                        columnId: Math.ceil(Math.random() * new Date().getTime()),
                        columnName: '全球经济'
                    },
                    {
                        columnId: Math.ceil(Math.random() * new Date().getTime()),
                        columnName: '特写'
                    }
                    ,
                    {
                        columnId: Math.ceil(Math.random() * new Date().getTime()),
                        columnName: '公司产业'
                    }
                ]
            },
            {
                appName: '商业周刊繁体版',
                appId: Math.ceil(Math.random() * new Date().getTime()),
                columns: [
                    {
                        columnId: Math.ceil(Math.random() * new Date().getTime()),
                        columnName: '全球经济'
                    },
                    {
                        columnId: Math.ceil(Math.random() * new Date().getTime()),
                        columnName: '特写'
                    }
                    ,
                    {
                        columnId: Math.ceil(Math.random() * new Date().getTime()),
                        columnName: '公司产业'
                    }
                ]
            },
            {
                appName: '商业周刊简体版',
                appId: Math.ceil(Math.random() * new Date().getTime()),
                columns: [
                    {
                        columnId: Math.ceil(Math.random() * new Date().getTime()),
                        columnName: '全球经济'
                    },
                    {
                        columnId: Math.ceil(Math.random() * new Date().getTime()),
                        columnName: '特写'
                    }
                    ,
                    {
                        columnId: Math.ceil(Math.random() * new Date().getTime()),
                        columnName: '公司产业'
                    }
                ]
            }
        ]
    }
    res.json(apps);
};

exports.getArticles = function (req, res, next) {
    var article = {
        "allow_comment": "1",
        "appid": 12,
        "articleid": 26244,
        "askitem": 0,
        "atype": 1,
        "column": "全球经济",
        "author": "feeloc",
        "author_ename": "feeloc_ename",
        "author_title": "feeloc_title",
        "backgroundpic": "",
        "catid": 96,
        "content": "北京。对于所有仍在坚持，或已经落幕的中国非营利艺术机构而言，9月的泰康空间10周年回顾展“从复兴门到草场地：泰康空间2003-”都具有着特别意义。这10年是中国当代艺术在国际市场的作用力下攀上高峰、跌入低潮又再次启航的动荡期。近年来，年轻一代的艺术行业工作者又开始重视非营利艺术机构提供的机会。\n在当下中国，以当代艺术为核心关注对象，并有一定规模和历史的非营利机构仍然屈指可数，泰康空间是其中之一。经历了泰康人寿大厦顶层多功能厅、798艺术区和草场地这3个发展时期，隶属于金融企业的泰康空间，有着明确区别于其他非营利机构的定位，即在作为一个研究、支持实验艺术的专业据点的同时，有着一个明确的服务主体——泰康人寿。2011年，中国美术馆举办的泰康人寿15周年艺术品收藏展令人印象深刻，这其中不乏泰康空间作出的贡献。\n泰康空间以泰康人寿的长期投入为基础，自主策划艺术项目，在某种程度上充当着类似国外的基金会所扮演的角色。借助此次回顾展，泰康空间梳理了自身发展和演化的历史，也探索了未来的可能性。\n展览现场分为两个主体部分，大展厅内是泰康空间的总监唐昕书写的日记式“手稿”，用精简的文字和资料、实物呈现空间的历史，勾勒10年间的发展脉络。另外，曾孵化“51m²”系列展览项目的小展厅，此番则被改造为一个私人会客室，用作展览的另一部分“Chat Chat Chat...”项目的实施地点。泰康空间邀请国内非营利艺术机构负责人来此讨论艺术机构的运作及其未来。\n泰康空间10年间不代理艺术家、不销售作品、不出租场地，所有展览都是自主策划，坚持研究性质的独立出版，通过展览项目和企业收藏持续支持国内实验性的艺术创作……它已经成为了国内今天以当代艺术为主体的非营利机构中步调踏实的存在。泰康人寿董事长陈东升多次公开向媒体表达了他的期冀：“泰康空间的下一步发展有可能是要走向美术馆。我们的目标是能够做成中国的MoMA或者古根海姆。”撰文／张夕远\n从复兴门到草场地：泰康空间2003-\n北京泰康空间\n至11月9日",
        "copyfrom": "",
        "createuser": "hulanjie",
        "def_type_setting": "",
        "desc": "泰康空间 10 周年回顾展梳理和检视了机构的身份与使命",
        "devices": "1,2,3,6",
        "groupids_view": null,
        "inputtime": {
            "$date": "1970-01-17T00:04:31.469Z"
        },
        "iphonepagenum": 0,
        "ipictureurls": [
            {
                "alt": "02-二条图片-01右_iphone",
                "url": "uploadfile/2013/1025/20131025112425458.jpg"
            }
        ],
        "iscontenttype": 1,
        "isendtext": 0,
        "islink": 0,
        "isoffline": 0,
        "isstarttext": 0,
        "issueid": 293,
        "key": "ovffd4",
        "keywords": "",
        "level": 0,
        "listorder": 0,
        "long_desc": "长摘要",
        "maxcharperpage": 0,
        "msgtpl": "",
        "pagenum": 1,
        "pageurl": "",
        "paginationtype": 0,
        "paytype": 0,
        "pictureurls": [
            {
                "alt": "_DSC0001.JPG",
                "preview": "http://127.0.0.1:3000//upload/36802-1xpm4co.JPG",
                "url": "/upload/36802-1xpm4co.JPG"
            },
            {
                "alt": "_DSC0002.JPG",
                "preview": "http://127.0.0.1:3000//upload/36802-157bo5w.JPG",
                "url": "/upload/36802-157bo5w.JPG"
            },
            {
                "alt": "_DSC0003.JPG",
                "preview": "http://127.0.0.1:3000//upload/36802-1swwit5.JPG",
                "url": "/upload/36802-1swwit5.JPG"
            },
            {
                "alt": "_DSC0004.JPG",
                "preview": "http://127.0.0.1:3000//upload/36802-m50ouu.JPG",
                "url": "/upload/36802-m50ouu.JPG"
            },
            {
                "alt": "_DSC0005.JPG",
                "preview": "http://127.0.0.1:3000//upload/36802-1xr6jyi.JPG",
                "url": "/upload/36802-1xr6jyi.JPG"
            },
            {
                "alt": "_DSC0006.JPG",
                "preview": "http://127.0.0.1:3000//upload/36802-i4aldc.JPG",
                "url": "/upload/36802-i4aldc.JPG"
            },
            {
                "alt": "_DSC0007.JPG",
                "preview": "http://127.0.0.1:3000//upload/36802-kamagu.JPG",
                "url": "/upload/36802-kamagu.JPG"
            },
            {
                "alt": "_DSC0008.JPG",
                "preview": "http://127.0.0.1:3000//upload/36802-1rbvuqo.JPG",
                "url": "/upload/36802-1rbvuqo.JPG"
            }
        ],
        "posids": 2,
        "publishstatus": 99,
        "readpoint": 0,
        "reaid": null,
        "recatid": null,
        "relation": "",
        "retips": "",
        "scrollHidden": 0,
        "setcftime": 1382672498,
        "status": 1,
        "subcontent": "提纲",
        "subtitle": "非营利艺术机构的自白",
        "sysadd": 0,
        "tags": "",
        "template": "",
        "thumb": "http://placehold.it/100x100",
        "title": "你好啊",
        "updatetime": {
            "$date": "1970-01-17T00:04:32.498Z"
        },
        "updateuser": "feeloc_update",
        "username": "hulanjie",
        "videostime": "",
        "vpictureurls": [
            {
                "alt": "_DSC0009.JPG",
                "preview": "http://127.0.0.1:3000//upload/36802-iym90.JPG",
                "url": "/upload/36802-iym90.JPG"
            },
            {
                "alt": "_DSC0010.JPG",
                "preview": "http://127.0.0.1:3000//upload/36802-uq6uqj.JPG",
                "url": "/upload/36802-uq6uqj.JPG"
            },
            {
                "alt": "_DSC0011.JPG",
                "preview": "http://127.0.0.1:3000//upload/36802-973ggk.JPG",
                "url": "/upload/36802-973ggk.JPG"
            },
            {
                "alt": "_DSC0012.JPG",
                "preview": "http://127.0.0.1:3000//upload/36802-r8dlfe.JPG",
                "url": "/upload/36802-r8dlfe.JPG"
            },
            {
                "alt": "_DSC0013.JPG",
                "preview": "http://127.0.0.1:3000//upload/36802-1h3g04k.JPG",
                "url": "/upload/36802-1h3g04k.JPG"
            },
            {
                "alt": "_DSC0014.JPG",
                "preview": "http://127.0.0.1:3000//upload/36802-15hv2g3.JPG",
                "url": "/upload/36802-15hv2g3.JPG"
            },
            {
                "alt": "_DSC0015.JPG",
                "preview": "http://127.0.0.1:3000//upload/36802-o611ak.JPG",
                "url": "/upload/36802-o611ak.JPG"
            },
            {
                "alt": "_DSC0016.JPG",
                "preview": "http://127.0.0.1:3000//upload/36802-uexov.JPG",
                "url": "/upload/36802-uexov.JPG"
            },
            {
                "alt": "_DSC0017.JPG",
                "preview": "http://127.0.0.1:3000//upload/36802-16qejqx.JPG",
                "url": "/upload/36802-16qejqx.JPG"
            },
            {
                "alt": "_DSC0018.JPG",
                "preview": "http://127.0.0.1:3000//upload/36802-4jpzf3.JPG",
                "url": "/upload/36802-4jpzf3.JPG"
            }
        ],
        "vurl": ""
    };
    var articles = {
        articles: []
    }

    for (var i = 0; i < 5; i++) {
        articles.articles.push({
            id: Math.ceil(Math.random() * new Date().getTime()),
            article: article
        });
    }

    res.json(articles);
};