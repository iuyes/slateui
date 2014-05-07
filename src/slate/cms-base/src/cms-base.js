define(function (require, exports, module) {
    require('slate/popup/1.0.0/popup');
    var $ = require('$');

    var cmsBase = function () {
        $('.sign-out,.account-settings').popup();
    };

    cmsBase.prototype.urls = {
        login: '/login'
    };

    module.exports = new cmsBase();

});
