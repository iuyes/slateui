define("slate/selecttag/1.0.0/selecttag", [ "$","slate/selecttag/1.0.0/selecttag.css" ], function(require, exports, module) {
    /*! selectize.js - v0.6.13 | https://github.com/brianreavis/selectize.js | Apache License (v2) */
    (function(factory) {
        if (typeof exports === "object") {
            factory(require("$"));
        } else if (typeof define === "function" && define.amd) {
            define([ "jquery" ], factory);
        } else {
            factory(jQuery);
        }
    })(function($) {
        "use strict";

        /**
         * highlight v3 | MIT license | Johann Burkard <jb@eaio.com>
         * Highlights arbitrary terms in a node.
         *
         * - Modified by Marshal <beatgates@gmail.com> 2011-6-24 (added regex)
         * - Modified by Brian Reavis <brian@thirdroute.com> 2012-8-27 (cleanup)
         */
        var highlight = function($element, pattern) {
            if (typeof pattern === "string" && !pattern.length) return;
            var regex = typeof pattern === "string" ? new RegExp(pattern, "i") : pattern;
            var highlight = function(node) {
                var skip = 0;
                if (node.nodeType === 3) {
                    var pos = node.data.search(regex);
                    if (pos >= 0 && node.data.length > 0) {
                        var match = node.data.match(regex);
                        var spannode = document.createElement("span");
                        spannode.className = "highlight";
                        var middlebit = node.splitText(pos);
                        var endbit = middlebit.splitText(match[0].length);
                        var middleclone = middlebit.cloneNode(true);
                        spannode.appendChild(middleclone);
                        middlebit.parentNode.replaceChild(spannode, middlebit);
                        skip = 1;
                    }
                } else if (node.nodeType === 1 && node.childNodes && !/(script|style)/i.test(node.tagName)) {
                    for (var i = 0; i < node.childNodes.length; ++i) {
                        i += highlight(node.childNodes[i]);
                    }
                }
                return skip;
            };
            return $element.each(function() {
                highlight(this);
            });
        };
        var unhighlight = function($element) {
            return $element.find("span.highlight").each(function() {
                var parent = this.parentNode;
                parent.replaceChild(parent.firstChild, parent);
                parent.normalize();
            }).end();
        };
        /* --- file: "src/contrib/microevent.js" --- */
        /**
         * MicroEvent - to make any js object an event emitter
         *
         * - pure javascript - server compatible, browser compatible
         * - dont rely on the browser doms
         * - super simple - you get it immediatly, no mistery, no magic involved
         *
         * @author Jerome Etienne (https://github.com/jeromeetienne)
         */
        var MicroEvent = function() {};
        MicroEvent.prototype = {
            on: function(event, fct) {
                this._events = this._events || {};
                this._events[event] = this._events[event] || [];
                this._events[event].push(fct);
            },
            off: function(event, fct) {
                this._events = this._events || {};
                if (event in this._events === false) return;
                this._events[event].splice(this._events[event].indexOf(fct), 1);
            },
            trigger: function(event) {
                this._events = this._events || {};
                if (event in this._events === false) return;
                for (var i = 0; i < this._events[event].length; i++) {
                    this._events[event][i].apply(this, Array.prototype.slice.call(arguments, 1));
                }
            }
        };
        /**
         * Mixin will delegate all MicroEvent.js function in the destination object.
         *
         * - MicroEvent.mixin(Foobar) will make Foobar able to use MicroEvent
         *
         * @param {object} the object which will support MicroEvent
         */
        MicroEvent.mixin = function(destObject) {
            var props = [ "on", "off", "trigger" ];
            for (var i = 0; i < props.length; i++) {
                destObject.prototype[props[i]] = MicroEvent.prototype[props[i]];
            }
        };
        /* --- file: "src/constants.js" --- */
        /**
         * selectize - A highly customizable select control with autocomplete.
         * Copyright (c) 2013 Brian Reavis & contributors
         *
         * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this
         * file except in compliance with the License. You may obtain a copy of the License at:
         * http://www.apache.org/licenses/LICENSE-2.0
         *
         * Unless required by applicable law or agreed to in writing, software distributed under
         * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF
         * ANY KIND, either express or implied. See the License for the specific language
         * governing permissions and limitations under the License.
         *
         * @author Brian Reavis <brian@thirdroute.com>
         */
        var IS_MAC = /Mac/.test(navigator.userAgent);
        var KEY_A = 65;
        var KEY_COMMA = 188;
        var KEY_RETURN = 13;
        var KEY_ESC = 27;
        var KEY_LEFT = 37;
        var KEY_UP = 38;
        var KEY_RIGHT = 39;
        var KEY_DOWN = 40;
        var KEY_BACKSPACE = 8;
        var KEY_DELETE = 46;
        var KEY_SHIFT = 16;
        var KEY_CMD = IS_MAC ? 91 : 17;
        var KEY_CTRL = IS_MAC ? 18 : 17;
        var KEY_TAB = 9;
        var TAG_SELECT = 1;
        var TAG_INPUT = 2;
        var DIACRITICS = {
            a: "[aÀÁÂÃÄÅàáâãäå]",
            c: "[cÇç]",
            e: "[eÈÉÊËèéêë]",
            i: "[iÌÍÎÏìíîï]",
            n: "[nÑñ]",
            o: "[oÒÓÔÕÕÖØòóôõöø]",
            s: "[sŠš]",
            u: "[uÙÚÛÜùúûü]",
            y: "[yŸÿý]",
            z: "[zŽž]"
        };
        /* --- file: "src/plugins.js" --- */
        var Plugins = {};
        Plugins.mixin = function(Interface, interfaceName) {
            Interface.plugins = {};
            /**
             * Initializes the provided functions.
             * Acceptable formats:
             *
             * List (without options):
             *   ['a', 'b', 'c']
             *
             * List (with options)
             *   {'a': { ... }, 'b': { ... }, 'c': { ... }}
             *
             * @param {mixed} plugins
             */
            Interface.prototype.loadPlugins = function(plugins) {
                var i, n, key;
                this.plugins = [];
                this.pluginSettings = {};
                if ($.isArray(plugins)) {
                    for (i = 0, n = plugins.length; i < n; i++) {
                        this.loadPlugin(plugins[i]);
                    }
                } else if (plugins) {
                    this.pluginSettings = $.extend({}, plugins);
                    for (key in plugins) {
                        if (plugins.hasOwnProperty(key)) {
                            this.loadPlugin(key);
                        }
                    }
                }
            };
            /**
             * Initializes a plugin.
             *
             * @param {string} name
             */
            Interface.prototype.loadPlugin = function(name) {
                var plugin, i, n;
                if (this.plugins.indexOf(name) !== -1) return;
                if (!Interface.plugins.hasOwnProperty(name)) {
                    throw new Error(interfaceName + ' unable to find "' + name + '" plugin');
                }
                plugin = Interface.plugins[name];
                // initialize plugin and dependencies
                this.plugins.push(name);
                for (i = 0, n = plugin.dependencies.length; i < n; i++) {
                    this.loadPlugin(plugin.dependencies[i]);
                }
                plugin.fn.apply(this, [ this.pluginSettings[name] || {} ]);
            };
            /**
             * Registers a plugin.
             *
             * @param {string} name
             * @param {array} dependencies (optional)
             * @param {function} fn
             */
            Interface.registerPlugin = function(name) {
                var args = arguments;
                Interface.plugins[name] = {
                    name: name,
                    fn: args[args.length - 1],
                    dependencies: args.length === 3 ? args[1] : []
                };
            };
        };
        /* --- file: "src/utils.js" --- */
        /**
         * Determines if the provided value has been defined.
         *
         * @param {mixed} object
         * @returns {boolean}
         */
        var isset = function(object) {
            return typeof object !== "undefined";
        };
        /**
         * Converts a scalar to its best string representation
         * for hash keys and HTML attribute values.
         *
         * Transformations:
         *   'str'     -> 'str'
         *   null      -> ''
         *   undefined -> ''
         *   true      -> '1'
         *   false     -> '0'
         *   0         -> '0'
         *   1         -> '1'
         *
         * @param {string} value
         * @returns {string}
         */
        var hash_key = function(value) {
            if (typeof value === "undefined" || value === null) return "";
            if (typeof value === "boolean") return value ? "1" : "0";
            return value + "";
        };
        /**
         * Escapes a string for use within HTML.
         *
         * @param {string} str
         * @returns {string}
         */
        var escape_html = function(str) {
            return (str + "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
        };
        /**
         * Escapes a string for use within regular expressions.
         *
         * @param {string} str
         * @returns {string}
         */
        var escape_regex = function(str) {
            return (str + "").replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1");
        };
        /**
         * Escapes quotation marks with backslashes. Useful
         * for escaping values for use in CSS attribute selectors.
         *
         * @param {string} str
         * @return {string}
         */
        var escape_quotes = function(str) {
            return str.replace(/(['"])/g, "\\$1");
        };
        var hook = {};
        /**
         * Wraps `method` on `self` so that `fn`
         * is invoked before the original method.
         *
         * @param {object} self
         * @param {string} method
         * @param {function} fn
         */
        hook.before = function(self, method, fn) {
            var original = self[method];
            self[method] = function() {
                fn.apply(self, arguments);
                return original.apply(self, arguments);
            };
        };
        /**
         * Wraps `method` on `self` so that `fn`
         * is invoked after the original method.
         *
         * @param {object} self
         * @param {string} method
         * @param {function} fn
         */
        hook.after = function(self, method, fn) {
            var original = self[method];
            self[method] = function() {
                var result = original.apply(self, arguments);
                fn.apply(self, arguments);
                return result;
            };
        };
        /**
         * Builds a hash table out of an array of
         * objects, using the specified `key` within
         * each object.
         *
         * @param {string} key
         * @param {mixed} objects
         */
        var build_hash_table = function(key, objects) {
            if (!$.isArray(objects)) return objects;
            var i, n, table = {};
            for (i = 0, n = objects.length; i < n; i++) {
                if (objects[i].hasOwnProperty(key)) {
                    table[objects[i][key]] = objects[i];
                }
            }
            return table;
        };
        /**
         * Wraps `fn` so that it can only be invoked once.
         *
         * @param {function} fn
         * @returns {function}
         */
        var once = function(fn) {
            var called = false;
            return function() {
                if (called) return;
                called = true;
                fn.apply(this, arguments);
            };
        };
        /**
         * Wraps `fn` so that it can only be called once
         * every `delay` milliseconds (invoked on the falling edge).
         *
         * @param {function} fn
         * @param {int} delay
         * @returns {function}
         */
        var debounce = function(fn, delay) {
            var timeout;
            return function() {
                var self = this;
                var args = arguments;
                window.clearTimeout(timeout);
                timeout = window.setTimeout(function() {
                    fn.apply(self, args);
                }, delay);
            };
        };
        /**
         * Debounce all fired events types listed in `types`
         * while executing the provided `fn`.
         *
         * @param {object} self
         * @param {array} types
         * @param {function} fn
         */
        var debounce_events = function(self, types, fn) {
            var type;
            var trigger = self.trigger;
            var event_args = {};
            // override trigger method
            self.trigger = function() {
                var type = arguments[0];
                if (types.indexOf(type) !== -1) {
                    event_args[type] = arguments;
                } else {
                    return trigger.apply(self, arguments);
                }
            };
            // invoke provided function
            fn.apply(self, []);
            self.trigger = trigger;
            // trigger queued events
            for (type in event_args) {
                if (event_args.hasOwnProperty(type)) {
                    trigger.apply(self, event_args[type]);
                }
            }
        };
        /**
         * A workaround for http://bugs.jquery.com/ticket/6696
         *
         * @param {object} $parent - Parent element to listen on.
         * @param {string} event - Event name.
         * @param {string} selector - Descendant selector to filter by.
         * @param {function} fn - Event handler.
         */
        var watchChildEvent = function($parent, event, selector, fn) {
            $parent.on(event, selector, function(e) {
                var child = e.target;
                while (child && child.parentNode !== $parent[0]) {
                    child = child.parentNode;
                }
                e.currentTarget = child;
                return fn.apply(this, [ e ]);
            });
        };
        /**
         * Determines the current selection within a text input control.
         * Returns an object containing:
         *   - start
         *   - length
         *
         * @param {object} input
         * @returns {object}
         */
        var getSelection = function(input) {
            var result = {};
            if ("selectionStart" in input) {
                result.start = input.selectionStart;
                result.length = input.selectionEnd - result.start;
            } else if (document.selection) {
                input.focus();
                var sel = document.selection.createRange();
                var selLen = document.selection.createRange().text.length;
                sel.moveStart("character", -input.value.length);
                result.start = sel.text.length - selLen;
                result.length = selLen;
            }
            return result;
        };
        /**
         * Copies CSS properties from one element to another.
         *
         * @param {object} $from
         * @param {object} $to
         * @param {array} properties
         */
        var transferStyles = function($from, $to, properties) {
            var i, n, styles = {};
            if (properties) {
                for (i = 0, n = properties.length; i < n; i++) {
                    styles[properties[i]] = $from.css(properties[i]);
                }
            } else {
                styles = $from.css();
            }
            $to.css(styles);
        };
        /**
         * Measures the width of a string within a
         * parent element (in pixels).
         *
         * @param {string} str
         * @param {object} $parent
         * @returns {int}
         */
        var measureString = function(str, $parent) {
            var $test = $("<test>").css({
                position: "absolute",
                top: -99999,
                left: -99999,
                width: "auto",
                padding: 0,
                whiteSpace: "nowrap"
            }).text(str).appendTo("body");
            transferStyles($parent, $test, [ "letterSpacing", "fontSize", "fontFamily", "fontWeight", "textTransform" ]);
            var width = $test.width();
            $test.remove();
            return width;
        };
        /**
         * Sets up an input to grow horizontally as the user
         * types. If the value is changed manually, you can
         * trigger the "update" handler to resize:
         *
         * $input.trigger('update');
         *
         * @param {object} $input
         */
        var autoGrow = function($input) {
            var update = function(e) {
                var value, keyCode, printable, placeholder, width;
                var shift, character, selection;
                e = e || window.event || {};
                if (e.metaKey || e.altKey) return;
                if ($input.data("grow") === false) return;
                value = $input.val();
                if (e.type && e.type.toLowerCase() === "keydown") {
                    keyCode = e.keyCode;
                    printable = keyCode >= 97 && keyCode <= 122 || // a-z
                        keyCode >= 65 && keyCode <= 90 || // A-Z
                        keyCode >= 48 && keyCode <= 57 || // 0-9
                        keyCode == 32;
                    if (keyCode === KEY_DELETE || keyCode === KEY_BACKSPACE) {
                        selection = getSelection($input[0]);
                        if (selection.length) {
                            value = value.substring(0, selection.start) + value.substring(selection.start + selection.length);
                        } else if (keyCode === KEY_BACKSPACE && selection.start) {
                            value = value.substring(0, selection.start - 1) + value.substring(selection.start + 1);
                        } else if (keyCode === KEY_DELETE && typeof selection.start !== "undefined") {
                            value = value.substring(0, selection.start) + value.substring(selection.start + 1);
                        }
                    } else if (printable) {
                        shift = e.shiftKey;
                        character = String.fromCharCode(e.keyCode);
                        if (shift) character = character.toUpperCase(); else character = character.toLowerCase();
                        value += character;
                    }
                }
                placeholder = $input.attr("placeholder") || "";
                if (!value.length && placeholder.length) {
                    value = placeholder;
                }
                width = measureString(value, $input) + 4;
                if (width !== $input.width()) {
                    $input.width(width);
                    $input.triggerHandler("resize");
                }
            };
            $input.on("keydown keyup update blur", update);
            update();
        };
        /* --- file: "src/selectize.js" --- */
        /**
         * selectize.js
         * Copyright (c) 2013 Brian Reavis & contributors
         *
         * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this
         * file except in compliance with the License. You may obtain a copy of the License at:
         * http://www.apache.org/licenses/LICENSE-2.0
         *
         * Unless required by applicable law or agreed to in writing, software distributed under
         * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF
         * ANY KIND, either express or implied. See the License for the specific language
         * governing permissions and limitations under the License.
         *
         * @author Brian Reavis <brian@thirdroute.com>
         */
        var Selectize = function($input, settings) {
            var key, i, n, self = this;
            $input[0].selectize = self;
            // setup default state
            $.extend(self, {
                settings: settings,
                $input: $input,
                tagType: $input[0].tagName.toLowerCase() === "select" ? TAG_SELECT : TAG_INPUT,
                highlightedValue: null,
                isOpen: false,
                isDisabled: false,
                isLocked: false,
                isFocused: false,
                isInputFocused: false,
                isInputHidden: false,
                isSetup: false,
                isShiftDown: false,
                isCmdDown: false,
                isCtrlDown: false,
                ignoreFocus: false,
                ignoreHover: false,
                hasOptions: false,
                currentResults: null,
                lastValue: "",
                caretPos: 0,
                loading: 0,
                loadedSearches: {},
                $activeOption: null,
                $activeItems: [],
                optgroups: {},
                options: {},
                userOptions: {},
                items: [],
                renderCache: {},
                onSearchChange: debounce(self.onSearchChange, settings.loadThrottle)
            });
            // build options table
            $.extend(self.options, build_hash_table(settings.valueField, settings.options));
            delete self.settings.options;
            // build optgroup table
            $.extend(self.optgroups, build_hash_table(settings.optgroupValueField, settings.optgroups));
            delete self.settings.optgroups;
            // option-dependent defaults
            self.settings.mode = self.settings.mode || (self.settings.maxItems === 1 ? "single" : "multi");
            if (typeof self.settings.hideSelected !== "boolean") {
                self.settings.hideSelected = self.settings.mode === "multi";
            }
            self.loadPlugins(self.settings.plugins);
            self.setupCallbacks();
            self.setup();
        };
        // mixins
        // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
        MicroEvent.mixin(Selectize);
        Plugins.mixin(Selectize, "Selectize");
        // methods
        // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
        $.extend(Selectize.prototype, {
            /**
             * Creates all elements and sets up event bindings.
             */
            setup: function() {
                var self = this;
                var settings = self.settings;
                var $wrapper;
                var $control;
                var $control_input;
                var $dropdown;
                var $dropdown_content;
                var $dropdown_parent;
                var inputMode;
                var timeout_blur;
                var timeout_focus;
                var tab_index;
                var classes;
                tab_index = self.$input.attr("tabindex") || "";
                classes = self.$input.attr("class") || "";
                $wrapper = $("<div>").addClass(settings.theme).addClass(settings.wrapperClass).addClass(classes);
                $control = $("<div>").addClass(settings.inputClass).addClass("items").toggleClass("has-options", !$.isEmptyObject(self.options)).appendTo($wrapper);
                $control_input = $('<input type="text">').appendTo($control).attr("tabindex", tab_index);
                $dropdown_parent = $(settings.dropdownParent || $wrapper);
                $dropdown = $("<div>").addClass(settings.dropdownClass).hide().appendTo($dropdown_parent);
                $dropdown_content = $("<div>").addClass(settings.dropdownContentClass).appendTo($dropdown);
                $wrapper.css({
                    width: self.$input[0].style.width,
                    display: self.$input.css("display")
                });
                if (self.plugins.length) {
                    $wrapper.addClass("plugin-" + self.plugins.join(" plugin-"));
                }
                inputMode = self.settings.mode;
                $wrapper.toggleClass("single", inputMode === "single");
                $wrapper.toggleClass("multi", inputMode === "multi");
                if ((settings.maxItems === null || settings.maxItems > 1) && self.tagType === TAG_SELECT) {
                    self.$input.attr("multiple", "multiple");
                }
                if (self.settings.placeholder) {
                    $control_input.attr("placeholder", settings.placeholder);
                }
                self.$wrapper = $wrapper;
                self.$control = $control;
                self.$control_input = $control_input;
                self.$dropdown = $dropdown;
                self.$dropdown_content = $dropdown_content;
                $control.on("mousedown", function(e) {
                    if (!e.isDefaultPrevented()) {
                        window.setTimeout(function() {
                            self.focus(true);
                        }, 0);
                    }
                });
                // necessary for mobile webkit devices (manual focus triggering
                // is ignored unless invoked within a click event)
                $control.on("click", function(e) {
                    if (!self.isInputFocused) {
                        self.focus(true);
                    }
                });
                $dropdown.on("mouseenter", "[data-selectable]", function() {
                    return self.onOptionHover.apply(self, arguments);
                });
                $dropdown.on("mousedown", "[data-selectable]", function() {
                    return self.onOptionSelect.apply(self, arguments);
                });
                watchChildEvent($control, "mousedown", "*:not(input)", function() {
                    return self.onItemSelect.apply(self, arguments);
                });
                autoGrow($control_input);
                $control_input.on({
                    mousedown: function(e) {
                        e.stopPropagation();
                    },
                    keydown: function() {
                        return self.onKeyDown.apply(self, arguments);
                    },
                    keyup: function() {
                        return self.onKeyUp.apply(self, arguments);
                    },
                    keypress: function() {
                        return self.onKeyPress.apply(self, arguments);
                    },
                    resize: function() {
                        self.positionDropdown.apply(self, []);
                    },
                    blur: function() {
                        return self.onBlur.apply(self, arguments);
                    },
                    focus: function() {
                        return self.onFocus.apply(self, arguments);
                    }
                });
                $(document).on({
                    keydown: function(e) {
                        self.isCmdDown = e[IS_MAC ? "metaKey" : "ctrlKey"];
                        self.isCtrlDown = e[IS_MAC ? "altKey" : "ctrlKey"];
                        self.isShiftDown = e.shiftKey;
                    },
                    keyup: function(e) {
                        if (e.keyCode === KEY_CTRL) self.isCtrlDown = false;
                        if (e.keyCode === KEY_SHIFT) self.isShiftDown = false;
                        if (e.keyCode === KEY_CMD) self.isCmdDown = false;
                    },
                    mousedown: function(e) {
                        if (self.isFocused) {
                            // prevent events on the dropdown scrollbar from causing the control to blur
                            if (e.target === self.$dropdown[0] || e.target.parentNode === self.$dropdown[0]) {
                                var ignoreFocus = self.ignoreFocus;
                                self.ignoreFocus = true;
                                window.setTimeout(function() {
                                    self.ignoreFocus = ignoreFocus;
                                    self.focus(false);
                                }, 0);
                                return;
                            }
                            // blur on click outside
                            if (!self.$control.has(e.target).length && e.target !== self.$control[0]) {
                                self.blur();
                            }
                        }
                    }
                });
                $(window).on({
                    "scroll resize": function() {
                        if (self.isOpen) {
                            self.positionDropdown.apply(self, arguments);
                        }
                    },
                    mousemove: function() {
                        self.ignoreHover = false;
                    }
                });
                self.$input.attr("tabindex", -1).hide().after(self.$wrapper);
                if ($.isArray(settings.items)) {
                    self.setValue(settings.items);
                    delete settings.items;
                }
                self.updateOriginalInput();
                self.refreshItems();
                self.updatePlaceholder();
                self.isSetup = true;
                if (self.$input.is(":disabled")) {
                    self.disable();
                }
                self.trigger("initialize");
                // preload options
                if (settings.preload) {
                    self.onSearchChange("");
                }
            },
            /**
             * Maps fired events to callbacks provided
             * in the settings used when creating the control.
             */
            setupCallbacks: function() {
                var key, fn, callbacks = {
                    initialize: "onInitialize",
                    change: "onChange",
                    item_add: "onItemAdd",
                    item_remove: "onItemRemove",
                    clear: "onClear",
                    option_add: "onOptionAdd",
                    option_remove: "onOptionRemove",
                    option_clear: "onOptionClear",
                    dropdown_open: "onDropdownOpen",
                    dropdown_close: "onDropdownClose",
                    type: "onType"
                };
                for (key in callbacks) {
                    if (callbacks.hasOwnProperty(key)) {
                        fn = this.settings[callbacks[key]];
                        if (fn) this.on(key, fn);
                    }
                }
            },
            /**
             * Triggers a callback defined in the user-provided settings.
             * Events: onItemAdd, onOptionAdd, etc
             *
             * @param {string} event
             */
            triggerCallback: function(event) {
                var args;
                if (typeof this.settings[event] === "function") {
                    args = Array.prototype.slice.apply(arguments, [ 1 ]);
                    this.settings[event].apply(this, args);
                }
            },
            /**
             * Triggered on <input> keypress.
             *
             * @param {object} e
             * @returns {boolean}
             */
            onKeyPress: function(e) {
                if (this.isLocked) return e && e.preventDefault();
                var character = String.fromCharCode(e.keyCode || e.which);
                if (this.settings.create && character === this.settings.delimiter) {
                    this.createItem();
                    e.preventDefault();
                    return false;
                }
            },
            /**
             * Triggered on <input> keydown.
             *
             * @param {object} e
             * @returns {boolean}
             */
            onKeyDown: function(e) {
                var isInput = e.target === this.$control_input[0];
                var self = this;
                if (self.isLocked) {
                    if (e.keyCode !== KEY_TAB) {
                        e.preventDefault();
                    }
                    return;
                }
                switch (e.keyCode) {
                    case KEY_A:
                        if (self.isCmdDown) {
                            self.selectAll();
                            return;
                        }
                        break;

                    case KEY_ESC:
                        self.blur();
                        return;

                    case KEY_DOWN:
                        if (!self.isOpen && self.hasOptions) {
                            self.open();
                        } else if (self.$activeOption) {
                            self.ignoreHover = true;
                            var $next = self.getAdjacentOption(self.$activeOption, 1);
                            if ($next.length) self.setActiveOption($next, true, true);
                        }
                        e.preventDefault();
                        return;

                    case KEY_UP:
                        if (self.$activeOption) {
                            self.ignoreHover = true;
                            var $prev = self.getAdjacentOption(self.$activeOption, -1);
                            if ($prev.length) self.setActiveOption($prev, true, true);
                        }
                        e.preventDefault();
                        return;

                    case KEY_RETURN:
                        if (self.$activeOption) {
                            self.onOptionSelect({
                                currentTarget: self.$activeOption
                            });
                        }
                        e.preventDefault();
                        return;

                    case KEY_LEFT:
                        self.advanceSelection(-1, e);
                        return;

                    case KEY_RIGHT:
                        self.advanceSelection(1, e);
                        return;

                    case KEY_TAB:
                        if (self.settings.create && $.trim(self.$control_input.val()).length) {
                            self.createItem();
                            e.preventDefault();
                        }
                        return;

                    case KEY_BACKSPACE:
                    case KEY_DELETE:
                        self.deleteSelection(e);
                        return;
                }
                if (self.isFull() || self.isInputHidden) {
                    e.preventDefault();
                    return;
                }
            },
            /**
             * Triggered on <input> keyup.
             *
             * @param {object} e
             * @returns {boolean}
             */
            onKeyUp: function(e) {
                var self = this;
                if (self.isLocked) return e && e.preventDefault();
                var value = self.$control_input.val() || "";
                if (self.lastValue !== value) {
                    self.lastValue = value;
                    self.onSearchChange(value);
                    self.refreshOptions();
                    self.trigger("type", value);
                }
            },
            /**
             * Invokes the user-provide option provider / loader.
             *
             * Note: this function is debounced in the Selectize
             * constructor (by `settings.loadDelay` milliseconds)
             *
             * @param {string} value
             */
            onSearchChange: function(value) {
                var self = this;
                var fn = self.settings.load;
                if (!fn) return;
                if (self.loadedSearches.hasOwnProperty(value)) return;
                self.loadedSearches[value] = true;
                self.load(function(callback) {
                    fn.apply(self, [ value, callback ]);
                });
            },
            /**
             * Triggered on <input> focus.
             *
             * @param {object} e (optional)
             * @returns {boolean}
             */
            onFocus: function(e) {
                var self = this;
                self.isInputFocused = true;
                self.isFocused = true;
                if (self.isDisabled) {
                    self.blur();
                    e.preventDefault();
                    return false;
                }
                if (self.ignoreFocus) return;
                if (self.settings.preload === "focus") self.onSearchChange("");
                self.showInput();
                self.setActiveItem(null);
                self.refreshOptions(!!self.settings.openOnFocus);
                self.refreshClasses();
            },
            /**
             * Triggered on <input> blur.
             *
             * @param {object} e
             * @returns {boolean}
             */
            onBlur: function(e) {
                var self = this;
                self.isInputFocused = false;
                if (self.ignoreFocus) return;
                self.close();
                self.setTextboxValue("");
                self.setActiveItem(null);
                self.setActiveOption(null);
                self.setCaret(self.items.length);
                self.isFocused = false;
                self.refreshClasses();
            },
            /**
             * Triggered when the user rolls over
             * an option in the autocomplete dropdown menu.
             *
             * @param {object} e
             * @returns {boolean}
             */
            onOptionHover: function(e) {
                if (this.ignoreHover) return;
                this.setActiveOption(e.currentTarget, false);
            },
            /**
             * Triggered when the user clicks on an option
             * in the autocomplete dropdown menu.
             *
             * @param {object} e
             * @returns {boolean}
             */
            onOptionSelect: function(e) {
                var value, $target, $option, self = this;
                e.preventDefault && e.preventDefault();
                e.stopPropagation && e.stopPropagation();
                self.focus(false);
                $target = $(e.currentTarget);
                if ($target.hasClass("create")) {
                    self.createItem();
                } else {
                    value = $target.attr("data-value");
                    if (value) {
                        self.setTextboxValue("");
                        self.addItem(value);
                        if (!self.settings.hideSelected && e.type && /mouse/.test(e.type)) {
                            self.setActiveOption(self.getOption(value));
                        }
                    }
                }
            },
            /**
             * Triggered when the user clicks on an item
             * that has been selected.
             *
             * @param {object} e
             * @returns {boolean}
             */
            onItemSelect: function(e) {
                var self = this;
                if (self.settings.mode === "multi") {
                    e.preventDefault();
                    self.setActiveItem(e.currentTarget, e);
                    self.focus(false);
                    self.hideInput();
                }
            },
            /**
             * Invokes the provided method that provides
             * results to a callback---which are then added
             * as options to the control.
             *
             * @param {function} fn
             */
            load: function(fn) {
                var self = this;
                var $wrapper = self.$wrapper.addClass("loading");
                self.loading++;
                fn.apply(self, [ function(results) {
                    self.loading = Math.max(self.loading - 1, 0);
                    if (results && results.length) {
                        self.addOption(results);
                        self.refreshOptions(false);
                        if (self.isInputFocused) self.open();
                    }
                    if (!self.loading) {
                        $wrapper.removeClass("loading");
                    }
                    self.trigger("load", results);
                } ]);
            },
            /**
             * Sets the input field of the control to the specified value.
             *
             * @param {string} value
             */
            setTextboxValue: function(value) {
                this.$control_input.val(value).triggerHandler("update");
                this.lastValue = value;
            },
            /**
             * Returns the value of the control. If multiple items
             * can be selected (e.g. <select multiple>), this returns
             * an array. If only one item can be selected, this
             * returns a string.
             *
             * @returns {mixed}
             */
            getValue: function() {
                if (this.tagType === TAG_SELECT && this.$input.attr("multiple")) {
                    return this.items;
                } else {
                    return this.items.join(this.settings.delimiter);
                }
            },
            /**
             * Resets the selected items to the given value.
             *
             * @param {mixed} value
             */
            setValue: function(value) {
                debounce_events(this, [ "change" ], function() {
                    this.clear();
                    var items = $.isArray(value) ? value : [ value ];
                    for (var i = 0, n = items.length; i < n; i++) {
                        this.addItem(items[i]);
                    }
                });
            },
            /**
             * Sets the selected item.
             *
             * @param {object} $item
             * @param {object} e (optional)
             */
            setActiveItem: function($item, e) {
                var self = this;
                var eventName;
                var i, idx, begin, end, item, swap;
                var $last;
                $item = $($item);
                // clear the active selection
                if (!$item.length) {
                    $(self.$activeItems).removeClass("active");
                    self.$activeItems = [];
                    self.isFocused = self.isInputFocused;
                    return;
                }
                // modify selection
                eventName = e && e.type.toLowerCase();
                if (eventName === "mousedown" && self.isShiftDown && self.$activeItems.length) {
                    $last = self.$control.children(".active:last");
                    begin = Array.prototype.indexOf.apply(self.$control[0].childNodes, [ $last[0] ]);
                    end = Array.prototype.indexOf.apply(self.$control[0].childNodes, [ $item[0] ]);
                    if (begin > end) {
                        swap = begin;
                        begin = end;
                        end = swap;
                    }
                    for (i = begin; i <= end; i++) {
                        item = self.$control[0].childNodes[i];
                        if (self.$activeItems.indexOf(item) === -1) {
                            $(item).addClass("active");
                            self.$activeItems.push(item);
                        }
                    }
                    e.preventDefault();
                } else if (eventName === "mousedown" && self.isCtrlDown || eventName === "keydown" && this.isShiftDown) {
                    if ($item.hasClass("active")) {
                        idx = self.$activeItems.indexOf($item[0]);
                        self.$activeItems.splice(idx, 1);
                        $item.removeClass("active");
                    } else {
                        self.$activeItems.push($item.addClass("active")[0]);
                    }
                } else {
                    $(self.$activeItems).removeClass("active");
                    self.$activeItems = [ $item.addClass("active")[0] ];
                }
                self.isFocused = !!self.$activeItems.length || self.isInputFocused;
            },
            /**
             * Sets the selected item in the dropdown menu
             * of available options.
             *
             * @param {object} $object
             * @param {boolean} scroll
             * @param {boolean} animate
             */
            setActiveOption: function($option, scroll, animate) {
                var height_menu, height_item, y;
                var scroll_top, scroll_bottom;
                var self = this;
                if (self.$activeOption) self.$activeOption.removeClass("active");
                self.$activeOption = null;
                $option = $($option);
                if (!$option.length) return;
                self.$activeOption = $option.addClass("active");
                if (scroll || !isset(scroll)) {
                    height_menu = self.$dropdown_content.height();
                    height_item = self.$activeOption.outerHeight(true);
                    scroll = self.$dropdown_content.scrollTop() || 0;
                    y = self.$activeOption.offset().top - self.$dropdown_content.offset().top + scroll;
                    scroll_top = y;
                    scroll_bottom = y - height_menu + height_item;
                    if (y + height_item > height_menu - scroll) {
                        self.$dropdown_content.stop().animate({
                            scrollTop: scroll_bottom
                        }, animate ? self.settings.scrollDuration : 0);
                    } else if (y < scroll) {
                        self.$dropdown_content.stop().animate({
                            scrollTop: scroll_top
                        }, animate ? self.settings.scrollDuration : 0);
                    }
                }
            },
            /**
             * Selects all items (CTRL + A).
             */
            selectAll: function() {
                this.$activeItems = Array.prototype.slice.apply(this.$control.children(":not(input)").addClass("active"));
                this.isFocused = true;
                if (this.$activeItems.length) this.hideInput();
            },
            /**
             * Hides the input element out of view, while
             * retaining its focus.
             */
            hideInput: function() {
                var self = this;
                self.close();
                self.setTextboxValue("");
                self.$control_input.css({
                    opacity: 0,
                    position: "absolute",
                    left: -1e4
                });
                self.isInputHidden = true;
            },
            /**
             * Restores input visibility.
             */
            showInput: function() {
                this.$control_input.css({
                    opacity: 1,
                    position: "relative",
                    left: 0
                });
                this.isInputHidden = false;
            },
            /**
             * Gives the control focus. If "trigger" is falsy,
             * focus handlers won't be fired--causing the focus
             * to happen silently in the background.
             *
             * @param {boolean} trigger
             */
            focus: function(trigger) {
                var self = this;
                if (self.isDisabled) return;
                self.ignoreFocus = true;
                self.$control_input[0].focus();
                self.isInputFocused = true;
                window.setTimeout(function() {
                    self.ignoreFocus = false;
                    if (trigger) self.onFocus();
                }, 0);
            },
            /**
             * Forces the control out of focus.
             */
            blur: function() {
                this.$control_input.trigger("blur");
            },
            /**
             * Splits a search string into an array of
             * individual regexps to be used to match results.
             *
             * @param {string} query
             * @returns {array}
             */
            parseSearchTokens: function(query) {
                query = $.trim(String(query || "").toLowerCase());
                if (!query || !query.length) return [];
                var i, n, regex, letter;
                var tokens = [];
                var words = query.split(/ +/);
                for (i = 0, n = words.length; i < n; i++) {
                    regex = escape_regex(words[i]);
                    if (this.settings.diacritics) {
                        for (letter in DIACRITICS) {
                            if (DIACRITICS.hasOwnProperty(letter)) {
                                regex = regex.replace(new RegExp(letter, "g"), DIACRITICS[letter]);
                            }
                        }
                    }
                    tokens.push({
                        string: words[i],
                        regex: new RegExp(regex, "i")
                    });
                }
                return tokens;
            },
            /**
             * Returns a function to be used to score individual results.
             * Results will be sorted by the score (descending). Scores less
             * than or equal to zero (no match) will not be included in the results.
             *
             * @param {object} data
             * @param {object} search
             * @returns {function}
             */
            getScoreFunction: function(search) {
                var self = this;
                var tokens = search.tokens;
                var calculateFieldScore = function() {
                    if (!tokens.length) {
                        return function() {
                            return 0;
                        };
                    } else if (tokens.length === 1) {
                        return function(value) {
                            var score, pos;
                            value = String(value || "").toLowerCase();
                            pos = value.search(tokens[0].regex);
                            if (pos === -1) return 0;
                            score = tokens[0].string.length / value.length;
                            if (pos === 0) score += .5;
                            return score;
                        };
                    } else {
                        return function(value) {
                            var score, pos, i, j;
                            value = String(value || "").toLowerCase();
                            score = 0;
                            for (i = 0, j = tokens.length; i < j; i++) {
                                pos = value.search(tokens[i].regex);
                                if (pos === -1) return 0;
                                if (pos === 0) score += .5;
                                score += tokens[i].string.length / value.length;
                            }
                            return score / tokens.length;
                        };
                    }
                }();
                var calculateScore = function() {
                    var fields = self.settings.searchField;
                    if (typeof fields === "string") {
                        fields = [ fields ];
                    }
                    if (!fields || !fields.length) {
                        return function() {
                            return 0;
                        };
                    } else if (fields.length === 1) {
                        var field = fields[0];
                        return function(data) {
                            if (!data.hasOwnProperty(field)) return 0;
                            return calculateFieldScore(data[field]);
                        };
                    } else {
                        return function(data) {
                            var n = 0;
                            var score = 0;
                            for (var i = 0, j = fields.length; i < j; i++) {
                                if (data.hasOwnProperty(fields[i])) {
                                    score += calculateFieldScore(data[fields[i]]);
                                    n++;
                                }
                            }
                            return score / n;
                        };
                    }
                }();
                return calculateScore;
            },
            /**
             * Searches through available options and returns
             * a sorted array of matches. Includes options that
             * have already been selected.
             *
             * The `settings` parameter can contain:
             *
             *   - searchField
             *   - sortField
             *   - sortDirection
             *
             * Returns an object containing:
             *
             *   - query {string}
             *   - tokens {array}
             *   - total {int}
             *   - items {array}
             *
             * @param {string} query
             * @param {object} settings
             * @returns {object}
             */
            search: function(query, settings) {
                var self = this;
                var value, score, search, calculateScore;
                settings = settings || {};
                query = $.trim(String(query || "").toLowerCase());
                if (query !== self.lastQuery) {
                    self.lastQuery = query;
                    search = {
                        query: query,
                        tokens: self.parseSearchTokens(query),
                        total: 0,
                        items: []
                    };
                    // generate result scoring function
                    if (self.settings.score) {
                        calculateScore = self.settings.score.apply(this, [ search ]);
                        if (typeof calculateScore !== "function") {
                            throw new Error('Selectize "score" setting must be a function that returns a function');
                        }
                    } else {
                        calculateScore = self.getScoreFunction(search);
                    }
                    // perform search and sort
                    if (query.length) {
                        for (value in self.options) {
                            if (self.options.hasOwnProperty(value)) {
                                score = calculateScore(self.options[value]);
                                if (score > 0) {
                                    search.items.push({
                                        score: score,
                                        value: value
                                    });
                                }
                            }
                        }
                        search.items.sort(function(a, b) {
                            return b.score - a.score;
                        });
                    } else {
                        for (value in self.options) {
                            if (self.options.hasOwnProperty(value)) {
                                search.items.push({
                                    score: 1,
                                    value: value
                                });
                            }
                        }
                        if (self.settings.sortField) {
                            search.items.sort(function() {
                                var field = self.settings.sortField;
                                var multiplier = self.settings.sortDirection === "desc" ? -1 : 1;
                                return function(a, b) {
                                    a = a && String(self.options[a.value][field] || "").toLowerCase();
                                    b = b && String(self.options[b.value][field] || "").toLowerCase();
                                    if (a > b) return 1 * multiplier;
                                    if (b > a) return -1 * multiplier;
                                    return 0;
                                };
                            }());
                        }
                    }
                    self.currentResults = search;
                } else {
                    search = $.extend(true, {}, self.currentResults);
                }
                // apply limits and return
                return self.prepareResults(search, settings);
            },
            /**
             * Filters out any items that have already been selected
             * and applies search limits.
             *
             * @param {object} results
             * @param {object} settings
             * @returns {object}
             */
            prepareResults: function(search, settings) {
                if (this.settings.hideSelected) {
                    for (var i = search.items.length - 1; i >= 0; i--) {
                        if (this.items.indexOf(String(search.items[i].value)) !== -1) {
                            search.items.splice(i, 1);
                        }
                    }
                }
                search.total = search.items.length;
                if (typeof settings.limit === "number") {
                    search.items = search.items.slice(0, settings.limit);
                }
                return search;
            },
            /**
             * Refreshes the list of available options shown
             * in the autocomplete dropdown menu.
             *
             * @param {boolean} triggerDropdown
             */
            refreshOptions: function(triggerDropdown) {
                if (typeof triggerDropdown === "undefined") {
                    triggerDropdown = true;
                }
                var self = this;
                var i, n, groups, groups_order, option, optgroup, html, html_children;
                var hasCreateOption;
                var query = self.$control_input.val();
                var results = self.search(query, {});
                var $active, $create;
                var $dropdown_content = self.$dropdown_content;
                // build markup
                n = results.items.length;
                if (typeof self.settings.maxOptions === "number") {
                    n = Math.min(n, self.settings.maxOptions);
                }
                // render and group available options individually
                groups = {};
                if (self.settings.optgroupOrder) {
                    groups_order = self.settings.optgroupOrder;
                    for (i = 0; i < groups_order.length; i++) {
                        groups[groups_order[i]] = [];
                    }
                } else {
                    groups_order = [];
                }
                for (i = 0; i < n; i++) {
                    option = self.options[results.items[i].value];
                    optgroup = option[self.settings.optgroupField] || "";
                    if (!self.optgroups.hasOwnProperty(optgroup)) {
                        optgroup = "";
                    }
                    if (!groups.hasOwnProperty(optgroup)) {
                        groups[optgroup] = [];
                        groups_order.push(optgroup);
                    }
                    groups[optgroup].push(self.render("option", option));
                }
                // render optgroup headers & join groups
                html = [];
                for (i = 0, n = groups_order.length; i < n; i++) {
                    optgroup = groups_order[i];
                    if (self.optgroups.hasOwnProperty(optgroup) && groups[optgroup].length) {
                        // render the optgroup header and options within it,
                        // then pass it to the wrapper template
                        html_children = self.render("optgroup_header", self.optgroups[optgroup]) || "";
                        html_children += groups[optgroup].join("");
                        html.push(self.render("optgroup", $.extend({}, self.optgroups[optgroup], {
                            html: html_children
                        })));
                    } else {
                        html.push(groups[optgroup].join(""));
                    }
                }
                $dropdown_content.html(html.join(""));
                // highlight matching terms inline
                if (self.settings.highlight && results.query.length && results.tokens.length) {
                    for (i = 0, n = results.tokens.length; i < n; i++) {
                        highlight($dropdown_content, results.tokens[i].regex);
                    }
                }
                // add "selected" class to selected options
                if (!self.settings.hideSelected) {
                    for (i = 0, n = self.items.length; i < n; i++) {
                        self.getOption(self.items[i]).addClass("selected");
                    }
                }
                // add create option
                hasCreateOption = self.settings.create && results.query.length;
                if (hasCreateOption) {
                    $dropdown_content.prepend(self.render("option_create", {
                        input: query
                    }));
                    $create = $($dropdown_content[0].childNodes[0]);
                }
                // activate
                self.hasOptions = results.items.length > 0 || hasCreateOption;
                if (self.hasOptions) {
                    if (results.items.length > 0) {
                        if ($create) {
                            $active = self.getAdjacentOption($create, 1);
                        } else {
                            $active = $dropdown_content.find("[data-selectable]").first();
                        }
                    } else {
                        $active = $create;
                    }
                    self.setActiveOption($active);
                    if (triggerDropdown && !self.isOpen) {
                        self.open();
                    }
                } else {
                    self.setActiveOption(null);
                    if (triggerDropdown && self.isOpen) {
                        self.close();
                    }
                }
            },
            /**
             * Adds an available option. If it already exists,
             * nothing will happen. Note: this does not refresh
             * the options list dropdown (use `refreshOptions`
             * for that).
             *
             * Usage:
             *
             *   this.addOption(value, data)
             *   this.addOption(data)
             *
             * @param {string} value
             * @param {object} data
             */
            addOption: function(value, data) {
                var i, n, optgroup, self = this;
                if ($.isArray(value)) {
                    for (i = 0, n = value.length; i < n; i++) {
                        self.addOption(value[i][self.settings.valueField], value[i]);
                    }
                    return;
                }
                value = hash_key(value);
                if (self.options.hasOwnProperty(value)) return;
                self.userOptions[value] = true;
                self.options[value] = data;
                self.lastQuery = null;
                self.trigger("option_add", value, data);
            },
            /**
             * Registers a new optgroup for options
             * to be bucketed into.
             *
             * @param {string} id
             * @param {object} data
             */
            addOptionGroup: function(id, data) {
                this.optgroups[id] = data;
                this.trigger("optgroup_add", value, data);
            },
            /**
             * Updates an option available for selection. If
             * it is visible in the selected items or options
             * dropdown, it will be re-rendered automatically.
             *
             * @param {string} value
             * @param {object} data
             */
            updateOption: function(value, data) {
                var self = this;
                var $item, $item_new;
                var value_new, index_item, cache_items, cache_options;
                value = hash_key(value);
                value_new = hash_key(data[self.settings.valueField]);
                // sanity checks
                if (!self.options.hasOwnProperty(value)) return;
                if (!value_new) throw new Error("Value must be set in option data");
                // update references
                if (value_new !== value) {
                    delete self.options[value];
                    index_item = self.items.indexOf(value);
                    if (index_item !== -1) {
                        self.items.splice(index_item, 1, value_new);
                    }
                }
                self.options[value_new] = data;
                // invalidate render cache
                cache_items = self.renderCache["item"];
                cache_options = self.renderCache["option"];
                if (isset(cache_items)) {
                    delete cache_items[value];
                    delete cache_items[value_new];
                }
                if (isset(cache_options)) {
                    delete cache_options[value];
                    delete cache_options[value_new];
                }
                // update the item if it's selected
                if (self.items.indexOf(value_new) !== -1) {
                    $item = self.getItem(value);
                    $item_new = $(self.render("item", data));
                    if ($item.hasClass("active")) $item_new.addClass("active");
                    $item.replaceWith($item_new);
                }
                // update dropdown contents
                if (self.isOpen) {
                    self.refreshOptions(false);
                }
            },
            /**
             * Removes a single option.
             *
             * @param {string} value
             */
            removeOption: function(value) {
                var self = this;
                value = hash_key(value);
                delete self.userOptions[value];
                delete self.options[value];
                self.lastQuery = null;
                self.trigger("option_remove", value);
                self.removeItem(value);
            },
            /**
             * Clears all options.
             */
            clearOptions: function() {
                var self = this;
                self.loadedSearches = {};
                self.userOptions = {};
                self.options = {};
                self.lastQuery = null;
                self.trigger("option_clear");
                self.clear();
            },
            /**
             * Returns the jQuery element of the option
             * matching the given value.
             *
             * @param {string} value
             * @returns {object}
             */
            getOption: function(value) {
                value = hash_key(value);
                return value ? this.$dropdown_content.find("[data-selectable]").filter('[data-value="' + escape_quotes(value) + '"]:first') : $();
            },
            /**
             * Returns the jQuery element of the next or
             * previous selectable option.
             *
             * @param {object} $option
             * @param {int} direction  can be 1 for next or -1 for previous
             * @return {object}
             */
            getAdjacentOption: function($option, direction) {
                var $options = this.$dropdown.find("[data-selectable]");
                var index = $options.index($option) + direction;
                return index >= 0 && index < $options.length ? $options.eq(index) : $();
            },
            /**
             * Returns the jQuery element of the item
             * matching the given value.
             *
             * @param {string} value
             * @returns {object}
             */
            getItem: function(value) {
                return this.$control.children('[data-value="' + escape_quotes(hash_key(value)) + '"]');
            },
            /**
             * "Selects" an item. Adds it to the list
             * at the current caret position.
             *
             * @param {string} value
             */
            addItem: function(value) {
                debounce_events(this, [ "change" ], function() {
                    var $item, $option;
                    var self = this;
                    var inputMode = self.settings.mode;
                    var i, active, options, value_next;
                    value = hash_key(value);
                    if (inputMode === "single") self.clear();
                    if (inputMode === "multi" && self.isFull()) return;
                    if (self.items.indexOf(value) !== -1) return;
                    if (!self.options.hasOwnProperty(value)) return;
                    $item = $(self.render("item", self.options[value]));
                    self.items.splice(self.caretPos, 0, value);
                    self.insertAtCaret($item);
                    self.refreshClasses();
                    if (self.isSetup) {
                        options = self.$dropdown_content.find("[data-selectable]");
                        // update menu / remove the option
                        $option = self.getOption(value);
                        value_next = self.getAdjacentOption($option, 1).attr("data-value");
                        self.refreshOptions(self.isFocused && inputMode !== "single");
                        if (value_next) {
                            self.setActiveOption(self.getOption(value_next));
                        }
                        // hide the menu if the maximum number of items have been selected or no options are left
                        if (!options.length || self.settings.maxItems !== null && self.items.length >= self.settings.maxItems) {
                            self.close();
                        } else {
                            self.positionDropdown();
                        }
                        // restore focus to input
                        if (self.isFocused) {
                            window.setTimeout(function() {
                                if (inputMode === "single") {
                                    self.blur();
                                    self.focus(false);
                                    self.hideInput();
                                } else {
                                    self.focus(false);
                                }
                            }, 0);
                        }
                        self.updatePlaceholder();
                        self.trigger("item_add", value, $item);
                        self.updateOriginalInput();
                    }
                });
            },
            /**
             * Removes the selected item matching
             * the provided value.
             *
             * @param {string} value
             */
            removeItem: function(value) {
                var self = this;
                var $item, i, idx;
                $item = typeof value === "object" ? value : self.getItem(value);
                value = hash_key($item.attr("data-value"));
                i = self.items.indexOf(value);
                if (i !== -1) {
                    $item.remove();
                    if ($item.hasClass("active")) {
                        idx = self.$activeItems.indexOf($item[0]);
                        self.$activeItems.splice(idx, 1);
                    }
                    self.items.splice(i, 1);
                    self.lastQuery = null;
                    if (!self.settings.persist && self.userOptions.hasOwnProperty(value)) {
                        self.removeOption(value);
                    }
                    if (i < self.caretPos) {
                        self.setCaret(self.caretPos - 1);
                    }
                    self.refreshClasses();
                    self.updatePlaceholder();
                    self.updateOriginalInput();
                    self.positionDropdown();
                    self.trigger("item_remove", value);
                }
            },
            /**
             * Invokes the `create` method provided in the
             * selectize options that should provide the data
             * for the new item, given the user input.
             *
             * Once this completes, it will be added
             * to the item list.
             */
            createItem: function() {
                var self = this;
                var input = $.trim(self.$control_input.val() || "");
                var caret = self.caretPos;
                if (!input.length) return;
                self.lock();
                var setup = typeof self.settings.create === "function" ? this.settings.create : function(input) {
                    var data = {};
                    data[self.settings.labelField] = input;
                    data[self.settings.valueField] = input;
                    return data;
                };
                var create = once(function(data) {
                    self.unlock();
                    self.focus(false);
                    if (!data || typeof data !== "object") return;
                    var value = hash_key(data[self.settings.valueField]);
                    if (!value) return;
                    self.setTextboxValue("");
                    self.addOption(value, data);
                    self.setCaret(caret);
                    self.addItem(value);
                    self.refreshOptions(self.settings.mode !== "single");
                    self.focus(false);
                });
                var output = setup.apply(this, [ input, create ]);
                if (typeof output !== "undefined") {
                    create(output);
                }
            },
            /**
             * Re-renders the selected item lists.
             */
            refreshItems: function() {
                this.lastQuery = null;
                if (this.isSetup) {
                    for (var i = 0; i < this.items.length; i++) {
                        this.addItem(this.items);
                    }
                }
                this.refreshClasses();
                this.updateOriginalInput();
            },
            /**
             * Updates all state-dependent CSS classes.
             */
            refreshClasses: function() {
                var self = this;
                var isFull = self.isFull();
                var isLocked = self.isLocked;
                this.$control.toggleClass("focus", self.isFocused).toggleClass("disabled", self.isDisabled).toggleClass("locked", isLocked).toggleClass("full", isFull).toggleClass("not-full", !isFull).toggleClass("dropdown-active", self.isOpen).toggleClass("has-items", self.items.length > 0);
                this.$control_input.data("grow", !isFull && !isLocked);
            },
            /**
             * Determines whether or not more items can be added
             * to the control without exceeding the user-defined maximum.
             *
             * @returns {boolean}
             */
            isFull: function() {
                return this.settings.maxItems !== null && this.items.length >= this.settings.maxItems;
            },
            /**
             * Refreshes the original <select> or <input>
             * element to reflect the current state.
             */
            updateOriginalInput: function() {
                var i, n, options, self = this;
                if (self.$input[0].tagName.toLowerCase() === "select") {
                    options = [];
                    for (i = 0, n = self.items.length; i < n; i++) {
                        options.push('<option value="' + escape_html(self.items[i]) + '" selected="selected"></option>');
                    }
                    if (!options.length && !this.$input.attr("multiple")) {
                        options.push('<option value="" selected="selected"></option>');
                    }
                    self.$input.html(options.join(""));
                } else {
                    self.$input.val(self.getValue());
                }
                self.$input.trigger("change");
                if (self.isSetup) {
                    self.trigger("change", self.$input.val());
                }
            },
            /**
             * Shows/hide the input placeholder depending
             * on if there items in the list already.
             */
            updatePlaceholder: function() {
                if (!this.settings.placeholder) return;
                var $input = this.$control_input;
                if (this.items.length) {
                    $input.removeAttr("placeholder");
                } else {
                    $input.attr("placeholder", this.settings.placeholder);
                }
                $input.triggerHandler("update");
            },
            /**
             * Shows the autocomplete dropdown containing
             * the available options.
             */
            open: function() {
                var self = this;
                if (self.isLocked || self.isOpen || self.settings.mode === "multi" && self.isFull()) return;
                self.focus(true);
                self.isOpen = true;
                self.refreshClasses();
                self.$dropdown.css({
                    visibility: "hidden",
                    display: "block"
                });
                self.positionDropdown();
                self.$dropdown.css({
                    visibility: "visible"
                });
                self.trigger("dropdown_open", this.$dropdown);
            },
            /**
             * Closes the autocomplete dropdown menu.
             */
            close: function() {
                var self = this;
                if (!self.isOpen) return;
                self.$dropdown.hide();
                self.setActiveOption(null);
                self.isOpen = false;
                self.refreshClasses();
                self.trigger("dropdown_close", self.$dropdown);
            },
            /**
             * Calculates and applies the appropriate
             * position of the dropdown.
             */
            positionDropdown: function() {
                var $control = this.$control;
                var offset = this.settings.dropdownParent === "body" ? $control.offset() : $control.position();
                offset.top += $control.outerHeight(true);
                this.$dropdown.css({
                    width: $control.outerWidth(),
                    top: offset.top,
                    left: offset.left
                });
            },
            /**
             * Resets / clears all selected items
             * from the control.
             */
            clear: function() {
                var self = this;
                if (!self.items.length) return;
                self.$control.children(":not(input)").remove();
                self.items = [];
                self.setCaret(0);
                self.updatePlaceholder();
                self.updateOriginalInput();
                self.refreshClasses();
                self.showInput();
                self.trigger("clear");
            },
            /**
             * A helper method for inserting an element
             * at the current caret position.
             *
             * @param {object} $el
             */
            insertAtCaret: function($el) {
                var caret = Math.min(this.caretPos, this.items.length);
                if (caret === 0) {
                    this.$control.prepend($el);
                } else {
                    $(this.$control[0].childNodes[caret]).before($el);
                }
                this.setCaret(caret + 1);
            },
            /**
             * Removes the current selected item(s).
             *
             * @param {object} e (optional)
             * @returns {boolean}
             */
            deleteSelection: function(e) {
                var i, n, direction, selection, values, caret, option_select, $option_select, $tail;
                var self = this;
                direction = e && e.keyCode === KEY_BACKSPACE ? -1 : 1;
                selection = getSelection(self.$control_input[0]);
                if (self.$activeOption && !self.settings.hideSelected) {
                    option_select = self.getAdjacentOption(self.$activeOption, -1).attr("data-value");
                }
                // determine items that will be removed
                values = [];
                if (self.$activeItems.length) {
                    $tail = self.$control.children(".active:" + (direction > 0 ? "last" : "first"));
                    caret = self.$control.children(":not(input)").index($tail);
                    if (direction > 0) {
                        caret++;
                    }
                    for (i = 0, n = self.$activeItems.length; i < n; i++) {
                        values.push($(self.$activeItems[i]).attr("data-value"));
                    }
                    if (e) {
                        e.preventDefault();
                        e.stopPropagation();
                    }
                } else if ((self.isFocused || self.settings.mode === "single") && self.items.length) {
                    if (direction < 0 && selection.start === 0 && selection.length === 0) {
                        values.push(self.items[self.caretPos - 1]);
                    } else if (direction > 0 && selection.start === self.$control_input.val().length) {
                        values.push(self.items[self.caretPos]);
                    }
                }
                // allow the callback to abort
                if (!values.length || typeof self.settings.onDelete === "function" && self.settings.onDelete(values) === false) {
                    return false;
                }
                // perform removal
                if (typeof caret !== "undefined") {
                    self.setCaret(caret);
                }
                while (values.length) {
                    self.removeItem(values.pop());
                }
                self.showInput();
                self.refreshOptions(true);
                // select previous option
                if (option_select) {
                    $option_select = self.getOption(option_select);
                    if ($option_select.length) {
                        self.setActiveOption($option_select);
                    }
                }
                return true;
            },
            /**
             * Selects the previous / next item (depending
             * on the `direction` argument).
             *
             * > 0 - right
             * < 0 - left
             *
             * @param {int} direction
             * @param {object} e (optional)
             */
            advanceSelection: function(direction, e) {
                var tail, selection, idx, valueLength, cursorAtEdge, $tail;
                var self = this;
                if (direction === 0) return;
                tail = direction > 0 ? "last" : "first";
                selection = getSelection(self.$control_input[0]);
                if (self.isInputFocused && !self.isInputHidden) {
                    valueLength = self.$control_input.val().length;
                    cursorAtEdge = direction < 0 ? selection.start === 0 && selection.length === 0 : selection.start === valueLength;
                    if (cursorAtEdge && !valueLength) {
                        self.advanceCaret(direction, e);
                    }
                } else {
                    $tail = self.$control.children(".active:" + tail);
                    if ($tail.length) {
                        idx = self.$control.children(":not(input)").index($tail);
                        self.setActiveItem(null);
                        self.setCaret(direction > 0 ? idx + 1 : idx);
                        self.showInput();
                    }
                }
            },
            /**
             * Moves the caret left / right.
             *
             * @param {int} direction
             * @param {object} e (optional)
             */
            advanceCaret: function(direction, e) {
                if (direction === 0) return;
                var self = this;
                var fn = direction > 0 ? "next" : "prev";
                if (self.isShiftDown) {
                    var $adj = self.$control_input[fn]();
                    if ($adj.length) {
                        self.hideInput();
                        self.setActiveItem($adj);
                        e && e.preventDefault();
                    }
                } else {
                    self.setCaret(self.caretPos + direction);
                }
            },
            /**
             * Moves the caret to the specified index.
             *
             * @param {int} i
             */
            setCaret: function(i) {
                var self = this;
                if (self.settings.mode === "single") {
                    i = self.items.length;
                } else {
                    i = Math.max(0, Math.min(self.items.length, i));
                }
                // the input must be moved by leaving it in place and moving the
                // siblings, due to the fact that focus cannot be restored once lost
                // on mobile webkit devices
                var j, n, fn, $children, $child;
                $children = self.$control.children(":not(input)");
                for (j = 0, n = $children.length; j < n; j++) {
                    $child = $($children[j]).detach();
                    if (j < i) {
                        self.$control_input.before($child);
                    } else {
                        self.$control.append($child);
                    }
                }
                self.caretPos = i;
            },
            /**
             * Disables user input on the control. Used while
             * items are being asynchronously created.
             */
            lock: function() {
                this.close();
                this.isLocked = true;
                this.refreshClasses();
            },
            /**
             * Re-enables user input on the control.
             */
            unlock: function() {
                this.isLocked = false;
                this.refreshClasses();
            },
            /**
             * Disables user input on the control completely.
             * While disabled, it cannot receive focus.
             */
            disable: function() {
                this.isDisabled = true;
                this.lock();
            },
            /**
             * Enables the control so that it can respond
             * to focus and user input.
             */
            enable: function() {
                this.isDisabled = false;
                this.unlock();
            },
            /**
             * A helper method for rendering "item" and
             * "option" templates, given the data.
             *
             * @param {string} templateName
             * @param {object} data
             * @returns {string}
             */
            render: function(templateName, data) {
                var value, id, label;
                var html = "";
                var cache = false;
                var self = this;
                var regex_tag = /^[\	 ]*<([a-z][a-z0-9\-_]*(?:\:[a-z][a-z0-9\-_]*)?)/i;
                if (templateName === "option" || templateName === "item") {
                    value = hash_key(data[self.settings.valueField]);
                    cache = !!value;
                }
                // pull markup from cache if it exists
                if (cache) {
                    if (!isset(self.renderCache[templateName])) {
                        self.renderCache[templateName] = {};
                    }
                    if (self.renderCache[templateName].hasOwnProperty(value)) {
                        return self.renderCache[templateName][value];
                    }
                }
                // render markup
                if (self.settings.render && typeof self.settings.render[templateName] === "function") {
                    html = self.settings.render[templateName].apply(this, [ data, escape_html ]);
                } else {
                    label = data[self.settings.labelField];
                    switch (templateName) {
                        case "optgroup":
                            html = '<div class="optgroup">' + data.html + "</div>";
                            break;

                        case "optgroup_header":
                            label = data[self.settings.optgroupLabelField];
                            html = '<div class="optgroup-header">' + escape_html(label) + "</div>";
                            break;

                        case "option":
                            html = '<div class="option">' + escape_html(label) + "</div>";
                            break;

                        case "item":
                            html = '<button class="item ui blue tiny button">' + escape_html(label) + "</button>";
                            break;

                        case "option_create":
                            html = '<div class="create">Add <strong>' + escape_html(data.input) + "</strong>&hellip;</div>";
                            break;
                    }
                }
                // add mandatory attributes
                if (templateName === "option" || templateName === "option_create") {
                    html = html.replace(regex_tag, "<$1 data-selectable");
                }
                if (templateName === "optgroup") {
                    id = data[self.settings.optgroupValueField] || "";
                    html = html.replace(regex_tag, '<$1 data-group="' + escape_html(id) + '"');
                }
                if (templateName === "option" || templateName === "item") {
                    html = html.replace(regex_tag, '<$1 data-value="' + escape_html(value || "") + '"');
                }
                // update cache
                if (cache) {
                    self.renderCache[templateName][value] = html;
                }
                return html;
            }
        });
        Selectize.defaults = {
            plugins: [],
            delimiter: ",",
            persist: true,
            diacritics: true,
            create: false,
            highlight: true,
            openOnFocus: true,
            maxOptions: 1e3,
            maxItems: null,
            hideSelected: null,
            preload: false,
            scrollDuration: 60,
            loadThrottle: 300,
            dataAttr: "data-data",
            optgroupField: "optgroup",
            sortField: null,
            sortDirection: "asc",
            valueField: "value",
            labelField: "text",
            optgroupLabelField: "label",
            optgroupValueField: "value",
            optgroupOrder: null,
            searchField: [ "text" ],
            mode: null,
            theme: "default",
            wrapperClass: "selectize-control",
            inputClass: "selectize-input",
            dropdownClass: "selectize-dropdown",
            dropdownContentClass: "selectize-dropdown-content",
            dropdownParent: null,
            /*
             load            : null, // function(query, callback) { ... }
             score           : null, // function(search) { ... }
             onInitialize    : null, // function() { ... }
             onChange        : null, // function(value) { ... }
             onItemAdd       : null, // function(value, $item) { ... }
             onItemRemove    : null, // function(value) { ... }
             onClear         : null, // function() { ... }
             onOptionAdd     : null, // function(value, data) { ... }
             onOptionRemove  : null, // function(value) { ... }
             onOptionClear   : null, // function() { ... }
             onDropdownOpen  : null, // function($dropdown) { ... }
             onDropdownClose : null, // function($dropdown) { ... }
             onType          : null, // function(str) { ... }
             onDelete        : null, // function(values) { ... }
             */
            render: {}
        };
        /* --- file: "src/selectize.jquery.js" --- */
        $.fn.selecttag = function(settings) {
            settings = settings || {};
            var defaults = $.fn.selecttag.defaults;
            var dataAttr = settings.dataAttr || defaults.dataAttr;
            /**
             * Initializes selectize from a <input type="text"> element.
             *
             * @param {object} $input
             * @param {object} settings
             */
            var init_textbox = function($input, settings_element) {
                var i, n, values, value = $.trim($input.val() || "");
                if (!value.length) return;
                values = value.split(settings.delimiter || defaults.delimiter);
                for (i = 0, n = values.length; i < n; i++) {
                    settings_element.options[values[i]] = {
                        text: values[i],
                        value: values[i]
                    };
                }
                settings_element.items = values;
            };
            /**
             * Initializes selectize from a <select> element.
             *
             * @param {object} $input
             * @param {object} settings
             */
            var init_select = function($input, settings_element) {
                var i, n, tagName;
                var $children;
                settings_element.maxItems = !!$input.attr("multiple") ? null : 1;
                var readData = function($el) {
                    var data = dataAttr && $el.attr(dataAttr);
                    if (typeof data === "string" && data.length) {
                        return JSON.parse(data);
                    }
                    return null;
                };
                var addOption = function($option, group) {
                    $option = $($option);
                    var value = $option.attr("value") || "";
                    if (!value.length) return;
                    settings_element.options[value] = readData($option) || {
                        text: $option.html(),
                        value: value,
                        optgroup: group
                    };
                    if ($option.is(":selected")) {
                        settings_element.items.push(value);
                    }
                };
                var addGroup = function($optgroup) {
                    var i, n, $options = $("option", $optgroup);
                    $optgroup = $($optgroup);
                    var id = $optgroup.attr("label");
                    if (id && id.length) {
                        settings_element.optgroups[id] = readData($optgroup) || {
                            label: id
                        };
                    }
                    for (i = 0, n = $options.length; i < n; i++) {
                        addOption($options[i], id);
                    }
                };
                $children = $input.children();
                for (i = 0, n = $children.length; i < n; i++) {
                    tagName = $children[i].tagName.toLowerCase();
                    if (tagName === "optgroup") {
                        addGroup($children[i]);
                    } else if (tagName === "option") {
                        addOption($children[i]);
                    }
                }
            };
            return this.each(function() {
                var instance;
                var $input = $(this);
                var tag_name = $input[0].tagName.toLowerCase();
                var settings_element = {
                    placeholder: $input.attr("placeholder"),
                    options: {},
                    optgroups: {},
                    items: []
                };
                if (tag_name === "select") {
                    init_select($input, settings_element);
                } else {
                    init_textbox($input, settings_element);
                }
                instance = new Selectize($input, $.extend(true, {}, defaults, settings_element, settings));
                $input.data("selectize", instance);
                $input.addClass("selectized");
            });
        };
        $.fn.selecttag.defaults = Selectize.defaults;
        /* --- file: "src/plugins/drag_drop/plugin.js" --- */
        /**
         * Plugin: "drag_drop" (selectize.js)
         * Copyright (c) 2013 Brian Reavis & contributors
         *
         * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this
         * file except in compliance with the License. You may obtain a copy of the License at:
         * http://www.apache.org/licenses/LICENSE-2.0
         *
         * Unless required by applicable law or agreed to in writing, software distributed under
         * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF
         * ANY KIND, either express or implied. See the License for the specific language
         * governing permissions and limitations under the License.
         *
         * @author Brian Reavis <brian@thirdroute.com>
         */
        Selectize.registerPlugin("drag_drop", function(options) {
            if (!$.fn.sortable) throw new Error('The "drag_drop" Selectize plugin requires jQuery UI "sortable".');
            if (this.settings.mode !== "multi") return;
            var self = this;
            this.setup = function() {
                var original = self.setup;
                return function() {
                    original.apply(this, arguments);
                    var $control = this.$control.sortable({
                        items: "[data-value]",
                        forcePlaceholderSize: true,
                        start: function(e, ui) {
                            ui.placeholder.css("width", ui.helper.css("width"));
                            $control.css({
                                overflow: "visible"
                            });
                        },
                        stop: function() {
                            $control.css({
                                overflow: "hidden"
                            });
                            var active = this.$activeItems ? this.$activeItems.slice() : null;
                            var values = [];
                            $control.children("[data-value]").each(function() {
                                values.push($(this).attr("data-value"));
                            });
                            self.setValue(values);
                            self.setActiveItem(active);
                        }
                    });
                };
            }();
        });
        /* --- file: "src/plugins/dropdown_header/plugin.js" --- */
        /**
         * Plugin: "dropdown_header" (selectize.js)
         * Copyright (c) 2013 Brian Reavis & contributors
         *
         * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this
         * file except in compliance with the License. You may obtain a copy of the License at:
         * http://www.apache.org/licenses/LICENSE-2.0
         *
         * Unless required by applicable law or agreed to in writing, software distributed under
         * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF
         * ANY KIND, either express or implied. See the License for the specific language
         * governing permissions and limitations under the License.
         *
         * @author Brian Reavis <brian@thirdroute.com>
         */
        Selectize.registerPlugin("dropdown_header", function(options) {
            var self = this;
            options = $.extend({
                title: "Untitled",
                headerClass: "selectize-dropdown-header",
                titleRowClass: "selectize-dropdown-header-title",
                labelClass: "selectize-dropdown-header-label",
                closeClass: "selectize-dropdown-header-close",
                html: function(data) {
                    return '<div class="' + data.headerClass + '">' + '<div class="' + data.titleRowClass + '">' + '<span class="' + data.labelClass + '">' + data.title + "</span>" + '<a href="javascript:void(0)" class="' + data.closeClass + '">&times;</a>' + "</div>" + "</div>";
                }
            }, options);
            self.setup = function() {
                var original = self.setup;
                return function() {
                    original.apply(self, arguments);
                    self.$dropdown_header = $(options.html(options));
                    self.$dropdown.prepend(self.$dropdown_header);
                };
            }();
        });
        /* --- file: "src/plugins/optgroup_columns/plugin.js" --- */
        /**
         * Plugin: "optgroup_columns" (selectize.js)
         * Copyright (c) 2013 Simon Hewitt & contributors
         *
         * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this
         * file except in compliance with the License. You may obtain a copy of the License at:
         * http://www.apache.org/licenses/LICENSE-2.0
         *
         * Unless required by applicable law or agreed to in writing, software distributed under
         * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF
         * ANY KIND, either express or implied. See the License for the specific language
         * governing permissions and limitations under the License.
         *
         * @author Simon Hewitt <si@sjhewitt.co.uk>
         */
        Selectize.registerPlugin("optgroup_columns", function(options) {
            var self = this;
            options = $.extend({
                equalizeWidth: true,
                equalizeHeight: true
            }, options);
            this.getAdjacentOption = function($option, direction) {
                var $options = $option.closest("[data-group]").find("[data-selectable]");
                var index = $options.index($option) + direction;
                return index >= 0 && index < $options.length ? $options.eq(index) : $();
            };
            this.onKeyDown = function() {
                var original = self.onKeyDown;
                return function(e) {
                    var index, $option, $options, $optgroup;
                    if (this.isOpen && (e.keyCode === KEY_LEFT || e.keyCode === KEY_RIGHT)) {
                        self.ignoreHover = true;
                        $optgroup = this.$activeOption.closest("[data-group]");
                        index = $optgroup.find("[data-selectable]").index(this.$activeOption);
                        if (e.keyCode === KEY_LEFT) {
                            $optgroup = $optgroup.prev("[data-group]");
                        } else {
                            $optgroup = $optgroup.next("[data-group]");
                        }
                        $options = $optgroup.find("[data-selectable]");
                        $option = $options.eq(Math.min($options.length - 1, index));
                        if ($option.length) {
                            this.setActiveOption($option);
                        }
                        return;
                    }
                    return original.apply(this, arguments);
                };
            }();
            var equalizeSizes = function() {
                var i, n, height_max, width, width_last, width_parent, $optgroups;
                $optgroups = $("[data-group]", self.$dropdown_content);
                n = $optgroups.length;
                if (!n || !self.$dropdown_content.width()) return;
                if (options.equalizeHeight) {
                    height_max = 0;
                    for (i = 0; i < n; i++) {
                        height_max = Math.max(height_max, $optgroups.eq(i).height());
                    }
                    $optgroups.css({
                        height: height_max
                    });
                }
                if (options.equalizeWidth) {
                    width_parent = self.$dropdown_content.innerWidth();
                    width = Math.round(width_parent / n);
                    $optgroups.css({
                        width: width
                    });
                    if (n > 1) {
                        width_last = width_parent - width * (n - 1);
                        $optgroups.eq(n - 1).css({
                            width: width_last
                        });
                    }
                }
            };
            if (options.equalizeHeight || options.equalizeWidth) {
                hook.after(this, "positionDropdown", equalizeSizes);
                hook.after(this, "refreshOptions", equalizeSizes);
            }
        });
        /* --- file: "src/plugins/remove_button/plugin.js" --- */
        /**
         * Plugin: "remove_button" (selectize.js)
         * Copyright (c) 2013 Brian Reavis & contributors
         *
         * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this
         * file except in compliance with the License. You may obtain a copy of the License at:
         * http://www.apache.org/licenses/LICENSE-2.0
         *
         * Unless required by applicable law or agreed to in writing, software distributed under
         * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF
         * ANY KIND, either express or implied. See the License for the specific language
         * governing permissions and limitations under the License.
         *
         * @author Brian Reavis <brian@thirdroute.com>
         */
        Selectize.registerPlugin("remove_button", function(options) {
            var self = this;
            // override the item rendering method to add a "x" to each
            this.settings.render.item = function(data) {
                var label = data[self.settings.labelField];
                return '<div class="item">' + label + ' <a href="javascript:void(0)" class="remove" tabindex="-1" title="Remove">&times;</a></div>';
            };
            // override the setup method to add an extra "click" handler
            // that listens for mousedown events on the "x"
            this.setup = function() {
                var original = self.setup;
                return function() {
                    original.apply(this, arguments);
                    this.$control.on("click", ".remove", function(e) {
                        e.preventDefault();
                        var $item = $(e.target).parent();
                        self.setActiveItem($item);
                        if (self.deleteSelection()) {
                            self.setCaret(self.items.length);
                        }
                    });
                };
            }();
        });
        /* --- file: "src/plugins/restore_on_backspace/plugin.js" --- */
        /**
         * Plugin: "restore_on_backspace" (selectize.js)
         * Copyright (c) 2013 Brian Reavis & contributors
         *
         * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this
         * file except in compliance with the License. You may obtain a copy of the License at:
         * http://www.apache.org/licenses/LICENSE-2.0
         *
         * Unless required by applicable law or agreed to in writing, software distributed under
         * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF
         * ANY KIND, either express or implied. See the License for the specific language
         * governing permissions and limitations under the License.
         *
         * @author Brian Reavis <brian@thirdroute.com>
         */
        Selectize.registerPlugin("restore_on_backspace", function(options) {
            var self = this;
            options.text = options.text || function(option) {
                return option[this.settings.labelField];
            };
            this.onKeyDown = function(e) {
                var original = self.onKeyDown;
                return function(e) {
                    var index, option;
                    if (e.keyCode === KEY_BACKSPACE && this.$control_input.val() === "" && !this.$activeItems.length) {
                        index = this.caretPos - 1;
                        if (index >= 0 && index < this.items.length) {
                            option = this.options[this.items[index]];
                            if (this.deleteSelection(e)) {
                                this.setTextboxValue(options.text.apply(this, [ option ]));
                                this.refreshOptions(true);
                            }
                            e.preventDefault();
                            return;
                        }
                    }
                    return original.apply(this, arguments);
                };
            }();
        });
        return Selectize;
    });
});
