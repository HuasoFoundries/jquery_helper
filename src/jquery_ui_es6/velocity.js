/*! VelocityJS.org (1.2.3). (C) 2014 Julian Shapiro. MIT @license: en.wikipedia.org/wiki/MIT_License */
import $ from 'jquery';

const requestAnimationFrame = function (callback, element) {
        var currTime = new Date().getTime();
        var timeToCall = Math.max(0, 16 - (currTime - lastTime));
        var id = window.setTimeout(function () {
                callback(currTime + timeToCall);
            },
            timeToCall);
        lastTime = currTime + timeToCall;
        return id;
    },
    cancelAnimationFrame = function (id) {
        clearTimeout(id);
    };


((self, raf, caf) => {

    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for (var x = 0; x < vendors.length && !self.requestAnimationFrame; ++x) {
        self.requestAnimationFrame = self[vendors[x] + 'RequestAnimationFrame'];
        self.cancelAnimationFrame = self[vendors[x] + 'CancelAnimationFrame'] || self[vendors[x] + 'CancelRequestAnimationFrame'];
    }

    if (!self.requestAnimationFrame)
        self.requestAnimationFrame = raf;
    if (!self.cancelAnimationFrame)
        self.cancelAnimationFrame = caf;
})(window, requestAnimationFrame, cancelAnimationFrame);




/* IE detection. Gist: https://gist.github.com/julianshapiro/9098609 */
var IE = ((docobj) => {
    if (docobj.documentMode) {
        return docobj.documentMode;
    } else {
        for (var i = 7; i > 4; i--) {
            var div = docobj.createElement("div");

            div.innerHTML = "<!--[if IE " + i + "]><span></span><![endif]-->";

            if (div.getElementsByTagName("span").length) {
                div = null;

                return i;
            }
        }
    }

    return undefined;
})(window.document);


var isJQuery = true;



/* Array compacting. Copyright Lo-Dash. MIT License: https://github.com/lodash/lodash/blob/master/LICENSE.txt */
function compactSparseArray(array) {
    var index = -1,
        length = array ? array.length : 0,
        result = [];

    while (++index < length) {
        var value = array[index];

        if (value) {
            result.push(value);
        }
    }

    return result;
}

function sanitizeElements(elements) {
    /* Unwrap jQuery/Zepto objects. */
    if (Type.isWrapped(elements)) {
        elements = [].slice.call(elements);
        /* Wrap a single element in an array so that $.each() can iterate with the element instead of its node's children. */
    } else if (Type.isNode(elements)) {
        elements = [elements];
    }

    return elements;
}

var Type = {
    isString: function (variable) {
        return (typeof variable === "string");
    },
    isArray: Array.isArray || function (variable) {
        return Object.prototype.toString.call(variable) === "[object Array]";
    },
    isFunction: function (variable) {
        return Object.prototype.toString.call(variable) === "[object Function]";
    },
    isNode: function (variable) {
        return variable && variable.nodeType;
    },
    /* Copyright Martin Bohm. MIT License: https://gist.github.com/Tomalak/818a78a226a0738eaade */
    isNodeList: function (variable) {
        return typeof variable === "object" &&
            /^\[object (HTMLCollection|NodeList|Object)\]$/.test(Object.prototype.toString.call(variable)) &&
            variable.length !== undefined &&
            (variable.length === 0 || (typeof variable[0] === "object" && variable[0].nodeType > 0));
    },
    /* Determine if variable is a wrapped jQuery or Zepto element. */
    isWrapped: function (variable) {
        return variable && (variable.jquery || (window.Zepto && window.Zepto.zepto.isZ(variable)));
    },
    isSVG: function (variable) {
        return window.SVGElement && (variable instanceof window.SVGElement);
    },
    isEmptyObject: function (variable) {
        for (var name in variable) {
            return false;
        }

        return true;
    }
};


var DURATION_DEFAULT = 400,
    EASING_DEFAULT = "swing";

/*************
    State
*************/

var Velocity = {

    State: {

        isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),

        isAndroid: /Android/i.test(navigator.userAgent),
        isGingerbread: /Android 2\.3\.[3-7]/i.test(navigator.userAgent),
        isChrome: window.chrome,
        isFirefox: /Firefox/i.test(navigator.userAgent),

        prefixElement: document.createElement("div"),

        prefixMatches: {},

        scrollAnchor: null,

        scrollPropertyLeft: null,
        scrollPropertyTop: null,

        isTicking: false,

        calls: []
    },

    CSS: {},

    Utilities: $,

    Redirects: {},
    Easings: {},

    Promise: window.Promise,

    defaults: {
        queue: "",
        duration: DURATION_DEFAULT,
        easing: EASING_DEFAULT,
        begin: undefined,
        complete: undefined,
        progress: undefined,
        display: undefined,
        visibility: undefined,
        loop: false,
        delay: false,
        mobileHA: true,

        _cacheValues: true
    },

    init: function (element) {
        $.data(element, "velocity", {

            isSVG: Type.isSVG(element),

            isAnimating: false,
            /* A reference to the element's live computedStyle object. Learn more here: https://developer.mozilla.org/en/docs/Web/API/window.getComputedStyle */
            computedStyle: null,

            tweensContainer: null,

            rootPropertyValueCache: {},

            transformCache: {}
        });
    },
    /* A parallel to jQuery's $.css(), used for getting/setting Velocity's hooked CSS properties. */
    hook: null,

    mock: false,
    version: {
        major: 1,
        minor: 2,
        patch: 2
    },

    debug: false
};

/* Retrieve the appropriate scroll anchor and property name for the browser: https://developer.mozilla.org/en-US/docs/Web/API/Window.scrollY */
if (window.pageYOffset !== undefined) {
    Velocity.State.scrollAnchor = window;
    Velocity.State.scrollPropertyLeft = "pageXOffset";
    Velocity.State.scrollPropertyTop = "pageYOffset";
} else {
    Velocity.State.scrollAnchor = document.documentElement || document.body.parentNode || document.body;
    Velocity.State.scrollPropertyLeft = "scrollLeft";
    Velocity.State.scrollPropertyTop = "scrollTop";
}


function Data(element) {

    var response = $.data(element, "velocity");


    return response === null ? undefined : response;
};

/**************
    Easing
**************/


function generateStep(steps) {
    return function (p) {
        return Math.round(p * steps) * (1 / steps);
    };
}

/* Bezier curve function generator. Copyright Gaetan Renaudeau. MIT License: http://en.wikipedia.org/wiki/MIT_License */
function generateBezier(mX1, mY1, mX2, mY2) {
    var NEWTON_ITERATIONS = 4,
        NEWTON_MIN_SLOPE = 0.001,
        SUBDIVISION_PRECISION = 0.0000001,
        SUBDIVISION_MAX_ITERATIONS = 10,
        kSplineTableSize = 11,
        kSampleStepSize = 1.0 / (kSplineTableSize - 1.0),
        float32ArraySupported = "Float32Array" in window;


    if (arguments.length !== 4) {
        return false;
    }


    for (var i = 0; i < 4; ++i) {
        if (typeof arguments[i] !== "number" || isNaN(arguments[i]) || !isFinite(arguments[i])) {
            return false;
        }
    }


    mX1 = Math.min(mX1, 1);
    mX2 = Math.min(mX2, 1);
    mX1 = Math.max(mX1, 0);
    mX2 = Math.max(mX2, 0);

    var mSampleValues = float32ArraySupported ? new Float32Array(kSplineTableSize) : new Array(kSplineTableSize);

    function A(aA1, aA2) {
        return 1.0 - 3.0 * aA2 + 3.0 * aA1;
    }

    function B(aA1, aA2) {
        return 3.0 * aA2 - 6.0 * aA1;
    }

    function C(aA1) {
        return 3.0 * aA1;
    }

    function calcBezier(aT, aA1, aA2) {
        return ((A(aA1, aA2) * aT + B(aA1, aA2)) * aT + C(aA1)) * aT;
    }

    function getSlope(aT, aA1, aA2) {
        return 3.0 * A(aA1, aA2) * aT * aT + 2.0 * B(aA1, aA2) * aT + C(aA1);
    }

    function newtonRaphsonIterate(aX, aGuessT) {
        for (var i = 0; i < NEWTON_ITERATIONS; ++i) {
            var currentSlope = getSlope(aGuessT, mX1, mX2);

            if (currentSlope === 0.0) return aGuessT;

            var currentX = calcBezier(aGuessT, mX1, mX2) - aX;
            aGuessT -= currentX / currentSlope;
        }

        return aGuessT;
    }

    function calcSampleValues() {
        for (var i = 0; i < kSplineTableSize; ++i) {
            mSampleValues[i] = calcBezier(i * kSampleStepSize, mX1, mX2);
        }
    }

    function binarySubdivide(aX, aA, aB) {
        var currentX, currentT, i = 0;

        do {
            currentT = aA + (aB - aA) / 2.0;
            currentX = calcBezier(currentT, mX1, mX2) - aX;
            if (currentX > 0.0) {
                aB = currentT;
            } else {
                aA = currentT;
            }
        } while (Math.abs(currentX) > SUBDIVISION_PRECISION && ++i < SUBDIVISION_MAX_ITERATIONS);

        return currentT;
    }

    function getTForX(aX) {
        var intervalStart = 0.0,
            currentSample = 1,
            lastSample = kSplineTableSize - 1;

        for (; currentSample != lastSample && mSampleValues[currentSample] <= aX; ++currentSample) {
            intervalStart += kSampleStepSize;
        }

        --currentSample;

        var dist = (aX - mSampleValues[currentSample]) / (mSampleValues[currentSample + 1] - mSampleValues[currentSample]),
            guessForT = intervalStart + dist * kSampleStepSize,
            initialSlope = getSlope(guessForT, mX1, mX2);

        if (initialSlope >= NEWTON_MIN_SLOPE) {
            return newtonRaphsonIterate(aX, guessForT);
        } else if (initialSlope == 0.0) {
            return guessForT;
        } else {
            return binarySubdivide(aX, intervalStart, intervalStart + kSampleStepSize);
        }
    }

    var _precomputed = false;

    function precompute() {
        _precomputed = true;
        if (mX1 != mY1 || mX2 != mY2) calcSampleValues();
    }

    var f = function (aX) {
        if (!_precomputed) precompute();
        if (mX1 === mY1 && mX2 === mY2) return aX;
        if (aX === 0) return 0;
        if (aX === 1) return 1;

        return calcBezier(getTForX(aX), mY1, mY2);
    };

    f.getControlPoints = function () {
        return [{
            x: mX1,
            y: mY1
        }, {
            x: mX2,
            y: mY2
        }];
    };

    var str = "generateBezier(" + [mX1, mY1, mX2, mY2] + ")";
    f.toString = function () {
        return str;
    };

    return f;
}

/* Runge-Kutta spring physics function generator. Adapted from Framer.js, copyright Koen Bok. MIT License: http://en.wikipedia.org/wiki/MIT_License */

var generateSpringRK4 = (function () {
    function springAccelerationForState(state) {
        return (-state.tension * state.x) - (state.friction * state.v);
    }

    function springEvaluateStateWithDerivative(initialState, dt, derivative) {
        var state = {
            x: initialState.x + derivative.dx * dt,
            v: initialState.v + derivative.dv * dt,
            tension: initialState.tension,
            friction: initialState.friction
        };

        return {
            dx: state.v,
            dv: springAccelerationForState(state)
        };
    }

    function springIntegrateState(state, dt) {
        var a = {
                dx: state.v,
                dv: springAccelerationForState(state)
            },
            b = springEvaluateStateWithDerivative(state, dt * 0.5, a),
            c = springEvaluateStateWithDerivative(state, dt * 0.5, b),
            d = springEvaluateStateWithDerivative(state, dt, c),
            dxdt = 1.0 / 6.0 * (a.dx + 2.0 * (b.dx + c.dx) + d.dx),
            dvdt = 1.0 / 6.0 * (a.dv + 2.0 * (b.dv + c.dv) + d.dv);

        state.x = state.x + dxdt * dt;
        state.v = state.v + dvdt * dt;

        return state;
    }

    return function springRK4Factory(tension, friction, duration) {

        var initState = {
                x: -1,
                v: 0,
                tension: null,
                friction: null
            },
            path = [0],
            time_lapsed = 0,
            tolerance = 1 / 10000,
            DT = 16 / 1000,
            have_duration, dt, last_state;

        tension = parseFloat(tension) || 500;
        friction = parseFloat(friction) || 20;
        duration = duration || null;

        initState.tension = tension;
        initState.friction = friction;

        have_duration = duration !== null;


        if (have_duration) {

            time_lapsed = springRK4Factory(tension, friction);

            dt = time_lapsed / duration * DT;
        } else {
            dt = DT;
        }

        while (true) {
            /* Next/step function .*/
            last_state = springIntegrateState(last_state || initState, dt);

            path.push(1 + last_state.x);
            time_lapsed += 16;

            if (!(Math.abs(last_state.x) > tolerance && Math.abs(last_state.v) > tolerance)) {
                break;
            }
        }


        return !have_duration ? time_lapsed : function (percentComplete) {
            return path[(percentComplete * (path.length - 1)) | 0];
        };
    };
}());


