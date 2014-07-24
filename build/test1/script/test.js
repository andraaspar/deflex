var berek;
(function (berek) {
    (function (jquery) {
        jquery.$ = window['jQuery'];
    })(berek.jquery || (berek.jquery = {}));
    var jquery = berek.jquery;
})(berek || (berek = {}));
var illa;
(function (illa) {
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

    function isString(v) {
        return typeof v == 'string';
    }
    illa.isString = isString;

    function isBoolean(v) {
        return typeof v == 'boolean';
    }
    illa.isBoolean = isBoolean;

    function isNumber(v) {
        return typeof v == 'number';
    }
    illa.isNumber = isNumber;

    function isFunction(v) {
        return typeof v == 'function';
    }
    illa.isFunction = isFunction;

    function isArray(v) {
        return illa.getType(v) == 'array';
    }
    illa.isArray = isArray;

    if (Array.isArray)
        illa.isArray = Array.isArray;

    function isUndefined(v) {
        return typeof v == 'undefined';
    }
    illa.isUndefined = isUndefined;

    function isNull(v) {
        return v === null;
    }
    illa.isNull = isNull;

    function isUndefinedOrNull(v) {
        return typeof v == 'undefined' || v === null;
    }
    illa.isUndefinedOrNull = isUndefinedOrNull;

    function isObjectNotNull(v) {
        var t = typeof v;
        return t == 'object' && v !== null || t == 'function';
    }
    illa.isObjectNotNull = isObjectNotNull;

    function getType(v) {
        var result = '';
        if (v == null) {
            result = v + '';
        } else {
            result = typeof v;
            if (result == 'object' || result == 'function') {
                result = illa.classByType[toString.call(v)] || 'object';
            }
        }
        return result;
    }
    illa.getType = getType;

    function as(c, v) {
        return v instanceof c ? v : null;
    }
    illa.as = as;

    function bind(fn, obj) {
        if (!fn)
            throw 'No function.';
        return function () {
            return fn.apply(obj, arguments);
        };
    }
    illa.bind = bind;

    if (Function.prototype.bind) {
        illa.bind = function (fn, obj) {
            return fn.call.apply(fn.bind, arguments);
        };
    }
})(illa || (illa = {}));
var illa;
(function (illa) {
    var Log = (function () {
        function Log() {
        }
        Log.log = function () {
            var args = [];
            for (var _i = 0; _i < (arguments.length - 0); _i++) {
                args[_i] = arguments[_i + 0];
            }
            var console = illa.GLOBAL.console;
            if (console && console.log) {
                if (console.log.apply) {
                    console.log.apply(console, args);
                } else {
                    console.log(args.join(' '));
                }
            }
        };
        Log.info = function () {
            var args = [];
            for (var _i = 0; _i < (arguments.length - 0); _i++) {
                args[_i] = arguments[_i + 0];
            }
            var console = illa.GLOBAL.console;
            if (console && console.info) {
                if (console.info.apply) {
                    console.info.apply(console, args);
                } else {
                    console.info(args.join(' '));
                }
            } else {
                Log.log.apply(this, args);
            }
        };
        Log.warn = function () {
            var args = [];
            for (var _i = 0; _i < (arguments.length - 0); _i++) {
                args[_i] = arguments[_i + 0];
            }
            var console = illa.GLOBAL.console;
            if (console && console.warn) {
                if (console.warn.apply) {
                    console.warn.apply(console, args);
                } else {
                    console.warn(args.join(' '));
                }
            } else {
                Log.log.apply(this, args);
            }
        };
        Log.error = function () {
            var args = [];
            for (var _i = 0; _i < (arguments.length - 0); _i++) {
                args[_i] = arguments[_i + 0];
            }
            var console = illa.GLOBAL.console;
            if (console && console.error) {
                if (console.error.apply) {
                    console.error.apply(console, args);
                } else {
                    console.error(args.join(' '));
                }
            } else {
                Log.log.apply(this, args);
            }
        };
        Log.logIf = function (test) {
            var args = [];
            for (var _i = 0; _i < (arguments.length - 1); _i++) {
                args[_i] = arguments[_i + 1];
            }
            if (test) {
                Log.log.apply(this, [test].concat(args));
            }
        };
        Log.infoIf = function (test) {
            var args = [];
            for (var _i = 0; _i < (arguments.length - 1); _i++) {
                args[_i] = arguments[_i + 1];
            }
            if (test) {
                Log.info.apply(this, [test].concat(args));
            }
        };
        Log.warnIf = function (test) {
            var args = [];
            for (var _i = 0; _i < (arguments.length - 1); _i++) {
                args[_i] = arguments[_i + 1];
            }
            if (test) {
                Log.warn.apply(this, [test].concat(args));
            }
        };
        Log.errorIf = function (test) {
            var args = [];
            for (var _i = 0; _i < (arguments.length - 1); _i++) {
                args[_i] = arguments[_i + 1];
            }
            if (test) {
                Log.error.apply(this, [test].concat(args));
            }
        };
        return Log;
    })();
    illa.Log = Log;
})(illa || (illa = {}));
var illa;
(function (illa) {
    (function (Axis2D) {
        Axis2D[Axis2D["X"] = 0] = "X";
        Axis2D[Axis2D["Y"] = 1] = "Y";
    })(illa.Axis2D || (illa.Axis2D = {}));
    var Axis2D = illa.Axis2D;
})(illa || (illa = {}));
var berek;
(function (berek) {
    var ScrollbarUtil = (function () {
        function ScrollbarUtil(box) {
            this.defaultWidth = NaN;
            this.defaultHeight = NaN;
            if (box) {
                this.box = box;
            } else {
                this.box = berek.jquery.$('<div>');
            }
            this.box.addClass(ScrollbarUtil.CSS_CLASS);
            this.box.appendTo('body');
        }
        ScrollbarUtil.prototype.getDefaultSize = function (axis) {
            var result = NaN;

            if (isNaN(this.defaultWidth)) {
                var boxElement = this.box[0];
                this.defaultWidth = boxElement.offsetWidth - boxElement.clientWidth;
                this.defaultHeight = boxElement.offsetHeight - boxElement.clientHeight;
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
        ScrollbarUtil.CSS_CLASS = 'berek-ScrollbarUtil-box';
        return ScrollbarUtil;
    })();
    berek.ScrollbarUtil = ScrollbarUtil;
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
            } else {
                var length = a.length;
                if (fromIndex == null) {
                    fromIndex = 0;
                } else if (fromIndex < 0) {
                    fromIndex = Math.max(0, length + fromIndex);
                }
                for (var i = fromIndex; i < length; i++) {
                    if (i in a && a[i] === v) {
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
    (function (End) {
        End[End["MIN"] = 0] = "MIN";
        End[End["MAX"] = 1] = "MAX";
    })(illa.End || (illa.End = {}));
    var End = illa.End;
})(illa || (illa = {}));
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
            } else {
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
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
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
                } else {
                    this.intervalID = setInterval(this.onTickBound, 1000 / 60);
                }
            } else {
                if (this.supportsAnimationFrame) {
                    cancelAnimationFrame(this.intervalID);
                } else {
                    clearInterval(this.intervalID);
                }
                this.intervalID = undefined;
            }
        };

        Ticker.prototype.getSupportsAnimationFrame = function () {
            return this.supportsAnimationFrame;
        };

        Ticker.prototype.onTick = function () {
            this.tickCount++;
            if (this.supportsAnimationFrame) {
                this.intervalID = requestAnimationFrame(this.onTickBound);
            }
            new illa.Event(Ticker.EVENT_TICK, this).dispatch();
        };

        Ticker.prototype.getTickCount = function () {
            return this.tickCount;
        };
        Ticker.EVENT_TICK = 'illa_Ticker_EVENT_TICK';
        return Ticker;
    })(illa.EventHandler);
    illa.Ticker = Ticker;
})(illa || (illa = {}));
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
        return Prop8;
    })();
    illa.Prop8 = Prop8;
})(illa || (illa = {}));
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
            this.defaultSpaceBefore = new illa.Prop2([1, 1], this.onSettingChanged, this);
            this.weight = new illa.Prop2([1, 1], this.onSettingChanged, this);
            this.shrinkWrap = new illa.Prop2([false, false], this.onSettingChanged, this);
            this.useContentWeight = new illa.Prop2([false, false], this.onSettingChanged, this);
            this.alignment = new illa.Prop2([0 /* START */, 0 /* START */], this.onSettingChanged, this);
            this.isSpacer = new illa.Prop(false, this.onSettingChanged, this);
            this.direction = new illa.Prop(0 /* X */, this.onSettingChanged, this);
            this.applySizeToSelf = new illa.Prop(false, this.onSettingChanged, this);
            this.mayShowScrollbar = new illa.Prop2([true, true], this.onSettingChanged, this);
            this.children = [];
            this.needsLayoutUpdate = false;
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
                return;
            }

            for (var axis = 0 /* X */; axis <= 1 /* Y */; axis++) {
                if (this.applySizeToSelf.get()) {
                    this.outSize.set(axis, this.sizeLimit.get(axis, 0 /* MIN */));
                }

                if (this.direction.get() == axis) {
                    var remainingSpace = this.shareSpaceAmongChildren(axis);
                    this.stackChildren(axis, remainingSpace);
                } else {
                    var contentSpace = this.getContentSpace(axis);
                    var largestMinSize = this.getLargestChildSizeLimit(axis, 0 /* MIN */);
                    var sizeToset = Math.max(contentSpace, largestMinSize);
                    this.setChildSizes(axis, sizeToset);
                    this.alignChildren(axis, sizeToset);
                    var remainingSpace = contentSpace - largestMinSize;
                }

                if (this.mayShowScrollbar.get(1 - axis)) {
                    this.outShowScrollbar.set(1 - axis, remainingSpace + this.inset.get(axis, 1 /* MAX */) < 0);
                }
            }

            if (this.needsLayoutUpdate) {
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
                var result = b.sizeLimit.get(axis, 1 /* MAX */) - a.sizeLimit.get(axis, 1 /* MAX */);
                return result || 0;
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
                    } else {
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
            } else if (this.alignment.get(axis) == 2 /* END */) {
                var offset = remainingSpace;
            } else {
                var offset = 0;
            }
            offset = Math.max(0, offset);
            offset += this.inset.get(axis, 0 /* MIN */);

            for (var i = 0, n = this.children.length; i < n; i++) {
                var item = this.children[i];
                if (i > 0) {
                    if (isNaN(item.spaceBefore.get(axis))) {
                        offset += this.defaultSpaceBefore.get(axis);
                    } else {
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
                var childrenWeight = 0;
                for (var j = 0, o = this.children.length; j < o; j++) {
                    childrenWeight += this.children[j].weight.get(axis);
                }
                if (this.useContentWeight.get(axis)) {
                    this.weight.set(axis, childrenWeight);
                }
            }
        };

        BoxModel.prototype.getShrinkWrappedSizeLimit = function (axis, end) {
            if (axis == this.direction.get()) {
                var result = this.getChildSizeLimits(axis, end);
            } else {
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

                var endToGet = child.isSpacer.get() ? 0 /* MIN */ : end;

                result += child.sizeLimit.get(axis, endToGet);
                if (i > 0) {
                    var childSpaceBefore = child.spaceBefore.get(axis);
                    if (isNaN(childSpaceBefore)) {
                        result += this.defaultSpaceBefore.get(axis);
                    } else {
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

                var endToGet = child.isSpacer.get() ? 0 /* MIN */ : end;

                result = Math.max(result, child.sizeLimit.get(axis, endToGet));
                if (!isFinite(result)) {
                    break;
                }
            }
            return result;
        };
        return BoxModel;
    })();
    deflex.BoxModel = BoxModel;
})(deflex || (deflex = {}));
var deflex;
(function (deflex) {
    (function (Context) {
        Context[Context["INNER"] = 0] = "INNER";
        Context[Context["PARENT"] = 1] = "PARENT";
        Context[Context["PAGE"] = 2] = "PAGE";
    })(deflex.Context || (deflex.Context = {}));
    var Context = deflex.Context;
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
        return StyleUtil;
    })();
    deflex.StyleUtil = StyleUtil;
})(deflex || (deflex = {}));
var deflex;
(function (deflex) {
    var jquery = berek.jquery;

    var Box = (function (_super) {
        __extends(Box, _super);
        function Box(jq) {
            _super.call(this);
            this.sizeCacheX = 0;
            this.sizeCacheY = 0;
            this.sizeIsFullX = false;
            this.sizeIsFullY = false;
            this.sizeIsAutoX = false;
            this.sizeIsAutoY = false;
            this.offsetCacheX = 0;
            this.offsetCacheY = 0;
            this.children = [];
            this.zIndex = 0;
            this.isDestroyed = false;
            this.isRoot = false;
            this.allowsVisibility = true;
            this.allowsLayoutActive = true;
            this.model = new deflex.BoxModel(this);
            this.name = '';

            if (jq) {
                this.jQuery = jq;
                var nextBoxJQ = this.jQuery.next('.' + Box.CSS_CLASS);
                if (!nextBoxJQ.length)
                    nextBoxJQ = undefined;
                this.setParent(jq.parent(), nextBoxJQ ? 0 /* MIN */ : 1 /* MAX */, nextBoxJQ, true);
            } else {
                this.jQuery = jquery.$('<div>');
            }
            this.jQuery.data(Box.JQUERY_DATA_KEY, this);
            this.jQuery.addClass(Box.CSS_CLASS);
            if (!(Box.EVENT_DESTROYED in jquery.$.event.special)) {
                jquery.$.event.special[Box.EVENT_DESTROYED] = {
                    remove: function (o) {
                        if (o.handler) {
                            o.handler(null);
                        }
                    }
                };
            }
            this.jQuery.on(Box.EVENT_DESTROYED, illa.bind(this.onDestroyed, this));

            if (!Box.scrollbarUtil) {
                Box.scrollbarUtil = new berek.ScrollbarUtil();
            }
        }
        Box.prototype.getJQuery = function () {
            return this.jQuery;
        };

        Box.prototype.onRootTick = function (e) {
            var startTime = new Date().getTime();
            this.onTick();

            if (this.getNeedsLayoutUpdate()) {
                this.getScrollbarUtil().clearDefaultSizeCache();
                this.updateModel();
                this.solveLayout();
                illa.Log.infoIf(this.name, 'layout solved:', new Date().getTime() - startTime, 'ms.');
            }
        };

        Box.prototype.onTick = function () {
            this.checkNeedsLayoutUpdate();

            for (var i = 0, n = this.children.length; i < n; i++) {
                var child = this.children[i];
                child.onTick();
                this.setNeedsLayoutUpdate(this.getNeedsLayoutUpdate() || child.getNeedsLayoutUpdate());
            }
        };

        Box.prototype.checkNeedsLayoutUpdate = function () {
            for (var axis = 0 /* X */; axis <= 1 /* Y */; axis++) {
                if (this.getSizeIsAuto(axis) || this.getSizeIsFull(axis)) {
                    var size = this.getSize(axis);
                    this.model.sizeLimit.set(axis, 0 /* MIN */, size);
                    this.model.sizeLimit.set(axis, 1 /* MAX */, size);
                }
            }
        };

        Box.prototype.updateModel = function () {
            var model = this.model;
            var parentBox = this.getParentBox();
            model.parent = parentBox ? parentBox.getModel() : null;

            var childModels = [];
            for (var i = 0, n = this.children.length; i < n; i++) {
                var childBox = this.children[i];
                if (childBox.getIsLayoutActive()) {
                    childModels.push(childBox.getModel());
                    childBox.updateModel();
                }
            }
            model.children = childModels;
        };

        Box.prototype.solveLayout = function () {
            this.model.applyContentWeight();

            while (this.getNeedsLayoutUpdate()) {
                this.model.solveLayout();
                this.applyModel();
            }
        };

        Box.prototype.applyModel = function () {
            var model = this.model;
            for (var axis = 0 /* X */; axis <= 1 /* Y */; axis++) {
                this.setOffset(model.outOffset.get(axis), axis);
                this.setShowScrollbar(model.outShowScrollbar.get(axis), axis);
                if (!this.getSizeIsFull(axis) && !this.getSizeIsAuto(axis)) {
                    this.setSize(model.outSize.get(axis), axis);
                }
            }

            for (var i = 0, n = this.children.length; i < n; i++) {
                var child = this.children[i];
                child.applyModel();
                this.setNeedsLayoutUpdate(this.getNeedsLayoutUpdate() || child.getNeedsLayoutUpdate());
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
            if (typeof context === "undefined") { context = 1 /* PARENT */; }
            var result = NaN;
            switch (axis) {
                case 0 /* X */:
                    if (isNaN(this.sizeCacheX)) {
                        result = this.jQuery[0].offsetWidth;
                    } else {
                        result = this.sizeCacheX;
                    }
                    break;
                case 1 /* Y */:
                    if (isNaN(this.sizeCacheY)) {
                        result = this.jQuery[0].offsetHeight;
                    } else {
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

        Box.prototype.getSizeIsAuto = function (axis) {
            var result = false;
            switch (axis) {
                case 0 /* X */:
                    result = this.sizeIsAutoX;
                    break;
                case 1 /* Y */:
                    result = this.sizeIsAutoY;
                    break;
            }
            return result;
        };

        Box.prototype.getSizeIsFull = function (axis) {
            var result = false;
            switch (axis) {
                case 0 /* X */:
                    result = this.sizeIsFullX;
                    break;
                case 1 /* Y */:
                    result = this.sizeIsFullY;
                    break;
            }
            return result;
        };

        Box.prototype.setSize = function (v, a, context) {
            if (typeof context === "undefined") { context = 1 /* PARENT */; }
            this.setSizeIsFull(false, a);
            this.setSizeIsAuto(false, a);
            for (var axis = a || 0 /* X */, lastAxis = (a != null ? a : 1 /* Y */); axis <= lastAxis; axis++) {
                var value = v;
                if (context == 0 /* INNER */) {
                    value += this.getVisibleScrollbarSize(axis);
                }
                if (isNaN(value) || !isFinite(value)) {
                    value = 0;
                } else {
                    value = Math.max(0, Math.round(value));
                }
                switch (axis) {
                    case 0 /* X */:
                        if (this.sizeCacheX != value) {
                            this.sizeCacheX = value;
                            this.jQuery[0].style.width = value + 'px';
                        }
                        break;
                    case 1 /* Y */:
                        if (this.sizeCacheY != value) {
                            this.sizeCacheY = value;
                            this.jQuery[0].style.height = value + 'px';
                        }
                        break;
                }
            }
        };

        Box.prototype.setSizeIsFull = function (flag, axis) {
            if (flag) {
                this.clearSizeCache(axis);
                this.setSizeIsAuto(false, axis);
            }
            switch (axis) {
                default:
                case 0 /* X */:
                    if (this.sizeIsFullX != flag) {
                        this.sizeIsFullX = flag;
                        this.jQuery.toggleClass(Box.CSS_CLASS_SIZE_FULL_X, flag);
                        this.setNeedsLayoutUpdate(true);
                    }
                    if (axis != null)
                        break;
                case 1 /* Y */:
                    if (this.sizeIsFullY != flag) {
                        this.sizeIsFullY = flag;
                        this.jQuery.toggleClass(Box.CSS_CLASS_SIZE_FULL_Y, flag);
                        this.setNeedsLayoutUpdate(true);
                    }
            }
        };

        Box.prototype.setSizeIsAuto = function (flag, axis) {
            if (flag) {
                this.clearSizeCache(axis);
                this.setSizeIsFull(false, axis);
            }
            switch (axis) {
                default:
                case 0 /* X */:
                    if (this.sizeIsAutoX != flag) {
                        this.sizeIsAutoX = flag;
                        this.jQuery.toggleClass(Box.CSS_CLASS_SIZE_AUTO_X, flag);
                        this.setNeedsLayoutUpdate(true);
                    }
                    if (axis != null)
                        break;
                case 1 /* Y */:
                    if (this.sizeIsAutoY != flag) {
                        this.sizeIsAutoY = flag;
                        this.jQuery.toggleClass(Box.CSS_CLASS_SIZE_AUTO_Y, flag);
                        this.setNeedsLayoutUpdate(true);
                    }
            }
        };

        Box.prototype.getOffset = function (axis, alignment, context) {
            if (typeof alignment === "undefined") { alignment = 0 /* START */; }
            if (typeof context === "undefined") { context = 1 /* PARENT */; }
            var result = NaN;
            var offset;
            switch (context) {
                case 0 /* INNER */:
                    offset = { left: 0, top: 0 };
                    break;
                case 1 /* PARENT */:
                    if (isNaN(this.offsetCacheX) || isNaN(this.offsetCacheY)) {
                        offset = this.jQuery.position();
                    } else {
                        offset = { left: this.offsetCacheX, top: this.offsetCacheY };
                    }
                    break;
                case 2 /* PAGE */:
                    offset = this.jQuery.offset();
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

        Box.prototype.setOffset = function (v, a, alignment, context) {
            if (typeof alignment === "undefined") { alignment = 0 /* START */; }
            if (typeof context === "undefined") { context = 1 /* PARENT */; }
            for (var axis = a || 0 /* X */, lastAxis = (a != null ? a : 1 /* Y */); axis <= lastAxis; axis++) {
                var value = v;
                if (context == 2 /* PAGE */) {
                    var pageOffset = this.getOffset(axis, 0 /* START */, 2 /* PAGE */);
                    var currentOffset = this.getOffset(axis);
                    value -= pageOffset - currentOffset;
                } else if (context == 0 /* INNER */) {
                    value += this.getOffset(axis);
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
                } else {
                    value = Math.round(value);
                }
                switch (axis) {
                    case 0 /* X */:
                        if (this.offsetCacheX != value) {
                            this.offsetCacheX = value;
                            this.jQuery[0].style.left = value + 'px';
                        }
                        break;
                    case 1 /* Y */:
                        if (this.offsetCacheY != value) {
                            this.offsetCacheY = value;
                            this.jQuery[0].style.top = value + 'px';
                        }
                        break;
                }
            }
        };

        Box.prototype.getShowScrollbar = function (axis) {
            var overflow = '';
            switch (axis) {
                case 0 /* X */:
                    overflow = this.jQuery[0].style.overflowY;
                    break;
                case 1 /* Y */:
                    overflow = this.jQuery[0].style.overflowX;
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
                        this.jQuery[0].style.overflowY = overflow;
                    }
                    if (axis != null)
                        break;
                case 1 /* Y */:
                    if (this.getShowScrollbar(1 /* Y */) != flag) {
                        this.jQuery[0].style.overflowX = overflow;
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
            var result = null;
            if (source) {
                var stored = source.data(Box.JQUERY_DATA_KEY);
                if (stored instanceof Box) {
                    result = stored;
                }
            }
            return result;
        };

        Box.prototype.setParent = function (parent, end, related, dontModifyDOM) {
            if (typeof end === "undefined") { end = 1 /* MAX */; }
            if (typeof related === "undefined") { related = null; }
            if (typeof dontModifyDOM === "undefined") { dontModifyDOM = false; }
            var parentBox = null;
            var parentJQuery = null;
            var relatedBox = null;
            var relatedJQuery = null;

            if (parent instanceof Box) {
                parentBox = parent;
                relatedBox = related;
            } else if (parent instanceof jquery.$ || related instanceof jquery.$) {
                parentJQuery = parent;
                relatedJQuery = related;
                parentBox = Box.getFrom(parentJQuery);
                relatedBox = Box.getFrom(relatedJQuery);
            } else if (typeof parent == 'string') {
                parentJQuery = jquery.$(parent);
            }

            if (this.parentBox) {
                this.parentBox.removeChild(this);
            }

            if (parentBox) {
                if (this.parentBox != parentBox) {
                    if (!dontModifyDOM) {
                        parentBox.getJQuery().append(this.getJQuery());
                    }
                    this.parentBox = parentBox;
                    this.parentJQuery = null;
                }
                this.parentBox.insertChild(this, end, relatedBox);
                this.setIsRoot(false);
            } else if (relatedJQuery) {
                this.parentBox = null;
                this.parentJQuery = relatedJQuery.parent();

                if (!dontModifyDOM) {
                    switch (end) {
                        case 0 /* MIN */:
                            relatedJQuery.insertBefore(this.getJQuery());
                            break;
                        case 1 /* MAX */:
                            relatedJQuery.insertAfter(this.getJQuery());
                            break;
                    }
                }
                this.setIsRoot(true);
            } else if (parentJQuery) {
                this.parentBox = null;
                this.parentJQuery = parentJQuery;

                if (!dontModifyDOM) {
                    switch (end) {
                        case 0 /* MIN */:
                            parentJQuery.append(this.getJQuery());
                            break;
                        case 1 /* MAX */:
                            parentJQuery.prepend(this.getJQuery());
                            break;
                    }
                }
                this.setIsRoot(true);
            } else {
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
            } else if (this.parentJQuery) {
                return Box.getFrom(this.parentJQuery.closest('.' + Box.CSS_CLASS));
            } else {
                return null;
            }
        };

        Box.prototype.insertChild = function (child, end, related) {
            if (typeof end === "undefined") { end = 1 /* MAX */; }
            if (typeof related === "undefined") { related = null; }
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
            } else {
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
            if (typeof end === "undefined") { end = 1 /* MAX */; }
            if (typeof related === "undefined") { related = null; }
            this.removeChild(child, true);
            this.insertChild(child, end, related);
        };

        Box.prototype.removeChild = function (child, throwError) {
            if (typeof throwError === "undefined") { throwError = false; }
            var index = this.getChildIndex(child);
            if (index == -1) {
                if (throwError)
                    throw 'Not a child.';
            } else {
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

        Box.prototype.onDestroyed = function (event) {
            illa.Log.infoIf(this.name, 'is being destroyed.');
            this.isDestroyed = true;
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

        Box.prototype.getIsDestroyed = function () {
            return this.isDestroyed;
        };

        Box.prototype.updateChildZIndexes = function (startIndex) {
            if (typeof startIndex === "undefined") { startIndex = 0; }
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
            } else {
                Box.ROOT_TICKER.removeEventCallback(illa.Ticker.EVENT_TICK, this.onRootTick, this);
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
            var result = NaN;
            switch (axis) {
                case 0 /* X */:
                    result = this.getJQuery().scrollLeft();
                    break;
                case 1 /* Y */:
                    result = this.getJQuery().scrollTop();
                    break;
            }
            return result;
        };

        Box.prototype.setScroll = function (value, axis) {
            switch (axis) {
                default:
                case 0 /* X */:
                    this.getJQuery().scrollLeft(value);
                    if (axis != null)
                        break;
                case 1 /* Y */:
                    this.getJQuery().scrollTop(value);
            }
        };

        Box.prototype.getModel = function () {
            return this.model;
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

        Box.prototype.getShrinkWrap = function (axis) {
            return this.model.shrinkWrap.get(axis);
        };

        Box.prototype.setShrinkWrap = function (value, a) {
            for (var axis = a || 0 /* X */, lastAxis = (a != null ? a : 1 /* Y */); axis <= lastAxis; axis++) {
                this.model.shrinkWrap.set(axis, value);
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

        Box.prototype.applyStyle = function (key, value) {
            var success = true;
            switch (key) {
                case 'size-is-full':
                    this.setSizeIsFull(deflex.StyleUtil.readBoolean(value));
                    break;
                case 'size-is-full-x':
                    this.setSizeIsFull(deflex.StyleUtil.readBoolean(value), 0 /* X */);
                    break;
                case 'size-is-full-y':
                    this.setSizeIsFull(deflex.StyleUtil.readBoolean(value), 1 /* Y */);
                    break;

                case 'size-is-auto':
                    this.setSizeIsAuto(deflex.StyleUtil.readBoolean(value));
                    break;
                case 'size-is-auto-x':
                    this.setSizeIsAuto(deflex.StyleUtil.readBoolean(value), 0 /* X */);
                    break;
                case 'size-is-auto-y':
                    this.setSizeIsAuto(deflex.StyleUtil.readBoolean(value), 1 /* Y */);
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

                case 'shrink-wrap':
                    this.setShrinkWrap(deflex.StyleUtil.readBoolean(value));
                    break;
                case 'shrink-wrap-x':
                    this.setShrinkWrap(deflex.StyleUtil.readBoolean(value), 0 /* X */);
                    break;
                case 'shrink-wrap-y':
                    this.setShrinkWrap(deflex.StyleUtil.readBoolean(value), 1 /* Y */);
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

                default:
                    success = false;
            }

            return success;
        };
        Box.ROOT_TICKER = new illa.Ticker();

        Box.JQUERY_DATA_KEY = 'deflex_Box';
        Box.CSS_CLASS = 'deflex-Box';
        Box.CSS_CLASS_SIZE_AUTO_X = 'deflex-Box-size-auto-x';
        Box.CSS_CLASS_SIZE_AUTO_Y = 'deflex-Box-size-auto-y';
        Box.CSS_CLASS_SIZE_FULL_X = 'deflex-Box-size-full-x';
        Box.CSS_CLASS_SIZE_FULL_Y = 'deflex-Box-size-full-y';
        Box.CSS_CLASS_IS_ROOT = 'deflex-Box-is-root';
        Box.EVENT_DESTROYED = 'deflex_Box_destroyed';
        return Box;
    })(illa.EventHandler);
    deflex.Box = Box;
})(deflex || (deflex = {}));
var deflex;
(function (deflex) {
    var jquery = berek.jquery;

    var Factory = (function () {
        function Factory() {
        }
        Factory.checkDOM = function () {
            var jqs = jquery.$('[' + this.CLASS_ATTRIBUTE_NAME + '],[' + this.STYLE_ATTRIBUTE_NAME + ']');
            for (var i = 0, n = jqs.length; i < n; i++) {
                var jq = jqs.eq(i);
                this.create(jq);
            }
        };

        Factory.create = function (jq) {
            var constructorName = jq.attr(this.CLASS_ATTRIBUTE_NAME);
            jq.removeAttr(this.CLASS_ATTRIBUTE_NAME);
            if (typeof constructorName != 'string') {
                constructorName = 'default';
            }

            var boxConstructor = this.boxConstructors[constructorName];
            var box = new boxConstructor(jq);

            var styleString = jq.attr(this.STYLE_ATTRIBUTE_NAME);
            jq.removeAttr(this.STYLE_ATTRIBUTE_NAME);
            if (styleString) {
                this.applyStyle(box, styleString);
            }

            return box;
        };

        Factory.applyStyle = function (box, styleString) {
            styleString = styleString.replace(/^\s+/, '').replace(/\s+$/, '');

            var style = styleString.split(/\s*;\s*/g);
            for (var i = 0, n = style.length; i < n; i++) {
                var styleSplit = style[i].split(/\s*:\s*/g);
                var key = styleSplit[0];
                var value = styleSplit[1];

                if (key) {
                    try  {
                        if (!box.applyStyle(key, value)) {
                            illa.Log.warn('Style key not recognized: ' + key);
                        }
                    } catch (e) {
                        illa.Log.warn(key + ': ' + e);
                    }
                }
            }
        };
        Factory.CLASS_ATTRIBUTE_NAME = 'data-deflex-class';
        Factory.STYLE_ATTRIBUTE_NAME = 'data-deflex-style';
        Factory.boxConstructors = { 'default': deflex.Box };
        return Factory;
    })();
    deflex.Factory = Factory;
})(deflex || (deflex = {}));
var test1;
(function (test1) {
    var jquery = berek.jquery;

    var Main = (function () {
        function Main() {
            jquery.$(illa.bind(this.onDOMLoaded, this));
        }
        Main.prototype.onDOMLoaded = function () {
            var startTime = new Date().getTime();

            var itemCount = 0;

            var outer = this.outer = new deflex.Box();
            outer.name = 'outer';
            outer.setParent('body');
            outer.getJQuery().css({ 'background-color': '#aaa' });
            outer.setSizeIsFull(true);
            outer.setAlignment(1 /* CENTER */);
            outer.setDirection(1 /* Y */);
            itemCount++;

            var markup = '';
            for (var i = 0, n = 20; i < n; i++) {
                markup += '<div data-deflex-style="shrink-wrap: true">';
                itemCount++;

                for (var j = 0, o = 20; j < o; j++) {
                    markup += '<div style="background-color: #ededed" ' + 'data-deflex-style="alignment: center; may-show-scrollbar: false; shrink-wrap: true; ' + 'shrink-wrap-size-limit: infinity; shrink-wrap-size-limit-x-min-min: 44px; shrink-wrap-size-limit-y-min-min: 0px">';
                    itemCount++;

                    markup += '<div data-deflex-style="size-is-auto: true">Cell ' + (i * n + j) + '</div>';
                    itemCount++;

                    markup += '</div>';
                }

                markup += '</div>';
            }

            outer.getJQuery().html(markup);

            deflex.Factory.checkDOM();

            illa.Log.info('Init finished:', new Date().getTime() - startTime, 'ms.');
            illa.Log.info('Item count:', itemCount);
        };
        return Main;
    })();
    test1.Main = Main;
})(test1 || (test1 = {}));

var test1Main = new test1.Main();
