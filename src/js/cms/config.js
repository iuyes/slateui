define(function (require, exports, module) {
    var config = {};

    config.env = location.href.match(/env=dev/) ? 'dev' : '';
    config.version = 1;

    config.urls = {
        login: '/login',
        appList: '/apps',
        getSelfApps: '/apps/get',   //获取登录账户的APP列表
        getArticleList: '/app/articles',    //获取APP下该栏目的文章列表
        titleCheck: '',     //标题检查是否唯一
        uploadImg: 'http://develop.jinxin.bbwc.cn/yaf_attachments/public/index.php/cms/upload/datatype/2/debug/1',  //上传图片
        uploadVideo: 'http://develop.jinxin.bbwc.cn/yaf_attachments/public/index.php/video/upload/datatype/2/debug/1/appid/{{appid}}',  //上传视频
        getArticle: 'http://develop.bbwc.cn/slateInterface/v' + config.version + '/app_{{appid}}/{{devicetype}}/article/{{articleid}}',   //根据ID获取文章的所有属性
        addArticle: 'http://develop.bbwc.cn/slateInterface/v' + config.version + '/app_{{appid}}/{{devicetype}}/article', //添加文章                                                     //添加文章
        editArticle: 'http://develop.bbwc.cn/slateInterface/v' + config.version + '/app_{{appid}}/{{devicetype}}/article/{{articleid}}',   //编辑文章                                       //修改文章
        previewV: '{{articleId}}',    //竖版的预览地址
        previewH: '{{articleId}}',    //横版的预览地址
        previewI: '{{articleId}}',    //手机的预览地址
        changeArticle: '{{articleId}}',   //修改文章地址
        setArticle: '/content/set/{{articleId}}'    //设置文章
    };

    config.devUrls = {
        login: '/login',
        appList: '/apps',
        getSelfApps: '/apps/get',
        getArticleList: '/app/articles',
        titleCheck: '/check/{{title}}',
        uploadImg: '/tools/upload',
        getArticle: '/article/get/{{articleId}}',
        addArticle: '/content/add',
        editArticle: '/content/edit/{{articleId}}',
        previewV: '{{articleId}}',    //竖版的预览地址
        previewH: '{{articleId}}',    //横版的预览地址
        previewI: '{{articleId}}',    //手机的预览地址
        changeArticle: '/article/get/{{articleId}}',   //修改文章地址
        setArticle: '/content/set/{{articleId}}'    //设置文章
    };

    config.articleTypes = {
        1: '普通文章',
        2: '组图文章',
        3: '视频文章',
        4: 'PDF文章'
    };

    config.articleStatus = {
        1: '排版中',
        2: '发布中',
        3: '未发布'
    };

    module.exports = config;

});