Velocity.Easings = {
    linear: function (p) {
        return p;
    },
    swing: function (p) {
        return 0.5 - Math.cos(p * Math.PI) / 2
    },

    spring: function (p) {
        return 1 - (Math.cos(p * 4.5 * Math.PI) * Math.exp(-p * 6));
    }
};


$.each(
    [
        ["ease", [0.25, 0.1, 0.25, 1.0]],
        ["ease-in", [0.42, 0.0, 1.00, 1.0]],
        ["ease-out", [0.00, 0.0, 0.58, 1.0]],
        ["ease-in-out", [0.42, 0.0, 0.58, 1.0]],
        ["easeInSine", [0.47, 0, 0.745, 0.715]],
        ["easeOutSine", [0.39, 0.575, 0.565, 1]],
        ["easeInOutSine", [0.445, 0.05, 0.55, 0.95]],
        ["easeInQuad", [0.55, 0.085, 0.68, 0.53]],
        ["easeOutQuad", [0.25, 0.46, 0.45, 0.94]],
        ["easeInOutQuad", [0.455, 0.03, 0.515, 0.955]],
        ["easeInCubic", [0.55, 0.055, 0.675, 0.19]],
        ["easeOutCubic", [0.215, 0.61, 0.355, 1]],
        ["easeInOutCubic", [0.645, 0.045, 0.355, 1]],
        ["easeInQuart", [0.895, 0.03, 0.685, 0.22]],
        ["easeOutQuart", [0.165, 0.84, 0.44, 1]],
        ["easeInOutQuart", [0.77, 0, 0.175, 1]],
        ["easeInQuint", [0.755, 0.05, 0.855, 0.06]],
        ["easeOutQuint", [0.23, 1, 0.32, 1]],
        ["easeInOutQuint", [0.86, 0, 0.07, 1]],
        ["easeInExpo", [0.95, 0.05, 0.795, 0.035]],
        ["easeOutExpo", [0.19, 1, 0.22, 1]],
        ["easeInOutExpo", [1, 0, 0, 1]],
        ["easeInCirc", [0.6, 0.04, 0.98, 0.335]],
        ["easeOutCirc", [0.075, 0.82, 0.165, 1]],
        ["easeInOutCirc", [0.785, 0.135, 0.15, 0.86]]
    ],
    function (i, easingArray) {
        Velocity.Easings[easingArray[0]] = generateBezier.apply(null, easingArray[1]);
    });


function getEasing(value, duration) {
    var easing = value;

    /* The easing option can either be a string that references a pre-registered easing,
       or it can be a two-/four-item array of integers to be converted into a bezier/spring function. */
    if (Type.isString(value)) {

        if (!Velocity.Easings[value]) {
            easing = false;
        }
    } else if (Type.isArray(value) && value.length === 1) {
        easing = generateStep.apply(null, value);
    } else if (Type.isArray(value) && value.length === 2) {


        easing = generateSpringRK4.apply(null, value.concat([duration]));
    } else if (Type.isArray(value) && value.length === 4) {

        easing = generateBezier.apply(null, value);
    } else {
        easing = false;
    }


    if (easing === false) {
        if (Velocity.Easings[Velocity.defaults.easing]) {
            easing = Velocity.defaults.easing;
        } else {
            easing = EASING_DEFAULT;
        }
    }

    return easing;
}

/*****************
    CSS Stack
*****************/



