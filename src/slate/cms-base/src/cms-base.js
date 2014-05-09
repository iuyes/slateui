define(function (require, exports, module) {
    require('slate/popup/1.0.0/popup');
    var $ = require('$');

    var cmsBase = function () {
        $('.sign-out,.account-settings').popup();
    };

    cmsBase.prototype.urls = {
        login: '/login',
        uploadImg: 'http://develop.jinxin.bbwc.cn/yaf_attachments/public/index.php/cms/upload/debug/1/datatype/2',
        addArticle: 'http://develop.bbwc.cn/magazine/article/',
        editArticle: 'http://develop.bbwc.cn/magazine/article/{{articleid}}'
    };

    module.exports = new cmsBase();

});
