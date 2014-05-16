seajs.config({
    alias: {
        '$': 'jquery/jquery/2.1.0/jquery',
        'jquery': 'jquery/jquery/2.1.0/jquery',
        'mustache': 'gallery/mustache/0.8.1/mustache',
        'cms.base.js': 'slate/cms-base/1.0.0/cms-base',
        'upload': 'slate/upload/1.0.0/upload',
        'dropdown': 'slate/dropdown/1.0.0/dropdown',
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
        'dropdown',
        'validation',
        'inputcount',
        'edit.article.css'
    ], function ($, Mustache, cmsBase, Uploader, avalon) {
        window.avalon = avalon;

        var Article = function () {
            cmsBase.aop(this, 'Article', null);
        };

        /**
         * 上传图片
         */
        Article.prototype.uploadImg = function (triggerName) {
            var _this = this,
                type = triggerName.replace('upload-btn-', '');

            new Uploader({
                trigger: triggerName,
                name: triggerName.match(/video/) ? 'video[]' : 'image[]',
                action: triggerName.match(/video/) ? cmsBase.getUrl('uploadVideo', null) : cmsBase.getUrl('uploadImg', null),
                accept: triggerName.match(/video/) ? 'video/*,audio/*' : (triggerName.match(/pdf/) ? 'application/pdf' : 'image/*' ),
                data: {},
                multiple: true,
                error: function (file) {
                    cmsBase.log(file);
                },
                success: function (response) {
                    var images = response.success;
                    if (!!images && images.length > 0) {

                        for (var i = 0; i < images.length; i++) {
                            images[i].title = '';
                            images[i].time = '';
                            images[i].index = '';
                            images[i].des = '';

                            if (triggerName.match(/h$/g)) {
                                _this.articleModel.article.pictureurls.push(images[i]);
                            } else if (triggerName.match(/v$/g)) {
                                _this.articleModel.article.vpictureurls.push(images[i]);
                            } else if (triggerName.match(/i$/g)) {
                                _this.articleModel.article.ipictureurls.push(images[i]);
                            } else if (triggerName.match(/video/)) {
                                _this.articleModel.article.videos.push(images[i]);
                                $('.ui.dropdown').dropdown();
                            } else if (triggerName.match(/pdf/)) {
                                images[i].index = _this.articleModel.article.pdfs.length + 1;
                                _this.articleModel.article.pdfs.push(images[i]);
                            }
                        }

                    }
                },
                progress: function (event, position, total, percent, files) {
                    cmsBase.log(files);
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

        /**
         * 提交表单，是一个安全方法
         * @private
         */
        Article.prototype._submit_safe = function () {
            var _this = this;

            if (!cmsBase.articleId) {
                $.post(cmsBase.getUrl('addArticle', null), {
                    data: JSON.stringify(_this.articleModel.article.$model)
                }, function (d) {
                    if (d && d.status == 'success') {
                        $.slateAlert({content: '添加成功'})
                    }
                }, 'json');
            } else {
                $.post(cmsBase.getUrl('editArticle', {
                    articleId: cmsBase.articleId
                }), {data: JSON.stringify(_this.articleModel.article.$model)}, function (d) {
                    if (d && d.status == 'success') {
                        $.slateAlert({content: '修改成功'})
                    }
                }, 'json');
            }

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
                var $icon = $(this).next().find('.icon'),
                    $checkRes = $(this).next().next();
                $icon.removeClass('asterisk').addClass('loading');
                setTimeout(function () {
                    $icon.removeClass('loading').addClass('asterisk');
                }, 1000);

                $.get(cmsBase.getUrl('titleCheck', null), function (d) {
                    if (d.status) {
                        $checkRes.show();
                    }
                });
            });

            $('.submit-article').click(function () {
                setTimeout(function () {
                    if ($('.field.error').length == 0) {
                        _this._submit_safe();
                    }
                }, 100);
            });

            $('.ui.dropdown').dropdown();
        };

        /**
         * 绑定MVVM的一些公共方法，是添加和修改的公共方法的提取
         */
        Article.prototype.mvvmEvent = function () {
            var _this = this;
            _this.articleModel.article.loading = true;
            _this.articleModel.article.loading = false;

            _this.articleModel.article.removePic = function (index, type) {
                _this.articleModel.article[(type == 'h' ? '' : type) + 'pictureurls'].splice(index, 1);
            };
            _this.articleModel.article.removePdf = function (index) {
                _this.articleModel.article.pdfs.splice(index, 1);
            };
        };

        /**
         * 采用MVVM做article表单处理
         */
        Article.prototype.articleMvvm = function () {
            var _this = this,
                id = '537345238c3b8ed719000002',
                articleType = $('title').html().substring(2);

            if (!!cmsBase.articleId) {
                $.get(cmsBase.getUrl('getArticle', {articleId: id}), function (articles) {
                    _this.articleModel = avalon.define('article', function (vm) {
                        vm.article = articles[id].data;
                        vm.article.action = '修改' + articleType;
                    });
                    _this.mvvmEvent();
                    avalon.scan();
                }, 'json');
            } else {
                _this.articleModel = avalon.define('article', function (vm) {
                    vm.article = {};
                    vm.article.title = '';
                    vm.article.subtitle = '';
                    vm.article.author = '';
                    vm.article.author_ename = '';
                    vm.article.author_title = '';
                    vm.article.subcontent = '';
                    vm.article.desc = '';
                    vm.article.long_desc = '';
                    vm.article.content = '';
                    vm.article.video = '';
                    vm.article.videoTime = '';
                    vm.article.pictureurls = [];
                    vm.article.vpictureurls = [];
                    vm.article.ipictureurls = [];
                    vm.article.videos = [];
                    vm.article.pdfs = [];
                    vm.article.action = '添加' + articleType;
                });
                _this.mvvmEvent();

                avalon.scan();
            }
        };

        Article.prototype.init = function () {
            this.articleMvvm();

            this.uploadImg('.upload-btn-h');    //横版图片
            this.uploadImg('.upload-btn-v');    //竖版图片
            this.uploadImg('.upload-btn-i');    //iphone图片
            this.uploadImg('.upload-btn-video');    //iphone图片
            this.uploadImg('.upload-btn-pdf');
            this.formValidate();
            this.bindEvent();

        };

        $(function () {
            var article = window.article = new Article();
            article.init();
        })
    });