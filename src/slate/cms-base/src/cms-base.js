define(function (require, exports, module) {
    var $ = require('$');

    var cmsBase = function () {

    };

    cmsBase.prototype.urls = {
        login: '/login'
    }

    module.exports = new cmsBase();

});
