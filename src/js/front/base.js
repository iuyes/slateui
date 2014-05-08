/**
 *
 * Created by hujianmeng on 14-5-8.
 */

define(function (require, exports, module) {
    var $ = require('$');

    var cmsBase = function () {

    };

    cmsBase.prototype.tools = {
        Base64: require('slate/base64/1.0.0/base64')
    }

    cmsBase.prototype.urls = {
        getTemplateUrl: '/front/template/{name}'
    };

    module.exports = new cmsBase();

});