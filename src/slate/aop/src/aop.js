define(function (require, exports, module) {

    var aop, $ = require('$');

    (function () {
        var _after = 1;
        var _afterThrow = 2;
        var _afterFinally = 3;
        var _before = 4;
        var _around = 5;
        var _intro = 6;
        var _regexEnabled = true;
        var _arguments = "arguments";
        var _undef = "undefined";
        var getType = (function () {
            var toString = Object.prototype.toString, toStrings = {}, nodeTypes = {1: "element", 3: "textnode", 9: "document", 11: "fragment"}, types = "Arguments Array Boolean Date Document Element Error Fragment Function NodeList Null Number Object RegExp String TextNode Undefined Window".split(" ");
            for (var i = types.length; i--;) {
                var type = types[i], constructor = window[type];
                if (constructor) {
                    try {
                        toStrings[toString.call(new constructor)] = type.toLowerCase()
                    } catch (e) {
                    }
                }
            }
            return function (item) {
                return item == null && (item === undefined ? _undef : "null") || item.nodeType && nodeTypes[item.nodeType] || typeof item.length == "number" && (item.callee && _arguments || item.alert && "window" || item.item && "nodelist") || toStrings[toString.call(item)]
            }
        })();
        var isFunc = function (obj) {
            return getType(obj) == "function"
        };
        var weaveOne = function (source, method, advice) {
            var old = source[method];
            if (advice.type != _intro && !isFunc(old)) {
                var oldObject = old;
                old = function () {
                    var code = arguments.length > 0 ? _arguments + "[0]" : "";
                    for (var i = 1; i < arguments.length; i++) {
                        code += "," + _arguments + "[" + i + "]"
                    }
                    return eval("oldObject(" + code + ");")
                }
            }
            var aspect;
            if (advice.type == _after || advice.type == _afterThrow || advice.type == _afterFinally) {
                aspect = function () {
                    var returnValue, exceptionThrown = null;
                    try {
                        returnValue = old.apply(this, arguments)
                    } catch (e) {
                        exceptionThrown = e
                    }
                    if (advice.type == _after) {
                        if (exceptionThrown == null) {
                            returnValue = advice.value.apply(this, [returnValue, method])
                        } else {
                            throw exceptionThrown
                        }
                    } else {
                        if (advice.type == _afterThrow && exceptionThrown != null) {
                            returnValue = advice.value.apply(this, [exceptionThrown, method])
                        } else {
                            if (advice.type == _afterFinally) {
                                returnValue = advice.value.apply(this, [returnValue, exceptionThrown, method])
                            }
                        }
                    }
                    return returnValue
                }
            } else {
                if (advice.type == _before) {
                    aspect = function () {
                        advice.value.apply(this, [arguments, method]);
                        return old.apply(this, arguments)
                    }
                } else {
                    if (advice.type == _intro) {
                        aspect = function () {
                            return advice.value.apply(this, arguments)
                        }
                    } else {
                        if (advice.type == _around) {
                            aspect = function () {
                                var invocation = {object: this, args: Array.prototype.slice.call(arguments)};
                                return advice.value.apply(invocation.object, [
                                    {arguments: invocation.args, method: method, proceed: function () {
                                        return old.apply(invocation.object, invocation.args)
                                    }}
                                ])
                            }
                        }
                    }
                }
            }
            aspect.unweave = function () {
                source[method] = old;
                pointcut = source = aspect = old = null
            };
            source[method] = aspect;
            return aspect
        };
        var search = function (source, pointcut, advice) {
            var methods = [];
            for (var method in source) {
                var item = null;
                try {
                    item = source[method]
                } catch (e) {
                }
                if (item != null && method.match(pointcut.method) && isFunc(item)) {
                    methods[methods.length] = {source: source, method: method, advice: advice}
                }
            }
            return methods
        };
        var weave = function (pointcut, advice) {
            var source = typeof(pointcut.target.prototype) != _undef ? pointcut.target.prototype : pointcut.target;
            var advices = [];
            if (advice.type != _intro && typeof(source[pointcut.method]) == _undef) {
                var methods = search(pointcut.target, pointcut, advice);
                if (methods.length == 0) {
                    methods = search(source, pointcut, advice)
                }
                for (var i in methods) {
                    advices[advices.length] = weaveOne(methods[i].source, methods[i].method, methods[i].advice)
                }
            } else {
                advices[0] = weaveOne(source, pointcut.method, advice)
            }
            return _regexEnabled ? advices : advices[0]
        };
        aop = {after: function (pointcut, advice) {
            return weave(pointcut, {type: _after, value: advice})
        }, afterThrow: function (pointcut, advice) {
            return weave(pointcut, {type: _afterThrow, value: advice})
        }, afterFinally: function (pointcut, advice) {
            return weave(pointcut, {type: _afterFinally, value: advice})
        }, before: function (pointcut, advice) {
            return weave(pointcut, {type: _before, value: advice})
        }, around: function (pointcut, advice) {
            return weave(pointcut, {type: _around, value: advice})
        }, introduction: function (pointcut, advice) {
            return weave(pointcut, {type: _intro, value: advice})
        }, setup: function (settings) {
            _regexEnabled = settings.regexMatch
        }}
    })();

    $.aop = aop;
    module.exports = aop;
});
