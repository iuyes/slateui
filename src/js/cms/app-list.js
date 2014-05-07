seajs.config({
    alias: {
        '$': 'jquery/jquery/2.1.0/jquery',
        'jquery': 'jquery/jquery/2.1.0/jquery',
        'checkbox': 'slate/checkbox/1.0.0/checkbox',
        'dropdown': 'slate/dropdown/1.0.0/dropdown',
        'modal': 'slate/modal/1.0.0/modal',
        'pagination': 'slate/pagination/1.0.0/pagination',
        'cms.base.js': 'slate/cms-base/1.0.0/cms-base',
        'app.list.css': 'css/cms/app-list.css',
        'selectize': 'jquery/selectize/0.6.13/selectize',
        'selectize.css': 'jquery/selectize/0.6.13/selectize.css'
    }
});

seajs.use(
    [
        '$',
        'cms.base.js',
        'modal',
        'pagination',
        'checkbox',
        'dropdown',
        'selectize',
        'app.list.css',
        'selectize.css'
    ], function ($, cmsBase) {
    /**
     * 应用列表
     * @constructor
     */
    var AppList = function () {

        if (typeof this.LeftMenuHandle != 'function') {
            AppList.prototype.bindEvents = function () {
                $('.ui.checkbox')
                    .checkbox();
                $('.ui.dropdown')
                    .dropdown({width: 200});
                $('.select-column').selectize({
                    valueField: 'id',
                    labelField: 'name',
                    searchField: ['name', 'id'],
                    options: [
                        {id: '1', name: '栏目一'},
                        {id: '2', name: '栏目二'},
                        {id: '3', name: '栏目三'}
                    ]
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
            AppList.prototype.openDialog = function ($dialog) {
                $dialog
                    .modal('setting', 'closable', false)
                    .modal('show')
                ;
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

                //此demo通过Ajax加载分页元素
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
        }
    };

    $(function () {
        var appList = new AppList();
        appList.init();
    })
});