/*
 * # SlateUI extend Semantic - Popup
 * http://github.com/feeloc/slate-ui/
 *
 *
 * Copyright 2014 Contributors
 * Released under the MIT license
 * http://opensource.org/licenses/MIT
 *
 */

define(function (require, exports, module) {
    var $ = require('$');
    require('jquery/easing/1.3.0/easing');
    require('slate/transition/1.0.0/transition');
    $.fn.popup = function (parameters) {
        var
            $allModules = $(this),
            $document = $(document),

            moduleSelector = $allModules.selector || '',

            time = new Date().getTime(),
            performance = [],

            query = arguments[0],
            methodInvoked = (typeof query == 'string'),
            queryArguments = [].slice.call(arguments, 1),

            returnedValue
            ;

        $allModules
            .each(function () {
                var
                    settings = ( $.isPlainObject(parameters) )
                        ? $.extend(true, {}, $.fn.popup.settings, parameters)
                        : $.extend({}, $.fn.popup.settings),

                    selector = settings.selector,
                    className = settings.className,
                    error = settings.error,
                    metadata = settings.metadata,
                    namespace = settings.namespace,

                    eventNamespace = '.' + settings.namespace,
                    moduleNamespace = 'module-' + namespace,

                    $module = $(this),
                    $context = $(settings.context),
                    $target = (settings.target)
                        ? $(settings.target)
                        : $module,

                    $window = $(window),

                    $offsetParent = (settings.inline)
                        ? $target.offsetParent()
                        : $window,
                    $popup = (settings.inline)
                        ? $target.next(settings.selector.popup)
                        : $window.children(settings.selector.popup).last(),

                    searchDepth = 0,

                    element = this,
                    instance = $module.data(moduleNamespace),
                    moduleDom
                    ;

                moduleDom = {

                    // binds events
                    initialize: function () {
                        moduleDom.debug('Initializing moduleDom', $module);
                        if (settings.on == 'click') {
                            $module
                                .on('click', moduleDom.toggle)
                            ;
                        }
                        else {
                            $module
                                .on(moduleDom.get.startEvent() + eventNamespace, moduleDom.event.start)
                                .on(moduleDom.get.endEvent() + eventNamespace, moduleDom.event.end)
                            ;
                        }
                        if (settings.target) {
                            moduleDom.debug('Target set to element', $target);
                        }
                        $window
                            .on('resize' + eventNamespace, moduleDom.event.resize)
                        ;
                        moduleDom.instantiate();
                    },

                    instantiate: function () {
                        moduleDom.verbose('Storing instance of moduleDom', moduleDom);
                        instance = module;
                        $module
                            .data(moduleNamespace, instance)
                        ;
                    },

                    refresh: function () {
                        if (settings.inline) {
                            $popup = $target.next(selector.popup);
                            $offsetParent = $target.offsetParent();
                        }
                        else {
                            $popup = $window.children(selector.popup).last();
                        }
                    },

                    destroy: function () {
                        moduleDom.debug('Destroying previous moduleDom');
                        $window
                            .off(eventNamespace)
                        ;
                        $popup
                            .remove()
                        ;
                        $module
                            .off(eventNamespace)
                            .removeData(moduleNamespace)
                        ;
                    },

                    event: {
                        start: function (event) {
                            moduleDom.timer = setTimeout(function () {
                                if (moduleDom.is.hidden()) {
                                    moduleDom.show();
                                }
                            }, settings.delay);
                        },
                        end: function () {
                            clearTimeout(moduleDom.timer);
                            if (moduleDom.is.visible()) {
                                moduleDom.hide();
                            }
                        },
                        resize: function () {
                            if (moduleDom.is.visible()) {
                                moduleDom.set.position();
                            }
                        }
                    },

                    // generates popup html from metadata
                    create: function () {
                        moduleDom.debug('Creating pop-up html');
                        var
                            html = $module.data(metadata.html) || settings.html,
                            variation = $module.data(metadata.variation) || settings.variation,
                            title = $module.data(metadata.title) || settings.title,
                            content = $module.data(metadata.content) || $module.attr('title') || settings.content
                            ;
                        if (html || content || title) {
                            if (!html) {
                                html = settings.template({
                                    title: title,
                                    content: content
                                });
                            }
                            $popup = $('<div/>')
                                .addClass(className.popup)
                                .addClass(variation)
                                .html(html)
                            ;
                            if (settings.inline) {
                                moduleDom.verbose('Inserting popup element inline', $popup);
                                $popup
                                    .data(moduleNamespace, instance)
                                    .insertAfter($module)
                                ;
                            }
                            else {
                                moduleDom.verbose('Appending popup element to body', $popup);
                                $popup
                                    .data(moduleNamespace, instance)
                                    .appendTo($context)
                                ;
                            }
                            $.proxy(settings.onCreate, $popup)();
                        }
                        else {
                            moduleDom.error(error.content);
                        }
                    },

                    // determines popup state
                    toggle: function () {
                        moduleDom.debug('Toggling pop-up');
                        if (moduleDom.is.hidden()) {
                            moduleDom.debug('Popup is hidden, showing pop-up');
                            moduleDom.unbind.close();
                            moduleDom.hideAll();
                            moduleDom.show();
                        }
                        else {
                            moduleDom.debug('Popup is visible, hiding pop-up');
                            moduleDom.hide();
                        }
                    },

                    show: function (callback) {
                        callback = callback || function () {
                        };
                        moduleDom.debug('Showing pop-up', settings.transition);
                        if (!settings.preserve) {
                            moduleDom.refresh();
                        }
                        if (!moduleDom.exists()) {
                            moduleDom.create();
                        }
                        moduleDom.save.conditions();
                        moduleDom.set.position();
                        moduleDom.animate.show(callback);
                    },


                    hide: function (callback) {
                        callback = callback || function () {
                        };
                        $module
                            .removeClass(className.visible)
                        ;
                        moduleDom.restore.conditions();
                        moduleDom.unbind.close();
                        if (moduleDom.is.visible()) {
                            moduleDom.animate.hide(callback);
                        }
                    },

                    hideAll: function () {
                        $(selector.popup)
                            .filter(':visible')
                            .popup('hide')
                        ;
                    },

                    hideGracefully: function (event) {
                        // don't close on clicks inside popup
                        if (event && $(event.target).closest(selector.popup).size() === 0) {
                            moduleDom.debug('Click occurred outside popup hiding popup');
                            moduleDom.hide();
                        }
                        else {
                            moduleDom.debug('Click was inside popup, keeping popup open');
                        }
                    },

                    exists: function () {
                        if (settings.inline) {
                            return ( $popup.size() !== 0 );
                        }
                        else {
                            return ( $popup.parent($context).size() );
                        }
                    },

                    remove: function () {
                        moduleDom.debug('Removing popup');
                        $popup
                            .remove()
                        ;
                    },

                    save: {
                        conditions: function () {
                            moduleDom.cache = {
                                title: $module.attr('title')
                            };
                            if (moduleDom.cache.title) {
                                $module.removeAttr('title');
                            }
                            moduleDom.verbose('Saving original attributes', moduleDom.cache.title);
                        }
                    },
                    restore: {
                        conditions: function () {
                            if (moduleDom.cache && moduleDom.cache.title) {
                                $module.attr('title', moduleDom.cache.title);
                                moduleDom.verbose('Restoring original attributes', moduleDom.cache.title);
                            }
                            return true;
                        }
                    },
                    animate: {
                        show: function (callback) {
                            callback = callback || function () {
                            };
                            $module
                                .addClass(className.visible)
                            ;
                            if (settings.transition && $.fn.transition !== undefined && $module.transition('is supported')) {
                                $popup
                                    .transition(settings.transition + ' in', settings.duration, function () {
                                        moduleDom.bind.close();
                                        $.proxy(callback, element)();
                                    })
                                ;
                            }
                            else {
                                $popup
                                    .stop()
                                    .fadeIn(settings.duration, settings.easing, function () {
                                        moduleDom.bind.close();
                                        $.proxy(callback, element)();
                                    })
                                ;
                            }
                            $.proxy(settings.onShow, element)();
                        },
                        hide: function (callback) {
                            callback = callback || function () {
                            };
                            moduleDom.debug('Hiding pop-up');
                            if (settings.transition && $.fn.transition !== undefined && $module.transition('is supported')) {
                                $popup
                                    .transition(settings.transition + ' out', settings.duration, function () {
                                        moduleDom.reset();
                                        callback();
                                    })
                                ;
                            }
                            else {
                                $popup
                                    .stop()
                                    .fadeOut(settings.duration, settings.easing, function () {
                                        moduleDom.reset();
                                        callback();
                                    })
                                ;
                            }
                            $.proxy(settings.onHide, element)();
                        }
                    },

                    get: {
                        startEvent: function () {
                            if (settings.on == 'hover') {
                                return 'mouseenter';
                            }
                            else if (settings.on == 'focus') {
                                return 'focus';
                            }
                        },
                        endEvent: function () {
                            if (settings.on == 'hover') {
                                return 'mouseleave';
                            }
                            else if (settings.on == 'focus') {
                                return 'blur';
                            }
                        },
                        offstagePosition: function () {
                            var
                                boundary = {
                                    top: $(window).scrollTop(),
                                    bottom: $(window).scrollTop() + $(window).height(),
                                    left: 0,
                                    right: $(window).width()
                                },
                                popup = {
                                    width: $popup.width(),
                                    height: $popup.outerHeight(),
                                    position: $popup.offset()
                                },
                                offstage = {},
                                offstagePositions = []
                                ;
                            if (popup.position) {
                                offstage = {
                                    top: (popup.position.top < boundary.top),
                                    bottom: (popup.position.top + popup.height > boundary.bottom),
                                    right: (popup.position.left + popup.width > boundary.right),
                                    left: (popup.position.left < boundary.left)
                                };
                            }
                            moduleDom.verbose('Checking if outside viewable area', popup.position);
                            // return only boundaries that have been surpassed
                            $.each(offstage, function (direction, isOffstage) {
                                if (isOffstage) {
                                    offstagePositions.push(direction);
                                }
                            });
                            return (offstagePositions.length > 0)
                                ? offstagePositions.join(' ')
                                : false
                                ;
                        },
                        nextPosition: function (position) {
                            switch (position) {
                                case 'top left':
                                    position = 'bottom left';
                                    break;
                                case 'bottom left':
                                    position = 'top right';
                                    break;
                                case 'top right':
                                    position = 'bottom right';
                                    break;
                                case 'bottom right':
                                    position = 'top center';
                                    break;
                                case 'top center':
                                    position = 'bottom center';
                                    break;
                                case 'bottom center':
                                    position = 'right center';
                                    break;
                                case 'right center':
                                    position = 'left center';
                                    break;
                                case 'left center':
                                    position = 'top center';
                                    break;
                            }
                            return position;
                        }
                    },

                    set: {
                        position: function (position, arrowOffset) {
                            var
                                windowWidth = $(window).width(),
                                windowHeight = $(window).height(),

                                width = $target.outerWidth(),
                                height = $target.outerHeight(),

                                popupWidth = $popup.width(),
                                popupHeight = $popup.outerHeight(),

                                parentWidth = $offsetParent.outerWidth(),
                                parentHeight = $offsetParent.outerHeight(),

                                distanceAway = settings.distanceAway,

                                offset = (settings.inline)
                                    ? $target.position()
                                    : $target.offset(),

                                positioning,
                                offstagePosition
                                ;
                            position = position || $module.data(metadata.position) || settings.position;
                            arrowOffset = arrowOffset || $module.data(metadata.offset) || settings.offset;
                            // adjust for margin when inline
                            if (settings.inline) {
                                if (position == 'left center' || position == 'right center') {
                                    arrowOffset += parseInt(window.getComputedStyle(element).getPropertyValue('margin-top'), 10);
                                    distanceAway += -parseInt(window.getComputedStyle(element).getPropertyValue('margin-left'), 10);
                                }
                                else {
                                    arrowOffset += parseInt(window.getComputedStyle(element).getPropertyValue('margin-left'), 10);
                                    distanceAway += parseInt(window.getComputedStyle(element).getPropertyValue('margin-top'), 10);
                                }
                            }
                            moduleDom.debug('Calculating offset for position', position);
                            switch (position) {
                                case 'top left':
                                    positioning = {
                                        bottom: parentHeight - offset.top + distanceAway,
                                        right: parentWidth - offset.left - arrowOffset,
                                        top: 'auto',
                                        left: 'auto'
                                    };
                                    break;
                                case 'top center':
                                    positioning = {
                                        bottom: parentHeight - offset.top + distanceAway,
                                        left: offset.left + (width / 2) - (popupWidth / 2) + arrowOffset,
                                        top: 'auto',
                                        right: 'auto'
                                    };
                                    break;
                                case 'top right':
                                    positioning = {
                                        top: 'auto',
                                        bottom: parentHeight - offset.top + distanceAway,
                                        left: offset.left + width + arrowOffset,
                                        right: 'auto'
                                    };
                                    break;
                                case 'left center':
                                    positioning = {
                                        top: offset.top + (height / 2) - (popupHeight / 2) + arrowOffset,
                                        right: parentWidth - offset.left + distanceAway,
                                        left: 'auto',
                                        bottom: 'auto'
                                    };
                                    break;
                                case 'right center':
                                    positioning = {
                                        top: offset.top + (height / 2) - (popupHeight / 2) + arrowOffset,
                                        left: offset.left + width + distanceAway,
                                        bottom: 'auto',
                                        right: 'auto'
                                    };
                                    break;
                                case 'bottom left':
                                    positioning = {
                                        top: offset.top + height + distanceAway,
                                        right: parentWidth - offset.left - arrowOffset,
                                        left: 'auto',
                                        bottom: 'auto'
                                    };
                                    break;
                                case 'bottom center':
                                    positioning = {
                                        top: offset.top + height + distanceAway,
                                        left: offset.left + (width / 2) - (popupWidth / 2) + arrowOffset,
                                        bottom: 'auto',
                                        right: 'auto'
                                    };
                                    break;
                                case 'bottom right':
                                    positioning = {
                                        top: offset.top + height + distanceAway,
                                        left: offset.left + width + arrowOffset,
                                        bottom: 'auto',
                                        right: 'auto'
                                    };
                                    break;
                            }
                            // tentatively place on stage
                            $popup
                                .css(positioning)
                                .removeClass(className.position)
                                .addClass(position)
                                .addClass(className.loading)
                            ;
                            // check if is offstage
                            offstagePosition = moduleDom.get.offstagePosition();

                            // recursively find new positioning
                            if (offstagePosition) {
                                moduleDom.debug('Element is outside boundaries', offstagePosition);
                                if (searchDepth < settings.maxSearchDepth) {
                                    position = moduleDom.get.nextPosition(position);
                                    searchDepth++;
                                    moduleDom.debug('Trying new position', position);
                                    return moduleDom.set.position(position);
                                }
                                else {
                                    moduleDom.error(error.recursion);
                                    searchDepth = 0;
                                    moduleDom.reset();
                                    $popup.removeClass(className.loading);
                                    return false;
                                }
                            }
                            else {
                                moduleDom.debug('Position is on stage', position);
                                searchDepth = 0;
                                $popup.removeClass(className.loading);
                                return true;
                            }
                        }

                    },

                    bind: {
                        close: function () {
                            if (settings.on == 'click' && settings.closable) {
                                moduleDom.verbose('Binding popup close event to document');
                                $document
                                    .on('click' + eventNamespace, function (event) {
                                        moduleDom.verbose('Pop-up clickaway intent detected');
                                        $.proxy(moduleDom.hideGracefully, this)(event);
                                    })
                                ;
                            }
                        }
                    },

                    unbind: {
                        close: function () {
                            if (settings.on == 'click' && settings.closable) {
                                moduleDom.verbose('Removing close event from document');
                                $document
                                    .off('click' + eventNamespace)
                                ;
                            }
                        }
                    },

                    is: {
                        animating: function () {
                            return ( $popup.is(':animated') || $popup.hasClass(className.animating) );
                        },
                        visible: function () {
                            return $popup.is(':visible');
                        },
                        hidden: function () {
                            return !moduleDom.is.visible();
                        }
                    },

                    reset: function () {
                        $popup
                            .attr('style', '')
                            .removeAttr('style')
                        ;
                        if (!settings.preserve) {
                            moduleDom.remove();
                        }
                    },

                    setting: function (name, value) {
                        if ($.isPlainObject(name)) {
                            $.extend(true, settings, name);
                        }
                        else if (value !== undefined) {
                            settings[name] = value;
                        }
                        else {
                            return settings[name];
                        }
                    },
                    internal: function (name, value) {
                        if ($.isPlainObject(name)) {
                            $.extend(true, module, name);
                        }
                        else if (value !== undefined) {
                            moduleDom[name] = value;
                        }
                        else {
                            return moduleDom[name];
                        }
                    },
                    debug: function () {
                        if (settings.debug) {
                            if (settings.performance) {
                                moduleDom.performance.log(arguments);
                            }
                            else {
                                moduleDom.debug = Function.prototype.bind.call(console.info, console, settings.name + ':');
                                moduleDom.debug.apply(console, arguments);
                            }
                        }
                    },
                    verbose: function () {
                        if (settings.verbose && settings.debug) {
                            if (settings.performance) {
                                moduleDom.performance.log(arguments);
                            }
                            else {
                                moduleDom.verbose = Function.prototype.bind.call(console.info, console, settings.name + ':');
                                moduleDom.verbose.apply(console, arguments);
                            }
                        }
                    },
                    error: function () {
                        moduleDom.error = Function.prototype.bind.call(console.error, console, settings.name + ':');
                        moduleDom.error.apply(console, arguments);
                    },
                    performance: {
                        log: function (message) {
                            var
                                currentTime,
                                executionTime,
                                previousTime
                                ;
                            if (settings.performance) {
                                currentTime = new Date().getTime();
                                previousTime = time || currentTime;
                                executionTime = currentTime - previousTime;
                                time = currentTime;
                                performance.push({
                                    'Element': element,
                                    'Name': message[0],
                                    'Arguments': [].slice.call(message, 1) || '',
                                    'Execution Time': executionTime
                                });
                            }
                            clearTimeout(moduleDom.performance.timer);
                            moduleDom.performance.timer = setTimeout(moduleDom.performance.display, 100);
                        },
                        display: function () {
                            var
                                title = settings.name + ':',
                                totalTime = 0
                                ;
                            time = false;
                            clearTimeout(moduleDom.performance.timer);
                            $.each(performance, function (index, data) {
                                totalTime += data['Execution Time'];
                            });
                            title += ' ' + totalTime + 'ms';
                            if (moduleDom) {
                                title += ' \'' + moduleSelector + '\'';
                            }
                            if ((console.group !== undefined || console.table !== undefined) && performance.length > 0) {
                                console.groupCollapsed(title);
                                if (console.table) {
                                    console.table(performance);
                                }
                                else {
                                    $.each(performance, function (index, data) {
                                        console.log(data['Name'] + ': ' + data['Execution Time'] + 'ms');
                                    });
                                }
                                console.groupEnd();
                            }
                            performance = [];
                        }
                    },
                    invoke: function (query, passedArguments, context) {
                        var
                            object = instance,
                            maxDepth,
                            found,
                            response
                            ;
                        passedArguments = passedArguments || queryArguments;
                        context = element || context;
                        if (typeof query == 'string' && object !== undefined) {
                            query = query.split(/[\. ]/);
                            maxDepth = query.length - 1;
                            $.each(query, function (depth, value) {
                                var camelCaseValue = (depth != maxDepth)
                                        ? value + query[depth + 1].charAt(0).toUpperCase() + query[depth + 1].slice(1)
                                        : query
                                    ;
                                if ($.isPlainObject(object[camelCaseValue]) && (depth != maxDepth)) {
                                    object = object[camelCaseValue];
                                }
                                else if (object[camelCaseValue] !== undefined) {
                                    found = object[camelCaseValue];
                                    return false;
                                }
                                else if ($.isPlainObject(object[value]) && (depth != maxDepth)) {
                                    object = object[value];
                                }
                                else if (object[value] !== undefined) {
                                    found = object[value];
                                    return false;
                                }
                                else {
                                    return false;
                                }
                            });
                        }
                        if ($.isFunction(found)) {
                            response = found.apply(context, passedArguments);
                        }
                        else if (found !== undefined) {
                            response = found;
                        }
                        if ($.isArray(returnedValue)) {
                            returnedValue.push(response);
                        }
                        else if (returnedValue !== undefined) {
                            returnedValue = [returnedValue, response];
                        }
                        else if (response !== undefined) {
                            returnedValue = response;
                        }
                        return found;
                    }
                };

                if (methodInvoked) {
                    if (instance === undefined) {
                        moduleDom.initialize();
                    }
                    moduleDom.invoke(query);
                }
                else {
                    if (instance !== undefined) {
                        moduleDom.destroy();
                    }
                    moduleDom.initialize();
                }
            })
        ;

        return (returnedValue !== undefined)
            ? returnedValue
            : this
            ;
    };

    $.fn.popup.settings = {

        name: 'Popup',
        debug: false,
        verbose: true,
        performance: true,
        namespace: 'popup',

        onCreate: function () {
        },
        onShow: function () {
        },
        onHide: function () {
        },

        variation: '',
        content: false,
        html: false,
        title: false,

        on: 'hover',
        target: false,
        closable: true,

        context: 'body',
        position: 'top center',
        delay: 150,
        inline: false,
        preserve: false,

        duration: 250,
        easing: 'easeOutQuint',
        transition: 'scale',

        distanceAway: 0,
        offset: 0,
        maxSearchDepth: 10,

        error: {
            content: 'Your popup has no content specified',
            method: 'The method you called is not defined.',
            recursion: 'Popup attempted to reposition element to fit, but could not find an adequate position.'
        },

        metadata: {
            content: 'content',
            html: 'html',
            offset: 'offset',
            position: 'position',
            title: 'title',
            variation: 'variation'
        },

        className: {
            animating: 'animating',
            loading: 'loading',
            popup: 'ui popup',
            position: 'top left center bottom right',
            visible: 'visible'
        },

        selector: {
            popup: '.ui.popup'
        },

        template: function (text) {
            var html = '';
            if (typeof text !== undefined) {
                if (typeof text.title !== undefined && text.title) {
                    html += '<div class="header">' + text.title + '</div class="header">';
                }
                if (typeof text.content !== undefined && text.content) {
                    html += '<div class="content">' + text.content + '</div>';
                }
            }
            return html;
        }

    };

});
