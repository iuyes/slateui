seajs.config({
    alias: {
        '$': 'jquery/jquery/2.1.0/jquery',
        'jquery': 'jquery/jquery/2.1.0/jquery',
        'mustache': 'gallery/mustache/0.8.1/mustache',
        'cms.base.js': 'slate/cms-base/1.0.0/cms-base',
        'upload': 'slate/upload/1.0.0/upload',
        "validation": "slate/validation/1.0.0/validation",
        'edit.article.css': 'css/cms/edit-article.css'
    }
});

seajs.use(
    [
        '$',
        'mustache',
        'cms.base.js',
        'upload',
        'validation',
        'edit.article.css'
    ], function ($, Mustache, cmsBase, Uploader) {
        var Article = function () {

        };

        Article.prototype.uploadImgTmpl = $('.upload-img-tmpl').html();

        /**
         * 上传图片
         */
        Article.prototype.uploadImg = function (triggerName) {
            var _this = this;
            new Uploader({
                trigger: triggerName,
                name: 'image',
                action: cmsBase.urls.uploadImg,
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
                progress: function (event, position, total, percent, files) {
                    console.log(files);
                }
            });
        };

        Article.prototype.formValidate = function(){
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

        $(function () {
            var article = new Article();
            article.uploadImg('.upload-btn-h');
            article.uploadImg('.upload-btn-v');
            article.formValidate();
        })
    });