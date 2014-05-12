define(function (require, exports, module) {
    require('slate/popup/1.0.0/popup'); //菜单上的弹出动画

    var config = require('/js/cms/config.js'),
        $ = require('$'),
        aop = require('slate/aop/1.0.0/aop');

    var cmsBase = function () {
        $('.sign-out,.account-settings').popup();

        aop.before( {target: window, method: 'alert'},
            function(alertarguments/* 这里是 alert 方法的参数 */) {
                document.write("before alert，argument： " + alertarguments[0] + "<br />");
            }
        );
    };

    /**
     * 获取url
     * @param name
     * @param args
     * @returns {*}
     */
    cmsBase.prototype.getUrl = function (name, args) {
        var url = config.urls[name];
        if (!!args) {
            for (var arg in args) {
                url = url.replace('{{' + arg + '}}', args[arg]);
            }
        }
        return url;
    };

    module.exports = new cmsBase();

});
