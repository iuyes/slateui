seajs.config({
    alias: {
        "$": "jquery/jquery/2.1.0/jquery",
        "jquery": "jquery/jquery/2.1.0/jquery",
        "easing": "jquery/easing/1.3.0/easing",
        "cms.base.js": "slate/cms-base/1.0.0/cms-base",
        "popup": "slate/popup/1.0.0/popup",
        "app.list.css": "css/cms/app-list.css"
    }
});

seajs.use(['$', 'cms.base.js', 'easing', 'popup', 'app.list.css'], function ($, cmsBase) {
    $(function () {
        $('.sign-out,.account-settings').popup();
        $('.app-name').click(function () {
            var $thisSubMenu = $(this).parent().find('.menu');
            if (!$thisSubMenu.is(':visible')) {
                $('.list-left .item .menu').each(function(){
                    $(this).hide();
                });
            }
            $(this).addClass('active');
            $thisSubMenu.show();
        });
    })
});