var CSS = Velocity.CSS = {

    /*************
        RegEx
    *************/

    RegEx: {
        isHex: /^#([A-f\d]{3}){1,2}$/i,

        valueUnwrap: /^[A-z]+\((.*)\)$/i,
        wrappedValueAlreadyExtracted: /[0-9.]+ [0-9.]+ [0-9.]+( [0-9.]+)?/,

        valueSplit: /([A-z]+\(.+\))|(([A-z0-9#-.]+?)(?=\s|$))/ig
    },

    /************
        Lists
    ************/

    Lists: {
        colors: ["fill", "stroke", "stopColor", "color", "backgroundColor", "borderColor", "borderTopColor", "borderRightColor", "borderBottomColor", "borderLeftColor", "outlineColor"],
        transformsBase: ["translateX", "translateY", "scale", "scaleX", "scaleY", "skewX", "skewY", "rotateZ"],
        transforms3D: ["transformPerspective", "translateZ", "scaleZ", "rotateX", "rotateY"]
    },

    /************
        Hooks
    ************/



    Hooks: {
        /********************
            Registration
        ********************/



        templates: {
            "textShadow": ["Color X Y Blur", "black 0px 0px 0px"],
            "boxShadow": ["Color X Y Blur Spread", "black 0px 0px 0px 0px"],
            "clip": ["Top Right Bottom Left", "0px 0px 0px 0px"],
            "backgroundPosition": ["X Y", "0% 0%"],
            "transformOrigin": ["X Y Z", "50% 50% 0px"],
            "perspectiveOrigin": ["X Y", "50% 50%"]
        },


        registered: {

        },

        register: function () {

            for (var i = 0; i < CSS.Lists.colors.length; i++) {
                var rgbComponents = (CSS.Lists.colors[i] === "color") ? "0 0 0 1" : "255 255 255 1";
                CSS.Hooks.templates[CSS.Lists.colors[i]] = ["Red Green Blue Alpha", rgbComponents];
            }

            var rootProperty,
                hookTemplate,
                hookNames;


            if (IE) {
                for (rootProperty in CSS.Hooks.templates) {
                    hookTemplate = CSS.Hooks.templates[rootProperty];
                    hookNames = hookTemplate[0].split(" ");

                    var defaultValues = hookTemplate[1].match(CSS.RegEx.valueSplit);

                    if (hookNames[0] === "Color") {

                        hookNames.push(hookNames.shift());
                        defaultValues.push(defaultValues.shift());


                        CSS.Hooks.templates[rootProperty] = [hookNames.join(" "), defaultValues.join(" ")];
                    }
                }
            }


            for (rootProperty in CSS.Hooks.templates) {
                hookTemplate = CSS.Hooks.templates[rootProperty];
                hookNames = hookTemplate[0].split(" ");

                for (var i in hookNames) {
                    var fullHookName = rootProperty + hookNames[i],
                        hookPosition = i;


                    CSS.Hooks.registered[fullHookName] = [rootProperty, hookPosition];
                }
            }
        },

        /*****************************
           Injection and Extraction
        *****************************/



        getRoot: function (property) {
            var hookData = CSS.Hooks.registered[property];

            if (hookData) {
                return hookData[0];
            } else {

                return property;
            }
        },

        cleanRootPropertyValue: function (rootProperty, rootPropertyValue) {

            if (CSS.RegEx.valueUnwrap.test(rootPropertyValue)) {
                rootPropertyValue = rootPropertyValue.match(CSS.RegEx.valueUnwrap)[1];
            }



            if (CSS.Values.isCSSNullValue(rootPropertyValue)) {
                rootPropertyValue = CSS.Hooks.templates[rootProperty][1];
            }

            return rootPropertyValue;
        },

        extractValue: function (fullHookName, rootPropertyValue) {
            var hookData = CSS.Hooks.registered[fullHookName];

            if (hookData) {
                var hookRoot = hookData[0],
                    hookPosition = hookData[1];

                rootPropertyValue = CSS.Hooks.cleanRootPropertyValue(hookRoot, rootPropertyValue);


                return rootPropertyValue.toString().match(CSS.RegEx.valueSplit)[hookPosition];
            } else {

                return rootPropertyValue;
            }
        },

        injectValue: function (fullHookName, hookValue, rootPropertyValue) {
            var hookData = CSS.Hooks.registered[fullHookName];

            if (hookData) {
                var hookRoot = hookData[0],
                    hookPosition = hookData[1],
                    rootPropertyValueParts,
                    rootPropertyValueUpdated;

                rootPropertyValue = CSS.Hooks.cleanRootPropertyValue(hookRoot, rootPropertyValue);


                rootPropertyValueParts = rootPropertyValue.toString().match(CSS.RegEx.valueSplit);
                rootPropertyValueParts[hookPosition] = hookValue;
                rootPropertyValueUpdated = rootPropertyValueParts.join(" ");

                return rootPropertyValueUpdated;
            } else {

                return rootPropertyValue;
            }
        }
    },

    /*******************
       Normalizations
    *******************/


    Normalizations: {

        registered: {
            clip: function (type, element, propertyValue) {
                switch (type) {
                case "name":
                    return "clip";

                case "extract":
                    var extracted;


                    if (CSS.RegEx.wrappedValueAlreadyExtracted.test(propertyValue)) {
                        extracted = propertyValue;
                    } else {

                        extracted = propertyValue.toString().match(CSS.RegEx.valueUnwrap);


                        extracted = extracted ? extracted[1].replace(/,(\s+)?/g, " ") : propertyValue;
                    }

                    return extracted;

                case "inject":
                    return "rect(" + propertyValue + ")";
                }
            },

            blur: function (type, element, propertyValue) {
                switch (type) {
                case "name":
                    return Velocity.State.isFirefox ? "filter" : "-webkit-filter";
                case "extract":
                    var extracted = parseFloat(propertyValue);


                    if (!(extracted || extracted === 0)) {
                        var blurComponent = propertyValue.toString().match(/blur\(([0-9]+[A-z]+)\)/i);


                        if (blurComponent) {
                            extracted = blurComponent[1];

                        } else {
                            extracted = 0;
                        }
                    }

                    return extracted;

                case "inject":

                    if (!parseFloat(propertyValue)) {
                        return "none";
                    } else {
                        return "blur(" + propertyValue + ")";
                    }
                }
            },


            opacity: function (type, element, propertyValue) {
                if (IE <= 8) {
                    switch (type) {
                    case "name":
                        return "filter";
                    case "extract":

                        var extracted = propertyValue.toString().match(/alpha\(opacity=(.*)\)/i);

                        if (extracted) {

                            propertyValue = extracted[1] / 100;
                        } else {

                            propertyValue = 1;
                        }

                        return propertyValue;
                    case "inject":

                        element.style.zoom = 1;


                        if (parseFloat(propertyValue) >= 1) {
                            return "";
                        } else {

                            return "alpha(opacity=" + parseInt(parseFloat(propertyValue) * 100, 10) + ")";
                        }
                    }

                } else {
                    switch (type) {
                    case "name":
                        return "opacity";
                    case "extract":
                        return propertyValue;
                    case "inject":
                        return propertyValue;
                    }
                }
            }
        },

        /*****************************
            Batched Registrations
        *****************************/


        register: function () {

            /*****************
                Transforms
            *****************/



            /* Note: IE9 and Android Gingerbread have support for 2D -- but not 3D -- transforms. Since animating unsupported
               transform properties results in the browser ignoring the *entire* transform string, we prevent these 3D values
               from being normalized for these browsers so that tweening skips these properties altogether
               (since it will ignore them as being unsupported by the browser.) */
            if (!(IE <= 9) && !Velocity.State.isGingerbread) {

                CSS.Lists.transformsBase = CSS.Lists.transformsBase.concat(CSS.Lists.transforms3D);
            }

            for (var i = 0; i < CSS.Lists.transformsBase.length; i++) {

                (function () {
                    var transformName = CSS.Lists.transformsBase[i];

                    CSS.Normalizations.registered[transformName] = function (type, element, propertyValue) {
                        switch (type) {

                        case "name":
                            return "transform";

                        case "extract":

                            if (Data(element) === undefined || Data(element).transformCache[transformName] === undefined) {

                                return /^scale/i.test(transformName) ? 1 : 0;

                            } else {
                                return Data(element).transformCache[transformName].replace(/[()]/g, "");
                            }
                        case "inject":
                            var invalid = false;

                            /* If an individual transform property contains an unsupported unit type, the browser ignores the *entire* transform property.
                               Thus, protect users from themselves by skipping setting for transform values supplied with invalid unit types. */

                            switch (transformName.substr(0, transformName.length - 1)) {

                            case "translate":
                                invalid = !/(%|px|em|rem|vw|vh|\d)$/i.test(propertyValue);
                                break;

                            case "scal":
                            case "scale":
                                /* Chrome on Android has a bug in which scaled elements blur if their initial scale
                                   value is below 1 (which can happen with forcefeeding). Thus, we detect a yet-unset scale property
                                   and ensure that its first value is always 1. More info: http://stackoverflow.com/questions/10417890/css3-animations-with-transform-causes-blurred-elements-on-webkit/10417962#10417962 */
                                if (Velocity.State.isAndroid && Data(element).transformCache[transformName] === undefined && propertyValue < 1) {
                                    propertyValue = 1;
                                }

                                invalid = !/(\d)$/i.test(propertyValue);
                                break;
                            case "skew":
                                invalid = !/(deg|\d)$/i.test(propertyValue);
                                break;
                            case "rotate":
                                invalid = !/(deg|\d)$/i.test(propertyValue);
                                break;
                            }

                            if (!invalid) {

                                Data(element).transformCache[transformName] = "(" + propertyValue + ")";
                            }


                            return Data(element).transformCache[transformName];
                        }
                    };
                })();
            }

            /*************
                Colors
            *************/

            /* Since Velocity only animates a single numeric value per property, color animation is achieved by hooking the individual RGBA components of CSS color properties.
               Accordingly, color values must be normalized (e.g. "#ff0000", "red", and "rgb(255, 0, 0)" ==> "255 0 0 1") so that their components can be injected/extracted by CSS.Hooks logic. */
            for (var i = 0; i < CSS.Lists.colors.length; i++) {

                (function () {
                    var colorName = CSS.Lists.colors[i];


                    CSS.Normalizations.registered[colorName] = function (type, element, propertyValue) {
                        switch (type) {
                        case "name":
                            return colorName;
                            /* Convert all color values into the rgb format. (Old IE can return hex values and color names instead of rgb/rgba.) */
                        case "extract":
                            var extracted;


                            if (CSS.RegEx.wrappedValueAlreadyExtracted.test(propertyValue)) {
                                extracted = propertyValue;
                            } else {
                                var converted,
                                    colorNames = {
                                        black: "rgb(0, 0, 0)",
                                        blue: "rgb(0, 0, 255)",
                                        gray: "rgb(128, 128, 128)",
                                        green: "rgb(0, 128, 0)",
                                        red: "rgb(255, 0, 0)",
                                        white: "rgb(255, 255, 255)"
                                    };


                                if (/^[A-z]+$/i.test(propertyValue)) {
                                    if (colorNames[propertyValue] !== undefined) {
                                        converted = colorNames[propertyValue]
                                    } else {

                                        converted = colorNames.black;
                                    }

                                } else if (CSS.RegEx.isHex.test(propertyValue)) {
                                    converted = "rgb(" + CSS.Values.hexToRgb(propertyValue).join(" ") + ")";

                                } else if (!(/^rgba?\(/i.test(propertyValue))) {
                                    converted = colorNames.black;
                                }

                                /* Remove the surrounding "rgb/rgba()" string then replace commas with spaces and strip
                                   repeated spaces (in case the value included spaces to begin with). */
                                extracted = (converted || propertyValue).toString().match(CSS.RegEx.valueUnwrap)[1].replace(/,(\s+)?/g, " ");
                            }


                            if (!(IE <= 8) && extracted.split(" ").length === 3) {
                                extracted += " 1";
                            }

                            return extracted;
                        case "inject":

                            if (IE <= 8) {
                                if (propertyValue.split(" ").length === 4) {
                                    propertyValue = propertyValue.split(/\s+/).slice(0, 3).join(" ");
                                }

                            } else if (propertyValue.split(" ").length === 3) {
                                propertyValue += " 1";
                            }

                            /* Re-insert the browser-appropriate wrapper("rgb/rgba()"), insert commas, and strip off decimal units
                               on all values but the fourth (R, G, and B only accept whole numbers). */
                            return (IE <= 8 ? "rgb" : "rgba") + "(" + propertyValue.replace(/\s+/g, ",").replace(/\.(\d)+(?=,)/g, "") + ")";
                        }
                    };
                })();
            }
        }
    },

    /************************
       CSS Property Names
    ************************/

    Names: {

        camelCase: function (property) {
            return property.replace(/-(\w)/g, function (match, subMatch) {
                return subMatch.toUpperCase();
            });
        },

        /* For SVG elements, some properties (namely, dimensional ones) are GET/SET via the element's HTML attributes (instead of via CSS styles). */
        SVGAttribute: function (property) {
            var SVGAttributes = "width|height|x|y|cx|cy|r|rx|ry|x1|x2|y1|y2";


            if (IE || (Velocity.State.isAndroid && !Velocity.State.isChrome)) {
                SVGAttributes += "|transform";
            }

            return new RegExp("^(" + SVGAttributes + ")$", "i").test(property);
        },



        prefixCheck: function (property) {

            if (Velocity.State.prefixMatches[property]) {
                return [Velocity.State.prefixMatches[property], true];
            } else {
                var vendors = ["", "Webkit", "Moz", "ms", "O"];

                for (var i = 0, vendorsLength = vendors.length; i < vendorsLength; i++) {
                    var propertyPrefixed;

                    if (i === 0) {
                        propertyPrefixed = property;
                    } else {

                        propertyPrefixed = vendors[i] + property.replace(/^\w/, function (match) {
                            return match.toUpperCase();
                        });
                    }


                    if (Type.isString(Velocity.State.prefixElement.style[propertyPrefixed])) {

                        Velocity.State.prefixMatches[property] = propertyPrefixed;

                        return [propertyPrefixed, true];
                    }
                }


                return [property, false];
            }
        }
    },

    /************************
       CSS Property Values
    ************************/

    Values: {
        /* Hex to RGB conversion. Copyright Tim Down: http://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb */
        hexToRgb: function (hex) {
            var shortformRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
                longformRegex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i,
                rgbParts;

            hex = hex.replace(shortformRegex, function (m, r, g, b) {
                return r + r + g + g + b + b;
            });

            rgbParts = longformRegex.exec(hex);

            return rgbParts ? [parseInt(rgbParts[1], 16), parseInt(rgbParts[2], 16), parseInt(rgbParts[3], 16)] : [0, 0, 0];
        },

        isCSSNullValue: function (value) {

            /* Null-value checking is performed to default the special strings to 0 (for the sake of tweening) or their hook
               templates as defined as CSS.Hooks (for the sake of hook injection/extraction). */

            return (value == 0 || /^(none|auto|transparent|(rgba\(0, ?0, ?0, ?0\)))$/i.test(value));
        },


        getUnitType: function (property) {
            if (/^(rotate|skew)/i.test(property)) {
                return "deg";
            } else if (/(^(scale|scaleX|scaleY|scaleZ|alpha|flexGrow|flexHeight|zIndex|fontWeight)$)|((opacity|red|green|blue|alpha)$)/i.test(property)) {

                return "";
            } else {

                return "px";
            }
        },


        /* Note: This function is used for correctly setting the non-"none" display value in certain Velocity redirects, such as fadeIn/Out. */
        getDisplayType: function (element) {
            var tagName = element && element.tagName.toString().toLowerCase();

            if (/^(b|big|i|small|tt|abbr|acronym|cite|code|dfn|em|kbd|strong|samp|var|a|bdo|br|img|map|object|q|script|span|sub|sup|button|input|label|select|textarea)$/i.test(tagName)) {
                return "inline";
            } else if (/^(li)$/i.test(tagName)) {
                return "list-item";
            } else if (/^(tr)$/i.test(tagName)) {
                return "table-row";
            } else if (/^(table)$/i.test(tagName)) {
                return "table";
            } else if (/^(tbody)$/i.test(tagName)) {
                return "table-row-group";

            } else {
                return "block";
            }
        },

        /* The class add/remove functions are used to temporarily apply a "velocity-animating" class to elements while they're animating. */
        addClass: function (element, className) {
            if (element.classList) {
                element.classList.add(className);
            } else {
                element.className += (element.className.length ? " " : "") + className;
            }
        },

        removeClass: function (element, className) {
            if (element.classList) {
                element.classList.remove(className);
            } else {
                element.className = element.className.toString().replace(new RegExp("(^|\\s)" + className.split(" ").join("|") + "(\\s|$)", "gi"), " ");
            }
        }
    },

    /****************************
       Style Getting & Setting
    ****************************/


    getPropertyValue: function (element, property, rootPropertyValue, forceStyleLookup) {

        /* Note: Retrieving the value of a CSS property cannot simply be performed by checking an element's
           style attribute (which only reflects user-defined values). Instead, the browser must be queried for a property's
           *computed* value. You can read more about getComputedStyle here: https://developer.mozilla.org/en/docs/Web/API/window.getComputedStyle */
        function computePropertyValue(element, property) {
            /* When box-sizing isn't set to border-box, height and width style values are incorrectly computed when an
               element's scrollbars are visible (which expands the element's dimensions). Thus, we defer to the more accurate
               offsetHeight/Width property, which includes the total dimensions for interior, border, padding, and scrollbar.
               We subtract border and padding to get the sum of interior + scrollbar. */
            var computedValue = 0;


            if (IE <= 8) {
                computedValue = $.css(element, property);

            } else {

                var toggleDisplay = false;

                if (/^(width|height)$/.test(property) && CSS.getPropertyValue(element, "display") === 0) {
                    toggleDisplay = true;
                    CSS.setPropertyValue(element, "display", CSS.Values.getDisplayType(element));
                }

                function revertDisplay() {
                    if (toggleDisplay) {
                        CSS.setPropertyValue(element, "display", "none");
                    }
                }

                if (!forceStyleLookup) {
                    if (property === "height" && CSS.getPropertyValue(element, "boxSizing").toString().toLowerCase() !== "border-box") {
                        var contentBoxHeight = element.offsetHeight - (parseFloat(CSS.getPropertyValue(element, "borderTopWidth")) || 0) - (parseFloat(CSS.getPropertyValue(element,
                            "borderBottomWidth")) || 0) - (parseFloat(CSS.getPropertyValue(element, "paddingTop")) || 0) - (parseFloat(CSS.getPropertyValue(element, "paddingBottom")) || 0);
                        revertDisplay();

                        return contentBoxHeight;
                    } else if (property === "width" && CSS.getPropertyValue(element, "boxSizing").toString().toLowerCase() !== "border-box") {
                        var contentBoxWidth = element.offsetWidth - (parseFloat(CSS.getPropertyValue(element, "borderLeftWidth")) || 0) - (parseFloat(CSS.getPropertyValue(element,
                            "borderRightWidth")) || 0) - (parseFloat(CSS.getPropertyValue(element, "paddingLeft")) || 0) - (parseFloat(CSS.getPropertyValue(element, "paddingRight")) || 0);
                        revertDisplay();

                        return contentBoxWidth;
                    }
                }

                var computedStyle;


                if (Data(element) === undefined) {
                    computedStyle = window.getComputedStyle(element, null);

                } else if (!Data(element).computedStyle) {
                    computedStyle = Data(element).computedStyle = window.getComputedStyle(element, null);

                } else {
                    computedStyle = Data(element).computedStyle;
                }


                if (property === "borderColor") {
                    property = "borderTopColor";
                }


                if (IE === 9 && property === "filter") {
                    computedValue = computedStyle.getPropertyValue(property);
                } else {
                    computedValue = computedStyle[property];
                }


                if (computedValue === "" || computedValue === null) {
                    computedValue = element.style[property];
                }

                revertDisplay();
            }


            /* An example of why numeric conversion is necessary: When an element with "position:absolute" has an untouched "left"
               property, which reverts to "auto", left's value is 0 relative to its parent element, but is often non-zero relative
               to its *containing* (not parent) element, which is the nearest "position:relative" ancestor or the viewport (and always the viewport in the case of "position:fixed"). */
            if (computedValue === "auto" && /^(top|right|bottom|left)$/i.test(property)) {
                var position = computePropertyValue(element, "position");



                if (position === "fixed" || (position === "absolute" && /top|left/i.test(property))) {

                    computedValue = $(element).position()[property] + "px";
                }
            }

            return computedValue;
        }

        var propertyValue;


        if (CSS.Hooks.registered[property]) {
            var hook = property,
                hookRoot = CSS.Hooks.getRoot(hook);


            if (rootPropertyValue === undefined) {

                rootPropertyValue = CSS.getPropertyValue(element, CSS.Names.prefixCheck(hookRoot)[0]);
            }


            if (CSS.Normalizations.registered[hookRoot]) {
                rootPropertyValue = CSS.Normalizations.registered[hookRoot]("extract", element, rootPropertyValue);
            }


            propertyValue = CSS.Hooks.extractValue(hook, rootPropertyValue);



        } else if (CSS.Normalizations.registered[property]) {
            var normalizedPropertyName,
                normalizedPropertyValue;

            normalizedPropertyName = CSS.Normalizations.registered[property]("name", element);


            if (normalizedPropertyName !== "transform") {
                normalizedPropertyValue = computePropertyValue(element, CSS.Names.prefixCheck(normalizedPropertyName)[0]);


                if (CSS.Values.isCSSNullValue(normalizedPropertyValue) && CSS.Hooks.templates[property]) {
                    normalizedPropertyValue = CSS.Hooks.templates[property][1];
                }
            }

            propertyValue = CSS.Normalizations.registered[property]("extract", element, normalizedPropertyValue);
        }


        if (!/^[\d-]/.test(propertyValue)) {

            if (Data(element) && Data(element).isSVG && CSS.Names.SVGAttribute(property)) {
                /* Since the height/width attribute values must be set manually, they don't reflect computed values.
                   Thus, we use use getBBox() to ensure we always get values for elements with undefined height/width attributes. */
                if (/^(height|width)$/i.test(property)) {

                    try {
                        propertyValue = element.getBBox()[property];
                    } catch (error) {
                        propertyValue = 0;
                    }

                } else {
                    propertyValue = element.getAttribute(property);
                }
            } else {
                propertyValue = computePropertyValue(element, CSS.Names.prefixCheck(property)[0]);
            }
        }


        if (CSS.Values.isCSSNullValue(propertyValue)) {
            propertyValue = 0;
        }

        if (Velocity.debug >= 2) console.log("Get " + property + ": " + propertyValue);

        return propertyValue;
    },


    setPropertyValue: function (element, property, propertyValue, rootPropertyValue, scrollData) {
        var propertyName = property;


        if (property === "scroll") {

            if (scrollData.container) {
                scrollData.container["scroll" + scrollData.direction] = propertyValue;

            } else {
                if (scrollData.direction === "Left") {
                    window.scrollTo(propertyValue, scrollData.alternateValue);
                } else {
                    window.scrollTo(scrollData.alternateValue, propertyValue);
                }
            }
        } else {

            if (CSS.Normalizations.registered[property] && CSS.Normalizations.registered[property]("name", element) === "transform") {


                CSS.Normalizations.registered[property]("inject", element, propertyValue);

                propertyName = "transform";
                propertyValue = Data(element).transformCache[property];
            } else {

                if (CSS.Hooks.registered[property]) {
                    var hookName = property,
                        hookRoot = CSS.Hooks.getRoot(property);


                    rootPropertyValue = rootPropertyValue || CSS.getPropertyValue(element, hookRoot);

                    propertyValue = CSS.Hooks.injectValue(hookName, propertyValue, rootPropertyValue);
                    property = hookRoot;
                }


                if (CSS.Normalizations.registered[property]) {
                    propertyValue = CSS.Normalizations.registered[property]("inject", element, propertyValue);
                    property = CSS.Normalizations.registered[property]("name", element);
                }


                propertyName = CSS.Names.prefixCheck(property)[0];

                /* A try/catch is used for IE<=8, which throws an error when "invalid" CSS values are set, e.g. a negative width.
                   Try/catch is avoided for other browsers since it incurs a performance overhead. */
                if (IE <= 8) {
                    try {
                        element.style[propertyName] = propertyValue;
                    } catch (error) {
                        if (Velocity.debug) console.log("Browser does not support [" + propertyValue + "] for [" + propertyName + "]");
                    }


                } else if (Data(element) && Data(element).isSVG && CSS.Names.SVGAttribute(property)) {


                    element.setAttribute(property, propertyValue);
                } else {
                    element.style[propertyName] = propertyValue;
                }

                if (Velocity.debug >= 2) console.log("Set " + property + " (" + propertyName + "): " + propertyValue);
            }
        }


        return [propertyName, propertyValue];
    },



    flushTransformCache: function (element) {
        var transformString = "";

        /* Certain browsers require that SVG transforms be applied as an attribute. However, the SVG transform attribute takes a modified version of CSS's transform string
           (units are dropped and, except for skewX/Y, subproperties are merged into their master property -- e.g. scaleX and scaleY are merged into scale(X Y). */
        if ((IE || (Velocity.State.isAndroid && !Velocity.State.isChrome)) && Data(element).isSVG) {

            function getTransformFloat(transformProperty) {
                return parseFloat(CSS.getPropertyValue(element, transformProperty));
            }

            /* Create an object to organize all the transforms that we'll apply to the SVG element. To keep the logic simple,
               we process *all* transform properties -- even those that may not be explicitly applied (since they default to their zero-values anyway). */
            var SVGTransforms = {
                translate: [getTransformFloat("translateX"), getTransformFloat("translateY")],
                skewX: [getTransformFloat("skewX")],
                skewY: [getTransformFloat("skewY")],

                scale: getTransformFloat("scale") !== 1 ? [getTransformFloat("scale"), getTransformFloat("scale")] : [getTransformFloat("scaleX"), getTransformFloat("scaleY")],

                rotate: [getTransformFloat("rotateZ"), 0, 0]
            };


            $.each(Data(element).transformCache, function (transformName) {
                /* Except for with skewX/Y, revert the axis-specific transform subproperties to their axis-free master
                   properties so that they match up with SVG's accepted transform properties. */
                if (/^translate/i.test(transformName)) {
                    transformName = "translate";
                } else if (/^scale/i.test(transformName)) {
                    transformName = "scale";
                } else if (/^rotate/i.test(transformName)) {
                    transformName = "rotate";
                }


                if (SVGTransforms[transformName]) {

                    transformString += transformName + "(" + SVGTransforms[transformName].join(" ") + ")" + " ";


                    delete SVGTransforms[transformName];
                }
            });
        } else {
            var transformValue,
                perspective;


            $.each(Data(element).transformCache, function (transformName) {
                transformValue = Data(element).transformCache[transformName];


                if (transformName === "transformPerspective") {
                    perspective = transformValue;
                    return true;
                }


                if (IE === 9 && transformName === "rotateZ") {
                    transformName = "rotate";
                }

                transformString += transformName + transformValue + " ";
            });


            if (perspective) {
                transformString = "perspective" + perspective + " " + transformString;
            }
        }

        CSS.setPropertyValue(element, "transform", transformString);
    }
};


CSS.Hooks.register();
CSS.Normalizations.register();


Velocity.hook = function (elements, arg2, arg3) {
    var value = undefined;

    elements = sanitizeElements(elements);

    $.each(elements, function (i, element) {

        if (Data(element) === undefined) {
            Velocity.init(element);
        }


        if (arg3 === undefined) {
            if (value === undefined) {
                value = Velocity.CSS.getPropertyValue(element, arg2);
            }

        } else {
            /* sPV returns an array of the normalized propertyName/propertyValue pair used to update the DOM. */
            var adjustedSet = Velocity.CSS.setPropertyValue(element, arg2, arg3);


            if (adjustedSet[0] === "transform") {
                Velocity.CSS.flushTransformCache(element);
            }

            value = adjustedSet;
        }
    });

    return value;
};

/*****************
    Animation
*****************/

var animate = function () {

    /******************
        Call Chain
    ******************/


    function getChain() {

        if (isUtility) {
            return promiseData.promise || null;
            /* Otherwise, if we're using $.fn, return the jQuery-/Zepto-wrapped element set. */
        } else {
            return elementsWrapped;
        }
    }

    /*************************
       Arguments Assignment
    *************************/



    var syntacticSugar = (arguments[0] && (arguments[0].p || (($.isPlainObject(arguments[0].properties) && !arguments[0].properties.names) || Type.isString(arguments[0].properties)))),
        /* Whether Velocity was called via the utility function (as opposed to on a jQuery/Zepto object). */
        isUtility,
        /* When Velocity is called via the utility function ($.Velocity()/Velocity()), elements are explicitly
           passed in as the first parameter. Thus, argument positioning varies. We normalize them here. */
        elementsWrapped,
        argumentIndex;

    var elements,
        propertiesMap,
        options;

    /* Detect jQuery/Zepto elements being animated via the $.fn method. */
    if (Type.isWrapped(this)) {
        isUtility = false;

        argumentIndex = 0;
        elements = this;
        elementsWrapped = this;

    } else {
        isUtility = true;

        argumentIndex = 1;
        elements = syntacticSugar ? (arguments[0].elements || arguments[0].e) : arguments[0];
    }

    elements = sanitizeElements(elements);

    if (!elements) {
        return;
    }

    if (syntacticSugar) {
        propertiesMap = arguments[0].properties || arguments[0].p;
        options = arguments[0].options || arguments[0].o;
    } else {
        propertiesMap = arguments[argumentIndex];
        options = arguments[argumentIndex + 1];
    }


    var elementsLength = elements.length,
        elementsIndex = 0;

    /***************************
        Argument Overloading
    ***************************/



    if (!/^(stop|finish|finishAll)$/i.test(propertiesMap) && !$.isPlainObject(options)) {

        var startingArgumentPosition = argumentIndex + 1;

        options = {};


        for (var i = startingArgumentPosition; i < arguments.length; i++) {


            if (!Type.isArray(arguments[i]) && (/^(fast|normal|slow)$/i.test(arguments[i]) || /^\d/.test(arguments[i]))) {
                options.duration = arguments[i];

            } else if (Type.isString(arguments[i]) || Type.isArray(arguments[i])) {
                options.easing = arguments[i];

            } else if (Type.isFunction(arguments[i])) {
                options.complete = arguments[i];
            }
        }
    }

    /***************
        Promises
    ***************/

    var promiseData = {
        promise: null,
        resolver: null,
        rejecter: null
    };

    /* If this call was made via the utility function (which is the default method of invocation when jQuery/Zepto are not being used), and if
       promise support was detected, create a promise object for this call and store references to its resolver and rejecter methods. The resolve
       method is used when a call completes naturally or is prematurely stopped by the user. In both cases, completeCall() handles the associated
       call cleanup and promise resolving logic. The reject method is used when an invalid set of arguments is passed into a Velocity call. */

    if (isUtility && Velocity.Promise) {
        promiseData.promise = new Velocity.Promise(function (resolve, reject) {
            promiseData.resolver = resolve;
            promiseData.rejecter = reject;
        });
    }

    /*********************
       Action Detection
    *********************/


    var action;

    switch (propertiesMap) {
    case "scroll":
        action = "scroll";
        break;

    case "reverse":
        action = "reverse";
        break;

    case "finish":
    case "finishAll":
    case "stop":
        /*******************
            Action: Stop
        *******************/


        $.each(elements, function (i, element) {
            if (Data(element) && Data(element).delayTimer) {

                clearTimeout(Data(element).delayTimer.setTimeout);


                if (Data(element).delayTimer.next) {
                    Data(element).delayTimer.next();
                }

                delete Data(element).delayTimer;
            }


            if (propertiesMap === "finishAll" && (options === true || Type.isString(options))) {

                $.each($.queue(element, Type.isString(options) ? options : ""), function (_, item) {

                    if (Type.isFunction(item)) {
                        item();
                    }
                });


                $.queue(element, Type.isString(options) ? options : "", []);
            }
        });

        var callsToStop = [];



        /* Note: The stop command runs prior to Velocity's Queueing phase since its behavior is intended to take effect *immediately*,
           regardless of the element's current queue state. */


        $.each(Velocity.State.calls, function (i, activeCall) {

            if (activeCall) {

                $.each(activeCall[1], function (k, activeElement) {


                    var queueName = (options === undefined) ? "" : options;

                    if (queueName !== true && (activeCall[2].queue !== queueName) && !(options === undefined && activeCall[2].queue === false)) {
                        return true;
                    }


                    $.each(elements, function (l, element) {

                        if (element === activeElement) {

                            if (options === true || Type.isString(options)) {

                                $.each($.queue(element, Type.isString(options) ? options : ""), function (_, item) {

                                    if (Type.isFunction(item)) {

                                        item(null, true);
                                    }
                                });


                                $.queue(element, Type.isString(options) ? options : "", []);
                            }

                            if (propertiesMap === "stop") {


                                if (Data(element) && Data(element).tweensContainer && queueName !== false) {
                                    $.each(Data(element).tweensContainer, function (m, activeTween) {
                                        activeTween.endValue = activeTween.currentValue;
                                    });
                                }

                                callsToStop.push(i);
                            } else if (propertiesMap === "finish" || propertiesMap === "finishAll") {

                                activeCall[2].duration = 1;
                            }
                        }
                    });
                });
            }
        });


        if (propertiesMap === "stop") {
            $.each(callsToStop, function (i, j) {
                completeCall(j, true);
            });

            if (promiseData.promise) {

                promiseData.resolver(elements);
            }
        }


        return getChain();

    default:

        if ($.isPlainObject(propertiesMap) && !Type.isEmptyObject(propertiesMap)) {
            action = "start";

            /****************
                Redirects
            ****************/


        } else if (Type.isString(propertiesMap) && Velocity.Redirects[propertiesMap]) {
            var opts = $.extend({}, options),
                durationOriginal = opts.duration,
                delayOriginal = opts.delay || 0;


            if (opts.backwards === true) {
                elements = $.extend(true, [], elements).reverse();
            }


            $.each(elements, function (elementIndex, element) {

                if (parseFloat(opts.stagger)) {
                    opts.delay = delayOriginal + (parseFloat(opts.stagger) * elementIndex);
                } else if (Type.isFunction(opts.stagger)) {
                    opts.delay = delayOriginal + opts.stagger.call(element, elementIndex, elementsLength);
                }

                /* If the drag option was passed in, successively increase/decrease (depending on the presense of opts.backwards)
                   the duration of each element's animation, using floors to prevent producing very short durations. */
                if (opts.drag) {

                    opts.duration = parseFloat(durationOriginal) || (/^(callout|transition)/.test(propertiesMap) ? 1000 : DURATION_DEFAULT);

                    /* For each element, take the greater duration of: A) animation completion percentage relative to the original duration,
                       B) 75% of the original duration, or C) a 200ms fallback (in case duration is already set to a low value).
                       The end result is a baseline of 75% of the redirect's duration that increases/decreases as the end of the element set is approached. */
                    opts.duration = Math.max(opts.duration * (opts.backwards ? 1 - elementIndex / elementsLength : (elementIndex + 1) / elementsLength), opts.duration * 0.75, 200);
                }


                Velocity.Redirects[propertiesMap].call(element, element, opts || {}, elementIndex, elementsLength, elements, promiseData.promise ? promiseData : undefined);
            });



            return getChain();
        } else {
            var abortError = "Velocity: First argument (" + propertiesMap + ") was not a property map, a known action, or a registered redirect. Aborting.";

            if (promiseData.promise) {
                promiseData.rejecter(new Error(abortError));
            } else {
                console.log(abortError);
            }

            return getChain();
        }
    }

    /**************************
        Call-Wide Variables
    **************************/


    var callUnitConversionData = {
        lastParent: null,
        lastPosition: null,
        lastFontSize: null,
        lastPercentToPxWidth: null,
        lastPercentToPxHeight: null,
        lastEmToPx: null,
        remToPx: null,
        vwToPx: null,
        vhToPx: null
    };


    var call = [];

    /************************
       Element Processing
    ************************/

    /* Element processing consists of three parts -- data processing that cannot go stale and data processing that *can* go stale (i.e. third-party style modifications):
       1) Pre-Queueing: Element-wide variables, including the element's data storage, are instantiated. Call options are prepared. If triggered, the Stop action is executed.
       2) Queueing: The logic that runs once this call has reached its point of execution in the element's $.queue() stack. Most logic is placed here to avoid risking it becoming stale.
       3) Pushing: Consolidation of the tween data followed by its push onto the $ in-progress calls container.
    */

    function processElement() {

        /*************************
           Part I: Pre-Queueing
        *************************/

        /***************************
           Element-Wide Variables
        ***************************/

        var element = this,

            opts = $.extend({}, Velocity.defaults, options),

            tweensContainer = {},
            elementUnitConversionData;

        /******************
           Element Init
        ******************/

        if (Data(element) === undefined) {
            Velocity.init(element);
        }

        /******************
           Option: Delay
        ******************/



        if (parseFloat(opts.delay) && opts.queue !== false) {
            $.queue(element, opts.queue, function (next) {

                Velocity.velocityQueueEntryFlag = true;


                Data(element).delayTimer = {
                    setTimeout: setTimeout(next, parseFloat(opts.delay)),
                    next: next
                };
            });
        }

        /*********************
           Option: Duration
        *********************/


        switch (opts.duration.toString().toLowerCase()) {
        case "fast":
            opts.duration = 200;
            break;

        case "normal":
            opts.duration = DURATION_DEFAULT;
            break;

        case "slow":
            opts.duration = 600;
            break;

        default:

            opts.duration = parseFloat(opts.duration) || 1;
        }

        /************************
           Global Option: Mock
        ************************/

        if (Velocity.mock !== false) {

            if (Velocity.mock === true) {
                opts.duration = opts.delay = 1;
            } else {
                opts.duration *= parseFloat(Velocity.mock) || 1;
                opts.delay *= parseFloat(Velocity.mock) || 1;
            }
        }

        /*******************
           Option: Easing
        *******************/

        opts.easing = getEasing(opts.easing, opts.duration);

        /**********************
           Option: Callbacks
        **********************/


        if (opts.begin && !Type.isFunction(opts.begin)) {
            opts.begin = null;
        }

        if (opts.progress && !Type.isFunction(opts.progress)) {
            opts.progress = null;
        }

        if (opts.complete && !Type.isFunction(opts.complete)) {
            opts.complete = null;
        }

        /*********************************
           Option: Display & Visibility
        *********************************/

        /* Refer to Velocity's documentation (VelocityJS.org/#displayAndVisibility) for a description of the display and visibility options' behavior. */

        if (opts.display !== undefined && opts.display !== null) {
            opts.display = opts.display.toString().toLowerCase();


            if (opts.display === "auto") {
                opts.display = Velocity.CSS.Values.getDisplayType(element);
            }
        }

        if (opts.visibility !== undefined && opts.visibility !== null) {
            opts.visibility = opts.visibility.toString().toLowerCase();
        }

        /**********************
           Option: mobileHA
        **********************/



        /* Note: You can read more about the use of mobileHA in Velocity's documentation: VelocityJS.org/#mobileHA. */
        opts.mobileHA = (opts.mobileHA && Velocity.State.isMobile && !Velocity.State.isGingerbread);

        /***********************
           Part II: Queueing
        ***********************/



        function buildQueue(next) {

            /*******************
               Option: Begin
            *******************/


            if (opts.begin && elementsIndex === 0) {

                try {
                    opts.begin.call(elements, elements);
                } catch (error) {
                    setTimeout(function () {
                        throw error;
                    }, 1);
                }
            }

            /*****************************************
               Tween Data Construction (for Scroll)
            *****************************************/


            if (action === "scroll") {

                var scrollDirection = (/^x$/i.test(opts.axis) ? "Left" : "Top"),
                    scrollOffset = parseFloat(opts.offset) || 0,
                    scrollPositionCurrent,
                    scrollPositionCurrentAlternate,
                    scrollPositionEnd;


                if (opts.container) {

                    if (Type.isWrapped(opts.container) || Type.isNode(opts.container)) {

                        opts.container = opts.container[0] || opts.container;

                        scrollPositionCurrent = opts.container["scroll" + scrollDirection];

                        /* $.position() values are relative to the container's currently viewable area (without taking into account the container's true dimensions
                           -- say, for example, if the container was not overflowing). Thus, the scroll end value is the sum of the child element's position *and*
                           the scroll container's current scroll position. */
                        scrollPositionEnd = (scrollPositionCurrent + $(element).position()[scrollDirection.toLowerCase()]) + scrollOffset;

                    } else {
                        opts.container = null;
                    }
                } else {

                    scrollPositionCurrent = Velocity.State.scrollAnchor[Velocity.State["scrollProperty" + scrollDirection]];

                    scrollPositionCurrentAlternate = Velocity.State.scrollAnchor[Velocity.State["scrollProperty" + (scrollDirection === "Left" ? "Top" : "Left")]];


                    scrollPositionEnd = $(element).offset()[scrollDirection.toLowerCase()] + scrollOffset;
                }


                tweensContainer = {
                    scroll: {
                        rootPropertyValue: false,
                        startValue: scrollPositionCurrent,
                        currentValue: scrollPositionCurrent,
                        endValue: scrollPositionEnd,
                        unitType: "",
                        easing: opts.easing,
                        scrollData: {
                            container: opts.container,
                            direction: scrollDirection,
                            alternateValue: scrollPositionCurrentAlternate
                        }
                    },
                    element: element
                };

                if (Velocity.debug) console.log("tweensContainer (scroll): ", tweensContainer.scroll, element);

                /******************************************
                   Tween Data Construction (for Reverse)
                ******************************************/



                /* Note: Reverse calls do not need to be consecutively chained onto a currently-animating element in order to operate on cached values;
                   there is no harm to reverse being called on a potentially stale data cache since reverse's behavior is simply defined
                   as reverting to the element's values as they were prior to the previous *Velocity* call. */
            } else if (action === "reverse") {

                if (!Data(element).tweensContainer) {

                    $.dequeue(element, opts.queue);

                    return;
                } else {
                    /*********************
                       Options Parsing
                    *********************/


                    if (Data(element).opts.display === "none") {
                        Data(element).opts.display = "auto";
                    }

                    if (Data(element).opts.visibility === "hidden") {
                        Data(element).opts.visibility = "visible";
                    }


                    Data(element).opts.loop = false;
                    Data(element).opts.begin = null;
                    Data(element).opts.complete = null;


                    if (!options.easing) {
                        delete opts.easing;
                    }

                    if (!options.duration) {
                        delete opts.duration;
                    }


                    opts = $.extend({}, Data(element).opts, opts);

                    /*************************************
                       Tweens Container Reconstruction
                    *************************************/


                    var lastTweensContainer = $.extend(true, {}, Data(element).tweensContainer);


                    for (var lastTween in lastTweensContainer) {

                        if (lastTween !== "element") {
                            var lastStartValue = lastTweensContainer[lastTween].startValue;

                            lastTweensContainer[lastTween].startValue = lastTweensContainer[lastTween].currentValue = lastTweensContainer[lastTween].endValue;
                            lastTweensContainer[lastTween].endValue = lastStartValue;


                            if (!Type.isEmptyObject(options)) {
                                lastTweensContainer[lastTween].easing = opts.easing;
                            }

                            if (Velocity.debug) console.log("reverse tweensContainer (" + lastTween + "): " + JSON.stringify(lastTweensContainer[lastTween]), element);
                        }
                    }

                    tweensContainer = lastTweensContainer;
                }

                /*****************************************
                   Tween Data Construction (for Start)
                *****************************************/

            } else if (action === "start") {

                /*************************
                    Value Transferring
                *************************/

                /* If this queue entry follows a previous Velocity-initiated queue entry *and* if this entry was created
                   while the element was in the process of being animated by Velocity, then this current call is safe to use
                   the end values from the prior call as its start values. Velocity attempts to perform this value transfer
                   process whenever possible in order to avoid requerying the DOM. */

                /* Note: Conversely, animation reversal (and looping) *always* perform inter-call value transfers; they never requery the DOM. */
                var lastTweensContainer;


                if (Data(element).tweensContainer && Data(element).isAnimating === true) {
                    lastTweensContainer = Data(element).tweensContainer;
                }

                /***************************
                   Tween Data Calculation
                ***************************/


                /* Property map values can either take the form of 1) a single value representing the end value,
                   or 2) an array in the form of [ endValue, [, easing] [, startValue] ].
                   The optional third parameter is a forcefed startValue to be used instead of querying the DOM for
                   the element's current value. Read Velocity's docmentation to learn more about forcefeeding: VelocityJS.org/#forcefeeding */
                function parsePropertyValue(valueData, skipResolvingEasing) {
                    var endValue = undefined,
                        easing = undefined,
                        startValue = undefined;


                    if (Type.isArray(valueData)) {

                        endValue = valueData[0];


                        if ((!Type.isArray(valueData[1]) && /^[\d-]/.test(valueData[1])) || Type.isFunction(valueData[1]) || CSS.RegEx.isHex.test(valueData[1])) {
                            startValue = valueData[1];

                        } else if ((Type.isString(valueData[1]) && !CSS.RegEx.isHex.test(valueData[1])) || Type.isArray(valueData[1])) {
                            easing = skipResolvingEasing ? valueData[1] : getEasing(valueData[1], opts.duration);


                            if (valueData[2] !== undefined) {
                                startValue = valueData[2];
                            }
                        }

                    } else {
                        endValue = valueData;
                    }


                    if (!skipResolvingEasing) {
                        easing = easing || opts.easing;
                    }


                    if (Type.isFunction(endValue)) {
                        endValue = endValue.call(element, elementsIndex, elementsLength);
                    }

                    if (Type.isFunction(startValue)) {
                        startValue = startValue.call(element, elementsIndex, elementsLength);
                    }


                    return [endValue || 0, easing, startValue];
                }


                $.each(propertiesMap, function (property, value) {

                    if (RegExp("^" + CSS.Lists.colors.join("$|^") + "$").test(property)) {

                        var valueData = parsePropertyValue(value, true),
                            endValue = valueData[0],
                            easing = valueData[1],
                            startValue = valueData[2];

                        if (CSS.RegEx.isHex.test(endValue)) {

                            var colorComponents = ["Red", "Green", "Blue"],
                                endValueRGB = CSS.Values.hexToRgb(endValue),
                                startValueRGB = startValue ? CSS.Values.hexToRgb(startValue) : undefined;


                            for (var i = 0; i < colorComponents.length; i++) {
                                var dataArray = [endValueRGB[i]];

                                if (easing) {
                                    dataArray.push(easing);
                                }

                                if (startValueRGB !== undefined) {
                                    dataArray.push(startValueRGB[i]);
                                }

                                propertiesMap[property + colorComponents[i]] = dataArray;
                            }


                            delete propertiesMap[property];
                        }
                    }
                });


                for (var property in propertiesMap) {

                    /**************************
                       Start Value Sourcing
                    **************************/


                    var valueData = parsePropertyValue(propertiesMap[property]),
                        endValue = valueData[0],
                        easing = valueData[1],
                        startValue = valueData[2];


                    property = CSS.Names.camelCase(property);


                    var rootProperty = CSS.Hooks.getRoot(property),
                        rootPropertyValue = false;



                    if (!Data(element).isSVG && rootProperty !== "tween" && CSS.Names.prefixCheck(rootProperty)[1] === false && CSS.Normalizations.registered[rootProperty] === undefined) {
                        if (Velocity.debug) console.log("Skipping [" + rootProperty + "] due to a lack of browser support.");

                        continue;
                    }


                    if (((opts.display !== undefined && opts.display !== null && opts.display !== "none") || (opts.visibility !== undefined && opts.visibility !== "hidden")) && /opacity|filter/
                        .test(property) && !startValue && endValue !== 0) {
                        startValue = 0;
                    }

                    /* If values have been transferred from the previous Velocity call, extract the endValue and rootPropertyValue
                       for all of the current call's properties that were *also* animated in the previous call. */

                    if (opts._cacheValues && lastTweensContainer && lastTweensContainer[property]) {
                        if (startValue === undefined) {
                            startValue = lastTweensContainer[property].endValue + lastTweensContainer[property].unitType;
                        }


                        rootPropertyValue = Data(element).rootPropertyValueCache[rootProperty];

                    } else {

                        if (CSS.Hooks.registered[property]) {
                            if (startValue === undefined) {
                                rootPropertyValue = CSS.getPropertyValue(element, rootProperty);

                                startValue = CSS.getPropertyValue(element, property, rootPropertyValue);

                            } else {

                                rootPropertyValue = CSS.Hooks.templates[rootProperty][1];
                            }

                        } else if (startValue === undefined) {
                            startValue = CSS.getPropertyValue(element, property);
                        }
                    }

                    /**************************
                       Value Data Extraction
                    **************************/

                    var separatedValue,
                        endValueUnitType,
                        startValueUnitType,
                        operator = false;


                    function separateValue(property, value) {
                        var unitType,
                            numericValue;

                        numericValue = (value || "0")
                            .toString()
                            .toLowerCase()

                        .replace(/[%A-z]+$/, function (match) {

                            unitType = match;


                            return "";
                        });


                        if (!unitType) {
                            unitType = CSS.Values.getUnitType(property);
                        }

                        return [numericValue, unitType];
                    }


                    separatedValue = separateValue(property, startValue);
                    startValue = separatedValue[0];
                    startValueUnitType = separatedValue[1];


                    separatedValue = separateValue(property, endValue);
                    endValue = separatedValue[0].replace(/^([+-\/*])=/, function (match, subMatch) {
                        operator = subMatch;


                        return "";
                    });
                    endValueUnitType = separatedValue[1];


                    startValue = parseFloat(startValue) || 0;
                    endValue = parseFloat(endValue) || 0;

                    /***************************************
                       Property-Specific Value Conversion
                    ***************************************/


                    if (endValueUnitType === "%") {
                        /* A %-value fontSize/lineHeight is relative to the parent's fontSize (as opposed to the parent's dimensions),
                           which is identical to the em unit's behavior, so we piggyback off of that. */
                        if (/^(fontSize|lineHeight)$/.test(property)) {

                            endValue = endValue / 100;
                            endValueUnitType = "em";

                        } else if (/^scale/.test(property)) {
                            endValue = endValue / 100;
                            endValueUnitType = "";

                        } else if (/(Red|Green|Blue)$/i.test(property)) {
                            endValue = (endValue / 100) * 255;
                            endValueUnitType = "";
                        }
                    }

                    /***************************
                       Unit Ratio Calculation
                    ***************************/

                    /* When queried, the browser returns (most) CSS property values in pixels. Therefore, if an endValue with a unit type of
                       %, em, or rem is animated toward, startValue must be converted from pixels into the same unit type as endValue in order
                       for value manipulation logic (increment/decrement) to proceed. Further, if the startValue was forcefed or transferred
                       from a previous call, startValue may also not be in pixels. Unit conversion logic therefore consists of two steps:
                       1) Calculating the ratio of %/em/rem/vh/vw relative to pixels
                       2) Converting startValue into the same unit of measurement as endValue based on these ratios. */



                    function calculateUnitRatios() {

                        /************************
                            Same Ratio Checks
                        ************************/


                        var sameRatioIndicators = {
                                myParent: element.parentNode || document.body,
                                position: CSS.getPropertyValue(element, "position"),
                                fontSize: CSS.getPropertyValue(element, "fontSize")
                            },

                            samePercentRatio = ((sameRatioIndicators.position === callUnitConversionData.lastPosition) && (sameRatioIndicators.myParent === callUnitConversionData.lastParent)),

                            sameEmRatio = (sameRatioIndicators.fontSize === callUnitConversionData.lastFontSize);


                        callUnitConversionData.lastParent = sameRatioIndicators.myParent;
                        callUnitConversionData.lastPosition = sameRatioIndicators.position;
                        callUnitConversionData.lastFontSize = sameRatioIndicators.fontSize;

                        /***************************
                           Element-Specific Units
                        ***************************/


                        var measurement = 100,
                            unitRatios = {};

                        if (!sameEmRatio || !samePercentRatio) {
                            var dummy = Data(element).isSVG ? document.createElementNS("http://www.w3.org/2000/svg", "rect") : document.createElement("div");

                            Velocity.init(dummy);
                            sameRatioIndicators.myParent.appendChild(dummy);

                            /* To accurately and consistently calculate conversion ratios, the element's cascaded overflow and box-sizing are stripped.
                               Similarly, since width/height can be artificially constrained by their min-/max- equivalents, these are controlled for as well. */

                            $.each(["overflow", "overflowX", "overflowY"], function (i, property) {
                                Velocity.CSS.setPropertyValue(dummy, property, "hidden");
                            });
                            Velocity.CSS.setPropertyValue(dummy, "position", sameRatioIndicators.position);
                            Velocity.CSS.setPropertyValue(dummy, "fontSize", sameRatioIndicators.fontSize);
                            Velocity.CSS.setPropertyValue(dummy, "boxSizing", "content-box");


                            $.each(["minWidth", "maxWidth", "width", "minHeight", "maxHeight", "height"], function (i, property) {
                                Velocity.CSS.setPropertyValue(dummy, property, measurement + "%");
                            });

                            Velocity.CSS.setPropertyValue(dummy, "paddingLeft", measurement + "em");


                            unitRatios.percentToPxWidth = callUnitConversionData.lastPercentToPxWidth = (parseFloat(CSS.getPropertyValue(dummy, "width", null, true)) || 1) / measurement;
                            unitRatios.percentToPxHeight = callUnitConversionData.lastPercentToPxHeight = (parseFloat(CSS.getPropertyValue(dummy, "height", null, true)) || 1) / measurement;
                            unitRatios.emToPx = callUnitConversionData.lastEmToPx = (parseFloat(CSS.getPropertyValue(dummy, "paddingLeft")) || 1) / measurement;

                            sameRatioIndicators.myParent.removeChild(dummy);
                        } else {
                            unitRatios.emToPx = callUnitConversionData.lastEmToPx;
                            unitRatios.percentToPxWidth = callUnitConversionData.lastPercentToPxWidth;
                            unitRatios.percentToPxHeight = callUnitConversionData.lastPercentToPxHeight;
                        }

                        /***************************
                           Element-Agnostic Units
                        ***************************/


                        if (callUnitConversionData.remToPx === null) {

                            callUnitConversionData.remToPx = parseFloat(CSS.getPropertyValue(document.body, "fontSize")) || 16;
                        }


                        if (callUnitConversionData.vwToPx === null) {
                            callUnitConversionData.vwToPx = parseFloat(window.innerWidth) / 100;
                            callUnitConversionData.vhToPx = parseFloat(window.innerHeight) / 100;
                        }

                        unitRatios.remToPx = callUnitConversionData.remToPx;
                        unitRatios.vwToPx = callUnitConversionData.vwToPx;
                        unitRatios.vhToPx = callUnitConversionData.vhToPx;

                        if (Velocity.debug >= 1) console.log("Unit ratios: " + JSON.stringify(unitRatios), element);

                        return unitRatios;
                    }

                    /********************
                       Unit Conversion
                    ********************/

                    /* The * and / operators, which are not passed in with an associated unit, inherently use startValue's unit. Skip value and unit conversion. */
                    if (/[\/*]/.test(operator)) {
                        endValueUnitType = startValueUnitType;


                    } else if ((startValueUnitType !== endValueUnitType) && startValue !== 0) {
                        /* Unit conversion is also skipped when endValue is 0, but *startValueUnitType* must be used for tween values to remain accurate. */

                        if (endValue === 0) {
                            endValueUnitType = startValueUnitType;
                        } else {

                            elementUnitConversionData = elementUnitConversionData || calculateUnitRatios();


                            /* Note: W3C spec mandates that all of margin and padding's properties (even top and bottom) are %-relative to the *width* of the parent element. */
                            var axis = (/margin|padding|left|right|width|text|word|letter/i.test(property) || /X$/.test(property) || property === "x") ? "x" : "y";


                            switch (startValueUnitType) {
                            case "%":
                                /* Note: translateX and translateY are the only properties that are %-relative to an element's own dimensions -- not its parent's dimensions.
                                   Velocity does not include a special conversion process to account for this behavior. Therefore, animating translateX/Y from a % value
                                   to a non-% value will produce an incorrect start value. Fortunately, this sort of cross-unit conversion is rarely done by users in practice. */
                                startValue *= (axis === "x" ? elementUnitConversionData.percentToPxWidth : elementUnitConversionData.percentToPxHeight);
                                break;

                            case "px":

                                break;

                            default:
                                startValue *= elementUnitConversionData[startValueUnitType + "ToPx"];
                            }


                            switch (endValueUnitType) {
                            case "%":
                                startValue *= 1 / (axis === "x" ? elementUnitConversionData.percentToPxWidth : elementUnitConversionData.percentToPxHeight);
                                break;

                            case "px":

                                break;

                            default:
                                startValue *= 1 / elementUnitConversionData[endValueUnitType + "ToPx"];
                            }
                        }
                    }

                    /*********************
                       Relative Values
                    *********************/


                    /* Note: Relative *percent values* do not behave how most people think; while one would expect "+=50%"
                       to increase the property 1.5x its current value, it in fact increases the percent units in absolute terms:
                       50 points is added on top of the current % value. */
                    switch (operator) {
                    case "+":
                        endValue = startValue + endValue;
                        break;

                    case "-":
                        endValue = startValue - endValue;
                        break;

                    case "*":
                        endValue = startValue * endValue;
                        break;

                    case "/":
                        endValue = startValue / endValue;
                        break;
                    }

                    /**************************
                       tweensContainer Push
                    **************************/


                    tweensContainer[property] = {
                        rootPropertyValue: rootPropertyValue,
                        startValue: startValue,
                        currentValue: startValue,
                        endValue: endValue,
                        unitType: endValueUnitType,
                        easing: easing
                    };

                    if (Velocity.debug) console.log("tweensContainer (" + property + "): " + JSON.stringify(tweensContainer[property]), element);
                }


                tweensContainer.element = element;
            }

            /*****************
                Call Push
            *****************/


            if (tweensContainer.element) {

                CSS.Values.addClass(element, "velocity-animating");


                call.push(tweensContainer);


                if (opts.queue === "") {
                    Data(element).tweensContainer = tweensContainer;
                    Data(element).opts = opts;
                }


                Data(element).isAnimating = true;


                if (elementsIndex === elementsLength - 1) {

                    Velocity.State.calls.push([call, elements, opts, null, promiseData.resolver]);


                    if (Velocity.State.isTicking === false) {
                        Velocity.State.isTicking = true;


                        tick();
                    }
                } else {
                    elementsIndex++;
                }
            }
        }


        if (opts.queue === false) {

            if (opts.delay) {
                setTimeout(buildQueue, opts.delay);
            } else {
                buildQueue();
            }


        } else {
            $.queue(element, opts.queue, function (next, clearQueue) {

                if (clearQueue === true) {
                    if (promiseData.promise) {
                        promiseData.resolver(elements);
                    }


                    return true;
                }


                Velocity.velocityQueueEntryFlag = true;

                buildQueue(next);
            });
        }

        /*********************
            Auto-Dequeuing
        *********************/

        /* As per jQuery's $.queue() behavior, to fire the first non-custom-queue entry on an element, the element
           must be dequeued if its queue stack consists *solely* of the current call. (This can be determined by checking
           for the "inprogress" item that jQuery prepends to active queue stack arrays.) Regardless, whenever the element's
           queue is further appended with additional items -- including $.delay()'s or even $.animate() calls, the queue's
           first entry is automatically fired. This behavior contrasts that of custom queues, which never auto-fire. */

        /* Note: Unfortunately, most people don't fully grasp jQuery's powerful, yet quirky, $.queue() function.
           Lean more here: http://stackoverflow.com/questions/1058158/can-somebody-explain-jquery-queue-to-me */
        if ((opts.queue === "" || opts.queue === "fx") && $.queue(element)[0] !== "inprogress") {
            $.dequeue(element);
        }
    }

    /**************************
       Element Set Iteration
    **************************/


    $.each(elements, function (i, element) {

        if (Type.isNode(element)) {
            processElement.call(element);
        }
    });

    /******************
       Option: Loop
    ******************/



    var opts = $.extend({}, Velocity.defaults, options),
        reverseCallsCount;

    opts.loop = parseInt(opts.loop);
    reverseCallsCount = (opts.loop * 2) - 1;

    if (opts.loop) {

        for (var x = 0; x < reverseCallsCount; x++) {
            /* Since the logic for the reverse action occurs inside Queueing and therefore this call's options object
               isn't parsed until then as well, the current call's delay option must be explicitly passed into the reverse
               call so that the delay logic that occurs inside *Pre-Queueing* can process it. */
            var reverseOptions = {
                delay: opts.delay,
                progress: opts.progress
            };


            if (x === reverseCallsCount - 1) {
                reverseOptions.display = opts.display;
                reverseOptions.visibility = opts.visibility;
                reverseOptions.complete = opts.complete;
            }

            animate(elements, "reverse", reverseOptions);
        }
    }

    /***************
        Chaining
    ***************/


    return getChain();
};


Velocity = $.extend(animate, Velocity);

Velocity.animate = animate;

/**************
    Timing
**************/


var ticker = window.requestAnimationFrame;

/* Inactive browser tabs pause rAF, which results in all active animations immediately sprinting to their completion states when the tab refocuses.
   To get around this, we dynamically switch rAF to setTimeout (which the browser *doesn't* pause) when the tab loses focus. We skip this for mobile
   devices to avoid wasting battery power on inactive tabs. */

if (!Velocity.State.isMobile && document.hidden !== undefined) {
    document.addEventListener("visibilitychange", function () {

        if (document.hidden) {
            ticker = function (callback) {

                return setTimeout(function () {
                    callback(true)
                }, 16);
            };


            tick();
        } else {
            ticker = window.requestAnimationFrame;
        }
    });
}

/************
    Tick
************/


function tick(timestamp) {

    if (timestamp) {

        var timeCurrent = (new Date).getTime();

        /********************
           Call Iteration
        ********************/

        var callsLength = Velocity.State.calls.length;


        if (callsLength > 10000) {
            Velocity.State.calls = compactSparseArray(Velocity.State.calls);
        }


        for (var i = 0; i < callsLength; i++) {

            if (!Velocity.State.calls[i]) {
                continue;
            }

            /************************
               Call-Wide Variables
            ************************/

            var callContainer = Velocity.State.calls[i],
                call = callContainer[0],
                opts = callContainer[2],
                timeStart = callContainer[3],
                firstTick = !!timeStart,
                tweenDummyValue = null;



            if (!timeStart) {
                timeStart = Velocity.State.calls[i][3] = timeCurrent - 16;
            }


            var percentComplete = Math.min((timeCurrent - timeStart) / opts.duration, 1);

            /**********************
               Element Iteration
            **********************/


            for (var j = 0, callLength = call.length; j < callLength; j++) {
                var tweensContainer = call[j],
                    element = tweensContainer.element;


                if (!Data(element)) {
                    continue;
                }

                var transformPropertyExists = false;

                /**********************************
                   Display & Visibility Toggling
                **********************************/


                if (opts.display !== undefined && opts.display !== null && opts.display !== "none") {
                    if (opts.display === "flex") {
                        var flexValues = ["-webkit-box", "-moz-box", "-ms-flexbox", "-webkit-flex"];

                        $.each(flexValues, function (i, flexValue) {
                            CSS.setPropertyValue(element, "display", flexValue);
                        });
                    }

                    CSS.setPropertyValue(element, "display", opts.display);
                }


                if (opts.visibility !== undefined && opts.visibility !== "hidden") {
                    CSS.setPropertyValue(element, "visibility", opts.visibility);
                }

                /************************
                   Property Iteration
                ************************/


                for (var property in tweensContainer) {

                    if (property !== "element") {
                        var tween = tweensContainer[property],
                            currentValue,
                            /* Easing can either be a pre-genereated function or a string that references a pre-registered easing
                               on the Velocity.Easings object. In either case, return the appropriate easing *function*. */
                            easing = Type.isString(tween.easing) ? Velocity.Easings[tween.easing] : tween.easing;

                        /******************************
                           Current Value Calculation
                        ******************************/


                        if (percentComplete === 1) {
                            currentValue = tween.endValue;

                        } else {
                            var tweenDelta = tween.endValue - tween.startValue;
                            currentValue = tween.startValue + (tweenDelta * easing(percentComplete, opts, tweenDelta));


                            if (!firstTick && (currentValue === tween.currentValue)) {
                                continue;
                            }
                        }

                        tween.currentValue = currentValue;


                        if (property === "tween") {
                            tweenDummyValue = currentValue;
                        } else {
                            /******************
                               Hooks: Part I
                            ******************/


                            if (CSS.Hooks.registered[property]) {
                                var hookRoot = CSS.Hooks.getRoot(property),
                                    rootPropertyValueCache = Data(element).rootPropertyValueCache[hookRoot];

                                if (rootPropertyValueCache) {
                                    tween.rootPropertyValue = rootPropertyValueCache;
                                }
                            }

                            /*****************
                                DOM Update
                            *****************/



                            var adjustedSetData = CSS.setPropertyValue(element,
                                property,
                                tween.currentValue + (parseFloat(currentValue) === 0 ? "" : tween.unitType),
                                tween.rootPropertyValue,
                                tween.scrollData);

                            /*******************
                               Hooks: Part II
                            *******************/


                            if (CSS.Hooks.registered[property]) {

                                if (CSS.Normalizations.registered[hookRoot]) {
                                    Data(element).rootPropertyValueCache[hookRoot] = CSS.Normalizations.registered[hookRoot]("extract", null, adjustedSetData[1]);
                                } else {
                                    Data(element).rootPropertyValueCache[hookRoot] = adjustedSetData[1];
                                }
                            }

                            /***************
                               Transforms
                            ***************/


                            if (adjustedSetData[0] === "transform") {
                                transformPropertyExists = true;
                            }

                        }
                    }
                }

                /****************
                    mobileHA
                ****************/


                if (opts.mobileHA) {

                    if (Data(element).transformCache.translate3d === undefined) {

                        Data(element).transformCache.translate3d = "(0px, 0px, 0px)";

                        transformPropertyExists = true;
                    }
                }

                if (transformPropertyExists) {
                    CSS.flushTransformCache(element);
                }
            }


            if (opts.display !== undefined && opts.display !== "none") {
                Velocity.State.calls[i][2].display = false;
            }
            if (opts.visibility !== undefined && opts.visibility !== "hidden") {
                Velocity.State.calls[i][2].visibility = false;
            }


            if (opts.progress) {
                opts.progress.call(callContainer[1],
                    callContainer[1],
                    percentComplete,
                    Math.max(0, (timeStart + opts.duration) - timeCurrent),
                    timeStart,
                    tweenDummyValue);
            }


            if (percentComplete === 1) {
                completeCall(i);
            }
        }
    }


    if (Velocity.State.isTicking) {
        ticker(tick);
    }
}

/**********************
    Call Completion
**********************/


function completeCall(callIndex, isStopped) {

    if (!Velocity.State.calls[callIndex]) {
        return false;
    }


    var call = Velocity.State.calls[callIndex][0],
        elements = Velocity.State.calls[callIndex][1],
        opts = Velocity.State.calls[callIndex][2],
        resolver = Velocity.State.calls[callIndex][4];

    var remainingCallsExist = false;

    /*************************
       Element Finalization
    *************************/

    for (var i = 0, callLength = call.length; i < callLength; i++) {
        var element = call[i].element;




        if (!isStopped && !opts.loop) {
            if (opts.display === "none") {
                CSS.setPropertyValue(element, "display", opts.display);
            }

            if (opts.visibility === "hidden") {
                CSS.setPropertyValue(element, "visibility", opts.visibility);
            }
        }


        if (opts.loop !== true && ($.queue(element)[1] === undefined || !/\.velocityQueueEntryFlag/i.test($.queue(element)[1]))) {

            if (Data(element)) {
                Data(element).isAnimating = false;

                Data(element).rootPropertyValueCache = {};

                var transformHAPropertyExists = false;

                $.each(CSS.Lists.transforms3D, function (i, transformName) {
                    var defaultValue = /^scale/.test(transformName) ? 1 : 0,
                        currentValue = Data(element).transformCache[transformName];

                    if (Data(element).transformCache[transformName] !== undefined && new RegExp("^\\(" + defaultValue + "[^.]").test(currentValue)) {
                        transformHAPropertyExists = true;

                        delete Data(element).transformCache[transformName];
                    }
                });


                if (opts.mobileHA) {
                    transformHAPropertyExists = true;
                    delete Data(element).transformCache.translate3d;
                }


                if (transformHAPropertyExists) {
                    CSS.flushTransformCache(element);
                }


                CSS.Values.removeClass(element, "velocity-animating");
            }
        }

        /*********************
           Option: Complete
        *********************/



        if (!isStopped && opts.complete && !opts.loop && (i === callLength - 1)) {

            try {
                opts.complete.call(elements, elements);
            } catch (error) {
                setTimeout(function () {
                    throw error;
                }, 1);
            }
        }

        /**********************
           Promise Resolving
        **********************/


        if (resolver && opts.loop !== true) {
            resolver(elements);
        }

        /****************************
           Option: Loop (Infinite)
        ****************************/

        if (Data(element) && opts.loop === true && !isStopped) {
            /* If a rotateX/Y/Z property is being animated to 360 deg with loop:true, swap tween start/end values to enable
               continuous iterative rotation looping. (Otherise, the element would just rotate back and forth.) */
            $.each(Data(element).tweensContainer, function (propertyName, tweenContainer) {
                if (/^rotate/.test(propertyName) && parseFloat(tweenContainer.endValue) === 360) {
                    tweenContainer.endValue = 0;
                    tweenContainer.startValue = 360;
                }

                if (/^backgroundPosition/.test(propertyName) && parseFloat(tweenContainer.endValue) === 100 && tweenContainer.unitType === "%") {
                    tweenContainer.endValue = 0;
                    tweenContainer.startValue = 100;
                }
            });

            Velocity(element, "reverse", {
                loop: true,
                delay: opts.delay
            });
        }

        /***************
           Dequeueing
        ***************/


        if (opts.queue !== false) {
            $.dequeue(element, opts.queue);
        }
    }

    /************************
       Calls Array Cleanup
    ************************/

    /* Since this call is complete, set it to false so that the rAF tick skips it. This array is later compacted via compactSparseArray().
      (For performance reasons, the call is set to false instead of being deleted from the array: http://www.html5rocks.com/en/tutorials/speed/v8/) */
    Velocity.State.calls[callIndex] = false;


    for (var j = 0, callsLength = Velocity.State.calls.length; j < callsLength; j++) {
        if (Velocity.State.calls[j] !== false) {
            remainingCallsExist = true;

            break;
        }
    }

    if (remainingCallsExist === false) {

        Velocity.State.isTicking = false;


        delete Velocity.State.calls;
        Velocity.State.calls = [];
    }
}

/******************
    Frameworks
******************/


$.Velocity = Velocity;

if ($ !== window) {

    $.fn.velocity = animate;

    $.fn.velocity.defaults = Velocity.defaults;
}

/***********************
   Packaged Redirects
***********************/


$.each(["Down", "Up"], function (i, direction) {
    Velocity.Redirects["slide" + direction] = function (element, options, elementsIndex, elementsSize, elements, promiseData) {
        var opts = $.extend({}, options),
            begin = opts.begin,
            complete = opts.complete,
            computedValues = {
                height: "",
                marginTop: "",
                marginBottom: "",
                paddingTop: "",
                paddingBottom: ""
            },
            inlineValues = {};

        if (opts.display === undefined) {


            opts.display = (direction === "Down" ? (Velocity.CSS.Values.getDisplayType(element) === "inline" ? "inline-block" : "block") : "none");
        }

        opts.begin = function () {

            begin && begin.call(elements, elements);


            for (var property in computedValues) {
                inlineValues[property] = element.style[property];


                var propertyValue = Velocity.CSS.getPropertyValue(element, property);
                computedValues[property] = (direction === "Down") ? [propertyValue, 0] : [0, propertyValue];
            }


            inlineValues.overflow = element.style.overflow;
            element.style.overflow = "hidden";
        }

        opts.complete = function () {

            for (var property in inlineValues) {
                element.style[property] = inlineValues[property];
            }


            complete && complete.call(elements, elements);
            promiseData && promiseData.resolver(elements);
        };

        Velocity(element, computedValues, opts);
    };
});


$.each(["In", "Out"], function (i, direction) {
    Velocity.Redirects["fade" + direction] = function (element, options, elementsIndex, elementsSize, elements, promiseData) {
        var opts = $.extend({}, options),
            propertiesMap = {
                opacity: (direction === "In") ? 1 : 0
            },
            originalComplete = opts.complete;


        if (elementsIndex !== elementsSize - 1) {
            opts.complete = opts.begin = null;
        } else {
            opts.complete = function () {
                if (originalComplete) {
                    originalComplete.call(elements, elements);
                }

                promiseData && promiseData.resolver(elements);
            }
        }



        if (opts.display === undefined) {
            opts.display = (direction === "In" ? "auto" : "none");
        }

        Velocity(this, propertiesMap, opts);
    };
});



$.easing = {
    linear: function (p) {
        return p;
    },
    swing: function (p) {
        return 0.5 - Math.cos(p * Math.PI) / 2;
    },
    jswing: function (p) {
        return 0.5 - Math.cos(p * Math.PI) / 2;
    },
    easeInOutMaterial: function (x, t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t + b;
        return c / 4 * ((t -= 2) * t * t + 2) + b;
    },
    _default: "swing"
};


$.extend($.easing, {
    def: 'easeOutQuad',
    swing: function (x, t, b, c, d) {
        //alert($.easing.default);
        return $.easing[$.easing.def](x, t, b, c, d);
    },
    easeInQuad: function (x, t, b, c, d) {
        return c * (t /= d) * t + b;
    },
    easeOutQuad: function (x, t, b, c, d) {
        return -c * (t /= d) * (t - 2) + b;
    },
    easeInOutQuad: function (x, t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t + b;
        return -c / 2 * ((--t) * (t - 2) - 1) + b;
    },
    easeInCubic: function (x, t, b, c, d) {
        return c * (t /= d) * t * t + b;
    },
    easeOutCubic: function (x, t, b, c, d) {
        return c * ((t = t / d - 1) * t * t + 1) + b;
    },
    easeInOutCubic: function (x, t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
        return c / 2 * ((t -= 2) * t * t + 2) + b;
    },
    easeInQuart: function (x, t, b, c, d) {
        return c * (t /= d) * t * t * t + b;
    },
    easeOutQuart: function (x, t, b, c, d) {
        return -c * ((t = t / d - 1) * t * t * t - 1) + b;
    },
    easeInOutQuart: function (x, t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
        return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
    },
    easeInQuint: function (x, t, b, c, d) {
        return c * (t /= d) * t * t * t * t + b;
    },
    easeOutQuint: function (x, t, b, c, d) {
        return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
    },
    easeInOutQuint: function (x, t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t * t * t * t + b;
        return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
    },
    easeInSine: function (x, t, b, c, d) {
        return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
    },
    easeOutSine: function (x, t, b, c, d) {
        return c * Math.sin(t / d * (Math.PI / 2)) + b;
    },
    easeInOutSine: function (x, t, b, c, d) {
        return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
    },
    easeInExpo: function (x, t, b, c, d) {
        return (t == 0) ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
    },
    easeOutExpo: function (x, t, b, c, d) {
        return (t == d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
    },
    easeInOutExpo: function (x, t, b, c, d) {
        if (t == 0) return b;
        if (t == d) return b + c;
        if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
        return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
    },
    easeInCirc: function (x, t, b, c, d) {
        return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
    },
    easeOutCirc: function (x, t, b, c, d) {
        return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
    },
    easeInOutCirc: function (x, t, b, c, d) {
        if ((t /= d / 2) < 1) return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
        return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
    },
    easeInElastic: function (x, t, b, c, d) {
        var s = 1.70158;
        var p = 0;
        var a = c;
        if (t == 0) return b;
        if ((t /= d) == 1) return b + c;
        if (!p) p = d * .3;
        if (a < Math.abs(c)) {
            a = c;
            var s = p / 4;
        } else var s = p / (2 * Math.PI) * Math.asin(c / a);
        return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
    },
    easeOutElastic: function (x, t, b, c, d) {
        var s = 1.70158;
        var p = 0;
        var a = c;
        if (t == 0) return b;
        if ((t /= d) == 1) return b + c;
        if (!p) p = d * .3;
        if (a < Math.abs(c)) {
            a = c;
            var s = p / 4;
        } else var s = p / (2 * Math.PI) * Math.asin(c / a);
        return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
    },
    easeInOutElastic: function (x, t, b, c, d) {
        var s = 1.70158;
        var p = 0;
        var a = c;
        if (t == 0) return b;
        if ((t /= d / 2) == 2) return b + c;
        if (!p) p = d * (.3 * 1.5);
        if (a < Math.abs(c)) {
            a = c;
            var s = p / 4;
        } else var s = p / (2 * Math.PI) * Math.asin(c / a);
        if (t < 1) return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
        return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b;
    },
    easeInBack: function (x, t, b, c, d, s) {
        if (s == undefined) s = 1.70158;
        return c * (t /= d) * t * ((s + 1) * t - s) + b;
    },
    easeOutBack: function (x, t, b, c, d, s) {
        if (s == undefined) s = 1.70158;
        return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
    },
    easeInOutBack: function (x, t, b, c, d, s) {
        if (s == undefined) s = 1.70158;
        if ((t /= d / 2) < 1) return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
        return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
    },
    easeInBounce: function (x, t, b, c, d) {
        return c - $.easing.easeOutBounce(x, d - t, 0, c, d) + b;
    },
    easeOutBounce: function (x, t, b, c, d) {
        if ((t /= d) < (1 / 2.75)) {
            return c * (7.5625 * t * t) + b;
        } else if (t < (2 / 2.75)) {
            return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b;
        } else if (t < (2.5 / 2.75)) {
            return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b;
        } else {
            return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b;
        }
    },
    easeInOutBounce: function (x, t, b, c, d) {
        if (t < d / 2) return $.easing.easeInBounce(x, t * 2, 0, c, d) * .5 + b;
        return $.easing.easeOutBounce(x, t * 2 - d, 0, c, d) * .5 + c * .5 + b;
    }
});


$.fn.animate = $.fn.animate || $.fn.velocity;

$.fn.slideDown = $.fn.slideDown || function () {
    return this.each(function () {
        $(this).velocity('slideDown');
    });
};
$.fn.slideUp = $.fn.slideUp || function () {
    return this.each(function () {
        $(this).velocity('slideDown');
    });
};

$.fn.fadeOut = function (speed, easing, callback) {
    return this.each(function () {
        $(this).velocity({
            opacity: 'hide'
        }, speed, easing, callback);
    });
};

$.fn.fadeIn = function (speed, easing, callback) {
    return this.each(function () {
        $(this).velocity({
            opacity: 'show'
        }, speed, easing, callback);
    });
};

$.fn.stop = $.fn.stop || function () {
    return this.each(function () {
        $(this).velocity('stop');
    });
};



export {
    Velocity
};
