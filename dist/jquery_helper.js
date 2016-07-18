(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('jquery')) :
    typeof define === 'function' && define.amd ? define(['exports', 'jquery'], factory) :
    (factory((global.Materialize = global.Materialize || {}),global.jQuery));
}(this, function (exports,$) { 'use strict';

    $ = 'default' in $ ? $['default'] : $;

    var $_GLOBAL$1 = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : Function('return this')();
    var document$1 = $_GLOBAL$1.document;
    var VENDOR_PREFIXES = ['', 'webkit', 'Moz', 'MS', 'ms', 'o'];
    var TEST_ELEMENT = document$1.createElement('div');

    var TYPE_FUNCTION = 'function';

    var round = Math.round;
    var abs = Math.abs;
    var now = Date.now;

    /**
     * set a timeout with a given scope
     * @param {Function} fn
     * @param {Number} timeout
     * @param {Object} context
     * @returns {number}
     */
    function setTimeoutContext(fn, timeout, context) {
        return setTimeout(bindFn(fn, context), timeout);
    }

    /**
     * if the argument is an array, we want to execute the fn on each entry
     * if it aint an array we don't want to do a thing.
     * this is used by all the methods that accept a single and array argument.
     * @param {*|Array} arg
     * @param {String} fn
     * @param {Object} [context]
     * @returns {Boolean}
     */
    function invokeArrayArg(arg, fn, context) {
        if (Array.isArray(arg)) {
            each(arg, context[fn], context);
            return true;
        }
        return false;
    }

    /**
     * walk objects and arrays
     * @param {Object} obj
     * @param {Function} iterator
     * @param {Object} context
     */
    function each(obj, iterator, context) {
        var i;

        if (!obj) {
            return;
        }

        if (obj.forEach) {
            obj.forEach(iterator, context);
        } else if (obj.length !== undefined) {
            i = 0;
            while (i < obj.length) {
                iterator.call(context, obj[i], i, obj);
                i++;
            }
        } else {
            for (i in obj) {
                obj.hasOwnProperty(i) && iterator.call(context, obj[i], i, obj);
            }
        }
    }

    /**
     * wrap a method with a deprecation warning and stack trace
     * @param {Function} method
     * @param {String} name
     * @param {String} message
     * @returns {Function} A new function wrapping the supplied method.
     */
    function deprecate(method, name, message) {
        var deprecationMessage = 'DEPRECATED METHOD: ' + name + '\n' + message + ' AT \n';
        return function () {
            var e = new Error('get-stack-trace');
            var stack = e && e.stack ? e.stack.replace(/^[^\(]+?[\n$]/gm, '').replace(/^\s+at\s+/gm, '').replace(/^Object.<anonymous>\s*\(/gm, '{anonymous}()@') : 'Unknown Stack Trace';

            var log = $_GLOBAL$1.console && (window.console.warn || window.console.log);
            if (log) {
                log.call(window.console, deprecationMessage, stack);
            }
            return method.apply(this, arguments);
        };
    }

    /**
     * extend object.
     * means that properties in dest will be overwritten by the ones in src.
     * @param {Object} target
     * @param {...Object} objects_to_assign
     * @returns {Object} target
     */
    var assign;
    if (typeof Object.assign !== 'function') {
        assign = function assign(target) {
            if (target === undefined || target === null) {
                throw new TypeError('Cannot convert undefined or null to object');
            }

            var output = Object(target);
            for (var index = 1; index < arguments.length; index++) {
                var source = arguments[index];
                if (source !== undefined && source !== null) {
                    for (var nextKey in source) {
                        if (source.hasOwnProperty(nextKey)) {
                            output[nextKey] = source[nextKey];
                        }
                    }
                }
            }
            return output;
        };
    } else {
        assign = Object.assign;
    }

    /**
     * extend object.
     * means that properties in dest will be overwritten by the ones in src.
     * @param {Object} dest
     * @param {Object} src
     * @param {Boolean} [merge=false]
     * @returns {Object} dest
     */
    var extend = deprecate(function extend(dest, src, merge) {
        var keys = Object.keys(src);
        var i = 0;
        while (i < keys.length) {
            if (!merge || merge && dest[keys[i]] === undefined) {
                dest[keys[i]] = src[keys[i]];
            }
            i++;
        }
        return dest;
    }, 'extend', 'Use `assign`.');

    /**
     * merge the values from src in the dest.
     * means that properties that exist in dest will not be overwritten by src
     * @param {Object} dest
     * @param {Object} src
     * @returns {Object} dest
     */
    var merge = deprecate(function merge(dest, src) {
        return extend(dest, src, true);
    }, 'merge', 'Use `assign`.');

    /**
     * simple class inheritance
     * @param {Function} child
     * @param {Function} base
     * @param {Object} [properties]
     */
    function inherit(child, base, properties) {
        var baseP = base.prototype,
            childP;

        childP = child.prototype = Object.create(baseP);
        childP.constructor = child;
        childP._super = baseP;

        if (properties) {
            assign(childP, properties);
        }
    }

    /**
     * simple function bind
     * @param {Function} fn
     * @param {Object} context
     * @returns {Function}
     */
    function bindFn(fn, context) {
        return function boundFn() {
            return fn.apply(context, arguments);
        };
    }

    /**
     * let a boolean value also be a function that must return a boolean
     * this first item in args will be used as the context
     * @param {Boolean|Function} val
     * @param {Array} [args]
     * @returns {Boolean}
     */
    function boolOrFn(val, args) {
        if (typeof val == TYPE_FUNCTION) {
            return val.apply(args ? args[0] || undefined : undefined, args);
        }
        return val;
    }

    /**
     * use the val2 when val1 is undefined
     * @param {*} val1
     * @param {*} val2
     * @returns {*}
     */
    function ifUndefined(val1, val2) {
        return val1 === undefined ? val2 : val1;
    }

    /**
     * addEventListener with multiple events at once
     * @param {EventTarget} target
     * @param {String} types
     * @param {Function} handler
     */
    function addEventListeners(target, types, handler) {
        each(splitStr(types), function (type) {
            target.addEventListener(type, handler, false);
        });
    }

    /**
     * removeEventListener with multiple events at once
     * @param {EventTarget} target
     * @param {String} types
     * @param {Function} handler
     */
    function removeEventListeners(target, types, handler) {
        each(splitStr(types), function (type) {
            target.removeEventListener(type, handler, false);
        });
    }

    /**
     * find if a node is in the given parent
     * @method hasParent
     * @param {HTMLElement} node
     * @param {HTMLElement} parent
     * @return {Boolean} found
     */
    function hasParent(node, parent) {
        while (node) {
            if (node == parent) {
                return true;
            }
            node = node.parentNode;
        }
        return false;
    }

    /**
     * small indexOf wrapper
     * @param {String} str
     * @param {String} find
     * @returns {Boolean} found
     */
    function inStr(str, find) {
        return str.indexOf(find) > -1;
    }

    /**
     * split string on whitespace
     * @param {String} str
     * @returns {Array} words
     */
    function splitStr(str) {
        return str.trim().split(/\s+/g);
    }

    /**
     * find if a array contains the object using indexOf or a simple polyFill
     * @param {Array} src
     * @param {String} find
     * @param {String} [findByKey]
     * @return {Boolean|Number} false when not found, or the index
     */
    function inArray(src, find, findByKey) {
        if (src.indexOf && !findByKey) {
            return src.indexOf(find);
        } else {
            var i = 0;
            while (i < src.length) {
                if (findByKey && src[i][findByKey] == find || !findByKey && src[i] === find) {
                    return i;
                }
                i++;
            }
            return -1;
        }
    }

    /**
     * convert array-like objects to real arrays
     * @param {Object} obj
     * @returns {Array}
     */
    function toArray(obj) {
        return Array.prototype.slice.call(obj, 0);
    }

    /**
     * unique array with objects based on a key (like 'id') or just by the array's value
     * @param {Array} src [{id:1},{id:2},{id:1}]
     * @param {String} [key]
     * @param {Boolean} [sort=False]
     * @returns {Array} [{id:1},{id:2}]
     */
    function uniqueArray(src, key, sort) {
        var results = [];
        var values = [];
        var i = 0;

        while (i < src.length) {
            var val = key ? src[i][key] : src[i];
            if (inArray(values, val) < 0) {
                results.push(src[i]);
            }
            values[i] = val;
            i++;
        }

        if (sort) {
            if (!key) {
                results = results.sort();
            } else {
                results = results.sort(function sortUniqueArray(a, b) {
                    return a[key] > b[key];
                });
            }
        }

        return results;
    }

    /**
     * get the prefixed property
     * @param {Object} obj
     * @param {String} property
     * @returns {String|Undefined} prefixed
     */
    function prefixed(obj, property) {
        var prefix, prop;
        var camelProp = property[0].toUpperCase() + property.slice(1);

        var i = 0;
        while (i < VENDOR_PREFIXES.length) {
            prefix = VENDOR_PREFIXES[i];
            prop = prefix ? prefix + camelProp : property;

            if (prop in obj) {
                return prop;
            }
            i++;
        }
        return undefined;
    }

    /**
     * get a unique id
     * @returns {number} uniqueId
     */
    var _uniqueId = 1;
    function uniqueId() {
        return _uniqueId++;
    }

    /**
     * get the window object of an element
     * @param {HTMLElement} element
     * @returns {DocumentView|Window}
     */
    function getWindowForElement(element) {
        var doc = element.ownerDocument || element;
        return doc.defaultView || doc.parentWindow || window;
    }

    var MOBILE_REGEX = /mobile|tablet|ip(ad|hone|od)|android/i;

    var SUPPORT_TOUCH = 'ontouchstart' in $_GLOBAL$1;
    var SUPPORT_POINTER_EVENTS = prefixed(window, 'PointerEvent') !== undefined;
    var SUPPORT_ONLY_TOUCH = SUPPORT_TOUCH && MOBILE_REGEX.test(navigator.userAgent);

    var INPUT_TYPE_TOUCH = 'touch';
    var INPUT_TYPE_PEN = 'pen';
    var INPUT_TYPE_MOUSE = 'mouse';
    var INPUT_TYPE_KINECT = 'kinect';

    var COMPUTE_INTERVAL = 25;

    var INPUT_START = 1;
    var INPUT_MOVE = 2;
    var INPUT_END = 4;
    var INPUT_CANCEL = 8;

    var DIRECTION_NONE = 1;
    var DIRECTION_LEFT = 2;
    var DIRECTION_RIGHT = 4;
    var DIRECTION_UP = 8;
    var DIRECTION_DOWN = 16;

    var DIRECTION_HORIZONTAL = DIRECTION_LEFT | DIRECTION_RIGHT;
    var DIRECTION_VERTICAL = DIRECTION_UP | DIRECTION_DOWN;
    var DIRECTION_ALL = DIRECTION_HORIZONTAL | DIRECTION_VERTICAL;

    var PROPS_XY = ['x', 'y'];
    var PROPS_CLIENT_XY = ['clientX', 'clientY'];

    /**
     * create new input type manager
     * @param {Manager} manager
     * @param {Function} callback
     * @returns {Input}
     * @constructor
     */
    function Input(manager, callback) {
        var self = this;
        this.manager = manager;
        this.callback = callback;
        this.element = manager.element;
        this.target = manager.options.inputTarget;

        // smaller wrapper around the handler, for the scope and the enabled state of the manager,
        // so when disabled the input events are completely bypassed.
        this.domHandler = function (ev) {
            if (boolOrFn(manager.options.enable, [manager])) {
                self.handler(ev);
            }
        };

        this.init();
    }

    Input.prototype = {
        /**
         * should handle the inputEvent data and trigger the callback
         * @virtual
         */
        handler: function handler() {},

        /**
         * bind the events
         */
        init: function init() {
            this.evEl && addEventListeners(this.element, this.evEl, this.domHandler);
            this.evTarget && addEventListeners(this.target, this.evTarget, this.domHandler);
            this.evWin && addEventListeners(getWindowForElement(this.element), this.evWin, this.domHandler);
        },

        /**
         * unbind the events
         */
        destroy: function destroy() {
            this.evEl && removeEventListeners(this.element, this.evEl, this.domHandler);
            this.evTarget && removeEventListeners(this.target, this.evTarget, this.domHandler);
            this.evWin && removeEventListeners(getWindowForElement(this.element), this.evWin, this.domHandler);
        }
    };

    /**
     * create new input type manager
     * called by the Manager constructor
     * @param {Hammer} manager
     * @returns {Input}
     */
    function createInputInstance(manager) {
        var Type;
        var inputClass = manager.options.inputClass;

        if (inputClass) {
            Type = inputClass;
        } else if (SUPPORT_POINTER_EVENTS) {
            Type = PointerEventInput;
        } else if (SUPPORT_ONLY_TOUCH) {
            Type = TouchInput;
        } else if (!SUPPORT_TOUCH) {
            Type = MouseInput;
        } else {
            Type = TouchMouseInput;
        }
        return new Type(manager, inputHandler);
    }

    /**
     * handle input events
     * @param {Manager} manager
     * @param {String} eventType
     * @param {Object} input
     */
    function inputHandler(manager, eventType, input) {
        var pointersLen = input.pointers.length;
        var changedPointersLen = input.changedPointers.length;
        var isFirst = eventType & INPUT_START && pointersLen - changedPointersLen === 0;
        var isFinal = eventType & (INPUT_END | INPUT_CANCEL) && pointersLen - changedPointersLen === 0;

        input.isFirst = !!isFirst;
        input.isFinal = !!isFinal;

        if (isFirst) {
            manager.session = {};
        }

        // source event is the normalized value of the domEvents
        // like 'touchstart, mouseup, pointerdown'
        input.eventType = eventType;

        // compute scale, rotation etc
        computeInputData(manager, input);

        // emit secret event
        manager.emit('hammer.input', input);

        manager.recognize(input);
        manager.session.prevInput = input;
    }

    /**
     * extend the data with some usable properties like scale, rotate, velocity etc
     * @param {Object} manager
     * @param {Object} input
     */
    function computeInputData(manager, input) {
        var session = manager.session;
        var pointers = input.pointers;
        var pointersLength = pointers.length;

        // store the first input to calculate the distance and direction
        if (!session.firstInput) {
            session.firstInput = simpleCloneInputData(input);
        }

        // to compute scale and rotation we need to store the multiple touches
        if (pointersLength > 1 && !session.firstMultiple) {
            session.firstMultiple = simpleCloneInputData(input);
        } else if (pointersLength === 1) {
            session.firstMultiple = false;
        }

        var firstInput = session.firstInput;
        var firstMultiple = session.firstMultiple;
        var offsetCenter = firstMultiple ? firstMultiple.center : firstInput.center;

        var center = input.center = getCenter(pointers);
        input.timeStamp = now();
        input.deltaTime = input.timeStamp - firstInput.timeStamp;

        input.angle = getAngle(offsetCenter, center);
        input.distance = getDistance(offsetCenter, center);

        computeDeltaXY(session, input);
        input.offsetDirection = getDirection(input.deltaX, input.deltaY);

        var overallVelocity = getVelocity(input.deltaTime, input.deltaX, input.deltaY);
        input.overallVelocityX = overallVelocity.x;
        input.overallVelocityY = overallVelocity.y;
        input.overallVelocity = abs(overallVelocity.x) > abs(overallVelocity.y) ? overallVelocity.x : overallVelocity.y;

        input.scale = firstMultiple ? getScale(firstMultiple.pointers, pointers) : 1;
        input.rotation = firstMultiple ? getRotation(firstMultiple.pointers, pointers) : 0;

        input.maxPointers = !session.prevInput ? input.pointers.length : input.pointers.length > session.prevInput.maxPointers ? input.pointers.length : session.prevInput.maxPointers;

        computeIntervalInputData(session, input);

        // find the correct target
        var target = manager.element;
        if (hasParent(input.srcEvent.target, target)) {
            target = input.srcEvent.target;
        }
        input.target = target;
    }

    function computeDeltaXY(session, input) {
        var center = input.center;
        var offset = session.offsetDelta || {};
        var prevDelta = session.prevDelta || {};
        var prevInput = session.prevInput || {};

        if (input.eventType === INPUT_START || prevInput.eventType === INPUT_END) {
            prevDelta = session.prevDelta = {
                x: prevInput.deltaX || 0,
                y: prevInput.deltaY || 0
            };

            offset = session.offsetDelta = {
                x: center.x,
                y: center.y
            };
        }

        input.deltaX = prevDelta.x + (center.x - offset.x);
        input.deltaY = prevDelta.y + (center.y - offset.y);
    }

    /**
     * velocity is calculated every x ms
     * @param {Object} session
     * @param {Object} input
     */
    function computeIntervalInputData(session, input) {
        var last = session.lastInterval || input,
            deltaTime = input.timeStamp - last.timeStamp,
            velocity,
            velocityX,
            velocityY,
            direction;

        if (input.eventType != INPUT_CANCEL && (deltaTime > COMPUTE_INTERVAL || last.velocity === undefined)) {
            var deltaX = input.deltaX - last.deltaX;
            var deltaY = input.deltaY - last.deltaY;

            var v = getVelocity(deltaTime, deltaX, deltaY);
            velocityX = v.x;
            velocityY = v.y;
            velocity = abs(v.x) > abs(v.y) ? v.x : v.y;
            direction = getDirection(deltaX, deltaY);

            session.lastInterval = input;
        } else {
            // use latest velocity info if it doesn't overtake a minimum period
            velocity = last.velocity;
            velocityX = last.velocityX;
            velocityY = last.velocityY;
            direction = last.direction;
        }

        input.velocity = velocity;
        input.velocityX = velocityX;
        input.velocityY = velocityY;
        input.direction = direction;
    }

    /**
     * create a simple clone from the input used for storage of firstInput and firstMultiple
     * @param {Object} input
     * @returns {Object} clonedInputData
     */
    function simpleCloneInputData(input) {
        // make a simple copy of the pointers because we will get a reference if we don't
        // we only need clientXY for the calculations
        var pointers = [];
        var i = 0;
        while (i < input.pointers.length) {
            pointers[i] = {
                clientX: round(input.pointers[i].clientX),
                clientY: round(input.pointers[i].clientY)
            };
            i++;
        }

        return {
            timeStamp: now(),
            pointers: pointers,
            center: getCenter(pointers),
            deltaX: input.deltaX,
            deltaY: input.deltaY
        };
    }

    /**
     * get the center of all the pointers
     * @param {Array} pointers
     * @return {Object} center contains `x` and `y` properties
     */
    function getCenter(pointers) {
        var pointersLength = pointers.length;

        // no need to loop when only one touch
        if (pointersLength === 1) {
            return {
                x: round(pointers[0].clientX),
                y: round(pointers[0].clientY)
            };
        }

        var x = 0,
            y = 0,
            i = 0;
        while (i < pointersLength) {
            x += pointers[i].clientX;
            y += pointers[i].clientY;
            i++;
        }

        return {
            x: round(x / pointersLength),
            y: round(y / pointersLength)
        };
    }

    /**
     * calculate the velocity between two points. unit is in px per ms.
     * @param {Number} deltaTime
     * @param {Number} x
     * @param {Number} y
     * @return {Object} velocity `x` and `y`
     */
    function getVelocity(deltaTime, x, y) {
        return {
            x: x / deltaTime || 0,
            y: y / deltaTime || 0
        };
    }

    /**
     * get the direction between two points
     * @param {Number} x
     * @param {Number} y
     * @return {Number} direction
     */
    function getDirection(x, y) {
        if (x === y) {
            return DIRECTION_NONE;
        }

        if (abs(x) >= abs(y)) {
            return x < 0 ? DIRECTION_LEFT : DIRECTION_RIGHT;
        }
        return y < 0 ? DIRECTION_UP : DIRECTION_DOWN;
    }

    /**
     * calculate the absolute distance between two points
     * @param {Object} p1 {x, y}
     * @param {Object} p2 {x, y}
     * @param {Array} [props] containing x and y keys
     * @return {Number} distance
     */
    function getDistance(p1, p2, props) {
        if (!props) {
            props = PROPS_XY;
        }
        var x = p2[props[0]] - p1[props[0]],
            y = p2[props[1]] - p1[props[1]];

        return Math.sqrt(x * x + y * y);
    }

    /**
     * calculate the angle between two coordinates
     * @param {Object} p1
     * @param {Object} p2
     * @param {Array} [props] containing x and y keys
     * @return {Number} angle
     */
    function getAngle(p1, p2, props) {
        if (!props) {
            props = PROPS_XY;
        }
        var x = p2[props[0]] - p1[props[0]],
            y = p2[props[1]] - p1[props[1]];
        return Math.atan2(y, x) * 180 / Math.PI;
    }

    /**
     * calculate the rotation degrees between two pointersets
     * @param {Array} start array of pointers
     * @param {Array} end array of pointers
     * @return {Number} rotation
     */
    function getRotation(start, end) {
        return getAngle(end[1], end[0], PROPS_CLIENT_XY) + getAngle(start[1], start[0], PROPS_CLIENT_XY);
    }

    /**
     * calculate the scale factor between two pointersets
     * no scale is 1, and goes down to 0 when pinched together, and bigger when pinched out
     * @param {Array} start array of pointers
     * @param {Array} end array of pointers
     * @return {Number} scale
     */
    function getScale(start, end) {
        return getDistance(end[0], end[1], PROPS_CLIENT_XY) / getDistance(start[0], start[1], PROPS_CLIENT_XY);
    }

    var MOUSE_INPUT_MAP = {
        mousedown: INPUT_START,
        mousemove: INPUT_MOVE,
        mouseup: INPUT_END
    };

    var MOUSE_ELEMENT_EVENTS = 'mousedown';
    var MOUSE_WINDOW_EVENTS = 'mousemove mouseup';

    /**
     * Mouse events input
     * @constructor
     * @extends Input
     */
    function MouseInput() {
        this.evEl = MOUSE_ELEMENT_EVENTS;
        this.evWin = MOUSE_WINDOW_EVENTS;

        this.pressed = false; // mousedown state

        Input.apply(this, arguments);
    }

    inherit(MouseInput, Input, {
        /**
         * handle mouse events
         * @param {Object} ev
         */
        handler: function MEhandler(ev) {
            var eventType = MOUSE_INPUT_MAP[ev.type];

            // on start we want to have the left mouse button down
            if (eventType & INPUT_START && ev.button === 0) {
                this.pressed = true;
            }

            if (eventType & INPUT_MOVE && ev.which !== 1) {
                eventType = INPUT_END;
            }

            // mouse must be down
            if (!this.pressed) {
                return;
            }

            if (eventType & INPUT_END) {
                this.pressed = false;
            }

            this.callback(this.manager, eventType, {
                pointers: [ev],
                changedPointers: [ev],
                pointerType: INPUT_TYPE_MOUSE,
                srcEvent: ev
            });
        }
    });

    var POINTER_INPUT_MAP = {
        pointerdown: INPUT_START,
        pointermove: INPUT_MOVE,
        pointerup: INPUT_END,
        pointercancel: INPUT_CANCEL,
        pointerout: INPUT_CANCEL
    };

    // in IE10 the pointer types is defined as an enum
    var IE10_POINTER_TYPE_ENUM = {
        2: INPUT_TYPE_TOUCH,
        3: INPUT_TYPE_PEN,
        4: INPUT_TYPE_MOUSE,
        5: INPUT_TYPE_KINECT // see https://twitter.com/jacobrossi/status/480596438489890816
    };

    var POINTER_ELEMENT_EVENTS = 'pointerdown';
    var POINTER_WINDOW_EVENTS = 'pointermove pointerup pointercancel';

    // IE10 has prefixed support, and case-sensitive
    if ($_GLOBAL$1.MSPointerEvent && !window.PointerEvent) {
        POINTER_ELEMENT_EVENTS = 'MSPointerDown';
        POINTER_WINDOW_EVENTS = 'MSPointerMove MSPointerUp MSPointerCancel';
    }

    /**
     * Pointer events input
     * @constructor
     * @extends Input
     */
    function PointerEventInput() {
        this.evEl = POINTER_ELEMENT_EVENTS;
        this.evWin = POINTER_WINDOW_EVENTS;

        Input.apply(this, arguments);

        this.store = this.manager.session.pointerEvents = [];
    }

    inherit(PointerEventInput, Input, {
        /**
         * handle mouse events
         * @param {Object} ev
         */
        handler: function PEhandler(ev) {
            var store = this.store;
            var removePointer = false;

            var eventTypeNormalized = ev.type.toLowerCase().replace('ms', '');
            var eventType = POINTER_INPUT_MAP[eventTypeNormalized];
            var pointerType = IE10_POINTER_TYPE_ENUM[ev.pointerType] || ev.pointerType;

            var isTouch = pointerType == INPUT_TYPE_TOUCH;

            // get index of the event in the store
            var storeIndex = inArray(store, ev.pointerId, 'pointerId');

            // start and mouse must be down
            if (eventType & INPUT_START && (ev.button === 0 || isTouch)) {
                if (storeIndex < 0) {
                    store.push(ev);
                    storeIndex = store.length - 1;
                }
            } else if (eventType & (INPUT_END | INPUT_CANCEL)) {
                removePointer = true;
            }

            // it not found, so the pointer hasn't been down (so it's probably a hover)
            if (storeIndex < 0) {
                return;
            }

            // update the event in the store
            store[storeIndex] = ev;

            this.callback(this.manager, eventType, {
                pointers: store,
                changedPointers: [ev],
                pointerType: pointerType,
                srcEvent: ev
            });

            if (removePointer) {
                // remove from the store
                store.splice(storeIndex, 1);
            }
        }
    });

    var SINGLE_TOUCH_INPUT_MAP = {
        touchstart: INPUT_START,
        touchmove: INPUT_MOVE,
        touchend: INPUT_END,
        touchcancel: INPUT_CANCEL
    };

    var SINGLE_TOUCH_TARGET_EVENTS = 'touchstart';
    var SINGLE_TOUCH_WINDOW_EVENTS = 'touchstart touchmove touchend touchcancel';

    /**
     * Touch events input
     * @constructor
     * @extends Input
     */
    function SingleTouchInput() {
        this.evTarget = SINGLE_TOUCH_TARGET_EVENTS;
        this.evWin = SINGLE_TOUCH_WINDOW_EVENTS;
        this.started = false;

        Input.apply(this, arguments);
    }

    inherit(SingleTouchInput, Input, {
        handler: function TEhandler(ev) {
            var type = SINGLE_TOUCH_INPUT_MAP[ev.type];

            // should we handle the touch events?
            if (type === INPUT_START) {
                this.started = true;
            }

            if (!this.started) {
                return;
            }

            var touches = normalizeSingleTouches.call(this, ev, type);

            // when done, reset the started state
            if (type & (INPUT_END | INPUT_CANCEL) && touches[0].length - touches[1].length === 0) {
                this.started = false;
            }

            this.callback(this.manager, type, {
                pointers: touches[0],
                changedPointers: touches[1],
                pointerType: INPUT_TYPE_TOUCH,
                srcEvent: ev
            });
        }
    });

    /**
     * @this {TouchInput}
     * @param {Object} ev
     * @param {Number} type flag
     * @returns {undefined|Array} [all, changed]
     */
    function normalizeSingleTouches(ev, type) {
        var all = toArray(ev.touches);
        var changed = toArray(ev.changedTouches);

        if (type & (INPUT_END | INPUT_CANCEL)) {
            all = uniqueArray(all.concat(changed), 'identifier', true);
        }

        return [all, changed];
    }

    var TOUCH_INPUT_MAP = {
        touchstart: INPUT_START,
        touchmove: INPUT_MOVE,
        touchend: INPUT_END,
        touchcancel: INPUT_CANCEL
    };

    var TOUCH_TARGET_EVENTS = 'touchstart touchmove touchend touchcancel';

    /**
     * Multi-user touch events input
     * @constructor
     * @extends Input
     */
    function TouchInput() {
        this.evTarget = TOUCH_TARGET_EVENTS;
        this.targetIds = {};

        Input.apply(this, arguments);
    }

    inherit(TouchInput, Input, {
        handler: function MTEhandler(ev) {
            var type = TOUCH_INPUT_MAP[ev.type];
            var touches = getTouches.call(this, ev, type);
            if (!touches) {
                return;
            }

            this.callback(this.manager, type, {
                pointers: touches[0],
                changedPointers: touches[1],
                pointerType: INPUT_TYPE_TOUCH,
                srcEvent: ev
            });
        }
    });

    /**
     * @this {TouchInput}
     * @param {Object} ev
     * @param {Number} type flag
     * @returns {undefined|Array} [all, changed]
     */
    function getTouches(ev, type) {
        var allTouches = toArray(ev.touches);
        var targetIds = this.targetIds;

        // when there is only one touch, the process can be simplified
        if (type & (INPUT_START | INPUT_MOVE) && allTouches.length === 1) {
            targetIds[allTouches[0].identifier] = true;
            return [allTouches, allTouches];
        }

        var i,
            targetTouches,
            changedTouches = toArray(ev.changedTouches),
            changedTargetTouches = [],
            target = this.target;

        // get target touches from touches
        targetTouches = allTouches.filter(function (touch) {
            return hasParent(touch.target, target);
        });

        // collect touches
        if (type === INPUT_START) {
            i = 0;
            while (i < targetTouches.length) {
                targetIds[targetTouches[i].identifier] = true;
                i++;
            }
        }

        // filter changed touches to only contain touches that exist in the collected target ids
        i = 0;
        while (i < changedTouches.length) {
            if (targetIds[changedTouches[i].identifier]) {
                changedTargetTouches.push(changedTouches[i]);
            }

            // cleanup removed touches
            if (type & (INPUT_END | INPUT_CANCEL)) {
                delete targetIds[changedTouches[i].identifier];
            }
            i++;
        }

        if (!changedTargetTouches.length) {
            return;
        }

        return [
        // merge targetTouches with changedTargetTouches so it contains ALL touches, including 'end' and 'cancel'
        uniqueArray(targetTouches.concat(changedTargetTouches), 'identifier', true), changedTargetTouches];
    }

    var DEDUP_TIMEOUT = 2500;
    var DEDUP_DISTANCE = 25;

    function TouchMouseInput() {
        Input.apply(this, arguments);

        var handler = bindFn(this.handler, this);
        this.touch = new TouchInput(this.manager, handler);
        this.mouse = new MouseInput(this.manager, handler);

        this.primaryTouch = null;
        this.lastTouches = [];
    }

    inherit(TouchMouseInput, Input, {
        /**
         * handle mouse and touch events
         * @param {Hammer} manager
         * @param {String} inputEvent
         * @param {Object} inputData
         */
        handler: function TMEhandler(manager, inputEvent, inputData) {
            var isTouch = inputData.pointerType == INPUT_TYPE_TOUCH,
                isMouse = inputData.pointerType == INPUT_TYPE_MOUSE;

            if (isMouse && inputData.sourceCapabilities && inputData.sourceCapabilities.firesTouchEvents) {
                return;
            }

            // when we're in a touch event, record touches to  de-dupe synthetic mouse event
            if (isTouch) {
                recordTouches.call(this, inputEvent, inputData);
            } else if (isMouse && isSyntheticEvent.call(this, inputData)) {
                return;
            }

            this.callback(manager, inputEvent, inputData);
        },

        /**
         * remove the event listeners
         */
        destroy: function destroy() {
            this.touch.destroy();
            this.mouse.destroy();
        }
    });

    function recordTouches(eventType, eventData) {
        if (eventType & INPUT_START) {
            this.primaryTouch = eventData.changedPointers[0].identifier;
            setLastTouch.call(this, eventData);
        } else if (eventType & (INPUT_END | INPUT_CANCEL)) {
            setLastTouch.call(this, eventData);
        }
    }

    function setLastTouch(eventData) {
        var touch = eventData.changedPointers[0];

        if (touch.identifier === this.primaryTouch) {
            var lastTouch = { x: touch.clientX, y: touch.clientY };
            this.lastTouches.push(lastTouch);
            var lts = this.lastTouches;
            var removeLastTouch = function removeLastTouch() {
                var i = lts.indexOf(lastTouch);
                if (i > -1) {
                    lts.splice(i, 1);
                }
            };
            setTimeout(removeLastTouch, DEDUP_TIMEOUT);
        }
    }

    function isSyntheticEvent(eventData) {
        var x = eventData.srcEvent.clientX,
            y = eventData.srcEvent.clientY;
        for (var i = 0; i < this.lastTouches.length; i++) {
            var t = this.lastTouches[i];
            var dx = Math.abs(x - t.x),
                dy = Math.abs(y - t.y);
            if (dx <= DEDUP_DISTANCE && dy <= DEDUP_DISTANCE) {
                return true;
            }
        }
        return false;
    }

    var PREFIXED_TOUCH_ACTION = prefixed(TEST_ELEMENT.style, 'touchAction');
    var NATIVE_TOUCH_ACTION = PREFIXED_TOUCH_ACTION !== undefined;

    // magical touchAction value
    var TOUCH_ACTION_COMPUTE = 'compute';
    var TOUCH_ACTION_AUTO = 'auto';
    var TOUCH_ACTION_MANIPULATION = 'manipulation'; // not implemented
    var TOUCH_ACTION_NONE = 'none';
    var TOUCH_ACTION_PAN_X = 'pan-x';
    var TOUCH_ACTION_PAN_Y = 'pan-y';
    var TOUCH_ACTION_MAP = getTouchActionProps();

    /**
     * Touch Action
     * sets the touchAction property or uses the js alternative
     * @param {Manager} manager
     * @param {String} value
     * @constructor
     */
    function TouchAction(manager, value) {
        this.manager = manager;
        this.set(value);
    }

    TouchAction.prototype = {
        /**
         * set the touchAction value on the element or enable the polyfill
         * @param {String} value
         */
        set: function set(value) {
            // find out the touch-action by the event handlers
            if (value == TOUCH_ACTION_COMPUTE) {
                value = this.compute();
            }

            if (NATIVE_TOUCH_ACTION && this.manager.element.style && TOUCH_ACTION_MAP[value]) {
                this.manager.element.style[PREFIXED_TOUCH_ACTION] = value;
            }
            this.actions = value.toLowerCase().trim();
        },

        /**
         * just re-set the touchAction value
         */
        update: function update() {
            this.set(this.manager.options.touchAction);
        },

        /**
         * compute the value for the touchAction property based on the recognizer's settings
         * @returns {String} value
         */
        compute: function compute() {
            var actions = [];
            each(this.manager.recognizers, function (recognizer) {
                if (boolOrFn(recognizer.options.enable, [recognizer])) {
                    actions = actions.concat(recognizer.getTouchAction());
                }
            });
            return cleanTouchActions(actions.join(' '));
        },

        /**
         * this method is called on each input cycle and provides the preventing of the browser behavior
         * @param {Object} input
         */
        preventDefaults: function preventDefaults(input) {
            var srcEvent = input.srcEvent;
            var direction = input.offsetDirection;

            // if the touch action did prevented once this session
            if (this.manager.session.prevented) {
                srcEvent.preventDefault();
                return;
            }

            var actions = this.actions;
            var hasNone = inStr(actions, TOUCH_ACTION_NONE) && !TOUCH_ACTION_MAP[TOUCH_ACTION_NONE];
            var hasPanY = inStr(actions, TOUCH_ACTION_PAN_Y) && !TOUCH_ACTION_MAP[TOUCH_ACTION_PAN_Y];
            var hasPanX = inStr(actions, TOUCH_ACTION_PAN_X) && !TOUCH_ACTION_MAP[TOUCH_ACTION_PAN_X];

            if (hasNone) {
                //do not prevent defaults if this is a tap gesture

                var isTapPointer = input.pointers.length === 1;
                var isTapMovement = input.distance < 2;
                var isTapTouchTime = input.deltaTime < 250;

                if (isTapPointer && isTapMovement && isTapTouchTime) {
                    return;
                }
            }

            if (hasPanX && hasPanY) {
                // `pan-x pan-y` means browser handles all scrolling/panning, do not prevent
                return;
            }

            if (hasNone || hasPanY && direction & DIRECTION_HORIZONTAL || hasPanX && direction & DIRECTION_VERTICAL) {
                return this.preventSrc(srcEvent);
            }
        },

        /**
         * call preventDefault to prevent the browser's default behavior (scrolling in most cases)
         * @param {Object} srcEvent
         */
        preventSrc: function preventSrc(srcEvent) {
            this.manager.session.prevented = true;
            srcEvent.preventDefault();
        }
    };

    /**
     * when the touchActions are collected they are not a valid value, so we need to clean things up. *
     * @param {String} actions
     * @returns {*}
     */
    function cleanTouchActions(actions) {
        // none
        if (inStr(actions, TOUCH_ACTION_NONE)) {
            return TOUCH_ACTION_NONE;
        }

        var hasPanX = inStr(actions, TOUCH_ACTION_PAN_X);
        var hasPanY = inStr(actions, TOUCH_ACTION_PAN_Y);

        // if both pan-x and pan-y are set (different recognizers
        // for different directions, e.g. horizontal pan but vertical swipe?)
        // we need none (as otherwise with pan-x pan-y combined none of these
        // recognizers will work, since the browser would handle all panning
        if (hasPanX && hasPanY) {
            return TOUCH_ACTION_NONE;
        }

        // pan-x OR pan-y
        if (hasPanX || hasPanY) {
            return hasPanX ? TOUCH_ACTION_PAN_X : TOUCH_ACTION_PAN_Y;
        }

        // manipulation
        if (inStr(actions, TOUCH_ACTION_MANIPULATION)) {
            return TOUCH_ACTION_MANIPULATION;
        }

        return TOUCH_ACTION_AUTO;
    }

    function getTouchActionProps() {
        if (!NATIVE_TOUCH_ACTION) {
            return false;
        }
        var touchMap = {};
        var cssSupports = $_GLOBAL$1.CSS && window.CSS.supports;
        ['auto', 'manipulation', 'pan-y', 'pan-x', 'pan-x pan-y', 'none'].forEach(function (val) {

            // If css.supports is not supported but there is native touch-action assume it supports
            // all values. This is the case for IE 10 and 11.
            touchMap[val] = cssSupports ? window.CSS.supports('touch-action', val) : true;
        });
        return touchMap;
    }

    var STATE_POSSIBLE = 1;
    var STATE_BEGAN = 2;
    var STATE_CHANGED = 4;
    var STATE_ENDED = 8;
    var STATE_RECOGNIZED = STATE_ENDED;
    var STATE_CANCELLED = 16;
    var STATE_FAILED = 32;

    /**
     * Recognizer
     * Every recognizer needs to extend from this class.
     * @constructor
     * @param {Object} options
     */
    function Recognizer(options) {
        this.options = assign({}, this.defaults, options || {});

        this.id = uniqueId();

        this.manager = null;

        // default is enable true
        this.options.enable = ifUndefined(this.options.enable, true);

        this.state = STATE_POSSIBLE;

        this.simultaneous = {};
        this.requireFail = [];
    }

    Recognizer.prototype = {
        /**
         * @virtual
         * @type {Object}
         */
        defaults: {},

        /**
         * set options
         * @param {Object} options
         * @return {Recognizer}
         */
        set: function set(options) {
            assign(this.options, options);

            // also update the touchAction, in case something changed about the directions/enabled state
            this.manager && this.manager.touchAction.update();
            return this;
        },

        /**
         * recognize simultaneous with an other recognizer.
         * @param {Recognizer} otherRecognizer
         * @returns {Recognizer} this
         */
        recognizeWith: function recognizeWith(otherRecognizer) {
            if (invokeArrayArg(otherRecognizer, 'recognizeWith', this)) {
                return this;
            }

            var simultaneous = this.simultaneous;
            otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
            if (!simultaneous[otherRecognizer.id]) {
                simultaneous[otherRecognizer.id] = otherRecognizer;
                otherRecognizer.recognizeWith(this);
            }
            return this;
        },

        /**
         * drop the simultaneous link. it doesnt remove the link on the other recognizer.
         * @param {Recognizer} otherRecognizer
         * @returns {Recognizer} this
         */
        dropRecognizeWith: function dropRecognizeWith(otherRecognizer) {
            if (invokeArrayArg(otherRecognizer, 'dropRecognizeWith', this)) {
                return this;
            }

            otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
            delete this.simultaneous[otherRecognizer.id];
            return this;
        },

        /**
         * recognizer can only run when an other is failing
         * @param {Recognizer} otherRecognizer
         * @returns {Recognizer} this
         */
        requireFailure: function requireFailure(otherRecognizer) {
            if (invokeArrayArg(otherRecognizer, 'requireFailure', this)) {
                return this;
            }

            var requireFail = this.requireFail;
            otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
            if (inArray(requireFail, otherRecognizer) === -1) {
                requireFail.push(otherRecognizer);
                otherRecognizer.requireFailure(this);
            }
            return this;
        },

        /**
         * drop the requireFailure link. it does not remove the link on the other recognizer.
         * @param {Recognizer} otherRecognizer
         * @returns {Recognizer} this
         */
        dropRequireFailure: function dropRequireFailure(otherRecognizer) {
            if (invokeArrayArg(otherRecognizer, 'dropRequireFailure', this)) {
                return this;
            }

            otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
            var index = inArray(this.requireFail, otherRecognizer);
            if (index > -1) {
                this.requireFail.splice(index, 1);
            }
            return this;
        },

        /**
         * has require failures boolean
         * @returns {boolean}
         */
        hasRequireFailures: function hasRequireFailures() {
            return this.requireFail.length > 0;
        },

        /**
         * if the recognizer can recognize simultaneous with an other recognizer
         * @param {Recognizer} otherRecognizer
         * @returns {Boolean}
         */
        canRecognizeWith: function canRecognizeWith(otherRecognizer) {
            return !!this.simultaneous[otherRecognizer.id];
        },

        /**
         * You should use `tryEmit` instead of `emit` directly to check
         * that all the needed recognizers has failed before emitting.
         * @param {Object} input
         */
        emit: function emit(input) {
            var self = this;
            var state = this.state;

            function emit(event) {
                self.manager.emit(event, input);
            }

            // 'panstart' and 'panmove'
            if (state < STATE_ENDED) {
                emit(self.options.event + stateStr(state));
            }

            emit(self.options.event); // simple 'eventName' events

            if (input.additionalEvent) {
                // additional event(panleft, panright, pinchin, pinchout...)
                emit(input.additionalEvent);
            }

            // panend and pancancel
            if (state >= STATE_ENDED) {
                emit(self.options.event + stateStr(state));
            }
        },

        /**
         * Check that all the require failure recognizers has failed,
         * if true, it emits a gesture event,
         * otherwise, setup the state to FAILED.
         * @param {Object} input
         */
        tryEmit: function tryEmit(input) {
            if (this.canEmit()) {
                return this.emit(input);
            }
            // it's failing anyway
            this.state = STATE_FAILED;
        },

        /**
         * can we emit?
         * @returns {boolean}
         */
        canEmit: function canEmit() {
            var i = 0;
            while (i < this.requireFail.length) {
                if (!(this.requireFail[i].state & (STATE_FAILED | STATE_POSSIBLE))) {
                    return false;
                }
                i++;
            }
            return true;
        },

        /**
         * update the recognizer
         * @param {Object} inputData
         */
        recognize: function recognize(inputData) {
            // make a new copy of the inputData
            // so we can change the inputData without messing up the other recognizers
            var inputDataClone = assign({}, inputData);

            // is is enabled and allow recognizing?
            if (!boolOrFn(this.options.enable, [this, inputDataClone])) {
                this.reset();
                this.state = STATE_FAILED;
                return;
            }

            // reset when we've reached the end
            if (this.state & (STATE_RECOGNIZED | STATE_CANCELLED | STATE_FAILED)) {
                this.state = STATE_POSSIBLE;
            }

            this.state = this.process(inputDataClone);

            // the recognizer has recognized a gesture
            // so trigger an event
            if (this.state & (STATE_BEGAN | STATE_CHANGED | STATE_ENDED | STATE_CANCELLED)) {
                this.tryEmit(inputDataClone);
            }
        },

        /**
         * return the state of the recognizer
         * the actual recognizing happens in this method
         * @virtual
         * @param {Object} inputData
         * @returns {Const} STATE
         */
        process: function process(inputData) {}, // jshint ignore:line

        /**
         * return the preferred touch-action
         * @virtual
         * @returns {Array}
         */
        getTouchAction: function getTouchAction() {},

        /**
         * called when the gesture isn't allowed to recognize
         * like when another is being recognized or it is disabled
         * @virtual
         */
        reset: function reset() {}
    };

    /**
     * get a usable string, used as event postfix
     * @param {Const} state
     * @returns {String} state
     */
    function stateStr(state) {
        if (state & STATE_CANCELLED) {
            return 'cancel';
        } else if (state & STATE_ENDED) {
            return 'end';
        } else if (state & STATE_CHANGED) {
            return 'move';
        } else if (state & STATE_BEGAN) {
            return 'start';
        }
        return '';
    }

    /**
     * direction cons to string
     * @param {Const} direction
     * @returns {String}
     */
    function directionStr(direction) {
        if (direction == DIRECTION_DOWN) {
            return 'down';
        } else if (direction == DIRECTION_UP) {
            return 'up';
        } else if (direction == DIRECTION_LEFT) {
            return 'left';
        } else if (direction == DIRECTION_RIGHT) {
            return 'right';
        }
        return '';
    }

    /**
     * get a recognizer by name if it is bound to a manager
     * @param {Recognizer|String} otherRecognizer
     * @param {Recognizer} recognizer
     * @returns {Recognizer}
     */
    function getRecognizerByNameIfManager(otherRecognizer, recognizer) {
        var manager = recognizer.manager;
        if (manager) {
            return manager.get(otherRecognizer);
        }
        return otherRecognizer;
    }

    function AttrRecognizer() {
        Recognizer.apply(this, arguments);
    }

    inherit(AttrRecognizer, Recognizer, {
        /**
         * @namespace
         * @memberof AttrRecognizer
         */
        defaults: {
            /**
             * @type {Number}
             * @default 1
             */
            pointers: 1
        },

        /**
         * Used to check if it the recognizer receives valid input, like input.distance > 10.
         * @memberof AttrRecognizer
         * @param {Object} input
         * @returns {Boolean} recognized
         */
        attrTest: function attrTest(input) {
            var optionPointers = this.options.pointers;
            return optionPointers === 0 || input.pointers.length === optionPointers;
        },

        /**
         * Process the input and return the state for the recognizer
         * @memberof AttrRecognizer
         * @param {Object} input
         * @returns {*} State
         */
        process: function process(input) {
            var state = this.state;
            var eventType = input.eventType;

            var isRecognized = state & (STATE_BEGAN | STATE_CHANGED);
            var isValid = this.attrTest(input);

            // on cancel input and we've recognized before, return STATE_CANCELLED
            if (isRecognized && (eventType & INPUT_CANCEL || !isValid)) {
                return state | STATE_CANCELLED;
            } else if (isRecognized || isValid) {
                if (eventType & INPUT_END) {
                    return state | STATE_ENDED;
                } else if (!(state & STATE_BEGAN)) {
                    return STATE_BEGAN;
                }
                return state | STATE_CHANGED;
            }
            return STATE_FAILED;
        }
    });

    function PanRecognizer() {
        AttrRecognizer.apply(this, arguments);

        this.pX = null;
        this.pY = null;
    }

    inherit(PanRecognizer, AttrRecognizer, {
        /**
         * @namespace
         * @memberof PanRecognizer
         */
        defaults: {
            event: 'pan',
            threshold: 10,
            pointers: 1,
            direction: DIRECTION_ALL
        },

        getTouchAction: function getTouchAction() {
            var direction = this.options.direction;
            var actions = [];
            if (direction & DIRECTION_HORIZONTAL) {
                actions.push(TOUCH_ACTION_PAN_Y);
            }
            if (direction & DIRECTION_VERTICAL) {
                actions.push(TOUCH_ACTION_PAN_X);
            }
            return actions;
        },

        directionTest: function directionTest(input) {
            var options = this.options;
            var hasMoved = true;
            var distance = input.distance;
            var direction = input.direction;
            var x = input.deltaX;
            var y = input.deltaY;

            // lock to axis?
            if (!(direction & options.direction)) {
                if (options.direction & DIRECTION_HORIZONTAL) {
                    direction = x === 0 ? DIRECTION_NONE : x < 0 ? DIRECTION_LEFT : DIRECTION_RIGHT;
                    hasMoved = x != this.pX;
                    distance = Math.abs(input.deltaX);
                } else {
                    direction = y === 0 ? DIRECTION_NONE : y < 0 ? DIRECTION_UP : DIRECTION_DOWN;
                    hasMoved = y != this.pY;
                    distance = Math.abs(input.deltaY);
                }
            }
            input.direction = direction;
            return hasMoved && distance > options.threshold && direction & options.direction;
        },

        attrTest: function attrTest(input) {
            return AttrRecognizer.prototype.attrTest.call(this, input) && (this.state & STATE_BEGAN || !(this.state & STATE_BEGAN) && this.directionTest(input));
        },

        emit: function emit(input) {

            this.pX = input.deltaX;
            this.pY = input.deltaY;

            var direction = directionStr(input.direction);

            if (direction) {
                input.additionalEvent = this.options.event + direction;
            }
            this._super.emit.call(this, input);
        }
    });

    function PinchRecognizer() {
        AttrRecognizer.apply(this, arguments);
    }

    inherit(PinchRecognizer, AttrRecognizer, {
        /**
         * @namespace
         * @memberof PinchRecognizer
         */
        defaults: {
            event: 'pinch',
            threshold: 0,
            pointers: 2
        },

        getTouchAction: function getTouchAction() {
            return [TOUCH_ACTION_NONE];
        },

        attrTest: function attrTest(input) {
            return this._super.attrTest.call(this, input) && (Math.abs(input.scale - 1) > this.options.threshold || this.state & STATE_BEGAN);
        },

        emit: function emit(input) {
            if (input.scale !== 1) {
                var inOut = input.scale < 1 ? 'in' : 'out';
                input.additionalEvent = this.options.event + inOut;
            }
            this._super.emit.call(this, input);
        }
    });

    function PressRecognizer() {
        Recognizer.apply(this, arguments);

        this._timer = null;
        this._input = null;
    }

    inherit(PressRecognizer, Recognizer, {
        /**
         * @namespace
         * @memberof PressRecognizer
         */
        defaults: {
            event: 'press',
            pointers: 1,
            time: 251, // minimal time of the pointer to be pressed
            threshold: 9 // a minimal movement is ok, but keep it low
        },

        getTouchAction: function getTouchAction() {
            return [TOUCH_ACTION_AUTO];
        },

        process: function process(input) {
            var options = this.options;
            var validPointers = input.pointers.length === options.pointers;
            var validMovement = input.distance < options.threshold;
            var validTime = input.deltaTime > options.time;

            this._input = input;

            // we only allow little movement
            // and we've reached an end event, so a tap is possible
            if (!validMovement || !validPointers || input.eventType & (INPUT_END | INPUT_CANCEL) && !validTime) {
                this.reset();
            } else if (input.eventType & INPUT_START) {
                this.reset();
                this._timer = setTimeoutContext(function () {
                    this.state = STATE_RECOGNIZED;
                    this.tryEmit();
                }, options.time, this);
            } else if (input.eventType & INPUT_END) {
                return STATE_RECOGNIZED;
            }
            return STATE_FAILED;
        },

        reset: function reset() {
            clearTimeout(this._timer);
        },

        emit: function emit(input) {
            if (this.state !== STATE_RECOGNIZED) {
                return;
            }

            if (input && input.eventType & INPUT_END) {
                this.manager.emit(this.options.event + 'up', input);
            } else {
                this._input.timeStamp = now();
                this.manager.emit(this.options.event, this._input);
            }
        }
    });

    function RotateRecognizer() {
        AttrRecognizer.apply(this, arguments);
    }

    inherit(RotateRecognizer, AttrRecognizer, {
        /**
         * @namespace
         * @memberof RotateRecognizer
         */
        defaults: {
            event: 'rotate',
            threshold: 0,
            pointers: 2
        },

        getTouchAction: function getTouchAction() {
            return [TOUCH_ACTION_NONE];
        },

        attrTest: function attrTest(input) {
            return this._super.attrTest.call(this, input) && (Math.abs(input.rotation) > this.options.threshold || this.state & STATE_BEGAN);
        }
    });

    function SwipeRecognizer() {
        AttrRecognizer.apply(this, arguments);
    }

    inherit(SwipeRecognizer, AttrRecognizer, {
        /**
         * @namespace
         * @memberof SwipeRecognizer
         */
        defaults: {
            event: 'swipe',
            threshold: 10,
            velocity: 0.3,
            direction: DIRECTION_HORIZONTAL | DIRECTION_VERTICAL,
            pointers: 1
        },

        getTouchAction: function getTouchAction() {
            return PanRecognizer.prototype.getTouchAction.call(this);
        },

        attrTest: function attrTest(input) {
            var direction = this.options.direction;
            var velocity;

            if (direction & (DIRECTION_HORIZONTAL | DIRECTION_VERTICAL)) {
                velocity = input.overallVelocity;
            } else if (direction & DIRECTION_HORIZONTAL) {
                velocity = input.overallVelocityX;
            } else if (direction & DIRECTION_VERTICAL) {
                velocity = input.overallVelocityY;
            }

            return this._super.attrTest.call(this, input) && direction & input.offsetDirection && input.distance > this.options.threshold && input.maxPointers == this.options.pointers && abs(velocity) > this.options.velocity && input.eventType & INPUT_END;
        },

        emit: function emit(input) {
            var direction = directionStr(input.offsetDirection);
            if (direction) {
                this.manager.emit(this.options.event + direction, input);
            }

            this.manager.emit(this.options.event, input);
        }
    });

    function TapRecognizer() {
        Recognizer.apply(this, arguments);

        // previous time and center,
        // used for tap counting
        this.pTime = false;
        this.pCenter = false;

        this._timer = null;
        this._input = null;
        this.count = 0;
    }

    inherit(TapRecognizer, Recognizer, {
        /**
         * @namespace
         * @memberof PinchRecognizer
         */
        defaults: {
            event: 'tap',
            pointers: 1,
            taps: 1,
            interval: 300, // max time between the multi-tap taps
            time: 250, // max time of the pointer to be down (like finger on the screen)
            threshold: 9, // a minimal movement is ok, but keep it low
            posThreshold: 10 // a multi-tap can be a bit off the initial position
        },

        getTouchAction: function getTouchAction() {
            return [TOUCH_ACTION_MANIPULATION];
        },

        process: function process(input) {
            var options = this.options;

            var validPointers = input.pointers.length === options.pointers;
            var validMovement = input.distance < options.threshold;
            var validTouchTime = input.deltaTime < options.time;

            this.reset();

            if (input.eventType & INPUT_START && this.count === 0) {
                return this.failTimeout();
            }

            // we only allow little movement
            // and we've reached an end event, so a tap is possible
            if (validMovement && validTouchTime && validPointers) {
                if (input.eventType != INPUT_END) {
                    return this.failTimeout();
                }

                var validInterval = this.pTime ? input.timeStamp - this.pTime < options.interval : true;
                var validMultiTap = !this.pCenter || getDistance(this.pCenter, input.center) < options.posThreshold;

                this.pTime = input.timeStamp;
                this.pCenter = input.center;

                if (!validMultiTap || !validInterval) {
                    this.count = 1;
                } else {
                    this.count += 1;
                }

                this._input = input;

                // if tap count matches we have recognized it,
                // else it has began recognizing...
                var tapCount = this.count % options.taps;
                if (tapCount === 0) {
                    // no failing requirements, immediately trigger the tap event
                    // or wait as long as the multitap interval to trigger
                    if (!this.hasRequireFailures()) {
                        return STATE_RECOGNIZED;
                    } else {
                        this._timer = setTimeoutContext(function () {
                            this.state = STATE_RECOGNIZED;
                            this.tryEmit();
                        }, options.interval, this);
                        return STATE_BEGAN;
                    }
                }
            }
            return STATE_FAILED;
        },

        failTimeout: function failTimeout() {
            this._timer = setTimeoutContext(function () {
                this.state = STATE_FAILED;
            }, this.options.interval, this);
            return STATE_FAILED;
        },

        reset: function reset() {
            clearTimeout(this._timer);
        },

        emit: function emit() {
            if (this.state == STATE_RECOGNIZED) {
                this._input.tapCount = this.count;
                this.manager.emit(this.options.event, this._input);
            }
        }
    });

    function Hammer(element, options) {
        options = options || {};
        options.recognizers = ifUndefined(options.recognizers, Hammer.defaults.preset);
        return new Manager(element, options);
    }

    /**
     * @const {string}
     */
    Hammer.VERSION = '{{PKG_VERSION}}';

    /**
     * default settings
     * @namespace
     */
    Hammer.defaults = {
        /**
         * set if DOM events are being triggered.
         * But this is slower and unused by simple implementations, so disabled by default.
         * @type {Boolean}
         * @default false
         */
        domEvents: false,

        /**
         * The value for the touchAction property/fallback.
         * When set to `compute` it will magically set the correct value based on the added recognizers.
         * @type {String}
         * @default compute
         */
        touchAction: TOUCH_ACTION_COMPUTE,

        /**
         * @type {Boolean}
         * @default true
         */
        enable: true,

        /**
         * EXPERIMENTAL FEATURE -- can be removed/changed
         * Change the parent input target element.
         * If Null, then it is being set the to main element.
         * @type {Null|EventTarget}
         * @default null
         */
        inputTarget: null,

        /**
         * force an input class
         * @type {Null|Function}
         * @default null
         */
        inputClass: null,

        /**
         * Default recognizer setup when calling `Hammer()`
         * When creating a new Manager these will be skipped.
         * @type {Array}
         */
        preset: [
        // RecognizerClass, options, [recognizeWith, ...], [requireFailure, ...]
        [RotateRecognizer, { enable: false }], [PinchRecognizer, { enable: false }, ['rotate']], [SwipeRecognizer, { direction: DIRECTION_HORIZONTAL }], [PanRecognizer, { direction: DIRECTION_HORIZONTAL }, ['swipe']], [TapRecognizer], [TapRecognizer, { event: 'doubletap', taps: 2 }, ['tap']], [PressRecognizer]],

        /**
         * Some CSS properties can be used to improve the working of Hammer.
         * Add them to this method and they will be set when creating a new Manager.
         * @namespace
         */
        cssProps: {
            /**
             * Disables text selection to improve the dragging gesture. Mainly for desktop browsers.
             * @type {String}
             * @default 'none'
             */
            userSelect: 'none',

            /**
             * Disable the Windows Phone grippers when pressing an element.
             * @type {String}
             * @default 'none'
             */
            touchSelect: 'none',

            /**
             * Disables the default callout shown when you touch and hold a touch target.
             * On iOS, when you touch and hold a touch target such as a link, Safari displays
             * a callout containing information about the link. This property allows you to disable that callout.
             * @type {String}
             * @default 'none'
             */
            touchCallout: 'none',

            /**
             * Specifies whether zooming is enabled. Used by IE10>
             * @type {String}
             * @default 'none'
             */
            contentZooming: 'none',

            /**
             * Specifies that an entire element should be draggable instead of its contents. Mainly for desktop browsers.
             * @type {String}
             * @default 'none'
             */
            userDrag: 'none',

            /**
             * Overrides the highlight color shown when the user taps a link or a JavaScript
             * clickable element in iOS. This property obeys the alpha value, if specified.
             * @type {String}
             * @default 'rgba(0,0,0,0)'
             */
            tapHighlightColor: 'rgba(0,0,0,0)'
        }
    };

    var STOP = 1;
    var FORCED_STOP = 2;

    /**
     * Manager
     * @param {HTMLElement} element
     * @param {Object} [options]
     * @constructor
     */
    function Manager(element, options) {
        this.options = assign({}, Hammer.defaults, options || {});

        this.options.inputTarget = this.options.inputTarget || element;

        this.handlers = {};
        this.session = {};
        this.recognizers = [];
        this.oldCssProps = {};

        this.element = element;
        this.input = createInputInstance(this);
        this.touchAction = new TouchAction(this, this.options.touchAction);

        toggleCssProps(this, true);

        each(this.options.recognizers, function (item) {
            var recognizer = this.add(new item[0](item[1]));
            item[2] && recognizer.recognizeWith(item[2]);
            item[3] && recognizer.requireFailure(item[3]);
        }, this);
    }

    Manager.prototype = {
        /**
         * set options
         * @param {Object} options
         * @returns {Manager}
         */
        set: function set(options) {
            assign(this.options, options);

            // Options that need a little more setup
            if (options.touchAction) {
                this.touchAction.update();
            }
            if (options.inputTarget) {
                // Clean up existing event listeners and reinitialize
                this.input.destroy();
                this.input.target = options.inputTarget;
                this.input.init();
            }
            return this;
        },

        /**
         * stop recognizing for this session.
         * This session will be discarded, when a new [input]start event is fired.
         * When forced, the recognizer cycle is stopped immediately.
         * @param {Boolean} [force]
         */
        stop: function stop(force) {
            this.session.stopped = force ? FORCED_STOP : STOP;
        },

        /**
         * run the recognizers!
         * called by the inputHandler function on every movement of the pointers (touches)
         * it walks through all the recognizers and tries to detect the gesture that is being made
         * @param {Object} inputData
         */
        recognize: function recognize(inputData) {
            var session = this.session;
            if (session.stopped) {
                return;
            }

            // run the touch-action polyfill
            this.touchAction.preventDefaults(inputData);

            var recognizer;
            var recognizers = this.recognizers;

            // this holds the recognizer that is being recognized.
            // so the recognizer's state needs to be BEGAN, CHANGED, ENDED or RECOGNIZED
            // if no recognizer is detecting a thing, it is set to `null`
            var curRecognizer = session.curRecognizer;

            // reset when the last recognizer is recognized
            // or when we're in a new session
            if (!curRecognizer || curRecognizer && curRecognizer.state & STATE_RECOGNIZED) {
                curRecognizer = session.curRecognizer = null;
            }

            var i = 0;
            while (i < recognizers.length) {
                recognizer = recognizers[i];

                // find out if we are allowed try to recognize the input for this one.
                // 1.   allow if the session is NOT forced stopped (see the .stop() method)
                // 2.   allow if we still haven't recognized a gesture in this session, or the this recognizer is the one
                //      that is being recognized.
                // 3.   allow if the recognizer is allowed to run simultaneous with the current recognized recognizer.
                //      this can be setup with the `recognizeWith()` method on the recognizer.
                if (session.stopped !== FORCED_STOP && ( // 1
                !curRecognizer || recognizer == curRecognizer || // 2
                recognizer.canRecognizeWith(curRecognizer))) {
                    // 3
                    recognizer.recognize(inputData);
                } else {
                    recognizer.reset();
                }

                // if the recognizer has been recognizing the input as a valid gesture, we want to store this one as the
                // current active recognizer. but only if we don't already have an active recognizer
                if (!curRecognizer && recognizer.state & (STATE_BEGAN | STATE_CHANGED | STATE_ENDED)) {
                    curRecognizer = session.curRecognizer = recognizer;
                }
                i++;
            }
        },

        /**
         * get a recognizer by its event name.
         * @param {Recognizer|String} recognizer
         * @returns {Recognizer|Null}
         */
        get: function get(recognizer) {
            if (recognizer instanceof Recognizer) {
                return recognizer;
            }

            var recognizers = this.recognizers;
            for (var i = 0; i < recognizers.length; i++) {
                if (recognizers[i].options.event == recognizer) {
                    return recognizers[i];
                }
            }
            return null;
        },

        /**
         * add a recognizer to the manager
         * existing recognizers with the same event name will be removed
         * @param {Recognizer} recognizer
         * @returns {Recognizer|Manager}
         */
        add: function add(recognizer) {
            if (invokeArrayArg(recognizer, 'add', this)) {
                return this;
            }

            // remove existing
            var existing = this.get(recognizer.options.event);
            if (existing) {
                this.remove(existing);
            }

            this.recognizers.push(recognizer);
            recognizer.manager = this;

            this.touchAction.update();
            return recognizer;
        },

        /**
         * remove a recognizer by name or instance
         * @param {Recognizer|String} recognizer
         * @returns {Manager}
         */
        remove: function remove(recognizer) {
            if (invokeArrayArg(recognizer, 'remove', this)) {
                return this;
            }

            recognizer = this.get(recognizer);

            // let's make sure this recognizer exists
            if (recognizer) {
                var recognizers = this.recognizers;
                var index = inArray(recognizers, recognizer);

                if (index !== -1) {
                    recognizers.splice(index, 1);
                    this.touchAction.update();
                }
            }

            return this;
        },

        /**
         * bind event
         * @param {String} events
         * @param {Function} handler
         * @returns {EventEmitter} this
         */
        on: function on(events, handler) {
            if (events === undefined) {
                return;
            }
            if (handler === undefined) {
                return;
            }

            var handlers = this.handlers;
            each(splitStr(events), function (event) {
                handlers[event] = handlers[event] || [];
                handlers[event].push(handler);
            });
            return this;
        },

        /**
         * unbind event, leave emit blank to remove all handlers
         * @param {String} events
         * @param {Function} [handler]
         * @returns {EventEmitter} this
         */
        off: function off(events, handler) {
            if (events === undefined) {
                return;
            }

            var handlers = this.handlers;
            each(splitStr(events), function (event) {
                if (!handler) {
                    delete handlers[event];
                } else {
                    handlers[event] && handlers[event].splice(inArray(handlers[event], handler), 1);
                }
            });
            return this;
        },

        /**
         * emit event to the listeners
         * @param {String} event
         * @param {Object} data
         */
        emit: function emit(event, data) {
            // we also want to trigger dom events
            if (this.options.domEvents) {
                triggerDomEvent(event, data);
            }

            // no handlers, so skip it all
            var handlers = this.handlers[event] && this.handlers[event].slice();
            if (!handlers || !handlers.length) {
                return;
            }

            data.type = event;
            data.preventDefault = function () {
                data.srcEvent.preventDefault();
            };

            var i = 0;
            while (i < handlers.length) {
                handlers[i](data);
                i++;
            }
        },

        /**
         * destroy the manager and unbinds all events
         * it doesn't unbind dom events, that is the user own responsibility
         */
        destroy: function destroy() {
            this.element && toggleCssProps(this, false);

            this.handlers = {};
            this.session = {};
            this.input.destroy();
            this.element = null;
        }
    };

    /**
     * add/remove the css properties as defined in manager.options.cssProps
     * @param {Manager} manager
     * @param {Boolean} add
     */
    function toggleCssProps(manager, add) {
        var element = manager.element;
        if (!element.style) {
            return;
        }
        var prop;
        each(manager.options.cssProps, function (value, name) {
            prop = prefixed(element.style, name);
            if (add) {
                manager.oldCssProps[prop] = element.style[prop];
                element.style[prop] = value;
            } else {
                element.style[prop] = manager.oldCssProps[prop] || '';
            }
        });
        if (!add) {
            manager.oldCssProps = {};
        }
    }

    /**
     * trigger dom event
     * @param {String} event
     * @param {Object} data
     */
    function triggerDomEvent(event, data) {
        var gestureEvent = document$1.createEvent('Event');
        gestureEvent.initEvent(event, true, true);
        gestureEvent.gesture = data;
        data.target.dispatchEvent(gestureEvent);
    }

    assign(Hammer, {
        INPUT_START: INPUT_START,
        INPUT_MOVE: INPUT_MOVE,
        INPUT_END: INPUT_END,
        INPUT_CANCEL: INPUT_CANCEL,

        STATE_POSSIBLE: STATE_POSSIBLE,
        STATE_BEGAN: STATE_BEGAN,
        STATE_CHANGED: STATE_CHANGED,
        STATE_ENDED: STATE_ENDED,
        STATE_RECOGNIZED: STATE_RECOGNIZED,
        STATE_CANCELLED: STATE_CANCELLED,
        STATE_FAILED: STATE_FAILED,

        DIRECTION_NONE: DIRECTION_NONE,
        DIRECTION_LEFT: DIRECTION_LEFT,
        DIRECTION_RIGHT: DIRECTION_RIGHT,
        DIRECTION_UP: DIRECTION_UP,
        DIRECTION_DOWN: DIRECTION_DOWN,
        DIRECTION_HORIZONTAL: DIRECTION_HORIZONTAL,
        DIRECTION_VERTICAL: DIRECTION_VERTICAL,
        DIRECTION_ALL: DIRECTION_ALL,

        Manager: Manager,
        Input: Input,
        TouchAction: TouchAction,

        TouchInput: TouchInput,
        MouseInput: MouseInput,
        PointerEventInput: PointerEventInput,
        TouchMouseInput: TouchMouseInput,
        SingleTouchInput: SingleTouchInput,

        Recognizer: Recognizer,
        AttrRecognizer: AttrRecognizer,
        Tap: TapRecognizer,
        Pan: PanRecognizer,
        Swipe: SwipeRecognizer,
        Pinch: PinchRecognizer,
        Rotate: RotateRecognizer,
        Press: PressRecognizer,

        on: addEventListeners,
        off: removeEventListeners,
        each: each,
        merge: merge,
        extend: extend,
        assign: assign,
        inherit: inherit,
        bindFn: bindFn,
        prefixed: prefixed
    });

    var $_GLOBAL=typeof $_GLOBAL!=='undefined'?$_GLOBAL:typeof global!=='undefined'?global:Function('return this')();var Materialize={};
    function hammerify(el,options){var $el=$(el);if(!$el.data("hammer")){$el.data("hammer",new Hammer($el[0],options));}}$.fn.hammer=function(options){return this.each(function(){hammerify(this,options);});}; // extend the emit method to also trigger jQuery events
    Hammer.Manager.prototype.emit=function(originalEmit){return function(type,data){originalEmit.call(this,type,data);$(this.element).trigger({type:type,gesture:data});};}(Hammer.Manager.prototype.emit);$.fn.material_select=function(callback){ // Make option as selected and scroll to selected position
    var activateOption=function activateOption(collection,newOption){collection.find('li.active').removeClass('active');$(newOption).addClass('active');collection.scrollTo(newOption);};$(this).each(function(){var $select=$(this);if($select.hasClass('browser-default')){return; // Continue to next (return false breaks out of entire loop)
    } // Tear down structure if Select needs to be rebuilt
    var lastID=$select.data('select-id');if(lastID){$select.parent().find('span.caret').remove();$select.parent().find('input').remove();$select.unwrap();$('ul#select-options-'+lastID).remove();} // If destroying the select, remove the selelct-id and reset it to it's uninitialized state.
    if(callback==='destroy'){$select.data('select-id',null).removeClass('initialized');return;}var uniqueID=Materialize.guid();$select.data('select-id',uniqueID);var wrapper=$('<div class="select-wrapper"></div>');wrapper.addClass($select.attr('class'));var options=$('<ul id="select-options-'+uniqueID+'" class="dropdown-content select-dropdown"></ul>');var selectOptions=$select.children('option');var label;if($select.find('option:selected')!==undefined){label=$select.find('option:selected');}else {label=selectOptions.first();} // Create Dropdown structure
    selectOptions.each(function(){ // Add disabled attr if disabled
    options.append($('<li class="'+($(this).is(':disabled')?'disabled':'')+'"><span>'+$(this).html()+'</span></li>'));});options.find('li').each(function(i){var $curr_select=$select;$(this).click(function(){ // Check if option element is disabled
    if(!$(this).hasClass('disabled')){$curr_select.find('option').eq(i).prop('selected',true); // Trigger onchange() event
    $curr_select.trigger('change');$curr_select.siblings('input.select-dropdown').val($(this).text());if(typeof callback!=='undefined'){callback();}}});}); // Wrap Elements
    $select.wrap(wrapper); // Add Select Display Element
    var dropdownIcon=$('<span class="caret">&#9660;</span>');if($select.is(':disabled')){dropdownIcon.addClass('disabled');} // escape double quotes
    var sanitizedLabelHtml=label.html().replace(/"/g,'&quot;');var $newSelect=$('<input type="text" class="select-dropdown" readonly="true" '+($select.is(':disabled')?'disabled':'')+' data-activates="select-options-'+uniqueID+'" value="'+sanitizedLabelHtml+'"/>');$select.before($newSelect);$newSelect.before(dropdownIcon);$('body').append(options); // Check if section element is disabled
    if(!$select.is(':disabled')){$newSelect.dropdown({"hover":false});} // Copy tabindex
    if($select.attr('tabindex')){$($newSelect[0]).attr('tabindex',$select.attr('tabindex'));}$select.addClass('initialized');$newSelect.on('focus',function(){$(this).trigger('open');label=$(this).val();var selectedOption=options.find('li').filter(function(){return $(this).text().toLowerCase()===label.toLowerCase();})[0];activateOption(options,selectedOption);});$newSelect.on('blur',function(){$(this).trigger('close');}); // Allow user to search by typing
    // this array is cleared after 1 second
    var filterQuery=[];var onKeyDown=function onKeyDown(event){var newOption,activeOption; // TAB - switch to another input
    if(event.which===9){$newSelect.trigger('close');return;} // ARROW DOWN WHEN SELECT IS CLOSED - open select options
    if(event.which===40&&!options.is(":visible")){$newSelect.trigger('open');return;} // ENTER WHEN SELECT IS CLOSED - submit form
    if(event.which===13&&!options.is(":visible")){return;}event.preventDefault(); // CASE WHEN USER TYPE LETTERS
    var letter=String.fromCharCode(event.which).toLowerCase();var nonLetters=[9,13,27,38,40];if(letter&&nonLetters.indexOf(event.which)===-1){filterQuery.push(letter);var string=filterQuery.join("");newOption=options.find('li').filter(function(){return $(this).text().toLowerCase().indexOf(string)===0;})[0];if(newOption){activateOption(options,newOption);}} // ENTER - select option and close when select options are opened
    if(event.which===13){activeOption=options.find('li.active:not(.disabled)')[0];if(activeOption){$(activeOption).trigger('click');$newSelect.trigger('close');}} // ARROW DOWN - move to next not disabled option
    if(event.which===40){newOption=options.find('li.active').next('li:not(.disabled)')[0];if(newOption){activateOption(options,newOption);}} // ESC - close options
    if(event.which===27){$newSelect.trigger('close');} // ARROW UP - move to previous not disabled option
    if(event.which===38){newOption=options.find('li.active').prev('li:not(.disabled)')[0];if(newOption){activateOption(options,newOption);}} // Automaticaly clean filter query so user can search again by starting letters
    setTimeout(function(){filterQuery=[];},1000);};$newSelect.on('keydown',onKeyDown);});}; // Source: src/helpers/collapsible.js
    $.fn.collapsible=function(options){var defaults={accordion:undefined};options=$.extend(defaults,options);return this.each(function(){var $this=$(this);var $panel_headers=$(this).find('> li > .collapsible-header');var collapsible_type=$this.data("collapsible"); // Turn off any existing event handlers
    $this.off('click.collapse','> li > .collapsible-header');$panel_headers.off('click.collapse'); /****************
          Helper Functions
          ****************/ // Accordion Open
    function accordionOpen(object){$panel_headers=$this.find('> li > .collapsible-header');if(object.hasClass('active')){object.parent().addClass('active');object.siblings('.collapsible-body').velocity('slideDown',function(){$(this).css('height','');}).trigger('shown');}else {object.parent().removeClass('active');object.siblings('.collapsible-body').velocity('slideUp').trigger('hidden');}$panel_headers.not(object).removeClass('active').parent().removeClass('active');$panel_headers.not(object).parent().children('.collapsible-body').velocity('slideUp').trigger('hidden');} // Expandable Open
    function expandableOpen(object){if(object.hasClass('active')){object.parent().addClass('active');object.siblings('.collapsible-body').velocity('slideDown',function(){$(this).css('height','');}).trigger('shown');}else {object.parent().removeClass('active');object.siblings('.collapsible-body').velocity('slideUp').trigger('hidden');}} /**
           * Get panel header from a children element
           * @param  {Object} object Jquery object
           * @return {Object} panel header object
           */function getPanelHeader(object){return object.closest('li > .collapsible-header');} /**
           * Check if object is children of panel header
           * @param  {Object}  object Jquery object
           * @return {Boolean} true if it is children
           */function isChildrenOfPanelHeader(object){var panelHeader=getPanelHeader(object);return panelHeader.length>0;} /*****  End Helper Functions  *****/ // Add click handler to only direct collapsible header children
    $this.on('click.collapse','> li > .collapsible-header',function(e){var $header=$(this),element=$(e.target);if(isChildrenOfPanelHeader(element)){element=getPanelHeader(element);}element.toggleClass('active');if(options.accordion||collapsible_type==="accordion"||collapsible_type===undefined){ // Handle Accordion
    accordionOpen(element);}else { // Handle Expandables
    expandableOpen(element);if($header.hasClass('active')){expandableOpen($header);}}});if(options.accordion||collapsible_type==="accordion"||collapsible_type===undefined){ // Handle Accordion
    accordionOpen($panel_headers.filter('.active').first());}else { // Handle Expandables
    $panel_headers.filter('.active').each(function(){expandableOpen($(this));});}});};$(document).ready(function(){$('.collapsible').collapsible();}); // Source: src/helpers/dropdown.js
    // Add posibility to scroll to selected option
    // usefull for select for example
    $.fn.scrollTo=function(elem){$(this).scrollTop($(this).scrollTop()-$(this).offset().top+$(elem).offset().top);return this;};$.fn.dropdown=function(option){var defaults={inDuration:300,outDuration:225,constrain_width:true, // Constrains width of dropdown to the activator
    hover:false,gutter:0, // Spacing from edge
    belowOrigin:false,alignment:'left'};this.each(function(){var origin=$(this);var options=$.extend({},defaults,option);var isFocused=false; // Dropdown menu
    var activates=$("#"+origin.attr('data-activates'));function updateOptions(){if(origin.data('induration')!==undefined){options.inDuration=origin.data('inDuration');}if(origin.data('outduration')!==undefined){options.outDuration=origin.data('outDuration');}if(origin.data('constrainwidth')!==undefined){options.constrain_width=origin.data('constrainwidth');}if(origin.data('hover')!==undefined){options.hover=origin.data('hover');}if(origin.data('gutter')!==undefined){options.gutter=origin.data('gutter');}if(origin.data('beloworigin')!==undefined){options.belowOrigin=origin.data('beloworigin');}if(origin.data('alignment')!==undefined){options.alignment=origin.data('alignment');}}updateOptions(); // Attach dropdown to its activator
    origin.after(activates); /*
            Helper function to position and resize dropdown.
            Used in hover and click handler.
          */function placeDropdown(eventType){ // Check for simultaneous focus and click events.
    if(eventType==='focus'){isFocused=true;} // Check html data attributes
    updateOptions(); // Set Dropdown state
    activates.addClass('active');origin.addClass('active'); // Constrain width
    if(options.constrain_width===true){activates.css('width',origin.outerWidth());}else {activates.css('white-space','nowrap');} // Offscreen detection
    var $_GLOBALHeight=$_GLOBAL.innerHeight;var originHeight=origin.innerHeight();var offsetLeft=origin.offset().left;var offsetTop=origin.offset().top-$($_GLOBAL).scrollTop();var currAlignment=options.alignment;var gutterSpacing=0;var leftPosition=0; // Below Origin
    var verticalOffset=0;if(options.belowOrigin===true){verticalOffset=originHeight;} // Check for scrolling positioned container.
    var scrollOffset=0;var wrapper=origin.parent();if(!wrapper.is('body')&&wrapper[0].scrollHeight>wrapper[0].clientHeight){scrollOffset=wrapper[0].scrollTop;}if(offsetLeft+activates.innerWidth()>$($_GLOBAL).width()){ // Dropdown goes past screen on right, force right alignment
    currAlignment='right';}else if(offsetLeft-activates.innerWidth()+origin.innerWidth()<0){ // Dropdown goes past screen on left, force left alignment
    currAlignment='left';} // Vertical bottom offscreen detection
    if(offsetTop+activates.innerHeight()>$_GLOBALHeight){ // If going upwards still goes offscreen, just crop height of dropdown.
    if(offsetTop+originHeight-activates.innerHeight()<0){var adjustedHeight=$_GLOBALHeight-offsetTop-verticalOffset;activates.css('max-height',adjustedHeight);}else { // Flow upwards.
    if(!verticalOffset){verticalOffset+=originHeight;}verticalOffset-=activates.innerHeight();}} // Handle edge alignment
    if(currAlignment==='left'){gutterSpacing=options.gutter;leftPosition=origin.position().left+gutterSpacing;}else if(currAlignment==='right'){var offsetRight=origin.position().left+origin.outerWidth()-activates.outerWidth();gutterSpacing=-options.gutter;leftPosition=offsetRight+gutterSpacing;} // Position dropdown
    activates.css({position:'absolute',top:origin.position().top+verticalOffset+scrollOffset,left:leftPosition}); // Show dropdown
    activates.stop(true,true).css('opacity',0).velocity('slideDown').velocity({opacity:1},{queue:false,duration:options.inDuration,easing:'easeOutSine'});}function hideDropdown(){ // Check for simultaneous focus and click events.
    isFocused=false;activates.fadeOut(options.outDuration);activates.removeClass('active');origin.removeClass('active');setTimeout(function(){activates.css('max-height','');},options.outDuration);} // Hover
    if(options.hover){var open=false;origin.off('click.'+origin.attr('id')); // Hover handler to show dropdown
    origin.on('mouseenter',function(e){ // Mouse over
    if(open===false){placeDropdown();open=true;}});origin.on('mouseleave',function(e){ // If hover on origin then to something other than dropdown content, then close
    var toEl=e.toElement||e.relatedTarget; // added browser compatibility for target element
    if(!$(toEl).closest('.dropdown-content').is(activates)){activates.stop(true,true);hideDropdown();open=false;}});activates.on('mouseleave',function(e){ // Mouse out
    var toEl=e.toElement||e.relatedTarget;if(!$(toEl).closest('.dropdown-button').is(origin)){activates.stop(true,true);hideDropdown();open=false;}}); // Click
    }else { // Click handler to show dropdown
    origin.off('click.'+origin.attr('id'));origin.on('click.'+origin.attr('id'),function(e){if(!isFocused){if(origin[0]===e.currentTarget&&!origin.hasClass('active')&&$(e.target).closest('.dropdown-content').length===0){e.preventDefault(); // Prevents button click from moving $_GLOBAL
    placeDropdown('click');}else if(origin.hasClass('active')){ // If origin is clicked and menu is open, close menu
    hideDropdown();$(document).off('click.'+activates.attr('id')+' touchstart.'+activates.attr('id'));} // If menu open, add click close handler to document
    if(activates.hasClass('active')){$(document).on('click.'+activates.attr('id')+' touchstart.'+activates.attr('id'),function(e){if(!activates.is(e.target)&&!origin.is(e.target)&&!origin.find(e.target).length){hideDropdown();$(document).off('click.'+activates.attr('id')+' touchstart.'+activates.attr('id'));}});}}});} // End else
    // Listen to open and close event - useful for select component
    origin.on('open',function(e,eventType){placeDropdown(eventType);});origin.on('close',hideDropdown);});}; // End dropdown plugin
    $(document).ready(function(){$('.dropdown-button').dropdown();}); // Source: node_modules/materialize-css/js/leanModal.js
    var _stack=0;
    var _lastID=0;
    var _generateID=function _generateID(){_lastID++;return 'materialize-lean-overlay-'+_lastID;};
    $.fn.extend({openModal:function openModal(options){var $body=$('body');var oldWidth=$body.innerWidth();$body.css('overflow','hidden');$body.width(oldWidth);var defaults={opacity:0.5,in_duration:350,out_duration:250,ready:undefined,complete:undefined,dismissible:true,starting_top:'4%'},$modal=$(this);if($modal.hasClass('open')){return;}overlayID=_generateID();$overlay=$('<div class="lean-overlay"></div>');lStack=++_stack; // Store a reference of the overlay
    $overlay.attr('id',overlayID).css('z-index',1000+lStack*2);$modal.data('overlay-id',overlayID).css('z-index',1000+lStack*2+1);$modal.addClass('open');$("body").append($overlay); // Override defaults
    options=$.extend(defaults,options);if(options.dismissible){$overlay.click(function(){$modal.closeModal(options);}); // Return on ESC
    $(document).on('keyup.leanModal'+overlayID,function(e){if(e.keyCode===27){ // ESC key
    $modal.closeModal(options);}});}$modal.find(".modal-close").on('click.close',function(e){$modal.closeModal(options);});$overlay.css({display:"block",opacity:0});$modal.css({display:"block",opacity:0});$overlay.velocity({opacity:options.opacity},{duration:options.in_duration,queue:false,ease:"easeOutCubic"});$modal.data('associated-overlay',$overlay[0]); // Define Bottom Sheet animation
    if($modal.hasClass('bottom-sheet')){$modal.velocity({bottom:"0",opacity:1},{duration:options.in_duration,queue:false,ease:"easeOutCubic", // Handle modal ready callback
    complete:function complete(){if(typeof options.ready==="function"){options.ready();}}});}else {$.Velocity.hook($modal,"scaleX",0.7);$modal.css({top:options.starting_top});$modal.velocity({top:"10%",opacity:1,scaleX:'1'},{duration:options.in_duration,queue:false,ease:"easeOutCubic", // Handle modal ready callback
    complete:function complete(){if(typeof options.ready==="function"){options.ready();}}});}}});$.fn.extend({closeModal:function closeModal(options){var defaults={out_duration:250,complete:undefined},$modal=$(this),overlayID=$modal.data('overlay-id'),$overlay=$('#'+overlayID);$modal.removeClass('open');options=$.extend(defaults,options); // Enable scrolling
    $('body').css({overflow:'',width:''});$modal.find('.modal-close').off('click.close');$(document).off('keyup.leanModal'+overlayID);$overlay.velocity({opacity:0},{duration:options.out_duration,queue:false,ease:"easeOutQuart"}); // Define Bottom Sheet animation
    if($modal.hasClass('bottom-sheet')){$modal.velocity({bottom:"-100%",opacity:0},{duration:options.out_duration,queue:false,ease:"easeOutCubic", // Handle modal ready callback
    complete:function complete(){$overlay.css({display:"none"}); // Call complete callback
    if(typeof options.complete==="function"){options.complete();}$overlay.remove();_stack--;}});}else {$modal.velocity({top:options.starting_top,opacity:0,scaleX:0.7},{duration:options.out_duration,complete:function complete(){$(this).css('display','none'); // Call complete callback
    if(typeof options.complete==="function"){options.complete();}$overlay.remove();_stack--;}});}}});$.fn.extend({leanModal:function leanModal(option){return this.each(function(){var defaults={starting_top:'4%'}, // Override defaults
    options=$.extend(defaults,option); // Close Handlers
    $(this).click(function(e){options.starting_top=($(this).offset().top-$($_GLOBAL).scrollTop())/1.15;var modal_id=$(this).attr("href")||'#'+$(this).data('target');$(modal_id).openModal(options);e.preventDefault();}); // done set on click
    }); // done return
    }}); // Source: node_modules/materialize-css/js/materialbox.js
    $.fn.materialbox=function(){return this.each(function(){if($(this).hasClass('initialized')){return;}$(this).addClass('initialized');var overlayActive=false;var doneAnimating=true;var inDuration=275;var outDuration=200;var origin=$(this);var placeholder=$('<div></div>').addClass('material-placeholder');var originalWidth=0;var originalHeight=0;var ancestorsChanged;var ancestor;origin.wrap(placeholder);origin.on('click',function(){var placeholder=origin.parent('.material-placeholder');var $_GLOBALWidth=$_GLOBAL.innerWidth;var $_GLOBALHeight=$_GLOBAL.innerHeight;var originalWidth=origin.width();var originalHeight=origin.height(); // If already modal, return to original
    if(doneAnimating===false){returnToOriginal();return false;}else if(overlayActive&&doneAnimating===true){returnToOriginal();return false;} // Set states
    doneAnimating=false;origin.addClass('active');overlayActive=true; // Set positioning for placeholder
    placeholder.css({width:placeholder[0].getBoundingClientRect().width,height:placeholder[0].getBoundingClientRect().height,position:'relative',top:0,left:0}); // Find ancestor with overflow: hidden; and remove it
    ancestorsChanged=undefined;ancestor=placeholder[0].parentNode;var count=0;while(ancestor!==null&&!$(ancestor).is(document)){var curr=$(ancestor);if(curr.css('overflow')!=='visible'){curr.css('overflow','visible');if(ancestorsChanged===undefined){ancestorsChanged=curr;}else {ancestorsChanged=ancestorsChanged.add(curr);}}ancestor=ancestor.parentNode;} // Set css on origin
    origin.css({position:'absolute','z-index':1000}).data('width',originalWidth).data('height',originalHeight); // Add overlay
    var overlay=$('<div id="materialbox-overlay"></div>').css({opacity:0}).click(function(){if(doneAnimating===true)returnToOriginal();}); // Animate Overlay
    // Put before in origin image to preserve z-index layering.
    origin.before(overlay);overlay.velocity({opacity:1},{duration:inDuration,queue:false,easing:'easeOutQuad'}); // Add and animate caption if it exists
    if(origin.data('caption')!==""){var $photo_caption=$('<div class="materialbox-caption"></div>');$photo_caption.text(origin.data('caption'));$('body').append($photo_caption);$photo_caption.css({"display":"inline"});$photo_caption.velocity({opacity:1},{duration:inDuration,queue:false,easing:'easeOutQuad'});} // Resize Image
    var ratio=0;var widthPercent=originalWidth/$_GLOBALWidth;var heightPercent=originalHeight/$_GLOBALHeight;var newWidth=0;var newHeight=0;if(widthPercent>heightPercent){ratio=originalHeight/originalWidth;newWidth=$_GLOBALWidth*0.9;newHeight=$_GLOBALWidth*0.9*ratio;}else {ratio=originalWidth/originalHeight;newWidth=$_GLOBALHeight*0.9*ratio;newHeight=$_GLOBALHeight*0.9;} // Animate image + set z-index
    if(origin.hasClass('responsive-img')){origin.velocity({'max-width':newWidth,'width':originalWidth},{duration:0,queue:false,complete:function complete(){origin.css({left:0,top:0}).velocity({height:newHeight,width:newWidth,left:$(document).scrollLeft()+$_GLOBALWidth/2-origin.parent('.material-placeholder').offset().left-newWidth/2,top:$(document).scrollTop()+$_GLOBALHeight/2-origin.parent('.material-placeholder').offset().top-newHeight/2},{duration:inDuration,queue:false,easing:'easeOutQuad',complete:function complete(){doneAnimating=true;}});} // End Complete
    }); // End Velocity
    }else {origin.css('left',0).css('top',0).velocity({height:newHeight,width:newWidth,left:$(document).scrollLeft()+$_GLOBALWidth/2-origin.parent('.material-placeholder').offset().left-newWidth/2,top:$(document).scrollTop()+$_GLOBALHeight/2-origin.parent('.material-placeholder').offset().top-newHeight/2},{duration:inDuration,queue:false,easing:'easeOutQuad',complete:function complete(){doneAnimating=true;}}); // End Velocity
    }}); // End origin on click
    // Return on scroll
    $($_GLOBAL).scroll(function(){if(overlayActive){returnToOriginal();}}); // Return on ESC
    $(document).keyup(function(e){if(e.keyCode===27&&doneAnimating===true){ // ESC key
    if(overlayActive){returnToOriginal();}}}); // This function returns the modaled image to the original spot
    function returnToOriginal(){doneAnimating=false;var placeholder=origin.parent('.material-placeholder');var $_GLOBALWidth=$_GLOBAL.innerWidth;var $_GLOBALHeight=$_GLOBAL.innerHeight;var originalWidth=origin.data('width');var originalHeight=origin.data('height');origin.velocity("stop",true);$('#materialbox-overlay').velocity("stop",true);$('.materialbox-caption').velocity("stop",true);$('#materialbox-overlay').velocity({opacity:0},{duration:outDuration, // Delay prevents animation overlapping
    queue:false,easing:'easeOutQuad',complete:function complete(){ // Remove Overlay
    overlayActive=false;$(this).remove();}}); // Resize Image
    origin.velocity({width:originalWidth,height:originalHeight,left:0,top:0},{duration:outDuration,queue:false,easing:'easeOutQuad'}); // Remove Caption + reset css settings on image
    $('.materialbox-caption').velocity({opacity:0},{duration:outDuration, // Delay prevents animation overlapping
    queue:false,easing:'easeOutQuad',complete:function complete(){placeholder.css({height:'',width:'',position:'',top:'',left:''});origin.css({height:'',top:'',left:'',width:'','max-width':'',position:'','z-index':''}); // Remove class
    origin.removeClass('active');doneAnimating=true;$(this).remove(); // Remove overflow overrides on ancestors
    if(ancestorsChanged){ancestorsChanged.css('overflow','');}}});}});};$(document).ready(function(){$('.materialboxed').materialbox();}); // Source: node_modules/materialize-css/js/tooltip.js
    $.fn.tooltip=function(options){var timeout=null,margin=5; // Defaults
    var defaults={delay:350}; // Remove tooltip from the activator
    if(options==="remove"){this.each(function(){$('#'+$(this).attr('data-tooltip-id')).remove();$(this).off('mouseenter.tooltip mouseleave.tooltip');});return false;}options=$.extend(defaults,options);return this.each(function(){var tooltipId=Materialize.guid();var origin=$(this);origin.attr('data-tooltip-id',tooltipId); // Create Text span
    var tooltip_text=$('<span></span>').text(origin.attr('data-tooltip')); // Create tooltip
    var newTooltip=$('<div></div>');newTooltip.addClass('material-tooltip').append(tooltip_text).appendTo($('body')).attr('id',tooltipId);var backdrop=$('<div></div>').addClass('backdrop');backdrop.appendTo(newTooltip);backdrop.css({top:0,left:0}); //Destroy previously binded events
    origin.off('mouseenter.tooltip mouseleave.tooltip'); // Mouse In
    var started=false,timeoutRef;origin.on({'mouseenter.tooltip':function mouseenterTooltip(e){var tooltip_delay=origin.attr('data-delay');tooltip_delay=tooltip_delay===undefined||tooltip_delay===''?options.delay:tooltip_delay;timeoutRef=setTimeout(function(){started=true;newTooltip.velocity('stop');backdrop.velocity('stop');newTooltip.css({display:'block',left:'0px',top:'0px'}); // Set Tooltip text
    newTooltip.children('span').text(origin.attr('data-tooltip')); // Tooltip positioning
    var originWidth=origin.outerWidth();var originHeight=origin.outerHeight();var tooltipPosition=origin.attr('data-position');var tooltipHeight=newTooltip.outerHeight();var tooltipWidth=newTooltip.outerWidth();var tooltipVerticalMovement='0px';var tooltipHorizontalMovement='0px';var scale_factor=8;var targetTop,targetLeft,newCoordinates;if(tooltipPosition==="top"){ // Top Position
    targetTop=origin.offset().top-tooltipHeight-margin;targetLeft=origin.offset().left+originWidth/2-tooltipWidth/2;newCoordinates=repositionWithinScreen(targetLeft,targetTop,tooltipWidth,tooltipHeight);tooltipVerticalMovement='-10px';backdrop.css({borderRadius:'14px 14px 0 0',transformOrigin:'50% 90%',marginTop:tooltipHeight,marginLeft:tooltipWidth/2-backdrop.width()/2});} // Left Position
    else if(tooltipPosition==="left"){targetTop=origin.offset().top+originHeight/2-tooltipHeight/2;targetLeft=origin.offset().left-tooltipWidth-margin;newCoordinates=repositionWithinScreen(targetLeft,targetTop,tooltipWidth,tooltipHeight);tooltipHorizontalMovement='-10px';backdrop.css({width:'14px',height:'14px',borderRadius:'14px 0 0 14px',transformOrigin:'95% 50%',marginTop:tooltipHeight/2,marginLeft:tooltipWidth});} // Right Position
    else if(tooltipPosition==="right"){targetTop=origin.offset().top+originHeight/2-tooltipHeight/2;targetLeft=origin.offset().left+originWidth+margin;newCoordinates=repositionWithinScreen(targetLeft,targetTop,tooltipWidth,tooltipHeight);tooltipHorizontalMovement='+10px';backdrop.css({width:'14px',height:'14px',borderRadius:'0 14px 14px 0',transformOrigin:'5% 50%',marginTop:tooltipHeight/2,marginLeft:'0px'});}else { // Bottom Position
    targetTop=origin.offset().top+origin.outerHeight()+margin;targetLeft=origin.offset().left+originWidth/2-tooltipWidth/2;newCoordinates=repositionWithinScreen(targetLeft,targetTop,tooltipWidth,tooltipHeight);tooltipVerticalMovement='+10px';backdrop.css({marginLeft:tooltipWidth/2-backdrop.width()/2});} // Set tooptip css placement
    newTooltip.css({top:newCoordinates.y,left:newCoordinates.x}); // Calculate Scale to fill
    scale_factor=tooltipWidth/8;if(scale_factor<8){scale_factor=8;}if(tooltipPosition==="right"||tooltipPosition==="left"){scale_factor=tooltipWidth/10;if(scale_factor<6)scale_factor=6;}newTooltip.velocity({marginTop:tooltipVerticalMovement,marginLeft:tooltipHorizontalMovement},{duration:350,queue:false}).velocity({opacity:1},{duration:300,delay:50,queue:false});backdrop.css({display:'block'}).velocity({opacity:1},{duration:55,delay:0,queue:false}).velocity({scale:scale_factor},{duration:300,delay:0,queue:false,easing:'easeInOutQuad'});},tooltip_delay); // End Interval
    // Mouse Out
    },'mouseleave.tooltip':function mouseleaveTooltip(){ // Reset State
    started=false;clearTimeout(timeoutRef); // Animate back
    setTimeout(function(){if(started!=true){newTooltip.velocity({opacity:0,marginTop:0,marginLeft:0},{duration:225,queue:false});backdrop.velocity({opacity:0,scale:1},{duration:225,queue:false,complete:function complete(){backdrop.css('display','none');newTooltip.css('display','none');started=false;}});}},225);}});});};var repositionWithinScreen=function repositionWithinScreen(x,y,width,height){var newX=x;var newY=y;if(newX<0){newX=4;}else if(newX+width>$_GLOBAL.innerWidth){newX-=newX+width-$_GLOBAL.innerWidth;}if(newY<0){newY=4;}else if(newY+height>$_GLOBAL.innerHeight+$($_GLOBAL).scrollTop){newY-=newY+height-$_GLOBAL.innerHeight;}return {x:newX,y:newY};};$(document).ready(function(){$('.tooltipped').tooltip();}); // Source: node_modules/materialize-css/js/sideNav.js
    var sideNavmethods={init:function init(options){var defaults={menuWidth:240,edge:'left',closeOnClick:false};options=$.extend(defaults,options);$(this).each(function(){var $this=$(this);var menu_id=$("#"+$this.attr('data-activates')); // Set to width
    if(options.menuWidth!=240){menu_id.css('width',options.menuWidth);} // Add Touch Area
    var dragTarget=$('<div class="drag-target"></div>');$('body').append(dragTarget);if(options.edge=='left'){menu_id.css('transform','translateX(-100%)');dragTarget.css({'left':0}); // Add Touch Area
    }else {menu_id.addClass('right-aligned') // Change text-alignment to right
    .css('transform','translateX(100%)');dragTarget.css({'right':0}); // Add Touch Area
    } // If fixed sidenav, bring menu out
    if(menu_id.hasClass('fixed')){if($_GLOBAL.innerWidth>992){menu_id.css('transform','translateX(0)');}} // Window resize to reset on large screens fixed
    if(menu_id.hasClass('fixed')){$($_GLOBAL).resize(function(){if($_GLOBAL.innerWidth>992){ // Close menu if $_GLOBAL is resized bigger than 992 and user has fixed sidenav
    if($('#sidenav-overlay').length!=0&&menuOut){removeMenu(true);}else { // menu_id.removeAttr('style');
    menu_id.css('transform','translateX(0%)'); // menu_id.css('width', options.menuWidth);
    }}else if(menuOut===false){if(options.edge==='left'){menu_id.css('transform','translateX(-100%)');}else {menu_id.css('transform','translateX(100%)');}}});} // if closeOnClick, then add close event for all a tags in side sideNav
    if(options.closeOnClick===true){menu_id.on("click.itemclick","a:not(.collapsible-header)",function(){removeMenu();});}function removeMenu(restoreNav){panning=false;menuOut=false; // Reenable scrolling
    $('body').css({overflow:'',width:''});$('#sidenav-overlay').velocity({opacity:0},{duration:200,queue:false,easing:'easeOutQuad',complete:function complete(){$(this).remove();}});if(options.edge==='left'){ // Reset phantom div
    dragTarget.css({width:'',right:'',left:'0'});menu_id.velocity({'translateX':'-100%'},{duration:200,queue:false,easing:'easeOutCubic',complete:function complete(){if(restoreNav===true){ // Restore Fixed sidenav
    menu_id.removeAttr('style');menu_id.css('width',options.menuWidth);}}});}else { // Reset phantom div
    dragTarget.css({width:'',right:'0',left:''});menu_id.velocity({'translateX':'100%'},{duration:200,queue:false,easing:'easeOutCubic',complete:function complete(){if(restoreNav===true){ // Restore Fixed sidenav
    menu_id.removeAttr('style');menu_id.css('width',options.menuWidth);}}});}} // Touch Event
    var panning=false;var menuOut=false;dragTarget.on('click',function(){removeMenu();});dragTarget.hammer({prevent_default:false}).bind('pan',function(e){if(e.gesture.pointerType=="touch"){var direction=e.gesture.direction;var x=e.gesture.center.x;var y=e.gesture.center.y;var velocityX=e.gesture.velocityX; // Disable Scrolling
    var $body=$('body');var oldWidth=$body.innerWidth();$body.css('overflow','hidden');$body.width(oldWidth); // If overlay does not exist, create one and if it is clicked, close menu
    if($('#sidenav-overlay').length===0){var overlay=$('<div id="sidenav-overlay"></div>');overlay.css('opacity',0).click(function(){removeMenu();});$('body').append(overlay);} // Keep within boundaries
    if(options.edge==='left'){if(x>options.menuWidth){x=options.menuWidth;}else if(x<0){x=0;}}if(options.edge==='left'){ // Left Direction
    if(x<options.menuWidth/2){menuOut=false;} // Right Direction
    else if(x>=options.menuWidth/2){menuOut=true;}menu_id.css('transform','translateX('+(x-options.menuWidth)+'px)');}else { // Left Direction
    if(x<$_GLOBAL.innerWidth-options.menuWidth/2){menuOut=true;} // Right Direction
    else if(x>=$_GLOBAL.innerWidth-options.menuWidth/2){menuOut=false;}var rightPos=x-options.menuWidth/2;if(rightPos<0){rightPos=0;}menu_id.css('transform','translateX('+rightPos+'px)');} // Percentage overlay
    var overlayPerc;if(options.edge==='left'){overlayPerc=x/options.menuWidth;$('#sidenav-overlay').velocity({opacity:overlayPerc},{duration:10,queue:false,easing:'easeOutQuad'});}else {overlayPerc=Math.abs((x-$_GLOBAL.innerWidth)/options.menuWidth);$('#sidenav-overlay').velocity({opacity:overlayPerc},{duration:10,queue:false,easing:'easeOutQuad'});}}}).bind('panend',function(e){if(e.gesture.pointerType=="touch"){var velocityX=e.gesture.velocityX;var x=e.gesture.center.x;var leftPos=x-options.menuWidth;var rightPos=x-options.menuWidth/2;if(leftPos>0){leftPos=0;}if(rightPos<0){rightPos=0;}panning=false;if(options.edge==='left'){ // If velocityX <= 0.3 then the user is flinging the menu closed so ignore menuOut
    if(menuOut&&velocityX<=0.3||velocityX<-0.5){if(leftPos!=0){menu_id.velocity({'translateX':[0,leftPos]},{duration:300,queue:false,easing:'easeOutQuad'});} // menu_id.css({'translateX': 0});
    $('#sidenav-overlay').velocity({opacity:1},{duration:50,queue:false,easing:'easeOutQuad'});dragTarget.css({width:'50%',right:0,left:''});}else if(!menuOut||velocityX>0.3){ // Enable Scrolling
    $('body').css({overflow:'',width:''}); // Slide menu closed
    menu_id.velocity({'translateX':[-1*options.menuWidth-10,leftPos]},{duration:200,queue:false,easing:'easeOutQuad'});$('#sidenav-overlay').velocity({opacity:0},{duration:200,queue:false,easing:'easeOutQuad',complete:function complete(){$(this).remove();}});dragTarget.css({width:'10px',right:'',left:0});}}else {if(menuOut&&velocityX>=-0.3||velocityX>0.5){menu_id.velocity({'translateX':[0,rightPos]},{duration:300,queue:false,easing:'easeOutQuad'});$('#sidenav-overlay').velocity({opacity:1},{duration:50,queue:false,easing:'easeOutQuad'});dragTarget.css({width:'50%',right:'',left:0});}else if(!menuOut||velocityX<-0.3){ // Enable Scrolling
    $('body').css({overflow:'',width:''}); // Slide menu closed
    menu_id.velocity({'translateX':[options.menuWidth+10,rightPos]},{duration:200,queue:false,easing:'easeOutQuad'});$('#sidenav-overlay').velocity({opacity:0},{duration:200,queue:false,easing:'easeOutQuad',complete:function complete(){$(this).remove();}});dragTarget.css({width:'10px',right:0,left:''});}}}});$this.click(function(){if(menuOut===true){menuOut=false;panning=false;removeMenu();}else { // Disable Scrolling
    var $body=$('body');var oldWidth=$body.innerWidth();$body.css('overflow','hidden');$body.width(oldWidth); // Push current drag target on top of DOM tree
    $('body').append(dragTarget);if(options.edge==='left'){dragTarget.css({width:'50%',right:0,left:''});menu_id.velocity({'translateX':[0,-1*options.menuWidth]},{duration:300,queue:false,easing:'easeOutQuad'});}else {dragTarget.css({width:'50%',right:'',left:0});menu_id.velocity({'translateX':[0,options.menuWidth]},{duration:300,queue:false,easing:'easeOutQuad'});}var overlay=$('<div id="sidenav-overlay"></div>');overlay.css('opacity',0).click(function(){menuOut=false;panning=false;removeMenu();overlay.velocity({opacity:0},{duration:300,queue:false,easing:'easeOutQuad',complete:function complete(){$(this).remove();}});});$('body').append(overlay);overlay.velocity({opacity:1},{duration:300,queue:false,easing:'easeOutQuad',complete:function complete(){menuOut=true;panning=false;}});}return false;});});},show:function show(){this.trigger('click');},hide:function hide(){$('#sidenav-overlay').trigger('click');}};$.fn.sideNav=function(methodOrOptions){if(sideNavmethods[methodOrOptions]){return sideNavmethods[methodOrOptions].apply(this,Array.prototype.slice.call(arguments,1));}else if(typeof methodOrOptions==='object'||!methodOrOptions){ // Default to "init"
    return sideNavmethods.init.apply(this,arguments);}else {$.error('Method '+methodOrOptions+' does not exist on jQuery.sideNav');}}; // Plugin end
    // Source: node_modules/materialize-css/js/scrollspy.js
    /**
     * Extend jquery with a scrollspy plugin.
     * This watches the $_GLOBAL scroll and fires events when elements are scrolled into viewport.
     *
     * throttle() and getTime() taken from Underscore.js
     * https://github.com/jashkenas/underscore
     *
     * @author Copyright 2013 John Smart
     * @license https://raw.github.com/thesmart/jquery-scrollspy/master/LICENSE
     * @see https://github.com/thesmart
     * @version 0.1.2
     */var jWindow=$($_GLOBAL);var elements=[];var elementsInView=[];var isSpying=false;var ticks=0;/**
    	 * Find elements that are within the boundary
    	 * @param {number} top
    	 * @param {number} right
    	 * @param {number} bottom
    	 * @param {number} left
    	 * @return {jQuery}		A collection of elements
    	 */function findElements(top,right,bottom,left){var hits=$();$.each(elements,function(i,element){if(element.height()>0){var elTop=element.offset().top,elLeft=element.offset().left,elRight=elLeft+element.width(),elBottom=elTop+element.height();var isIntersect=!(elLeft>right||elRight<left||elTop>bottom||elBottom<top);if(isIntersect){hits.push(element);}}});return hits;} /**
    	 * Called when the user scrolls the $_GLOBAL
    	 */function onScroll(){ // unique tick id
    ++ticks; // viewport rectangle
    var top=jWindow.scrollTop(),left=jWindow.scrollLeft(),right=left+jWindow.width(),bottom=top+jWindow.height(); // determine which elements are in view
    //        + 60 accounts for fixed nav
    var intersections=findElements(top+offset.top+200,right+offset.right,bottom+offset.bottom,left+offset.left);$.each(intersections,function(i,element){var lastTick=element.data('scrollSpy:ticks');if(typeof lastTick!='number'){ // entered into view
    element.triggerHandler('scrollSpy:enter');} // update tick id
    element.data('scrollSpy:ticks',ticks);}); // determine which elements are no longer in view
    $.each(elementsInView,function(i,element){var lastTick=element.data('scrollSpy:ticks');if(typeof lastTick=='number'&&lastTick!==ticks){ // exited from view
    element.triggerHandler('scrollSpy:exit');element.data('scrollSpy:ticks',null);}}); // remember elements in view for next tick
    elementsInView=intersections;} /**
    	 * Called when $_GLOBAL is resized
    	*/function onWinSize(){jWindow.trigger('scrollSpy:winSize');} /**
    	 * Get time in ms
       * @license https://raw.github.com/jashkenas/underscore/master/LICENSE
    	 * @type {function}
    	 * @return {number}
    	 */var getTime=Date.now||function(){return new Date().getTime();}; /**
    	 * Returns a function, that, when invoked, will only be triggered at most once
    	 * during a given $_GLOBAL of time. Normally, the throttled function will run
    	 * as much as it can, without ever going more than once per `wait` duration;
    	 * but if you'd like to disable the execution on the leading edge, pass
    	 * `{leading: false}`. To disable execution on the trailing edge, ditto.
    	 * @license https://raw.github.com/jashkenas/underscore/master/LICENSE
    	 * @param {function} func
    	 * @param {number} wait
    	 * @param {Object=} options
    	 * @returns {Function}
    	 */function throttle(func,wait,options){var context,args,result;var timeout=null;var previous=0;options||(options={});var later=function later(){previous=options.leading===false?0:getTime();timeout=null;result=func.apply(context,args);context=args=null;};return function(){var now=getTime();if(!previous&&options.leading===false)previous=now;var remaining=wait-(now-previous);context=this;args=arguments;if(remaining<=0){clearTimeout(timeout);timeout=null;previous=now;result=func.apply(context,args);context=args=null;}else if(!timeout&&options.trailing!==false){timeout=setTimeout(later,remaining);}return result;};}; /**
    	 * Enables ScrollSpy using a selector
    	 * @param {jQuery|string} selector  The elements collection, or a selector
    	 * @param {Object=} options	Optional.
            throttle : number -> scrollspy throttling. Default: 100 ms
            offsetTop : number -> offset from top. Default: 0
            offsetRight : number -> offset from right. Default: 0
            offsetBottom : number -> offset from bottom. Default: 0
            offsetLeft : number -> offset from left. Default: 0
    	 * @returns {jQuery}
    	 */$.scrollSpy=function(selector,options){var visible=[];selector=$(selector);selector.each(function(i,element){elements.push($(element));$(element).data("scrollSpy:id",i); // Smooth scroll to section
    $('a[href="#'+$(element).attr('id')+'"]').click(function(e){e.preventDefault();var offset=$(this.hash).offset().top+1; //          offset - 200 allows elements near bottom of page to scroll
    $('html, body').animate({scrollTop:offset-200},{duration:400,queue:false,easing:'easeOutCubic'});});});options=options||{throttle:100};offset.top=options.offsetTop||0;offset.right=options.offsetRight||0;offset.bottom=options.offsetBottom||0;offset.left=options.offsetLeft||0;var throttledScroll=throttle(onScroll,options.throttle||100);var readyScroll=function readyScroll(){$(document).ready(throttledScroll);};if(!isSpying){jWindow.on('scroll',readyScroll);jWindow.on('resize',readyScroll);isSpying=true;} // perform a scan once, after current execution context, and after dom is ready
    setTimeout(readyScroll,0);selector.on('scrollSpy:enter',function(){visible=$.grep(visible,function(value){return value.height()!=0;});var $this=$(this);if(visible[0]){$('a[href="#'+visible[0].attr('id')+'"]').removeClass('active');if($this.data('scrollSpy:id')<visible[0].data('scrollSpy:id')){visible.unshift($(this));}else {visible.push($(this));}}else {visible.push($(this));}$('a[href="#'+visible[0].attr('id')+'"]').addClass('active');});selector.on('scrollSpy:exit',function(){visible=$.grep(visible,function(value){return value.height()!=0;});if(visible[0]){$('a[href="#'+visible[0].attr('id')+'"]').removeClass('active');var $this=$(this);visible=$.grep(visible,function(value){return value.attr('id')!=$this.attr('id');});if(visible[0]){ // Check if empty
    $('a[href="#'+visible[0].attr('id')+'"]').addClass('active');}}});return selector;}; /**
    	 * Listen for $_GLOBAL resize events
    	 * @param {Object=} options						Optional. Set { throttle: number } to change throttling. Default: 100 ms
    	 * @returns {jQuery}		$($_GLOBAL)
    	 */$.winSizeSpy=function(options){$.winSizeSpy=function(){return jWindow;}; // lock from multiple calls
    options=options||{throttle:100};return jWindow.on('resize',throttle(onWinSize,options.throttle||100));}; /**
    	 * Enables ScrollSpy on a collection of elements
    	 * e.g. $('.scrollSpy').scrollSpy()
    	 * @param {Object=} options	Optional.
    											throttle : number -> scrollspy throttling. Default: 100 ms
    											offsetTop : number -> offset from top. Default: 0
    											offsetRight : number -> offset from right. Default: 0
    											offsetBottom : number -> offset from bottom. Default: 0
    											offsetLeft : number -> offset from left. Default: 0
    	 * @returns {jQuery}
    	 */$.fn.scrollSpy=function(options){return $.scrollSpy($(this),options);}; // Source: node_modules/materialize-css/js/slider.js
    var slidermethods={init:function init(options){var defaults={indicators:true,height:400,transition:500,interval:6000};options=$.extend(defaults,options);return this.each(function(){ // For each slider, we want to keep track of
    // which slide is active and its associated content
    var $this=$(this);var $slider=$this.find('ul.slides').first();var $slides=$slider.find('li');var $active_index=$slider.find('.active').index();var $active,$indicators,$interval;if($active_index!=-1){$active=$slides.eq($active_index);} // Transitions the caption depending on alignment
    function captionTransition(caption,duration){if(caption.hasClass("center-align")){caption.velocity({opacity:0,translateY:-100},{duration:duration,queue:false});}else if(caption.hasClass("right-align")){caption.velocity({opacity:0,translateX:100},{duration:duration,queue:false});}else if(caption.hasClass("left-align")){caption.velocity({opacity:0,translateX:-100},{duration:duration,queue:false});}} // This function will transition the slide to any index of the next slide
    function moveToSlide(index){ // Wrap around indices.
    if(index>=$slides.length)index=0;else if(index<0)index=$slides.length-1;$active_index=$slider.find('.active').index(); // Only do if index changes
    if($active_index!=index){$active=$slides.eq($active_index);$caption=$active.find('.caption');$active.removeClass('active');$active.velocity({opacity:0},{duration:options.transition,queue:false,easing:'easeOutQuad',complete:function complete(){$slides.not('.active').velocity({opacity:0,translateX:0,translateY:0},{duration:0,queue:false});}});captionTransition($caption,options.transition); // Update indicators
    if(options.indicators){$indicators.eq($active_index).removeClass('active');}$slides.eq(index).velocity({opacity:1},{duration:options.transition,queue:false,easing:'easeOutQuad'});$slides.eq(index).find('.caption').velocity({opacity:1,translateX:0,translateY:0},{duration:options.transition,delay:options.transition,queue:false,easing:'easeOutQuad'});$slides.eq(index).addClass('active'); // Update indicators
    if(options.indicators){$indicators.eq(index).addClass('active');}}} // Set height of slider
    // If fullscreen, do nothing
    if(!$this.hasClass('fullscreen')){if(options.indicators){ // Add height if indicators are present
    $this.height(options.height+40);}else {$this.height(options.height);}$slider.height(options.height);} // Set initial positions of captions
    $slides.find('.caption').each(function(){captionTransition($(this),0);}); // Move img src into background-image
    $slides.find('img').each(function(){var placeholderBase64='data:image/gif;base64,R0lGODlhAQABAIABAP///wAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';if($(this).attr('src')!==placeholderBase64){$(this).css('background-image','url('+$(this).attr('src')+')');$(this).attr('src',placeholderBase64);}}); // dynamically add indicators
    if(options.indicators){$indicators=$('<ul class="indicators"></ul>');$slides.each(function(index){var $indicator=$('<li class="indicator-item"></li>'); // Handle clicks on indicators
    $indicator.click(function(){var $parent=$slider.parent();var curr_index=$parent.find($(this)).index();moveToSlide(curr_index); // reset interval
    clearInterval($interval);$interval=setInterval(function(){$active_index=$slider.find('.active').index();if($slides.length==$active_index+1)$active_index=0; // loop to start
    else $active_index+=1;moveToSlide($active_index);},options.transition+options.interval);});$indicators.append($indicator);});$this.append($indicators);$indicators=$this.find('ul.indicators').find('li.indicator-item');}if($active){$active.show();}else {$slides.first().addClass('active').velocity({opacity:1},{duration:options.transition,queue:false,easing:'easeOutQuad'});$active_index=0;$active=$slides.eq($active_index); // Update indicators
    if(options.indicators){$indicators.eq($active_index).addClass('active');}} // Adjust height to current slide
    $active.find('img').each(function(){$active.find('.caption').velocity({opacity:1,translateX:0,translateY:0},{duration:options.transition,queue:false,easing:'easeOutQuad'});}); // auto scroll
    $interval=setInterval(function(){$active_index=$slider.find('.active').index();moveToSlide($active_index+1);},options.transition+options.interval); // HammerJS, Swipe navigation
    // Touch Event
    var panning=false;var swipeLeft=false;var swipeRight=false;$this.hammer({prevent_default:false}).bind('pan',function(e){if(e.gesture.pointerType==="touch"){ // reset interval
    clearInterval($interval);var direction=e.gesture.direction;var x=e.gesture.deltaX;var velocityX=e.gesture.velocityX;$curr_slide=$slider.find('.active');$curr_slide.velocity({translateX:x},{duration:50,queue:false,easing:'easeOutQuad'}); // Swipe Left
    if(direction===4&&(x>$this.innerWidth()/2||velocityX<-0.65)){swipeRight=true;} // Swipe Right
    else if(direction===2&&(x<-1*$this.innerWidth()/2||velocityX>0.65)){swipeLeft=true;} // Make Slide Behind active slide visible
    var next_slide;if(swipeLeft){next_slide=$curr_slide.next();if(next_slide.length===0){next_slide=$slides.first();}next_slide.velocity({opacity:1},{duration:300,queue:false,easing:'easeOutQuad'});}if(swipeRight){next_slide=$curr_slide.prev();if(next_slide.length===0){next_slide=$slides.last();}next_slide.velocity({opacity:1},{duration:300,queue:false,easing:'easeOutQuad'});}}}).bind('panend',function(e){if(e.gesture.pointerType==="touch"){$curr_slide=$slider.find('.active');panning=false;curr_index=$slider.find('.active').index();if(!swipeRight&&!swipeLeft||$slides.length<=1){ // Return to original spot
    $curr_slide.velocity({translateX:0},{duration:300,queue:false,easing:'easeOutQuad'});}else if(swipeLeft){moveToSlide(curr_index+1);$curr_slide.velocity({translateX:-1*$this.innerWidth()},{duration:300,queue:false,easing:'easeOutQuad',complete:function complete(){$curr_slide.velocity({opacity:0,translateX:0},{duration:0,queue:false});}});}else if(swipeRight){moveToSlide(curr_index-1);$curr_slide.velocity({translateX:$this.innerWidth()},{duration:300,queue:false,easing:'easeOutQuad',complete:function complete(){$curr_slide.velocity({opacity:0,translateX:0},{duration:0,queue:false});}});}swipeLeft=false;swipeRight=false; // Restart interval
    clearInterval($interval);$interval=setInterval(function(){$active_index=$slider.find('.active').index();if($slides.length==$active_index+1)$active_index=0; // loop to start
    else $active_index+=1;moveToSlide($active_index);},options.transition+options.interval);}});$this.on('sliderPause',function(){clearInterval($interval);});$this.on('sliderStart',function(){clearInterval($interval);$interval=setInterval(function(){$active_index=$slider.find('.active').index();if($slides.length==$active_index+1)$active_index=0; // loop to start
    else $active_index+=1;moveToSlide($active_index);},options.transition+options.interval);});$this.on('sliderNext',function(){$active_index=$slider.find('.active').index();moveToSlide($active_index+1);});$this.on('sliderPrev',function(){$active_index=$slider.find('.active').index();moveToSlide($active_index-1);});});},pause:function pause(){$(this).trigger('sliderPause');},start:function start(){$(this).trigger('sliderStart');},next:function next(){$(this).trigger('sliderNext');},prev:function prev(){$(this).trigger('sliderPrev');}};$.fn.slider=function(methodOrOptions){if(slidermethods[methodOrOptions]){return slidermethods[methodOrOptions].apply(this,Array.prototype.slice.call(arguments,1));}else if(typeof methodOrOptions==='object'||!methodOrOptions){ // Default to "init"
    return slidermethods.init.apply(this,arguments);}else {$.error('Method '+methodOrOptions+' does not exist on jQuery.tooltip');}}; // Plugin end
    // Source: node_modules/materialize-css/js/cards.js
    $(document).ready(function(){$(document).on('click.card','.card',function(e){if($(this).find('> .card-reveal').length){if($(e.target).is($('.card-reveal .card-title'))||$(e.target).is($('.card-reveal .card-title i'))){ // Make Reveal animate down and display none
    $(this).find('.card-reveal').velocity({translateY:0},{duration:225,queue:false,easing:'easeInOutQuad',complete:function complete(){$(this).css({display:'none'});}});}else if($(e.target).is($('.card .activator'))||$(e.target).is($('.card .activator i'))){$(e.target).closest('.card').css('overflow','hidden');$(this).find('.card-reveal').css({display:'block'}).velocity("stop",false).velocity({translateY:'-100%'},{duration:300,queue:false,easing:'easeInOutQuad'});}}$('.card-reveal').closest('.card').css('overflow','hidden');});}); // Source: node_modules/materialize-css/js/chips.js
    $(document).ready(function(){$(document).on('click.chip','.chip .material-icons',function(e){$(this).parent().remove();});}); // Source: node_modules/materialize-css/js/pushpin.js
    $.fn.pushpin=function(options){var defaults={top:0,bottom:Infinity,offset:0};options=$.extend(defaults,options);$index=0;return this.each(function(){var $uniqueId=Materialize.guid(),$this=$(this),$original_offset=$(this).offset().top;function removePinClasses(object){object.removeClass('pin-top');object.removeClass('pinned');object.removeClass('pin-bottom');}function updateElements(objects,scrolled){objects.each(function(){ // Add position fixed (because its between top and bottom)
    if(options.top<=scrolled&&options.bottom>=scrolled&&!$(this).hasClass('pinned')){removePinClasses($(this));$(this).css('top',options.offset);$(this).addClass('pinned');} // Add pin-top (when scrolled position is above top)
    if(scrolled<options.top&&!$(this).hasClass('pin-top')){removePinClasses($(this));$(this).css('top',0);$(this).addClass('pin-top');} // Add pin-bottom (when scrolled position is below bottom)
    if(scrolled>options.bottom&&!$(this).hasClass('pin-bottom')){removePinClasses($(this));$(this).addClass('pin-bottom');$(this).css('top',options.bottom-$original_offset);}});}updateElements($this,$($_GLOBAL).scrollTop());$($_GLOBAL).on('scroll.'+$uniqueId,function(){var $scrolled=$($_GLOBAL).scrollTop()+options.offset;updateElements($this,$scrolled);});});}; // Source: node_modules/materialize-css/js/buttons.js
    $(document).ready(function(){ // jQuery reverse
    $.fn.reverse=[].reverse; // Hover behaviour: make sure this doesn't work on .click-to-toggle FABs!
    $(document).on('mouseenter.fixedActionBtn','.fixed-action-btn:not(.click-to-toggle)',function(e){var $this=$(this);openFABMenu($this);});$(document).on('mouseleave.fixedActionBtn','.fixed-action-btn:not(.click-to-toggle)',function(e){var $this=$(this);closeFABMenu($this);}); // Toggle-on-click behaviour.
    $(document).on('click.fixedActionBtn','.fixed-action-btn.click-to-toggle > a',function(e){var $this=$(this);var $menu=$this.parent();if($menu.hasClass('active')){closeFABMenu($menu);}else {openFABMenu($menu);}});});$.fn.extend({openFAB:function openFAB(){openFABMenu($(this));},closeFAB:function closeFAB(){closeFABMenu($(this));}});var openFABMenu=function openFABMenu(btn){$this=btn;if($this.hasClass('active')===false){ // Get direction option
    var horizontal=$this.hasClass('horizontal');var offsetY,offsetX;if(horizontal===true){offsetX=40;}else {offsetY=40;}$this.addClass('active');$this.find('ul .btn-floating').velocity({scaleY:".4",scaleX:".4",translateY:offsetY+'px',translateX:offsetX+'px'},{duration:0});var time=0;$this.find('ul .btn-floating').reverse().each(function(){$(this).velocity({opacity:"1",scaleX:"1",scaleY:"1",translateY:"0",translateX:'0'},{duration:80,delay:time});time+=40;});}};var closeFABMenu=function closeFABMenu(btn){$this=btn; // Get direction option
    var horizontal=$this.hasClass('horizontal');var offsetY,offsetX;if(horizontal===true){offsetX=40;}else {offsetY=40;}$this.removeClass('active');var time=0;$this.find('ul .btn-floating').velocity("stop",true);$this.find('ul .btn-floating').velocity({opacity:"0",scaleX:".4",scaleY:".4",translateY:offsetY+'px',translateX:offsetX+'px'},{duration:80});}; // Source: node_modules/materialize-css/js/transitions.js
    // Image transition function
    Materialize.fadeInImage=function(selector){var element=$(selector);element.css({opacity:0});$(element).velocity({opacity:1},{duration:650,queue:false,easing:'easeOutSine'});$(element).velocity({opacity:1},{duration:1300,queue:false,easing:'swing',step:function step(now,fx){fx.start=100;var grayscale_setting=now/100;var brightness_setting=150-(100-now)/1.75;if(brightness_setting<100){brightness_setting=100;}if(now>=0){$(this).css({"-webkit-filter":"grayscale("+grayscale_setting+")"+"brightness("+brightness_setting+"%)","filter":"grayscale("+grayscale_setting+")"+"brightness("+brightness_setting+"%)"});}}});}; // Horizontal staggered list
    Materialize.showStaggeredList=function(selector){var time=0;$(selector).find('li').velocity({translateX:"-100px"},{duration:0});$(selector).find('li').each(function(){$(this).velocity({opacity:"1",translateX:"0"},{duration:800,delay:time,easing:[60,10]});time+=120;});};$(document).ready(function(){ // Hardcoded .staggered-list scrollFire
    // var staggeredListOptions = [];
    // $('ul.staggered-list').each(function (i) {
    //   var label = 'scrollFire-' + i;
    //   $(this).addClass(label);
    //   staggeredListOptions.push(
    //     {selector: 'ul.staggered-list.' + label,
    //      offset: 200,
    //      callback: 'showStaggeredList("ul.staggered-list.' + label + '")'});
    // });
    // scrollFire(staggeredListOptions);
    // HammerJS, Swipe navigation
    // Touch Event
    var swipeLeft=false;var swipeRight=false; // Dismissible Collections
    $('.dismissable').each(function(){$(this).hammer({prevent_default:false}).bind('pan',function(e){if(e.gesture.pointerType==="touch"){var $this=$(this);var direction=e.gesture.direction;var x=e.gesture.deltaX;var velocityX=e.gesture.velocityX;$this.velocity({translateX:x},{duration:50,queue:false,easing:'easeOutQuad'}); // Swipe Left
    if(direction===4&&(x>$this.innerWidth()/2||velocityX<-0.75)){swipeLeft=true;} // Swipe Right
    if(direction===2&&(x<-1*$this.innerWidth()/2||velocityX>0.75)){swipeRight=true;}}}).bind('panend',function(e){ // Reset if collection is moved back into original position
    if(Math.abs(e.gesture.deltaX)<$(this).innerWidth()/2){swipeRight=false;swipeLeft=false;}if(e.gesture.pointerType==="touch"){var $this=$(this);if(swipeLeft||swipeRight){var fullWidth;if(swipeLeft){fullWidth=$this.innerWidth();}else {fullWidth=-1*$this.innerWidth();}$this.velocity({translateX:fullWidth},{duration:100,queue:false,easing:'easeOutQuad',complete:function complete(){$this.css('border','none');$this.velocity({height:0,padding:0},{duration:200,queue:false,easing:'easeOutQuad',complete:function complete(){$this.remove();}});}});}else {$this.velocity({translateX:0},{duration:100,queue:false,easing:'easeOutQuad'});}swipeLeft=false;swipeRight=false;}});}); // time = 0
    // // Vertical Staggered list
    // $('ul.staggered-list.vertical li').velocity(
    //     { translateY: "100px"},
    //     { duration: 0 });
    // $('ul.staggered-list.vertical li').each(function() {
    //   $(this).velocity(
    //     { opacity: "1", translateY: "0"},
    //     { duration: 800, delay: time, easing: [60, 25] });
    //   time += 120;
    // });
    // // Fade in and Scale
    // $('.fade-in.scale').velocity(
    //     { scaleX: .4, scaleY: .4, translateX: -600},
    //     { duration: 0});
    // $('.fade-in').each(function() {
    //   $(this).velocity(
    //     { opacity: "1", scaleX: 1, scaleY: 1, translateX: 0},
    //     { duration: 800, easing: [60, 10] });
    // });
    }); var guidfn=function guidfn(){function s4(){return Math.floor((1+Math.random())*0x10000).toString(16).substring(1);}return function(){return s4()+s4()+'-'+s4()+'-'+s4()+'-'+s4()+'-'+s4()+s4()+s4();};};
    var validate_field=function validate_field(object){var hasLength=object.attr('length')!==undefined;var lenAttr=parseInt(object.attr('length'),10);var len=object.val().length;if(object.val().length===0&&object[0].validity.badInput===false){if(object.hasClass('validate')){object.removeClass('valid');object.removeClass('invalid');}}else if(object.hasClass('validate')){ // Check for character counter attributes
    if(object.is(':valid')&&hasLength&&len<=lenAttr||object.is(':valid')&&!hasLength){object.removeClass('invalid');object.addClass('valid');}else {object.removeClass('valid');object.addClass('invalid');}}};
    // Unique ID
    Materialize.guid=guidfn();Materialize.elementOrParentIsFixed=function(element){var $element=$(element);var $checkElements=$element.add($element.parents());var isFixed=false;$checkElements.each(function(){if($(this).css("position")==="fixed"){isFixed=true;return false;}});return isFixed;}; // Text based inputs
    Materialize.input_selector=['input[type=text]','input[type=password]','input[type=email]','input[type=url]','input[type=tel]','input[type=number]','input[type=search]','textarea'].join(','); // Function to update labels of text fields
    Materialize.updateTextFields=function(){$(Materialize.input_selector).each(function(index,element){if($(element).val().length>0||$(this).attr('placeholder')!==undefined||$(element)[0].validity.badInput===true){$(this).siblings('label').addClass('active');}else {$(this).siblings('label, i').removeClass('active');}});};$(document).ready(function(){ // Add active if form auto complete
    $(document).on('change',Materialize.input_selector,function(){if($(this).val().length!==0||$(this).attr('placeholder')!==undefined){$(this).siblings('label').addClass('active');}validate_field($(this));}); // Add active when element has focus
    $(document).on('focus',Materialize.input_selector,function(){$(this).siblings('label, i').addClass('active');});$(document).on('blur',Materialize.input_selector,function(){var $inputElement=$(this);if($inputElement.val().length===0&&$inputElement[0].validity.badInput!==true&&$inputElement.attr('placeholder')===undefined){$inputElement.siblings('label, i').removeClass('active');}if($inputElement.val().length===0&&$inputElement[0].validity.badInput!==true&&$inputElement.attr('placeholder')!==undefined){$inputElement.siblings('i').removeClass('active');}validate_field($inputElement);});Materialize.updateTextFields(); // HTML DOM FORM RESET handling
    $(document).on('reset',function(e){var formReset=$(e.target);if(formReset.is('form')){formReset.find(Materialize.input_selector).removeClass('valid').removeClass('invalid');formReset.find(Materialize.input_selector).each(function(){if($(this).attr('value')===''){$(this).siblings('label, i').removeClass('active');}}); // Reset select
    formReset.find('select.initialized').each(function(){var reset_text=formReset.find('option[selected]').text();formReset.siblings('input.select-dropdown').val(reset_text);});}});});var Waves=Waves||{};
    var document=$_GLOBAL.document;
    var $$=document.querySelectorAll.bind(document);
    // Find exact position of element
    function isWindow(obj){return obj!==null&&obj===obj.$_GLOBAL;}function getWindow(elem){return isWindow(elem)?elem:elem.nodeType===9&&elem.defaultView;}function offset(elem){var docElem,win,box={top:0,left:0},doc=elem&&elem.ownerDocument;docElem=doc.documentElement;if(typeof elem.getBoundingClientRect!==typeof undefined){box=elem.getBoundingClientRect();}win=getWindow(doc);return {top:box.top+win.pageYOffset-docElem.clientTop,left:box.left+win.pageXOffset-docElem.clientLeft};}function convertStyle(obj){var style='';for(var a in obj){if(obj.hasOwnProperty(a)){style+=a+':'+obj[a]+';';}}return style;}var Effect={ // Effect delay
    duration:750,show:function show(e,element){ // Disable right click
    if(e.button===2){return false;}var el=element||this; // Create ripple
    var ripple=document.createElement('div');ripple.className='waves-ripple';el.appendChild(ripple); // Get click coordinate and element witdh
    var pos=offset(el);var relativeY=e.pageY-pos.top;var relativeX=e.pageX-pos.left;var scale='scale('+el.clientWidth/100*10+')'; // Support for touch devices
    if('touches' in e){relativeY=e.touches[0].pageY-pos.top;relativeX=e.touches[0].pageX-pos.left;} // Attach data to element
    ripple.setAttribute('data-hold',Date.now());ripple.setAttribute('data-scale',scale);ripple.setAttribute('data-x',relativeX);ripple.setAttribute('data-y',relativeY); // Set ripple position
    var rippleStyle={'top':relativeY+'px','left':relativeX+'px'};ripple.className=ripple.className+' waves-notransition';ripple.setAttribute('style',convertStyle(rippleStyle));ripple.className=ripple.className.replace('waves-notransition',''); // Scale the ripple
    rippleStyle['-webkit-transform']=scale;rippleStyle['-moz-transform']=scale;rippleStyle['-ms-transform']=scale;rippleStyle['-o-transform']=scale;rippleStyle.transform=scale;rippleStyle.opacity='1';rippleStyle['-webkit-transition-duration']=Effect.duration+'ms';rippleStyle['-moz-transition-duration']=Effect.duration+'ms';rippleStyle['-o-transition-duration']=Effect.duration+'ms';rippleStyle['transition-duration']=Effect.duration+'ms';rippleStyle['-webkit-transition-timing-function']='cubic-bezier(0.250, 0.460, 0.450, 0.940)';rippleStyle['-moz-transition-timing-function']='cubic-bezier(0.250, 0.460, 0.450, 0.940)';rippleStyle['-o-transition-timing-function']='cubic-bezier(0.250, 0.460, 0.450, 0.940)';rippleStyle['transition-timing-function']='cubic-bezier(0.250, 0.460, 0.450, 0.940)';ripple.setAttribute('style',convertStyle(rippleStyle));},hide:function hide(e){TouchHandler.touchup(e);var el=this;var width=el.clientWidth*1.4; // Get first ripple
    var ripple=null;var ripples=el.getElementsByClassName('waves-ripple');if(ripples.length>0){ripple=ripples[ripples.length-1];}else {return false;}var relativeX=ripple.getAttribute('data-x');var relativeY=ripple.getAttribute('data-y');var scale=ripple.getAttribute('data-scale'); // Get delay beetween mousedown and mouse leave
    var diff=Date.now()-Number(ripple.getAttribute('data-hold'));var delay=350-diff;if(delay<0){delay=0;} // Fade out ripple after delay
    setTimeout(function(){var style={'top':relativeY+'px','left':relativeX+'px','opacity':'0', // Duration
    '-webkit-transition-duration':Effect.duration+'ms','-moz-transition-duration':Effect.duration+'ms','-o-transition-duration':Effect.duration+'ms','transition-duration':Effect.duration+'ms','-webkit-transform':scale,'-moz-transform':scale,'-ms-transform':scale,'-o-transform':scale,'transform':scale};ripple.setAttribute('style',convertStyle(style));setTimeout(function(){try{el.removeChild(ripple);}catch(e){return false;}},Effect.duration);},delay);}, // Little hack to make <input> can perform waves effect
    wrapInput:function wrapInput(elements){for(var a=0;a<elements.length;a++){var el=elements[a];if(el.tagName.toLowerCase()==='input'){var parent=el.parentNode; // If input already have parent just pass through
    if(parent.tagName.toLowerCase()==='i'&&parent.className.indexOf('waves-effect')!==-1){continue;} // Put element class and style to the specified parent
    var wrapper=document.createElement('i');wrapper.className=el.className+' waves-input-wrapper';var elementStyle=el.getAttribute('style');if(!elementStyle){elementStyle='';}wrapper.setAttribute('style',elementStyle);el.className='waves-button-input';el.removeAttribute('style'); // Put element as child
    parent.replaceChild(wrapper,el);wrapper.appendChild(el);}}}}; /**
     * Disable mousedown event for 500ms during and after touch
     */var TouchHandler={ /* uses an integer rather than bool so there's no issues with
         * needing to clear timeouts if another touch event occurred
         * within the 500ms. Cannot mouseup between touchstart and
         * touchend, nor in the 500ms after touchend. */touches:0,allowEvent:function allowEvent(e){var allow=true;if(e.type==='touchstart'){TouchHandler.touches+=1; //push
    }else if(e.type==='touchend'||e.type==='touchcancel'){setTimeout(function(){if(TouchHandler.touches>0){TouchHandler.touches-=1; //pop after 500ms
    }},500);}else if(e.type==='mousedown'&&TouchHandler.touches>0){allow=false;}return allow;},touchup:function touchup(e){TouchHandler.allowEvent(e);}}; /**
     * Delegated click handler for .waves-effect element.
     * returns null when .waves-effect element not in "click tree"
     */function getWavesEffectElement(e){if(TouchHandler.allowEvent(e)===false){return null;}var element=null;var target=e.target||e.srcElement;while(target.parentElement!==null){if(!(target instanceof SVGElement)&&target.className.indexOf('waves-effect')!==-1){element=target;break;}else if(target.classList.contains('waves-effect')){element=target;break;}target=target.parentElement;}return element;} /**
     * Bubble the click and show effect if .waves-effect elem was found
     */function showEffect(e){var element=getWavesEffectElement(e);if(element!==null){Effect.show(e,element);if('ontouchstart' in $_GLOBAL){element.addEventListener('touchend',Effect.hide,false);element.addEventListener('touchcancel',Effect.hide,false);}element.addEventListener('mouseup',Effect.hide,false);element.addEventListener('mouseleave',Effect.hide,false);}}Waves.displayEffect=function(options){options=options||{};if('duration' in options){Effect.duration=options.duration;} //Wrap input inside <i> tag
    Effect.wrapInput($$('.waves-effect'));if('ontouchstart' in $_GLOBAL){document.body.addEventListener('touchstart',showEffect,false);}document.body.addEventListener('mousedown',showEffect,false);}; /**
     * Attach Waves to an input element (or any element which doesn't
     * bubble mouseup/mousedown events).
     *   Intended to be used with dynamically loaded forms/inputs, or
     * where the user doesn't want a delegated click handler.
     */Waves.attach=function(element){ //FUTURE: automatically add waves classes and allow users
    // to specify them with an options param? Eg. light/classic/button
    if(element.tagName.toLowerCase()==='input'){Effect.wrapInput([element]);element=element.parentElement;}if('ontouchstart' in $_GLOBAL){element.addEventListener('touchstart',showEffect,false);}element.addEventListener('mousedown',showEffect,false);};$_GLOBAL.Waves=Waves;document.addEventListener('DOMContentLoaded',function(){Waves.displayEffect();},false); /*
            jQuery.fn.extend({
            show: function () {
                return jQuery(this).removeClass('invisible');
            },
            hide: function () {
                return jQuery(this).addClass('invisible');
            },
            toggle: function (state) {
                return jQuery(this).toggleClass('invisible');
            }
        });
    */$.fn.modal=function(option){var defaults={dismissible:true, // Modal can be dismissed by clicking outside of the modal
    opacity:0.5, // Opacity of modal background
    in_duration:300, // Transition in duration
    out_duration:200, // Transition out duration
    ready:function ready(){alert('Ready');}, // Callback for Modal open
    complete:function complete(){alert('Closed');} // Callback for Modal close
    };var options=$.extend(defaults,option);return this.each(function(){if(option==='show'){$(this).openModal();}else if(options==='hide'){$(this).closeModal();}else {$(this).leanModal(options);}});}; /**
     * Devuelve el elemento que calza con el selector, o crea un nuevo elemento
     * @param  {String} selector  selector CSS para buscar si existe el elemento
     * @param  {String} html  definicion del elemento a crear
     * @return {jQuery Object} uno o mas elementos que calzan con el criterio de seleccion
     */$.getOrCreate=function(selector,html){var elemento=$(selector);if(elemento.length===0){elemento=$(html);}return elemento;};$.fn.tabs=function(methodOrOptions){var wavesmethods={init:function init(){return this.each(function(){ // For each set of tabs, we want to keep track of
    // which tab is active and its associated content
    var $this=$(this),$_GLOBAL_width=$($_GLOBAL).width();$this.width('100%');var $active,$content,$links=$this.find('li.tab a'),$tabs_width=$this.width(),$tab_width=Math.max($tabs_width,$this[0].scrollWidth)/$links.length,$index=0; // If the location.hash matches one of the links, use that as the active tab.
    $active=$($links.filter('[href="'+location.hash+'"]')); // If no match is found, use the first link or any with class 'active' as the initial active tab.
    if($active.length===0){$active=$(this).find('li.tab a.active').first();}if($active.length===0){$active=$(this).find('li.tab a').first();}$active.addClass('active');$index=$links.index($active);if($index<0){$index=0;}if($active[0]!==undefined){$content=$($active[0].hash);} // append indicator then set indicator width to tab width
    $this.append('<div class="indicator"></div>');var $indicator=$this.find('.indicator');if($this.is(":visible")){$indicator.css({"right":$tabs_width-($index+1)*$tab_width});$indicator.css({"left":$index*$tab_width});}$($_GLOBAL).resize(function(){$tabs_width=$this.width();$tab_width=Math.max($tabs_width,$this[0].scrollWidth)/$links.length;if($index<0){$index=0;}if($tab_width!==0&&$tabs_width!==0){$indicator.css({"right":$tabs_width-($index+1)*$tab_width});$indicator.css({"left":$index*$tab_width});}}); // Hide the remaining content
    $links.not($active).each(function(){$(this.hash).hide();}); // Bind the click event handler
    $this.on('click','a',function(e){if($(this).parent().hasClass('disabled')){e.preventDefault();return;}$tabs_width=$this.width();$tab_width=Math.max($tabs_width,$this[0].scrollWidth)/$links.length; // Make the old tab inactive.
    $active.removeClass('active');if($content!==undefined){$content.hide();} // Update the variables with the new link and content
    $active=$(this);$content=$(this.hash);$links=$this.find('li.tab a'); // Make the tab active.
    $active.addClass('active');var $prev_index=$index;$index=$links.index($(this));if($index<0){$index=0;} // Change url to current tab
    // $_GLOBAL.location.hash = $active.attr('href');
    if($content!==undefined){$content.show();} // Update indicator
    if($index-$prev_index>=0){$indicator.velocity({"right":$tabs_width-($index+1)*$tab_width},{duration:300,queue:false,easing:'easeOutQuad'});$indicator.velocity({"left":$index*$tab_width},{duration:300,queue:false,easing:'easeOutQuad',delay:90});}else {$indicator.velocity({"left":$index*$tab_width},{duration:300,queue:false,easing:'easeOutQuad'});$indicator.velocity({"right":$tabs_width-($index+1)*$tab_width},{duration:300,queue:false,easing:'easeOutQuad',delay:90});} // Prevent the anchor's default click action
    e.preventDefault();});});},select_tab:function select_tab(id){this.find('a[href="#'+id+'"]').trigger('click');}};if(wavesmethods[methodOrOptions]){return wavesmethods[methodOrOptions].apply(this,Array.prototype.slice.call(arguments,1));}else if(typeof methodOrOptions==='object'||!methodOrOptions){ // Default to "init"
    return wavesmethods.init.apply(this,arguments);}else {$.error('Method '+methodOrOptions+' does not exist on jQuery.tooltip');}};function textareaAutoResize($textarea){ // Set font properties of hiddenDiv
    var fontFamily=$textarea.css('font-family');var fontSize=$textarea.css('font-size');if(fontSize){hiddenDiv.css('font-size',fontSize);}if(fontFamily){hiddenDiv.css('font-family',fontFamily);}if($textarea.attr('wrap')==="off"){hiddenDiv.css('overflow-wrap',"normal").css('white-space',"pre");}hiddenDiv.text($textarea.val()+'\n');var content=hiddenDiv.html().replace(/\n/g,'<br>');hiddenDiv.html(content); // When textarea is hidden, width goes crazy.
    // Approximate with half of $_GLOBAL size
    if($textarea.is(':visible')){hiddenDiv.css('width',$textarea.width());}else {hiddenDiv.css('width',$($_GLOBAL).width()/2);}$textarea.css('height',hiddenDiv.height());}$(document).ready(function(){var swipeLeft=false;var swipeRight=false;$('ul.tabs').tabs(); // Dismissible Collections
    $('.dismissable').each(function(){$(this).hammer({prevent_default:false}).bind('pan',function(e){if(e.gesture.pointerType==="touch"){var $this=$(this);var direction=e.gesture.direction;var x=e.gesture.deltaX;var velocityX=e.gesture.velocityX;$this.velocity({translateX:x},{duration:50,queue:false,easing:'easeOutQuad'}); // Swipe Left
    if(direction===4&&(x>$this.innerWidth()/2||velocityX<-0.75)){swipeLeft=true;} // Swipe Right
    if(direction===2&&(x<-1*$this.innerWidth()/2||velocityX>0.75)){swipeRight=true;}}}).bind('panend',function(e){ // Reset if collection is moved back into original position
    if(Math.abs(e.gesture.deltaX)<$(this).innerWidth()/2){swipeRight=false;swipeLeft=false;}if(e.gesture.pointerType==="touch"){var $this=$(this);if(swipeLeft||swipeRight){var fullWidth;if(swipeLeft){fullWidth=$this.innerWidth();}else {fullWidth=-1*$this.innerWidth();}$this.velocity({translateX:fullWidth},{duration:100,queue:false,easing:'easeOutQuad',complete:function complete(){$this.css('border','none');$this.velocity({height:0,padding:0},{duration:200,queue:false,easing:'easeOutQuad',complete:function complete(){$this.remove();}});}});}else {$this.velocity({translateX:0},{duration:100,queue:false,easing:'easeOutQuad'});}swipeLeft=false;swipeRight=false;}});}); // Handle HTML5 autofocus
    $('input[autofocus]').siblings('label, i').addClass('active'); // Textarea Auto Resize
    var hiddenDiv=$('.hiddendiv').first();if(!hiddenDiv.length){hiddenDiv=$('<div class="hiddendiv common"></div>');$('body').append(hiddenDiv);}var text_area_selector='.materialize-textarea';$(text_area_selector).each(function(){var $textarea=$(this);if($textarea.val().length){textareaAutoResize($textarea);}});$('body').on('keyup keydown autoresize',text_area_selector,function(){textareaAutoResize($(this));}); // File Input Path
    $(document).on('change','.file-field input[type="file"]',function(){var file_field=$(this).closest('.file-field');var path_input=file_field.find('input.file-path');var files=$(this)[0].files;var file_names=[];for(var i=0;i<files.length;i++){file_names.push(files[i].name);}path_input.val(file_names.join(", "));path_input.trigger('change');});});

    exports.Materialize = Materialize;
    exports['default'] = Materialize;

    Object.defineProperty(exports, '__esModule', { value: true });

}));