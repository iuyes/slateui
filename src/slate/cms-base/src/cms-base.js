define(function (require, exports, module) {
    require('slate/popup/1.0.0/popup'); //菜单上的弹出动画
    require('slate/modal/1.0.0/modal'); //弹出框

    var config = require('/js/cms/config.js'),
        aop = require('slate/aop/1.0.0/aop'),
        $ = require('$'),
        isLogin = true;

    var cmsBase = function () {
        $('.sign-out,.account-settings').popup();
    };

    /**
     * 获取url
     * @param name
     * @param args
     * @returns {*}
     */
    cmsBase.prototype.getUrl = function (name, args) {
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

    module.exports = new cmsBase();

});
