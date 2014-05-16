define(function (require, exports, module) {
    require('slate/popup/1.0.0/popup'); //菜单上的弹出动画
    require('slate/modal/1.0.0/modal'); //弹出框

    var config = require('/js/cms/config.js'),
        aop = require('slate/aop/1.0.0/aop'),
        $ = require('$'),
        isLogin = true;

    var cmsBase = function () {
        $('.sign-out,.account-settings').popup();   //菜单样式

        // 自动获取的参数列表
        this.args = {
            appid: '1'
        };

        this.urlParse();
    };

    /**
     * 获取url
     * @param name
     * @param args
     * @returns {*}
     */
    cmsBase.prototype.getUrl = function (name, args) {
        args = $.extend(this.args, args);
        var url = config.env == 'dev' ? config.devUrls[name] : config.urls[name];
        if (!!args) {
            for (var arg in args) {
                url = url.replace('{{' + arg + '}}', args[arg]);
            }
        }
        return url;
    };

    /**
     * 调用过cmsBase且方法以_safe结尾的都会调用切面方法，判断登录
     * @param obj
     * @param objName
     * @param funName
     * @private
     */
    cmsBase.prototype._shouldLogin = function (obj, objName, funName) {
        aop.around({target: obj, method: /(\w+)(_safe)$/},
            function (invocation) {
                if (isLogin) {
                    return invocation.proceed();
                } else {
                    $.slateAlert({content: '请登录后操作'});
                    return false;
                }
            }
        );
    };

    /**
     * aop方法包装
     * @param obj
     * @param objName
     * @param funName
     */
    cmsBase.prototype.aop = function (obj, objName, funName) {
        this._shouldLogin(obj, objName, funName);
    };

    /**
     * URL解析
     */
    cmsBase.prototype.urlParse = function () {
        var articleId = location.href.substring(location.href.lastIndexOf('/') + 1);
        if (articleId.length > 20) {
            this.articleId = articleId;
        }
    };

    /**
     * 文章类型字典
     * @param atype
     * @returns {*}
     */
    cmsBase.prototype.getArticleType = function (atype) {
        return config.articleTypes[atype] ? config.articleTypes[atype] : config.articleTypes[0];
    };

    /**
     * 文章状态字典
     * @param atype
     * @returns {*}
     */
    cmsBase.prototype.getArticleStatus = function (status) {
        return config.articleStatus[status] ? config.articleStatus[status] : config.articleStatus[0];
    };

    /**
     * 调试信息
     * @param log
     */
    cmsBase.prototype.log = function (log) {
        if (window.console && config.env == 'dev') {
            console.log(log);
        }
    };

    module.exports = new cmsBase();

});
