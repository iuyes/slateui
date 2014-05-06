seajs.config({
    alias: {
        "$": "jquery/jquery/2.1.0/jquery",
        "jquery": "jquery/jquery/2.1.0/jquery",
        "cms.base.js": "slate/cms-base/1.0.0/cms-base",
        "validation": "slate/validation/1.0.0/validation",
        "cms.login.css": "css/cms/login.css"
    }
});

seajs.use(['$', 'cms.base.js', 'validation', 'cms.login.css'], function ($, cmsBase) {
    var loginValidation = function () {
        $('.ui.form').form({
            username: {
                identifier: 'username',
                rules: [
                    {
                        type: 'empty',
                        prompt: '请输入用户名'
                    }
                ]
            },
            password: {
                identifier: 'password',
                rules: [
                    {
                        type: 'empty',
                        prompt: '请输入密码'
                    }
                ]
            }
        });
    };

    var submit = function () {
        var errs = $('.field.error').length > 0 ? true : false;
        if (!errs) {
            var username = $('.username').val(),
                password = $('.password').val();

            $.post(cmsBase.urls.login, {
                username: username,
                password: password
            }, function (d) {
                if(d.status == 1){
                    location.href = '/apps';
                }
            });
        }
    };
    $(function () {
        loginValidation();

        $('.submit').click(function () {
            submit();
        });
    });
});