/*! VelocityJS.org (1.2.3). (C) 2014 Julian Shapiro. MIT @license: en.wikipedia.org/wiki/MIT_License */
import jQuery from 'jquery';

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

export {
    requestAnimationFrame,
    cancelAnimationFrame,
    jQuery
};




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


var isJQuery = true,
    $ = jQuery;



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
