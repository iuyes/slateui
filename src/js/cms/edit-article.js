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
            cmsBase.aop(this, 'Article', null);
        };

        Article.prototype.uploadImgTmpl = $('.upload-img-tmpl').html(); //上传图片预览模板

        /**
         * 上传图片
         */
        Article.prototype.uploadImg = function (triggerName) {
            var _this = this;
            new Uploader({
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
                progress: function (event, position, total, percent, files) {
                    console.log(files);
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
            var _this = this,
                id = 26244;

            $.get(cmsBase.getUrl('getArticle', {articleId: id}), function (articles) {
                _this.articleModel = avalon.define('article', function (vm) {
                    vm.article = articles[id].data;
                });
                avalon.scan();
            }, 'json');


            _this.model = avalon.define("update", function (vm) {
                vm.article1 = {};
                vm.article1.aaa = "str"
                vm.article1.bbb = false
                vm.article1.ccc = 1223
                vm.article1.time = new Date
                vm.article1.simpleArray = [1, 2, 3, 4]
                vm.article1.objectArray = [
                    {name: "a"},
                    {name: "b"},
                    {name: "c"},
                    {name: "d"}
                ]
                vm.article1.object = {
                    o1: "k1",
                    o2: "k2",
                    o3: "k3"
                }
                vm.article1.simpleArray = [1, 2, 3, 4]
                vm.article1.objectArray = [
                    {name: "a", value: "aa"},
                    {name: "b", value: "bb"},
                    {name: "c", value: "cc"},
                    {name: "d", value: "dd"}
                ]
                vm.article1.object = {
                    o1: "k1",
                    o2: "k2",
                    o3: "k3"
                }
            })
            setTimeout(function () {
                //如果是更新简单数据类型（string, boolean, number）或Date类型
                _this.model.article1.aaa = "这是字符串"
                _this.model.article1.bbb = true
                _this.model.article1.ccc = 999999999999
                var date = new Date
                _this.model.article1.time = new Date(date.setFullYear(2005))
            }, 2000)

            setTimeout(function () {
                //如果是数组，注意保证它们的元素的类型是一致的
                //只能全是字符串，或是全是布尔，不能有一些是这种类型，另一些是其他类型
                //这时我们可以使用set方法来更新（它有两个参数，第一个是index，第2个是新值）
                _this.model.article1.simpleArray.set(0, 1000)
                _this.model.article1.simpleArray.set(2, 3000)
                _this.model.article1.objectArray.set(0, {name: "xxxxxxxxxxxxxxxx", value: "xxx"})
            }, 2500)
            setTimeout(function () {
                _this.model.article1.objectArray[1].name = "5555"
            }, 3000)
            setTimeout(function () {
                //如果要更新对象，直接赋给它一个对象，注意不能将一个VM赋给它，可以到VM的$model赋给它（要不会在IE6-8中报错）
                _this.model.article1.object = {
                    aaaa: "aaaa",
                    bbbb: "bbbb",
                    cccc: "cccc",
                    dddd: "dddd"
                }
            }, 3000)

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