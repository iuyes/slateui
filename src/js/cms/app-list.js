seajs.config({
    alias: {
        '$': 'jquery/jquery/2.1.0/jquery',
        'jquery': 'jquery/jquery/2.1.0/jquery',
        'checkbox': 'slate/checkbox/1.0.0/checkbox',
        'dropdown': 'slate/dropdown/1.0.0/dropdown',
        'calendar': 'arale/calendar/1.0.0/calendar',
        'modal': 'slate/modal/1.0.0/modal',
        'pagination': 'slate/pagination/1.0.0/pagination',
        'cms.base.js': 'slate/cms-base/1.0.0/cms-base',
        'selecttag': 'slate/selecttag/1.0.0/selecttag',
        'app.list.css': 'css/cms/app-list.css',
        'calendar.css': 'arale/calendar/1.0.0/calendar.css'
    }
});

seajs.use(
    [
        '$',
        'cms.base.js',
        'calendar',
        'modal',
        'pagination',
        'checkbox',
        'dropdown',
        'selecttag',
        'app.list.css',
        'calendar.css'
    ], function ($, cmsBase, Calendar) {
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
                 * 分页处理事件
                 */
                AppList.prototype.pageHandle = function () {

                    var initPagination = function () {
                        var num_entries = 200;
                        // 创建分页
                        $(".app-list-page").pagination(num_entries, {
                            num_edge_entries: 2, //边缘页数
                            num_display_entries: 4, //主体页数
                            callback: pageselectCallback,
                            items_per_page: 5
                        });
                    };

                    function pageselectCallback(page_index, jq) {
                        $('.current-page').val(page_index + 1);
                        return false;
                    }

                    initPagination()
                };

                /**
                 * 时间选择
                 */
                AppList.prototype.timeHandle = function () {

                    var c1 = new Calendar({trigger: '.start-time', range: [null, null]})
                    var c2 = new Calendar({trigger: '.end-time', range: [null, null]})

                    c1.on('selectDate', function (date) {
                        c2.range([date, null]);
                    });

                    c2.on('selectDate', function (date) {
                        c1.range([null, date]);
                    });
                };

                /**
                 * 初使化
                 */
                AppList.prototype.init = function () {
                    var _this = this;

                    _this.pageHandle();
                    _this.bindEvents();
                    _this.timeHandle();

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