seajs.config({
    alias: {
        "$": "jquery/jquery/2.1.0/jquery",
        "cms.base.js": "slate/cms-base/1.0.0/cms-base",
        "popup": "slate/popup/1.0.0/popup"
    }
});

seajs.use(['$', 'cms.base.js', 'popup'], function ($, cmsBase) {
    $(function () {
        $('.icon').popup({
            on: 'focus',
            content: 'Hello I am a popup'
        });
    });
});