define(function (require, exports, module) {
    var $ = require('$');

    $.fn.extend({
        // 回调函数在字符串长度统x计完成后触发，this指向应用该插件的DOM元素，实参是统计得到的字符串长度；
        inputCount: function (options, callback) {

            var settings = $.extend({
                eType: 'input',    // 事件类型  (ps：测试发现'input'事件在IE9下使用退格键删减内容时竟然不能触发！)
                isByte: true       // 统计的长度类型, true表示统计字节(一个汉字两个字节)长度; false表示统计字符长度;
            }, options || {});

            // 当调用该插件时实参仅包含回调函数：
            typeof arguments[0] === 'function' && (callback = options);

            this.each(function () {

                var self = $(this),
                    type = settings.eType;

                // 'on'是jQuery 1.7+ 才有的方法
                self.on(type, _handler).triggerHandler(type);

                type === 'input' && self.on('propertychange', function () {   // IE 8-

                    // 如果发生改变的属性不是value就退出
                    if (!window.event || window.event.propertyName !== 'value') return;
                    // 避免循环调用
                    $(this).off('propertychange', arguments.callee);

                    _handler.apply(this);

                    $(this).on('propertychange', arguments.callee);

                }).triggerHandler('propertychange');

            });

            // 长度统计
            function _count(str, b) {
                return b ? str.replace(/[^\x00-\xff]/g, "aa").length : str.length;
            }

            // 事件处理程序
            function _handler(e) {
                var num = _count(this.value, settings.isByte);
                typeof callback === 'function' && callback.apply(this, [num]);
            }

            return this;    // 返回jQuery对象以使其链式操作得以持续
        }

    });


});
