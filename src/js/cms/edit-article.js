seajs.config({
    alias: {
        '$': 'jquery/jquery/2.1.0/jquery',
        'jquery': 'jquery/jquery/2.1.0/jquery',
        'mustache': 'gallery/mustache/0.8.1/mustache',
        'cms.base.js': 'slate/cms-base/1.0.0/cms-base',
        'upload': 'slate/upload/1.0.0/upload',
        'inputcount': 'slate/inputcount/1.0.0/inputcount',
        'validation': 'slate/validation/1.0.0/validation',
        'avalon': 'slate/avalon/1.0.0/avalon.mobile',
        'edit.article.css': 'css/cms/edit-article.css'
    }
});

seajs.use(
    [
        '$',
        'mustache',
        'cms.base.js',
        'upload',
        'avalon',
        'validation',
        'inputcount',
        'edit.article.css'
    ], function ($, Mustache, cmsBase, Uploader, avalon) {
        var Article = function () {
            cmsBase.aop(this, 'Article');
        };

        Article.prototype.uploadImgTmpl = $('.upload-img-tmpl').html(); //上传图片预览模板

        /**
         * 上传图片
         */
        Article.prototype.uploadImg = function (triggerName) {
            var _this = this;
            var upload = new Uploader({
                trigger: triggerName,
                name: 'image',
                action: cmsBase.getUrl('uploadImg', null),
                accept: 'image/*',
                data: {},
                multiple: true,
                error: function (file) {
                    console.log(file);
                },
                success: function (response) {
                    if (response.status == 'success') {
                        var $img = $(Mustache.render(_this.uploadImgTmpl, response));

                        $(triggerName).next()
                            .append($img)
                            .find('.tips').remove();

                        $img.find('.delete').click(function () {
                            var $preview = $(this).parents('.images-preview');
                            $(this).parents('.image').remove();

                            if ($preview.find('.delete').length == 0) {
                                $preview.append('<div class="tips">无图片</div>');
                            }
                        });
                    }
                },
                change: function (files) {
                    this.submit();
                }
            });
        };

        /**
         * 表单验证
         */
        Article.prototype.formValidate = function () {
            $('.ui.form').form({
                title: {
                    identifier: 'title',
                    rules: [
                        {
                            type: 'empty',
                            prompt: '请输入标题'
                        }
                    ]
                },
                subtitle: {
                    identifier: 'subtitle',
                    rules: [
                        {
                            type: 'empty',
                            prompt: '请输入短标题'
                        }
                    ]
                }
            });
        };

        Article.prototype._submit_safe = function () {

        };

        /**
         * 事件绑定
         */
        Article.prototype.bindEvent = function () {
            var _this = this;

            $('input,textarea').inputCount({
                isByte: false
            }, function (n) {
                var $root = $(this).parents('.field').find('label');

                if ($root.find('span').length > 0) {
                    $root.find('.count').html(n);
                } else {
                    $root.append('<span class="count-box">已经输入：<span class="count">' + n + '</span></span>');
                }

            });

            $('input.title').blur(function () {
                var $icon = $(this).next().find('.icon');
                $icon.removeClass('asterisk').addClass('loading');
                setTimeout(function () {
                    $icon.removeClass('loading').addClass('asterisk');
                }, 1000);
                $.get(cmsBase.getUrl('titleCheck', null), function () {

                });
            });

            $('.submit-article').click(function () {
                _this._submit_safe();
            });
        };

        /**
         * 采用MVVM做article表单处理
         */
        Article.prototype.articleMvvm = function () {
            var _this = this;
            _this.articleModel = avalon.define('article', function (vm) {
                vm.article = {};
            });
            $.get(cmsBase.getUrl('getArticle', {articleid: 41670}), function (articles) {
                var article;
                for (var articleid in articles) {
                    article = JSON.parse(articles[articleid].data);
                }
                _this.articleModel.article = article;
            }, 'json');
        };

        Article.prototype.init = function () {
            this.articleMvvm();

            this.uploadImg('.upload-btn-h');    //横版图片
            this.uploadImg('.upload-btn-v');    //竖版图片
            this.formValidate();
            this.bindEvent();
        };

        $(function () {
            var article = window.article = new Article();
            article.init();
        })
    });