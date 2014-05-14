define(function (require, exports, module) {
    var config = {};

    config.env = 'dev';

    config.urls = {
        login: '/login',                                                                                            //登录
        appList: '/apps',
        titleCheck: '',                                                                                             //标题检查是否唯一
        uploadImg: '/tools/upload',  //上传图片
        getArticle: 'http://develop.bbwc.cn/magazine/article/{{articleId}}/listtype/all',
        addArticle: 'http://develop.bbwc.cn/magazine/article/',                                                     //添加文章
        editArticle: 'http://develop.bbwc.cn/magazine/article/{{articleId}}'                                        //修改文章
    };

    config.devUrls = {
        login: '/login',
        appList: '/apps',
        titleCheck: '',
        uploadImg: '/tools/upload',
        getArticle: '/article/get/{{articleId}}',
        addArticle: '/content/add',
        editArticle: '/content/edit/{{articleId}}'
    };

    module.exports = config;

});