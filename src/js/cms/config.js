define(function (require, exports, module) {
    var config = {};

    config.urls = {
        login: '/login',                                                                                            //登录
        titleCheck: '',                                                                                             //标题检查是否唯一
        uploadImg: 'http://develop.jinxin.bbwc.cn/yaf_attachments/public/index.php/cms/upload/debug/1/datatype/2',  //上传图片
        getArticle: 'http://develop.bbwc.cn/magazine/article/{{articleid}}/listtype/all',
        addArticle: 'http://develop.bbwc.cn/magazine/article/',                                                     //添加文章
        editArticle: 'http://develop.bbwc.cn/magazine/article/{{articleid}}'                                        //修改文章
    };

    module.exports = config;

});