seajs.config({
    alias: {
        '$': 'jquery/jquery/2.1.0/jquery',
        'jquery': 'jquery/jquery/2.1.0/jquery',
        'checkbox': 'slate/checkbox/1.0.0/checkbox',
        'dropdown': 'slate/dropdown/1.0.0/dropdown',
        'modal': 'slate/modal/1.0.0/modal',
        'cms.base.js': 'slate/cms-base/1.0.0/cms-base',
        'selecttag': 'slate/selecttag/1.0.0/selecttag',
        'edit.article.css': 'css/cms/edit-article.css'
    }
});

seajs.use(
    [
        '$',
        'cms.base.js',
        'modal',
        'checkbox',
        'dropdown',
        'selecttag',
        'edit.article.css'
    ], function ($, cmsBase) {
        /**
         * 应用列表
         * @constructor
         */
        var AppList = function () {
            var column = [
                {id: '1', name: '栏目一'},
                {id: '2', name: '栏目二'},
                {id: '3', name: '栏目三'},
                {id: '4', name: '栏目四'},
                {id: '5', name: '栏目五'},
                {id: '6', name: '栏目六'},
                {id: '7', name: '栏目七'},
                {id: '8', name: '栏目八'},
                {id: '9', name: '栏目九'}
            ];
            if (typeof this.LeftMenuHandle != 'function') {
                AppList.prototype.bindEvents = function () {
                    $('.ui.checkbox')
                        .checkbox();
                    $('.ui.dropdown')
                        .dropdown({width: 200});
                    $('.select-column').selecttag({
                        valueField: 'id',
                        labelField: 'name',
                        searchField: ['name', 'id'],
                        options: column
                    }).next().show();
                    $('.add-column').selecttag({
                        valueField: 'id',
                        labelField: 'name',
                        searchField: ['name', 'id'],
                        options: column
                    }).next().show();
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
                 * 根据模板打开对话框
                 */
                AppList.prototype.openDialog = function ($dialog, callback) {
                    $dialog
                        .modal('setting', 'closable', false)
                        .modal('show')
                    ;
                    $dialog.
                        find('input[type=text]').focus();

                    if (typeof callback == 'function') {
                        callback();
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

                    $('.add-column-btn').click(function () {
                        _this.openDialog($('.add-column-dialog'));
                    });

                    $('.copy-article-btn').click(function () {
                        _this.openDialog($('.copy-article-dialog'));
                    });
                };
            }
        };

        $(function () {
            var appList = new AppList();
            appList.init();
        })
    });