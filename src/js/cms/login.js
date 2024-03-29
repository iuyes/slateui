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

            $('.error').hide();
            $.post(cmsBase.getUrl('login', null), {
                username: username,
                password: password
            }, function (d) {
                if (d.status == 'success') {
                    location.href = cmsBase.getUrl('appList', null);
                } else {
                    $('.error').html('<div class="header">登录失败</div>').show();
                }
            });
        }
    };
    $(function () {
        loginValidation();

        $('input[type="text"],input[type="password"]').keyup(function (e) {
            if (e.keyCode == 13) {
                setTimeout(function () {
                    submit();
                }, 10)
            }
        });

        $('.submit').click(function () {
            submit();
        });
    });
});