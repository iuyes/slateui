seajs.config({
    alias: {
        '$': 'jquery/jquery/2.1.0/jquery',
        'jquery': 'jquery/jquery/2.1.0/jquery',
        'front.base': 'js/front/base',
        'front.base.css': 'css/front/base.css'
    }
});

seajs.use(
    [
        '$',
        'front.base',
        'front.base.css'
    ], function ($, cmsBase) {

        $(function () {

            $('.templates-box a').click(function () {
                $('.templates-box a').removeClass('active');
                $(this).addClass('active');

                var name = $.trim($(this).attr('data-name'));

                $('.show').addClass('loading');
                $.get(cmsBase.urls.getModuleUrl.replace('{name}', cmsBase.tools.Base64.encoder(name)), function (d) {
                    setTimeout(function () {
                        $('.show').html(JSON.stringify(d.data));
                        $('.show').removeClass('loading')
                            .jsonEditor(d, { change: function () {
                                $('.show').html(JSON.stringify(d));
                            } });
                    }, 500);
                });
            });

            $('.templates-box a:first').click();
        });

    });