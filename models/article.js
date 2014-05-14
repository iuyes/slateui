/**
 * 文章信息
 * User: hujianmeng
 * Date: 13-9-22
 * Time: 上午11:02
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
    'catid': {type: Number},
    'title': {type: String},
    'thumb': {type: String},
    'keywords': {type: String},
    'posids': {type: Number},
    'listorder': {type: Number},
    'status': {type: Number},
    'sysadd': {type: Number},
    'islink': {type: Number},
    'username': {type: String},
    'inputtime': {type: Date, default: Date.now},
    'updatetime': {type: Date, default: Date.now},
    'setcftime': {type: Number},
    'iscontenttype': {type: Number},
    'publishstatus': {type: Number},
    'tags': {type: String},
    'author': {type: String},
    'subtitle': {type: String},
    'devices': {type: String},
    'askitem': {type: Number},
    'isendtext': {type: Number},
    'createuser': {type: String},
    'level': {type: Number},
    'isstarttext': {type: Number},
    'pagenum': {type: Number},
    'iphonepagenum': {type: Number},
    'atype': {type: Number},
    'scrollHidden': {type: Number},
    'vurl': {type: String},
    'pageurl': {type: String},
    'author_ename': {type: String},
    'author_title': {type: String},
    'videostime': {type: String},
    'recatid': {type: Number},
    'reaid': {type: Number},
    'retips': {type: String},
    'isoffline': {type: Number},
    'appid': {type: Number},
    'content': {type: String},
    'readpoint': {type: Number},
    'groupids_view': {type: Number},
    'paginationtype': {type: Number},
    'maxcharperpage': {type: Number},
    'template': {type: String},
    'paytype': {type: Number},
    'relation': {type: String},
    'pictureurls': Schema.Types.Mixed,
    'copyfrom': {type: String},
    'allow_comment': {type: String},
    'subcontent': {type: String},
    'vpictureurls': Schema.Types.Mixed,
    'ipictureurls': Schema.Types.Mixed,
    'backgroundpic': {type: String},
    'msgtpl': {type: String},
    'long_desc': {type: String},
    'def_type_setting': {type: String},
    'key': {type: String},
    'articleid': {type: Number},
    'desc': {type: String},
    'issueid': {type: Number}
});

mongoose.model('Article', ArticleSchema);