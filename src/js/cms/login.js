seajs.config({
    alias: {
        "$": "jquery/jquery/2.1.0/jquery",
        "cms.base.js": "slate/cms-base/1.0.0/cms-base",
        "cms.login.css": "css/cms/login.css"
    }
});

seajs.use(['$', 'cms.base.js', 'cms.login.css'], function ($, CmsBase) {
    $(function () {
        CmsBase();
    });
});