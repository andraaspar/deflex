/// <reference path='IAJAXSettingsBeforeSendFunction.ts'/>
/// <reference path='IAJAXSettingsCompleteFunction.ts'/>
/// <reference path='IAJAXSettingsContentsObject.ts'/>
/// <reference path='IAJAXSettingsDataFilterFunction.ts'/>
/// <reference path='IAJAXSettingsXHRFunction.ts'/>
/// <reference path='IXHRDoneFunction.ts'/>
/// <reference path='IXHRFailFunction.ts'/>
/// <reference path='IAJAXTransportCompleteFunction.ts'/>
/// <reference path='IAJAXTransportObject.ts'/>
/// <reference path='ICSSHookObject.ts'/>
/// <reference path='IEvent.ts'/>
/// <reference path='IPromise.ts'/>
/// <reference path='IPromise.ts'/>
/// <reference path='IPromise.ts'/>
/// <reference path='IAnimationOptions.ts'/>
/// <reference path='ITween.ts'/>
/// <reference path='IAnimationDoneFunction.ts'/>
/// <reference path='IAnimationProgressFunction.ts'/>
/// <reference path='IAnimationStartFunction.ts'/>
/// <reference path='IAnimationStepFunction.ts'/>
/// <reference path='ISpecialEasingObject.ts'/>
/// <reference path='IPositionObject.ts'/>
/// <reference path='IEvent.ts'/>
/// <reference path='IEventHandler.ts'/>
/// <reference path='IAddClassFunction.ts'/>
/// <reference path='IAJAXCompleteFunction.ts'/>
/// <reference path='IAJAXErrorFunction.ts'/>
/// <reference path='IAJAXSuccessFunction.ts'/>
/// <reference path='IAnimationOptions.ts'/>
/// <reference path='IAppendFunction.ts'/>
/// <reference path='IAttrFunction.ts'/>
/// <reference path='IClassToggleFunction.ts'/>
/// <reference path='ICSSFunction.ts'/>
/// <reference path='ICSSObject.ts'/>
/// <reference path='IEachFunction.ts'/>
/// <reference path='IHTMLFunction.ts'/>
/// <reference path='IIsFunction.ts'/>
/// <reference path='ILoadCompleteFunction.ts'/>
/// <reference path='IOffsetFunction.ts'/>
/// <reference path='IOnEventsObject.ts'/>
/// <reference path='IQueueCallbackFunction.ts'/>
/// <reference path='IReplaceWithFunction.ts'/>
/// <reference path='ISizeFunction.ts'/>
/// <reference path='ITextFunction.ts'/>
/// <reference path='IValFunction.ts'/>
/// <reference path='IWidthFunction.ts'/>
/// <reference path='IWrapFunction.ts'/>
/// <reference path='IEventHandler.ts'/>
/// <reference path='IEventHandler.ts'/>
/// <reference path='IStaticEventSpecialHandleObject.ts'/>
/// <reference path='IStaticEventSpecialSetupFunction.ts'/>
/// <reference path='IStaticEventSpecialTeardownFunction.ts'/>
/// <reference path='IStaticEventSpecialAddFunction.ts'/>
/// <reference path='IStaticEventSpecialAddFunction.ts'/>
/// <reference path='IEventHandler.ts'/>
/// <reference path='IStaticEventSpecialObject.ts'/>
/// <reference path='IStaticEventSpecial.ts'/>
/// <reference path='IXHRAlwaysFunction.ts'/>
/// <reference path='IXHRDoneFunction.ts'/>
/// <reference path='IXHRFailFunction.ts'/>
/// <reference path='IAJAXSettings.ts'/>
/// <reference path='IAJAXPrefilterFunction.ts'/>
/// <reference path='IAJAXTransportHandler.ts'/>
/// <reference path='ICallbacks.ts'/>
/// <reference path='ICSSHooksObject.ts'/>
/// <reference path='IDeferred.ts'/>
/// <reference path='IDeferredBeforeStartFunction.ts'/>
/// <reference path='IEachFunction.ts'/>
/// <reference path='IEachPropertyFunction.ts'/>
/// <reference path='IEventConstructor.ts'/>
/// <reference path='IFXObject.ts'/>
/// <reference path='IGetSuccessFunction.ts'/>
/// <reference path='IGrepFunction.ts'/>
/// <reference path='IInstance.ts'/>
/// <reference path='IMapFunction.ts'/>
/// <reference path='IStaticEvent.ts'/>
/// <reference path='IXHR.ts'/>
var illa;
(function (illa) {
    /**
     * A reference to the global object.
     * This is the window in a browser, and the global in node.
     */
    illa.GLOBAL = (function () {
        return this;
    })();
    illa.classByType = (function () {
        var classes = 'Boolean Number String Function Array Date RegExp Object Error'.split(' ');
        var result = {};
        for (var i = 0, n = classes.length; i < n; i++) {
            result['[object ' + classes[i] + ']'] = classes[i].toLowerCase();
        }
        return result;
    })();
    /**
     * Returns true if the value is a string primitive.
     */
    function isString(v) {
        return typeof v == 'string';
    }
    illa.isString = isString;
    /**
     * Returns true if the value is a boolean primitive.
     */
    function isBoolean(v) {
        return typeof v == 'boolean';
    }
    illa.isBoolean = isBoolean;
    /**
     * Returns true if the value is a number primitive.
     */
    function isNumber(v) {
        return typeof v == 'number';
    }
    illa.isNumber = isNumber;
    /**
     * Returns true if the value is a function.
     */
    function isFunction(v) {
        return typeof v == 'function';
    }
    illa.isFunction = isFunction;
    /**
     * Returns true if the value is an array.
     * Array subclasses are not recognized as arrays.
     */
    function isArray(v) {
        return illa.getType(v) == 'array';
    }
    illa.isArray = isArray;
    if (Array.isArray)
        illa.isArray = Array.isArray;
    /**
     * Returns true if the value is undefined.
     */
    function isUndefined(v) {
        return typeof v == 'undefined';
    }
    illa.isUndefined = isUndefined;
    /**
     * Returns true if the value is null.
     */
    function isNull(v) {
        return v === null;
    }
    illa.isNull = isNull;
    /**
     * Returns true if the value is undefined or null.
     */
    function isUndefinedOrNull(v) {
        return typeof v == 'undefined' || v === null;
    }
    illa.isUndefinedOrNull = isUndefinedOrNull;
    /**
     * Returns true if the value is an object and not null. Includes functions.
     */
    function isObjectNotNull(v) {
        var t = typeof v;
        return t == 'object' && v !== null || t == 'function';
    }
    illa.isObjectNotNull = isObjectNotNull;
    /**
     * Returns the type of value.
     */
    function getType(v) {
        var result = '';
        if (v == null) {
            result = v + '';
        }
        else {
            result = typeof v;
            if (result == 'object' || result == 'function') {
                result = illa.classByType[illa.classByType.toString.call(v)] || 'object';
            }
        }
        return result;
    }
    illa.getType = getType;
    /**
     * Returns the value if ‘instanceof’ is true for the given constructor.
     */
    function as(c, v) {
        return v instanceof c ? v : null;
    }
    illa.as = as;
    function bind(fn, obj) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        if (!fn)
            throw 'No function.';
        return function () {
            return fn.apply(obj, args.concat(Array.prototype.slice.call(arguments)));
        };
    }
    illa.bind = bind;
    /**
     * Binds a function to a ‘this’ context, and also prepends the specified arguments.
     * This is not type safe.
     */
    function bindUnsafe(fn, obj) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        return illa.bind.call(this, arguments);
    }
    illa.bindUnsafe = bindUnsafe;
    if (Function.prototype.bind) {
        illa.bind = illa.bindUnsafe = function (fn) {
            return fn.call.apply(fn.bind, arguments);
        };
    }
})(illa || (illa = {}));
var illa;
(function (illa) {
    var NumberUtil = (function () {
        function NumberUtil() {
        }
        NumberUtil.toStringNoLetters = function (num) {
            var result = '';
            if (!isNaN(num) && isFinite(num)) {
                if (Math.abs(num) < 1.0) {
                    var e = parseInt(num.toString().split('e-')[1]);
                    if (e) {
                        num *= Math.pow(10, e - 1);
                        result = '0.' + (new Array(e)).join('0') + num.toString().substring(2);
                    }
                    else {
                        result = num + '';
                    }
                }
                else {
                    var e = parseInt(num.toString().split('+')[1]);
                    if (e > 20) {
                        e -= 20;
                        num /= Math.pow(10, e);
                        result = num + (new Array(e + 1)).join('0');
                    }
                    else {
                        result = num + '';
                    }
                }
            }
            return result;
        };
        return NumberUtil;
    })();
    illa.NumberUtil = NumberUtil;
})(illa || (illa = {}));
var illa;
(function (illa) {
    var StringUtil = (function () {
        function StringUtil() {
        }
        StringUtil.escapeHTML = function (str) {
            return str.replace(/[&<>"']/g, function (s) {
                return StringUtil.CHAR_TO_HTML[s];
            });
        };
        StringUtil.castNicely = function (str) {
            return str == null ? '' : String(str);
        };
        StringUtil.trim = function (str) {
            return str.replace(/^\s+|\s+$/g, '');
        };
        StringUtil.escapeRegExp = function (str) {
            return str.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
        };
        StringUtil.hash = function (src) {
            var result = 0;
            if (src.length == 0)
                return result;
            for (var i = 0, n = src.length; i < n; i++) {
                result = ((result << 5) - result) + src.charCodeAt(i);
                result |= 0; // Convert to 32bit integer
            }
            return result;
        };
        StringUtil.CHAR_TO_HTML = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;' // IE8 does not support &apos;
        };
        return StringUtil;
    })();
    illa.StringUtil = StringUtil;
})(illa || (illa = {}));
/// <reference path='_module.ts'/>
/// <reference path='NumberUtil.ts'/>
/// <reference path='StringUtil.ts'/>
var illa;
(function (illa) {
    var Arrkup = (function () {
        function Arrkup(source, allowRaw) {
            if (allowRaw === void 0) { allowRaw = true; }
            this.source = source;
            this.allowRaw = allowRaw;
        }
        Arrkup.prototype.createString = function () {
            return this.processArrkup(this.getSource());
        };
        Arrkup.prototype.processArrkup = function (source) {
            var result = '';
            if (illa.isArray(source)) {
                var sourceArr = source;
                if (illa.isString(sourceArr[0])) {
                    result = this.processTag(sourceArr);
                }
                else if (illa.isArray(sourceArr[0])) {
                    result = this.processGroup(sourceArr);
                }
                else if (illa.isNull(sourceArr[0])) {
                    if (this.getAllowRaw()) {
                        result = this.processRaw(sourceArr);
                    }
                }
            }
            else {
                result = this.processNonArrkup(source);
            }
            return result;
        };
        Arrkup.prototype.processTag = function (source) {
            var tagName = source[0];
            var isSelfClosing = tagName.charAt(tagName.length - 1) == '/';
            if (isSelfClosing)
                tagName = tagName.slice(0, -1);
            var result = '<' + tagName;
            var hasAttributes = illa.isObjectNotNull(source[1]) && !illa.isArray(source[1]);
            if (hasAttributes)
                result += this.processAttributes(source[1]);
            var contentIndex = hasAttributes ? 2 : 1;
            if (isSelfClosing) {
                result += '/>';
            }
            else {
                result += '>';
                result += this.processChildren(source, contentIndex);
                result += '</' + tagName + '>';
            }
            return result;
        };
        Arrkup.prototype.processGroup = function (source) {
            return this.processChildren(source, 0);
        };
        Arrkup.prototype.processRaw = function (source) {
            var result = '';
            for (var i = 1, n = source.length; i < n; i++) {
                result += source[i] + '';
            }
            return result;
        };
        Arrkup.prototype.processNonArrkup = function (source) {
            return illa.StringUtil.escapeHTML(source + '');
        };
        Arrkup.prototype.processAttributes = function (rawProps) {
            var result = '';
            for (var prop in rawProps) {
                if (rawProps.hasOwnProperty(prop)) {
                    result += this.processAttribute(prop, rawProps[prop]);
                }
            }
            return result;
        };
        Arrkup.prototype.processAttribute = function (key, value) {
            var result = '';
            if (key) {
                if (illa.isNumber(value)) {
                    value = illa.NumberUtil.toStringNoLetters(value);
                }
                if (illa.isString(value)) {
                    result = ' ' + key + '="' + illa.StringUtil.escapeHTML(value) + '"';
                }
                else if (illa.isBoolean(value)) {
                    if (value) {
                        result += ' ' + key;
                    }
                }
            }
            return result;
        };
        Arrkup.prototype.processChildren = function (rawChildren, startIndex) {
            var result = '';
            for (var i = startIndex, n = rawChildren.length; i < n; i++) {
                result += this.processArrkup(rawChildren[i]);
            }
            return result;
        };
        Arrkup.prototype.getSource = function () {
            return this.source;
        };
        Arrkup.prototype.setSource = function (value) {
            this.source = value;
        };
        Arrkup.prototype.getAllowRaw = function () {
            return this.allowRaw;
        };
        Arrkup.prototype.setAllowRaw = function (flag) {
            this.allowRaw = flag;
        };
        Arrkup.createString = function (source, allowRaw) {
            if (allowRaw === void 0) { allowRaw = true; }
            return new Arrkup(source, allowRaw).createString();
        };
        return Arrkup;
    })();
    illa.Arrkup = Arrkup;
})(illa || (illa = {}));
/// <reference path='_module.ts'/>
var illa;
(function (illa) {
    var Log = (function () {
        function Log() {
        }
        Log.log = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            var console = illa.GLOBAL.console;
            if (console && console.log) {
                if (console.log.apply) {
                    console.log.apply(console, args);
                }
                else {
                    console.log(args.join(' '));
                }
            }
        };
        Log.info = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            var console = illa.GLOBAL.console;
            if (console && console.info) {
                if (console.info.apply) {
                    console.info.apply(console, args);
                }
                else {
                    console.info(args.join(' '));
                }
            }
            else {
                Log.log.apply(this, args);
            }
        };
        Log.warn = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            var console = illa.GLOBAL.console;
            if (console && console.warn) {
                if (console.warn.apply) {
                    console.warn.apply(console, args);
                }
                else {
                    console.warn(args.join(' '));
                }
            }
            else {
                Log.log.apply(this, args);
            }
        };
        Log.error = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            var console = illa.GLOBAL.console;
            if (console && console.error) {
                if (console.error.apply) {
                    console.error.apply(console, args);
                }
                else {
                    console.error(args.join(' '));
                }
            }
            else {
                Log.log.apply(this, args);
            }
        };
        Log.logIf = function (test) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            if (test) {
                Log.log.apply(this, [test].concat(args));
            }
        };
        Log.infoIf = function (test) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            if (test) {
                Log.info.apply(this, [test].concat(args));
            }
        };
        Log.warnIf = function (test) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            if (test) {
                Log.warn.apply(this, [test].concat(args));
            }
        };
        Log.errorIf = function (test) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            if (test) {
                Log.error.apply(this, [test].concat(args));
            }
        };
        return Log;
    })();
    illa.Log = Log;
})(illa || (illa = {}));
/// <reference path='_module.ts'/>
/// <reference path='Log.ts'/>
var illa;
(function (illa) {
    var UnitTest = (function () {
        function UnitTest() {
            this.testCount = 0;
            this.successCount = 0;
            this.failCount = 0;
        }
        UnitTest.prototype.assert = function (test, desc) {
            if (desc === void 0) { desc = ''; }
            this.testCount++;
            if (test === true) {
                this.successCount++;
            }
            else {
                this.failCount++;
                if (desc) {
                    this.warn('Test failed: ' + desc);
                }
                else {
                    throw 'Test failed.';
                }
            }
            return test;
        };
        UnitTest.prototype.assertThrowsError = function (fn, desc) {
            if (desc === void 0) { desc = ''; }
            var errorThrown = false;
            try {
                fn();
            }
            catch (e) {
                errorThrown = true;
            }
            return this.assert(errorThrown, desc);
        };
        UnitTest.prototype.assertEquals = function (received, expected, desc) {
            if (desc === void 0) { desc = ''; }
            var result = this.assert(received === expected, desc);
            if (!result) {
                this.info('Received:', received);
                this.info('Expected:', expected);
            }
            return result;
        };
        UnitTest.prototype.printStats = function () {
            this.info(this.testCount + ' tests completed: ' + this.successCount + ' succeeded, ' + this.failCount + ' failed.');
        };
        UnitTest.prototype.info = function () {
            var r = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                r[_i - 0] = arguments[_i];
            }
            illa.Log.info.apply(illa.Log, r);
        };
        UnitTest.prototype.warn = function () {
            var r = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                r[_i - 0] = arguments[_i];
            }
            illa.Log.warn.apply(illa.Log, r);
        };
        return UnitTest;
    })();
    illa.UnitTest = UnitTest;
})(illa || (illa = {}));
/// <reference path='../../lib/illa/UnitTest.ts'/>
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path='../../lib/jQuery.d.ts'/>
var berek;
(function (berek) {
    var UnitTest = (function (_super) {
        __extends(UnitTest, _super);
        function UnitTest(printTarget) {
            _super.call(this);
            this.printTarget = printTarget;
        }
        UnitTest.prototype.info = function () {
            var r = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                r[_i - 0] = arguments[_i];
            }
            if (this.printTarget) {
                var out = jQuery('<p>').text(r.join(' '));
                this.printTarget.append(out);
            }
            else {
                _super.prototype.info.apply(this, r);
            }
        };
        UnitTest.prototype.warn = function () {
            var r = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                r[_i - 0] = arguments[_i];
            }
            if (this.printTarget) {
                var out = jQuery('<p>').text(r.join(' ')).prepend('<b>WARNING: </b>');
                this.printTarget.append(out);
            }
            else {
                _super.prototype.warn.apply(this, r);
            }
        };
        return UnitTest;
    })(illa.UnitTest);
    berek.UnitTest = UnitTest;
})(berek || (berek = {}));
var illa;
(function (illa) {
    (function (Alignment) {
        Alignment[Alignment["START"] = 0] = "START";
        Alignment[Alignment["CENTER"] = 1] = "CENTER";
        Alignment[Alignment["END"] = 2] = "END";
    })(illa.Alignment || (illa.Alignment = {}));
    var Alignment = illa.Alignment;
})(illa || (illa = {}));
var illa;
(function (illa) {
    var ArrayUtil = (function () {
        function ArrayUtil() {
        }
        ArrayUtil.indexOf = function (a, v, fromIndex) {
            if (Array.prototype.indexOf) {
                return Array.prototype.indexOf.call(a, v, fromIndex);
            }
            else {
                var length = a.length;
                if (fromIndex == null) {
                    fromIndex = 0;
                }
                else if (fromIndex < 0) {
                    fromIndex = Math.max(0, length + fromIndex);
                }
                for (var i = fromIndex; i < length; i++) {
                    if (a[i] === v) {
                        return i;
                    }
                }
            }
            return -1;
        };
        ArrayUtil.removeFirst = function (a, v) {
            var i = this.indexOf(a, v);
            var removed = i >= 0;
            if (removed) {
                a.splice(i, 1)[0];
            }
            return removed;
        };
        ArrayUtil.removeAll = function (a, v) {
            var removed = false;
            for (var i = a.length - 1; i >= 0; i--) {
                if (a[i] === v) {
                    a.splice(i, 1);
                    removed = true;
                }
            }
            return removed;
        };
        return ArrayUtil;
    })();
    illa.ArrayUtil = ArrayUtil;
})(illa || (illa = {}));
var illa;
(function (illa) {
    (function (Axis2D) {
        Axis2D[Axis2D["X"] = 0] = "X";
        Axis2D[Axis2D["Y"] = 1] = "Y";
    })(illa.Axis2D || (illa.Axis2D = {}));
    var Axis2D = illa.Axis2D;
})(illa || (illa = {}));
var illa;
(function (illa) {
    (function (End) {
        End[End["MIN"] = 0] = "MIN";
        End[End["MAX"] = 1] = "MAX";
    })(illa.End || (illa.End = {}));
    var End = illa.End;
})(illa || (illa = {}));
/// <reference path='IEventCallback.ts'/>
var illa;
(function (illa) {
    var EventCallbackReg = (function () {
        function EventCallbackReg(callback, thisObj) {
            this.callback = callback;
            this.thisObj = thisObj;
        }
        return EventCallbackReg;
    })();
    illa.EventCallbackReg = EventCallbackReg;
})(illa || (illa = {}));
/// <reference path='IEventCallback.ts'/>
/// <reference path='EventCallbackReg.ts'/>
/// <reference path='IEventHandler.ts'/>
var illa;
(function (illa) {
    var EventHandler = (function () {
        function EventHandler() {
            this.callbacksByType = {};
        }
        EventHandler.prototype.getCallbackRegsByType = function (type) {
            var result = this.callbacksByType[type];
            if (!illa.isArray(result))
                result = [];
            return result;
        };
        EventHandler.prototype.getEventParent = function () {
            return null;
        };
        EventHandler.prototype.addEventCallback = function (type, cb, thisObj) {
            var reg = new illa.EventCallbackReg(cb, thisObj);
            if (illa.isArray(this.callbacksByType[type])) {
                this.removeEventCallback(type, cb, thisObj);
                this.callbacksByType[type].push(reg);
            }
            else {
                this.callbacksByType[type] = [reg];
            }
        };
        EventHandler.prototype.removeEventCallback = function (type, cb, thisObj) {
            var callbacks = this.callbacksByType[type];
            if (illa.isArray(callbacks)) {
                for (var i = 0, n = callbacks.length; i < n; i++) {
                    var callback = callbacks[i];
                    if (callback.callback === cb && callback.thisObj === thisObj) {
                        callbacks.splice(i, 1);
                        break;
                    }
                }
            }
        };
        EventHandler.prototype.removeAllEventCallbacks = function () {
            this.callbacksByType = {};
        };
        return EventHandler;
    })();
    illa.EventHandler = EventHandler;
})(illa || (illa = {}));
/// <reference path='IEventHandler.ts'/>
var illa;
(function (illa) {
    var Event = (function () {
        function Event(type, target) {
            this.type = type;
            this.target = target;
            this.isPropagationStopped = false;
            this.isImmediatePropagationStopped = false;
        }
        Event.prototype.dispatch = function () {
            this.processHandler(this.target);
        };
        Event.prototype.processHandler = function (handler) {
            this.currentTarget = handler;
            var callbackRegs = handler.getCallbackRegsByType(this.type).slice(0);
            for (var i = 0, n = callbackRegs.length; i < n; i++) {
                var callbackReg = callbackRegs[i];
                callbackReg.callback.call(callbackReg.thisObj, this);
                if (this.isImmediatePropagationStopped)
                    break;
            }
            if (!this.isPropagationStopped) {
                var parentHandler = handler.getEventParent();
                if (parentHandler)
                    this.processHandler(parentHandler);
            }
        };
        Event.prototype.getType = function () {
            return this.type;
        };
        Event.prototype.getTarget = function () {
            return this.target;
        };
        Event.prototype.getCurrentTarget = function () {
            return this.currentTarget;
        };
        Event.prototype.setIsPropagationStopped = function (flag) {
            this.isPropagationStopped = flag;
        };
        Event.prototype.getIsPropagationStopped = function () {
            return this.isPropagationStopped;
        };
        Event.prototype.setStopImmediatePropagation = function (flag) {
            this.isImmediatePropagationStopped = flag;
        };
        Event.prototype.getIsImmediatePropagationStopped = function () {
            return this.isImmediatePropagationStopped;
        };
        return Event;
    })();
    illa.Event = Event;
})(illa || (illa = {}));
/// <reference path='_module.ts'/>
/// <reference path='Event.ts'/>
/// <reference path='EventHandler.ts'/>
var illa;
(function (illa) {
    var Ticker = (function (_super) {
        __extends(Ticker, _super);
        function Ticker() {
            _super.call(this);
            this.supportsAnimationFrame = illa.isFunction(illa.GLOBAL.requestAnimationFrame) && illa.isFunction(illa.GLOBAL.cancelAnimationFrame);
            this.onTickBound = illa.bind(this.onTick, this);
            this.tickCount = 0;
            this.setIsStarted(true);
        }
        Ticker.prototype.getIsStarted = function () {
            return !illa.isUndefined(this.intervalID);
        };
        Ticker.prototype.setIsStarted = function (flag) {
            if (this.getIsStarted() == flag)
                return;
            if (flag) {
                if (this.supportsAnimationFrame) {
                    this.intervalID = requestAnimationFrame(this.onTickBound);
                }
                else {
                    this.intervalID = setInterval(this.onTickBound, 1000 / 60);
                }
            }
            else {
                if (this.supportsAnimationFrame) {
                    cancelAnimationFrame(this.intervalID);
                }
                else {
                    clearInterval(this.intervalID);
                }
                this.intervalID = undefined;
            }
        };
        Ticker.prototype.getSupportsAnimationFrame = function () {
            return this.supportsAnimationFrame;
        };
        Ticker.prototype.onTick = function () {
            new illa.Event(Ticker.EVENT_BEFORE_TICK, this).dispatch();
            this.tickCount++;
            if (this.supportsAnimationFrame) {
                this.intervalID = requestAnimationFrame(this.onTickBound);
            }
            new illa.Event(Ticker.EVENT_TICK, this).dispatch();
            new illa.Event(Ticker.EVENT_AFTER_TICK, this).dispatch();
        };
        Ticker.prototype.getTickCount = function () {
            return this.tickCount;
        };
        Ticker.EVENT_BEFORE_TICK = 'illa_Ticker_EVENT_BEFORE_TICK';
        Ticker.EVENT_TICK = 'illa_Ticker_EVENT_TICK';
        Ticker.EVENT_AFTER_TICK = 'illa_Ticker_EVENT_AFTER_TICK';
        return Ticker;
    })(illa.EventHandler);
    illa.Ticker = Ticker;
})(illa || (illa = {}));
var berek;
(function (berek) {
    (function (Context) {
        Context[Context["INNER"] = 0] = "INNER";
        Context[Context["PARENT"] = 1] = "PARENT";
        Context[Context["PAGE"] = 2] = "PAGE";
    })(berek.Context || (berek.Context = {}));
    var Context = berek.Context;
})(berek || (berek = {}));
/// <reference path='../../lib/illa/Axis2D.ts'/>
/// <reference path='../../lib/jQuery.d.ts'/>
var berek;
(function (berek) {
    var ScrollbarUtil = (function () {
        function ScrollbarUtil(box) {
            this.defaultWidth = NaN;
            this.defaultHeight = NaN;
            if (box) {
                this.box = box;
            }
            else {
                this.box = jQuery('<div>');
            }
            this.box.addClass(ScrollbarUtil.CSS_CLASS);
            this.box.prependTo('body');
        }
        ScrollbarUtil.prototype.getDefaultSize = function (axis) {
            var result = NaN;
            if (isNaN(this.defaultWidth)) {
                var boxElement = this.box[0];
                this.defaultWidth = Math.ceil(boxElement.offsetWidth - boxElement.clientWidth);
                this.defaultHeight = Math.ceil(boxElement.offsetHeight - boxElement.clientHeight);
            }
            switch (axis) {
                case 0 /* X */:
                    result = this.defaultWidth;
                    break;
                case 1 /* Y */:
                    result = this.defaultHeight;
                    break;
            }
            return result;
        };
        ScrollbarUtil.prototype.clearDefaultSizeCache = function () {
            // Only the width is checked
            this.defaultWidth = NaN;
        };
        ScrollbarUtil.isVisibleOn = function (jq, axis) {
            var elem = jq[0];
            if (!elem)
                return false;
            var overflow = '';
            switch (axis) {
                case 0 /* X */:
                    overflow = jq.css('overflow-x');
                    break;
                case 1 /* Y */:
                    overflow = jq.css('overflow-y');
                    break;
            }
            switch (overflow) {
                case 'scroll':
                    return true;
                case 'auto':
                    switch (axis) {
                        case 0 /* X */:
                            return elem.scrollWidth > jq.innerWidth();
                        case 1 /* Y */:
                            return elem.scrollHeight > jq.innerHeight();
                    }
                    break;
            }
            return false;
        };
        ScrollbarUtil.getScroll = function (jq, axis) {
            var result = NaN;
            switch (axis) {
                case 0 /* X */:
                    result = jq.scrollLeft();
                    break;
                case 1 /* Y */:
                    result = jq.scrollTop();
                    break;
            }
            return result;
        };
        ScrollbarUtil.setScroll = function (jq, value, axis) {
            switch (axis) {
                default:
                case 0 /* X */:
                    jq.scrollLeft(value);
                    if (axis != null)
                        break;
                case 1 /* Y */:
                    jq.scrollTop(value);
            }
        };
        ScrollbarUtil.CSS_CLASS = 'berek-ScrollbarUtil-box';
        return ScrollbarUtil;
    })();
    berek.ScrollbarUtil = ScrollbarUtil;
})(berek || (berek = {}));
/// <reference path='../../lib/illa/EventHandler.ts'/>
/// <reference path='../../lib/jQuery.d.ts'/>
var berek;
(function (berek) {
    var Widget = (function (_super) {
        __extends(Widget, _super);
        function Widget(jq) {
            _super.call(this);
            this.isDestroyed = false;
            this.jQuery = jq;
            this.jQuery.data(Widget.JQUERY_DATA_KEY, this);
            if (!(Widget.EVENT_DESTROYED in jQuery.event.special)) {
                jQuery.event.special[Widget.EVENT_DESTROYED] = {
                    remove: function (o) {
                        if (o.handler) {
                            o.handler(null);
                        }
                    }
                };
            }
            this.jQuery.on(Widget.EVENT_DESTROYED, illa.bind(this.onDestroyed, this));
        }
        Widget.prototype.getJQuery = function () {
            return this.jQuery;
        };
        Widget.prototype.getIsDestroyed = function () {
            return this.isDestroyed;
        };
        Widget.prototype.onDestroyed = function (e) {
            this.isDestroyed = true;
            this.removeAllEventCallbacks();
        };
        Widget.getFrom = function (source) {
            var result = null;
            if (source) {
                var stored = source.data(Widget.JQUERY_DATA_KEY);
                if (stored instanceof Widget) {
                    result = stored;
                }
            }
            return result;
        };
        Widget.JQUERY_DATA_KEY = 'berek_Widget';
        Widget.EVENT_DESTROYED = 'berek_Widget_EVENT_DESTROYED';
        return Widget;
    })(illa.EventHandler);
    berek.Widget = Widget;
})(berek || (berek = {}));
var illa;
(function (illa) {
    var Prop = (function () {
        function Prop(value, onChangedCallback, callbackThis) {
            this.value = value;
            this.onChangedCallback = onChangedCallback;
            this.callbackThis = callbackThis;
        }
        Prop.prototype.get = function () {
            return this.value;
        };
        Prop.prototype.set = function (value) {
            if (this.get() === value)
                return;
            var oldValue = this.value;
            this.value = value;
            if (this.onChangedCallback)
                this.onChangedCallback.call(this.callbackThis, oldValue, value);
        };
        Prop.prototype.toString = function () {
            return '[Prop ' + this.value + ']';
        };
        return Prop;
    })();
    illa.Prop = Prop;
})(illa || (illa = {}));
var illa;
(function (illa) {
    var Prop2 = (function () {
        function Prop2(values, onChangedCallback, callbackThis) {
            this.values = values;
            this.onChangedCallback = onChangedCallback;
            this.callbackThis = callbackThis;
        }
        Prop2.prototype.get = function (index) {
            return this.values[index];
        };
        Prop2.prototype.set = function (index, value) {
            if (this.get(index) === value)
                return;
            var oldValue = this.values[index];
            this.values[index] = value;
            if (this.onChangedCallback)
                this.onChangedCallback.call(this.callbackThis, index, oldValue, value);
        };
        Prop2.prototype.toString = function () {
            return '[Prop2 ' + this.values.join(', ') + ']';
        };
        return Prop2;
    })();
    illa.Prop2 = Prop2;
})(illa || (illa = {}));
var illa;
(function (illa) {
    var Prop4 = (function () {
        function Prop4(values, onChangedCallback, callbackThis) {
            this.values = values;
            this.onChangedCallback = onChangedCallback;
            this.callbackThis = callbackThis;
        }
        Prop4.prototype.get = function (index, index2) {
            return this.values[index * 2 + index2];
        };
        Prop4.prototype.set = function (index, index2, value) {
            if (this.get(index, index2) === value)
                return;
            var realIndex = index * 2 + index2;
            var oldValue = this.values[realIndex];
            this.values[realIndex] = value;
            if (this.onChangedCallback)
                this.onChangedCallback.call(this.callbackThis, index, index2, oldValue, value);
        };
        Prop4.prototype.toString = function () {
            return '[Prop4 ' + this.values.join(', ') + ']';
        };
        return Prop4;
    })();
    illa.Prop4 = Prop4;
})(illa || (illa = {}));
var illa;
(function (illa) {
    var Prop8 = (function () {
        function Prop8(values, onChangedCallback, callbackThis) {
            this.values = values;
            this.onChangedCallback = onChangedCallback;
            this.callbackThis = callbackThis;
        }
        Prop8.prototype.get = function (index, index2, index3) {
            return this.values[index * 4 + index2 * 2 + index3];
        };
        Prop8.prototype.set = function (index, index2, index3, value) {
            if (this.get(index, index2, index3) === value)
                return;
            var realIndex = index * 4 + index2 * 2 + index3;
            var oldValue = this.values[realIndex];
            this.values[realIndex] = value;
            if (this.onChangedCallback)
                this.onChangedCallback.call(this.callbackThis, index, index2, index3, oldValue, value);
        };
        Prop8.prototype.toString = function () {
            return '[Prop8 ' + this.values.join(', ') + ']';
        };
        return Prop8;
    })();
    illa.Prop8 = Prop8;
})(illa || (illa = {}));
/// <reference path='../../lib/illa/Alignment.ts'/>
/// <reference path='../../lib/illa/Axis2D.ts'/>
/// <reference path='../../lib/illa/End.ts'/>
/// <reference path='../../lib/illa/Log.ts'/>
/// <reference path='../../lib/illa/Prop.ts'/>
/// <reference path='../../lib/illa/Prop2.ts'/>
/// <reference path='../../lib/illa/Prop4.ts'/>
/// <reference path='../../lib/illa/Prop8.ts'/>
/// <reference path='IBoxImp.ts'/>
var deflex;
(function (deflex) {
    var BoxModel = (function () {
        function BoxModel(imp) {
            this.imp = imp;
            this.outOffset = new illa.Prop2([0, 0], null, null);
            this.outSize = new illa.Prop2([0, 0], null, null);
            this.outShowScrollbar = new illa.Prop2([false, false], this.onSettingChanged, this);
            this.inset = new illa.Prop4([0, 0, 0, 0], this.onSettingChanged, this);
            this.sizeLimit = new illa.Prop4([0, Infinity, 0, Infinity], this.onSettingChanged, this);
            this.shrinkWrapSizeLimit = new illa.Prop8([0, Infinity, 0, Infinity, 0, Infinity, 0, Infinity], this.onSettingChanged, this);
            this.spaceBefore = new illa.Prop2([NaN, NaN], this.onSettingChanged, this);
            this.defaultSpaceBefore = new illa.Prop2([0, 0], this.onSettingChanged, this);
            this.weight = new illa.Prop2([1, 1], this.onSettingChanged, this);
            this.shrinkWrap = new illa.Prop2([true, true], this.onSettingChanged, this);
            this.useContentWeight = new illa.Prop2([false, false], this.onSettingChanged, this);
            this.alignment = new illa.Prop2([0 /* START */, 0 /* START */], this.onSettingChanged, this);
            this.isSpacer = new illa.Prop(false, this.onSettingChanged, this);
            this.direction = new illa.Prop(1 /* Y */, this.onSettingChanged, this);
            this.applySizeToSelf = new illa.Prop(false, this.onSettingChanged, this);
            this.mayShowScrollbar = new illa.Prop2([true, true], this.onSettingChanged, this);
            this.children = [];
            this.needsLayoutUpdate = false;
            this.name = '';
        }
        BoxModel.prototype.onSettingChanged = function () {
            this.needsLayoutUpdate = true;
        };
        BoxModel.prototype.solveLayout = function () {
            for (var axis = 0 /* X */; axis <= 1 /* Y */; axis++) {
                this.outShowScrollbar.set(axis, false);
            }
            while (this.needsLayoutUpdate) {
                this.solveLayoutStep();
            }
        };
        BoxModel.prototype.solveLayoutStep = function () {
            this.needsLayoutUpdate = false;
            this.applyShrinkWrap();
            if (this.needsLayoutUpdate) {
                // Shrink wrap changed size limits - new size must be applied
                return;
            }
            for (var axis = 0 /* X */; axis <= 1 /* Y */; axis++) {
                if (this.applySizeToSelf.get()) {
                    this.outSize.set(axis, this.sizeLimit.get(axis, 0 /* MIN */));
                }
                if (this.direction.get() == axis) {
                    var remainingSpace = this.shareSpaceAmongChildren(axis);
                    this.stackChildren(axis, remainingSpace);
                }
                else {
                    var contentSpace = this.getContentSpace(axis);
                    var largestMinSize = this.getLargestChildSizeLimit(axis, 0 /* MIN */);
                    var sizeToSet = Math.max(contentSpace, largestMinSize);
                    this.setChildSizes(axis, sizeToSet);
                    this.alignChildren(axis, sizeToSet);
                    var remainingSpace = contentSpace - largestMinSize;
                }
                if (this.mayShowScrollbar.get(1 - axis)) {
                    this.outShowScrollbar.set(1 - axis, remainingSpace + this.inset.get(axis, 1 /* MAX */) < 0);
                }
            }
            if (this.needsLayoutUpdate) {
                // Scrollbar visibility changed - own or content size will change
                return;
            }
            for (var i = 0, n = this.children.length; i < n; i++) {
                var child = this.children[i];
                child.solveLayoutStep();
                this.needsLayoutUpdate = this.needsLayoutUpdate || child.needsLayoutUpdate;
            }
        };
        BoxModel.prototype.shareSpaceAmongChildren = function (axis) {
            var allWeight = 0;
            for (var i = 0, n = this.children.length; i < n; i++) {
                var item = this.children[i];
                item.outSize.set(axis, item.sizeLimit.get(axis, 0 /* MIN */));
                allWeight += item.weight.get(axis);
            }
            var growables = this.children.slice(0);
            growables.sort(function (a, b) {
                // Largest maxSize comes first
                var result = b.sizeLimit.get(axis, 1 /* MAX */) - a.sizeLimit.get(axis, 1 /* MAX */);
                return result || 0; // Avoid NaN
            });
            var remainingSpace = this.getContentSpace(axis) - this.getChildSizeLimits(axis, 0 /* MIN */);
            while (remainingSpace > 0) {
                while (growables.length && growables.length > remainingSpace) {
                    var maxedOut = growables.pop();
                    allWeight -= maxedOut.weight.get(axis);
                }
                if (growables.length == 0 || allWeight == 0) {
                    break;
                }
                var spaceUnit = Math.floor(remainingSpace / allWeight) || 1;
                for (var i = 0, n = growables.length; i < n; i++) {
                    var growable = growables[i];
                    var prevSize = growable.outSize.get(axis);
                    var newSize = Math.max(growable.sizeLimit.get(axis, 0 /* MIN */), Math.min(growable.sizeLimit.get(axis, 1 /* MAX */), prevSize + spaceUnit * growable.weight.get(axis)));
                    if (newSize == prevSize) {
                        growables.splice(i, 1);
                        allWeight -= growable.weight.get(axis);
                        i--;
                        n--;
                    }
                    else {
                        growable.outSize.set(axis, newSize);
                        remainingSpace -= newSize - prevSize;
                    }
                }
            }
            return remainingSpace;
        };
        BoxModel.prototype.stackChildren = function (axis, remainingSpace) {
            if (this.alignment.get(axis) == 1 /* CENTER */) {
                var offset = Math.floor(remainingSpace / 2);
            }
            else if (this.alignment.get(axis) == 2 /* END */) {
                var offset = remainingSpace;
            }
            else {
                var offset = 0;
            }
            offset = Math.max(0, offset);
            offset += this.inset.get(axis, 0 /* MIN */);
            for (var i = 0, n = this.children.length; i < n; i++) {
                var item = this.children[i];
                if (i > 0) {
                    if (isNaN(item.spaceBefore.get(axis))) {
                        offset += this.defaultSpaceBefore.get(axis);
                    }
                    else {
                        offset += item.spaceBefore.get(axis);
                    }
                }
                item.outOffset.set(axis, offset);
                offset += item.outSize.get(axis);
            }
        };
        BoxModel.prototype.alignChildren = function (axis, contentSpace) {
            var insetStart = this.inset.get(axis, 0 /* MIN */);
            for (var i = 0, n = this.children.length; i < n; i++) {
                var item = this.children[i];
                var offset = insetStart;
                switch (this.alignment.get(axis)) {
                    case 1 /* CENTER */:
                        offset += Math.max(0, (contentSpace - item.outSize.get(axis)) / 2);
                        break;
                    case 2 /* END */:
                        offset += Math.max(0, contentSpace - item.outSize.get(axis));
                        break;
                }
                item.outOffset.set(axis, offset);
            }
        };
        BoxModel.prototype.setChildSizes = function (axis, size) {
            for (var i = 0, n = this.children.length; i < n; i++) {
                var item = this.children[i];
                var sizeToSet = Math.max(item.sizeLimit.get(axis, 0 /* MIN */), Math.min(item.sizeLimit.get(axis, 1 /* MAX */), size));
                item.outSize.set(axis, sizeToSet);
            }
        };
        BoxModel.prototype.applyContentWeight = function () {
            for (var i = 0, n = this.children.length; i < n; i++) {
                this.children[i].applyContentWeight();
            }
            for (var axis = 0 /* X */; axis <= 1 /* Y */; axis++) {
                if (this.useContentWeight.get(axis)) {
                    var childrenWeight = 0;
                    for (var j = 0, o = this.children.length; j < o; j++) {
                        childrenWeight += this.children[j].weight.get(axis);
                    }
                    this.weight.set(axis, childrenWeight);
                }
            }
        };
        BoxModel.prototype.getShrinkWrappedSizeLimit = function (axis, end) {
            if (axis == this.direction.get()) {
                var result = this.getChildSizeLimits(axis, end);
            }
            else {
                var result = this.getLargestChildSizeLimit(axis, end);
            }
            result = Math.max(this.shrinkWrapSizeLimit.get(axis, end, 0 /* MIN */), Math.min(this.shrinkWrapSizeLimit.get(axis, end, 1 /* MAX */), result));
            result += this.inset.get(axis, 0 /* MIN */);
            result += this.inset.get(axis, 1 /* MAX */);
            if (this.outShowScrollbar.get(axis)) {
                result += this.imp.getScrollbarSize(axis);
            }
            return result;
        };
        BoxModel.prototype.applyShrinkWrap = function () {
            for (var axis = 0 /* X */; axis <= 1 /* Y */; axis++) {
                if (this.shrinkWrap.get(axis)) {
                    for (var end = 0 /* MIN */; end <= 1 /* MAX */; end++) {
                        for (var end2 = 0 /* MIN */; end2 <= 1 /* MAX */; end2++) {
                            this.sizeLimit.set(axis, end, this.getShrinkWrappedSizeLimit(axis, end));
                        }
                    }
                }
            }
        };
        BoxModel.prototype.getContentSpace = function (axis) {
            var result = this.outSize.get(axis) - this.inset.get(axis, 0 /* MIN */) - this.inset.get(axis, 1 /* MAX */);
            if (this.outShowScrollbar.get(axis)) {
                result -= this.imp.getScrollbarSize(axis);
            }
            return result;
        };
        BoxModel.prototype.getChildSizeLimits = function (axis, end) {
            var result = 0;
            for (var i = 0, n = this.children.length; i < n; i++) {
                var child = this.children[i];
                // Spacers must not expand maximum size of shrinkwrapped container
                var endToGet = child.isSpacer.get() ? 0 /* MIN */ : end;
                result += child.sizeLimit.get(axis, endToGet);
                if (i > 0) {
                    var childSpaceBefore = child.spaceBefore.get(axis);
                    if (isNaN(childSpaceBefore)) {
                        result += this.defaultSpaceBefore.get(axis);
                    }
                    else {
                        result += childSpaceBefore;
                    }
                }
                if (!isFinite(result)) {
                    break;
                }
            }
            return result;
        };
        BoxModel.prototype.getLargestChildSizeLimit = function (axis, end) {
            var result = 0;
            for (var i = 0, n = this.children.length; i < n; i++) {
                var child = this.children[i];
                // Spacers must not expand maximum size of shrinkwrapped container
                var endToGet = child.isSpacer.get() ? 0 /* MIN */ : end;
                result = Math.max(result, child.sizeLimit.get(axis, endToGet));
                if (!isFinite(result)) {
                    break;
                }
            }
            return result;
        };
        BoxModel.prototype.getImp = function () {
            return this.imp;
        };
        return BoxModel;
    })();
    deflex.BoxModel = BoxModel;
})(deflex || (deflex = {}));
var deflex;
(function (deflex) {
    (function (SizeLimitSource) {
        SizeLimitSource[SizeLimitSource["SELF"] = 0] = "SELF";
        SizeLimitSource[SizeLimitSource["CHILD_BOXES"] = 1] = "CHILD_BOXES";
        SizeLimitSource[SizeLimitSource["JQUERY_AUTO"] = 2] = "JQUERY_AUTO";
        SizeLimitSource[SizeLimitSource["JQUERY_FULL"] = 3] = "JQUERY_FULL";
    })(deflex.SizeLimitSource || (deflex.SizeLimitSource = {}));
    var SizeLimitSource = deflex.SizeLimitSource;
})(deflex || (deflex = {}));
var deflex;
(function (deflex) {
    var StyleUtil = (function () {
        function StyleUtil() {
        }
        StyleUtil.readBoolean = function (value) {
            switch (value.toLowerCase()) {
                case 'true':
                    return true;
                case 'false':
                    return false;
                default:
                    throw 'Invalid value. Expected boolean, got: ' + value;
            }
        };
        StyleUtil.readNumber = function (value) {
            switch (value.toLowerCase()) {
                case 'nan':
                    return NaN;
                case 'infinity':
                    return Infinity;
                case '-infinity':
                    return -Infinity;
                default:
                    var result = Number(value.replace(/\s*px/ig, ''));
                    if (isNaN(result))
                        throw 'Invalid value. Expected number, got: ' + value;
                    return result;
            }
        };
        StyleUtil.readAxis2D = function (value) {
            switch (value.toLowerCase()) {
                case 'x':
                    return 0 /* X */;
                case 'y':
                    return 1 /* Y */;
                default:
                    throw 'Invalid value. Expected axis, got: ' + value;
            }
        };
        StyleUtil.readAlignment = function (value) {
            switch (value.toLowerCase()) {
                case 'start':
                    return 0 /* START */;
                case 'center':
                    return 1 /* CENTER */;
                case 'end':
                    return 2 /* END */;
                default:
                    throw 'Invalid value. Expected alignment, got: ' + value;
            }
        };
        StyleUtil.readSizeLimitSource = function (value) {
            switch (value.toLowerCase()) {
                case 'self':
                    return 0 /* SELF */;
                case 'child-boxes':
                    return 1 /* CHILD_BOXES */;
                case 'jquery-auto':
                    return 2 /* JQUERY_AUTO */;
                case 'jquery-full':
                    return 3 /* JQUERY_FULL */;
                default:
                    throw 'Invalid value. Expected size limit source, got: ' + value;
            }
        };
        return StyleUtil;
    })();
    deflex.StyleUtil = StyleUtil;
})(deflex || (deflex = {}));
/// <reference path='../../lib/illa/_module.ts'/>
/// <reference path='../../lib/illa/Alignment.ts'/>
/// <reference path='../../lib/illa/ArrayUtil.ts'/>
/// <reference path='../../lib/illa/Axis2D.ts'/>
/// <reference path='../../lib/illa/End.ts'/>
/// <reference path='../../lib/illa/EventHandler.ts'/>
/// <reference path='../../lib/illa/Log.ts'/>
/// <reference path='../../lib/illa/StringUtil.ts'/>
/// <reference path='../../lib/illa/Ticker.ts'/>
/// <reference path='../../lib/jQuery.d.ts'/>
/// <reference path='../../lib/berek/Context.ts'/>
/// <reference path='../../lib/berek/ScrollbarUtil.ts'/>
/// <reference path='../../lib/berek/Widget.ts'/>
/// <reference path='BoxModel.ts'/>
/// <reference path='IBoxImp.ts'/>
/// <reference path='SizeLimitSource.ts'/>
/// <reference path='StyleUtil.ts'/>
var deflex;
(function (deflex) {
    var Box = (function (_super) {
        __extends(Box, _super);
        function Box(jq) {
            _super.call(this, jq || jQuery('<div>'));
            this.sizeCacheX = 0;
            this.sizeCacheY = 0;
            this.sizeLimitSourceX = 1 /* CHILD_BOXES */;
            this.sizeLimitSourceY = 1 /* CHILD_BOXES */;
            this.offsetCacheX = 0;
            this.offsetCacheY = 0;
            this.children = [];
            this.zIndex = 0;
            this.isRoot = false;
            this.allowsVisibility = true;
            this.allowsLayoutActive = true;
            this.overflowIsVisible = false;
            this.doubleCheckLayout = true;
            this.isSolvingLayout = false;
            this.model = new deflex.BoxModel(this);
            //			this.name = 'Box-' + Box.nextId++;
            if (jq) {
                var relatedBoxJQ = jq.prev('.' + Box.CSS_CLASS);
                if (!relatedBoxJQ.length)
                    relatedBoxJQ = undefined;
                this.setParent(jq.parent(), relatedBoxJQ ? 1 /* MAX */ : 0 /* MIN */, relatedBoxJQ, true);
            }
            this.getJQuery().addClass(Box.CSS_CLASS);
            if (!Box.scrollbarUtil) {
                Box.scrollbarUtil = new berek.ScrollbarUtil();
            }
        }
        Box.prototype.onRootTick = function (e) {
            var startTime = new Date().getTime();
            this.isSolvingLayout = true;
            var solutionCount = 0;
            this.checkNeedsLayoutUpdate();
            while (this.getNeedsLayoutUpdate()) {
                solutionCount++;
                this.getScrollbarUtil().clearDefaultSizeCache();
                this.updateModel();
                this.solveLayout();
                if (this.doubleCheckLayout) {
                    this.checkNeedsLayoutUpdate();
                    if (this.getNeedsLayoutUpdate() && solutionCount + 1 > Box.solutionCountLimit) {
                        illa.Log.warn(this.name || '', 'Solution count limit reached - disabling layout double checks.');
                        this.setDoubleCheckLayout(false);
                        break;
                    }
                }
            }
            if (solutionCount) {
                illa.Log.infoIf(this.name, 'layout solved:', new Date().getTime() - startTime, 'ms, solution count:', solutionCount);
            }
            this.isSolvingLayout = false;
        };
        Box.prototype.onSolveLayoutNowRequested = function (e) {
            if (!this.isSolvingLayout) {
                this.onRootTick(null);
            }
        };
        Box.prototype.checkNeedsLayoutUpdate = function () {
            for (var i = 0, n = this.children.length; i < n; i++) {
                var child = this.children[i];
                if (child.getIsLayoutActive()) {
                    child.checkNeedsLayoutUpdate();
                    if (child.getNeedsLayoutUpdate()) {
                        this.setNeedsLayoutUpdate(true);
                    }
                }
            }
            var neededLayoutUpdate = this.getNeedsLayoutUpdate();
            for (var axis = 0 /* X */; axis <= 1 /* Y */; axis++) {
                var sizeSource = this.getSizeLimitSource(axis);
                if (sizeSource == 2 /* JQUERY_AUTO */ || sizeSource == 3 /* JQUERY_FULL */) {
                    var size = this.getSize(axis);
                    this.model.sizeLimit.set(axis, 0 /* MIN */, size);
                    this.model.sizeLimit.set(axis, 1 /* MAX */, size);
                }
            }
            if (!neededLayoutUpdate && this.getNeedsLayoutUpdate()) {
                illa.Log.infoIf(this.name, 'initiates layout update. Size limit set to:', this.model.sizeLimit.toString());
            }
        };
        Box.prototype.updateModel = function () {
            var childModels = [];
            for (var i = 0, n = this.children.length; i < n; i++) {
                var childBox = this.children[i];
                if (childBox.getIsLayoutActive()) {
                    childModels.push(childBox.getModel());
                    childBox.updateModel();
                }
            }
            this.model.children = childModels;
            if (this.name)
                this.model.name = this.name + 'Model';
            else
                this.model.name = '';
        };
        Box.prototype.solveLayout = function () {
            this.model.applyContentWeight();
            var startTime = new Date().getTime();
            while (this.getNeedsLayoutUpdate()) {
                this.model.solveLayout();
                this.applyModel();
                if (new Date().getTime() > startTime + 3000) {
                    illa.Log.warn(this.name || '', 'Layout solving takes too long - breaking.');
                    break;
                }
            }
        };
        Box.prototype.applyModel = function () {
            var model = this.model;
            for (var axis = 0 /* X */; axis <= 1 /* Y */; axis++) {
                this.setOffset(model.outOffset.get(axis), axis);
                this.setShowScrollbar(model.outShowScrollbar.get(axis), axis);
                var sizeSource = this.getSizeLimitSource(axis);
                if (sizeSource == 0 /* SELF */ || sizeSource == 1 /* CHILD_BOXES */) {
                    this.setSize(model.outSize.get(axis), axis);
                }
            }
            for (var i = 0, n = this.children.length; i < n; i++) {
                var child = this.children[i];
                if (child.getIsLayoutActive()) {
                    child.applyModel();
                    this.setNeedsLayoutUpdate(this.getNeedsLayoutUpdate() || child.getNeedsLayoutUpdate());
                }
            }
        };
        Box.prototype.clearSizeCache = function (axis) {
            switch (axis) {
                default:
                case 0 /* X */:
                    this.sizeCacheX = NaN;
                    if (axis != null)
                        break;
                case 1 /* Y */:
                    this.sizeCacheY = NaN;
            }
        };
        Box.prototype.clearOffsetCache = function (axis) {
            switch (axis) {
                default:
                case 0 /* X */:
                    this.offsetCacheX = NaN;
                    if (axis != null)
                        break;
                case 1 /* Y */:
                    this.offsetCacheY = NaN;
            }
        };
        Box.prototype.getSize = function (axis, context) {
            if (context === void 0) { context = 1 /* PARENT */; }
            var result = NaN;
            switch (axis) {
                case 0 /* X */:
                    if (isNaN(this.sizeCacheX)) {
                        result = this.getJQuery()[0].offsetWidth;
                    }
                    else {
                        result = this.sizeCacheX;
                    }
                    break;
                case 1 /* Y */:
                    if (isNaN(this.sizeCacheY)) {
                        result = this.getJQuery()[0].offsetHeight;
                    }
                    else {
                        result = this.sizeCacheY;
                    }
                    break;
            }
            if (context == 0 /* INNER */) {
                result -= this.getVisibleScrollbarSize(axis);
                result = Math.max(0, result);
            }
            return result;
        };
        Box.prototype.setSize = function (v, a, context) {
            if (context === void 0) { context = 1 /* PARENT */; }
            for (var axis = a || 0 /* X */, lastAxis = (a != null ? a : 1 /* Y */); axis <= lastAxis; axis++) {
                var value = v;
                if (context == 0 /* INNER */) {
                    value += this.getVisibleScrollbarSize(axis);
                }
                if (isNaN(value) || !isFinite(value)) {
                    value = 0;
                }
                else {
                    value = Math.max(0, Math.round(value));
                }
                switch (axis) {
                    case 0 /* X */:
                        if (this.sizeCacheX != value) {
                            this.sizeCacheX = value;
                            this.getJQuery()[0].style.width = value + 'px';
                        }
                        break;
                    case 1 /* Y */:
                        if (this.sizeCacheY != value) {
                            this.sizeCacheY = value;
                            this.getJQuery()[0].style.height = value + 'px';
                        }
                        break;
                }
            }
        };
        Box.prototype.getSizeLimitSource = function (axis) {
            var result = 0 /* SELF */;
            switch (axis) {
                case 0 /* X */:
                    result = this.sizeLimitSourceX;
                    break;
                case 1 /* Y */:
                    result = this.sizeLimitSourceY;
                    break;
            }
            return result;
        };
        Box.prototype.setSizeLimitSource = function (value, a) {
            switch (value) {
                case 2 /* JQUERY_AUTO */:
                case 3 /* JQUERY_FULL */:
                    this.clearSizeCache(axis);
            }
            for (var axis = a || 0 /* X */, lastAxis = (a != null ? a : 1 /* Y */); axis <= lastAxis; axis++) {
                var prevSizeSource = this.getSizeLimitSource(axis);
                if (prevSizeSource === value)
                    continue;
                switch (axis) {
                    case 0 /* X */:
                        this.sizeLimitSourceX = value;
                        break;
                    case 1 /* Y */:
                        this.sizeLimitSourceY = value;
                        break;
                }
                this.setNeedsLayoutUpdate(true);
                switch (prevSizeSource) {
                    case 2 /* JQUERY_AUTO */:
                        this.getJQuery().removeClass(axis == 0 /* X */ ? Box.CSS_CLASS_SIZE_AUTO_X : Box.CSS_CLASS_SIZE_AUTO_Y);
                        break;
                    case 3 /* JQUERY_FULL */:
                        this.getJQuery().removeClass(axis == 0 /* X */ ? Box.CSS_CLASS_SIZE_FULL_X : Box.CSS_CLASS_SIZE_FULL_Y);
                        break;
                    case 1 /* CHILD_BOXES */:
                        this.model.shrinkWrap.set(axis, false);
                        break;
                }
                switch (value) {
                    case 2 /* JQUERY_AUTO */:
                        this.getJQuery().addClass(axis == 0 /* X */ ? Box.CSS_CLASS_SIZE_AUTO_X : Box.CSS_CLASS_SIZE_AUTO_Y);
                        break;
                    case 3 /* JQUERY_FULL */:
                        this.getJQuery().addClass(axis == 0 /* X */ ? Box.CSS_CLASS_SIZE_FULL_X : Box.CSS_CLASS_SIZE_FULL_Y);
                        break;
                    case 1 /* CHILD_BOXES */:
                        this.model.shrinkWrap.set(axis, true);
                        break;
                }
            }
        };
        Box.prototype.getOffset = function (axis, alignment, context) {
            if (alignment === void 0) { alignment = 0 /* START */; }
            if (context === void 0) { context = 1 /* PARENT */; }
            var result = NaN;
            var offset;
            switch (context) {
                case 0 /* INNER */:
                    offset = { left: 0, top: 0 };
                    break;
                case 1 /* PARENT */:
                    if (isNaN(this.offsetCacheX) || isNaN(this.offsetCacheY)) {
                        offset = this.getJQuery().position();
                    }
                    else {
                        offset = { left: this.offsetCacheX, top: this.offsetCacheY };
                    }
                    break;
                case 2 /* PAGE */:
                    offset = this.getJQuery().offset();
                    break;
            }
            switch (axis) {
                case 0 /* X */:
                    result = offset.left;
                    break;
                case 1 /* Y */:
                    result = offset.top;
                    break;
            }
            if (alignment != 0 /* START */) {
                var size = this.getSize(axis, context);
                if (alignment == 1 /* CENTER */) {
                    size = size / 2;
                }
                result += size;
            }
            return result;
        };
        Box.prototype.setOffset = function (v, a, alignment, context, preventNegative) {
            if (alignment === void 0) { alignment = 0 /* START */; }
            if (context === void 0) { context = 1 /* PARENT */; }
            if (preventNegative === void 0) { preventNegative = false; }
            for (var axis = a || 0 /* X */, lastAxis = (a != null ? a : 1 /* Y */); axis <= lastAxis; axis++) {
                var value = v;
                if (context == 2 /* PAGE */) {
                    var pageOffset = this.getOffset(axis, 0 /* START */, 2 /* PAGE */);
                    var currentOffset = this.getOffset(axis);
                    value -= pageOffset - currentOffset; // Page offset of parent
                }
                else if (context == 0 /* INNER */) {
                    value += this.getOffset(axis); // Parent offset
                }
                if (alignment != 0 /* START */) {
                    var size = this.getSize(axis, context);
                    if (alignment == 1 /* CENTER */) {
                        size = size / 2;
                    }
                    value -= size;
                }
                if (isNaN(value) || !isFinite(value)) {
                    value = 0;
                }
                else {
                    value = Math.round(value);
                    if (preventNegative)
                        value = Math.max(0, value);
                }
                switch (axis) {
                    case 0 /* X */:
                        if (this.offsetCacheX != value) {
                            this.offsetCacheX = value;
                            this.getJQuery()[0].style.left = value + 'px';
                        }
                        break;
                    case 1 /* Y */:
                        if (this.offsetCacheY != value) {
                            this.offsetCacheY = value;
                            this.getJQuery()[0].style.top = value + 'px';
                        }
                        break;
                }
            }
        };
        Box.prototype.getShowScrollbar = function (axis) {
            var overflow = '';
            switch (axis) {
                case 0 /* X */:
                    overflow = this.getJQuery()[0].style.overflowY;
                    break;
                case 1 /* Y */:
                    overflow = this.getJQuery()[0].style.overflowX;
                    break;
            }
            return overflow == 'scroll';
        };
        Box.prototype.setShowScrollbar = function (flag, axis) {
            var overflow = flag ? 'scroll' : '';
            switch (axis) {
                default:
                case 0 /* X */:
                    if (this.getShowScrollbar(0 /* X */) != flag) {
                        this.getJQuery()[0].style.overflowY = overflow;
                    }
                    if (axis != null)
                        break;
                case 1 /* Y */:
                    if (this.getShowScrollbar(1 /* Y */) != flag) {
                        this.getJQuery()[0].style.overflowX = overflow;
                    }
            }
        };
        Box.prototype.getVisibleScrollbarSize = function (axis) {
            var result = 0;
            if (this.getShowScrollbar(axis)) {
                result = this.getScrollbarSize(axis);
            }
            return result;
        };
        Box.prototype.getScrollbarSize = function (axis) {
            return this.getScrollbarUtil().getDefaultSize(axis);
        };
        Box.prototype.getScrollbarUtil = function () {
            return Box.scrollbarUtil;
        };
        Box.getFrom = function (source) {
            var result = berek.Widget.getFrom(source);
            if (!(result instanceof Box)) {
                result = null;
            }
            return result;
        };
        Box.prototype.setParent = function (parent, end, related, dontModifyDOM) {
            if (end === void 0) { end = 1 /* MAX */; }
            if (related === void 0) { related = null; }
            if (dontModifyDOM === void 0) { dontModifyDOM = false; }
            var parentBox = null;
            var parentJQuery = null;
            var relatedBox = null;
            var relatedJQuery = null;
            if (parent instanceof Box) {
                parentBox = parent;
            }
            else if (parent instanceof jQuery) {
                parentJQuery = parent;
                parentBox = Box.getFrom(parentJQuery);
            }
            else if (typeof parent == 'string') {
                parentJQuery = jQuery(parent);
            }
            if (related instanceof Box) {
                relatedBox = related;
                // If a parent jQuery and a related Box were specified, get the related jQuery
                // because the related Box is only used when the parent is a Box.
                if (!parentBox)
                    relatedJQuery = relatedBox.getJQuery();
            }
            else if (related instanceof jQuery) {
                relatedJQuery = related;
                relatedBox = Box.getFrom(relatedJQuery);
                // If a parent Box and a related jQuery were specified, ignore the parent Box and
                // insert next to the related jQuery.
                if (!relatedBox)
                    parentBox = null;
            }
            if (this.parentBox) {
                this.parentBox.removeChild(this);
            }
            if (parentBox) {
                if (this.parentBox != parentBox) {
                    if (!dontModifyDOM) {
                        this.getJQuery().appendTo(parentBox.getJQuery());
                    }
                    this.parentBox = parentBox;
                    this.parentJQuery = null;
                }
                this.parentBox.insertChild(this, end, relatedBox);
                this.setIsRoot(false);
            }
            else if (relatedJQuery) {
                this.parentBox = null;
                this.parentJQuery = relatedJQuery.parent();
                if (!dontModifyDOM) {
                    switch (end) {
                        case 0 /* MIN */:
                            this.getJQuery().insertBefore(relatedJQuery);
                            break;
                        case 1 /* MAX */:
                            this.getJQuery().insertAfter(relatedJQuery);
                            break;
                    }
                }
                this.setIsRoot(true);
            }
            else if (parentJQuery) {
                this.parentBox = null;
                this.parentJQuery = parentJQuery;
                if (!dontModifyDOM) {
                    switch (end) {
                        case 0 /* MIN */:
                            this.getJQuery().prependTo(parentJQuery);
                            break;
                        case 1 /* MAX */:
                            this.getJQuery().appendTo(parentJQuery);
                            break;
                    }
                }
                this.setIsRoot(true);
            }
            else {
                if (!dontModifyDOM) {
                    this.getJQuery().detach();
                }
                this.parentBox = null;
                this.parentJQuery = null;
                this.setIsRoot(false);
            }
            this.setNeedsLayoutUpdate(true);
        };
        Box.prototype.getParentBox = function () {
            return this.parentBox;
        };
        Box.prototype.getParentJQuery = function () {
            return this.parentJQuery;
        };
        Box.prototype.getEventParent = function () {
            if (this.parentBox) {
                return this.parentBox;
            }
            else if (this.parentJQuery) {
                return Box.getFrom(this.parentJQuery.closest('.' + Box.CSS_CLASS));
            }
            else {
                return null;
            }
        };
        Box.prototype.insertChild = function (child, end, related) {
            if (end === void 0) { end = 1 /* MAX */; }
            if (related === void 0) { related = null; }
            var newIndex = 0;
            if (related) {
                var relatedIndex = this.getChildIndex(related);
                if (relatedIndex == -1)
                    throw 'Related not a child.';
                switch (end) {
                    case 0 /* MIN */:
                        newIndex = relatedIndex;
                        break;
                    case 1 /* MAX */:
                        newIndex = relatedIndex + 1;
                        break;
                }
                this.children.splice(newIndex, 0, child);
            }
            else {
                switch (end) {
                    case 0 /* MIN */:
                        this.children.unshift(child);
                        break;
                    case 1 /* MAX */:
                        newIndex = this.children.push(child) - 1;
                        break;
                }
            }
            if (child.name)
                illa.Log.infoIf(this.name, 'inserted child:', child.name);
            this.updateChildZIndexes(newIndex);
            this.setNeedsLayoutUpdate(true);
        };
        Box.prototype.moveChild = function (child, end, related) {
            if (end === void 0) { end = 1 /* MAX */; }
            if (related === void 0) { related = null; }
            this.removeChild(child, true);
            this.insertChild(child, end, related);
        };
        Box.prototype.removeChild = function (child, throwError) {
            if (throwError === void 0) { throwError = false; }
            var index = this.getChildIndex(child);
            if (index == -1) {
                if (throwError)
                    throw 'Not a child.';
            }
            else {
                this.children.splice(index, 1);
                if (child.name)
                    illa.Log.infoIf(this.name, 'removed child:', child.name);
                this.updateChildZIndexes(index);
            }
            this.setNeedsLayoutUpdate(true);
        };
        Box.prototype.getChildIndex = function (child) {
            return illa.ArrayUtil.indexOf(this.children, child);
        };
        Box.prototype.destroy = function () {
            this.getJQuery().remove();
        };
        Box.prototype.onDestroyed = function (e) {
            _super.prototype.onDestroyed.call(this, e);
            illa.Log.infoIf(this.name, 'is being destroyed.');
            var hasNotDestroyedParentBox = this.parentBox && !this.parentBox.getIsDestroyed();
            var hasParentJQ = this.parentJQuery != null;
            if (hasNotDestroyedParentBox || hasParentJQ) {
                illa.Log.infoIf(this.name, 'is unsetting its parent.');
                this.setParent(null, undefined, undefined, true);
            }
        };
        Box.prototype.getZIndex = function () {
            return this.zIndex;
        };
        Box.prototype.setZIndex = function (value) {
            if (this.zIndex == value)
                return;
            illa.Log.infoIf(this.name, 'has a new z-index: ' + value);
            this.zIndex = value;
            this.getJQuery()[0].style.zIndex = value;
        };
        Box.prototype.updateChildZIndexes = function (startIndex) {
            if (startIndex === void 0) { startIndex = 0; }
            for (var i = startIndex, n = this.children.length; i < n; i++) {
                this.children[i].setZIndex(i);
            }
        };
        Box.prototype.getIsRoot = function () {
            return this.isRoot;
        };
        Box.prototype.setIsRoot = function (value) {
            if (this.isRoot == value)
                return;
            this.isRoot = value;
            this.model.applySizeToSelf.set(value);
            this.getJQuery().toggleClass(Box.CSS_CLASS_IS_ROOT, value);
            if (value) {
                Box.ROOT_TICKER.addEventCallback(illa.Ticker.EVENT_TICK, this.onRootTick, this);
                this.addEventCallback(Box.EVENT_SOLVE_LAYOUT_NOW_REQUESTED, this.onSolveLayoutNowRequested, this);
            }
            else {
                Box.ROOT_TICKER.removeEventCallback(illa.Ticker.EVENT_TICK, this.onRootTick, this);
                this.removeEventCallback(Box.EVENT_SOLVE_LAYOUT_NOW_REQUESTED, this.onSolveLayoutNowRequested, this);
            }
            illa.Log.infoIf(this.name, 'is now ' + (value ? '' : 'NOT ') + 'root.');
        };
        Box.prototype.getAllowsLayoutActive = function () {
            return this.allowsLayoutActive;
        };
        Box.prototype.setAllowsLayoutActive = function (flag) {
            if (this.getAllowsLayoutActive() == flag)
                return;
            this.allowsLayoutActive = flag;
            this.setNeedsLayoutUpdate(true);
        };
        Box.prototype.getIsLayoutActive = function () {
            return this.getAllowsLayoutActive() && this.getAllowsVisibility();
        };
        Box.prototype.getAllowsVisibility = function () {
            return this.allowsVisibility;
        };
        Box.prototype.setAllowsVisibility = function (flag) {
            if (this.allowsVisibility == flag)
                return;
            this.allowsVisibility = flag;
            this.getJQuery().toggle(flag);
            this.setNeedsLayoutUpdate(true);
            if (this.getParentBox())
                this.getParentBox().getModel().needsLayoutUpdate = true;
        };
        Box.prototype.getIsVisible = function () {
            return this.getJQuery().is(':visible');
        };
        Box.prototype.getScroll = function (axis) {
            return berek.ScrollbarUtil.getScroll(this.getJQuery(), axis);
        };
        Box.prototype.setScroll = function (value, axis) {
            berek.ScrollbarUtil.setScroll(this.getJQuery(), value, axis);
        };
        Box.prototype.getModel = function () {
            return this.model;
        };
        Box.prototype.setModel = function (value) {
            this.model = value;
        };
        Box.prototype.getNeedsLayoutUpdate = function () {
            return this.model.needsLayoutUpdate;
        };
        Box.prototype.setNeedsLayoutUpdate = function (value) {
            this.model.needsLayoutUpdate = value;
        };
        Box.prototype.getAlignment = function (axis) {
            return this.model.alignment.get(axis);
        };
        Box.prototype.setAlignment = function (value, a) {
            for (var axis = a || 0 /* X */, lastAxis = (a != null ? a : 1 /* Y */); axis <= lastAxis; axis++) {
                this.model.alignment.set(axis, value);
            }
            this.setNeedsLayoutUpdate(true);
        };
        Box.prototype.getInset = function (axis, e) {
            var result = 0;
            for (var end = e || 0 /* MIN */, lastEnd = (e != null ? e : 1 /* MAX */); end <= lastEnd; end++) {
                result += this.model.inset.get(axis, end);
            }
            return result;
        };
        Box.prototype.setInset = function (value, a, e) {
            for (var axis = a || 0 /* X */, lastAxis = (a != null ? a : 1 /* Y */); axis <= lastAxis; axis++) {
                for (var end = e || 0 /* MIN */, lastEnd = (e != null ? e : 1 /* MAX */); end <= lastEnd; end++) {
                    this.model.inset.set(axis, end, value);
                }
            }
        };
        Box.prototype.getDirection = function () {
            return this.model.direction.get();
        };
        Box.prototype.setDirection = function (value) {
            this.model.direction.set(value);
        };
        Box.prototype.getSizeLimit = function (axis, end) {
            return this.model.sizeLimit.get(axis, end);
        };
        Box.prototype.setSizeLimit = function (min, max, a) {
            for (var axis = a || 0 /* X */, lastAxis = (a != null ? a : 1 /* Y */); axis <= lastAxis; axis++) {
                if (!isNaN(min)) {
                    min = Math.max(0, min);
                    this.model.sizeLimit.set(axis, 0 /* MIN */, min);
                }
                if (!isNaN(max)) {
                    this.model.sizeLimit.set(axis, 1 /* MAX */, max);
                }
            }
        };
        Box.prototype.getShrinkWrapSizeLimit = function (axis, end, end2) {
            return this.model.shrinkWrapSizeLimit.get(axis, end, end2);
        };
        Box.prototype.setShrinkWrapSizeLimit = function (value, a, e, e2) {
            for (var axis = a || 0 /* X */, lastAxis = (a != null ? a : 1 /* Y */); axis <= lastAxis; axis++) {
                for (var end = e || 0 /* MIN */, lastEnd = (e != null ? e : 1 /* MAX */); end <= lastEnd; end++) {
                    for (var end2 = e2 || 0 /* MIN */, lastEnd2 = (e2 != null ? e2 : 1 /* MAX */); end2 <= lastEnd2; end2++) {
                        this.model.shrinkWrapSizeLimit.set(axis, end, end2, value);
                    }
                }
            }
        };
        Box.prototype.getSpaceBefore = function (axis) {
            return this.model.spaceBefore.get(axis);
        };
        Box.prototype.setSpaceBefore = function (value, a) {
            for (var axis = a || 0 /* X */, lastAxis = (a != null ? a : 1 /* Y */); axis <= lastAxis; axis++) {
                this.model.spaceBefore.set(axis, value);
            }
        };
        Box.prototype.getDefaultSpaceBefore = function (axis) {
            return this.model.defaultSpaceBefore.get(axis);
        };
        Box.prototype.setDefaultSpaceBefore = function (value, a) {
            for (var axis = a || 0 /* X */, lastAxis = (a != null ? a : 1 /* Y */); axis <= lastAxis; axis++) {
                this.model.defaultSpaceBefore.set(axis, value);
            }
        };
        Box.prototype.getWeight = function (axis) {
            return this.model.weight.get(axis);
        };
        Box.prototype.setWeight = function (value, a) {
            for (var axis = a || 0 /* X */, lastAxis = (a != null ? a : 1 /* Y */); axis <= lastAxis; axis++) {
                this.model.weight.set(axis, value);
            }
        };
        Box.prototype.getUseContentWeight = function (axis) {
            return this.model.useContentWeight.get(axis);
        };
        Box.prototype.setUseContentWeight = function (value, a) {
            for (var axis = a || 0 /* X */, lastAxis = (a != null ? a : 1 /* Y */); axis <= lastAxis; axis++) {
                this.model.useContentWeight.set(axis, value);
            }
        };
        Box.prototype.getIsSpacer = function () {
            return this.model.isSpacer.get();
        };
        Box.prototype.setIsSpacer = function (value) {
            this.model.isSpacer.set(value);
        };
        Box.prototype.getApplySizeToSelf = function () {
            return this.model.applySizeToSelf.get();
        };
        Box.prototype.setApplySizeToSelf = function (value) {
            this.model.applySizeToSelf.set(value);
        };
        Box.prototype.getMayShowScrollbar = function (axis) {
            return this.model.mayShowScrollbar.get(axis);
        };
        Box.prototype.setMayShowScrollbar = function (value, a) {
            for (var axis = a || 0 /* X */, lastAxis = (a != null ? a : 1 /* Y */); axis <= lastAxis; axis++) {
                this.model.mayShowScrollbar.set(axis, value);
            }
        };
        Box.prototype.getChildren = function () {
            return this.children;
        };
        Box.prototype.getOverflowIsVisible = function () {
            return this.overflowIsVisible;
        };
        Box.prototype.setOverflowIsVisible = function (flag) {
            if (this.overflowIsVisible != flag) {
                this.overflowIsVisible = flag;
                this.getJQuery().toggleClass(Box.CSS_CLASS_OVERFLOW_VISIBLE, flag);
            }
        };
        Box.prototype.getDoubleCheckLayout = function () {
            return this.doubleCheckLayout;
        };
        Box.prototype.setDoubleCheckLayout = function (flag) {
            this.doubleCheckLayout = flag;
        };
        Box.prototype.getIsSolvingLayout = function () {
            return this.isSolvingLayout;
        };
        Box.prototype.setIsSolvingLayout = function (flag) {
            this.isSolvingLayout = flag;
        };
        Box.prototype.applyStyle = function (styles) {
            styles = illa.StringUtil.trim(styles);
            var style = styles.split(/\s*;\s*/g);
            for (var i = 0, n = style.length; i < n; i++) {
                var styleSplit = style[i].split(/\s*:\s*/g);
                var key = styleSplit[0];
                var value = styleSplit[1];
                if (key) {
                    try {
                        if (!this.applySingleStyle(key, value)) {
                            illa.Log.warn(this.name || '', 'Style key not recognized: ' + key);
                        }
                    }
                    catch (e) {
                        illa.Log.warn(key + ': ' + e);
                    }
                }
            }
        };
        Box.prototype.applySingleStyle = function (key, value) {
            var success = true;
            switch (key) {
                case 'size-limit-source':
                    this.setSizeLimitSource(deflex.StyleUtil.readSizeLimitSource(value));
                    break;
                case 'size-limit-source-x':
                    this.setSizeLimitSource(deflex.StyleUtil.readSizeLimitSource(value), 0 /* X */);
                    break;
                case 'size-limit-source-y':
                    this.setSizeLimitSource(deflex.StyleUtil.readSizeLimitSource(value), 1 /* Y */);
                    break;
                case 'inset':
                    this.setInset(deflex.StyleUtil.readNumber(value));
                    break;
                case 'inset-x':
                    this.setInset(deflex.StyleUtil.readNumber(value), 0 /* X */);
                    break;
                case 'inset-y':
                    this.setInset(deflex.StyleUtil.readNumber(value), 1 /* Y */);
                    break;
                case 'inset-left':
                    this.setInset(deflex.StyleUtil.readNumber(value), 0 /* X */, 0 /* MIN */);
                    break;
                case 'inset-right':
                    this.setInset(deflex.StyleUtil.readNumber(value), 0 /* X */, 1 /* MAX */);
                    break;
                case 'inset-top':
                    this.setInset(deflex.StyleUtil.readNumber(value), 1 /* Y */, 0 /* MIN */);
                    break;
                case 'inset-bottom':
                    this.setInset(deflex.StyleUtil.readNumber(value), 1 /* Y */, 1 /* MAX */);
                    break;
                case 'size-limit':
                    this.setSizeLimit(deflex.StyleUtil.readNumber(value), deflex.StyleUtil.readNumber(value));
                    break;
                case 'size-limit-x':
                    this.setSizeLimit(deflex.StyleUtil.readNumber(value), deflex.StyleUtil.readNumber(value), 0 /* X */);
                    break;
                case 'size-limit-y':
                    this.setSizeLimit(deflex.StyleUtil.readNumber(value), deflex.StyleUtil.readNumber(value), 1 /* Y */);
                    break;
                case 'size-limit-min':
                    this.setSizeLimit(deflex.StyleUtil.readNumber(value), undefined);
                    break;
                case 'size-limit-max':
                    this.setSizeLimit(undefined, deflex.StyleUtil.readNumber(value));
                    break;
                case 'size-limit-x-min':
                    this.setSizeLimit(deflex.StyleUtil.readNumber(value), undefined, 0 /* X */);
                    break;
                case 'size-limit-x-max':
                    this.setSizeLimit(undefined, deflex.StyleUtil.readNumber(value), 0 /* X */);
                    break;
                case 'size-limit-y-min':
                    this.setSizeLimit(deflex.StyleUtil.readNumber(value), undefined, 1 /* Y */);
                    break;
                case 'size-limit-y-max':
                    this.setSizeLimit(undefined, deflex.StyleUtil.readNumber(value), 1 /* Y */);
                    break;
                case 'shrink-wrap-size-limit':
                    this.setShrinkWrapSizeLimit(deflex.StyleUtil.readNumber(value));
                    break;
                case 'shrink-wrap-size-limit-x':
                    this.setShrinkWrapSizeLimit(deflex.StyleUtil.readNumber(value), 0 /* X */);
                    break;
                case 'shrink-wrap-size-limit-y':
                    this.setShrinkWrapSizeLimit(deflex.StyleUtil.readNumber(value), 1 /* Y */);
                    break;
                case 'shrink-wrap-size-limit-min':
                    this.setShrinkWrapSizeLimit(deflex.StyleUtil.readNumber(value), undefined, 0 /* MIN */);
                    break;
                case 'shrink-wrap-size-limit-max':
                    this.setShrinkWrapSizeLimit(deflex.StyleUtil.readNumber(value), undefined, 1 /* MAX */);
                    break;
                case 'shrink-wrap-size-limit-x-min':
                    this.setShrinkWrapSizeLimit(deflex.StyleUtil.readNumber(value), 0 /* X */, 0 /* MIN */);
                    break;
                case 'shrink-wrap-size-limit-x-max':
                    this.setShrinkWrapSizeLimit(deflex.StyleUtil.readNumber(value), 0 /* X */, 1 /* MAX */);
                    break;
                case 'shrink-wrap-size-limit-y-min':
                    this.setShrinkWrapSizeLimit(deflex.StyleUtil.readNumber(value), 1 /* Y */, 0 /* MIN */);
                    break;
                case 'shrink-wrap-size-limit-y-max':
                    this.setShrinkWrapSizeLimit(deflex.StyleUtil.readNumber(value), 1 /* Y */, 1 /* MAX */);
                    break;
                case 'shrink-wrap-size-limit-min-min':
                    this.setShrinkWrapSizeLimit(deflex.StyleUtil.readNumber(value), undefined, 0 /* MIN */, 0 /* MIN */);
                    break;
                case 'shrink-wrap-size-limit-min-max':
                    this.setShrinkWrapSizeLimit(deflex.StyleUtil.readNumber(value), undefined, 0 /* MIN */, 1 /* MAX */);
                    break;
                case 'shrink-wrap-size-limit-max-min':
                    this.setShrinkWrapSizeLimit(deflex.StyleUtil.readNumber(value), undefined, 1 /* MAX */, 0 /* MIN */);
                    break;
                case 'shrink-wrap-size-limit-max-max':
                    this.setShrinkWrapSizeLimit(deflex.StyleUtil.readNumber(value), undefined, 1 /* MAX */, 1 /* MAX */);
                    break;
                case 'shrink-wrap-size-limit-x-min-min':
                    this.setShrinkWrapSizeLimit(deflex.StyleUtil.readNumber(value), 0 /* X */, 0 /* MIN */, 0 /* MIN */);
                    break;
                case 'shrink-wrap-size-limit-x-min-max':
                    this.setShrinkWrapSizeLimit(deflex.StyleUtil.readNumber(value), 0 /* X */, 0 /* MIN */, 1 /* MAX */);
                    break;
                case 'shrink-wrap-size-limit-x-max-min':
                    this.setShrinkWrapSizeLimit(deflex.StyleUtil.readNumber(value), 0 /* X */, 1 /* MAX */, 0 /* MIN */);
                    break;
                case 'shrink-wrap-size-limit-x-max-max':
                    this.setShrinkWrapSizeLimit(deflex.StyleUtil.readNumber(value), 0 /* X */, 1 /* MAX */, 1 /* MAX */);
                    break;
                case 'shrink-wrap-size-limit-y-min-min':
                    this.setShrinkWrapSizeLimit(deflex.StyleUtil.readNumber(value), 1 /* Y */, 0 /* MIN */, 0 /* MIN */);
                    break;
                case 'shrink-wrap-size-limit-y-min-max':
                    this.setShrinkWrapSizeLimit(deflex.StyleUtil.readNumber(value), 1 /* Y */, 0 /* MIN */, 1 /* MAX */);
                    break;
                case 'shrink-wrap-size-limit-y-max-min':
                    this.setShrinkWrapSizeLimit(deflex.StyleUtil.readNumber(value), 1 /* Y */, 1 /* MAX */, 0 /* MIN */);
                    break;
                case 'shrink-wrap-size-limit-y-max-max':
                    this.setShrinkWrapSizeLimit(deflex.StyleUtil.readNumber(value), 1 /* Y */, 1 /* MAX */, 1 /* MAX */);
                    break;
                case 'space-before':
                    this.setSpaceBefore(deflex.StyleUtil.readNumber(value));
                    break;
                case 'space-before-x':
                    this.setSpaceBefore(deflex.StyleUtil.readNumber(value), 0 /* X */);
                    break;
                case 'space-before-y':
                    this.setSpaceBefore(deflex.StyleUtil.readNumber(value), 1 /* Y */);
                    break;
                case 'default-space-before':
                    this.setDefaultSpaceBefore(deflex.StyleUtil.readNumber(value));
                    break;
                case 'default-space-before-x':
                    this.setDefaultSpaceBefore(deflex.StyleUtil.readNumber(value), 0 /* X */);
                    break;
                case 'default-space-before-y':
                    this.setDefaultSpaceBefore(deflex.StyleUtil.readNumber(value), 1 /* Y */);
                    break;
                case 'weight':
                    this.setWeight(deflex.StyleUtil.readNumber(value));
                    break;
                case 'weight-x':
                    this.setWeight(deflex.StyleUtil.readNumber(value), 0 /* X */);
                    break;
                case 'weight-y':
                    this.setWeight(deflex.StyleUtil.readNumber(value), 1 /* Y */);
                    break;
                case 'use-content-weight':
                    this.setUseContentWeight(deflex.StyleUtil.readBoolean(value));
                    break;
                case 'use-content-weight-x':
                    this.setUseContentWeight(deflex.StyleUtil.readBoolean(value), 0 /* X */);
                    break;
                case 'use-content-weight-y':
                    this.setUseContentWeight(deflex.StyleUtil.readBoolean(value), 1 /* Y */);
                    break;
                case 'alignment':
                    this.setAlignment(deflex.StyleUtil.readAlignment(value));
                    break;
                case 'alignment-x':
                    this.setAlignment(deflex.StyleUtil.readAlignment(value), 0 /* X */);
                    break;
                case 'alignment-y':
                    this.setAlignment(deflex.StyleUtil.readAlignment(value), 1 /* Y */);
                    break;
                case 'is-spacer':
                    this.setIsSpacer(deflex.StyleUtil.readBoolean(value));
                    break;
                case 'direction':
                    this.setDirection(deflex.StyleUtil.readAxis2D(value));
                    break;
                case 'may-show-scrollbar':
                    this.setMayShowScrollbar(deflex.StyleUtil.readBoolean(value));
                    break;
                case 'may-show-scrollbar-x':
                    this.setMayShowScrollbar(deflex.StyleUtil.readBoolean(value), 0 /* X */);
                    break;
                case 'may-show-scrollbar-y':
                    this.setMayShowScrollbar(deflex.StyleUtil.readBoolean(value), 1 /* Y */);
                    break;
                case 'overflow-is-visible':
                    this.setOverflowIsVisible(deflex.StyleUtil.readBoolean(value));
                    break;
                case 'double-check-layout':
                    this.setDoubleCheckLayout(deflex.StyleUtil.readBoolean(value));
                    break;
                case 'name':
                    this.name = value;
                    break;
                default:
                    success = false;
            }
            return success;
        };
        Box.getBoxesFromRootsJQueryByName = function (name, rootsJq) {
            if (rootsJq === void 0) { rootsJq = jQuery('.' + Box.CSS_CLASS_IS_ROOT); }
            var result = [];
            for (var i = 0, n = rootsJq.length; i < n; i++) {
                var root = Box.getFrom(rootsJq.eq(i));
                result = result.concat(this.getBoxesFromRootByName(name, root));
            }
            return result;
        };
        Box.getBoxesFromRootByName = function (name, root) {
            var result = [];
            if (root.name === name) {
                result.push(root);
            }
            var children = root.getChildren();
            for (var i = 0, n = children.length; i < n; i++) {
                result = result.concat(this.getBoxesFromRootByName(name, children[i]));
            }
            return result;
        };
        Box.ROOT_TICKER = new illa.Ticker();
        Box.CSS_CLASS = 'deflex-Box';
        Box.CSS_CLASS_SIZE_AUTO_X = 'deflex-Box-size-auto-x';
        Box.CSS_CLASS_SIZE_AUTO_Y = 'deflex-Box-size-auto-y';
        Box.CSS_CLASS_SIZE_FULL_X = 'deflex-Box-size-full-x';
        Box.CSS_CLASS_SIZE_FULL_Y = 'deflex-Box-size-full-y';
        Box.CSS_CLASS_IS_ROOT = 'deflex-Box-is-root';
        Box.CSS_CLASS_OVERFLOW_VISIBLE = 'deflex-Box-overflow-visible';
        Box.EVENT_SOLVE_LAYOUT_NOW_REQUESTED = 'deflex_Box_EVENT_SOLVE_LAYOUT_NOW_REQUESTED';
        Box.solutionCountLimit = 100;
        return Box;
    })(berek.Widget);
    deflex.Box = Box;
})(deflex || (deflex = {}));
/// <reference path='../../lib/illa/Log.ts'/>
/// <reference path='Box.ts'/>
/// <reference path='IBoxConstructor.ts'/>
var deflex;
(function (deflex) {
    var Factory = (function () {
        function Factory() {
        }
        Factory.checkDOM = function () {
            var jqs = jQuery('[' + this.CLASS_ATTRIBUTE_NAME + '],[' + this.STYLE_ATTRIBUTE_NAME + ']');
            for (var i = 0, n = jqs.length; i < n; i++) {
                var jq = jqs.eq(i);
                this.create(jq);
            }
        };
        Factory.create = function (jq) {
            var className = jq.attr(this.CLASS_ATTRIBUTE_NAME);
            jq.removeAttr(this.CLASS_ATTRIBUTE_NAME);
            if (!illa.isString(className) || className == '') {
                className = 'default';
            }
            var boxConstructor = this.boxConstructors[className];
            var box = new boxConstructor(jq);
            var styleClassString = this.styleClasses[className];
            if (illa.isString(styleClassString)) {
                box.applyStyle(styleClassString);
            }
            var styleString = jq.attr(this.STYLE_ATTRIBUTE_NAME);
            jq.removeAttr(this.STYLE_ATTRIBUTE_NAME);
            if (styleString) {
                box.applyStyle(styleString);
            }
            return box;
        };
        Factory.CLASS_ATTRIBUTE_NAME = 'data-deflex-class';
        Factory.STYLE_ATTRIBUTE_NAME = 'data-deflex-style';
        Factory.boxConstructors = { 'default': deflex.Box };
        Factory.styleClasses = {};
        return Factory;
    })();
    deflex.Factory = Factory;
})(deflex || (deflex = {}));
/// <reference path='../../lib/jQuery.d.ts'/>
/// <reference path='../../lib/illa/Arrkup.ts'/>
/// <reference path='../../lib/illa/Log.ts'/>
/// <reference path='../../lib/berek/UnitTest.ts'/>
/// <reference path='../../src/deflex/Factory.ts'/>
var test1;
(function (test1) {
    var Main = (function () {
        function Main() {
            jQuery(illa.bind(this.onDOMLoaded, this));
        }
        Main.prototype.onDOMLoaded = function () {
            this.uOut = jQuery('<div>');
            this.u = new berek.UnitTest(this.uOut);
            this.div1 = jQuery(illa.Arrkup.createString(['div', { style: 'position: relative; top: 20px; left: 10px; width: 100px; height: 200px; padding: 2px 0 0 1px' }]));
            this.div1.appendTo('body');
            this.root1 = new deflex.Box();
            this.root1.setParent(this.div1);
            deflex.Box.ROOT_TICKER.addEventCallback(illa.Ticker.EVENT_AFTER_TICK, this.doTest1, this);
        };
        Main.prototype.doTest1 = function (e) {
            this.u.assert(illa.isNull(this.root1.getParentBox()), 'Test1 01');
            this.u.assertEquals(this.root1.getParentJQuery(), this.div1, 'Test1 02');
            this.u.assert(illa.isNull(this.root1.getEventParent()), 'Test1 03');
            this.u.assertEquals(this.root1.getSize(0 /* X */), 0, 'Test1 04');
            this.u.assertEquals(this.root1.getSize(1 /* Y */), 0, 'Test1 05');
            this.u.assertEquals(this.root1.getSize(0 /* X */, 0 /* INNER */), 0, 'Test1 06');
            this.u.assertEquals(this.root1.getSize(1 /* Y */, 0 /* INNER */), 0, 'Test1 07');
            this.u.assertEquals(this.root1.getSize(0 /* X */, 1 /* PARENT */), 0, 'Test1 08');
            this.u.assertEquals(this.root1.getSize(1 /* Y */, 1 /* PARENT */), 0, 'Test1 09');
            this.u.assertEquals(this.root1.getSize(0 /* X */, 2 /* PAGE */), 0, 'Test1 10');
            this.u.assertEquals(this.root1.getSize(1 /* Y */, 2 /* PAGE */), 0, 'Test1 11');
            this.u.assertEquals(this.root1.getOffset(0 /* X */), 0, 'Test1 12');
            this.u.assertEquals(this.root1.getOffset(1 /* Y */), 0, 'Test1 13');
            this.u.assertEquals(this.root1.getOffset(0 /* X */, 0 /* START */), 0, 'Test1 14');
            this.u.assertEquals(this.root1.getOffset(1 /* Y */, 0 /* START */), 0, 'Test1 15');
            this.u.assertEquals(this.root1.getOffset(0 /* X */, 1 /* CENTER */), 0, 'Test1 16');
            this.u.assertEquals(this.root1.getOffset(1 /* Y */, 1 /* CENTER */), 0, 'Test1 17');
            this.u.assertEquals(this.root1.getOffset(0 /* X */, 2 /* END */), 0, 'Test1 18');
            this.u.assertEquals(this.root1.getOffset(1 /* Y */, 2 /* END */), 0, 'Test1 19');
            this.u.assertEquals(this.root1.getOffset(0 /* X */, 0 /* START */, 0 /* INNER */), 0, 'Test1 20');
            this.u.assertEquals(this.root1.getOffset(1 /* Y */, 0 /* START */, 0 /* INNER */), 0, 'Test1 21');
            this.u.assertEquals(this.root1.getOffset(0 /* X */, 1 /* CENTER */, 0 /* INNER */), 0, 'Test1 22');
            this.u.assertEquals(this.root1.getOffset(1 /* Y */, 1 /* CENTER */, 0 /* INNER */), 0, 'Test1 23');
            this.u.assertEquals(this.root1.getOffset(0 /* X */, 2 /* END */, 0 /* INNER */), 0, 'Test1 24');
            this.u.assertEquals(this.root1.getOffset(1 /* Y */, 2 /* END */, 0 /* INNER */), 0, 'Test1 25');
            this.u.assertEquals(this.root1.getOffset(0 /* X */, 0 /* START */, 1 /* PARENT */), 0, 'Test1 26');
            this.u.assertEquals(this.root1.getOffset(1 /* Y */, 0 /* START */, 1 /* PARENT */), 0, 'Test1 27');
            this.u.assertEquals(this.root1.getOffset(0 /* X */, 1 /* CENTER */, 1 /* PARENT */), 0, 'Test1 28');
            this.u.assertEquals(this.root1.getOffset(1 /* Y */, 1 /* CENTER */, 1 /* PARENT */), 0, 'Test1 29');
            this.u.assertEquals(this.root1.getOffset(0 /* X */, 2 /* END */, 1 /* PARENT */), 0, 'Test1 30');
            this.u.assertEquals(this.root1.getOffset(1 /* Y */, 2 /* END */, 1 /* PARENT */), 0, 'Test1 31');
            this.u.assertEquals(this.root1.getOffset(0 /* X */, 0 /* START */, 2 /* PAGE */), 11, 'Test1 32');
            this.u.assertEquals(this.root1.getOffset(1 /* Y */, 0 /* START */, 2 /* PAGE */), 22, 'Test1 33');
            this.u.assertEquals(this.root1.getOffset(0 /* X */, 1 /* CENTER */, 2 /* PAGE */), 11, 'Test1 34');
            this.u.assertEquals(this.root1.getOffset(1 /* Y */, 1 /* CENTER */, 2 /* PAGE */), 22, 'Test1 35');
            this.u.assertEquals(this.root1.getOffset(0 /* X */, 2 /* END */, 2 /* PAGE */), 11, 'Test1 36');
            this.u.assertEquals(this.root1.getOffset(1 /* Y */, 2 /* END */, 2 /* PAGE */), 22, 'Test1 37');
            this.u.assertEquals(this.root1.getShowScrollbar(0 /* X */), false, 'Test1 38');
            this.u.assertEquals(this.root1.getShowScrollbar(1 /* Y */), false, 'Test1 39');
            this.u.assertEquals(this.root1.getZIndex(), 0, 'Test1 40');
            this.u.assertEquals(this.root1.getIsDestroyed(), false, 'Test1 41');
            this.u.assertEquals(this.root1.getIsRoot(), true, 'Test1 42');
            this.u.assertEquals(this.root1.getIsLayoutActive(), true, 'Test1 43');
            this.u.assertEquals(this.root1.getIsVisible(), false, 'Test1 44');
            this.u.assertEquals(this.root1.getScroll(0 /* X */), 0, 'Test1 45');
            this.u.assertEquals(this.root1.getScroll(1 /* Y */), 0, 'Test1 46');
            this.u.assertEquals(this.root1.getNeedsLayoutUpdate(), false, 'Test1 47');
            this.u.assertEquals(this.root1.getApplySizeToSelf(), true, 'Test1 48');
            this.u.assertEquals(this.root1.getIsSolvingLayout(), false, 'Test1 49');
            this.root1.setSizeLimitSource(3 /* JQUERY_FULL */);
            deflex.Box.ROOT_TICKER.removeEventCallback(illa.Ticker.EVENT_AFTER_TICK, this.doTest1, this);
            deflex.Box.ROOT_TICKER.addEventCallback(illa.Ticker.EVENT_AFTER_TICK, this.doTest2, this);
        };
        Main.prototype.doTest2 = function (e) {
            this.u.assertEquals(this.root1.getSize(0 /* X */), 100, 'Test2 01');
            this.u.assertEquals(this.root1.getSize(1 /* Y */), 200, 'Test2 02');
            this.u.assertEquals(this.root1.getSize(0 /* X */, 0 /* INNER */), 100, 'Test2 03');
            this.u.assertEquals(this.root1.getSize(1 /* Y */, 0 /* INNER */), 200, 'Test2 04');
            this.u.assertEquals(this.root1.getSize(0 /* X */, 1 /* PARENT */), 100, 'Test2 05');
            this.u.assertEquals(this.root1.getSize(1 /* Y */, 1 /* PARENT */), 200, 'Test2 06');
            this.u.assertEquals(this.root1.getSize(0 /* X */, 2 /* PAGE */), 100, 'Test2 07');
            this.u.assertEquals(this.root1.getSize(1 /* Y */, 2 /* PAGE */), 200, 'Test2 08');
            this.u.assertEquals(this.root1.getOffset(0 /* X */), 0, 'Test2 09');
            this.u.assertEquals(this.root1.getOffset(1 /* Y */), 0, 'Test2 10');
            this.u.assertEquals(this.root1.getOffset(0 /* X */, 0 /* START */), 0, 'Test2 11');
            this.u.assertEquals(this.root1.getOffset(1 /* Y */, 0 /* START */), 0, 'Test2 12');
            this.u.assertEquals(this.root1.getOffset(0 /* X */, 1 /* CENTER */), 50, 'Test2 13');
            this.u.assertEquals(this.root1.getOffset(1 /* Y */, 1 /* CENTER */), 100, 'Test2 14');
            this.u.assertEquals(this.root1.getOffset(0 /* X */, 2 /* END */), 100, 'Test2 15');
            this.u.assertEquals(this.root1.getOffset(1 /* Y */, 2 /* END */), 200, 'Test2 16');
            this.u.assertEquals(this.root1.getOffset(0 /* X */, 0 /* START */, 0 /* INNER */), 0, 'Test2 17');
            this.u.assertEquals(this.root1.getOffset(1 /* Y */, 0 /* START */, 0 /* INNER */), 0, 'Test2 18');
            this.u.assertEquals(this.root1.getOffset(0 /* X */, 1 /* CENTER */, 0 /* INNER */), 50, 'Test2 19');
            this.u.assertEquals(this.root1.getOffset(1 /* Y */, 1 /* CENTER */, 0 /* INNER */), 100, 'Test2 20');
            this.u.assertEquals(this.root1.getOffset(0 /* X */, 2 /* END */, 0 /* INNER */), 100, 'Test2 21');
            this.u.assertEquals(this.root1.getOffset(1 /* Y */, 2 /* END */, 0 /* INNER */), 200, 'Test2 22');
            this.u.assertEquals(this.root1.getOffset(0 /* X */, 0 /* START */, 1 /* PARENT */), 0, 'Test2 23');
            this.u.assertEquals(this.root1.getOffset(1 /* Y */, 0 /* START */, 1 /* PARENT */), 0, 'Test2 24');
            this.u.assertEquals(this.root1.getOffset(0 /* X */, 1 /* CENTER */, 1 /* PARENT */), 50, 'Test2 25');
            this.u.assertEquals(this.root1.getOffset(1 /* Y */, 1 /* CENTER */, 1 /* PARENT */), 100, 'Test2 26');
            this.u.assertEquals(this.root1.getOffset(0 /* X */, 2 /* END */, 1 /* PARENT */), 100, 'Test2 27');
            this.u.assertEquals(this.root1.getOffset(1 /* Y */, 2 /* END */, 1 /* PARENT */), 200, 'Test2 28');
            this.u.assertEquals(this.root1.getOffset(0 /* X */, 0 /* START */, 2 /* PAGE */), 11, 'Test2 29');
            this.u.assertEquals(this.root1.getOffset(1 /* Y */, 0 /* START */, 2 /* PAGE */), 22, 'Test2 30');
            this.u.assertEquals(this.root1.getOffset(0 /* X */, 1 /* CENTER */, 2 /* PAGE */), 61, 'Test2 31');
            this.u.assertEquals(this.root1.getOffset(1 /* Y */, 1 /* CENTER */, 2 /* PAGE */), 122, 'Test2 32');
            this.u.assertEquals(this.root1.getOffset(0 /* X */, 2 /* END */, 2 /* PAGE */), 111, 'Test2 33');
            this.u.assertEquals(this.root1.getOffset(1 /* Y */, 2 /* END */, 2 /* PAGE */), 222, 'Test2 34');
            this.u.assertEquals(this.root1.getShowScrollbar(0 /* X */), false, 'Test2 35');
            this.u.assertEquals(this.root1.getShowScrollbar(1 /* Y */), false, 'Test2 36');
            this.u.assertEquals(this.root1.getZIndex(), 0, 'Test2 37');
            this.u.assertEquals(this.root1.getIsDestroyed(), false, 'Test2 38');
            this.u.assertEquals(this.root1.getIsRoot(), true, 'Test2 39');
            this.u.assertEquals(this.root1.getIsLayoutActive(), true, 'Test2 40');
            this.u.assertEquals(this.root1.getIsVisible(), true, 'Test2 41');
            this.u.assertEquals(this.root1.getScroll(0 /* X */), 0, 'Test2 42');
            this.u.assertEquals(this.root1.getScroll(1 /* Y */), 0, 'Test2 43');
            this.u.assertEquals(this.root1.getNeedsLayoutUpdate(), false, 'Test2 44');
            this.u.assertEquals(this.root1.getApplySizeToSelf(), true, 'Test2 45');
            this.u.assertEquals(this.root1.getIsSolvingLayout(), false, 'Test2 46');
            this.onTestsDone();
        };
        Main.prototype.onTestsDone = function () {
            deflex.Box.ROOT_TICKER.setIsStarted(false);
            this.u.printStats();
            jQuery('body').empty().append(this.uOut);
        };
        Main.getInstance = function () {
            return this.instance;
        };
        Main.instance = new Main();
        return Main;
    })();
    test1.Main = Main;
})(test1 || (test1 = {}));
