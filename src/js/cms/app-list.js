seajs.config({
    alias: {
        "$": "jquery/jquery/2.1.0/jquery",
        "jquery": "jquery/jquery/2.1.0/jquery",
        "checkbox": "slate/checkbox/1.0.0/checkbox",
        "dropdown": "slate/dropdown/1.0.0/dropdown",
        "cms.base.js": "slate/cms-base/1.0.0/cms-base",
        "app.list.css": "css/cms/app-list.css"
    }
});

seajs.use(['$', 'cms.base.js', 'checkbox', 'dropdown', 'app.list.css'], function ($, cmsBase) {

    /**
     * 应用列表
     * @constructor
     */
    var AppList = function () {

        if (typeof this.LeftMenuHandle != 'function') {
            AppList.prototype.bindEvents = function(){
                $('.ui.checkbox').checkbox();
                $('.ui.dropdown').dropdown();
            };
            /**
             * 点击左侧按钮
             * @param $this
             * @constructor
             */
            AppList.prototype.LeftMenuHandle = function ($this) {
                var $root = $('.list-left');
                if ($this.next().is(':hidden')) {
                    $root.find('.active .menu').hide();
                    $root.find('.active').removeClass('active');
                    $this.parent().addClass('active')
                        .find('.menu').show()
                        .find('.item:first').addClass('active');
                }
            };
            /**
             * 初使化
             */
            AppList.prototype.init = function () {
                var _this = this;

                _this.bindEvents();
                $('.app-name').click(function () {
                    _this.LeftMenuHandle($(this));
                });

                //默认选中第一个APP的所有文章
                $('.list-left').find('.app-name:first').click();
            };
        }
    };

    $(function () {
        var appList = new AppList();
        appList.init();
    })
});