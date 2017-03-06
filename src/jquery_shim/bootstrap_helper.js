define(["./jquery_src/core"], function (jQuery) {
			var $ = jQuery;
var widgetUuid = 0;
var widgetSlice = Array.prototype.slice;

function Widget() /* options, element */{}

Widget._childConstructors = [];

Widget.extend = function (target) {
	var input = widgetSlice.call(arguments, 1);
	var inputIndex = 0;
	var inputLength = input.length;
	var key;
	var value;

	for (; inputIndex < inputLength; inputIndex++) {
		for (key in input[inputIndex]) {
			value = input[inputIndex][key];
			if (input[inputIndex].hasOwnProperty(key) && value !== undefined) {

				// Clone objects
				if ($.isPlainObject(value)) {
					target[key] = $.isPlainObject(target[key]) ? Widget.extend({}, target[key], value) :

					// Don't extend strings, arrays, etc. with objects
					Widget.extend({}, value);

					// Copy everything else by reference
				} else {
						target[key] = value;
					}
			}
		}
	}
	return target;
};

Widget.prototype = {
	widgetName: "widget",
	widgetEventPrefix: "",
	defaultElement: "<div>",

	options: {
		classes: {},
		disabled: false,

		// Callbacks
		create: null
	},

	_createWidget: function _createWidget(options, element) {
		element = $(element || this.defaultElement || this)[0];
		this.element = $(element);
		this.uuid = widgetUuid++;
		this.eventNamespace = "." + this.widgetName + this.uuid;

		this.bindings = $();
		this.hoverable = $();
		this.focusable = $();
		this.classesElementLookup = {};

		if (element !== this) {
			$.data(element, this.widgetFullName, this);
			this._on(true, this.element, {
				remove: function remove(event) {
					if (event.target === element) {
						this.destroy();
					}
				}
			});
			this.document = $(element.style ?

			// Element within the document
			element.ownerDocument :

			// Element is window or document
			element.document || element);
			this.window = $(this.document[0].defaultView || this.document[0].parentWindow);
		}

		this.options = Widget.extend({}, this.options, this._getCreateOptions(), options);

		this._create();

		if (this.options.disabled) {
			this._setOptionDisabled(this.options.disabled);
		}

		this._trigger("create", null, this._getCreateEventData());
		this._init();
	},

	_getCreateOptions: function _getCreateOptions() {
		return {};
	},

	_getCreateEventData: $.noop,

	_create: $.noop,

	_init: $.noop,

	destroy: function destroy() {
		var that = this;

		this._destroy();
		$.each(this.classesElementLookup, function (key, value) {
			that._removeClass(value, key);
		});

		// We can probably remove the unbind calls in 2.0
		// all event bindings should go through this._on()
		this.element.off(this.eventNamespace).removeData(this.widgetFullName);
		this.widget().off(this.eventNamespace).removeAttr("aria-disabled");

		// Clean up events and states
		this.bindings.off(this.eventNamespace);
	},

	_destroy: $.noop,

	widget: function widget() {
		return this.element;
	},

	option: function option(key, value) {
		var options = key;
		var parts;
		var curOption;
		var i;

		if (arguments.length === 0) {

			// Don't return a reference to the internal hash
			return Widget.extend({}, this.options);
		}

		if (typeof key === "string") {

			// Handle nested keys, e.g., "foo.bar" => { foo: { bar: ___ } }
			options = {};
			parts = key.split(".");
			key = parts.shift();
			if (parts.length) {
				curOption = options[key] = Widget.extend({}, this.options[key]);
				for (i = 0; i < parts.length - 1; i++) {
					curOption[parts[i]] = curOption[parts[i]] || {};
					curOption = curOption[parts[i]];
				}
				key = parts.pop();
				if (arguments.length === 1) {
					return curOption[key] === undefined ? null : curOption[key];
				}
				curOption[key] = value;
			} else {
				if (arguments.length === 1) {
					return this.options[key] === undefined ? null : this.options[key];
				}
				options[key] = value;
			}
		}

		this._setOptions(options);

		return this;
	},

	_setOptions: function _setOptions(options) {
		var key;

		for (key in options) {
			this._setOption(key, options[key]);
		}

		return this;
	},

	_setOption: function _setOption(key, value) {
		if (key === "classes") {
			this._setOptionClasses(value);
		}

		this.options[key] = value;

		if (key === "disabled") {
			this._setOptionDisabled(value);
		}

		return this;
	},

	_setOptionClasses: function _setOptionClasses(value) {
		var classKey, elements, currentElements;

		for (classKey in value) {
			currentElements = this.classesElementLookup[classKey];
			if (value[classKey] === this.options.classes[classKey] || !currentElements || !currentElements.length) {
				continue;
			}

			// We are doing this to create a new jQuery object because the _removeClass() call
			// on the next line is going to destroy the reference to the current elements being
			// tracked. We need to save a copy of this collection so that we can add the new classes
			// below.
			elements = $(currentElements.get());
			this._removeClass(currentElements, classKey);

			// We don't use _addClass() here, because that uses this.options.classes
			// for generating the string of classes. We want to use the value passed in from
			// _setOption(), this is the new value of the classes option which was passed to
			// _setOption(). We pass this value directly to _classes().
			elements.addClass(this._classes({
				element: elements,
				keys: classKey,
				classes: value,
				add: true
			}));
		}
	},

	_setOptionDisabled: function _setOptionDisabled(value) {
		this._toggleClass(this.widget(), this.widgetFullName + "-disabled", null, !!value);

		// If the widget is becoming disabled, then nothing is interactive
		if (value) {
			this._removeClass(this.hoverable, null, "ui-state-hover");
			this._removeClass(this.focusable, null, "ui-state-focus");
		}
	},

	enable: function enable() {
		return this._setOptions({
			disabled: false
		});
	},

	disable: function disable() {
		return this._setOptions({
			disabled: true
		});
	},

	_classes: function _classes(options) {
		var full = [];
		var that = this;

		options = $.extend({
			element: this.element,
			classes: this.options.classes || {}
		}, options);

		function processClassString(classes, checkOption) {
			var current, i;
			for (i = 0; i < classes.length; i++) {
				current = that.classesElementLookup[classes[i]] || $();
				if (options.add) {
					current = $($.unique(current.get().concat(options.element.get())));
				} else {
					current = $(current.not(options.element).get());
				}
				that.classesElementLookup[classes[i]] = current;
				full.push(classes[i]);
				if (checkOption && options.classes[classes[i]]) {
					full.push(options.classes[classes[i]]);
				}
			}
		}

		if (options.keys) {
			processClassString(options.keys.match(/\S+/g) || [], true);
		}
		if (options.extra) {
			processClassString(options.extra.match(/\S+/g) || []);
		}

		return full.join(" ");
	},

	_removeClass: function _removeClass(element, keys, extra) {
		return this._toggleClass(element, keys, extra, false);
	},

	_addClass: function _addClass(element, keys, extra) {
		return this._toggleClass(element, keys, extra, true);
	},

	_toggleClass: function _toggleClass(element, keys, extra, add) {
		add = typeof add === "boolean" ? add : extra;
		var shift = typeof element === "string" || element === null,
		    options = {
			extra: shift ? keys : extra,
			keys: shift ? element : keys,
			element: shift ? this.element : element,
			add: add
		};
		options.element.toggleClass(this._classes(options), add);
		return this;
	},

	_on: function _on(suppressDisabledCheck, element, handlers) {
		var delegateElement;
		var instance = this;

		// No suppressDisabledCheck flag, shuffle arguments
		if (typeof suppressDisabledCheck !== "boolean") {
			handlers = element;
			element = suppressDisabledCheck;
			suppressDisabledCheck = false;
		}

		// No element argument, shuffle and use this.element
		if (!handlers) {
			handlers = element;
			element = this.element;
			delegateElement = this.widget();
		} else {
			element = delegateElement = $(element);
			this.bindings = this.bindings.add(element);
		}

		$.each(handlers, function (event, handler) {
			function handlerProxy() {

				// Allow widgets to customize the disabled handling
				// - disabled as an array instead of boolean
				// - disabled class as method for disabling individual parts
				if (!suppressDisabledCheck && (instance.options.disabled === true || $(this).hasClass("ui-state-disabled"))) {
					return;
				}
				return (typeof handler === "string" ? instance[handler] : handler).apply(instance, arguments);
			}

			// Copy the guid so direct unbinding works
			if (typeof handler !== "string") {
				handlerProxy.guid = handler.guid = handler.guid || handlerProxy.guid || $.guid++;
			}

			var match = event.match(/^([\w:-]*)\s*(.*)$/);
			var eventName = match[1] + instance.eventNamespace;
			var selector = match[2];

			if (selector) {
				delegateElement.on(eventName, selector, handlerProxy);
			} else {
				element.on(eventName, handlerProxy);
			}
		});
	},

	_off: function _off(element, eventName) {
		eventName = (eventName || "").split(" ").join(this.eventNamespace + " ") + this.eventNamespace;
		element.off(eventName).off(eventName);

		// Clear the stack to avoid memory leaks (#10056)
		this.bindings = $(this.bindings.not(element).get());
		this.focusable = $(this.focusable.not(element).get());
		this.hoverable = $(this.hoverable.not(element).get());
	},

	_delay: function _delay(handler, delay) {
		function handlerProxy() {
			return (typeof handler === "string" ? instance[handler] : handler).apply(instance, arguments);
		}
		var instance = this;
		return setTimeout(handlerProxy, delay || 0);
	},

	_hoverable: function _hoverable(element) {
		this.hoverable = this.hoverable.add(element);
		this._on(element, {
			mouseenter: function mouseenter(event) {
				this._addClass($(event.currentTarget), null, "ui-state-hover");
			},
			mouseleave: function mouseleave(event) {
				this._removeClass($(event.currentTarget), null, "ui-state-hover");
			}
		});
	},

	_focusable: function _focusable(element) {
		this.focusable = this.focusable.add(element);
		this._on(element, {
			focusin: function focusin(event) {
				this._addClass($(event.currentTarget), null, "ui-state-focus");
			},
			focusout: function focusout(event) {
				this._removeClass($(event.currentTarget), null, "ui-state-focus");
			}
		});
	},

	_trigger: function _trigger(type, event, data) {
		var prop, orig;
		var callback = this.options[type];

		data = data || {};
		event = $.Event(event);
		event.type = (type === this.widgetEventPrefix ? type : this.widgetEventPrefix + type).toLowerCase();

		// The original event may come from any element
		// so we need to reset the target on the new event
		event.target = this.element[0];

		// Copy original event properties over to the new event
		orig = event.originalEvent;
		if (orig) {
			for (prop in orig) {
				if (!(prop in event)) {
					event[prop] = orig[prop];
				}
			}
		}

		this.element.trigger(event, data);
		return !($.isFunction(callback) && callback.apply(this.element[0], [event].concat(data)) === false || event.isDefaultPrevented());
	}
};

Widget.prototype._show = function (element, options, callback) {
	if (typeof options === "string") {
		options = {
			effect: options
		};
	}

	var hasOptions;
	var effectName = !options ? method : options === true || typeof options === "number" ? 'fadeIn' : options.effect || 'fadeIn';

	options = options || {};
	if (typeof options === "number") {
		options = {
			duration: options
		};
	}

	hasOptions = !$.isEmptyObject(options);
	options.complete = callback;

	if (options.delay) {
		element.delay(options.delay);
	}

	if (hasOptions && $.effects && $.effects.effect[effectName]) {
		element[method](options);
	} else if (effectName !== method && element[effectName]) {
		element[effectName](options.duration, options.easing, callback);
	} else {
		element.queue(function (next) {
			$(this)[method]();
			if (callback) {
				callback.call(element[0]);
			}
			next();
		});
	}
};
Widget.prototype._hide = function (element, options, callback) {
	if (typeof options === "string") {
		options = {
			effect: options
		};
	}

	var hasOptions;
	var effectName = !options ? method : options === true || typeof options === "number" ? 'fadeOut' : options.effect || 'fadeOut';

	options = options || {};
	if (typeof options === "number") {
		options = {
			duration: options
		};
	}

	hasOptions = !$.isEmptyObject(options);
	options.complete = callback;

	if (options.delay) {
		element.delay(options.delay);
	}

	if (hasOptions && $.effects && $.effects.effect[effectName]) {
		element[method](options);
	} else if (effectName !== method && element[effectName]) {
		element[effectName](options.duration, options.easing, callback);
	} else {
		element.queue(function (next) {
			$(this)[method]();
			if (callback) {
				callback.call(element[0]);
			}
			next();
		});
	}
};

$.Widget = Widget;

$.widget = function (name, base, prototype) {
	var existingConstructor, constructor, basePrototype;

	// ProxiedPrototype allows the provided prototype to remain unmodified
	// so that it can be used as a mixin for multiple widgets (#8876)
	var proxiedPrototype = {};

	var namespace = name.split(".")[0];
	name = name.split(".")[1];
	var fullName = namespace + "-" + name;

	if (!prototype) {
		prototype = base;
		base = $.Widget;
	}

	if ($.isArray(prototype)) {
		prototype = $.extend.apply(null, [{}].concat(prototype));
	}

	// Create selector for plugin
	$.expr[":"][fullName.toLowerCase()] = function (elem) {
		return !!$.data(elem, fullName);
	};

	$[namespace] = $[namespace] || {};
	existingConstructor = $[namespace][name];
	constructor = $[namespace][name] = function (options, element) {

		// Allow instantiation without "new" keyword
		if (!this._createWidget) {
			return new constructor(options, element);
		}

		// Allow instantiation without initializing for simple inheritance
		// must use "new" keyword (the code above always passes args)
		if (arguments.length) {
			this._createWidget(options, element);
		}
	};

	// Extend with the existing constructor to carry over any static properties
	$.extend(constructor, existingConstructor, {
		version: prototype.version,

		// Copy the object used to create the prototype in case we need to
		// redefine the widget later
		_proto: $.extend({}, prototype),

		// Track widgets that inherit from this widget in case this widget is
		// redefined after a widget inherits from it
		_childConstructors: []
	});

	basePrototype = new base();

	// We need to make the options hash a property directly on the new instance
	// otherwise we'll modify the options hash on the prototype that we're
	// inheriting from
	basePrototype.options = $.widget.extend({}, basePrototype.options);
	$.each(prototype, function (prop, value) {
		if (!$.isFunction(value)) {
			proxiedPrototype[prop] = value;
			return;
		}
		proxiedPrototype[prop] = function () {
			function _super() {
				return base.prototype[prop].apply(this, arguments);
			}

			function _superApply(args) {
				return base.prototype[prop].apply(this, args);
			}

			return function () {
				var __super = this._super;
				var __superApply = this._superApply;
				var returnValue;

				this._super = _super;
				this._superApply = _superApply;

				returnValue = value.apply(this, arguments);

				this._super = __super;
				this._superApply = __superApply;

				return returnValue;
			};
		}();
	});
	constructor.prototype = $.widget.extend(basePrototype, {

		// TODO: remove support for widgetEventPrefix
		// always use the name + a colon as the prefix, e.g., draggable:start
		// don't prefix for widgets that aren't DOM-based
		widgetEventPrefix: existingConstructor ? basePrototype.widgetEventPrefix || name : name
	}, proxiedPrototype, {
		constructor: constructor,
		namespace: namespace,
		widgetName: name,
		widgetFullName: fullName
	});

	// If this widget is being redefined then we need to find all widgets that
	// are inheriting from it and redefine all of them so that they inherit from
	// the new version of this widget. We're essentially trying to replace one
	// level in the prototype chain.
	if (existingConstructor) {
		$.each(existingConstructor._childConstructors, function (i, child) {
			var childPrototype = child.prototype;

			// Redefine the child widget using the same prototype that was
			// originally used, but inherit from the new version of the base
			$.widget(childPrototype.namespace + "." + childPrototype.widgetName, constructor, child._proto);
		});

		// Remove the list of existing child constructors from the old constructor
		// so the old child constructors can be garbage collected
		delete existingConstructor._childConstructors;
	} else {
		base._childConstructors.push(constructor);
	}

	$.widget.bridge(name, constructor);

	return constructor;
};

$.widget.extend = function (target) {
	var input = widgetSlice.call(arguments, 1);
	var inputIndex = 0;
	var inputLength = input.length;
	var key;
	var value;

	for (; inputIndex < inputLength; inputIndex++) {
		for (key in input[inputIndex]) {
			value = input[inputIndex][key];
			if (input[inputIndex].hasOwnProperty(key) && value !== undefined) {

				// Clone objects
				if ($.isPlainObject(value)) {
					target[key] = $.isPlainObject(target[key]) ? $.widget.extend({}, target[key], value) :

					// Don't extend strings, arrays, etc. with objects
					$.widget.extend({}, value);

					// Copy everything else by reference
				} else {
						target[key] = value;
					}
			}
		}
	}
	return target;
};

$.widget.bridge = function (name, object) {
	var fullName = object.prototype.widgetFullName || name;
	$.fn[name] = function (options) {
		var isMethodCall = typeof options === "string";
		var args = widgetSlice.call(arguments, 1);
		var returnValue = this;

		if (isMethodCall) {
			this.each(function () {
				var methodValue;
				var instance = $.data(this, fullName);

				if (options === "instance") {
					returnValue = instance;
					return false;
				}

				if (!instance) {
					return $.error("cannot call methods on " + name + " prior to initialization; " + "attempted to call method '" + options + "'");
				}

				if (!$.isFunction(instance[options]) || options.charAt(0) === "_") {
					return $.error("no such method '" + options + "' for " + name + " widget instance");
				}

				methodValue = instance[options].apply(instance, args);

				if (methodValue !== instance && methodValue !== undefined) {
					returnValue = methodValue && methodValue.jquery ? returnValue.pushStack(methodValue.get()) : methodValue;
					return false;
				}
			});
		} else {

			// Allow multiple hashes to be passed on init
			if (args.length) {
				options = $.widget.extend.apply(null, [options].concat(args));
			}

			this.each(function () {
				var instance = $.data(this, fullName);
				if (instance) {
					instance.option(options || {});
					if (instance._init) {
						instance._init();
					}
				} else {
					$.data(this, fullName, new object(options, this));
				}
			});
		}

		return returnValue;
	};
};

var widget$1 = $.widget;

var ui = {
	version: "1.12.0",
	safeActiveElement: function safeActiveElement(document) {
		var activeElement;

		// Support: IE 9 only
		// IE9 throws an "Unspecified error" accessing document.activeElement from an <iframe>
		try {
			activeElement = document.activeElement;
		} catch (error) {
			activeElement = document.body;
		}

		// Support: IE 9 - 11 only
		// IE may return null instead of an element
		// Interestingly, this only seems to occur when NOT in an iframe
		if (!activeElement) {
			activeElement = document.body;
		}

		// Support: IE 11 only
		// IE11 returns a seemingly empty object in some cases when accessing
		// document.activeElement from an <iframe>
		if (!activeElement.nodeName) {
			activeElement = document.body;
		}

		return activeElement;
	},
	safeBlur: function safeBlur(element) {

		// Support: IE9 - 10 only
		// If the <body> is blurred, IE will switch windows, see #9420
		if (element && element.nodeName.toLowerCase() !== "body") {
			$(element).trigger("blur");
		}
	}
};

$.ui = ui;

var intersect = $.ui.intersect = function () {
	function isOverAxis(x, reference, size) {
		return x >= reference && x < reference + size;
	}

	return function (draggable, droppable, toleranceMode, event) {

		if (!droppable.offset) {
			return false;
		}

		var x1 = (draggable.positionAbs || draggable.position.absolute).left + draggable.margins.left,
		    y1 = (draggable.positionAbs || draggable.position.absolute).top + draggable.margins.top,
		    x2 = x1 + draggable.helperProportions.width,
		    y2 = y1 + draggable.helperProportions.height,
		    l = droppable.offset.left,
		    t = droppable.offset.top,
		    r = l + droppable.proportions().width,
		    b = t + droppable.proportions().height;

		switch (toleranceMode) {
			case "fit":
				return l <= x1 && x2 <= r && t <= y1 && y2 <= b;
			case "intersect":
				return l < x1 + draggable.helperProportions.width / 2 && // Right Half
				x2 - draggable.helperProportions.width / 2 < r && // Left Half
				t < y1 + draggable.helperProportions.height / 2 && // Bottom Half
				y2 - draggable.helperProportions.height / 2 < b; // Top Half
			case "pointer":
				return isOverAxis(event.pageY, t, droppable.proportions().height) && isOverAxis(event.pageX, l, droppable.proportions().width);
			case "touch":
				return (y1 >= t && y1 <= b || // Top edge touching
				y2 >= t && y2 <= b || // Bottom edge touching
				y1 < t && y2 > b // Surrounded vertically
				) && (x1 >= l && x1 <= r || // Left edge touching
				x2 >= l && x2 <= r || // Right edge touching
				x1 < l && x2 > r // Surrounded horizontally
				);
			default:
				return false;
		}
	};
}();

(function (global, jQuery) {
	var cachedScrollbarWidth,
	    _supportsOffsetFractions,
	    max = Math.max,
	    abs = Math.abs,
	    round = Math.round,
	    rhorizontal = /left|center|right/,
	    rvertical = /top|center|bottom/,
	    roffset = /[\+\-]\d+(\.[\d]+)?%?/,
	    rposition = /^\w+/,
	    rpercent = /%jQuery/,
	    _position = jQuery.fn.position;

	// Support: IE <=9 only
	_supportsOffsetFractions = function supportsOffsetFractions() {
		var element = jQuery("<div>").css("position", "absolute").appendTo("body").offset({
			top: 1.5,
			left: 1.5
		}),
		    support = element.offset().top === 1.5;

		element.remove();

		_supportsOffsetFractions = function supportsOffsetFractions() {
			return support;
		};

		return support;
	};

	function getOffsets(offsets, width, height) {
		return [parseFloat(offsets[0]) * (rpercent.test(offsets[0]) ? width / 100 : 1), parseFloat(offsets[1]) * (rpercent.test(offsets[1]) ? height / 100 : 1)];
	}

	function parseCss(element, property) {
		return parseInt(jQuery.css(element, property), 10) || 0;
	}

	function getDimensions(elem) {
		var raw = elem[0];
		if (raw.nodeType === 9) {
			return {
				width: elem.width(),
				height: elem.height(),
				offset: {
					top: 0,
					left: 0
				}
			};
		}
		if (jQuery.isglobal(raw)) {
			return {
				width: elem.width(),
				height: elem.height(),
				offset: {
					top: elem.scrollTop(),
					left: elem.scrollLeft()
				}
			};
		}
		if (raw.preventDefault) {
			return {
				width: 0,
				height: 0,
				offset: {
					top: raw.pageY,
					left: raw.pageX
				}
			};
		}
		return {
			width: elem.outerWidth(),
			height: elem.outerHeight(),
			offset: elem.offset()
		};
	}

	jQuery.position = {
		scrollbarWidth: function scrollbarWidth() {
			if (cachedScrollbarWidth !== undefined) {
				return cachedScrollbarWidth;
			}
			var w1,
			    w2,
			    div = jQuery("<div " + "style='display:block;position:absolute;width:50px;height:50px;overflow:hidden;'>" + "<div style='height:100px;width:auto;'></div></div>"),
			    innerDiv = div.children()[0];

			jQuery("body").append(div);
			w1 = innerDiv.offsetWidth;
			div.css("overflow", "scroll");

			w2 = innerDiv.offsetWidth;

			if (w1 === w2) {
				w2 = div[0].clientWidth;
			}

			div.remove();

			return cachedScrollbarWidth = w1 - w2;
		},
		getScrollInfo: function getScrollInfo(within) {
			var overflowX = within.isglobal || within.isDocument ? "" : within.element.css("overflow-x"),
			    overflowY = within.isglobal || within.isDocument ? "" : within.element.css("overflow-y"),
			    hasOverflowX = overflowX === "scroll" || overflowX === "auto" && within.width < within.element[0].scrollWidth,
			    hasOverflowY = overflowY === "scroll" || overflowY === "auto" && within.height < within.element[0].scrollHeight;
			return {
				width: hasOverflowY ? jQuery.position.scrollbarWidth() : 0,
				height: hasOverflowX ? jQuery.position.scrollbarWidth() : 0
			};
		},
		getWithinInfo: function getWithinInfo(element) {
			var withinElement = jQuery(element || global),
			    isglobal = jQuery.isglobal(withinElement[0]),
			    isDocument = !!withinElement[0] && withinElement[0].nodeType === 9,
			    hasOffset = !isglobal && !isDocument;
			return {
				element: withinElement,
				isglobal: isglobal,
				isDocument: isDocument,
				offset: hasOffset ? jQuery(element).offset() : {
					left: 0,
					top: 0
				},
				scrollLeft: withinElement.scrollLeft(),
				scrollTop: withinElement.scrollTop(),
				width: withinElement.outerWidth(),
				height: withinElement.outerHeight()
			};
		}
	};

	jQuery.fn.position = function (options) {
		if (!options || !options.of) {
			return _position.apply(this, arguments);
		}

		// Make a copy, we don't want to modify arguments
		options = jQuery.extend({}, options);

		var atOffset,
		    targetWidth,
		    targetHeight,
		    targetOffset,
		    basePosition,
		    dimensions,
		    target = jQuery(options.of),
		    within = jQuery.position.getWithinInfo(options.within),
		    scrollInfo = jQuery.position.getScrollInfo(within),
		    collision = (options.collision || "flip").split(" "),
		    offsets = {};

		dimensions = getDimensions(target);
		if (target[0].preventDefault) {

			// Force left top to allow flipping
			options.at = "left top";
		}
		targetWidth = dimensions.width;
		targetHeight = dimensions.height;
		targetOffset = dimensions.offset;

		// Clone to reuse original targetOffset later
		basePosition = jQuery.extend({}, targetOffset);

		// Force my and at to have valid horizontal and vertical positions
		// if a value is missing or invalid, it will be converted to center
		jQuery.each(["my", "at"], function () {
			var pos = (options[this] || "").split(" "),
			    horizontalOffset,
			    verticalOffset;

			if (pos.length === 1) {
				pos = rhorizontal.test(pos[0]) ? pos.concat(["center"]) : rvertical.test(pos[0]) ? ["center"].concat(pos) : ["center", "center"];
			}
			pos[0] = rhorizontal.test(pos[0]) ? pos[0] : "center";
			pos[1] = rvertical.test(pos[1]) ? pos[1] : "center";

			// Calculate offsets
			horizontalOffset = roffset.exec(pos[0]);
			verticalOffset = roffset.exec(pos[1]);
			offsets[this] = [horizontalOffset ? horizontalOffset[0] : 0, verticalOffset ? verticalOffset[0] : 0];

			// Reduce to just the positions without the offsets
			options[this] = [rposition.exec(pos[0])[0], rposition.exec(pos[1])[0]];
		});

		// Normalize collision option
		if (collision.length === 1) {
			collision[1] = collision[0];
		}

		if (options.at[0] === "right") {
			basePosition.left += targetWidth;
		} else if (options.at[0] === "center") {
			basePosition.left += targetWidth / 2;
		}

		if (options.at[1] === "bottom") {
			basePosition.top += targetHeight;
		} else if (options.at[1] === "center") {
			basePosition.top += targetHeight / 2;
		}

		atOffset = getOffsets(offsets.at, targetWidth, targetHeight);
		basePosition.left += atOffset[0];
		basePosition.top += atOffset[1];

		return this.each(function () {
			var collisionPosition,
			    using,
			    elem = jQuery(this),
			    elemWidth = elem.outerWidth(),
			    elemHeight = elem.outerHeight(),
			    marginLeft = parseCss(this, "marginLeft"),
			    marginTop = parseCss(this, "marginTop"),
			    collisionWidth = elemWidth + marginLeft + parseCss(this, "marginRight") + scrollInfo.width,
			    collisionHeight = elemHeight + marginTop + parseCss(this, "marginBottom") + scrollInfo.height,
			    position = jQuery.extend({}, basePosition),
			    myOffset = getOffsets(offsets.my, elem.outerWidth(), elem.outerHeight());

			if (options.my[0] === "right") {
				position.left -= elemWidth;
			} else if (options.my[0] === "center") {
				position.left -= elemWidth / 2;
			}

			if (options.my[1] === "bottom") {
				position.top -= elemHeight;
			} else if (options.my[1] === "center") {
				position.top -= elemHeight / 2;
			}

			position.left += myOffset[0];
			position.top += myOffset[1];

			// If the browser doesn't support fractions, then round for consistent results
			if (!_supportsOffsetFractions()) {
				position.left = round(position.left);
				position.top = round(position.top);
			}

			collisionPosition = {
				marginLeft: marginLeft,
				marginTop: marginTop
			};

			jQuery.each(["left", "top"], function (i, dir) {
				if (jQuery.ui.position[collision[i]]) {
					jQuery.ui.position[collision[i]][dir](position, {
						targetWidth: targetWidth,
						targetHeight: targetHeight,
						elemWidth: elemWidth,
						elemHeight: elemHeight,
						collisionPosition: collisionPosition,
						collisionWidth: collisionWidth,
						collisionHeight: collisionHeight,
						offset: [atOffset[0] + myOffset[0], atOffset[1] + myOffset[1]],
						my: options.my,
						at: options.at,
						within: within,
						elem: elem
					});
				}
			});

			if (options.using) {

				// Adds feedback as second argument to using callback, if present
				using = function using(props) {
					var left = targetOffset.left - position.left,
					    right = left + targetWidth - elemWidth,
					    top = targetOffset.top - position.top,
					    bottom = top + targetHeight - elemHeight,
					    feedback = {
						target: {
							element: target,
							left: targetOffset.left,
							top: targetOffset.top,
							width: targetWidth,
							height: targetHeight
						},
						element: {
							element: elem,
							left: position.left,
							top: position.top,
							width: elemWidth,
							height: elemHeight
						},
						horizontal: right < 0 ? "left" : left > 0 ? "right" : "center",
						vertical: bottom < 0 ? "top" : top > 0 ? "bottom" : "middle"
					};
					if (targetWidth < elemWidth && abs(left + right) < targetWidth) {
						feedback.horizontal = "center";
					}
					if (targetHeight < elemHeight && abs(top + bottom) < targetHeight) {
						feedback.vertical = "middle";
					}
					if (max(abs(left), abs(right)) > max(abs(top), abs(bottom))) {
						feedback.important = "horizontal";
					} else {
						feedback.important = "vertical";
					}
					options.using.call(this, props, feedback);
				};
			}

			elem.offset(jQuery.extend(position, {
				using: using
			}));
		});
	};

	jQuery.ui.position = {
		fit: {
			left: function left(position, data) {
				var within = data.within,
				    withinOffset = within.isglobal ? within.scrollLeft : within.offset.left,
				    outerWidth = within.width,
				    collisionPosLeft = position.left - data.collisionPosition.marginLeft,
				    overLeft = withinOffset - collisionPosLeft,
				    overRight = collisionPosLeft + data.collisionWidth - outerWidth - withinOffset,
				    newOverRight;

				// Element is wider than within
				if (data.collisionWidth > outerWidth) {

					// Element is initially over the left side of within
					if (overLeft > 0 && overRight <= 0) {
						newOverRight = position.left + overLeft + data.collisionWidth - outerWidth - withinOffset;
						position.left += overLeft - newOverRight;

						// Element is initially over right side of within
					} else if (overRight > 0 && overLeft <= 0) {
							position.left = withinOffset;

							// Element is initially over both left and right sides of within
						} else {
								if (overLeft > overRight) {
									position.left = withinOffset + outerWidth - data.collisionWidth;
								} else {
									position.left = withinOffset;
								}
							}

					// Too far left -> align with left edge
				} else if (overLeft > 0) {
						position.left += overLeft;

						// Too far right -> align with right edge
					} else if (overRight > 0) {
							position.left -= overRight;

							// Adjust based on position and margin
						} else {
								position.left = max(position.left - collisionPosLeft, position.left);
							}
			},
			top: function top(position, data) {
				var within = data.within,
				    withinOffset = within.isglobal ? within.scrollTop : within.offset.top,
				    outerHeight = data.within.height,
				    collisionPosTop = position.top - data.collisionPosition.marginTop,
				    overTop = withinOffset - collisionPosTop,
				    overBottom = collisionPosTop + data.collisionHeight - outerHeight - withinOffset,
				    newOverBottom;

				// Element is taller than within
				if (data.collisionHeight > outerHeight) {

					// Element is initially over the top of within
					if (overTop > 0 && overBottom <= 0) {
						newOverBottom = position.top + overTop + data.collisionHeight - outerHeight - withinOffset;
						position.top += overTop - newOverBottom;

						// Element is initially over bottom of within
					} else if (overBottom > 0 && overTop <= 0) {
							position.top = withinOffset;

							// Element is initially over both top and bottom of within
						} else {
								if (overTop > overBottom) {
									position.top = withinOffset + outerHeight - data.collisionHeight;
								} else {
									position.top = withinOffset;
								}
							}

					// Too far up -> align with top
				} else if (overTop > 0) {
						position.top += overTop;

						// Too far down -> align with bottom edge
					} else if (overBottom > 0) {
							position.top -= overBottom;

							// Adjust based on position and margin
						} else {
								position.top = max(position.top - collisionPosTop, position.top);
							}
			}
		},
		flip: {
			left: function left(position, data) {
				var within = data.within,
				    withinOffset = within.offset.left + within.scrollLeft,
				    outerWidth = within.width,
				    offsetLeft = within.isglobal ? within.scrollLeft : within.offset.left,
				    collisionPosLeft = position.left - data.collisionPosition.marginLeft,
				    overLeft = collisionPosLeft - offsetLeft,
				    overRight = collisionPosLeft + data.collisionWidth - outerWidth - offsetLeft,
				    myOffset = data.my[0] === "left" ? -data.elemWidth : data.my[0] === "right" ? data.elemWidth : 0,
				    atOffset = data.at[0] === "left" ? data.targetWidth : data.at[0] === "right" ? -data.targetWidth : 0,
				    offset = -2 * data.offset[0],
				    newOverRight,
				    newOverLeft;

				if (overLeft < 0) {
					newOverRight = position.left + myOffset + atOffset + offset + data.collisionWidth - outerWidth - withinOffset;
					if (newOverRight < 0 || newOverRight < abs(overLeft)) {
						position.left += myOffset + atOffset + offset;
					}
				} else if (overRight > 0) {
					newOverLeft = position.left - data.collisionPosition.marginLeft + myOffset + atOffset + offset - offsetLeft;
					if (newOverLeft > 0 || abs(newOverLeft) < overRight) {
						position.left += myOffset + atOffset + offset;
					}
				}
			},
			top: function top(position, data) {
				var within = data.within,
				    withinOffset = within.offset.top + within.scrollTop,
				    outerHeight = within.height,
				    offsetTop = within.isglobal ? within.scrollTop : within.offset.top,
				    collisionPosTop = position.top - data.collisionPosition.marginTop,
				    overTop = collisionPosTop - offsetTop,
				    overBottom = collisionPosTop + data.collisionHeight - outerHeight - offsetTop,
				    top = data.my[1] === "top",
				    myOffset = top ? -data.elemHeight : data.my[1] === "bottom" ? data.elemHeight : 0,
				    atOffset = data.at[1] === "top" ? data.targetHeight : data.at[1] === "bottom" ? -data.targetHeight : 0,
				    offset = -2 * data.offset[1],
				    newOverTop,
				    newOverBottom;
				if (overTop < 0) {
					newOverBottom = position.top + myOffset + atOffset + offset + data.collisionHeight - outerHeight - withinOffset;
					if (newOverBottom < 0 || newOverBottom < abs(overTop)) {
						position.top += myOffset + atOffset + offset;
					}
				} else if (overBottom > 0) {
					newOverTop = position.top - data.collisionPosition.marginTop + myOffset + atOffset + offset - offsetTop;
					if (newOverTop > 0 || abs(newOverTop) < overBottom) {
						position.top += myOffset + atOffset + offset;
					}
				}
			}
		},
		flipfit: {
			left: function left() {
				jQuery.ui.position.flip.left.apply(this, arguments);
				jQuery.ui.position.fit.left.apply(this, arguments);
			},
			top: function top() {
				jQuery.ui.position.flip.top.apply(this, arguments);
				jQuery.ui.position.fit.top.apply(this, arguments);
			}
		}
	};
})(window, $);

$.cleanData = function (orig) {
	return function (elems) {
		var events, elem, i;
		for (i = 0; (elem = elems[i]) != null; i++) {
			try {

				// Only trigger remove when necessary to save time
				events = $._data(elem, "events");
				if (events && events.remove) {
					$(elem).triggerHandler("remove");
				}

				// Http://bugs.jquery.com/ticket/8235
			} catch (e) {}
		}
		orig(elems);
	};
}($.cleanData);

$.extend($.expr[":"], {
	data: $.expr.createPseudo ? $.expr.createPseudo(function (dataName) {
		return function (elem) {
			return !!$.data(elem, dataName);
		};
	}) :

	// Support: jQuery <1.8
	function (elem, i, match) {
		return !!$.data(elem, match[3]);
	}
});

$.fn.scrollParent = function (includeHidden) {
	var position = this.css("position"),
	    excludeStaticParent = position === "absolute",
	    overflowRegex = includeHidden ? /(auto|scroll|hidden)/ : /(auto|scroll)/,
	    scrollParent = this.parents().filter(function () {
		var parent = $(this);
		if (excludeStaticParent && parent.css("position") === "static") {
			return false;
		}
		return overflowRegex.test(parent.css("overflow") + parent.css("overflow-y") + parent.css("overflow-x"));
	}).eq(0);

	return position === "fixed" || !scrollParent.length ? $(this[0].ownerDocument || document) : scrollParent;
};

$.fn.extend({
	disableSelection: function () {
		var eventType = "onselectstart" in document.createElement("div") ? "selectstart" : "mousedown";

		return function () {
			return this.on(eventType + ".ui-disableSelection", function (event) {
				event.preventDefault();
			});
		};
	}(),

	enableSelection: function enableSelection() {
		return this.off(".ui-disableSelection");
	}
});

/*!
 * jQuery UI Mouse 1.12.0
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */

//>>label: Mouse
//>>group: Widgets
//>>description: Abstracts mouse-based interactions to assist in creating certain widgets.
//>>docs: http://api.jqueryui.com/mouse/

var mouseHandled = false;
$(document).on("mouseup", function () {
	mouseHandled = false;
});

widget$1("ui.mouse", {
	version: "1.12.0",
	options: {
		cancel: "input, textarea, button, select, option",
		distance: 1,
		delay: 0
	},
	_mouseInit: function _mouseInit() {
		var that = this;

		this.element.on("mousedown." + this.widgetName, function (event) {
			return that._mouseDown(event);
		}).on("click." + this.widgetName, function (event) {
			if (true === $.data(event.target, that.widgetName + ".preventClickEvent")) {
				$.removeData(event.target, that.widgetName + ".preventClickEvent");
				event.stopImmediatePropagation();
				return false;
			}
		});

		this.started = false;
	},

	// TODO: make sure destroying one instance of mouse doesn't mess with
	// other instances of mouse
	_mouseDestroy: function _mouseDestroy() {
		this.element.off("." + this.widgetName);
		if (this._mouseMoveDelegate) {
			this.document.off("mousemove." + this.widgetName, this._mouseMoveDelegate).off("mouseup." + this.widgetName, this._mouseUpDelegate);
		}
	},

	_mouseDown: function _mouseDown(event) {

		// don't let more than one widget handle mouseStart
		if (mouseHandled) {
			return;
		}

		this._mouseMoved = false;

		// We may have missed mouseup (out of window)
		this._mouseStarted && this._mouseUp(event);

		this._mouseDownEvent = event;

		var that = this,
		    btnIsLeft = event.which === 1,


		// event.target.nodeName works around a bug in IE 8 with
		// disabled inputs (#7620)
		elIsCancel = typeof this.options.cancel === "string" && event.target.nodeName ? $(event.target).closest(this.options.cancel).length : false;
		if (!btnIsLeft || elIsCancel || !this._mouseCapture(event)) {
			return true;
		}

		this.mouseDelayMet = !this.options.delay;
		if (!this.mouseDelayMet) {
			this._mouseDelayTimer = setTimeout(function () {
				that.mouseDelayMet = true;
			}, this.options.delay);
		}

		if (this._mouseDistanceMet(event) && this._mouseDelayMet(event)) {
			this._mouseStarted = this._mouseStart(event) !== false;
			if (!this._mouseStarted) {
				event.preventDefault();
				return true;
			}
		}

		// Click event may never have fired (Gecko & Opera)
		if (true === $.data(event.target, this.widgetName + ".preventClickEvent")) {
			$.removeData(event.target, this.widgetName + ".preventClickEvent");
		}

		// These delegates are required to keep context
		this._mouseMoveDelegate = function (event) {
			return that._mouseMove(event);
		};
		this._mouseUpDelegate = function (event) {
			return that._mouseUp(event);
		};

		this.document.on("mousemove." + this.widgetName, this._mouseMoveDelegate).on("mouseup." + this.widgetName, this._mouseUpDelegate);

		event.preventDefault();

		mouseHandled = true;
		return true;
	},

	_mouseMove: function _mouseMove(event) {

		// Only check for mouseups outside the document if you've moved inside the document
		// at least once. This prevents the firing of mouseup in the case of IE<9, which will
		// fire a mousemove event if content is placed under the cursor. See #7778
		// Support: IE <9
		if (this._mouseMoved) {

			// IE mouseup check - mouseup happened when mouse was out of window
			if ($.ui.ie && (!document.documentMode || document.documentMode < 9) && !event.button) {
				return this._mouseUp(event);

				// Iframe mouseup check - mouseup occurred in another document
			} else if (!event.which) {

					// Support: Safari <=8 - 9
					// Safari sets which to 0 if you press any of the following keys
					// during a drag (#14461)
					if (event.originalEvent.altKey || event.originalEvent.ctrlKey || event.originalEvent.metaKey || event.originalEvent.shiftKey) {
						this.ignoreMissingWhich = true;
					} else if (!this.ignoreMissingWhich) {
						return this._mouseUp(event);
					}
				}
		}

		if (event.which || event.button) {
			this._mouseMoved = true;
		}

		if (this._mouseStarted) {
			this._mouseDrag(event);
			return event.preventDefault();
		}

		if (this._mouseDistanceMet(event) && this._mouseDelayMet(event)) {
			this._mouseStarted = this._mouseStart(this._mouseDownEvent, event) !== false;
			this._mouseStarted ? this._mouseDrag(event) : this._mouseUp(event);
		}

		return !this._mouseStarted;
	},

	_mouseUp: function _mouseUp(event) {
		this.document.off("mousemove." + this.widgetName, this._mouseMoveDelegate).off("mouseup." + this.widgetName, this._mouseUpDelegate);

		if (this._mouseStarted) {
			this._mouseStarted = false;

			if (event.target === this._mouseDownEvent.target) {
				$.data(event.target, this.widgetName + ".preventClickEvent", true);
			}

			this._mouseStop(event);
		}

		if (this._mouseDelayTimer) {
			clearTimeout(this._mouseDelayTimer);
			delete this._mouseDelayTimer;
		}

		this.ignoreMissingWhich = false;
		mouseHandled = false;
		event.preventDefault();
	},

	_mouseDistanceMet: function _mouseDistanceMet(event) {
		return Math.max(Math.abs(this._mouseDownEvent.pageX - event.pageX), Math.abs(this._mouseDownEvent.pageY - event.pageY)) >= this.options.distance;
	},

	_mouseDelayMet: function _mouseDelayMet() /* event */{
		return this.mouseDelayMet;
	},

	// These are placeholder methods, to be overriden by extending plugin
	_mouseStart: function _mouseStart() /* event */{},
	_mouseDrag: function _mouseDrag() /* event */{},
	_mouseStop: function _mouseStop() /* event */{},
	_mouseCapture: function _mouseCapture() /* event */{
		return true;
	}
});

var mouse = $.ui.mouse;

ui.plugin = {
	add: function add(module, option, set) {
		var i,
		    proto = ui[module].prototype;
		for (i in set) {
			proto.plugins[i] = proto.plugins[i] || [];
			proto.plugins[i].push([option, set[i]]);
		}
	},
	call: function call(instance, name, args, allowDisconnected) {
		var i,
		    set = instance.plugins[name];

		if (!set) {
			return;
		}

		if (!allowDisconnected && (!instance.element[0].parentNode || instance.element[0].parentNode.nodeType === 11)) {
			return;
		}

		for (i = 0; i < set.length; i++) {
			if (instance.options[set[i][0]]) {
				set[i][1].apply(instance.element, args);
			}
		}
	}
};

var plugin = ui.plugin;

/*!
 * jQuery UI Draggable 1.12.0
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */

//>>label: Draggable
//>>group: Interactions
//>>description: Enables dragging functionality for any element.
//>>docs: http://api.jqueryui.com/draggable/
//>>demos: http://jqueryui.com/draggable/
//>>css.structure: ../../themes/base/draggable.css

widget$1("ui.draggable", mouse, {
	version: "1.12.0",
	widgetEventPrefix: "drag",
	options: {
		addClasses: true,
		appendTo: "parent",
		axis: false,
		connectToSortable: false,
		containment: false,
		cursor: "auto",
		cursorAt: false,
		grid: false,
		handle: false,
		helper: "original",
		iframeFix: false,
		opacity: false,
		refreshPositions: false,
		revert: false,
		revertDuration: 500,
		scope: "default",
		scroll: true,
		scrollSensitivity: 20,
		scrollSpeed: 20,
		snap: false,
		snapMode: "both",
		snapTolerance: 20,
		stack: false,
		zIndex: false,

		// Callbacks
		drag: null,
		start: null,
		stop: null
	},
	_create: function _create() {

		if (this.options.helper === "original") {
			this._setPositionRelative();
		}
		if (this.options.addClasses) {
			this._addClass("ui-draggable");
		}
		this._setHandleClassName();

		this._mouseInit();
	},

	_setOption: function _setOption(key, value) {
		this._super(key, value);
		if (key === "handle") {
			this._removeHandleClassName();
			this._setHandleClassName();
		}
	},

	_destroy: function _destroy() {
		if ((this.helper || this.element).is(".ui-draggable-dragging")) {
			this.destroyOnClear = true;
			return;
		}
		this._removeHandleClassName();
		this._mouseDestroy();
	},

	_mouseCapture: function _mouseCapture(event) {
		var o = this.options;

		this._blurActiveElement(event);

		// Among others, prevent a drag on a resizable-handle
		if (this.helper || o.disabled || $(event.target).closest(".ui-resizable-handle").length > 0) {
			return false;
		}

		//Quit if we're not on a valid handle
		this.handle = this._getHandle(event);
		if (!this.handle) {
			return false;
		}

		this._blockFrames(o.iframeFix === true ? "iframe" : o.iframeFix);

		return true;
	},

	_blockFrames: function _blockFrames(selector) {
		this.iframeBlocks = this.document.find(selector).map(function () {
			var iframe = $(this);

			return $("<div>").css("position", "absolute").appendTo(iframe.parent()).outerWidth(iframe.outerWidth()).outerHeight(iframe.outerHeight()).offset(iframe.offset())[0];
		});
	},

	_unblockFrames: function _unblockFrames() {
		if (this.iframeBlocks) {
			this.iframeBlocks.remove();
			delete this.iframeBlocks;
		}
	},

	_blurActiveElement: function _blurActiveElement(event) {
		var activeElement = $.ui.safeActiveElement(this.document[0]),
		    target = $(event.target);

		// Only blur if the event occurred on an element that is:
		// 1) within the draggable handle
		// 2) but not within the currently focused element
		// See #10527, #12472
		if (this._getHandle(event) && target.closest(activeElement).length) {
			return;
		}

		// Blur any element that currently has focus, see #4261
		$.ui.safeBlur(activeElement);
	},

	_mouseStart: function _mouseStart(event) {

		var o = this.options;

		//Create and append the visible helper
		this.helper = this._createHelper(event);

		this._addClass(this.helper, "ui-draggable-dragging");

		//Cache the helper size
		this._cacheHelperProportions();

		//If ddmanager is used for droppables, set the global draggable
		if ($.ui.ddmanager) {
			$.ui.ddmanager.current = this;
		}

		/*
   * - Position generation -
   * This block generates everything position related - it's the core of draggables.
   */

		//Cache the margins of the original element
		this._cacheMargins();

		//Store the helper's css position
		this.cssPosition = this.helper.css("position");
		this.scrollParent = this.helper.scrollParent(true);
		this.offsetParent = this.helper.offsetParent();
		this.hasFixedAncestor = this.helper.parents().filter(function () {
			return $(this).css("position") === "fixed";
		}).length > 0;

		//The element's absolute position on the page minus margins
		this.positionAbs = this.element.offset();
		this._refreshOffsets(event);

		//Generate the original position
		this.originalPosition = this.position = this._generatePosition(event, false);
		this.originalPageX = event.pageX;
		this.originalPageY = event.pageY;

		//Adjust the mouse offset relative to the helper if "cursorAt" is supplied
		o.cursorAt && this._adjustOffsetFromHelper(o.cursorAt);

		//Set a containment if given in the options
		this._setContainment();

		//Trigger event + callbacks
		if (this._trigger("start", event) === false) {
			this._clear();
			return false;
		}

		//Recache the helper size
		this._cacheHelperProportions();

		//Prepare the droppable offsets
		if ($.ui.ddmanager && !o.dropBehaviour) {
			$.ui.ddmanager.prepareOffsets(this, event);
		}

		// Execute the drag once - this causes the helper not to be visible before getting its
		// correct position
		this._mouseDrag(event, true);

		// If the ddmanager is used for droppables, inform the manager that dragging has started
		// (see #5003)
		if ($.ui.ddmanager) {
			$.ui.ddmanager.dragStart(this, event);
		}

		return true;
	},

	_refreshOffsets: function _refreshOffsets(event) {
		this.offset = {
			top: this.positionAbs.top - this.margins.top,
			left: this.positionAbs.left - this.margins.left,
			scroll: false,
			parent: this._getParentOffset(),
			relative: this._getRelativeOffset()
		};

		this.offset.click = {
			left: event.pageX - this.offset.left,
			top: event.pageY - this.offset.top
		};
	},

	_mouseDrag: function _mouseDrag(event, noPropagation) {

		// reset any necessary cached properties (see #5009)
		if (this.hasFixedAncestor) {
			this.offset.parent = this._getParentOffset();
		}

		//Compute the helpers position
		this.position = this._generatePosition(event, true);
		this.positionAbs = this._convertPositionTo("absolute");

		//Call plugins and callbacks and use the resulting position if something is returned
		if (!noPropagation) {
			var ui$$1 = this._uiHash();
			if (this._trigger("drag", event, ui$$1) === false) {
				this._mouseUp(new $.Event("mouseup", event));
				return false;
			}
			this.position = ui$$1.position;
		}

		this.helper[0].style.left = this.position.left + "px";
		this.helper[0].style.top = this.position.top + "px";

		if ($.ui.ddmanager) {
			$.ui.ddmanager.drag(this, event);
		}

		return false;
	},

	_mouseStop: function _mouseStop(event) {

		//If we are using droppables, inform the manager about the drop
		var that = this,
		    dropped = false;
		if ($.ui.ddmanager && !this.options.dropBehaviour) {
			dropped = $.ui.ddmanager.drop(this, event);
		}

		//if a drop comes from outside (a sortable)
		if (this.dropped) {
			dropped = this.dropped;
			this.dropped = false;
		}

		if (this.options.revert === "invalid" && !dropped || this.options.revert === "valid" && dropped || this.options.revert === true || $.isFunction(this.options.revert) && this.options.revert.call(this.element, dropped)) {
			$(this.helper).animate(this.originalPosition, parseInt(this.options.revertDuration, 10), function () {
				if (that._trigger("stop", event) !== false) {
					that._clear();
				}
			});
		} else {
			if (this._trigger("stop", event) !== false) {
				this._clear();
			}
		}

		return false;
	},

	_mouseUp: function _mouseUp(event) {
		this._unblockFrames();

		// If the ddmanager is used for droppables, inform the manager that dragging has stopped
		// (see #5003)
		if ($.ui.ddmanager) {
			$.ui.ddmanager.dragStop(this, event);
		}

		// Only need to focus if the event occurred on the draggable itself, see #10527
		if (this.handleElement.is(event.target)) {

			// The interaction is over; whether or not the click resulted in a drag,
			// focus the element
			this.element.trigger("focus");
		}

		return $.ui.mouse.prototype._mouseUp.call(this, event);
	},

	cancel: function cancel() {

		if (this.helper.is(".ui-draggable-dragging")) {
			this._mouseUp(new $.Event("mouseup", {
				target: this.element[0]
			}));
		} else {
			this._clear();
		}

		return this;
	},

	_getHandle: function _getHandle(event) {
		return this.options.handle ? !!$(event.target).closest(this.element.find(this.options.handle)).length : true;
	},

	_setHandleClassName: function _setHandleClassName() {
		this.handleElement = this.options.handle ? this.element.find(this.options.handle) : this.element;
		this._addClass(this.handleElement, "ui-draggable-handle");
	},

	_removeHandleClassName: function _removeHandleClassName() {
		this._removeClass(this.handleElement, "ui-draggable-handle");
	},

	_createHelper: function _createHelper(event) {

		var o = this.options,
		    helperIsFunction = $.isFunction(o.helper),
		    helper = helperIsFunction ? $(o.helper.apply(this.element[0], [event])) : o.helper === "clone" ? this.element.clone().removeAttr("id") : this.element;

		if (!helper.parents("body").length) {
			helper.appendTo(o.appendTo === "parent" ? this.element[0].parentNode : o.appendTo);
		}

		// Http://bugs.jqueryui.com/ticket/9446
		// a helper function can return the original element
		// which wouldn't have been set to relative in _create
		if (helperIsFunction && helper[0] === this.element[0]) {
			this._setPositionRelative();
		}

		if (helper[0] !== this.element[0] && !/(fixed|absolute)/.test(helper.css("position"))) {
			helper.css("position", "absolute");
		}

		return helper;
	},

	_setPositionRelative: function _setPositionRelative() {
		if (!/^(?:r|a|f)/.test(this.element.css("position"))) {
			this.element[0].style.position = "relative";
		}
	},

	_adjustOffsetFromHelper: function _adjustOffsetFromHelper(obj) {
		if (typeof obj === "string") {
			obj = obj.split(" ");
		}
		if ($.isArray(obj)) {
			obj = {
				left: +obj[0],
				top: +obj[1] || 0
			};
		}
		if ("left" in obj) {
			this.offset.click.left = obj.left + this.margins.left;
		}
		if ("right" in obj) {
			this.offset.click.left = this.helperProportions.width - obj.right + this.margins.left;
		}
		if ("top" in obj) {
			this.offset.click.top = obj.top + this.margins.top;
		}
		if ("bottom" in obj) {
			this.offset.click.top = this.helperProportions.height - obj.bottom + this.margins.top;
		}
	},

	_isRootNode: function _isRootNode(element) {
		return (/(html|body)/i.test(element.tagName) || element === this.document[0]
		);
	},

	_getParentOffset: function _getParentOffset() {

		//Get the offsetParent and cache its position
		var po = this.offsetParent.offset(),
		    document = this.document[0];

		// This is a special case where we need to modify a offset calculated on start, since the
		// following happened:
		// 1. The position of the helper is absolute, so it's position is calculated based on the
		// next positioned parent
		// 2. The actual offset parent is a child of the scroll parent, and the scroll parent isn't
		// the document, which means that the scroll is included in the initial calculation of the
		// offset of the parent, and never recalculated upon drag
		if (this.cssPosition === "absolute" && this.scrollParent[0] !== document && $.contains(this.scrollParent[0], this.offsetParent[0])) {
			po.left += this.scrollParent.scrollLeft();
			po.top += this.scrollParent.scrollTop();
		}

		if (this._isRootNode(this.offsetParent[0])) {
			po = {
				top: 0,
				left: 0
			};
		}

		return {
			top: po.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
			left: po.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
		};
	},

	_getRelativeOffset: function _getRelativeOffset() {
		if (this.cssPosition !== "relative") {
			return {
				top: 0,
				left: 0
			};
		}

		var p = this.element.position(),
		    scrollIsRootNode = this._isRootNode(this.scrollParent[0]);

		return {
			top: p.top - (parseInt(this.helper.css("top"), 10) || 0) + (!scrollIsRootNode ? this.scrollParent.scrollTop() : 0),
			left: p.left - (parseInt(this.helper.css("left"), 10) || 0) + (!scrollIsRootNode ? this.scrollParent.scrollLeft() : 0)
		};
	},

	_cacheMargins: function _cacheMargins() {
		this.margins = {
			left: parseInt(this.element.css("marginLeft"), 10) || 0,
			top: parseInt(this.element.css("marginTop"), 10) || 0,
			right: parseInt(this.element.css("marginRight"), 10) || 0,
			bottom: parseInt(this.element.css("marginBottom"), 10) || 0
		};
	},

	_cacheHelperProportions: function _cacheHelperProportions() {
		this.helperProportions = {
			width: this.helper.outerWidth(),
			height: this.helper.outerHeight()
		};
	},

	_setContainment: function _setContainment() {

		var isUserScrollable,
		    c,
		    ce,
		    o = this.options,
		    document = this.document[0];

		this.relativeContainer = null;

		if (!o.containment) {
			this.containment = null;
			return;
		}

		if (o.containment === "window") {
			this.containment = [$(window).scrollLeft() - this.offset.relative.left - this.offset.parent.left, $(window).scrollTop() - this.offset.relative.top - this.offset.parent.top, $(window).scrollLeft() + $(window).width() - this.helperProportions.width - this.margins.left, $(window).scrollTop() + ($(window).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top];
			return;
		}

		if (o.containment === "document") {
			this.containment = [0, 0, $(document).width() - this.helperProportions.width - this.margins.left, ($(document).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top];
			return;
		}

		if (o.containment.constructor === Array) {
			this.containment = o.containment;
			return;
		}

		if (o.containment === "parent") {
			o.containment = this.helper[0].parentNode;
		}

		c = $(o.containment);
		ce = c[0];

		if (!ce) {
			return;
		}

		isUserScrollable = /(scroll|auto)/.test(c.css("overflow"));

		this.containment = [(parseInt(c.css("borderLeftWidth"), 10) || 0) + (parseInt(c.css("paddingLeft"), 10) || 0), (parseInt(c.css("borderTopWidth"), 10) || 0) + (parseInt(c.css("paddingTop"), 10) || 0), (isUserScrollable ? Math.max(ce.scrollWidth, ce.offsetWidth) : ce.offsetWidth) - (parseInt(c.css("borderRightWidth"), 10) || 0) - (parseInt(c.css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left - this.margins.right, (isUserScrollable ? Math.max(ce.scrollHeight, ce.offsetHeight) : ce.offsetHeight) - (parseInt(c.css("borderBottomWidth"), 10) || 0) - (parseInt(c.css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top - this.margins.bottom];
		this.relativeContainer = c;
	},

	_convertPositionTo: function _convertPositionTo(d, pos) {

		if (!pos) {
			pos = this.position;
		}

		var mod = d === "absolute" ? 1 : -1,
		    scrollIsRootNode = this._isRootNode(this.scrollParent[0]);

		return {
			top:

			// The absolute mouse position
			pos.top +

			// Only for relative positioned nodes: Relative offset from element to offset parent
			this.offset.relative.top * mod +

			// The offsetParent's offset without borders (offset + border)
			this.offset.parent.top * mod - (this.cssPosition === "fixed" ? -this.offset.scroll.top : scrollIsRootNode ? 0 : this.offset.scroll.top) * mod,
			left:

			// The absolute mouse position
			pos.left +

			// Only for relative positioned nodes: Relative offset from element to offset parent
			this.offset.relative.left * mod +

			// The offsetParent's offset without borders (offset + border)
			this.offset.parent.left * mod - (this.cssPosition === "fixed" ? -this.offset.scroll.left : scrollIsRootNode ? 0 : this.offset.scroll.left) * mod
		};
	},

	_generatePosition: function _generatePosition(event, constrainPosition) {

		var containment,
		    co,
		    top,
		    left,
		    o = this.options,
		    scrollIsRootNode = this._isRootNode(this.scrollParent[0]),
		    pageX = event.pageX,
		    pageY = event.pageY;

		// Cache the scroll
		if (!scrollIsRootNode || !this.offset.scroll) {
			this.offset.scroll = {
				top: this.scrollParent.scrollTop(),
				left: this.scrollParent.scrollLeft()
			};
		}

		/*
   * - Position constraining -
   * Constrain the position to a mix of grid, containment.
   */

		// If we are not dragging yet, we won't check for options
		if (constrainPosition) {
			if (this.containment) {
				if (this.relativeContainer) {
					co = this.relativeContainer.offset();
					containment = [this.containment[0] + co.left, this.containment[1] + co.top, this.containment[2] + co.left, this.containment[3] + co.top];
				} else {
					containment = this.containment;
				}

				if (event.pageX - this.offset.click.left < containment[0]) {
					pageX = containment[0] + this.offset.click.left;
				}
				if (event.pageY - this.offset.click.top < containment[1]) {
					pageY = containment[1] + this.offset.click.top;
				}
				if (event.pageX - this.offset.click.left > containment[2]) {
					pageX = containment[2] + this.offset.click.left;
				}
				if (event.pageY - this.offset.click.top > containment[3]) {
					pageY = containment[3] + this.offset.click.top;
				}
			}

			if (o.grid) {

				//Check for grid elements set to 0 to prevent divide by 0 error causing invalid
				// argument errors in IE (see ticket #6950)
				top = o.grid[1] ? this.originalPageY + Math.round((pageY - this.originalPageY) / o.grid[1]) * o.grid[1] : this.originalPageY;
				pageY = containment ? top - this.offset.click.top >= containment[1] || top - this.offset.click.top > containment[3] ? top : top - this.offset.click.top >= containment[1] ? top - o.grid[1] : top + o.grid[1] : top;

				left = o.grid[0] ? this.originalPageX + Math.round((pageX - this.originalPageX) / o.grid[0]) * o.grid[0] : this.originalPageX;
				pageX = containment ? left - this.offset.click.left >= containment[0] || left - this.offset.click.left > containment[2] ? left : left - this.offset.click.left >= containment[0] ? left - o.grid[0] : left + o.grid[0] : left;
			}

			if (o.axis === "y") {
				pageX = this.originalPageX;
			}

			if (o.axis === "x") {
				pageY = this.originalPageY;
			}
		}

		return {
			top:

			// The absolute mouse position
			pageY -

			// Click offset (relative to the element)
			this.offset.click.top -

			// Only for relative positioned nodes: Relative offset from element to offset parent
			this.offset.relative.top -

			// The offsetParent's offset without borders (offset + border)
			this.offset.parent.top + (this.cssPosition === "fixed" ? -this.offset.scroll.top : scrollIsRootNode ? 0 : this.offset.scroll.top),
			left:

			// The absolute mouse position
			pageX -

			// Click offset (relative to the element)
			this.offset.click.left -

			// Only for relative positioned nodes: Relative offset from element to offset parent
			this.offset.relative.left -

			// The offsetParent's offset without borders (offset + border)
			this.offset.parent.left + (this.cssPosition === "fixed" ? -this.offset.scroll.left : scrollIsRootNode ? 0 : this.offset.scroll.left)
		};
	},

	_clear: function _clear() {
		this._removeClass(this.helper, "ui-draggable-dragging");
		if (this.helper[0] !== this.element[0] && !this.cancelHelperRemoval) {
			this.helper.remove();
		}
		this.helper = null;
		this.cancelHelperRemoval = false;
		if (this.destroyOnClear) {
			this.destroy();
		}
	},

	// From now on bulk stuff - mainly helpers

	_trigger: function _trigger(type, event, ui$$1) {
		ui$$1 = ui$$1 || this._uiHash();
		plugin.call(this, type, [event, ui$$1, this], true);

		// Absolute position and offset (see #6884 ) have to be recalculated after plugins
		if (/^(drag|start|stop)/.test(type)) {
			this.positionAbs = this._convertPositionTo("absolute");
			ui$$1.offset = this.positionAbs;
		}
		return $.Widget.prototype._trigger.call(this, type, event, ui$$1);
	},

	plugins: {},

	_uiHash: function _uiHash() {
		return {
			helper: this.helper,
			position: this.position,
			originalPosition: this.originalPosition,
			offset: this.positionAbs
		};
	}

});

plugin.add("draggable", "connectToSortable", {
	start: function start(event, ui$$1, draggable) {
		var uiSortable = $.extend({}, ui$$1, {
			item: draggable.element
		});

		draggable.sortables = [];
		$(draggable.options.connectToSortable).each(function () {
			var sortable = $(this).sortable("instance");

			if (sortable && !sortable.options.disabled) {
				draggable.sortables.push(sortable);

				// RefreshPositions is called at drag start to refresh the containerCache
				// which is used in drag. This ensures it's initialized and synchronized
				// with any changes that might have happened on the page since initialization.
				sortable.refreshPositions();
				sortable._trigger("activate", event, uiSortable);
			}
		});
	},
	stop: function stop(event, ui$$1, draggable) {
		var uiSortable = $.extend({}, ui$$1, {
			item: draggable.element
		});

		draggable.cancelHelperRemoval = false;

		$.each(draggable.sortables, function () {
			var sortable = this;

			if (sortable.isOver) {
				sortable.isOver = 0;

				// Allow this sortable to handle removing the helper
				draggable.cancelHelperRemoval = true;
				sortable.cancelHelperRemoval = false;

				// Use _storedCSS To restore properties in the sortable,
				// as this also handles revert (#9675) since the draggable
				// may have modified them in unexpected ways (#8809)
				sortable._storedCSS = {
					position: sortable.placeholder.css("position"),
					top: sortable.placeholder.css("top"),
					left: sortable.placeholder.css("left")
				};

				sortable._mouseStop(event);

				// Once drag has ended, the sortable should return to using
				// its original helper, not the shared helper from draggable
				sortable.options.helper = sortable.options._helper;
			} else {

				// Prevent this Sortable from removing the helper.
				// However, don't set the draggable to remove the helper
				// either as another connected Sortable may yet handle the removal.
				sortable.cancelHelperRemoval = true;

				sortable._trigger("deactivate", event, uiSortable);
			}
		});
	},
	drag: function drag(event, ui$$1, draggable) {
		$.each(draggable.sortables, function () {
			var innermostIntersecting = false,
			    sortable = this;

			// Copy over variables that sortable's _intersectsWith uses
			sortable.positionAbs = draggable.positionAbs;
			sortable.helperProportions = draggable.helperProportions;
			sortable.offset.click = draggable.offset.click;

			if (sortable._intersectsWith(sortable.containerCache)) {
				innermostIntersecting = true;

				$.each(draggable.sortables, function () {

					// Copy over variables that sortable's _intersectsWith uses
					this.positionAbs = draggable.positionAbs;
					this.helperProportions = draggable.helperProportions;
					this.offset.click = draggable.offset.click;

					if (this !== sortable && this._intersectsWith(this.containerCache) && $.contains(sortable.element[0], this.element[0])) {
						innermostIntersecting = false;
					}

					return innermostIntersecting;
				});
			}

			if (innermostIntersecting) {

				// If it intersects, we use a little isOver variable and set it once,
				// so that the move-in stuff gets fired only once.
				if (!sortable.isOver) {
					sortable.isOver = 1;

					// Store draggable's parent in case we need to reappend to it later.
					draggable._parent = ui$$1.helper.parent();

					sortable.currentItem = ui$$1.helper.appendTo(sortable.element).data("ui-sortable-item", true);

					// Store helper option to later restore it
					sortable.options._helper = sortable.options.helper;

					sortable.options.helper = function () {
						return ui$$1.helper[0];
					};

					// Fire the start events of the sortable with our passed browser event,
					// and our own helper (so it doesn't create a new one)
					event.target = sortable.currentItem[0];
					sortable._mouseCapture(event, true);
					sortable._mouseStart(event, true, true);

					// Because the browser event is way off the new appended portlet,
					// modify necessary variables to reflect the changes
					sortable.offset.click.top = draggable.offset.click.top;
					sortable.offset.click.left = draggable.offset.click.left;
					sortable.offset.parent.left -= draggable.offset.parent.left - sortable.offset.parent.left;
					sortable.offset.parent.top -= draggable.offset.parent.top - sortable.offset.parent.top;

					draggable._trigger("toSortable", event);

					// Inform draggable that the helper is in a valid drop zone,
					// used solely in the revert option to handle "valid/invalid".
					draggable.dropped = sortable.element;

					// Need to refreshPositions of all sortables in the case that
					// adding to one sortable changes the location of the other sortables (#9675)
					$.each(draggable.sortables, function () {
						this.refreshPositions();
					});

					// Hack so receive/update callbacks work (mostly)
					draggable.currentItem = draggable.element;
					sortable.fromOutside = draggable;
				}

				if (sortable.currentItem) {
					sortable._mouseDrag(event);

					// Copy the sortable's position because the draggable's can potentially reflect
					// a relative position, while sortable is always absolute, which the dragged
					// element has now become. (#8809)
					ui$$1.position = sortable.position;
				}
			} else {

				// If it doesn't intersect with the sortable, and it intersected before,
				// we fake the drag stop of the sortable, but make sure it doesn't remove
				// the helper by using cancelHelperRemoval.
				if (sortable.isOver) {

					sortable.isOver = 0;
					sortable.cancelHelperRemoval = true;

					// Calling sortable's mouseStop would trigger a revert,
					// so revert must be temporarily false until after mouseStop is called.
					sortable.options._revert = sortable.options.revert;
					sortable.options.revert = false;

					sortable._trigger("out", event, sortable._uiHash(sortable));
					sortable._mouseStop(event, true);

					// Restore sortable behaviors that were modfied
					// when the draggable entered the sortable area (#9481)
					sortable.options.revert = sortable.options._revert;
					sortable.options.helper = sortable.options._helper;

					if (sortable.placeholder) {
						sortable.placeholder.remove();
					}

					// Restore and recalculate the draggable's offset considering the sortable
					// may have modified them in unexpected ways. (#8809, #10669)
					ui$$1.helper.appendTo(draggable._parent);
					draggable._refreshOffsets(event);
					ui$$1.position = draggable._generatePosition(event, true);

					draggable._trigger("fromSortable", event);

					// Inform draggable that the helper is no longer in a valid drop zone
					draggable.dropped = false;

					// Need to refreshPositions of all sortables just in case removing
					// from one sortable changes the location of other sortables (#9675)
					$.each(draggable.sortables, function () {
						this.refreshPositions();
					});
				}
			}
		});
	}
});

plugin.add("draggable", "cursor", {
	start: function start(event, ui$$1, instance) {
		var t = $("body"),
		    o = instance.options;

		if (t.css("cursor")) {
			o._cursor = t.css("cursor");
		}
		t.css("cursor", o.cursor);
	},
	stop: function stop(event, ui$$1, instance) {
		var o = instance.options;
		if (o._cursor) {
			$("body").css("cursor", o._cursor);
		}
	}
});

plugin.add("draggable", "opacity", {
	start: function start(event, ui$$1, instance) {
		var t = $(ui$$1.helper),
		    o = instance.options;
		if (t.css("opacity")) {
			o._opacity = t.css("opacity");
		}
		t.css("opacity", o.opacity);
	},
	stop: function stop(event, ui$$1, instance) {
		var o = instance.options;
		if (o._opacity) {
			$(ui$$1.helper).css("opacity", o._opacity);
		}
	}
});

plugin.add("draggable", "scroll", {
	start: function start(event, ui$$1, i) {
		if (!i.scrollParentNotHidden) {
			i.scrollParentNotHidden = i.helper.scrollParent(false);
		}

		if (i.scrollParentNotHidden[0] !== i.document[0] && i.scrollParentNotHidden[0].tagName !== "HTML") {
			i.overflowOffset = i.scrollParentNotHidden.offset();
		}
	},
	drag: function drag(event, ui$$1, i) {

		var o = i.options,
		    scrolled = false,
		    scrollParent = i.scrollParentNotHidden[0],
		    document = i.document[0];

		if (scrollParent !== document && scrollParent.tagName !== "HTML") {
			if (!o.axis || o.axis !== "x") {
				if (i.overflowOffset.top + scrollParent.offsetHeight - event.pageY < o.scrollSensitivity) {
					scrollParent.scrollTop = scrolled = scrollParent.scrollTop + o.scrollSpeed;
				} else if (event.pageY - i.overflowOffset.top < o.scrollSensitivity) {
					scrollParent.scrollTop = scrolled = scrollParent.scrollTop - o.scrollSpeed;
				}
			}

			if (!o.axis || o.axis !== "y") {
				if (i.overflowOffset.left + scrollParent.offsetWidth - event.pageX < o.scrollSensitivity) {
					scrollParent.scrollLeft = scrolled = scrollParent.scrollLeft + o.scrollSpeed;
				} else if (event.pageX - i.overflowOffset.left < o.scrollSensitivity) {
					scrollParent.scrollLeft = scrolled = scrollParent.scrollLeft - o.scrollSpeed;
				}
			}
		} else {

			if (!o.axis || o.axis !== "x") {
				if (event.pageY - $(document).scrollTop() < o.scrollSensitivity) {
					scrolled = $(document).scrollTop($(document).scrollTop() - o.scrollSpeed);
				} else if ($(window).height() - (event.pageY - $(document).scrollTop()) < o.scrollSensitivity) {
					scrolled = $(document).scrollTop($(document).scrollTop() + o.scrollSpeed);
				}
			}

			if (!o.axis || o.axis !== "y") {
				if (event.pageX - $(document).scrollLeft() < o.scrollSensitivity) {
					scrolled = $(document).scrollLeft($(document).scrollLeft() - o.scrollSpeed);
				} else if ($(window).width() - (event.pageX - $(document).scrollLeft()) < o.scrollSensitivity) {
					scrolled = $(document).scrollLeft($(document).scrollLeft() + o.scrollSpeed);
				}
			}
		}

		if (scrolled !== false && $.ui.ddmanager && !o.dropBehaviour) {
			$.ui.ddmanager.prepareOffsets(i, event);
		}
	}
});

plugin.add("draggable", "snap", {
	start: function start(event, ui$$1, i) {

		var o = i.options;

		i.snapElements = [];

		$(o.snap.constructor !== String ? o.snap.items || ":data(ui-draggable)" : o.snap).each(function () {
			var $t = $(this),
			    $o = $t.offset();
			if (this !== i.element[0]) {
				i.snapElements.push({
					item: this,
					width: $t.outerWidth(),
					height: $t.outerHeight(),
					top: $o.top,
					left: $o.left
				});
			}
		});
	},
	drag: function drag(event, ui$$1, inst) {

		var ts,
		    bs,
		    ls,
		    rs,
		    l,
		    r,
		    t,
		    b,
		    i,
		    first,
		    o = inst.options,
		    d = o.snapTolerance,
		    x1 = ui$$1.offset.left,
		    x2 = x1 + inst.helperProportions.width,
		    y1 = ui$$1.offset.top,
		    y2 = y1 + inst.helperProportions.height;

		for (i = inst.snapElements.length - 1; i >= 0; i--) {

			l = inst.snapElements[i].left - inst.margins.left;
			r = l + inst.snapElements[i].width;
			t = inst.snapElements[i].top - inst.margins.top;
			b = t + inst.snapElements[i].height;

			if (x2 < l - d || x1 > r + d || y2 < t - d || y1 > b + d || !$.contains(inst.snapElements[i].item.ownerDocument, inst.snapElements[i].item)) {
				if (inst.snapElements[i].snapping) {
					inst.options.snap.release && inst.options.snap.release.call(inst.element, event, $.extend(inst._uiHash(), {
						snapItem: inst.snapElements[i].item
					}));
				}
				inst.snapElements[i].snapping = false;
				continue;
			}

			if (o.snapMode !== "inner") {
				ts = Math.abs(t - y2) <= d;
				bs = Math.abs(b - y1) <= d;
				ls = Math.abs(l - x2) <= d;
				rs = Math.abs(r - x1) <= d;
				if (ts) {
					ui$$1.position.top = inst._convertPositionTo("relative", {
						top: t - inst.helperProportions.height,
						left: 0
					}).top;
				}
				if (bs) {
					ui$$1.position.top = inst._convertPositionTo("relative", {
						top: b,
						left: 0
					}).top;
				}
				if (ls) {
					ui$$1.position.left = inst._convertPositionTo("relative", {
						top: 0,
						left: l - inst.helperProportions.width
					}).left;
				}
				if (rs) {
					ui$$1.position.left = inst._convertPositionTo("relative", {
						top: 0,
						left: r
					}).left;
				}
			}

			first = ts || bs || ls || rs;

			if (o.snapMode !== "outer") {
				ts = Math.abs(t - y1) <= d;
				bs = Math.abs(b - y2) <= d;
				ls = Math.abs(l - x1) <= d;
				rs = Math.abs(r - x2) <= d;
				if (ts) {
					ui$$1.position.top = inst._convertPositionTo("relative", {
						top: t,
						left: 0
					}).top;
				}
				if (bs) {
					ui$$1.position.top = inst._convertPositionTo("relative", {
						top: b - inst.helperProportions.height,
						left: 0
					}).top;
				}
				if (ls) {
					ui$$1.position.left = inst._convertPositionTo("relative", {
						top: 0,
						left: l
					}).left;
				}
				if (rs) {
					ui$$1.position.left = inst._convertPositionTo("relative", {
						top: 0,
						left: r - inst.helperProportions.width
					}).left;
				}
			}

			if (!inst.snapElements[i].snapping && (ts || bs || ls || rs || first)) {
				inst.options.snap.snap && inst.options.snap.snap.call(inst.element, event, $.extend(inst._uiHash(), {
					snapItem: inst.snapElements[i].item
				}));
			}
			inst.snapElements[i].snapping = ts || bs || ls || rs || first;
		}
	}
});

plugin.add("draggable", "stack", {
	start: function start(event, ui$$1, instance) {
		var min,
		    o = instance.options,
		    group = $.makeArray($(o.stack)).sort(function (a, b) {
			return (parseInt($(a).css("zIndex"), 10) || 0) - (parseInt($(b).css("zIndex"), 10) || 0);
		});

		if (!group.length) {
			return;
		}

		min = parseInt($(group[0]).css("zIndex"), 10) || 0;
		$(group).each(function (i) {
			$(this).css("zIndex", min + i);
		});
		this.css("zIndex", min + group.length);
	}
});

plugin.add("draggable", "zIndex", {
	start: function start(event, ui$$1, instance) {
		var t = $(ui$$1.helper),
		    o = instance.options;

		if (t.css("zIndex")) {
			o._zIndex = t.css("zIndex");
		}
		t.css("zIndex", o.zIndex);
	},
	stop: function stop(event, ui$$1, instance) {
		var o = instance.options;

		if (o._zIndex) {
			$(ui$$1.helper).css("zIndex", o._zIndex);
		}
	}
});

/*!
 * jQuery UI Keycode 1.12.1
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */

//>>label: Keycode
//>>group: Core
//>>description: Provide keycodes as keynames
//>>docs: http://api.jqueryui.com/jQuery.ui.keyCode/

$.ui.keyCode = {
	BACKSPACE: 8,
	COMMA: 188,
	DELETE: 46,
	DOWN: 40,
	END: 35,
	ENTER: 13,
	ESCAPE: 27,
	HOME: 36,
	LEFT: 37,
	PAGE_DOWN: 34,
	PAGE_UP: 33,
	PERIOD: 190,
	RIGHT: 39,
	SPACE: 32,
	TAB: 9,
	UP: 38
};

// jscs:disable maximumLineLength
/* jscs:disable requireCamelCaseOrUpperCaseIdentifiers */
/*!
 * jQuery UI Datepicker 1.12.1
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */

//>>label: Datepicker
//>>group: Widgets
//>>description: Displays a calendar from an input or inline for selecting dates.
//>>docs: http://api.jqueryui.com/datepicker/
//>>demos: http://jqueryui.com/datepicker/
//>>css.structure: ../../themes/base/core.css
//>>css.structure: ../../themes/base/datepicker.css
//>>css.theme: ../../themes/base/theme.css

$.extend($.ui, {
	datepicker: {
		version: "1.12.1"
	}
});

var datepicker_instActive;

function datepicker_getZindex(elem) {
	var position, value;
	while (elem.length && elem[0] !== document) {

		// Ignore z-index if position is set to a value where z-index is ignored by the browser
		// This makes behavior of this function consistent across browsers
		// WebKit always returns auto if the element is positioned
		position = elem.css("position");
		if (position === "absolute" || position === "relative" || position === "fixed") {

			// IE returns 0 when zIndex is not specified
			// other browsers return a string
			// we ignore the case of nested elements with an explicit value of 0
			// <div style="z-index: -10;"><div style="z-index: 0;"></div></div>
			value = parseInt(elem.css("zIndex"), 10);
			if (!isNaN(value) && value !== 0) {
				return value;
			}
		}
		elem = elem.parent();
	}

	return 0;
}
/* Date picker manager.
   Use the singleton instance of this class, $.datepicker, to interact with the date picker.
   Settings for (groups of) date pickers are maintained in an instance object,
   allowing multiple different settings on the same page. */

function Datepicker() {
	this._curInst = null; // The current instance in use
	this._keyEvent = false; // If the last event was a key event
	this._disabledInputs = []; // List of date picker inputs that have been disabled
	this._datepickerShowing = false; // True if the popup picker is showing , false if not
	this._inDialog = false; // True if showing within a "dialog", false if not
	this._mainDivId = "ui-datepicker-div"; // The ID of the main datepicker division
	this._inlineClass = "ui-datepicker-inline"; // The name of the inline marker class
	this._appendClass = "ui-datepicker-append"; // The name of the append marker class
	this._triggerClass = "ui-datepicker-trigger"; // The name of the trigger marker class
	this._dialogClass = "ui-datepicker-dialog"; // The name of the dialog marker class
	this._disableClass = "ui-datepicker-disabled"; // The name of the disabled covering marker class
	this._unselectableClass = "ui-datepicker-unselectable"; // The name of the unselectable cell marker class
	this._currentClass = "ui-datepicker-current-day"; // The name of the current day marker class
	this._dayOverClass = "ui-datepicker-days-cell-over"; // The name of the day hover marker class
	this.regional = []; // Available regional settings, indexed by language code
	this.regional[""] = { // Default regional settings
		closeText: "Done", // Display text for close link
		prevText: "Prev", // Display text for previous month link
		nextText: "Next", // Display text for next month link
		currentText: "Today", // Display text for current month link
		monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"], // Names of months for drop-down and formatting
		monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], // For formatting
		dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], // For formatting
		dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], // For formatting
		dayNamesMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"], // Column headings for days starting at Sunday
		weekHeader: "Wk", // Column header for week of the year
		dateFormat: "mm/dd/yy", // See format options on parseDate
		firstDay: 0, // The first day of the week, Sun = 0, Mon = 1, ...
		isRTL: false, // True if right-to-left language, false if left-to-right
		showMonthAfterYear: false, // True if the year select precedes month, false for month then year
		yearSuffix: "" // Additional text to append to the year in the month headers
	};
	this._defaults = { // Global defaults for all the date picker instances
		showOn: "focus", // "focus" for popup on focus,
		// "button" for trigger button, or "both" for either
		showAnim: "fadeIn", // Name of jQuery animation for popup
		showOptions: {}, // Options for enhanced animations
		defaultDate: null, // Used when field is blank: actual date,
		// +/-number for offset from today, null for today
		appendText: "", // Display text following the input box, e.g. showing the format
		buttonText: "...", // Text for trigger button
		buttonImage: "", // URL for trigger button image
		buttonImageOnly: false, // True if the image appears alone, false if it appears on a button
		hideIfNoPrevNext: false, // True to hide next/previous month links
		// if not applicable, false to just disable them
		navigationAsDateFormat: false, // True if date formatting applied to prev/today/next links
		gotoCurrent: false, // True if today link goes back to current selection instead
		changeMonth: false, // True if month can be selected directly, false if only prev/next
		changeYear: false, // True if year can be selected directly, false if only prev/next
		yearRange: "c-10:c+10", // Range of years to display in drop-down,
		// either relative to today's year (-nn:+nn), relative to currently displayed year
		// (c-nn:c+nn), absolute (nnnn:nnnn), or a combination of the above (nnnn:-n)
		showOtherMonths: false, // True to show dates in other months, false to leave blank
		selectOtherMonths: false, // True to allow selection of dates in other months, false for unselectable
		showWeek: false, // True to show week of the year, false to not show it
		calculateWeek: this.iso8601Week, // How to calculate the week of the year,
		// takes a Date and returns the number of the week for it
		shortYearCutoff: "+10", // Short year values < this are in the current century,
		// > this are in the previous century,
		// string value starting with "+" for current year + value
		minDate: null, // The earliest selectable date, or null for no limit
		maxDate: null, // The latest selectable date, or null for no limit
		duration: "fast", // Duration of display/closure
		beforeShowDay: null, // Function that takes a date and returns an array with
		// [0] = true if selectable, false if not, [1] = custom CSS class name(s) or "",
		// [2] = cell title (optional), e.g. $.datepicker.noWeekends
		beforeShow: null, // Function that takes an input field and
		// returns a set of custom settings for the date picker
		onSelect: null, // Define a callback function when a date is selected
		onChangeMonthYear: null, // Define a callback function when the month or year is changed
		onClose: null, // Define a callback function when the datepicker is closed
		numberOfMonths: 1, // Number of months to show at a time
		showCurrentAtPos: 0, // The position in multipe months at which to show the current month (starting at 0)
		stepMonths: 1, // Number of months to step back/forward
		stepBigMonths: 12, // Number of months to step back/forward for the big links
		altField: "", // Selector for an alternate field to store selected dates into
		altFormat: "", // The date format to use for the alternate field
		constrainInput: true, // The input is constrained by the current date format
		showButtonPanel: false, // True to show button panel, false to not show it
		autoSize: false, // True to size the input for the date format, false to leave as is
		disabled: false // The initial disabled state
	};
	$.extend(this._defaults, this.regional[""]);
	this.regional.en = $.extend(true, {}, this.regional[""]);
	this.regional["en-US"] = $.extend(true, {}, this.regional.en);
	this.dpDiv = datepicker_bindHover($("<div id='" + this._mainDivId + "' class='ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>"));
}

$.extend(Datepicker.prototype, {
	/* Class name added to elements to indicate already configured with a date picker. */
	markerClassName: "hasDatepicker",

	//Keep track of the maximum number of rows displayed (see #7043)
	maxRows: 4,

	// TODO rename to "widget" when switching to widget factory
	_widgetDatepicker: function _widgetDatepicker() {
		return this.dpDiv;
	},

	/* Override the default settings for all instances of the date picker.
  * @param  settings  object - the new settings to use as defaults (anonymous object)
  * @return the manager object
  */
	setDefaults: function setDefaults(settings) {
		datepicker_extendRemove(this._defaults, settings || {});
		return this;
	},

	/* Attach the date picker to a jQuery selection.
  * @param  target	element - the target input field or division or span
  * @param  settings  object - the new settings to use for this date picker instance (anonymous)
  */
	_attachDatepicker: function _attachDatepicker(target, settings) {
		var nodeName, inline, inst;
		nodeName = target.nodeName.toLowerCase();
		inline = nodeName === "div" || nodeName === "span";
		if (!target.id) {
			this.uuid += 1;
			target.id = "dp" + this.uuid;
		}
		inst = this._newInst($(target), inline);
		inst.settings = $.extend({}, settings || {});
		if (nodeName === "input") {
			this._connectDatepicker(target, inst);
		} else if (inline) {
			this._inlineDatepicker(target, inst);
		}
	},

	/* Create a new instance object. */
	_newInst: function _newInst(target, inline) {
		var id = target[0].id.replace(/([^A-Za-z0-9_\-])/g, "\\\\$1"); // escape jQuery meta chars
		return {
			id: id,
			input: target, // associated target
			selectedDay: 0,
			selectedMonth: 0,
			selectedYear: 0, // current selection
			drawMonth: 0,
			drawYear: 0, // month being drawn
			inline: inline, // is datepicker inline or not
			dpDiv: !inline ? this.dpDiv : // presentation div
			datepicker_bindHover($("<div class='" + this._inlineClass + " ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>"))
		};
	},

	/* Attach the date picker to an input field. */
	_connectDatepicker: function _connectDatepicker(target, inst) {
		var input = $(target);
		inst.append = $([]);
		inst.trigger = $([]);
		if (input.hasClass(this.markerClassName)) {
			return;
		}
		this._attachments(input, inst);
		input.addClass(this.markerClassName).on("keydown", this._doKeyDown).on("keypress", this._doKeyPress).on("keyup", this._doKeyUp);
		this._autoSize(inst);
		$.data(target, "datepicker", inst);

		//If disabled option is true, disable the datepicker once it has been attached to the input (see ticket #5665)
		if (inst.settings.disabled) {
			this._disableDatepicker(target);
		}
	},

	/* Make attachments based on settings. */
	_attachments: function _attachments(input, inst) {
		var showOn,
		    buttonText,
		    buttonImage,
		    appendText = this._get(inst, "appendText"),
		    isRTL = this._get(inst, "isRTL");

		if (inst.append) {
			inst.append.remove();
		}
		if (appendText) {
			inst.append = $("<span class='" + this._appendClass + "'>" + appendText + "</span>");
			input[isRTL ? "before" : "after"](inst.append);
		}

		input.off("focus", this._showDatepicker);

		if (inst.trigger) {
			inst.trigger.remove();
		}

		showOn = this._get(inst, "showOn");
		if (showOn === "focus" || showOn === "both") {
			// pop-up date picker when in the marked field
			input.on("focus", this._showDatepicker);
		}
		if (showOn === "button" || showOn === "both") {
			// pop-up date picker when button clicked
			buttonText = this._get(inst, "buttonText");
			buttonImage = this._get(inst, "buttonImage");
			inst.trigger = $(this._get(inst, "buttonImageOnly") ? $("<img/>").addClass(this._triggerClass).attr({
				src: buttonImage,
				alt: buttonText,
				title: buttonText
			}) : $("<button type='button'></button>").addClass(this._triggerClass).html(!buttonImage ? buttonText : $("<img/>").attr({
				src: buttonImage,
				alt: buttonText,
				title: buttonText
			})));
			input[isRTL ? "before" : "after"](inst.trigger);
			inst.trigger.on("click", function () {
				if ($.datepicker._datepickerShowing && $.datepicker._lastInput === input[0]) {
					$.datepicker._hideDatepicker();
				} else if ($.datepicker._datepickerShowing && $.datepicker._lastInput !== input[0]) {
					$.datepicker._hideDatepicker();
					$.datepicker._showDatepicker(input[0]);
				} else {
					$.datepicker._showDatepicker(input[0]);
				}
				return false;
			});
		}
	},

	/* Apply the maximum length for the date format. */
	_autoSize: function _autoSize(inst) {
		if (this._get(inst, "autoSize") && !inst.inline) {
			var findMax,
			    max,
			    maxI,
			    i,
			    date = new Date(2009, 12 - 1, 20),
			    // Ensure double digits
			dateFormat = this._get(inst, "dateFormat");

			if (dateFormat.match(/[DM]/)) {
				findMax = function findMax(names) {
					max = 0;
					maxI = 0;
					for (i = 0; i < names.length; i++) {
						if (names[i].length > max) {
							max = names[i].length;
							maxI = i;
						}
					}
					return maxI;
				};
				date.setMonth(findMax(this._get(inst, dateFormat.match(/MM/) ? "monthNames" : "monthNamesShort")));
				date.setDate(findMax(this._get(inst, dateFormat.match(/DD/) ? "dayNames" : "dayNamesShort")) + 20 - date.getDay());
			}
			inst.input.attr("size", this._formatDate(inst, date).length);
		}
	},

	/* Attach an inline date picker to a div. */
	_inlineDatepicker: function _inlineDatepicker(target, inst) {
		var divSpan = $(target);
		if (divSpan.hasClass(this.markerClassName)) {
			return;
		}
		divSpan.addClass(this.markerClassName).append(inst.dpDiv);
		$.data(target, "datepicker", inst);
		this._setDate(inst, this._getDefaultDate(inst), true);
		this._updateDatepicker(inst);
		this._updateAlternate(inst);

		//If disabled option is true, disable the datepicker before showing it (see ticket #5665)
		if (inst.settings.disabled) {
			this._disableDatepicker(target);
		}

		// Set display:block in place of inst.dpDiv.show() which won't work on disconnected elements
		// http://bugs.jqueryui.com/ticket/7552 - A Datepicker created on a detached div has zero height
		inst.dpDiv.css("display", "block");
	},

	/* Pop-up the date picker in a "dialog" box.
  * @param  input element - ignored
  * @param  date	string or Date - the initial date to display
  * @param  onSelect  function - the function to call when a date is selected
  * @param  settings  object - update the dialog date picker instance's settings (anonymous object)
  * @param  pos int[2] - coordinates for the dialog's position within the screen or
  *					event - with x/y coordinates or
  *					leave empty for default (screen centre)
  * @return the manager object
  */
	_dialogDatepicker: function _dialogDatepicker(input, date, onSelect, settings, pos) {
		var id,
		    browserWidth,
		    browserHeight,
		    scrollX,
		    scrollY,
		    inst = this._dialogInst; // internal instance

		if (!inst) {
			this.uuid += 1;
			id = "dp" + this.uuid;
			this._dialogInput = $("<input type='text' id='" + id + "' style='position: absolute; top: -100px; width: 0px;'/>");
			this._dialogInput.on("keydown", this._doKeyDown);
			$("body").append(this._dialogInput);
			inst = this._dialogInst = this._newInst(this._dialogInput, false);
			inst.settings = {};
			$.data(this._dialogInput[0], "datepicker", inst);
		}
		datepicker_extendRemove(inst.settings, settings || {});
		date = date && date.constructor === Date ? this._formatDate(inst, date) : date;
		this._dialogInput.val(date);

		this._pos = pos ? pos.length ? pos : [pos.pageX, pos.pageY] : null;
		if (!this._pos) {
			browserWidth = document.documentElement.clientWidth;
			browserHeight = document.documentElement.clientHeight;
			scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
			scrollY = document.documentElement.scrollTop || document.body.scrollTop;
			this._pos = // should use actual width/height below
			[browserWidth / 2 - 100 + scrollX, browserHeight / 2 - 150 + scrollY];
		}

		// Move input on screen for focus, but hidden behind dialog
		this._dialogInput.css("left", this._pos[0] + 20 + "px").css("top", this._pos[1] + "px");
		inst.settings.onSelect = onSelect;
		this._inDialog = true;
		this.dpDiv.addClass(this._dialogClass);
		this._showDatepicker(this._dialogInput[0]);
		if ($.blockUI) {
			$.blockUI(this.dpDiv);
		}
		$.data(this._dialogInput[0], "datepicker", inst);
		return this;
	},

	/* Detach a datepicker from its control.
  * @param  target	element - the target input field or division or span
  */
	_destroyDatepicker: function _destroyDatepicker(target) {
		var nodeName,
		    $target = $(target),
		    inst = $.data(target, "datepicker");

		if (!$target.hasClass(this.markerClassName)) {
			return;
		}

		nodeName = target.nodeName.toLowerCase();
		$.removeData(target, "datepicker");
		if (nodeName === "input") {
			inst.append.remove();
			inst.trigger.remove();
			$target.removeClass(this.markerClassName).off("focus", this._showDatepicker).off("keydown", this._doKeyDown).off("keypress", this._doKeyPress).off("keyup", this._doKeyUp);
		} else if (nodeName === "div" || nodeName === "span") {
			$target.removeClass(this.markerClassName).empty();
		}

		if (datepicker_instActive === inst) {
			datepicker_instActive = null;
		}
	},

	/* Enable the date picker to a jQuery selection.
  * @param  target	element - the target input field or division or span
  */
	_enableDatepicker: function _enableDatepicker(target) {
		var nodeName,
		    inline,
		    $target = $(target),
		    inst = $.data(target, "datepicker");

		if (!$target.hasClass(this.markerClassName)) {
			return;
		}

		nodeName = target.nodeName.toLowerCase();
		if (nodeName === "input") {
			target.disabled = false;
			inst.trigger.filter("button").each(function () {
				this.disabled = false;
			}).end().filter("img").css({
				opacity: "1.0",
				cursor: ""
			});
		} else if (nodeName === "div" || nodeName === "span") {
			inline = $target.children("." + this._inlineClass);
			inline.children().removeClass("ui-state-disabled");
			inline.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled", false);
		}
		this._disabledInputs = $.map(this._disabledInputs, function (value) {
			return value === target ? null : value;
		}); // delete entry
	},

	/* Disable the date picker to a jQuery selection.
  * @param  target	element - the target input field or division or span
  */
	_disableDatepicker: function _disableDatepicker(target) {
		var nodeName,
		    inline,
		    $target = $(target),
		    inst = $.data(target, "datepicker");

		if (!$target.hasClass(this.markerClassName)) {
			return;
		}

		nodeName = target.nodeName.toLowerCase();
		if (nodeName === "input") {
			target.disabled = true;
			inst.trigger.filter("button").each(function () {
				this.disabled = true;
			}).end().filter("img").css({
				opacity: "0.5",
				cursor: "default"
			});
		} else if (nodeName === "div" || nodeName === "span") {
			inline = $target.children("." + this._inlineClass);
			inline.children().addClass("ui-state-disabled");
			inline.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled", true);
		}
		this._disabledInputs = $.map(this._disabledInputs, function (value) {
			return value === target ? null : value;
		}); // delete entry
		this._disabledInputs[this._disabledInputs.length] = target;
	},

	/* Is the first field in a jQuery collection disabled as a datepicker?
  * @param  target	element - the target input field or division or span
  * @return boolean - true if disabled, false if enabled
  */
	_isDisabledDatepicker: function _isDisabledDatepicker(target) {
		if (!target) {
			return false;
		}
		for (var i = 0; i < this._disabledInputs.length; i++) {
			if (this._disabledInputs[i] === target) {
				return true;
			}
		}
		return false;
	},

	/* Retrieve the instance data for the target control.
  * @param  target  element - the target input field or division or span
  * @return  object - the associated instance data
  * @throws  error if a jQuery problem getting data
  */
	_getInst: function _getInst(target) {
		try {
			return $.data(target, "datepicker");
		} catch (err) {
			throw "Missing instance data for this datepicker";
		}
	},

	/* Update or retrieve the settings for a date picker attached to an input field or division.
  * @param  target  element - the target input field or division or span
  * @param  name	object - the new settings to update or
  *				string - the name of the setting to change or retrieve,
  *				when retrieving also "all" for all instance settings or
  *				"defaults" for all global defaults
  * @param  value   any - the new value for the setting
  *				(omit if above is an object or to retrieve a value)
  */
	_optionDatepicker: function _optionDatepicker(target, name, value) {
		var settings,
		    date,
		    minDate,
		    maxDate,
		    inst = this._getInst(target);

		if (arguments.length === 2 && typeof name === "string") {
			return name === "defaults" ? $.extend({}, $.datepicker._defaults) : inst ? name === "all" ? $.extend({}, inst.settings) : this._get(inst, name) : null;
		}

		settings = name || {};
		if (typeof name === "string") {
			settings = {};
			settings[name] = value;
		}

		if (inst) {
			if (this._curInst === inst) {
				this._hideDatepicker();
			}

			date = this._getDateDatepicker(target, true);
			minDate = this._getMinMaxDate(inst, "min");
			maxDate = this._getMinMaxDate(inst, "max");
			datepicker_extendRemove(inst.settings, settings);

			// reformat the old minDate/maxDate values if dateFormat changes and a new minDate/maxDate isn't provided
			if (minDate !== null && settings.dateFormat !== undefined && settings.minDate === undefined) {
				inst.settings.minDate = this._formatDate(inst, minDate);
			}
			if (maxDate !== null && settings.dateFormat !== undefined && settings.maxDate === undefined) {
				inst.settings.maxDate = this._formatDate(inst, maxDate);
			}
			if ("disabled" in settings) {
				if (settings.disabled) {
					this._disableDatepicker(target);
				} else {
					this._enableDatepicker(target);
				}
			}
			this._attachments($(target), inst);
			this._autoSize(inst);
			this._setDate(inst, date);
			this._updateAlternate(inst);
			this._updateDatepicker(inst);
		}
	},

	// Change method deprecated
	_changeDatepicker: function _changeDatepicker(target, name, value) {
		this._optionDatepicker(target, name, value);
	},

	/* Redraw the date picker attached to an input field or division.
  * @param  target  element - the target input field or division or span
  */
	_refreshDatepicker: function _refreshDatepicker(target) {
		var inst = this._getInst(target);
		if (inst) {
			this._updateDatepicker(inst);
		}
	},

	/* Set the dates for a jQuery selection.
  * @param  target element - the target input field or division or span
  * @param  date	Date - the new date
  */
	_setDateDatepicker: function _setDateDatepicker(target, date) {
		var inst = this._getInst(target);
		if (inst) {
			this._setDate(inst, date);
			this._updateDatepicker(inst);
			this._updateAlternate(inst);
		}
	},

	/* Get the date(s) for the first entry in a jQuery selection.
  * @param  target element - the target input field or division or span
  * @param  noDefault boolean - true if no default date is to be used
  * @return Date - the current date
  */
	_getDateDatepicker: function _getDateDatepicker(target, noDefault) {
		var inst = this._getInst(target);
		if (inst && !inst.inline) {
			this._setDateFromField(inst, noDefault);
		}
		return inst ? this._getDate(inst) : null;
	},

	/* Handle keystrokes. */
	_doKeyDown: function _doKeyDown(event) {
		var onSelect,
		    dateStr,
		    sel,
		    inst = $.datepicker._getInst(event.target),
		    handled = true,
		    isRTL = inst.dpDiv.is(".ui-datepicker-rtl");

		inst._keyEvent = true;
		if ($.datepicker._datepickerShowing) {
			switch (event.keyCode) {
				case 9:
					$.datepicker._hideDatepicker();
					handled = false;
					break; // hide on tab out
				case 13:
					sel = $("td." + $.datepicker._dayOverClass + ":not(." + $.datepicker._currentClass + ")", inst.dpDiv);
					if (sel[0]) {
						$.datepicker._selectDay(event.target, inst.selectedMonth, inst.selectedYear, sel[0]);
					}

					onSelect = $.datepicker._get(inst, "onSelect");
					if (onSelect) {
						dateStr = $.datepicker._formatDate(inst);

						// Trigger custom callback
						onSelect.apply(inst.input ? inst.input[0] : null, [dateStr, inst]);
					} else {
						$.datepicker._hideDatepicker();
					}

					return false; // don't submit the form
				case 27:
					$.datepicker._hideDatepicker();
					break; // hide on escape
				case 33:
					$.datepicker._adjustDate(event.target, event.ctrlKey ? -$.datepicker._get(inst, "stepBigMonths") : -$.datepicker._get(inst, "stepMonths"), "M");
					break; // previous month/year on page up/+ ctrl
				case 34:
					$.datepicker._adjustDate(event.target, event.ctrlKey ? +$.datepicker._get(inst, "stepBigMonths") : +$.datepicker._get(inst, "stepMonths"), "M");
					break; // next month/year on page down/+ ctrl
				case 35:
					if (event.ctrlKey || event.metaKey) {
						$.datepicker._clearDate(event.target);
					}
					handled = event.ctrlKey || event.metaKey;
					break; // clear on ctrl or command +end
				case 36:
					if (event.ctrlKey || event.metaKey) {
						$.datepicker._gotoToday(event.target);
					}
					handled = event.ctrlKey || event.metaKey;
					break; // current on ctrl or command +home
				case 37:
					if (event.ctrlKey || event.metaKey) {
						$.datepicker._adjustDate(event.target, isRTL ? +1 : -1, "D");
					}
					handled = event.ctrlKey || event.metaKey;

					// -1 day on ctrl or command +left
					if (event.originalEvent.altKey) {
						$.datepicker._adjustDate(event.target, event.ctrlKey ? -$.datepicker._get(inst, "stepBigMonths") : -$.datepicker._get(inst, "stepMonths"), "M");
					}

					// next month/year on alt +left on Mac
					break;
				case 38:
					if (event.ctrlKey || event.metaKey) {
						$.datepicker._adjustDate(event.target, -7, "D");
					}
					handled = event.ctrlKey || event.metaKey;
					break; // -1 week on ctrl or command +up
				case 39:
					if (event.ctrlKey || event.metaKey) {
						$.datepicker._adjustDate(event.target, isRTL ? -1 : +1, "D");
					}
					handled = event.ctrlKey || event.metaKey;

					// +1 day on ctrl or command +right
					if (event.originalEvent.altKey) {
						$.datepicker._adjustDate(event.target, event.ctrlKey ? +$.datepicker._get(inst, "stepBigMonths") : +$.datepicker._get(inst, "stepMonths"), "M");
					}

					// next month/year on alt +right
					break;
				case 40:
					if (event.ctrlKey || event.metaKey) {
						$.datepicker._adjustDate(event.target, +7, "D");
					}
					handled = event.ctrlKey || event.metaKey;
					break; // +1 week on ctrl or command +down
				default:
					handled = false;
			}
		} else if (event.keyCode === 36 && event.ctrlKey) {
			// display the date picker on ctrl+home
			$.datepicker._showDatepicker(this);
		} else {
			handled = false;
		}

		if (handled) {
			event.preventDefault();
			event.stopPropagation();
		}
	},

	/* Filter entered characters - based on date format. */
	_doKeyPress: function _doKeyPress(event) {
		var chars,
		    chr,
		    inst = $.datepicker._getInst(event.target);

		if ($.datepicker._get(inst, "constrainInput")) {
			chars = $.datepicker._possibleChars($.datepicker._get(inst, "dateFormat"));
			chr = String.fromCharCode(event.charCode == null ? event.keyCode : event.charCode);
			return event.ctrlKey || event.metaKey || chr < " " || !chars || chars.indexOf(chr) > -1;
		}
	},

	/* Synchronise manual entry and field/alternate field. */
	_doKeyUp: function _doKeyUp(event) {
		var date,
		    inst = $.datepicker._getInst(event.target);

		if (inst.input.val() !== inst.lastVal) {
			try {
				date = $.datepicker.parseDate($.datepicker._get(inst, "dateFormat"), inst.input ? inst.input.val() : null, $.datepicker._getFormatConfig(inst));

				if (date) {
					// only if valid
					$.datepicker._setDateFromField(inst);
					$.datepicker._updateAlternate(inst);
					$.datepicker._updateDatepicker(inst);
				}
			} catch (err) {}
		}
		return true;
	},

	/* Pop-up the date picker for a given input field.
  * If false returned from beforeShow event handler do not show.
  * @param  input  element - the input field attached to the date picker or
  *					event - if triggered by focus
  */
	_showDatepicker: function _showDatepicker(input) {
		input = input.target || input;
		if (input.nodeName.toLowerCase() !== "input") {
			// find from button/image trigger
			input = $("input", input.parentNode)[0];
		}

		if ($.datepicker._isDisabledDatepicker(input) || $.datepicker._lastInput === input) {
			// already here
			return;
		}

		var inst, beforeShow, beforeShowSettings, isFixed, offset, showAnim, duration;

		inst = $.datepicker._getInst(input);
		if ($.datepicker._curInst && $.datepicker._curInst !== inst) {
			$.datepicker._curInst.dpDiv.stop(true, true);
			if (inst && $.datepicker._datepickerShowing) {
				$.datepicker._hideDatepicker($.datepicker._curInst.input[0]);
			}
		}

		beforeShow = $.datepicker._get(inst, "beforeShow");
		beforeShowSettings = beforeShow ? beforeShow.apply(input, [input, inst]) : {};
		if (beforeShowSettings === false) {
			return;
		}
		datepicker_extendRemove(inst.settings, beforeShowSettings);

		inst.lastVal = null;
		$.datepicker._lastInput = input;
		$.datepicker._setDateFromField(inst);

		if ($.datepicker._inDialog) {
			// hide cursor
			input.value = "";
		}
		if (!$.datepicker._pos) {
			// position below input
			$.datepicker._pos = $.datepicker._findPos(input);
			$.datepicker._pos[1] += input.offsetHeight; // add the height
		}

		isFixed = false;
		$(input).parents().each(function () {
			isFixed |= $(this).css("position") === "fixed";
			return !isFixed;
		});

		offset = {
			left: $.datepicker._pos[0],
			top: $.datepicker._pos[1]
		};
		$.datepicker._pos = null;

		//to avoid flashes on Firefox
		inst.dpDiv.empty();

		// determine sizing offscreen
		inst.dpDiv.css({
			position: "absolute",
			display: "block",
			top: "-1000px"
		});
		$.datepicker._updateDatepicker(inst);

		// fix width for dynamic number of date pickers
		// and adjust position before showing
		offset = $.datepicker._checkOffset(inst, offset, isFixed);
		inst.dpDiv.css({
			position: $.datepicker._inDialog && $.blockUI ? "static" : isFixed ? "fixed" : "absolute",
			display: "none",
			left: offset.left + "px",
			top: offset.top + "px"
		});

		if (!inst.inline) {
			showAnim = $.datepicker._get(inst, "showAnim");
			duration = $.datepicker._get(inst, "duration");
			inst.dpDiv.css("z-index", datepicker_getZindex($(input)) + 1);
			$.datepicker._datepickerShowing = true;

			if ($.effects && $.effects.effect[showAnim]) {
				inst.dpDiv.show(showAnim, $.datepicker._get(inst, "showOptions"), duration);
			} else {
				inst.dpDiv[showAnim || "show"](showAnim ? duration : null);
			}

			if ($.datepicker._shouldFocusInput(inst)) {
				inst.input.trigger("focus");
			}

			$.datepicker._curInst = inst;
		}
	},

	/* Generate the date picker content. */
	_updateDatepicker: function _updateDatepicker(inst) {
		this.maxRows = 4; //Reset the max number of rows being displayed (see #7043)
		datepicker_instActive = inst; // for delegate hover events
		inst.dpDiv.empty().append(this._generateHTML(inst));
		this._attachHandlers(inst);

		var origyearshtml,
		    numMonths = this._getNumberOfMonths(inst),
		    cols = numMonths[1],
		    width = 17,
		    activeCell = inst.dpDiv.find("." + this._dayOverClass + " a");

		if (activeCell.length > 0) {
			datepicker_handleMouseover.apply(activeCell.get(0));
		}

		inst.dpDiv.removeClass("ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4").width("");
		if (cols > 1) {
			inst.dpDiv.addClass("ui-datepicker-multi-" + cols).css("width", width * cols + "em");
		}
		inst.dpDiv[(numMonths[0] !== 1 || numMonths[1] !== 1 ? "add" : "remove") + "Class"]("ui-datepicker-multi");
		inst.dpDiv[(this._get(inst, "isRTL") ? "add" : "remove") + "Class"]("ui-datepicker-rtl");

		if (inst === $.datepicker._curInst && $.datepicker._datepickerShowing && $.datepicker._shouldFocusInput(inst)) {
			inst.input.trigger("focus");
		}

		// Deffered render of the years select (to avoid flashes on Firefox)
		if (inst.yearshtml) {
			origyearshtml = inst.yearshtml;
			setTimeout(function () {

				//assure that inst.yearshtml didn't change.
				if (origyearshtml === inst.yearshtml && inst.yearshtml) {
					inst.dpDiv.find("select.ui-datepicker-year:first").replaceWith(inst.yearshtml);
				}
				origyearshtml = inst.yearshtml = null;
			}, 0);
		}
	},

	// #6694 - don't focus the input if it's already focused
	// this breaks the change event in IE
	// Support: IE and jQuery <1.9
	_shouldFocusInput: function _shouldFocusInput(inst) {
		return inst.input && inst.input.is(":visible") && !inst.input.is(":disabled") && !inst.input.is(":focus");
	},

	/* Check positioning to remain on screen. */
	_checkOffset: function _checkOffset(inst, offset, isFixed) {
		var dpWidth = inst.dpDiv.outerWidth(),
		    dpHeight = inst.dpDiv.outerHeight(),
		    inputWidth = inst.input ? inst.input.outerWidth() : 0,
		    inputHeight = inst.input ? inst.input.outerHeight() : 0,
		    viewWidth = document.documentElement.clientWidth + (isFixed ? 0 : $(document).scrollLeft()),
		    viewHeight = document.documentElement.clientHeight + (isFixed ? 0 : $(document).scrollTop());

		offset.left -= this._get(inst, "isRTL") ? dpWidth - inputWidth : 0;
		offset.left -= isFixed && offset.left === inst.input.offset().left ? $(document).scrollLeft() : 0;
		offset.top -= isFixed && offset.top === inst.input.offset().top + inputHeight ? $(document).scrollTop() : 0;

		// Now check if datepicker is showing outside window viewport - move to a better place if so.
		offset.left -= Math.min(offset.left, offset.left + dpWidth > viewWidth && viewWidth > dpWidth ? Math.abs(offset.left + dpWidth - viewWidth) : 0);
		offset.top -= Math.min(offset.top, offset.top + dpHeight > viewHeight && viewHeight > dpHeight ? Math.abs(dpHeight + inputHeight) : 0);

		return offset;
	},

	/* Find an object's position on the screen. */
	_findPos: function _findPos(obj) {
		var position,
		    inst = this._getInst(obj),
		    isRTL = this._get(inst, "isRTL");

		while (obj && (obj.type === "hidden" || obj.nodeType !== 1 || $.expr.filters.hidden(obj))) {
			obj = obj[isRTL ? "previousSibling" : "nextSibling"];
		}

		position = $(obj).offset();
		return [position.left, position.top];
	},

	/* Hide the date picker from view.
  * @param  input  element - the input field attached to the date picker
  */
	_hideDatepicker: function _hideDatepicker(input) {
		var showAnim,
		    duration,
		    postProcess,
		    onClose,
		    inst = this._curInst;

		if (!inst || input && inst !== $.data(input, "datepicker")) {
			return;
		}

		if (this._datepickerShowing) {
			showAnim = this._get(inst, "showAnim");
			duration = this._get(inst, "duration");
			postProcess = function postProcess() {
				$.datepicker._tidyDialog(inst);
			};

			// DEPRECATED: after BC for 1.8.x $.effects[ showAnim ] is not needed
			if ($.effects && ($.effects.effect[showAnim] || $.effects[showAnim])) {
				inst.dpDiv.hide(showAnim, $.datepicker._get(inst, "showOptions"), duration, postProcess);
			} else {
				inst.dpDiv[showAnim === "slideDown" ? "slideUp" : showAnim === "fadeIn" ? "fadeOut" : "hide"](showAnim ? duration : null, postProcess);
			}

			if (!showAnim) {
				postProcess();
			}
			this._datepickerShowing = false;

			onClose = this._get(inst, "onClose");
			if (onClose) {
				onClose.apply(inst.input ? inst.input[0] : null, [inst.input ? inst.input.val() : "", inst]);
			}

			this._lastInput = null;
			if (this._inDialog) {
				this._dialogInput.css({
					position: "absolute",
					left: "0",
					top: "-100px"
				});
				if ($.blockUI) {
					$.unblockUI();
					$("body").append(this.dpDiv);
				}
			}
			this._inDialog = false;
		}
	},

	/* Tidy up after a dialog display. */
	_tidyDialog: function _tidyDialog(inst) {
		inst.dpDiv.removeClass(this._dialogClass).off(".ui-datepicker-calendar");
	},

	/* Close date picker if clicked elsewhere. */
	_checkExternalClick: function _checkExternalClick(event) {
		if (!$.datepicker._curInst) {
			return;
		}

		var $target = $(event.target),
		    inst = $.datepicker._getInst($target[0]);

		if ($target[0].id !== $.datepicker._mainDivId && $target.parents("#" + $.datepicker._mainDivId).length === 0 && !$target.hasClass($.datepicker.markerClassName) && !$target.closest("." + $.datepicker._triggerClass).length && $.datepicker._datepickerShowing && !($.datepicker._inDialog && $.blockUI) || $target.hasClass($.datepicker.markerClassName) && $.datepicker._curInst !== inst) {
			$.datepicker._hideDatepicker();
		}
	},

	/* Adjust one of the date sub-fields. */
	_adjustDate: function _adjustDate(id, offset, period) {
		var target = $(id),
		    inst = this._getInst(target[0]);

		if (this._isDisabledDatepicker(target[0])) {
			return;
		}
		this._adjustInstDate(inst, offset + (period === "M" ? this._get(inst, "showCurrentAtPos") : 0), // undo positioning
		period);
		this._updateDatepicker(inst);
	},

	/* Action for current link. */
	_gotoToday: function _gotoToday(id) {
		var date,
		    target = $(id),
		    inst = this._getInst(target[0]);

		if (this._get(inst, "gotoCurrent") && inst.currentDay) {
			inst.selectedDay = inst.currentDay;
			inst.drawMonth = inst.selectedMonth = inst.currentMonth;
			inst.drawYear = inst.selectedYear = inst.currentYear;
		} else {
			date = new Date();
			inst.selectedDay = date.getDate();
			inst.drawMonth = inst.selectedMonth = date.getMonth();
			inst.drawYear = inst.selectedYear = date.getFullYear();
		}
		this._notifyChange(inst);
		this._adjustDate(target);
	},

	/* Action for selecting a new month/year. */
	_selectMonthYear: function _selectMonthYear(id, select, period) {
		var target = $(id),
		    inst = this._getInst(target[0]);

		inst["selected" + (period === "M" ? "Month" : "Year")] = inst["draw" + (period === "M" ? "Month" : "Year")] = parseInt(select.options[select.selectedIndex].value, 10);

		this._notifyChange(inst);
		this._adjustDate(target);
	},

	/* Action for selecting a day. */
	_selectDay: function _selectDay(id, month, year, td) {
		var inst,
		    target = $(id);

		if ($(td).hasClass(this._unselectableClass) || this._isDisabledDatepicker(target[0])) {
			return;
		}

		inst = this._getInst(target[0]);
		inst.selectedDay = inst.currentDay = $("a", td).html();
		inst.selectedMonth = inst.currentMonth = month;
		inst.selectedYear = inst.currentYear = year;
		this._selectDate(id, this._formatDate(inst, inst.currentDay, inst.currentMonth, inst.currentYear));
	},

	/* Erase the input field and hide the date picker. */
	_clearDate: function _clearDate(id) {
		var target = $(id);
		this._selectDate(target, "");
	},

	/* Update the input field with the selected date. */
	_selectDate: function _selectDate(id, dateStr) {
		var onSelect,
		    target = $(id),
		    inst = this._getInst(target[0]);

		dateStr = dateStr != null ? dateStr : this._formatDate(inst);
		if (inst.input) {
			inst.input.val(dateStr);
		}
		this._updateAlternate(inst);

		onSelect = this._get(inst, "onSelect");
		if (onSelect) {
			onSelect.apply(inst.input ? inst.input[0] : null, [dateStr, inst]); // trigger custom callback
		} else if (inst.input) {
				inst.input.trigger("change"); // fire the change event
			}

		if (inst.inline) {
			this._updateDatepicker(inst);
		} else {
			this._hideDatepicker();
			this._lastInput = inst.input[0];
			if (typeof inst.input[0] !== "object") {
				inst.input.trigger("focus"); // restore focus
			}
			this._lastInput = null;
		}
	},

	/* Update any alternate field to synchronise with the main field. */
	_updateAlternate: function _updateAlternate(inst) {
		var altFormat,
		    date,
		    dateStr,
		    altField = this._get(inst, "altField");

		if (altField) {
			// update alternate field too
			altFormat = this._get(inst, "altFormat") || this._get(inst, "dateFormat");
			date = this._getDate(inst);
			dateStr = this.formatDate(altFormat, date, this._getFormatConfig(inst));
			$(altField).val(dateStr);
		}
	},

	/* Set as beforeShowDay function to prevent selection of weekends.
  * @param  date  Date - the date to customise
  * @return [boolean, string] - is this date selectable?, what is its CSS class?
  */
	noWeekends: function noWeekends(date) {
		var day = date.getDay();
		return [day > 0 && day < 6, ""];
	},

	/* Set as calculateWeek to determine the week of the year based on the ISO 8601 definition.
  * @param  date  Date - the date to get the week for
  * @return  number - the number of the week within the year that contains this date
  */
	iso8601Week: function iso8601Week(date) {
		var time,
		    checkDate = new Date(date.getTime());

		// Find Thursday of this week starting on Monday
		checkDate.setDate(checkDate.getDate() + 4 - (checkDate.getDay() || 7));

		time = checkDate.getTime();
		checkDate.setMonth(0); // Compare with Jan 1
		checkDate.setDate(1);
		return Math.floor(Math.round((time - checkDate) / 86400000) / 7) + 1;
	},

	/* Parse a string value into a date object.
  * See formatDate below for the possible formats.
  *
  * @param  format string - the expected format of the date
  * @param  value string - the date in the above format
  * @param  settings Object - attributes include:
  *					shortYearCutoff  number - the cutoff year for determining the century (optional)
  *					dayNamesShort	string[7] - abbreviated names of the days from Sunday (optional)
  *					dayNames		string[7] - names of the days from Sunday (optional)
  *					monthNamesShort string[12] - abbreviated names of the months (optional)
  *					monthNames		string[12] - names of the months (optional)
  * @return  Date - the extracted date value or null if value is blank
  */
	parseDate: function parseDate(format, value, settings) {
		if (format == null || value == null) {
			throw "Invalid arguments";
		}

		value = typeof value === "object" ? value.toString() : value + "";
		if (value === "") {
			return null;
		}

		var iFormat,
		    dim,
		    extra,
		    iValue = 0,
		    shortYearCutoffTemp = (settings ? settings.shortYearCutoff : null) || this._defaults.shortYearCutoff,
		    shortYearCutoff = typeof shortYearCutoffTemp !== "string" ? shortYearCutoffTemp : new Date().getFullYear() % 100 + parseInt(shortYearCutoffTemp, 10),
		    dayNamesShort = (settings ? settings.dayNamesShort : null) || this._defaults.dayNamesShort,
		    dayNames = (settings ? settings.dayNames : null) || this._defaults.dayNames,
		    monthNamesShort = (settings ? settings.monthNamesShort : null) || this._defaults.monthNamesShort,
		    monthNames = (settings ? settings.monthNames : null) || this._defaults.monthNames,
		    year = -1,
		    month = -1,
		    day = -1,
		    doy = -1,
		    literal = false,
		    date,


		// Check whether a format character is doubled
		lookAhead = function lookAhead(match) {
			var matches = iFormat + 1 < format.length && format.charAt(iFormat + 1) === match;
			if (matches) {
				iFormat++;
			}
			return matches;
		},


		// Extract a number from the string value
		getNumber = function getNumber(match) {
			var isDoubled = lookAhead(match),
			    size = match === "@" ? 14 : match === "!" ? 20 : match === "y" && isDoubled ? 4 : match === "o" ? 3 : 2,
			    minSize = match === "y" ? size : 1,
			    digits = new RegExp("^\\d{" + minSize + "," + size + "}"),
			    num = value.substring(iValue).match(digits);
			if (!num) {
				throw "Missing number at position " + iValue;
			}
			iValue += num[0].length;
			return parseInt(num[0], 10);
		},


		// Extract a name from the string value and convert to an index
		getName = function getName(match, shortNames, longNames) {
			var index = -1,
			    names = $.map(lookAhead(match) ? longNames : shortNames, function (v, k) {
				return [[k, v]];
			}).sort(function (a, b) {
				return -(a[1].length - b[1].length);
			});

			$.each(names, function (i, pair) {
				var name = pair[1];
				if (value.substr(iValue, name.length).toLowerCase() === name.toLowerCase()) {
					index = pair[0];
					iValue += name.length;
					return false;
				}
			});
			if (index !== -1) {
				return index + 1;
			} else {
				throw "Unknown name at position " + iValue;
			}
		},


		// Confirm that a literal character matches the string value
		checkLiteral = function checkLiteral() {
			if (value.charAt(iValue) !== format.charAt(iFormat)) {
				throw "Unexpected literal at position " + iValue;
			}
			iValue++;
		};

		for (iFormat = 0; iFormat < format.length; iFormat++) {
			if (literal) {
				if (format.charAt(iFormat) === "'" && !lookAhead("'")) {
					literal = false;
				} else {
					checkLiteral();
				}
			} else {
				switch (format.charAt(iFormat)) {
					case "d":
						day = getNumber("d");
						break;
					case "D":
						getName("D", dayNamesShort, dayNames);
						break;
					case "o":
						doy = getNumber("o");
						break;
					case "m":
						month = getNumber("m");
						break;
					case "M":
						month = getName("M", monthNamesShort, monthNames);
						break;
					case "y":
						year = getNumber("y");
						break;
					case "@":
						date = new Date(getNumber("@"));
						year = date.getFullYear();
						month = date.getMonth() + 1;
						day = date.getDate();
						break;
					case "!":
						date = new Date((getNumber("!") - this._ticksTo1970) / 10000);
						year = date.getFullYear();
						month = date.getMonth() + 1;
						day = date.getDate();
						break;
					case "'":
						if (lookAhead("'")) {
							checkLiteral();
						} else {
							literal = true;
						}
						break;
					default:
						checkLiteral();
				}
			}
		}

		if (iValue < value.length) {
			extra = value.substr(iValue);
			if (!/^\s+/.test(extra)) {
				throw "Extra/unparsed characters found in date: " + extra;
			}
		}

		if (year === -1) {
			year = new Date().getFullYear();
		} else if (year < 100) {
			year += new Date().getFullYear() - new Date().getFullYear() % 100 + (year <= shortYearCutoff ? 0 : -100);
		}

		if (doy > -1) {
			month = 1;
			day = doy;
			do {
				dim = this._getDaysInMonth(year, month - 1);
				if (day <= dim) {
					break;
				}
				month++;
				day -= dim;
			} while (true);
		}

		date = this._daylightSavingAdjust(new Date(year, month - 1, day));
		if (date.getFullYear() !== year || date.getMonth() + 1 !== month || date.getDate() !== day) {
			throw "Invalid date"; // E.g. 31/02/00
		}
		return date;
	},

	/* Standard date formats. */
	ATOM: "yy-mm-dd", // RFC 3339 (ISO 8601)
	COOKIE: "D, dd M yy",
	ISO_8601: "yy-mm-dd",
	RFC_822: "D, d M y",
	RFC_850: "DD, dd-M-y",
	RFC_1036: "D, d M y",
	RFC_1123: "D, d M yy",
	RFC_2822: "D, d M yy",
	RSS: "D, d M y", // RFC 822
	TICKS: "!",
	TIMESTAMP: "@",
	W3C: "yy-mm-dd", // ISO 8601

	_ticksTo1970: ((1970 - 1) * 365 + Math.floor(1970 / 4) - Math.floor(1970 / 100) + Math.floor(1970 / 400)) * 24 * 60 * 60 * 10000000,

	/* Format a date object into a string value.
  * The format can be combinations of the following:
  * d  - day of month (no leading zero)
  * dd - day of month (two digit)
  * o  - day of year (no leading zeros)
  * oo - day of year (three digit)
  * D  - day name short
  * DD - day name long
  * m  - month of year (no leading zero)
  * mm - month of year (two digit)
  * M  - month name short
  * MM - month name long
  * y  - year (two digit)
  * yy - year (four digit)
  * @ - Unix timestamp (ms since 01/01/1970)
  * ! - Windows ticks (100ns since 01/01/0001)
  * "..." - literal text
  * '' - single quote
  *
  * @param  format string - the desired format of the date
  * @param  date Date - the date value to format
  * @param  settings Object - attributes include:
  *					dayNamesShort	string[7] - abbreviated names of the days from Sunday (optional)
  *					dayNames		string[7] - names of the days from Sunday (optional)
  *					monthNamesShort string[12] - abbreviated names of the months (optional)
  *					monthNames		string[12] - names of the months (optional)
  * @return  string - the date in the above format
  */
	formatDate: function formatDate(format, date, settings) {
		if (!date) {
			return "";
		}

		var iFormat,
		    dayNamesShort = (settings ? settings.dayNamesShort : null) || this._defaults.dayNamesShort,
		    dayNames = (settings ? settings.dayNames : null) || this._defaults.dayNames,
		    monthNamesShort = (settings ? settings.monthNamesShort : null) || this._defaults.monthNamesShort,
		    monthNames = (settings ? settings.monthNames : null) || this._defaults.monthNames,


		// Check whether a format character is doubled
		lookAhead = function lookAhead(match) {
			var matches = iFormat + 1 < format.length && format.charAt(iFormat + 1) === match;
			if (matches) {
				iFormat++;
			}
			return matches;
		},


		// Format a number, with leading zero if necessary
		formatNumber = function formatNumber(match, value, len) {
			var num = "" + value;
			if (lookAhead(match)) {
				while (num.length < len) {
					num = "0" + num;
				}
			}
			return num;
		},


		// Format a name, short or long as requested
		formatName = function formatName(match, value, shortNames, longNames) {
			return lookAhead(match) ? longNames[value] : shortNames[value];
		},
		    output = "",
		    literal = false;

		if (date) {
			for (iFormat = 0; iFormat < format.length; iFormat++) {
				if (literal) {
					if (format.charAt(iFormat) === "'" && !lookAhead("'")) {
						literal = false;
					} else {
						output += format.charAt(iFormat);
					}
				} else {
					switch (format.charAt(iFormat)) {
						case "d":
							output += formatNumber("d", date.getDate(), 2);
							break;
						case "D":
							output += formatName("D", date.getDay(), dayNamesShort, dayNames);
							break;
						case "o":
							output += formatNumber("o", Math.round((new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 86400000), 3);
							break;
						case "m":
							output += formatNumber("m", date.getMonth() + 1, 2);
							break;
						case "M":
							output += formatName("M", date.getMonth(), monthNamesShort, monthNames);
							break;
						case "y":
							output += lookAhead("y") ? date.getFullYear() : (date.getFullYear() % 100 < 10 ? "0" : "") + date.getFullYear() % 100;
							break;
						case "@":
							output += date.getTime();
							break;
						case "!":
							output += date.getTime() * 10000 + this._ticksTo1970;
							break;
						case "'":
							if (lookAhead("'")) {
								output += "'";
							} else {
								literal = true;
							}
							break;
						default:
							output += format.charAt(iFormat);
					}
				}
			}
		}
		return output;
	},

	/* Extract all possible characters from the date format. */
	_possibleChars: function _possibleChars(format) {
		var iFormat,
		    chars = "",
		    literal = false,


		// Check whether a format character is doubled
		lookAhead = function lookAhead(match) {
			var matches = iFormat + 1 < format.length && format.charAt(iFormat + 1) === match;
			if (matches) {
				iFormat++;
			}
			return matches;
		};

		for (iFormat = 0; iFormat < format.length; iFormat++) {
			if (literal) {
				if (format.charAt(iFormat) === "'" && !lookAhead("'")) {
					literal = false;
				} else {
					chars += format.charAt(iFormat);
				}
			} else {
				switch (format.charAt(iFormat)) {
					case "d":
					case "m":
					case "y":
					case "@":
						chars += "0123456789";
						break;
					case "D":
					case "M":
						return null; // Accept anything
					case "'":
						if (lookAhead("'")) {
							chars += "'";
						} else {
							literal = true;
						}
						break;
					default:
						chars += format.charAt(iFormat);
				}
			}
		}
		return chars;
	},

	/* Get a setting value, defaulting if necessary. */
	_get: function _get(inst, name) {
		return inst.settings[name] !== undefined ? inst.settings[name] : this._defaults[name];
	},

	/* Parse existing date and initialise date picker. */
	_setDateFromField: function _setDateFromField(inst, noDefault) {
		if (inst.input.val() === inst.lastVal) {
			return;
		}

		var dateFormat = this._get(inst, "dateFormat"),
		    dates = inst.lastVal = inst.input ? inst.input.val() : null,
		    defaultDate = this._getDefaultDate(inst),
		    date = defaultDate,
		    settings = this._getFormatConfig(inst);

		try {
			date = this.parseDate(dateFormat, dates, settings) || defaultDate;
		} catch (event) {
			dates = noDefault ? "" : dates;
		}
		inst.selectedDay = date.getDate();
		inst.drawMonth = inst.selectedMonth = date.getMonth();
		inst.drawYear = inst.selectedYear = date.getFullYear();
		inst.currentDay = dates ? date.getDate() : 0;
		inst.currentMonth = dates ? date.getMonth() : 0;
		inst.currentYear = dates ? date.getFullYear() : 0;
		this._adjustInstDate(inst);
	},

	/* Retrieve the default date shown on opening. */
	_getDefaultDate: function _getDefaultDate(inst) {
		return this._restrictMinMax(inst, this._determineDate(inst, this._get(inst, "defaultDate"), new Date()));
	},

	/* A date may be specified as an exact value or a relative one. */
	_determineDate: function _determineDate(inst, date, defaultDate) {
		var offsetNumeric = function offsetNumeric(offset) {
			var date = new Date();
			date.setDate(date.getDate() + offset);
			return date;
		},
		    offsetString = function offsetString(offset) {
			try {
				return $.datepicker.parseDate($.datepicker._get(inst, "dateFormat"), offset, $.datepicker._getFormatConfig(inst));
			} catch (e) {

				// Ignore
			}

			var date = (offset.toLowerCase().match(/^c/) ? $.datepicker._getDate(inst) : null) || new Date(),
			    year = date.getFullYear(),
			    month = date.getMonth(),
			    day = date.getDate(),
			    pattern = /([+\-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g,
			    matches = pattern.exec(offset);

			while (matches) {
				switch (matches[2] || "d") {
					case "d":
					case "D":
						day += parseInt(matches[1], 10);
						break;
					case "w":
					case "W":
						day += parseInt(matches[1], 10) * 7;
						break;
					case "m":
					case "M":
						month += parseInt(matches[1], 10);
						day = Math.min(day, $.datepicker._getDaysInMonth(year, month));
						break;
					case "y":
					case "Y":
						year += parseInt(matches[1], 10);
						day = Math.min(day, $.datepicker._getDaysInMonth(year, month));
						break;
				}
				matches = pattern.exec(offset);
			}
			return new Date(year, month, day);
		},
		    newDate = date == null || date === "" ? defaultDate : typeof date === "string" ? offsetString(date) : typeof date === "number" ? isNaN(date) ? defaultDate : offsetNumeric(date) : new Date(date.getTime());

		newDate = newDate && newDate.toString() === "Invalid Date" ? defaultDate : newDate;
		if (newDate) {
			newDate.setHours(0);
			newDate.setMinutes(0);
			newDate.setSeconds(0);
			newDate.setMilliseconds(0);
		}
		return this._daylightSavingAdjust(newDate);
	},

	/* Handle switch to/from daylight saving.
  * Hours may be non-zero on daylight saving cut-over:
  * > 12 when midnight changeover, but then cannot generate
  * midnight datetime, so jump to 1AM, otherwise reset.
  * @param  date  (Date) the date to check
  * @return  (Date) the corrected date
  */
	_daylightSavingAdjust: function _daylightSavingAdjust(date) {
		if (!date) {
			return null;
		}
		date.setHours(date.getHours() > 12 ? date.getHours() + 2 : 0);
		return date;
	},

	/* Set the date(s) directly. */
	_setDate: function _setDate(inst, date, noChange) {
		var clear = !date,
		    origMonth = inst.selectedMonth,
		    origYear = inst.selectedYear,
		    newDate = this._restrictMinMax(inst, this._determineDate(inst, date, new Date()));

		inst.selectedDay = inst.currentDay = newDate.getDate();
		inst.drawMonth = inst.selectedMonth = inst.currentMonth = newDate.getMonth();
		inst.drawYear = inst.selectedYear = inst.currentYear = newDate.getFullYear();
		if ((origMonth !== inst.selectedMonth || origYear !== inst.selectedYear) && !noChange) {
			this._notifyChange(inst);
		}
		this._adjustInstDate(inst);
		if (inst.input) {
			inst.input.val(clear ? "" : this._formatDate(inst));
		}
	},

	/* Retrieve the date(s) directly. */
	_getDate: function _getDate(inst) {
		var startDate = !inst.currentYear || inst.input && inst.input.val() === "" ? null : this._daylightSavingAdjust(new Date(inst.currentYear, inst.currentMonth, inst.currentDay));
		return startDate;
	},

	/* Attach the onxxx handlers.  These are declared statically so
  * they work with static code transformers like Caja.
  */
	_attachHandlers: function _attachHandlers(inst) {
		var stepMonths = this._get(inst, "stepMonths"),
		    id = "#" + inst.id.replace(/\\\\/g, "\\");
		inst.dpDiv.find("[data-handler]").map(function () {
			var handler = {
				prev: function prev() {
					$.datepicker._adjustDate(id, -stepMonths, "M");
				},
				next: function next() {
					$.datepicker._adjustDate(id, +stepMonths, "M");
				},
				hide: function hide() {
					$.datepicker._hideDatepicker();
				},
				today: function today() {
					$.datepicker._gotoToday(id);
				},
				selectDay: function selectDay() {
					$.datepicker._selectDay(id, +this.getAttribute("data-month"), +this.getAttribute("data-year"), this);
					return false;
				},
				selectMonth: function selectMonth() {
					$.datepicker._selectMonthYear(id, this, "M");
					return false;
				},
				selectYear: function selectYear() {
					$.datepicker._selectMonthYear(id, this, "Y");
					return false;
				}
			};
			$(this).on(this.getAttribute("data-event"), handler[this.getAttribute("data-handler")]);
		});
	},

	/* Generate the HTML for the current state of the date picker. */
	_generateHTML: function _generateHTML(inst) {
		var maxDraw,
		    prevText,
		    prev,
		    nextText,
		    next,
		    currentText,
		    gotoDate,
		    controls,
		    buttonPanel,
		    firstDay,
		    showWeek,
		    dayNames,
		    dayNamesMin,
		    monthNames,
		    monthNamesShort,
		    beforeShowDay,
		    showOtherMonths,
		    selectOtherMonths,
		    defaultDate,
		    html,
		    dow,
		    row,
		    group,
		    col,
		    selectedDate,
		    cornerClass,
		    calender,
		    thead,
		    day,
		    daysInMonth,
		    leadDays,
		    curRows,
		    numRows,
		    printDate,
		    dRow,
		    tbody,
		    daySettings,
		    otherMonth,
		    unselectable,
		    tempDate = new Date(),
		    today = this._daylightSavingAdjust(new Date(tempDate.getFullYear(), tempDate.getMonth(), tempDate.getDate())),
		    // clear time
		isRTL = this._get(inst, "isRTL"),
		    showButtonPanel = this._get(inst, "showButtonPanel"),
		    hideIfNoPrevNext = this._get(inst, "hideIfNoPrevNext"),
		    navigationAsDateFormat = this._get(inst, "navigationAsDateFormat"),
		    numMonths = this._getNumberOfMonths(inst),
		    showCurrentAtPos = this._get(inst, "showCurrentAtPos"),
		    stepMonths = this._get(inst, "stepMonths"),
		    isMultiMonth = numMonths[0] !== 1 || numMonths[1] !== 1,
		    currentDate = this._daylightSavingAdjust(!inst.currentDay ? new Date(9999, 9, 9) : new Date(inst.currentYear, inst.currentMonth, inst.currentDay)),
		    minDate = this._getMinMaxDate(inst, "min"),
		    maxDate = this._getMinMaxDate(inst, "max"),
		    drawMonth = inst.drawMonth - showCurrentAtPos,
		    drawYear = inst.drawYear;

		if (drawMonth < 0) {
			drawMonth += 12;
			drawYear--;
		}
		if (maxDate) {
			maxDraw = this._daylightSavingAdjust(new Date(maxDate.getFullYear(), maxDate.getMonth() - numMonths[0] * numMonths[1] + 1, maxDate.getDate()));
			maxDraw = minDate && maxDraw < minDate ? minDate : maxDraw;
			while (this._daylightSavingAdjust(new Date(drawYear, drawMonth, 1)) > maxDraw) {
				drawMonth--;
				if (drawMonth < 0) {
					drawMonth = 11;
					drawYear--;
				}
			}
		}
		inst.drawMonth = drawMonth;
		inst.drawYear = drawYear;

		prevText = this._get(inst, "prevText");
		prevText = !navigationAsDateFormat ? prevText : this.formatDate(prevText, this._daylightSavingAdjust(new Date(drawYear, drawMonth - stepMonths, 1)), this._getFormatConfig(inst));

		prev = this._canAdjustMonth(inst, -1, drawYear, drawMonth) ? "<a class='ui-datepicker-prev ui-corner-all' data-handler='prev' data-event='click'" + " title='" + prevText + "'><span class='ui-icon ui-icon-circle-triangle-" + (isRTL ? "e" : "w") + "'>" + prevText + "</span></a>" : hideIfNoPrevNext ? "" : "<a class='ui-datepicker-prev ui-corner-all ui-state-disabled' title='" + prevText + "'><span class='ui-icon ui-icon-circle-triangle-" + (isRTL ? "e" : "w") + "'>" + prevText + "</span></a>";

		nextText = this._get(inst, "nextText");
		nextText = !navigationAsDateFormat ? nextText : this.formatDate(nextText, this._daylightSavingAdjust(new Date(drawYear, drawMonth + stepMonths, 1)), this._getFormatConfig(inst));

		next = this._canAdjustMonth(inst, +1, drawYear, drawMonth) ? "<a class='ui-datepicker-next ui-corner-all' data-handler='next' data-event='click'" + " title='" + nextText + "'><span class='ui-icon ui-icon-circle-triangle-" + (isRTL ? "w" : "e") + "'>" + nextText + "</span></a>" : hideIfNoPrevNext ? "" : "<a class='ui-datepicker-next ui-corner-all ui-state-disabled' title='" + nextText + "'><span class='ui-icon ui-icon-circle-triangle-" + (isRTL ? "w" : "e") + "'>" + nextText + "</span></a>";

		currentText = this._get(inst, "currentText");
		gotoDate = this._get(inst, "gotoCurrent") && inst.currentDay ? currentDate : today;
		currentText = !navigationAsDateFormat ? currentText : this.formatDate(currentText, gotoDate, this._getFormatConfig(inst));

		controls = !inst.inline ? "<button type='button' class='ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all' data-handler='hide' data-event='click'>" + this._get(inst, "closeText") + "</button>" : "";

		buttonPanel = showButtonPanel ? "<div class='ui-datepicker-buttonpane ui-widget-content'>" + (isRTL ? controls : "") + (this._isInRange(inst, gotoDate) ? "<button type='button' class='ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all' data-handler='today' data-event='click'" + ">" + currentText + "</button>" : "") + (isRTL ? "" : controls) + "</div>" : "";

		firstDay = parseInt(this._get(inst, "firstDay"), 10);
		firstDay = isNaN(firstDay) ? 0 : firstDay;

		showWeek = this._get(inst, "showWeek");
		dayNames = this._get(inst, "dayNames");
		dayNamesMin = this._get(inst, "dayNamesMin");
		monthNames = this._get(inst, "monthNames");
		monthNamesShort = this._get(inst, "monthNamesShort");
		beforeShowDay = this._get(inst, "beforeShowDay");
		showOtherMonths = this._get(inst, "showOtherMonths");
		selectOtherMonths = this._get(inst, "selectOtherMonths");
		defaultDate = this._getDefaultDate(inst);
		html = "";

		for (row = 0; row < numMonths[0]; row++) {
			group = "";
			this.maxRows = 4;
			for (col = 0; col < numMonths[1]; col++) {
				selectedDate = this._daylightSavingAdjust(new Date(drawYear, drawMonth, inst.selectedDay));
				cornerClass = " ui-corner-all";
				calender = "";
				if (isMultiMonth) {
					calender += "<div class='ui-datepicker-group";
					if (numMonths[1] > 1) {
						switch (col) {
							case 0:
								calender += " ui-datepicker-group-first";
								cornerClass = " ui-corner-" + (isRTL ? "right" : "left");
								break;
							case numMonths[1] - 1:
								calender += " ui-datepicker-group-last";
								cornerClass = " ui-corner-" + (isRTL ? "left" : "right");
								break;
							default:
								calender += " ui-datepicker-group-middle";
								cornerClass = "";
								break;
						}
					}
					calender += "'>";
				}
				calender += "<div class='ui-datepicker-header ui-widget-header ui-helper-clearfix" + cornerClass + "'>" + (/all|left/.test(cornerClass) && row === 0 ? isRTL ? next : prev : "") + (/all|right/.test(cornerClass) && row === 0 ? isRTL ? prev : next : "") + this._generateMonthYearHeader(inst, drawMonth, drawYear, minDate, maxDate, row > 0 || col > 0, monthNames, monthNamesShort) + // draw month headers
				"</div><table class='ui-datepicker-calendar'><thead>" + "<tr>";
				thead = showWeek ? "<th class='ui-datepicker-week-col'>" + this._get(inst, "weekHeader") + "</th>" : "";
				for (dow = 0; dow < 7; dow++) {
					// days of the week
					day = (dow + firstDay) % 7;
					thead += "<th scope='col'" + ((dow + firstDay + 6) % 7 >= 5 ? " class='ui-datepicker-week-end'" : "") + ">" + "<span title='" + dayNames[day] + "'>" + dayNamesMin[day] + "</span></th>";
				}
				calender += thead + "</tr></thead><tbody>";
				daysInMonth = this._getDaysInMonth(drawYear, drawMonth);
				if (drawYear === inst.selectedYear && drawMonth === inst.selectedMonth) {
					inst.selectedDay = Math.min(inst.selectedDay, daysInMonth);
				}
				leadDays = (this._getFirstDayOfMonth(drawYear, drawMonth) - firstDay + 7) % 7;
				curRows = Math.ceil((leadDays + daysInMonth) / 7); // calculate the number of rows to generate
				numRows = isMultiMonth ? this.maxRows > curRows ? this.maxRows : curRows : curRows; //If multiple months, use the higher number of rows (see #7043)
				this.maxRows = numRows;
				printDate = this._daylightSavingAdjust(new Date(drawYear, drawMonth, 1 - leadDays));
				for (dRow = 0; dRow < numRows; dRow++) {
					// create date picker rows
					calender += "<tr>";
					tbody = !showWeek ? "" : "<td class='ui-datepicker-week-col'>" + this._get(inst, "calculateWeek")(printDate) + "</td>";
					for (dow = 0; dow < 7; dow++) {
						// create date picker days
						daySettings = beforeShowDay ? beforeShowDay.apply(inst.input ? inst.input[0] : null, [printDate]) : [true, ""];
						otherMonth = printDate.getMonth() !== drawMonth;
						unselectable = otherMonth && !selectOtherMonths || !daySettings[0] || minDate && printDate < minDate || maxDate && printDate > maxDate;
						tbody += "<td class='" + ((dow + firstDay + 6) % 7 >= 5 ? " ui-datepicker-week-end" : "") + ( // highlight weekends
						otherMonth ? " ui-datepicker-other-month" : "") + ( // highlight days from other months
						printDate.getTime() === selectedDate.getTime() && drawMonth === inst.selectedMonth && inst._keyEvent || // user pressed key
						defaultDate.getTime() === printDate.getTime() && defaultDate.getTime() === selectedDate.getTime() ?

						// or defaultDate is current printedDate and defaultDate is selectedDate
						" " + this._dayOverClass : "") + ( // highlight selected day
						unselectable ? " " + this._unselectableClass + " ui-state-disabled" : "") + ( // highlight unselectable days
						otherMonth && !showOtherMonths ? "" : " " + daySettings[1] + ( // highlight custom dates
						printDate.getTime() === currentDate.getTime() ? " " + this._currentClass : "") + ( // highlight selected day
						printDate.getTime() === today.getTime() ? " ui-datepicker-today" : "")) + "'" + ( // highlight today (if different)
						(!otherMonth || showOtherMonths) && daySettings[2] ? " title='" + daySettings[2].replace(/'/g, "&#39;") + "'" : "") + ( // cell title
						unselectable ? "" : " data-handler='selectDay' data-event='click' data-month='" + printDate.getMonth() + "' data-year='" + printDate.getFullYear() + "'") + ">" + ( // actions
						otherMonth && !showOtherMonths ? "&#xa0;" : // display for other months
						unselectable ? "<span class='ui-state-default'>" + printDate.getDate() + "</span>" : "<a class='ui-state-default" + (printDate.getTime() === today.getTime() ? " ui-state-highlight" : "") + (printDate.getTime() === currentDate.getTime() ? " ui-state-active" : "") + ( // highlight selected day
						otherMonth ? " ui-priority-secondary" : "") + // distinguish dates from other months
						"' href='#'>" + printDate.getDate() + "</a>") + "</td>"; // display selectable date
						printDate.setDate(printDate.getDate() + 1);
						printDate = this._daylightSavingAdjust(printDate);
					}
					calender += tbody + "</tr>";
				}
				drawMonth++;
				if (drawMonth > 11) {
					drawMonth = 0;
					drawYear++;
				}
				calender += "</tbody></table>" + (isMultiMonth ? "</div>" + (numMonths[0] > 0 && col === numMonths[1] - 1 ? "<div class='ui-datepicker-row-break'></div>" : "") : "");
				group += calender;
			}
			html += group;
		}
		html += buttonPanel;
		inst._keyEvent = false;
		return html;
	},

	/* Generate the month and year header. */
	_generateMonthYearHeader: function _generateMonthYearHeader(inst, drawMonth, drawYear, minDate, maxDate, secondary, monthNames, monthNamesShort) {

		var inMinYear,
		    inMaxYear,
		    month,
		    years,
		    thisYear,
		    determineYear,
		    year,
		    endYear,
		    changeMonth = this._get(inst, "changeMonth"),
		    changeYear = this._get(inst, "changeYear"),
		    showMonthAfterYear = this._get(inst, "showMonthAfterYear"),
		    html = "<div class='ui-datepicker-title'>",
		    monthHtml = "";

		// Month selection
		if (secondary || !changeMonth) {
			monthHtml += "<span class='ui-datepicker-month'>" + monthNames[drawMonth] + "</span>";
		} else {
			inMinYear = minDate && minDate.getFullYear() === drawYear;
			inMaxYear = maxDate && maxDate.getFullYear() === drawYear;
			monthHtml += "<select class='ui-datepicker-month' data-handler='selectMonth' data-event='change'>";
			for (month = 0; month < 12; month++) {
				if ((!inMinYear || month >= minDate.getMonth()) && (!inMaxYear || month <= maxDate.getMonth())) {
					monthHtml += "<option value='" + month + "'" + (month === drawMonth ? " selected='selected'" : "") + ">" + monthNamesShort[month] + "</option>";
				}
			}
			monthHtml += "</select>";
		}

		if (!showMonthAfterYear) {
			html += monthHtml + (secondary || !(changeMonth && changeYear) ? "&#xa0;" : "");
		}

		// Year selection
		if (!inst.yearshtml) {
			inst.yearshtml = "";
			if (secondary || !changeYear) {
				html += "<span class='ui-datepicker-year'>" + drawYear + "</span>";
			} else {

				// determine range of years to display
				years = this._get(inst, "yearRange").split(":");
				thisYear = new Date().getFullYear();
				determineYear = function determineYear(value) {
					var year = value.match(/c[+\-].*/) ? drawYear + parseInt(value.substring(1), 10) : value.match(/[+\-].*/) ? thisYear + parseInt(value, 10) : parseInt(value, 10);
					return isNaN(year) ? thisYear : year;
				};
				year = determineYear(years[0]);
				endYear = Math.max(year, determineYear(years[1] || ""));
				year = minDate ? Math.max(year, minDate.getFullYear()) : year;
				endYear = maxDate ? Math.min(endYear, maxDate.getFullYear()) : endYear;
				inst.yearshtml += "<select class='ui-datepicker-year' data-handler='selectYear' data-event='change'>";
				for (; year <= endYear; year++) {
					inst.yearshtml += "<option value='" + year + "'" + (year === drawYear ? " selected='selected'" : "") + ">" + year + "</option>";
				}
				inst.yearshtml += "</select>";

				html += inst.yearshtml;
				inst.yearshtml = null;
			}
		}

		html += this._get(inst, "yearSuffix");
		if (showMonthAfterYear) {
			html += (secondary || !(changeMonth && changeYear) ? "&#xa0;" : "") + monthHtml;
		}
		html += "</div>"; // Close datepicker_header
		return html;
	},

	/* Adjust one of the date sub-fields. */
	_adjustInstDate: function _adjustInstDate(inst, offset, period) {
		var year = inst.selectedYear + (period === "Y" ? offset : 0),
		    month = inst.selectedMonth + (period === "M" ? offset : 0),
		    day = Math.min(inst.selectedDay, this._getDaysInMonth(year, month)) + (period === "D" ? offset : 0),
		    date = this._restrictMinMax(inst, this._daylightSavingAdjust(new Date(year, month, day)));

		inst.selectedDay = date.getDate();
		inst.drawMonth = inst.selectedMonth = date.getMonth();
		inst.drawYear = inst.selectedYear = date.getFullYear();
		if (period === "M" || period === "Y") {
			this._notifyChange(inst);
		}
	},

	/* Ensure a date is within any min/max bounds. */
	_restrictMinMax: function _restrictMinMax(inst, date) {
		var minDate = this._getMinMaxDate(inst, "min"),
		    maxDate = this._getMinMaxDate(inst, "max"),
		    newDate = minDate && date < minDate ? minDate : date;
		return maxDate && newDate > maxDate ? maxDate : newDate;
	},

	/* Notify change of month/year. */
	_notifyChange: function _notifyChange(inst) {
		var onChange = this._get(inst, "onChangeMonthYear");
		if (onChange) {
			onChange.apply(inst.input ? inst.input[0] : null, [inst.selectedYear, inst.selectedMonth + 1, inst]);
		}
	},

	/* Determine the number of months to show. */
	_getNumberOfMonths: function _getNumberOfMonths(inst) {
		var numMonths = this._get(inst, "numberOfMonths");
		return numMonths == null ? [1, 1] : typeof numMonths === "number" ? [1, numMonths] : numMonths;
	},

	/* Determine the current maximum date - ensure no time components are set. */
	_getMinMaxDate: function _getMinMaxDate(inst, minMax) {
		return this._determineDate(inst, this._get(inst, minMax + "Date"), null);
	},

	/* Find the number of days in a given month. */
	_getDaysInMonth: function _getDaysInMonth(year, month) {
		return 32 - this._daylightSavingAdjust(new Date(year, month, 32)).getDate();
	},

	/* Find the day of the week of the first of a month. */
	_getFirstDayOfMonth: function _getFirstDayOfMonth(year, month) {
		return new Date(year, month, 1).getDay();
	},

	/* Determines if we should allow a "next/prev" month display change. */
	_canAdjustMonth: function _canAdjustMonth(inst, offset, curYear, curMonth) {
		var numMonths = this._getNumberOfMonths(inst),
		    date = this._daylightSavingAdjust(new Date(curYear, curMonth + (offset < 0 ? offset : numMonths[0] * numMonths[1]), 1));

		if (offset < 0) {
			date.setDate(this._getDaysInMonth(date.getFullYear(), date.getMonth()));
		}
		return this._isInRange(inst, date);
	},

	/* Is the given date in the accepted range? */
	_isInRange: function _isInRange(inst, date) {
		var yearSplit,
		    currentYear,
		    minDate = this._getMinMaxDate(inst, "min"),
		    maxDate = this._getMinMaxDate(inst, "max"),
		    minYear = null,
		    maxYear = null,
		    years = this._get(inst, "yearRange");
		if (years) {
			yearSplit = years.split(":");
			currentYear = new Date().getFullYear();
			minYear = parseInt(yearSplit[0], 10);
			maxYear = parseInt(yearSplit[1], 10);
			if (yearSplit[0].match(/[+\-].*/)) {
				minYear += currentYear;
			}
			if (yearSplit[1].match(/[+\-].*/)) {
				maxYear += currentYear;
			}
		}

		return (!minDate || date.getTime() >= minDate.getTime()) && (!maxDate || date.getTime() <= maxDate.getTime()) && (!minYear || date.getFullYear() >= minYear) && (!maxYear || date.getFullYear() <= maxYear);
	},

	/* Provide the configuration settings for formatting/parsing. */
	_getFormatConfig: function _getFormatConfig(inst) {
		var shortYearCutoff = this._get(inst, "shortYearCutoff");
		shortYearCutoff = typeof shortYearCutoff !== "string" ? shortYearCutoff : new Date().getFullYear() % 100 + parseInt(shortYearCutoff, 10);
		return {
			shortYearCutoff: shortYearCutoff,
			dayNamesShort: this._get(inst, "dayNamesShort"),
			dayNames: this._get(inst, "dayNames"),
			monthNamesShort: this._get(inst, "monthNamesShort"),
			monthNames: this._get(inst, "monthNames")
		};
	},

	/* Format the given date for display. */
	_formatDate: function _formatDate(inst, day, month, year) {
		if (!day) {
			inst.currentDay = inst.selectedDay;
			inst.currentMonth = inst.selectedMonth;
			inst.currentYear = inst.selectedYear;
		}
		var date = day ? typeof day === "object" ? day : this._daylightSavingAdjust(new Date(year, month, day)) : this._daylightSavingAdjust(new Date(inst.currentYear, inst.currentMonth, inst.currentDay));
		return this.formatDate(this._get(inst, "dateFormat"), date, this._getFormatConfig(inst));
	}
});

/*
 * Bind hover events for datepicker elements.
 * Done via delegate so the binding only occurs once in the lifetime of the parent div.
 * Global datepicker_instActive, set by _updateDatepicker allows the handlers to find their way back to the active picker.
 */
function datepicker_bindHover(dpDiv) {
	var selector = "button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a";
	return dpDiv.on("mouseout", selector, function () {
		$(this).removeClass("ui-state-hover");
		if (this.className.indexOf("ui-datepicker-prev") !== -1) {
			$(this).removeClass("ui-datepicker-prev-hover");
		}
		if (this.className.indexOf("ui-datepicker-next") !== -1) {
			$(this).removeClass("ui-datepicker-next-hover");
		}
	}).on("mouseover", selector, datepicker_handleMouseover);
}

function datepicker_handleMouseover() {
	if (!$.datepicker._isDisabledDatepicker(datepicker_instActive.inline ? datepicker_instActive.dpDiv.parent()[0] : datepicker_instActive.input[0])) {
		$(this).parents(".ui-datepicker-calendar").find("a").removeClass("ui-state-hover");
		$(this).addClass("ui-state-hover");
		if (this.className.indexOf("ui-datepicker-prev") !== -1) {
			$(this).addClass("ui-datepicker-prev-hover");
		}
		if (this.className.indexOf("ui-datepicker-next") !== -1) {
			$(this).addClass("ui-datepicker-next-hover");
		}
	}
}

/* jQuery extend now ignores nulls! */
function datepicker_extendRemove(target, props) {
	$.extend(target, props);
	for (var name in props) {
		if (props[name] == null) {
			target[name] = props[name];
		}
	}
	return target;
}

/* Invoke the datepicker functionality.
   @param  options  string - a command, optionally followed by additional parameters or
					Object - settings for attaching new datepicker functionality
   @return  jQuery object */
$.fn.datepicker = function (options) {

	/* Verify an empty collection wasn't passed - Fixes #6976 */
	if (!this.length) {
		return this;
	}

	/* Initialise the date picker. */
	if (!$.datepicker.initialized) {
		$(document).on("mousedown", $.datepicker._checkExternalClick);
		$.datepicker.initialized = true;
	}

	/* Append datepicker main container to body if not exist. */
	if ($("#" + $.datepicker._mainDivId).length === 0) {
		$("body").append($.datepicker.dpDiv);
	}

	var otherArgs = Array.prototype.slice.call(arguments, 1);
	if (typeof options === "string" && (options === "isDisabled" || options === "getDate" || options === "widget")) {
		return $.datepicker["_" + options + "Datepicker"].apply($.datepicker, [this[0]].concat(otherArgs));
	}
	if (options === "option" && arguments.length === 2 && typeof arguments[1] === "string") {
		return $.datepicker["_" + options + "Datepicker"].apply($.datepicker, [this[0]].concat(otherArgs));
	}
	return this.each(function () {
		typeof options === "string" ? $.datepicker["_" + options + "Datepicker"].apply($.datepicker, [this].concat(otherArgs)) : $.datepicker._attachDatepicker(this, options);
	});
};

$.datepicker = new Datepicker(); // singleton instance
$.datepicker.initialized = false;
$.datepicker.uuid = new Date().getTime();
$.datepicker.version = "1.12.1";

var datepicker = $.datepicker;

datepicker.regional.es = {
	closeText: "Cerrar",
	prevText: "&#x3C;Ant",
	nextText: "Sig&#x3E;",
	currentText: "Hoy",
	monthNames: ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"],
	monthNamesShort: ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"],
	dayNames: ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"],
	dayNamesShort: ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"],
	dayNamesMin: ["D", "L", "M", "X", "J", "V", "S"],
	weekHeader: "Sm",
	dateFormat: "dd/mm/yy",
	firstDay: 1,
	isRTL: false,
	showMonthAfterYear: false,
	yearSuffix: ""
};
datepicker.setDefaults(datepicker.regional.es);

/*!
 * jQuery UI Rotatable
 */
widget$1("ui.rotatable", mouse, {

	options: {
		handle: false,
		angle: false,

		// callbacks
		start: null,
		rotate: null,
		stop: null
	},

	handle: function handle(_handle) {
		if (_handle === undefined) {
			return this.options.handle;
		}
		this.options.handle = _handle;
	},

	angle: function angle(_angle) {
		if (_angle === undefined) {
			return this.options.angle;
		}
		this.options.angle = _angle;
		this.performRotation(this.options.angle);
	},

	_create: function _create() {
		var handle;
		if (!this.options.handle) {
			handle = $(document.createElement('div'));
			handle.addClass('ui-rotatable-handle');
		} else {
			handle = this.options.handle;
		}

		this.listeners = {
			rotateElement: $.proxy(this.rotateElement, this),
			startRotate: $.proxy(this.startRotate, this),
			stopRotate: $.proxy(this.stopRotate, this)
		};

		handle.draggable({
			helper: 'clone',
			start: this.dragStart,
			handle: handle
		});

		handle.appendTo(this.element);
		handle.on('mousedown', this.listeners.startRotate);

		if (this.options.angle !== false) {
			this.elementCurrentAngle = this.options.angle;
			this.performRotation(this.elementCurrentAngle);
		} else {
			this.elementCurrentAngle = 0;
		}
	},

	_destroy: function _destroy() {
		this.element.removeClass('ui-rotatable');
		this.element.find('.ui-rotatable-handle').remove();
	},

	performRotation: function performRotation(angle) {
		this.element.css('transform', 'rotate(' + angle + 'rad)');
		this.element.css('-moz-transform', 'rotate(' + angle + 'rad)');
		this.element.css('-webkit-transform', 'rotate(' + angle + 'rad)');
		this.element.css('-o-transform', 'rotate(' + angle + 'rad)');
	},

	getElementOffset: function getElementOffset() {
		this.performRotation(0);
		var offset = this.element.offset();
		this.performRotation(this.elementCurrentAngle);
		return offset;
	},

	getElementCenter: function getElementCenter() {
		var elementOffset = this.getElementOffset();
		var elementCentreX = elementOffset.left + this.element.width() / 2;
		var elementCentreY = elementOffset.top + this.element.height() / 2;
		return [elementCentreX, elementCentreY];
	},

	dragStart: function dragStart(event) {
		if (this.element) {
			return false;
		}
	},

	startRotate: function startRotate(event) {
		var center = this.getElementCenter();
		var startXFromCenter = event.pageX - center[0];
		var startYFromCenter = event.pageY - center[1];
		this.mouseStartAngle = Math.atan2(startYFromCenter, startXFromCenter);
		this.elementStartAngle = this.elementCurrentAngle;
		this.hasRotated = false;

		this._propagate("start", event);

		$(document).on('mousemove', this.listeners.rotateElement);
		$(document).on('mouseup', this.listeners.stopRotate);

		return false;
	},

	rotateElement: function rotateElement(event) {
		if (!this.element) {
			return false;
		}

		var center = this.getElementCenter();

		var xFromCenter = event.pageX - center[0];
		var yFromCenter = event.pageY - center[1];
		var mouseAngle = Math.atan2(yFromCenter, xFromCenter);
		var rotateAngle = mouseAngle - this.mouseStartAngle + this.elementStartAngle;

		this.performRotation(rotateAngle);
		this.element.data('angle', rotateAngle);

		var previousRotateAngle = this.elementCurrentAngle;
		this.elementCurrentAngle = rotateAngle;

		// Plugins callbacks need to be called first.
		this._propagate("rotate", event);

		if (previousRotateAngle !== rotateAngle) {
			this._trigger("rotate", event, this.ui());
			this.hasRotated = true;
		}

		return false;
	},

	stopRotate: function stopRotate(event) {
		if (!this.element) {
			return;
		}

		$(document).off('mousemove', this.listeners.rotateElement);
		$(document).off('mouseup', this.listeners.stopRotate);

		this.elementStopAngle = this.elementCurrentAngle;
		if (this.hasRotated) {
			this._propagate("stop", event);
		}

		setTimeout(function () {
			this.element = false;
		}, 10);
		return false;
	},

	_propagate: function _propagate(n, event) {
		plugin.call(this, n, [event, this.ui()]);
		if (n !== "rotate") {
			this._trigger(n, event, this.ui());
		}
	},

	plugins: {},

	ui: function ui() {
		return {
			element: this.element,
			angle: {
				start: this.elementStartAngle,
				current: this.elementCurrentAngle,
				stop: this.elementStopAngle
			}
		};
	}

});

/*!
 * jQuery UI Droppable 1.12.0
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */

//>>label: Droppable
//>>group: Interactions
//>>description: Enables drop targets for draggable elements.
//>>docs: http://api.jqueryui.com/droppable/
//>>demos: http://jqueryui.com/droppable/

widget$1("ui.droppable", {
	version: "1.12.0",
	widgetEventPrefix: "drop",
	options: {
		accept: "*",
		addClasses: true,
		greedy: false,
		scope: "default",
		tolerance: "intersect",

		// Callbacks
		activate: null,
		deactivate: null,
		drop: null,
		out: null,
		over: null
	},
	_create: function _create() {

		var proportions,
		    o = this.options,
		    accept = o.accept;

		this.isover = false;
		this.isout = true;

		this.accept = $.isFunction(accept) ? accept : function (d) {
			return d.is(accept);
		};

		this.proportions = function () /* valueToWrite */{
			if (arguments.length) {

				// Store the droppable's proportions
				proportions = arguments[0];
			} else {

				// Retrieve or derive the droppable's proportions
				return proportions ? proportions : proportions = {
					width: this.element[0].offsetWidth,
					height: this.element[0].offsetHeight
				};
			}
		};

		this._addToManager(o.scope);

		o.addClasses && this._addClass("ui-droppable");
	},

	_addToManager: function _addToManager(scope) {

		// Add the reference and positions to the manager
		$.ui.ddmanager.droppables[scope] = $.ui.ddmanager.droppables[scope] || [];
		$.ui.ddmanager.droppables[scope].push(this);
	},

	_splice: function _splice(drop) {
		var i = 0;
		for (; i < drop.length; i++) {
			if (drop[i] === this) {
				drop.splice(i, 1);
			}
		}
	},

	_destroy: function _destroy() {
		var drop = $.ui.ddmanager.droppables[this.options.scope];

		this._splice(drop);
	},

	_setOption: function _setOption(key, value) {

		if (key === "accept") {
			this.accept = $.isFunction(value) ? value : function (d) {
				return d.is(value);
			};
		} else if (key === "scope") {
			var drop = $.ui.ddmanager.droppables[this.options.scope];

			this._splice(drop);
			this._addToManager(value);
		}

		this._super(key, value);
	},

	_activate: function _activate(event) {
		var draggable$$1 = $.ui.ddmanager.current;

		this._addActiveClass();
		if (draggable$$1) {
			this._trigger("activate", event, this.ui(draggable$$1));
		}
	},

	_deactivate: function _deactivate(event) {
		var draggable$$1 = $.ui.ddmanager.current;

		this._removeActiveClass();
		if (draggable$$1) {
			this._trigger("deactivate", event, this.ui(draggable$$1));
		}
	},

	_over: function _over(event) {

		var draggable$$1 = $.ui.ddmanager.current;

		// Bail if draggable and droppable are same element
		if (!draggable$$1 || (draggable$$1.currentItem || draggable$$1.element)[0] === this.element[0]) {
			return;
		}

		if (this.accept.call(this.element[0], draggable$$1.currentItem || draggable$$1.element)) {
			this._addHoverClass();
			this._trigger("over", event, this.ui(draggable$$1));
		}
	},

	_out: function _out(event) {

		var draggable$$1 = $.ui.ddmanager.current;

		// Bail if draggable and droppable are same element
		if (!draggable$$1 || (draggable$$1.currentItem || draggable$$1.element)[0] === this.element[0]) {
			return;
		}

		if (this.accept.call(this.element[0], draggable$$1.currentItem || draggable$$1.element)) {
			this._removeHoverClass();
			this._trigger("out", event, this.ui(draggable$$1));
		}
	},

	_drop: function _drop(event, custom) {

		var draggable$$1 = custom || $.ui.ddmanager.current,
		    childrenIntersection = false;

		// Bail if draggable and droppable are same element
		if (!draggable$$1 || (draggable$$1.currentItem || draggable$$1.element)[0] === this.element[0]) {
			return false;
		}

		this.element.find(":data(ui-droppable)").not(".ui-draggable-dragging").each(function () {
			var inst = $(this).droppable("instance");
			if (inst.options.greedy && !inst.options.disabled && inst.options.scope === draggable$$1.options.scope && inst.accept.call(inst.element[0], draggable$$1.currentItem || draggable$$1.element) && intersect(draggable$$1, $.extend(inst, {
				offset: inst.element.offset()
			}), inst.options.tolerance, event)) {
				childrenIntersection = true;
				return false;
			}
		});
		if (childrenIntersection) {
			return false;
		}

		if (this.accept.call(this.element[0], draggable$$1.currentItem || draggable$$1.element)) {
			this._removeActiveClass();
			this._removeHoverClass();

			this._trigger("drop", event, this.ui(draggable$$1));
			return this.element;
		}

		return false;
	},

	ui: function ui(c) {
		return {
			draggable: c.currentItem || c.element,
			helper: c.helper,
			position: c.position,
			offset: c.positionAbs
		};
	},

	// Extension points just to make backcompat sane and avoid duplicating logic
	// TODO: Remove in 1.13 along with call to it below
	_addHoverClass: function _addHoverClass() {
		this._addClass("ui-droppable-hover");
	},

	_removeHoverClass: function _removeHoverClass() {
		this._removeClass("ui-droppable-hover");
	},

	_addActiveClass: function _addActiveClass() {
		this._addClass("ui-droppable-active");
	},

	_removeActiveClass: function _removeActiveClass() {
		this._removeClass("ui-droppable-active");
	}
});

/*
	This manager tracks offsets of draggables and droppables
*/
$.ui.ddmanager = {
	current: null,
	droppables: {
		"default": []
	},
	prepareOffsets: function prepareOffsets(t, event) {

		var i,
		    j,
		    m = $.ui.ddmanager.droppables[t.options.scope] || [],
		    type = event ? event.type : null,
		    // workaround for #2317
		list = (t.currentItem || t.element).find(":data(ui-droppable)").addBack();

		droppablesLoop: for (i = 0; i < m.length; i++) {

			// No disabled and non-accepted
			if (m[i].options.disabled || t && !m[i].accept.call(m[i].element[0], t.currentItem || t.element)) {
				continue;
			}

			// Filter out elements in the current dragged item
			for (j = 0; j < list.length; j++) {
				if (list[j] === m[i].element[0]) {
					m[i].proportions().height = 0;
					continue droppablesLoop;
				}
			}

			m[i].visible = m[i].element.css("display") !== "none";
			if (!m[i].visible) {
				continue;
			}

			// Activate the droppable if used directly from draggables
			if (type === "mousedown") {
				m[i]._activate.call(m[i], event);
			}

			m[i].offset = m[i].element.offset();
			m[i].proportions({
				width: m[i].element[0].offsetWidth,
				height: m[i].element[0].offsetHeight
			});
		}
	},
	drop: function drop(draggable$$1, event) {

		var dropped = false;

		// Create a copy of the droppables in case the list changes during the drop (#9116)
		$.each(($.ui.ddmanager.droppables[draggable$$1.options.scope] || []).slice(), function () {

			if (!this.options) {
				return;
			}
			if (!this.options.disabled && this.visible && intersect(draggable$$1, this, this.options.tolerance, event)) {
				dropped = this._drop.call(this, event) || dropped;
			}

			if (!this.options.disabled && this.visible && this.accept.call(this.element[0], draggable$$1.currentItem || draggable$$1.element)) {
				this.isout = true;
				this.isover = false;
				this._deactivate.call(this, event);
			}
		});
		return dropped;
	},
	dragStart: function dragStart(draggable$$1, event) {

		// Listen for scrolling so that if the dragging causes scrolling the position of the
		// droppables can be recalculated (see #5003)
		draggable$$1.element.parentsUntil("body").on("scroll.droppable", function () {
			if (!draggable$$1.options.refreshPositions) {
				$.ui.ddmanager.prepareOffsets(draggable$$1, event);
			}
		});
	},
	drag: function drag(draggable$$1, event) {

		// If you have a highly dynamic page, you might try this option. It renders positions
		// every time you move the mouse.
		if (draggable$$1.options.refreshPositions) {
			$.ui.ddmanager.prepareOffsets(draggable$$1, event);
		}

		// Run through all droppables and check their positions based on specific tolerance options
		$.each($.ui.ddmanager.droppables[draggable$$1.options.scope] || [], function () {

			if (this.options.disabled || this.greedyChild || !this.visible) {
				return;
			}

			var parentInstance,
			    scope,
			    parent,
			    intersects = intersect(draggable$$1, this, this.options.tolerance, event),
			    c = !intersects && this.isover ? "isout" : intersects && !this.isover ? "isover" : null;
			if (!c) {
				return;
			}

			if (this.options.greedy) {

				// find droppable parents with same scope
				scope = this.options.scope;
				parent = this.element.parents(":data(ui-droppable)").filter(function () {
					return $(this).droppable("instance").options.scope === scope;
				});

				if (parent.length) {
					parentInstance = $(parent[0]).droppable("instance");
					parentInstance.greedyChild = c === "isover";
				}
			}

			// We just moved into a greedy child
			if (parentInstance && c === "isover") {
				parentInstance.isover = false;
				parentInstance.isout = true;
				parentInstance._out.call(parentInstance, event);
			}

			this[c] = true;
			this[c === "isout" ? "isover" : "isout"] = false;
			this[c === "isover" ? "_over" : "_out"].call(this, event);

			// We just moved out of a greedy child
			if (parentInstance && c === "isout") {
				parentInstance.isout = false;
				parentInstance.isover = true;
				parentInstance._over.call(parentInstance, event);
			}
		});
	},
	dragStop: function dragStop(draggable$$1, event) {
		draggable$$1.element.parentsUntil("body").off("scroll.droppable");

		// Call prepareOffsets one final time since IE does not fire return scroll events when
		// overflow was caused by drag (see #5003)
		if (!draggable$$1.options.refreshPositions) {
			$.ui.ddmanager.prepareOffsets(draggable$$1, event);
		}
	}
};

/*!
 * jQuery UI Resizable 1.12.0
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */

//>>label: Resizable
//>>group: Interactions
//>>description: Enables resize functionality for any element.
//>>docs: http://api.jqueryui.com/resizable/
//>>demos: http://jqueryui.com/resizable/
//>>css.structure: ../../themes/base/core.css
//>>css.structure: ../../themes/base/resizable.css
//>>css.theme: ../../themes/base/theme.css

widget$1("ui.resizable", mouse, {
	version: "1.12.0",
	widgetEventPrefix: "resize",
	options: {
		alsoResize: false,
		animate: false,
		animateDuration: "slow",
		animateEasing: "swing",
		aspectRatio: false,
		autoHide: false,
		classes: {
			"ui-resizable-se": "ui-icon ui-icon-gripsmall-diagonal-se"
		},
		containment: false,
		ghost: false,
		grid: false,
		handles: "e,s,se",
		helper: false,
		maxHeight: null,
		maxWidth: null,
		minHeight: 10,
		minWidth: 10,

		// See #7960
		zIndex: 90,

		// Callbacks
		resize: null,
		start: null,
		stop: null
	},

	_num: function _num(value) {
		return parseFloat(value) || 0;
	},

	_isNumber: function _isNumber(value) {
		return !isNaN(parseFloat(value));
	},

	_hasScroll: function _hasScroll(el, a) {

		if ($(el).css("overflow") === "hidden") {
			return false;
		}

		var scroll = a && a === "left" ? "scrollLeft" : "scrollTop",
		    has = false;

		if (el[scroll] > 0) {
			return true;
		}

		// TODO: determine which cases actually cause this to happen
		// if the element doesn't have the scroll set, see if it's possible to
		// set the scroll
		el[scroll] = 1;
		has = el[scroll] > 0;
		el[scroll] = 0;
		return has;
	},

	_create: function _create() {

		var margins,
		    o = this.options,
		    that = this;
		this._addClass("ui-resizable");

		$.extend(this, {
			_aspectRatio: !!o.aspectRatio,
			aspectRatio: o.aspectRatio,
			originalElement: this.element,
			_proportionallyResizeElements: [],
			_helper: o.helper || o.ghost || o.animate ? o.helper || "ui-resizable-helper" : null
		});

		// Wrap the element if it cannot hold child nodes
		if (this.element[0].nodeName.match(/^(canvas|textarea|input|select|button|img)$/i)) {

			this.element.wrap($("<div class='ui-wrapper' style='overflow: hidden;'></div>").css({
				position: this.element.css("position"),
				width: this.element.outerWidth(),
				height: this.element.outerHeight(),
				top: this.element.css("top"),
				left: this.element.css("left")
			}));

			this.element = this.element.parent().data("ui-resizable", this.element.resizable("instance"));

			this.elementIsWrapper = true;

			margins = {
				marginTop: this.originalElement.css("marginTop"),
				marginRight: this.originalElement.css("marginRight"),
				marginBottom: this.originalElement.css("marginBottom"),
				marginLeft: this.originalElement.css("marginLeft")
			};

			this.element.css(margins);
			this.originalElement.css("margin", 0);

			// support: Safari
			// Prevent Safari textarea resize
			this.originalResizeStyle = this.originalElement.css("resize");
			this.originalElement.css("resize", "none");

			this._proportionallyResizeElements.push(this.originalElement.css({
				position: "static",
				zoom: 1,
				display: "block"
			}));

			// Support: IE9
			// avoid IE jump (hard set the margin)
			this.originalElement.css(margins);

			this._proportionallyResize();
		}

		this._setupHandles();

		if (o.autoHide) {
			$(this.element).on("mouseenter", function () {
				if (o.disabled) {
					return;
				}
				that._removeClass("ui-resizable-autohide");
				that._handles.show();
			}).on("mouseleave", function () {
				if (o.disabled) {
					return;
				}
				if (!that.resizing) {
					that._addClass("ui-resizable-autohide");
					that._handles.hide();
				}
			});
		}

		this._mouseInit();
	},

	_destroy: function _destroy() {

		this._mouseDestroy();

		var wrapper,
		    _destroy = function _destroy(exp) {
			$(exp).removeData("resizable").removeData("ui-resizable").off(".resizable").find(".ui-resizable-handle").remove();
		};

		// TODO: Unwrap at same DOM position
		if (this.elementIsWrapper) {
			_destroy(this.element);
			wrapper = this.element;
			this.originalElement.css({
				position: wrapper.css("position"),
				width: wrapper.outerWidth(),
				height: wrapper.outerHeight(),
				top: wrapper.css("top"),
				left: wrapper.css("left")
			}).insertAfter(wrapper);
			wrapper.remove();
		}

		this.originalElement.css("resize", this.originalResizeStyle);
		_destroy(this.originalElement);

		return this;
	},

	_setOption: function _setOption(key, value) {
		this._super(key, value);

		switch (key) {
			case "handles":
				this._removeHandles();
				this._setupHandles();
				break;
			default:
				break;
		}
	},

	_setupHandles: function _setupHandles() {
		var o = this.options,
		    handle,
		    i,
		    n,
		    hname,
		    axis,
		    that = this;
		this.handles = o.handles || (!$(".ui-resizable-handle", this.element).length ? "e,s,se" : {
			n: ".ui-resizable-n",
			e: ".ui-resizable-e",
			s: ".ui-resizable-s",
			w: ".ui-resizable-w",
			se: ".ui-resizable-se",
			sw: ".ui-resizable-sw",
			ne: ".ui-resizable-ne",
			nw: ".ui-resizable-nw"
		});

		this._handles = $();
		if (this.handles.constructor === String) {

			if (this.handles === "all") {
				this.handles = "n,e,s,w,se,sw,ne,nw";
			}

			n = this.handles.split(",");
			this.handles = {};

			for (i = 0; i < n.length; i++) {

				handle = $.trim(n[i]);
				hname = "ui-resizable-" + handle;
				axis = $("<div>");
				this._addClass(axis, "ui-resizable-handle " + hname);

				axis.css({
					zIndex: o.zIndex
				});

				this.handles[handle] = ".ui-resizable-" + handle;
				this.element.append(axis);
			}
		}

		this._renderAxis = function (target) {

			var i, axis, padPos, padWrapper;

			target = target || this.element;

			for (i in this.handles) {

				if (this.handles[i].constructor === String) {
					this.handles[i] = this.element.children(this.handles[i]).first().show();
				} else if (this.handles[i].jquery || this.handles[i].nodeType) {
					this.handles[i] = $(this.handles[i]);
					this._on(this.handles[i], {
						"mousedown": that._mouseDown
					});
				}

				if (this.elementIsWrapper && this.originalElement[0].nodeName.match(/^(textarea|input|select|button)$/i)) {
					axis = $(this.handles[i], this.element);

					padWrapper = /sw|ne|nw|se|n|s/.test(i) ? axis.outerHeight() : axis.outerWidth();

					padPos = ["padding", /ne|nw|n/.test(i) ? "Top" : /se|sw|s/.test(i) ? "Bottom" : /^e$/.test(i) ? "Right" : "Left"].join("");

					target.css(padPos, padWrapper);

					this._proportionallyResize();
				}

				this._handles = this._handles.add(this.handles[i]);
			}
		};

		// TODO: make renderAxis a prototype function
		this._renderAxis(this.element);

		this._handles = this._handles.add(this.element.find(".ui-resizable-handle"));
		this._handles.disableSelection();

		this._handles.on("mouseover", function () {
			if (!that.resizing) {
				if (this.className) {
					axis = this.className.match(/ui-resizable-(se|sw|ne|nw|n|e|s|w)/i);
				}
				that.axis = axis && axis[1] ? axis[1] : "se";
			}
		});

		if (o.autoHide) {
			this._handles.hide();
			this._addClass("ui-resizable-autohide");
		}
	},

	_removeHandles: function _removeHandles() {
		this._handles.remove();
	},

	_mouseCapture: function _mouseCapture(event) {
		var i,
		    handle,
		    capture = false;

		for (i in this.handles) {
			handle = $(this.handles[i])[0];
			if (handle === event.target || $.contains(handle, event.target)) {
				capture = true;
			}
		}

		return !this.options.disabled && capture;
	},

	_mouseStart: function _mouseStart(event) {

		var curleft,
		    curtop,
		    cursor,
		    o = this.options,
		    el = this.element;

		this.resizing = true;

		this._renderProxy();

		curleft = this._num(this.helper.css("left"));
		curtop = this._num(this.helper.css("top"));

		if (o.containment) {
			curleft += $(o.containment).scrollLeft() || 0;
			curtop += $(o.containment).scrollTop() || 0;
		}

		this.offset = this.helper.offset();
		this.position = {
			left: curleft,
			top: curtop
		};

		this.size = this._helper ? {
			width: this.helper.width(),
			height: this.helper.height()
		} : {
			width: el.width(),
			height: el.height()
		};

		this.originalSize = this._helper ? {
			width: el.outerWidth(),
			height: el.outerHeight()
		} : {
			width: el.width(),
			height: el.height()
		};

		this.sizeDiff = {
			width: el.outerWidth() - el.width(),
			height: el.outerHeight() - el.height()
		};

		this.originalPosition = {
			left: curleft,
			top: curtop
		};
		this.originalMousePosition = {
			left: event.pageX,
			top: event.pageY
		};

		this.aspectRatio = typeof o.aspectRatio === "number" ? o.aspectRatio : this.originalSize.width / this.originalSize.height || 1;

		cursor = $(".ui-resizable-" + this.axis).css("cursor");
		$("body").css("cursor", cursor === "auto" ? this.axis + "-resize" : cursor);

		this._addClass("ui-resizable-resizing");
		this._propagate("start", event);
		return true;
	},

	_mouseDrag: function _mouseDrag(event) {

		var data,
		    props,
		    smp = this.originalMousePosition,
		    a = this.axis,
		    dx = event.pageX - smp.left || 0,
		    dy = event.pageY - smp.top || 0,
		    trigger = this._change[a];

		this._updatePrevProperties();

		if (!trigger) {
			return false;
		}

		data = trigger.apply(this, [event, dx, dy]);

		this._updateVirtualBoundaries(event.shiftKey);
		if (this._aspectRatio || event.shiftKey) {
			data = this._updateRatio(data, event);
		}

		data = this._respectSize(data, event);

		this._updateCache(data);

		this._propagate("resize", event);

		props = this._applyChanges();

		if (!this._helper && this._proportionallyResizeElements.length) {
			this._proportionallyResize();
		}

		if (!$.isEmptyObject(props)) {
			this._updatePrevProperties();
			this._trigger("resize", event, this.ui());
			this._applyChanges();
		}

		return false;
	},

	_mouseStop: function _mouseStop(event) {

		this.resizing = false;
		var pr,
		    ista,
		    soffseth,
		    soffsetw,
		    s,
		    left,
		    top,
		    o = this.options,
		    that = this;

		if (this._helper) {

			pr = this._proportionallyResizeElements;
			ista = pr.length && /textarea/i.test(pr[0].nodeName);
			soffseth = ista && this._hasScroll(pr[0], "left") ? 0 : that.sizeDiff.height;
			soffsetw = ista ? 0 : that.sizeDiff.width;

			s = {
				width: that.helper.width() - soffsetw,
				height: that.helper.height() - soffseth
			};
			left = parseFloat(that.element.css("left")) + (that.position.left - that.originalPosition.left) || null;
			top = parseFloat(that.element.css("top")) + (that.position.top - that.originalPosition.top) || null;

			if (!o.animate) {
				this.element.css($.extend(s, {
					top: top,
					left: left
				}));
			}

			that.helper.height(that.size.height);
			that.helper.width(that.size.width);

			if (this._helper && !o.animate) {
				this._proportionallyResize();
			}
		}

		$("body").css("cursor", "auto");

		this._removeClass("ui-resizable-resizing");

		this._propagate("stop", event);

		if (this._helper) {
			this.helper.remove();
		}

		return false;
	},

	_updatePrevProperties: function _updatePrevProperties() {
		this.prevPosition = {
			top: this.position.top,
			left: this.position.left
		};
		this.prevSize = {
			width: this.size.width,
			height: this.size.height
		};
	},

	_applyChanges: function _applyChanges() {
		var props = {};

		if (this.position.top !== this.prevPosition.top) {
			props.top = this.position.top + "px";
		}
		if (this.position.left !== this.prevPosition.left) {
			props.left = this.position.left + "px";
		}
		if (this.size.width !== this.prevSize.width) {
			props.width = this.size.width + "px";
		}
		if (this.size.height !== this.prevSize.height) {
			props.height = this.size.height + "px";
		}

		this.helper.css(props);

		return props;
	},

	_updateVirtualBoundaries: function _updateVirtualBoundaries(forceAspectRatio) {
		var pMinWidth,
		    pMaxWidth,
		    pMinHeight,
		    pMaxHeight,
		    b,
		    o = this.options;

		b = {
			minWidth: this._isNumber(o.minWidth) ? o.minWidth : 0,
			maxWidth: this._isNumber(o.maxWidth) ? o.maxWidth : Infinity,
			minHeight: this._isNumber(o.minHeight) ? o.minHeight : 0,
			maxHeight: this._isNumber(o.maxHeight) ? o.maxHeight : Infinity
		};

		if (this._aspectRatio || forceAspectRatio) {
			pMinWidth = b.minHeight * this.aspectRatio;
			pMinHeight = b.minWidth / this.aspectRatio;
			pMaxWidth = b.maxHeight * this.aspectRatio;
			pMaxHeight = b.maxWidth / this.aspectRatio;

			if (pMinWidth > b.minWidth) {
				b.minWidth = pMinWidth;
			}
			if (pMinHeight > b.minHeight) {
				b.minHeight = pMinHeight;
			}
			if (pMaxWidth < b.maxWidth) {
				b.maxWidth = pMaxWidth;
			}
			if (pMaxHeight < b.maxHeight) {
				b.maxHeight = pMaxHeight;
			}
		}
		this._vBoundaries = b;
	},

	_updateCache: function _updateCache(data) {
		this.offset = this.helper.offset();
		if (this._isNumber(data.left)) {
			this.position.left = data.left;
		}
		if (this._isNumber(data.top)) {
			this.position.top = data.top;
		}
		if (this._isNumber(data.height)) {
			this.size.height = data.height;
		}
		if (this._isNumber(data.width)) {
			this.size.width = data.width;
		}
	},

	_updateRatio: function _updateRatio(data) {

		var cpos = this.position,
		    csize = this.size,
		    a = this.axis;

		if (this._isNumber(data.height)) {
			data.width = data.height * this.aspectRatio;
		} else if (this._isNumber(data.width)) {
			data.height = data.width / this.aspectRatio;
		}

		if (a === "sw") {
			data.left = cpos.left + (csize.width - data.width);
			data.top = null;
		}
		if (a === "nw") {
			data.top = cpos.top + (csize.height - data.height);
			data.left = cpos.left + (csize.width - data.width);
		}

		return data;
	},

	_respectSize: function _respectSize(data) {

		var o = this._vBoundaries,
		    a = this.axis,
		    ismaxw = this._isNumber(data.width) && o.maxWidth && o.maxWidth < data.width,
		    ismaxh = this._isNumber(data.height) && o.maxHeight && o.maxHeight < data.height,
		    isminw = this._isNumber(data.width) && o.minWidth && o.minWidth > data.width,
		    isminh = this._isNumber(data.height) && o.minHeight && o.minHeight > data.height,
		    dw = this.originalPosition.left + this.originalSize.width,
		    dh = this.originalPosition.top + this.originalSize.height,
		    cw = /sw|nw|w/.test(a),
		    ch = /nw|ne|n/.test(a);
		if (isminw) {
			data.width = o.minWidth;
		}
		if (isminh) {
			data.height = o.minHeight;
		}
		if (ismaxw) {
			data.width = o.maxWidth;
		}
		if (ismaxh) {
			data.height = o.maxHeight;
		}

		if (isminw && cw) {
			data.left = dw - o.minWidth;
		}
		if (ismaxw && cw) {
			data.left = dw - o.maxWidth;
		}
		if (isminh && ch) {
			data.top = dh - o.minHeight;
		}
		if (ismaxh && ch) {
			data.top = dh - o.maxHeight;
		}

		// Fixing jump error on top/left - bug #2330
		if (!data.width && !data.height && !data.left && data.top) {
			data.top = null;
		} else if (!data.width && !data.height && !data.top && data.left) {
			data.left = null;
		}

		return data;
	},

	_getPaddingPlusBorderDimensions: function _getPaddingPlusBorderDimensions(element) {
		var i = 0,
		    widths = [],
		    borders = [element.css("borderTopWidth"), element.css("borderRightWidth"), element.css("borderBottomWidth"), element.css("borderLeftWidth")],
		    paddings = [element.css("paddingTop"), element.css("paddingRight"), element.css("paddingBottom"), element.css("paddingLeft")];

		for (; i < 4; i++) {
			widths[i] = parseFloat(borders[i]) || 0;
			widths[i] += parseFloat(paddings[i]) || 0;
		}

		return {
			height: widths[0] + widths[2],
			width: widths[1] + widths[3]
		};
	},

	_proportionallyResize: function _proportionallyResize() {

		if (!this._proportionallyResizeElements.length) {
			return;
		}

		var prel,
		    i = 0,
		    element = this.helper || this.element;

		for (; i < this._proportionallyResizeElements.length; i++) {

			prel = this._proportionallyResizeElements[i];

			// TODO: Seems like a bug to cache this.outerDimensions
			// considering that we are in a loop.
			if (!this.outerDimensions) {
				this.outerDimensions = this._getPaddingPlusBorderDimensions(prel);
			}

			prel.css({
				height: element.height() - this.outerDimensions.height || 0,
				width: element.width() - this.outerDimensions.width || 0
			});
		}
	},

	_renderProxy: function _renderProxy() {

		var el = this.element,
		    o = this.options;
		this.elementOffset = el.offset();

		if (this._helper) {

			this.helper = this.helper || $("<div style='overflow:hidden;'></div>");

			this._addClass(this.helper, this._helper);
			this.helper.css({
				width: this.element.outerWidth(),
				height: this.element.outerHeight(),
				position: "absolute",
				left: this.elementOffset.left + "px",
				top: this.elementOffset.top + "px",
				zIndex: ++o.zIndex //TODO: Don't modify option
			});

			this.helper.appendTo("body").disableSelection();
		} else {
			this.helper = this.element;
		}
	},

	_change: {
		e: function e(event, dx) {
			return {
				width: this.originalSize.width + dx
			};
		},
		w: function w(event, dx) {
			var cs = this.originalSize,
			    sp = this.originalPosition;
			return {
				left: sp.left + dx,
				width: cs.width - dx
			};
		},
		n: function n(event, dx, dy) {
			var cs = this.originalSize,
			    sp = this.originalPosition;
			return {
				top: sp.top + dy,
				height: cs.height - dy
			};
		},
		s: function s(event, dx, dy) {
			return {
				height: this.originalSize.height + dy
			};
		},
		se: function se(event, dx, dy) {
			return $.extend(this._change.s.apply(this, arguments), this._change.e.apply(this, [event, dx, dy]));
		},
		sw: function sw(event, dx, dy) {
			return $.extend(this._change.s.apply(this, arguments), this._change.w.apply(this, [event, dx, dy]));
		},
		ne: function ne(event, dx, dy) {
			return $.extend(this._change.n.apply(this, arguments), this._change.e.apply(this, [event, dx, dy]));
		},
		nw: function nw(event, dx, dy) {
			return $.extend(this._change.n.apply(this, arguments), this._change.w.apply(this, [event, dx, dy]));
		}
	},

	_propagate: function _propagate(n, event) {
		plugin.call(this, n, [event, this.ui()]);
		n !== "resize" && this._trigger(n, event, this.ui());
	},

	plugins: {},

	ui: function ui() {
		return {
			originalElement: this.originalElement,
			element: this.element,
			helper: this.helper,
			position: this.position,
			size: this.size,
			originalSize: this.originalSize,
			originalPosition: this.originalPosition
		};
	}

});

/*
 * Resizable Extensions
 */

plugin.add("resizable", "animate", {

	stop: function stop(event) {
		var that = $(this).resizable("instance"),
		    o = that.options,
		    pr = that._proportionallyResizeElements,
		    ista = pr.length && /textarea/i.test(pr[0].nodeName),
		    soffseth = ista && that._hasScroll(pr[0], "left") ? 0 : that.sizeDiff.height,
		    soffsetw = ista ? 0 : that.sizeDiff.width,
		    style = {
			width: that.size.width - soffsetw,
			height: that.size.height - soffseth
		},
		    left = parseFloat(that.element.css("left")) + (that.position.left - that.originalPosition.left) || null,
		    top = parseFloat(that.element.css("top")) + (that.position.top - that.originalPosition.top) || null;

		that.element.animate($.extend(style, top && left ? {
			top: top,
			left: left
		} : {}), {
			duration: o.animateDuration,
			easing: o.animateEasing,
			step: function step() {

				var data = {
					width: parseFloat(that.element.css("width")),
					height: parseFloat(that.element.css("height")),
					top: parseFloat(that.element.css("top")),
					left: parseFloat(that.element.css("left"))
				};

				if (pr && pr.length) {
					$(pr[0]).css({
						width: data.width,
						height: data.height
					});
				}

				// Propagating resize, and updating values for each animation step
				that._updateCache(data);
				that._propagate("resize", event);
			}
		});
	}

});

plugin.add("resizable", "containment", {

	start: function start() {
		var element,
		    p,
		    co,
		    ch,
		    cw,
		    width,
		    height,
		    that = $(this).resizable("instance"),
		    o = that.options,
		    el = that.element,
		    oc = o.containment,
		    ce = oc instanceof $ ? oc.get(0) : /parent/.test(oc) ? el.parent().get(0) : oc;

		if (!ce) {
			return;
		}

		that.containerElement = $(ce);

		if (/document/.test(oc) || oc === document) {
			that.containerOffset = {
				left: 0,
				top: 0
			};
			that.containerPosition = {
				left: 0,
				top: 0
			};

			that.parentData = {
				element: $(document),
				left: 0,
				top: 0,
				width: $(document).width(),
				height: $(document).height() || document.body.parentNode.scrollHeight
			};
		} else {
			element = $(ce);
			p = [];
			$(["Top", "Right", "Left", "Bottom"]).each(function (i, name) {
				p[i] = that._num(element.css("padding" + name));
			});

			that.containerOffset = element.offset();
			that.containerPosition = element.position();
			that.containerSize = {
				height: element.innerHeight() - p[3],
				width: element.innerWidth() - p[1]
			};

			co = that.containerOffset;
			ch = that.containerSize.height;
			cw = that.containerSize.width;
			width = that._hasScroll(ce, "left") ? ce.scrollWidth : cw;
			height = that._hasScroll(ce) ? ce.scrollHeight : ch;

			that.parentData = {
				element: ce,
				left: co.left,
				top: co.top,
				width: width,
				height: height
			};
		}
	},

	resize: function resize(event) {
		var woset,
		    hoset,
		    isParent,
		    isOffsetRelative,
		    that = $(this).resizable("instance"),
		    o = that.options,
		    co = that.containerOffset,
		    cp = that.position,
		    pRatio = that._aspectRatio || event.shiftKey,
		    cop = {
			top: 0,
			left: 0
		},
		    ce = that.containerElement,
		    continueResize = true;

		if (ce[0] !== document && /static/.test(ce.css("position"))) {
			cop = co;
		}

		if (cp.left < (that._helper ? co.left : 0)) {
			that.size.width = that.size.width + (that._helper ? that.position.left - co.left : that.position.left - cop.left);

			if (pRatio) {
				that.size.height = that.size.width / that.aspectRatio;
				continueResize = false;
			}
			that.position.left = o.helper ? co.left : 0;
		}

		if (cp.top < (that._helper ? co.top : 0)) {
			that.size.height = that.size.height + (that._helper ? that.position.top - co.top : that.position.top);

			if (pRatio) {
				that.size.width = that.size.height * that.aspectRatio;
				continueResize = false;
			}
			that.position.top = that._helper ? co.top : 0;
		}

		isParent = that.containerElement.get(0) === that.element.parent().get(0);
		isOffsetRelative = /relative|absolute/.test(that.containerElement.css("position"));

		if (isParent && isOffsetRelative) {
			that.offset.left = that.parentData.left + that.position.left;
			that.offset.top = that.parentData.top + that.position.top;
		} else {
			that.offset.left = that.element.offset().left;
			that.offset.top = that.element.offset().top;
		}

		woset = Math.abs(that.sizeDiff.width + (that._helper ? that.offset.left - cop.left : that.offset.left - co.left));

		hoset = Math.abs(that.sizeDiff.height + (that._helper ? that.offset.top - cop.top : that.offset.top - co.top));

		if (woset + that.size.width >= that.parentData.width) {
			that.size.width = that.parentData.width - woset;
			if (pRatio) {
				that.size.height = that.size.width / that.aspectRatio;
				continueResize = false;
			}
		}

		if (hoset + that.size.height >= that.parentData.height) {
			that.size.height = that.parentData.height - hoset;
			if (pRatio) {
				that.size.width = that.size.height * that.aspectRatio;
				continueResize = false;
			}
		}

		if (!continueResize) {
			that.position.left = that.prevPosition.left;
			that.position.top = that.prevPosition.top;
			that.size.width = that.prevSize.width;
			that.size.height = that.prevSize.height;
		}
	},

	stop: function stop() {
		var that = $(this).resizable("instance"),
		    o = that.options,
		    co = that.containerOffset,
		    cop = that.containerPosition,
		    ce = that.containerElement,
		    helper = $(that.helper),
		    ho = helper.offset(),
		    w = helper.outerWidth() - that.sizeDiff.width,
		    h = helper.outerHeight() - that.sizeDiff.height;

		if (that._helper && !o.animate && /relative/.test(ce.css("position"))) {
			$(this).css({
				left: ho.left - cop.left - co.left,
				width: w,
				height: h
			});
		}

		if (that._helper && !o.animate && /static/.test(ce.css("position"))) {
			$(this).css({
				left: ho.left - cop.left - co.left,
				width: w,
				height: h
			});
		}
	}
});

plugin.add("resizable", "alsoResize", {

	start: function start() {
		var that = $(this).resizable("instance"),
		    o = that.options;

		$(o.alsoResize).each(function () {
			var el = $(this);
			el.data("ui-resizable-alsoresize", {
				width: parseFloat(el.width()),
				height: parseFloat(el.height()),
				left: parseFloat(el.css("left")),
				top: parseFloat(el.css("top"))
			});
		});
	},

	resize: function resize(event, ui$$1) {
		var that = $(this).resizable("instance"),
		    o = that.options,
		    os = that.originalSize,
		    op = that.originalPosition,
		    delta = {
			height: that.size.height - os.height || 0,
			width: that.size.width - os.width || 0,
			top: that.position.top - op.top || 0,
			left: that.position.left - op.left || 0
		};

		$(o.alsoResize).each(function () {
			var el = $(this),
			    start = $(this).data("ui-resizable-alsoresize"),
			    style = {},
			    css = el.parents(ui$$1.originalElement[0]).length ? ["width", "height"] : ["width", "height", "top", "left"];

			$.each(css, function (i, prop) {
				var sum = (start[prop] || 0) + (delta[prop] || 0);
				if (sum && sum >= 0) {
					style[prop] = sum || null;
				}
			});

			el.css(style);
		});
	},

	stop: function stop() {
		$(this).removeData("ui-resizable-alsoresize");
	}
});

plugin.add("resizable", "ghost", {

	start: function start() {

		var that = $(this).resizable("instance"),
		    cs = that.size;

		that.ghost = that.originalElement.clone();
		that.ghost.css({
			opacity: 0.25,
			display: "block",
			position: "relative",
			height: cs.height,
			width: cs.width,
			margin: 0,
			left: 0,
			top: 0
		});

		that._addClass(that.ghost, "ui-resizable-ghost");

		// DEPRECATED
		// TODO: remove after 1.12
		if ($.uiBackCompat !== false && typeof that.options.ghost === "string") {

			// Ghost option
			that.ghost.addClass(this.options.ghost);
		}

		that.ghost.appendTo(that.helper);
	},

	resize: function resize() {
		var that = $(this).resizable("instance");
		if (that.ghost) {
			that.ghost.css({
				position: "relative",
				height: that.size.height,
				width: that.size.width
			});
		}
	},

	stop: function stop() {
		var that = $(this).resizable("instance");
		if (that.ghost && that.helper) {
			that.helper.get(0).removeChild(that.ghost.get(0));
		}
	}

});

plugin.add("resizable", "grid", {

	resize: function resize() {
		var outerDimensions,
		    that = $(this).resizable("instance"),
		    o = that.options,
		    cs = that.size,
		    os = that.originalSize,
		    op = that.originalPosition,
		    a = that.axis,
		    grid = typeof o.grid === "number" ? [o.grid, o.grid] : o.grid,
		    gridX = grid[0] || 1,
		    gridY = grid[1] || 1,
		    ox = Math.round((cs.width - os.width) / gridX) * gridX,
		    oy = Math.round((cs.height - os.height) / gridY) * gridY,
		    newWidth = os.width + ox,
		    newHeight = os.height + oy,
		    isMaxWidth = o.maxWidth && o.maxWidth < newWidth,
		    isMaxHeight = o.maxHeight && o.maxHeight < newHeight,
		    isMinWidth = o.minWidth && o.minWidth > newWidth,
		    isMinHeight = o.minHeight && o.minHeight > newHeight;

		o.grid = grid;

		if (isMinWidth) {
			newWidth += gridX;
		}
		if (isMinHeight) {
			newHeight += gridY;
		}
		if (isMaxWidth) {
			newWidth -= gridX;
		}
		if (isMaxHeight) {
			newHeight -= gridY;
		}

		if (/^(se|s|e)$/.test(a)) {
			that.size.width = newWidth;
			that.size.height = newHeight;
		} else if (/^(ne)$/.test(a)) {
			that.size.width = newWidth;
			that.size.height = newHeight;
			that.position.top = op.top - oy;
		} else if (/^(sw)$/.test(a)) {
			that.size.width = newWidth;
			that.size.height = newHeight;
			that.position.left = op.left - ox;
		} else {
			if (newHeight - gridY <= 0 || newWidth - gridX <= 0) {
				outerDimensions = that._getPaddingPlusBorderDimensions(this);
			}

			if (newHeight - gridY > 0) {
				that.size.height = newHeight;
				that.position.top = op.top - oy;
			} else {
				newHeight = gridY - outerDimensions.height;
				that.size.height = newHeight;
				that.position.top = op.top + os.height - newHeight;
			}
			if (newWidth - gridX > 0) {
				that.size.width = newWidth;
				that.position.left = op.left - ox;
			} else {
				newWidth = gridX - outerDimensions.width;
				that.size.width = newWidth;
				that.position.left = op.left + os.width - newWidth;
			}
		}
	}

});

/*!
 * jQuery UI Selectable 1.12.0
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */

//>>label: Selectable
//>>group: Interactions
//>>description: Allows groups of elements to be selected with the mouse.
//>>docs: http://api.jqueryui.com/selectable/
//>>demos: http://jqueryui.com/selectable/
//>>css.structure: ../../themes/base/selectable.css
widget$1("ui.selectable", mouse, {
	version: "1.12.0",
	options: {
		appendTo: "body",
		autoRefresh: true,
		distance: 0,
		filter: "*",
		tolerance: "touch",

		// Callbacks
		selected: null,
		selecting: null,
		start: null,
		stop: null,
		unselected: null,
		unselecting: null
	},
	_create: function _create() {
		var that = this;

		this._addClass("ui-selectable");

		this.dragged = false;

		// Cache selectee children based on filter
		this.refresh = function () {
			that.elementPos = $(that.element[0]).offset();
			that.selectees = $(that.options.filter, that.element[0]);
			that._addClass(that.selectees, "ui-selectee");
			that.selectees.each(function () {
				var $this = $(this),
				    selecteeOffset = $this.offset(),
				    pos = {
					left: selecteeOffset.left - that.elementPos.left,
					top: selecteeOffset.top - that.elementPos.top
				};
				$.data(this, "selectable-item", {
					element: this,
					$element: $this,
					left: pos.left,
					top: pos.top,
					right: pos.left + $this.outerWidth(),
					bottom: pos.top + $this.outerHeight(),
					startselected: false,
					selected: $this.hasClass("ui-selected"),
					selecting: $this.hasClass("ui-selecting"),
					unselecting: $this.hasClass("ui-unselecting")
				});
			});
		};
		this.refresh();

		this._mouseInit();

		this.helper = $("<div>");
		this._addClass(this.helper, "ui-selectable-helper");
	},

	_destroy: function _destroy() {
		this.selectees.removeData("selectable-item");
		this._mouseDestroy();
	},

	_mouseStart: function _mouseStart(event) {
		var that = this,
		    options = this.options;

		this.opos = [event.pageX, event.pageY];
		this.elementPos = $(this.element[0]).offset();

		if (this.options.disabled) {
			return;
		}

		this.selectees = $(options.filter, this.element[0]);

		this._trigger("start", event);

		$(options.appendTo).append(this.helper);

		// position helper (lasso)
		this.helper.css({
			"left": event.pageX,
			"top": event.pageY,
			"width": 0,
			"height": 0
		});

		if (options.autoRefresh) {
			this.refresh();
		}

		this.selectees.filter(".ui-selected").each(function () {
			var selectee = $.data(this, "selectable-item");
			selectee.startselected = true;
			if (!event.metaKey && !event.ctrlKey) {
				that._removeClass(selectee.$element, "ui-selected");
				selectee.selected = false;
				that._addClass(selectee.$element, "ui-unselecting");
				selectee.unselecting = true;

				// selectable UNSELECTING callback
				that._trigger("unselecting", event, {
					unselecting: selectee.element
				});
			}
		});

		$(event.target).parents().addBack().each(function () {
			var doSelect,
			    selectee = $.data(this, "selectable-item");
			if (selectee) {
				doSelect = !event.metaKey && !event.ctrlKey || !selectee.$element.hasClass("ui-selected");
				that._removeClass(selectee.$element, doSelect ? "ui-unselecting" : "ui-selected")._addClass(selectee.$element, doSelect ? "ui-selecting" : "ui-unselecting");
				selectee.unselecting = !doSelect;
				selectee.selecting = doSelect;
				selectee.selected = doSelect;

				// selectable (UN)SELECTING callback
				if (doSelect) {
					that._trigger("selecting", event, {
						selecting: selectee.element
					});
				} else {
					that._trigger("unselecting", event, {
						unselecting: selectee.element
					});
				}
				return false;
			}
		});
	},

	_mouseDrag: function _mouseDrag(event) {

		this.dragged = true;

		if (this.options.disabled) {
			return;
		}

		var tmp,
		    that = this,
		    options = this.options,
		    x1 = this.opos[0],
		    y1 = this.opos[1],
		    x2 = event.pageX,
		    y2 = event.pageY;

		if (x1 > x2) {
			tmp = x2;
			x2 = x1;
			x1 = tmp;
		}
		if (y1 > y2) {
			tmp = y2;
			y2 = y1;
			y1 = tmp;
		}
		this.helper.css({
			left: x1,
			top: y1,
			width: x2 - x1,
			height: y2 - y1
		});

		this.selectees.each(function () {
			var selectee = $.data(this, "selectable-item"),
			    hit = false,
			    offset = {};

			//prevent helper from being selected if appendTo: selectable
			if (!selectee || selectee.element === that.element[0]) {
				return;
			}

			offset.left = selectee.left + that.elementPos.left;
			offset.right = selectee.right + that.elementPos.left;
			offset.top = selectee.top + that.elementPos.top;
			offset.bottom = selectee.bottom + that.elementPos.top;

			if (options.tolerance === "touch") {
				hit = !(offset.left > x2 || offset.right < x1 || offset.top > y2 || offset.bottom < y1);
			} else if (options.tolerance === "fit") {
				hit = offset.left > x1 && offset.right < x2 && offset.top > y1 && offset.bottom < y2;
			}

			if (hit) {

				// SELECT
				if (selectee.selected) {
					that._removeClass(selectee.$element, "ui-selected");
					selectee.selected = false;
				}
				if (selectee.unselecting) {
					that._removeClass(selectee.$element, "ui-unselecting");
					selectee.unselecting = false;
				}
				if (!selectee.selecting) {
					that._addClass(selectee.$element, "ui-selecting");
					selectee.selecting = true;

					// selectable SELECTING callback
					that._trigger("selecting", event, {
						selecting: selectee.element
					});
				}
			} else {

				// UNSELECT
				if (selectee.selecting) {
					if ((event.metaKey || event.ctrlKey) && selectee.startselected) {
						that._removeClass(selectee.$element, "ui-selecting");
						selectee.selecting = false;
						that._addClass(selectee.$element, "ui-selected");
						selectee.selected = true;
					} else {
						that._removeClass(selectee.$element, "ui-selecting");
						selectee.selecting = false;
						if (selectee.startselected) {
							that._addClass(selectee.$element, "ui-unselecting");
							selectee.unselecting = true;
						}

						// selectable UNSELECTING callback
						that._trigger("unselecting", event, {
							unselecting: selectee.element
						});
					}
				}
				if (selectee.selected) {
					if (!event.metaKey && !event.ctrlKey && !selectee.startselected) {
						that._removeClass(selectee.$element, "ui-selected");
						selectee.selected = false;

						that._addClass(selectee.$element, "ui-unselecting");
						selectee.unselecting = true;

						// selectable UNSELECTING callback
						that._trigger("unselecting", event, {
							unselecting: selectee.element
						});
					}
				}
			}
		});

		return false;
	},

	_mouseStop: function _mouseStop(event) {
		var that = this;

		this.dragged = false;

		$(".ui-unselecting", this.element[0]).each(function () {
			var selectee = $.data(this, "selectable-item");
			that._removeClass(selectee.$element, "ui-unselecting");
			selectee.unselecting = false;
			selectee.startselected = false;
			that._trigger("unselected", event, {
				unselected: selectee.element
			});
		});
		$(".ui-selecting", this.element[0]).each(function () {
			var selectee = $.data(this, "selectable-item");
			that._removeClass(selectee.$element, "ui-selecting")._addClass(selectee.$element, "ui-selected");
			selectee.selecting = false;
			selectee.selected = true;
			selectee.startselected = true;
			that._trigger("selected", event, {
				selected: selectee.element
			});
		});
		this._trigger("stop", event);

		this.helper.remove();

		return false;
	}

});

/*!
 * jQuery UI Sortable 1.12.0
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */

//>>label: Sortable
//>>group: Interactions
//>>description: Enables items in a list to be sorted using the mouse.
//>>docs: http://api.jqueryui.com/sortable/
//>>demos: http://jqueryui.com/sortable/
//>>css.structure: ../../themes/base/sortable.css

widget$1("ui.sortable", mouse, {
	version: "1.12.0",
	widgetEventPrefix: "sort",
	ready: false,
	options: {
		appendTo: "parent",
		axis: false,
		connectWith: false,
		containment: false,
		cursor: "auto",
		cursorAt: false,
		dropOnEmpty: true,
		forcePlaceholderSize: false,
		forceHelperSize: false,
		grid: false,
		handle: false,
		helper: "original",
		items: "> *",
		opacity: false,
		placeholder: false,
		revert: false,
		scroll: true,
		scrollSensitivity: 20,
		scrollSpeed: 20,
		scope: "default",
		tolerance: "intersect",
		zIndex: 1000,

		// Callbacks
		activate: null,
		beforeStop: null,
		change: null,
		deactivate: null,
		out: null,
		over: null,
		receive: null,
		remove: null,
		sort: null,
		start: null,
		stop: null,
		update: null
	},

	_isOverAxis: function _isOverAxis(x, reference, size) {
		return x >= reference && x < reference + size;
	},

	_isFloating: function _isFloating(item) {
		return (/left|right/.test(item.css("float")) || /inline|table-cell/.test(item.css("display"))
		);
	},

	_create: function _create() {
		this.containerCache = {};
		this._addClass("ui-sortable");

		//Get the items
		this.refresh();

		//Let's determine the parent's offset
		this.offset = this.element.offset();

		//Initialize mouse events for interaction
		this._mouseInit();

		this._setHandleClassName();

		//We're ready to go
		this.ready = true;
	},

	_setOption: function _setOption(key, value) {
		this._super(key, value);

		if (key === "handle") {
			this._setHandleClassName();
		}
	},

	_setHandleClassName: function _setHandleClassName() {
		var that = this;
		this._removeClass(this.element.find(".ui-sortable-handle"), "ui-sortable-handle");
		$.each(this.items, function () {
			that._addClass(this.instance.options.handle ? this.item.find(this.instance.options.handle) : this.item, "ui-sortable-handle");
		});
	},

	_destroy: function _destroy() {
		this._mouseDestroy();

		for (var i = this.items.length - 1; i >= 0; i--) {
			this.items[i].item.removeData(this.widgetName + "-item");
		}

		return this;
	},

	_mouseCapture: function _mouseCapture(event, overrideHandle) {
		var currentItem = null,
		    validHandle = false,
		    that = this;

		if (this.reverting) {
			return false;
		}

		if (this.options.disabled || this.options.type === "static") {
			return false;
		}

		//We have to refresh the items data once first
		this._refreshItems(event);

		//Find out if the clicked node (or one of its parents) is a actual item in this.items
		$(event.target).parents().each(function () {
			if ($.data(this, that.widgetName + "-item") === that) {
				currentItem = $(this);
				return false;
			}
		});
		if ($.data(event.target, that.widgetName + "-item") === that) {
			currentItem = $(event.target);
		}

		if (!currentItem) {
			return false;
		}
		if (this.options.handle && !overrideHandle) {
			$(this.options.handle, currentItem).find("*").addBack().each(function () {
				if (this === event.target) {
					validHandle = true;
				}
			});
			if (!validHandle) {
				return false;
			}
		}

		this.currentItem = currentItem;
		this._removeCurrentsFromItems();
		return true;
	},

	_mouseStart: function _mouseStart(event, overrideHandle, noActivation) {

		var i,
		    body,
		    o = this.options;

		this.currentContainer = this;

		//We only need to call refreshPositions, because the refreshItems call has been moved to
		// mouseCapture
		this.refreshPositions();

		//Create and append the visible helper
		this.helper = this._createHelper(event);

		//Cache the helper size
		this._cacheHelperProportions();

		/*
   * - Position generation -
   * This block generates everything position related - it's the core of draggables.
   */

		//Cache the margins of the original element
		this._cacheMargins();

		//Get the next scrolling parent
		this.scrollParent = this.helper.scrollParent();

		//The element's absolute position on the page minus margins
		this.offset = this.currentItem.offset();
		this.offset = {
			top: this.offset.top - this.margins.top,
			left: this.offset.left - this.margins.left
		};

		$.extend(this.offset, {
			click: { //Where the click happened, relative to the element
				left: event.pageX - this.offset.left,
				top: event.pageY - this.offset.top
			},
			parent: this._getParentOffset(),

			// This is a relative to absolute position minus the actual position calculation -
			// only used for relative positioned helper
			relative: this._getRelativeOffset()
		});

		// Only after we got the offset, we can change the helper's position to absolute
		// TODO: Still need to figure out a way to make relative sorting possible
		this.helper.css("position", "absolute");
		this.cssPosition = this.helper.css("position");

		//Generate the original position
		this.originalPosition = this._generatePosition(event);
		this.originalPageX = event.pageX;
		this.originalPageY = event.pageY;

		//Adjust the mouse offset relative to the helper if "cursorAt" is supplied
		o.cursorAt && this._adjustOffsetFromHelper(o.cursorAt);

		//Cache the former DOM position
		this.domPosition = {
			prev: this.currentItem.prev()[0],
			parent: this.currentItem.parent()[0]
		};

		// If the helper is not the original, hide the original so it's not playing any role during
		// the drag, won't cause anything bad this way
		if (this.helper[0] !== this.currentItem[0]) {
			this.currentItem.hide();
		}

		//Create the placeholder
		this._createPlaceholder();

		//Set a containment if given in the options
		if (o.containment) {
			this._setContainment();
		}

		if (o.cursor && o.cursor !== "auto") {
			// cursor option
			body = this.document.find("body");

			// Support: IE
			this.storedCursor = body.css("cursor");
			body.css("cursor", o.cursor);

			this.storedStylesheet = $("<style>*{ cursor: " + o.cursor + " !important; }</style>").appendTo(body);
		}

		if (o.opacity) {
			// opacity option
			if (this.helper.css("opacity")) {
				this._storedOpacity = this.helper.css("opacity");
			}
			this.helper.css("opacity", o.opacity);
		}

		if (o.zIndex) {
			// zIndex option
			if (this.helper.css("zIndex")) {
				this._storedZIndex = this.helper.css("zIndex");
			}
			this.helper.css("zIndex", o.zIndex);
		}

		//Prepare scrolling
		if (this.scrollParent[0] !== this.document[0] && this.scrollParent[0].tagName !== "HTML") {
			this.overflowOffset = this.scrollParent.offset();
		}

		//Call callbacks
		this._trigger("start", event, this._uiHash());

		//Recache the helper size
		if (!this._preserveHelperProportions) {
			this._cacheHelperProportions();
		}

		//Post "activate" events to possible containers
		if (!noActivation) {
			for (i = this.containers.length - 1; i >= 0; i--) {
				this.containers[i]._trigger("activate", event, this._uiHash(this));
			}
		}

		//Prepare possible droppables
		if ($.ui.ddmanager) {
			$.ui.ddmanager.current = this;
		}

		if ($.ui.ddmanager && !o.dropBehaviour) {
			$.ui.ddmanager.prepareOffsets(this, event);
		}

		this.dragging = true;

		this._addClass(this.helper, "ui-sortable-helper");

		// Execute the drag once - this causes the helper not to be visiblebefore getting its
		// correct position
		this._mouseDrag(event);
		return true;
	},

	_mouseDrag: function _mouseDrag(event) {
		var i,
		    item,
		    itemElement,
		    intersection,
		    o = this.options,
		    scrolled = false;

		//Compute the helpers position
		this.position = this._generatePosition(event);
		this.positionAbs = this._convertPositionTo("absolute");

		if (!this.lastPositionAbs) {
			this.lastPositionAbs = this.positionAbs;
		}

		//Do scrolling
		if (this.options.scroll) {
			if (this.scrollParent[0] !== this.document[0] && this.scrollParent[0].tagName !== "HTML") {

				if (this.overflowOffset.top + this.scrollParent[0].offsetHeight - event.pageY < o.scrollSensitivity) {
					this.scrollParent[0].scrollTop = scrolled = this.scrollParent[0].scrollTop + o.scrollSpeed;
				} else if (event.pageY - this.overflowOffset.top < o.scrollSensitivity) {
					this.scrollParent[0].scrollTop = scrolled = this.scrollParent[0].scrollTop - o.scrollSpeed;
				}

				if (this.overflowOffset.left + this.scrollParent[0].offsetWidth - event.pageX < o.scrollSensitivity) {
					this.scrollParent[0].scrollLeft = scrolled = this.scrollParent[0].scrollLeft + o.scrollSpeed;
				} else if (event.pageX - this.overflowOffset.left < o.scrollSensitivity) {
					this.scrollParent[0].scrollLeft = scrolled = this.scrollParent[0].scrollLeft - o.scrollSpeed;
				}
			} else {

				if (event.pageY - this.document.scrollTop() < o.scrollSensitivity) {
					scrolled = this.document.scrollTop(this.document.scrollTop() - o.scrollSpeed);
				} else if (this.window.height() - (event.pageY - this.document.scrollTop()) < o.scrollSensitivity) {
					scrolled = this.document.scrollTop(this.document.scrollTop() + o.scrollSpeed);
				}

				if (event.pageX - this.document.scrollLeft() < o.scrollSensitivity) {
					scrolled = this.document.scrollLeft(this.document.scrollLeft() - o.scrollSpeed);
				} else if (this.window.width() - (event.pageX - this.document.scrollLeft()) < o.scrollSensitivity) {
					scrolled = this.document.scrollLeft(this.document.scrollLeft() + o.scrollSpeed);
				}
			}

			if (scrolled !== false && $.ui.ddmanager && !o.dropBehaviour) {
				$.ui.ddmanager.prepareOffsets(this, event);
			}
		}

		//Regenerate the absolute position used for position checks
		this.positionAbs = this._convertPositionTo("absolute");

		//Set the helper position
		if (!this.options.axis || this.options.axis !== "y") {
			this.helper[0].style.left = this.position.left + "px";
		}
		if (!this.options.axis || this.options.axis !== "x") {
			this.helper[0].style.top = this.position.top + "px";
		}

		//Rearrange
		for (i = this.items.length - 1; i >= 0; i--) {

			//Cache variables and intersection, continue if no intersection
			item = this.items[i];
			itemElement = item.item[0];
			intersection = this._intersectsWithPointer(item);
			if (!intersection) {
				continue;
			}

			// Only put the placeholder inside the current Container, skip all
			// items from other containers. This works because when moving
			// an item from one container to another the
			// currentContainer is switched before the placeholder is moved.
			//
			// Without this, moving items in "sub-sortables" can cause
			// the placeholder to jitter between the outer and inner container.
			if (item.instance !== this.currentContainer) {
				continue;
			}

			// Cannot intersect with itself
			// no useless actions that have been done before
			// no action if the item moved is the parent of the item checked
			if (itemElement !== this.currentItem[0] && this.placeholder[intersection === 1 ? "next" : "prev"]()[0] !== itemElement && !$.contains(this.placeholder[0], itemElement) && (this.options.type === "semi-dynamic" ? !$.contains(this.element[0], itemElement) : true)) {

				this.direction = intersection === 1 ? "down" : "up";

				if (this.options.tolerance === "pointer" || this._intersectsWithSides(item)) {
					this._rearrange(event, item);
				} else {
					break;
				}

				this._trigger("change", event, this._uiHash());
				break;
			}
		}

		//Post events to containers
		this._contactContainers(event);

		//Interconnect with droppables
		if ($.ui.ddmanager) {
			$.ui.ddmanager.drag(this, event);
		}

		//Call callbacks
		this._trigger("sort", event, this._uiHash());

		this.lastPositionAbs = this.positionAbs;
		return false;
	},

	_mouseStop: function _mouseStop(event, noPropagation) {

		if (!event) {
			return;
		}

		//If we are using droppables, inform the manager about the drop
		if ($.ui.ddmanager && !this.options.dropBehaviour) {
			$.ui.ddmanager.drop(this, event);
		}

		if (this.options.revert) {
			var that = this,
			    cur = this.placeholder.offset(),
			    axis = this.options.axis,
			    animation = {};

			if (!axis || axis === "x") {
				animation.left = cur.left - this.offset.parent.left - this.margins.left + (this.offsetParent[0] === this.document[0].body ? 0 : this.offsetParent[0].scrollLeft);
			}
			if (!axis || axis === "y") {
				animation.top = cur.top - this.offset.parent.top - this.margins.top + (this.offsetParent[0] === this.document[0].body ? 0 : this.offsetParent[0].scrollTop);
			}
			this.reverting = true;
			$(this.helper).animate(animation, parseInt(this.options.revert, 10) || 500, function () {
				that._clear(event);
			});
		} else {
			this._clear(event, noPropagation);
		}

		return false;
	},

	cancel: function cancel() {

		if (this.dragging) {

			this._mouseUp({
				target: null
			});

			if (this.options.helper === "original") {
				this.currentItem.css(this._storedCSS);
				this._removeClass(this.currentItem, "ui-sortable-helper");
			} else {
				this.currentItem.show();
			}

			//Post deactivating events to containers
			for (var i = this.containers.length - 1; i >= 0; i--) {
				this.containers[i]._trigger("deactivate", null, this._uiHash(this));
				if (this.containers[i].containerCache.over) {
					this.containers[i]._trigger("out", null, this._uiHash(this));
					this.containers[i].containerCache.over = 0;
				}
			}
		}

		if (this.placeholder) {

			//$(this.placeholder[0]).remove(); would have been the jQuery way - unfortunately,
			// it unbinds ALL events from the original node!
			if (this.placeholder[0].parentNode) {
				this.placeholder[0].parentNode.removeChild(this.placeholder[0]);
			}
			if (this.options.helper !== "original" && this.helper && this.helper[0].parentNode) {
				this.helper.remove();
			}

			$.extend(this, {
				helper: null,
				dragging: false,
				reverting: false,
				_noFinalSort: null
			});

			if (this.domPosition.prev) {
				$(this.domPosition.prev).after(this.currentItem);
			} else {
				$(this.domPosition.parent).prepend(this.currentItem);
			}
		}

		return this;
	},

	serialize: function serialize(o) {

		var items = this._getItemsAsjQuery(o && o.connected),
		    str = [];
		o = o || {};

		$(items).each(function () {
			var res = ($(o.item || this).attr(o.attribute || "id") || "").match(o.expression || /(.+)[\-=_](.+)/);
			if (res) {
				str.push((o.key || res[1] + "[]") + "=" + (o.key && o.expression ? res[1] : res[2]));
			}
		});

		if (!str.length && o.key) {
			str.push(o.key + "=");
		}

		return str.join("&");
	},

	toArray: function toArray(o) {

		var items = this._getItemsAsjQuery(o && o.connected),
		    ret = [];

		o = o || {};

		items.each(function () {
			ret.push($(o.item || this).attr(o.attribute || "id") || "");
		});
		return ret;
	},

	/* Be careful with the following core functions */
	_intersectsWith: function _intersectsWith(item) {

		var x1 = this.positionAbs.left,
		    x2 = x1 + this.helperProportions.width,
		    y1 = this.positionAbs.top,
		    y2 = y1 + this.helperProportions.height,
		    l = item.left,
		    r = l + item.width,
		    t = item.top,
		    b = t + item.height,
		    dyClick = this.offset.click.top,
		    dxClick = this.offset.click.left,
		    isOverElementHeight = this.options.axis === "x" || y1 + dyClick > t && y1 + dyClick < b,
		    isOverElementWidth = this.options.axis === "y" || x1 + dxClick > l && x1 + dxClick < r,
		    isOverElement = isOverElementHeight && isOverElementWidth;

		if (this.options.tolerance === "pointer" || this.options.forcePointerForContainers || this.options.tolerance !== "pointer" && this.helperProportions[this.floating ? "width" : "height"] > item[this.floating ? "width" : "height"]) {
			return isOverElement;
		} else {

			return l < x1 + this.helperProportions.width / 2 && // Right Half
			x2 - this.helperProportions.width / 2 < r && // Left Half
			t < y1 + this.helperProportions.height / 2 && // Bottom Half
			y2 - this.helperProportions.height / 2 < b; // Top Half
		}
	},

	_intersectsWithPointer: function _intersectsWithPointer(item) {
		var verticalDirection,
		    horizontalDirection,
		    isOverElementHeight = this.options.axis === "x" || this._isOverAxis(this.positionAbs.top + this.offset.click.top, item.top, item.height),
		    isOverElementWidth = this.options.axis === "y" || this._isOverAxis(this.positionAbs.left + this.offset.click.left, item.left, item.width),
		    isOverElement = isOverElementHeight && isOverElementWidth;

		if (!isOverElement) {
			return false;
		}

		verticalDirection = this._getDragVerticalDirection();
		horizontalDirection = this._getDragHorizontalDirection();

		return this.floating ? horizontalDirection === "right" || verticalDirection === "down" ? 2 : 1 : verticalDirection && (verticalDirection === "down" ? 2 : 1);
	},

	_intersectsWithSides: function _intersectsWithSides(item) {

		var isOverBottomHalf = this._isOverAxis(this.positionAbs.top + this.offset.click.top, item.top + item.height / 2, item.height),
		    isOverRightHalf = this._isOverAxis(this.positionAbs.left + this.offset.click.left, item.left + item.width / 2, item.width),
		    verticalDirection = this._getDragVerticalDirection(),
		    horizontalDirection = this._getDragHorizontalDirection();

		if (this.floating && horizontalDirection) {
			return horizontalDirection === "right" && isOverRightHalf || horizontalDirection === "left" && !isOverRightHalf;
		} else {
			return verticalDirection && (verticalDirection === "down" && isOverBottomHalf || verticalDirection === "up" && !isOverBottomHalf);
		}
	},

	_getDragVerticalDirection: function _getDragVerticalDirection() {
		var delta = this.positionAbs.top - this.lastPositionAbs.top;
		return delta !== 0 && (delta > 0 ? "down" : "up");
	},

	_getDragHorizontalDirection: function _getDragHorizontalDirection() {
		var delta = this.positionAbs.left - this.lastPositionAbs.left;
		return delta !== 0 && (delta > 0 ? "right" : "left");
	},

	refresh: function refresh(event) {
		this._refreshItems(event);
		this._setHandleClassName();
		this.refreshPositions();
		return this;
	},

	_connectWith: function _connectWith() {
		var options = this.options;
		return options.connectWith.constructor === String ? [options.connectWith] : options.connectWith;
	},

	_getItemsAsjQuery: function _getItemsAsjQuery(connected) {

		var i,
		    j,
		    cur,
		    inst,
		    items = [],
		    queries = [],
		    connectWith = this._connectWith();

		if (connectWith && connected) {
			for (i = connectWith.length - 1; i >= 0; i--) {
				cur = $(connectWith[i], this.document[0]);
				for (j = cur.length - 1; j >= 0; j--) {
					inst = $.data(cur[j], this.widgetFullName);
					if (inst && inst !== this && !inst.options.disabled) {
						queries.push([$.isFunction(inst.options.items) ? inst.options.items.call(inst.element) : $(inst.options.items, inst.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), inst]);
					}
				}
			}
		}

		queries.push([$.isFunction(this.options.items) ? this.options.items.call(this.element, null, {
			options: this.options,
			item: this.currentItem
		}) : $(this.options.items, this.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), this]);

		function addItems() {
			items.push(this);
		}
		for (i = queries.length - 1; i >= 0; i--) {
			queries[i][0].each(addItems);
		}

		return $(items);
	},

	_removeCurrentsFromItems: function _removeCurrentsFromItems() {

		var list = this.currentItem.find(":data(" + this.widgetName + "-item)");

		this.items = $.grep(this.items, function (item) {
			for (var j = 0; j < list.length; j++) {
				if (list[j] === item.item[0]) {
					return false;
				}
			}
			return true;
		});
	},

	_refreshItems: function _refreshItems(event) {

		this.items = [];
		this.containers = [this];

		var i,
		    j,
		    cur,
		    inst,
		    targetData,
		    _queries,
		    item,
		    queriesLength,
		    items = this.items,
		    queries = [[$.isFunction(this.options.items) ? this.options.items.call(this.element[0], event, {
			item: this.currentItem
		}) : $(this.options.items, this.element), this]],
		    connectWith = this._connectWith();

		//Shouldn't be run the first time through due to massive slow-down
		if (connectWith && this.ready) {
			for (i = connectWith.length - 1; i >= 0; i--) {
				cur = $(connectWith[i], this.document[0]);
				for (j = cur.length - 1; j >= 0; j--) {
					inst = $.data(cur[j], this.widgetFullName);
					if (inst && inst !== this && !inst.options.disabled) {
						queries.push([$.isFunction(inst.options.items) ? inst.options.items.call(inst.element[0], event, {
							item: this.currentItem
						}) : $(inst.options.items, inst.element), inst]);
						this.containers.push(inst);
					}
				}
			}
		}

		for (i = queries.length - 1; i >= 0; i--) {
			targetData = queries[i][1];
			_queries = queries[i][0];

			for (j = 0, queriesLength = _queries.length; j < queriesLength; j++) {
				item = $(_queries[j]);

				// Data for target checking (mouse manager)
				item.data(this.widgetName + "-item", targetData);

				items.push({
					item: item,
					instance: targetData,
					width: 0,
					height: 0,
					left: 0,
					top: 0
				});
			}
		}
	},

	refreshPositions: function refreshPositions(fast) {

		// Determine whether items are being displayed horizontally
		this.floating = this.items.length ? this.options.axis === "x" || this._isFloating(this.items[0].item) : false;

		//This has to be redone because due to the item being moved out/into the offsetParent,
		// the offsetParent's position will change
		if (this.offsetParent && this.helper) {
			this.offset.parent = this._getParentOffset();
		}

		var i, item, t, p;

		for (i = this.items.length - 1; i >= 0; i--) {
			item = this.items[i];

			//We ignore calculating positions of all connected containers when we're not over them
			if (item.instance !== this.currentContainer && this.currentContainer && item.item[0] !== this.currentItem[0]) {
				continue;
			}

			t = this.options.toleranceElement ? $(this.options.toleranceElement, item.item) : item.item;

			if (!fast) {
				item.width = t.outerWidth();
				item.height = t.outerHeight();
			}

			p = t.offset();
			item.left = p.left;
			item.top = p.top;
		}

		if (this.options.custom && this.options.custom.refreshContainers) {
			this.options.custom.refreshContainers.call(this);
		} else {
			for (i = this.containers.length - 1; i >= 0; i--) {
				p = this.containers[i].element.offset();
				this.containers[i].containerCache.left = p.left;
				this.containers[i].containerCache.top = p.top;
				this.containers[i].containerCache.width = this.containers[i].element.outerWidth();
				this.containers[i].containerCache.height = this.containers[i].element.outerHeight();
			}
		}

		return this;
	},

	_createPlaceholder: function _createPlaceholder(that) {
		that = that || this;
		var className,
		    o = that.options;

		if (!o.placeholder || o.placeholder.constructor === String) {
			className = o.placeholder;
			o.placeholder = {
				element: function element() {

					var nodeName = that.currentItem[0].nodeName.toLowerCase(),
					    element = $("<" + nodeName + ">", that.document[0]);

					that._addClass(element, "ui-sortable-placeholder", className || that.currentItem[0].className)._removeClass(element, "ui-sortable-helper");

					if (nodeName === "tbody") {
						that._createTrPlaceholder(that.currentItem.find("tr").eq(0), $("<tr>", that.document[0]).appendTo(element));
					} else if (nodeName === "tr") {
						that._createTrPlaceholder(that.currentItem, element);
					} else if (nodeName === "img") {
						element.attr("src", that.currentItem.attr("src"));
					}

					if (!className) {
						element.css("visibility", "hidden");
					}

					return element;
				},
				update: function update(container, p) {

					// 1. If a className is set as 'placeholder option, we don't force sizes -
					// the class is responsible for that
					// 2. The option 'forcePlaceholderSize can be enabled to force it even if a
					// class name is specified
					if (className && !o.forcePlaceholderSize) {
						return;
					}

					//If the element doesn't have a actual height by itself (without styles coming
					// from a stylesheet), it receives the inline height from the dragged item
					if (!p.height()) {
						p.height(that.currentItem.innerHeight() - parseInt(that.currentItem.css("paddingTop") || 0, 10) - parseInt(that.currentItem.css("paddingBottom") || 0, 10));
					}
					if (!p.width()) {
						p.width(that.currentItem.innerWidth() - parseInt(that.currentItem.css("paddingLeft") || 0, 10) - parseInt(that.currentItem.css("paddingRight") || 0, 10));
					}
				}
			};
		}

		//Create the placeholder
		that.placeholder = $(o.placeholder.element.call(that.element, that.currentItem));

		//Append it after the actual current item
		that.currentItem.after(that.placeholder);

		//Update the size of the placeholder (TODO: Logic to fuzzy, see line 316/317)
		o.placeholder.update(that, that.placeholder);
	},

	_createTrPlaceholder: function _createTrPlaceholder(sourceTr, targetTr) {
		var that = this;

		sourceTr.children().each(function () {
			$("<td>&#160;</td>", that.document[0]).attr("colspan", $(this).attr("colspan") || 1).appendTo(targetTr);
		});
	},

	_contactContainers: function _contactContainers(event) {
		var i,
		    j,
		    dist,
		    itemWithLeastDistance,
		    posProperty,
		    sizeProperty,
		    cur,
		    nearBottom,
		    floating,
		    axis,
		    innermostContainer = null,
		    innermostIndex = null;

		// Get innermost container that intersects with item
		for (i = this.containers.length - 1; i >= 0; i--) {

			// Never consider a container that's located within the item itself
			if ($.contains(this.currentItem[0], this.containers[i].element[0])) {
				continue;
			}

			if (this._intersectsWith(this.containers[i].containerCache)) {

				// If we've already found a container and it's more "inner" than this, then continue
				if (innermostContainer && $.contains(this.containers[i].element[0], innermostContainer.element[0])) {
					continue;
				}

				innermostContainer = this.containers[i];
				innermostIndex = i;
			} else {

				// container doesn't intersect. trigger "out" event if necessary
				if (this.containers[i].containerCache.over) {
					this.containers[i]._trigger("out", event, this._uiHash(this));
					this.containers[i].containerCache.over = 0;
				}
			}
		}

		// If no intersecting containers found, return
		if (!innermostContainer) {
			return;
		}

		// Move the item into the container if it's not there already
		if (this.containers.length === 1) {
			if (!this.containers[innermostIndex].containerCache.over) {
				this.containers[innermostIndex]._trigger("over", event, this._uiHash(this));
				this.containers[innermostIndex].containerCache.over = 1;
			}
		} else {

			// When entering a new container, we will find the item with the least distance and
			// append our item near it
			dist = 10000;
			itemWithLeastDistance = null;
			floating = innermostContainer.floating || this._isFloating(this.currentItem);
			posProperty = floating ? "left" : "top";
			sizeProperty = floating ? "width" : "height";
			axis = floating ? "pageX" : "pageY";

			for (j = this.items.length - 1; j >= 0; j--) {
				if (!$.contains(this.containers[innermostIndex].element[0], this.items[j].item[0])) {
					continue;
				}
				if (this.items[j].item[0] === this.currentItem[0]) {
					continue;
				}

				cur = this.items[j].item.offset()[posProperty];
				nearBottom = false;
				if (event[axis] - cur > this.items[j][sizeProperty] / 2) {
					nearBottom = true;
				}

				if (Math.abs(event[axis] - cur) < dist) {
					dist = Math.abs(event[axis] - cur);
					itemWithLeastDistance = this.items[j];
					this.direction = nearBottom ? "up" : "down";
				}
			}

			//Check if dropOnEmpty is enabled
			if (!itemWithLeastDistance && !this.options.dropOnEmpty) {
				return;
			}

			if (this.currentContainer === this.containers[innermostIndex]) {
				if (!this.currentContainer.containerCache.over) {
					this.containers[innermostIndex]._trigger("over", event, this._uiHash());
					this.currentContainer.containerCache.over = 1;
				}
				return;
			}

			itemWithLeastDistance ? this._rearrange(event, itemWithLeastDistance, null, true) : this._rearrange(event, null, this.containers[innermostIndex].element, true);
			this._trigger("change", event, this._uiHash());
			this.containers[innermostIndex]._trigger("change", event, this._uiHash(this));
			this.currentContainer = this.containers[innermostIndex];

			//Update the placeholder
			this.options.placeholder.update(this.currentContainer, this.placeholder);

			this.containers[innermostIndex]._trigger("over", event, this._uiHash(this));
			this.containers[innermostIndex].containerCache.over = 1;
		}
	},

	_createHelper: function _createHelper(event) {

		var o = this.options,
		    helper = $.isFunction(o.helper) ? $(o.helper.apply(this.element[0], [event, this.currentItem])) : o.helper === "clone" ? this.currentItem.clone() : this.currentItem;

		//Add the helper to the DOM if that didn't happen already
		if (!helper.parents("body").length) {
			$(o.appendTo !== "parent" ? o.appendTo : this.currentItem[0].parentNode)[0].appendChild(helper[0]);
		}

		if (helper[0] === this.currentItem[0]) {
			this._storedCSS = {
				width: this.currentItem[0].style.width,
				height: this.currentItem[0].style.height,
				position: this.currentItem.css("position"),
				top: this.currentItem.css("top"),
				left: this.currentItem.css("left")
			};
		}

		if (!helper[0].style.width || o.forceHelperSize) {
			helper.width(this.currentItem.width());
		}
		if (!helper[0].style.height || o.forceHelperSize) {
			helper.height(this.currentItem.height());
		}

		return helper;
	},

	_adjustOffsetFromHelper: function _adjustOffsetFromHelper(obj) {
		if (typeof obj === "string") {
			obj = obj.split(" ");
		}
		if ($.isArray(obj)) {
			obj = {
				left: +obj[0],
				top: +obj[1] || 0
			};
		}
		if ("left" in obj) {
			this.offset.click.left = obj.left + this.margins.left;
		}
		if ("right" in obj) {
			this.offset.click.left = this.helperProportions.width - obj.right + this.margins.left;
		}
		if ("top" in obj) {
			this.offset.click.top = obj.top + this.margins.top;
		}
		if ("bottom" in obj) {
			this.offset.click.top = this.helperProportions.height - obj.bottom + this.margins.top;
		}
	},

	_getParentOffset: function _getParentOffset() {

		//Get the offsetParent and cache its position
		this.offsetParent = this.helper.offsetParent();
		var po = this.offsetParent.offset();

		// This is a special case where we need to modify a offset calculated on start, since the
		// following happened:
		// 1. The position of the helper is absolute, so it's position is calculated based on the
		// next positioned parent
		// 2. The actual offset parent is a child of the scroll parent, and the scroll parent isn't
		// the document, which means that the scroll is included in the initial calculation of the
		// offset of the parent, and never recalculated upon drag
		if (this.cssPosition === "absolute" && this.scrollParent[0] !== this.document[0] && $.contains(this.scrollParent[0], this.offsetParent[0])) {
			po.left += this.scrollParent.scrollLeft();
			po.top += this.scrollParent.scrollTop();
		}

		// This needs to be actually done for all browsers, since pageX/pageY includes this
		// information with an ugly IE fix
		if (this.offsetParent[0] === this.document[0].body || this.offsetParent[0].tagName && this.offsetParent[0].tagName.toLowerCase() === "html" && $.ui.ie) {
			po = {
				top: 0,
				left: 0
			};
		}

		return {
			top: po.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
			left: po.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
		};
	},

	_getRelativeOffset: function _getRelativeOffset() {

		if (this.cssPosition === "relative") {
			var p = this.currentItem.position();
			return {
				top: p.top - (parseInt(this.helper.css("top"), 10) || 0) + this.scrollParent.scrollTop(),
				left: p.left - (parseInt(this.helper.css("left"), 10) || 0) + this.scrollParent.scrollLeft()
			};
		} else {
			return {
				top: 0,
				left: 0
			};
		}
	},

	_cacheMargins: function _cacheMargins() {
		this.margins = {
			left: parseInt(this.currentItem.css("marginLeft"), 10) || 0,
			top: parseInt(this.currentItem.css("marginTop"), 10) || 0
		};
	},

	_cacheHelperProportions: function _cacheHelperProportions() {
		this.helperProportions = {
			width: this.helper.outerWidth(),
			height: this.helper.outerHeight()
		};
	},

	_setContainment: function _setContainment() {

		var ce,
		    co,
		    over,
		    o = this.options;
		if (o.containment === "parent") {
			o.containment = this.helper[0].parentNode;
		}
		if (o.containment === "document" || o.containment === "window") {
			this.containment = [0 - this.offset.relative.left - this.offset.parent.left, 0 - this.offset.relative.top - this.offset.parent.top, o.containment === "document" ? this.document.width() : this.window.width() - this.helperProportions.width - this.margins.left, (o.containment === "document" ? this.document.height() || document.body.parentNode.scrollHeight : this.window.height() || this.document[0].body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top];
		}

		if (!/^(document|window|parent)$/.test(o.containment)) {
			ce = $(o.containment)[0];
			co = $(o.containment).offset();
			over = $(ce).css("overflow") !== "hidden";

			this.containment = [co.left + (parseInt($(ce).css("borderLeftWidth"), 10) || 0) + (parseInt($(ce).css("paddingLeft"), 10) || 0) - this.margins.left, co.top + (parseInt($(ce).css("borderTopWidth"), 10) || 0) + (parseInt($(ce).css("paddingTop"), 10) || 0) - this.margins.top, co.left + (over ? Math.max(ce.scrollWidth, ce.offsetWidth) : ce.offsetWidth) - (parseInt($(ce).css("borderLeftWidth"), 10) || 0) - (parseInt($(ce).css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left, co.top + (over ? Math.max(ce.scrollHeight, ce.offsetHeight) : ce.offsetHeight) - (parseInt($(ce).css("borderTopWidth"), 10) || 0) - (parseInt($(ce).css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top];
		}
	},

	_convertPositionTo: function _convertPositionTo(d, pos) {

		if (!pos) {
			pos = this.position;
		}
		var mod = d === "absolute" ? 1 : -1,
		    scroll = this.cssPosition === "absolute" && !(this.scrollParent[0] !== this.document[0] && $.contains(this.scrollParent[0], this.offsetParent[0])) ? this.offsetParent : this.scrollParent,
		    scrollIsRootNode = /(html|body)/i.test(scroll[0].tagName);

		return {
			top:

			// The absolute mouse position
			pos.top +

			// Only for relative positioned nodes: Relative offset from element to offset parent
			this.offset.relative.top * mod +

			// The offsetParent's offset without borders (offset + border)
			this.offset.parent.top * mod - (this.cssPosition === "fixed" ? -this.scrollParent.scrollTop() : scrollIsRootNode ? 0 : scroll.scrollTop()) * mod,
			left:

			// The absolute mouse position
			pos.left +

			// Only for relative positioned nodes: Relative offset from element to offset parent
			this.offset.relative.left * mod +

			// The offsetParent's offset without borders (offset + border)
			this.offset.parent.left * mod - (this.cssPosition === "fixed" ? -this.scrollParent.scrollLeft() : scrollIsRootNode ? 0 : scroll.scrollLeft()) * mod
		};
	},

	_generatePosition: function _generatePosition(event) {

		var top,
		    left,
		    o = this.options,
		    pageX = event.pageX,
		    pageY = event.pageY,
		    scroll = this.cssPosition === "absolute" && !(this.scrollParent[0] !== this.document[0] && $.contains(this.scrollParent[0], this.offsetParent[0])) ? this.offsetParent : this.scrollParent,
		    scrollIsRootNode = /(html|body)/i.test(scroll[0].tagName);

		// This is another very weird special case that only happens for relative elements:
		// 1. If the css position is relative
		// 2. and the scroll parent is the document or similar to the offset parent
		// we have to refresh the relative offset during the scroll so there are no jumps
		if (this.cssPosition === "relative" && !(this.scrollParent[0] !== this.document[0] && this.scrollParent[0] !== this.offsetParent[0])) {
			this.offset.relative = this._getRelativeOffset();
		}

		/*
   * - Position constraining -
   * Constrain the position to a mix of grid, containment.
   */

		if (this.originalPosition) {
			//If we are not dragging yet, we won't check for options

			if (this.containment) {
				if (event.pageX - this.offset.click.left < this.containment[0]) {
					pageX = this.containment[0] + this.offset.click.left;
				}
				if (event.pageY - this.offset.click.top < this.containment[1]) {
					pageY = this.containment[1] + this.offset.click.top;
				}
				if (event.pageX - this.offset.click.left > this.containment[2]) {
					pageX = this.containment[2] + this.offset.click.left;
				}
				if (event.pageY - this.offset.click.top > this.containment[3]) {
					pageY = this.containment[3] + this.offset.click.top;
				}
			}

			if (o.grid) {
				top = this.originalPageY + Math.round((pageY - this.originalPageY) / o.grid[1]) * o.grid[1];
				pageY = this.containment ? top - this.offset.click.top >= this.containment[1] && top - this.offset.click.top <= this.containment[3] ? top : top - this.offset.click.top >= this.containment[1] ? top - o.grid[1] : top + o.grid[1] : top;

				left = this.originalPageX + Math.round((pageX - this.originalPageX) / o.grid[0]) * o.grid[0];
				pageX = this.containment ? left - this.offset.click.left >= this.containment[0] && left - this.offset.click.left <= this.containment[2] ? left : left - this.offset.click.left >= this.containment[0] ? left - o.grid[0] : left + o.grid[0] : left;
			}
		}

		return {
			top:

			// The absolute mouse position
			pageY -

			// Click offset (relative to the element)
			this.offset.click.top -

			// Only for relative positioned nodes: Relative offset from element to offset parent
			this.offset.relative.top -

			// The offsetParent's offset without borders (offset + border)
			this.offset.parent.top + (this.cssPosition === "fixed" ? -this.scrollParent.scrollTop() : scrollIsRootNode ? 0 : scroll.scrollTop()),
			left:

			// The absolute mouse position
			pageX -

			// Click offset (relative to the element)
			this.offset.click.left -

			// Only for relative positioned nodes: Relative offset from element to offset parent
			this.offset.relative.left -

			// The offsetParent's offset without borders (offset + border)
			this.offset.parent.left + (this.cssPosition === "fixed" ? -this.scrollParent.scrollLeft() : scrollIsRootNode ? 0 : scroll.scrollLeft())
		};
	},

	_rearrange: function _rearrange(event, i, a, hardRefresh) {

		a ? a[0].appendChild(this.placeholder[0]) : i.item[0].parentNode.insertBefore(this.placeholder[0], this.direction === "down" ? i.item[0] : i.item[0].nextSibling);

		//Various things done here to improve the performance:
		// 1. we create a setTimeout, that calls refreshPositions
		// 2. on the instance, we have a counter variable, that get's higher after every append
		// 3. on the local scope, we copy the counter variable, and check in the timeout,
		// if it's still the same
		// 4. this lets only the last addition to the timeout stack through
		this.counter = this.counter ? ++this.counter : 1;
		var counter = this.counter;

		this._delay(function () {
			if (counter === this.counter) {

				//Precompute after each DOM insertion, NOT on mousemove
				this.refreshPositions(!hardRefresh);
			}
		});
	},

	_clear: function _clear(event, noPropagation) {

		this.reverting = false;

		// We delay all events that have to be triggered to after the point where the placeholder
		// has been removed and everything else normalized again
		var i,
		    delayedTriggers = [];

		// We first have to update the dom position of the actual currentItem
		// Note: don't do it if the current item is already removed (by a user), or it gets
		// reappended (see #4088)
		if (!this._noFinalSort && this.currentItem.parent().length) {
			this.placeholder.before(this.currentItem);
		}
		this._noFinalSort = null;

		if (this.helper[0] === this.currentItem[0]) {
			for (i in this._storedCSS) {
				if (this._storedCSS[i] === "auto" || this._storedCSS[i] === "static") {
					this._storedCSS[i] = "";
				}
			}
			this.currentItem.css(this._storedCSS);
			this._removeClass(this.currentItem, "ui-sortable-helper");
		} else {
			this.currentItem.show();
		}

		if (this.fromOutside && !noPropagation) {
			delayedTriggers.push(function (event) {
				this._trigger("receive", event, this._uiHash(this.fromOutside));
			});
		}
		if ((this.fromOutside || this.domPosition.prev !== this.currentItem.prev().not(".ui-sortable-helper")[0] || this.domPosition.parent !== this.currentItem.parent()[0]) && !noPropagation) {

			// Trigger update callback if the DOM position has changed
			delayedTriggers.push(function (event) {
				this._trigger("update", event, this._uiHash());
			});
		}

		// Check if the items Container has Changed and trigger appropriate
		// events.
		if (this !== this.currentContainer) {
			if (!noPropagation) {
				delayedTriggers.push(function (event) {
					this._trigger("remove", event, this._uiHash());
				});
				delayedTriggers.push(function (c) {
					return function (event) {
						c._trigger("receive", event, this._uiHash(this));
					};
				}.call(this, this.currentContainer));
				delayedTriggers.push(function (c) {
					return function (event) {
						c._trigger("update", event, this._uiHash(this));
					};
				}.call(this, this.currentContainer));
			}
		}

		//Post events to containers
		function delayEvent(type, instance, container) {
			return function (event) {
				container._trigger(type, event, instance._uiHash(instance));
			};
		}
		for (i = this.containers.length - 1; i >= 0; i--) {
			if (!noPropagation) {
				delayedTriggers.push(delayEvent("deactivate", this, this.containers[i]));
			}
			if (this.containers[i].containerCache.over) {
				delayedTriggers.push(delayEvent("out", this, this.containers[i]));
				this.containers[i].containerCache.over = 0;
			}
		}

		//Do what was originally in plugins
		if (this.storedCursor) {
			this.document.find("body").css("cursor", this.storedCursor);
			this.storedStylesheet.remove();
		}
		if (this._storedOpacity) {
			this.helper.css("opacity", this._storedOpacity);
		}
		if (this._storedZIndex) {
			this.helper.css("zIndex", this._storedZIndex === "auto" ? "" : this._storedZIndex);
		}

		this.dragging = false;

		if (!noPropagation) {
			this._trigger("beforeStop", event, this._uiHash());
		}

		//$(this.placeholder[0]).remove(); would have been the jQuery way - unfortunately,
		// it unbinds ALL events from the original node!
		this.placeholder[0].parentNode.removeChild(this.placeholder[0]);

		if (!this.cancelHelperRemoval) {
			if (this.helper[0] !== this.currentItem[0]) {
				this.helper.remove();
			}
			this.helper = null;
		}

		if (!noPropagation) {
			for (i = 0; i < delayedTriggers.length; i++) {

				// Trigger all delayed events
				delayedTriggers[i].call(this, event);
			}
			this._trigger("stop", event, this._uiHash());
		}

		this.fromOutside = false;
		return !this.cancelHelperRemoval;
	},

	_trigger: function _trigger() {
		if ($.Widget.prototype._trigger.apply(this, arguments) === false) {
			this.cancel();
		}
	},

	_uiHash: function _uiHash(_inst) {
		var inst = _inst || this;
		return {
			helper: inst.helper,
			placeholder: inst.placeholder || $([]),
			position: inst.position,
			originalPosition: inst.originalPosition,
			offset: inst.positionAbs,
			item: inst.currentItem,
			sender: _inst ? _inst.element : null
		};
	}

});

/*!
 * jQuery UI Progressbar 1.12.0
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */

//>>label: Progressbar
//>>group: Widgets
// jscs:disable maximumLineLength
//>>description: Displays a status indicator for loading state, standard percentage, and other progress indicators.
// jscs:enable maximumLineLength
//>>docs: http://api.jqueryui.com/progressbar/
//>>demos: http://jqueryui.com/progressbar/
//>>css.structure: ../../themes/base/core.css
//>>css.structure: ../../themes/base/progressbar.css
//>>css.theme: ../../themes/base/theme.css

widget$1("ui.progressbar", {
	version: "1.12.0",
	options: {
		classes: {
			"ui-progressbar": "ui-corner-all",
			"ui-progressbar-value": "ui-corner-left",
			"ui-progressbar-complete": "ui-corner-right"
		},
		max: 100,
		value: 0,

		change: null,
		complete: null
	},

	min: 0,

	_create: function _create() {

		// Constrain initial value
		this.oldValue = this.options.value = this._constrainedValue();

		this.element.attr({

			// Only set static values; aria-valuenow and aria-valuemax are
			// set inside _refreshValue()
			role: "progressbar",
			"aria-valuemin": this.min
		});
		this._addClass("ui-progressbar", "ui-widget ui-widget-content");

		this.valueDiv = $("<div>").appendTo(this.element);
		this._addClass(this.valueDiv, "ui-progressbar-value", "ui-widget-header");
		this._refreshValue();
	},

	_destroy: function _destroy() {
		this.element.removeAttr("role aria-valuemin aria-valuemax aria-valuenow");

		this.valueDiv.remove();
	},

	value: function value(newValue) {
		if (newValue === undefined) {
			return this.options.value;
		}

		this.options.value = this._constrainedValue(newValue);
		this._refreshValue();
	},

	_constrainedValue: function _constrainedValue(newValue) {
		if (newValue === undefined) {
			newValue = this.options.value;
		}

		this.indeterminate = newValue === false;

		// Sanitize value
		if (typeof newValue !== "number") {
			newValue = 0;
		}

		return this.indeterminate ? false : Math.min(this.options.max, Math.max(this.min, newValue));
	},

	_setOptions: function _setOptions(options) {

		// Ensure "value" option is set after other values (like max)
		var value = options.value;
		delete options.value;

		this._super(options);

		this.options.value = this._constrainedValue(value);
		this._refreshValue();
	},

	_setOption: function _setOption(key, value) {
		if (key === "max") {

			// Don't allow a max less than min
			value = Math.max(this.min, value);
		}
		this._super(key, value);
	},

	_setOptionDisabled: function _setOptionDisabled(value) {
		this._super(value);

		this.element.attr("aria-disabled", value);
		this._toggleClass(null, "ui-state-disabled", !!value);
	},

	_percentage: function _percentage() {
		return this.indeterminate ? 100 : 100 * (this.options.value - this.min) / (this.options.max - this.min);
	},

	_refreshValue: function _refreshValue() {
		var value = this.options.value,
		    percentage = this._percentage();

		this.valueDiv.toggle(this.indeterminate || value > this.min).width(percentage.toFixed(0) + "%");

		this._toggleClass(this.valueDiv, "ui-progressbar-complete", null, value === this.options.max)._toggleClass("ui-progressbar-indeterminate", null, this.indeterminate);

		if (this.indeterminate) {
			this.element.removeAttr("aria-valuenow");
			if (!this.overlayDiv) {
				this.overlayDiv = $("<div>").appendTo(this.valueDiv);
				this._addClass(this.overlayDiv, "ui-progressbar-overlay");
			}
		} else {
			this.element.attr({
				"aria-valuemax": this.options.max,
				"aria-valuenow": value
			});
			if (this.overlayDiv) {
				this.overlayDiv.remove();
				this.overlayDiv = null;
			}
		}

		if (this.oldValue !== value) {
			this.oldValue = value;
			this._trigger("change");
		}
		if (value === this.options.max) {
			this._trigger("complete");
		}
	}
});

/*!
 * jQuery Evol Colorpicker
 */
var _idx = 0;
var isIE = false;
var _ie = isIE ? '-ie' : '';
var isMoz = false;
var history = [];
var int2Hex = function int2Hex(i) {
	var h = i.toString(16);
	if (h.length === 1) {
		h = '0' + h;
	}
	return h;
};
var st2Hex = function st2Hex(s) {
	return int2Hex(Number(s));
};
var toHex3 = function toHex3(c) {
	if (c && c.length > 10) {
		// IE9
		var p1 = 1 + c.indexOf('('),
		    p2 = c.indexOf(')'),
		    cs = c.substring(p1, p2).split(',');
		console.log(cs);
		return ['#', st2Hex(cs[0]), st2Hex(cs[1]), st2Hex(cs[2])].join('');
	} else {
		return c;
	}
};

widget$1("evol.colorpicker", {

	version: '2.1',

	options: {
		color: null, // example default:'#31859B'
		showOn: 'both', // possible values 'focus','button','both'
		displayIndicator: true,
		history: true,
		strings: 'Pick A Color',
		cols: 9,
		rows: 4,
		type: 'colorpicker',
		gradientid: 0,
		extraClassnames: '',
		subThemeColors: ['f2f2f2', 'ddd9c3', 'c6d9f0', 'dbe5f1', 'f2dcdb', 'ebf1dd', 'e5e0ec', 'dbeef3', 'fdeada', 'd8d8d8', 'c4bd97', '8db3e2', 'b8cce4', 'e5b9b7', 'd7e3bc', 'ccc1d9', 'b7dde8', 'fbd5b5', 'bfbfbf', '938953', '548dd4', '95b3d7', 'd99694', 'c3d69b', 'b2a2c7', '92cddc', 'fac08f', 'a5a5a5', '494429', '17365d', '366092', '953734', '76923c', '5f497a', '31859b', 'e36c09', '7f7f7f', '1d1b10', '0f243e', '244061', '632423', '4f6128', '3f3151', '205867', '974806']

	},

	_create: function _create() {

		this._paletteIdx = 1;
		this._id = 'evo-cp' + _idx++;
		this._enabled = true;
		var self = this;

		switch (this.element.get(0).tagName) {
			case 'INPUT':
				var color = this.options.color;

				this._isPopup = true;
				this._palette = null;
				if (color !== null) {
					this.element.val(color);
				} else {
					var v = this.element.val();
					if (v !== '') {
						color = this.options.color = v;
					}
				}
				this.element.addClass('colorPicker ' + this._id);

				if (this.options.type === 'gradient') {
					this.options.rows = this.options.subThemeColors.length;
					var thisgradient = this.getGradient(this.options.gradientid);
					//console.log(thisgradient);
					this.element.wrap('<span class="gradientpickerwrap"></span>').after('<div class="gradientpicker ' + (this.options.showOn === 'focus' ? '' : 'evo-pointer ') + 'evo-colorind' + (isMoz ? '-ff' : _ie) + '"  style="' + thisgradient + '"></div>');
				} else {
					this.element.wrap('<div class="colorpickerwrap" style="width:' + (this.element.width() + 32) + 'px;' + (isIE ? 'margin-bottom:-21px;' : '') + (isMoz ? 'padding:1px 0;' : '') + '"></div>').after('<div class="colorpickerafter ' + (this.options.showOn === 'focus' ? '' : 'evo-pointer ') + 'evo-colorind' + (isMoz ? '-ff' : _ie) + '" ' + (color !== null ? 'style="background-color:' + color + '"' : '') + '></div>');
				}

				this.element.on('keyup onpaste', function (evt) {
					var thisvalue = $(this).val();
					if (thisvalue !== self.options.color) {
						self._setValue(thisvalue, true);
					}
				});

				var showOn = this.options.showOn;
				if (showOn === 'both' || showOn === 'focus') {
					this.element.on('focus', function () {
						self.showPalette();
					});
				}
				if (showOn === 'both' || showOn === 'button') {
					this.element.next().on('click', function (evt) {
						evt.stopPropagation();
						self.showPalette();
					});
				}
				break;
			default:
				this._isPopup = false;
				this._palette = this.element.html(this._paletteHTML()).attr('aria-haspopup', 'true');
				this._bindColors();
		}
		if (color !== null && this.options.history) {
			this._add2History(color);
		}
	},

	_paletteHTML: function _paletteHTML() {
		var h = [],
		    pIdx = this._paletteIdx = Math.abs(this._paletteIdx),
		    opts = this.options,
		    labels = opts.strings.split(',');
		h.push('<div  class="lecolorpicker evo-pop', _ie, this.options.extraClassnames, '"', this._isPopup ? ' style="position:absolute"' : '', '>');
		// palette
		h.push('<span>', this['_paletteHTML' + pIdx](), '</span>');
		// links
		h.push('<div class="evo-more"><a href="javascript:void(0)">', labels[1 + pIdx], '</a>');

		h.push('</div>');

		h.push('</div>');
		return h.join('');
	},

	_colorIndHTML: function _colorIndHTML(c, fl) {
		var h = [];
		h.push('<div class="evo-color" style="float:left"><div style="');
		h.push(c ? 'background-color:' + c : 'display:none');
		if (isIE) {
			h.push('" class="evo-colorbox-ie"></div><span class=".evo-colortxt-ie" ');
		} else {
			h.push('"></div><span ');
		}
		h.push(c ? '>' + c + '</span>' : '/>');
		h.push('</div>');
		return h.join('');
	},

	_paletteHTML1: function _paletteHTML1() {
		var h = [],
		    labels = this.options.strings.split(','),
		    oTD = '<td  class="colorpickersquare" style=" ',
		    cTD = isIE ? '"><div style="width:2px;"></div>' : '"><span>',
		    fTD = '</span></td>',
		    oTRTH = '<tr><th colspan="' + this.options.cols + '" class="ui-widget-content">';
		// base theme colors

		h.push('<table class="evo-palette', _ie, '">', oTRTH, labels[0], '</th></tr>');

		//console.log('subThemeColors',this.options.subThemeColors,this.options);
		// theme colors

		for (var r = 0; r < this.options.rows; r++) {
			h.push('<tr class="in">');
			if (this.options.type === 'colorpicker') {
				for (var i = 0; i < this.options.cols; i++) {
					h.push(oTD, 'background: #' + this.options.subThemeColors[r * this.options.cols + i] + ';" data-color="' + this.options.subThemeColors[r * this.options.cols + i], cTD, fTD);
				}
			} else if (this.options.type === 'gradient') {
				h.push(oTD);
				h.push(this.getGradient(r));
				h.push(';width: 150px;border:1px solid #EEE" data-gradient="' + r, cTD, fTD);
			}
			h.push('</tr>');
		}

		h.push('</table>');
		return h.join('');
	},

	getGradient: function getGradient(gradientid) {
		var thisgradient = [];
		thisgradient.push('background: linear-gradient(to right ');
		var colorlength = this.options.subThemeColors[gradientid][1].length;

		for (var i = 0; i < colorlength; i++) {
			thisgradient.push(' , ', this.options.subThemeColors[gradientid][1][i], ' ', 10 * (10 * i / colorlength), '% ');
		}
		thisgradient.push(')');

		thisgradient = thisgradient.join('');
		return thisgradient;
	},

	showPalette: function showPalette() {
		if (this._enabled) {
			$('.colorPicker').not('.' + this._id).colorpicker('hidePalette');
			if (this._palette === null) {
				this._palette = this.element.next().after(this._paletteHTML()).next().on('click', function (evt) {
					evt.stopPropagation();
				});
				this._bindColors();
				var that = this;
				$(document.body).on('click.' + this._id, function (evt) {
					if (evt.target !== that.element.get(0)) {
						that.hidePalette();
					}
				});
			}
		}
		return this;
	},

	hidePalette: function hidePalette() {
		if (this._isPopup && this._palette) {
			$(document.body).off('click.' + this._id);
			var that = this;
			this._palette.off('mouseover click', 'td').fadeOut(function () {
				that._palette.remove();
				that._palette = that._cTxt = null;
			}).find('.evo-more a').off('click');
		}
		return this;
	},

	_bindColors: function _bindColors() {
		var es = this._palette.find('div.evo-color'),
		    sel = this.options.history ? 'td,.evo-cHist div' : 'td';
		this._cTxt1 = es.eq(0).children().eq(0);
		this._cTxt2 = es.eq(1).children().eq(0);
		var that = this;
		this._palette.on('click', sel, function (evt) {
			if (that._enabled) {
				if (that.options.type === 'colorpicker') {
					var c = toHex3($(this).data('color'));
					that._setValue(String(c));
				} else if (that.options.type === 'gradient') {
					var gradientid = $(this).data('gradient');

					that.options.gradientid = gradientid;
					that._setValue(String(gradientid));
					$('.gradientpicker', that.element.parent()).attr('style', that.getGradient(gradientid));
				}
			}
		}).on('mouseover', sel, function (evt) {
			if (that._enabled) {
				var c = toHex3($(this).data('color'));
				if (that.options.displayIndicator) {
					that._setColorInd(c, 2);
				}
				that.element.trigger('mouseover.color', c);
			}
		}).find('.evo-more a').on('click', function () {
			that._switchPalette(this);
		});
	},

	val: function val(value) {
		if (typeof value === 'undefined') {
			return this.options.color;
		} else {
			this._setValue(value);
			return this;
		}
	},

	_setValue: function _setValue(c, noHide) {
		c = c || '#999999';
		c = String(c).replace(/ /g, '');
		this.options.color = c;
		if (this._isPopup) {
			if (!noHide) {
				this.hidePalette();
			}
			this.element.val(c).next().attr('style', 'background-color:' + c);
		} else {
			this._setColorInd(c, 1);
		}
		if (this.options.history && this._paletteIdx > 0) {
			this._add2History(c);
		}

		this.element.trigger('change.color', c);
	},

	_setColorInd: function _setColorInd(c, idx) {
		this['_cTxt' + idx].attr('style', 'background-color:' + c).next().html(c);
	},

	_setOption: function _setOption(key, value) {
		if (key === 'color') {
			this._setValue(value, true);
		} else {
			this.options[key] = value;
		}
	},

	_add2History: function _add2History(c) {
		var iMax = history.length;
		// skip color if already in history
		for (var i = 0; i < iMax; i++) {
			if (c === history[i]) {
				return;
			}
		}
		// limit of 28 colors in history
		if (iMax > 27) {
			history.shift();
		}
		// add to history
		history.push(c);
	},

	enable: function enable() {
		var e = this.element;
		if (this._isPopup) {
			e.removeAttr('disabled');
		} else {
			e.css({
				'opacity': '1',
				'pointer-events': 'auto'
			});
		}
		if (this.options.showOn !== 'focus') {
			this.element.next().addClass('evo-pointer');
		}
		e.removeAttr('aria-disabled');
		this._enabled = true;
		return this;
	},

	disable: function disable() {
		var e = this.element;
		if (this._isPopup) {
			e.attr('disabled', 'disabled');
		} else {
			this.hidePalette();
			e.css({
				'opacity': '0.3',
				'pointer-events': 'none'
			});
		}
		if (this.options.showOn !== 'focus') {
			this.element.next().removeClass('evo-pointer');
		}
		e.attr('aria-disabled', 'true');
		this._enabled = false;
		return this;
	},

	isDisabled: function isDisabled() {
		return !this._enabled;
	},

	destroy: function destroy() {
		$(document.body).off('click.' + this._id);
		if (this._palette) {
			this._palette.off('mouseover click', 'td').find('.evo-more a').off('click');
			if (this._isPopup) {
				this._palette.remove();
			}
			this._palette = this._cTxt = null;
		}
		if (this._isPopup) {
			this.element.next().off('click').remove().end().off('focus').unwrap();
		}
		this.element.removeClass('colorPicker ' + this.id).empty();
		$.Widget.prototype.destroy.call(this);
	}

});

/* ==========================================================
 * bootstrap-alert.js v2.3.2
 * http://getbootstrap.com/2.3.2/javascript.html#alerts
 * ==========================================================
 * Copyright 2013 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */

/* ALERT CLASS DEFINITION
 * ====================== */

var dismiss = '[data-dismiss="alert"]';
var Alert = function Alert(el) {
  $(el).on('click', dismiss, this.close);
};

Alert.prototype.close = function (e) {
  var $this = $(this),
      selector = $this.attr('data-target'),
      $parent;

  if (!selector) {
    selector = $this.attr('href');
    selector = selector && selector.replace(/.*(?=#[^\s]*$)/, ''); //strip for ie7
  }

  $parent = $(selector);

  e && e.preventDefault();

  $parent.length || ($parent = $this.hasClass('alert') ? $this : $this.parent());

  $parent.trigger(e = $.Event('close'));

  if (e.isDefaultPrevented()) return;

  $parent.removeClass('in');

  function removeElement() {
    $parent.trigger('closed').remove();
  }

  $.support.transition && $parent.hasClass('fade') ? $parent.on($.support.transition.end, removeElement) : removeElement();
};

/* ALERT PLUGIN DEFINITION
 * ======================= */

var old = $.fn.alert;

$.fn.alert = function (option) {
  return this.each(function () {
    var $this = $(this),
        data = $this.data('alert');
    if (!data) $this.data('alert', data = new Alert(this));
    if (typeof option == 'string') data[option].call($this);
  });
};

$.fn.alert.Constructor = Alert;

/* ALERT NO CONFLICT
 * ================= */

$.fn.alert.noConflict = function () {
  $.fn.alert = old;
  return this;
};

/* ALERT DATA-API
 * ============== */

$(document).on('click.alert.data-api', dismiss, Alert.prototype.close);

/* ============================================================
 * bootstrap-button.js v2.3.2
 * http://getbootstrap.com/2.3.2/javascript.html#buttons
 * ============================================================
 * Copyright 2013 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ============================================================ */

/* BUTTON PUBLIC CLASS DEFINITION
 * ============================== */

var Button = function Button(element, options) {
  this.$element = $(element);
  this.options = $.extend({}, $.fn.button.defaults, options);
};

Button.prototype.setState = function (state) {
  var d = 'disabled',
      $el = this.$element,
      data = $el.data(),
      val = $el.is('input') ? 'val' : 'html';

  state = state + 'Text';
  data.resetText || $el.data('resetText', $el[val]());

  $el[val](data[state] || this.options[state]);

  // push to event loop to allow forms to submit
  setTimeout(function () {
    state == 'loadingText' ? $el.addClass(d).attr(d, d) : $el.removeClass(d).removeAttr(d);
  }, 0);
};

Button.prototype.toggle = function () {
  var $parent = this.$element.closest('[data-toggle="buttons-radio"]');

  $parent && $parent.find('.active').removeClass('active');

  this.$element.toggleClass('active');
};

/* BUTTON PLUGIN DEFINITION
 * ======================== */

var old$1 = $.fn.button;

$.fn.button = function (option) {
  return this.each(function () {
    var $this = $(this),
        data = $this.data('button'),
        options = typeof option == 'object' && option;
    if (!data) $this.data('button', data = new Button(this, options));
    if (option == 'toggle') data.toggle();else if (option) data.setState(option);
  });
};

$.fn.button.defaults = {
  loadingText: 'loading...'
};

$.fn.button.Constructor = Button;

/* BUTTON NO CONFLICT
 * ================== */

$.fn.button.noConflict = function () {
  $.fn.button = old$1;
  return this;
};

/* BUTTON DATA-API
 * =============== */

$(document).on('click.button.data-api', '[data-toggle^=button]', function (e) {
  var $btn = $(e.target);
  if (!$btn.hasClass('btn')) $btn = $btn.closest('.btn');
  $btn.button('toggle');
});

/* =============================================================
 * bootstrap-collapse.js v2.3.2
 * http://getbootstrap.com/2.3.2/javascript.html#collapse
 * =============================================================
 * Copyright 2013 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ============================================================ */

/* COLLAPSE PUBLIC CLASS DEFINITION
 * ================================ */

var Collapse = function Collapse(element, options) {
  this.$element = $(element);
  this.options = $.extend({}, $.fn.collapse.defaults, options);

  if (this.options.parent) {
    this.$parent = $(this.options.parent);
  }

  this.options.toggle && this.toggle();
};

Collapse.prototype = {

  constructor: Collapse,

  dimension: function dimension() {
    var hasWidth = this.$element.hasClass('width');
    return hasWidth ? 'width' : 'height';
  },

  show: function show() {
    var dimension, scroll, actives, hasData;

    if (this.transitioning || this.$element.hasClass('in')) return;

    dimension = this.dimension();
    scroll = $.camelCase(['scroll', dimension].join('-'));
    actives = this.$parent && this.$parent.find('> .accordion-group > .in');

    if (actives && actives.length) {
      hasData = actives.data('collapse');
      if (hasData && hasData.transitioning) return;
      actives.collapse('hide');
      hasData || actives.data('collapse', null);
    }

    this.$element[dimension](0);
    this.transition('addClass', $.Event('show'), 'shown');
    $.support.transition && this.$element[dimension](this.$element[0][scroll]);
  },

  hide: function hide() {
    var dimension;
    if (this.transitioning || !this.$element.hasClass('in')) return;
    dimension = this.dimension();
    this.reset(this.$element[dimension]());
    this.transition('removeClass', $.Event('hide'), 'hidden');
    this.$element[dimension](0);
  },

  reset: function reset(size) {
    var dimension = this.dimension();

    this.$element.removeClass('collapse')[dimension](size || 'auto')[0].offsetWidth;

    this.$element[size !== null ? 'addClass' : 'removeClass']('collapse');

    return this;
  },

  transition: function transition(method, startEvent, completeEvent) {
    var that = this,
        complete = function complete() {
      if (startEvent.type == 'show') that.reset();
      that.transitioning = 0;
      that.$element.trigger(completeEvent);
    };

    this.$element.trigger(startEvent);

    if (startEvent.isDefaultPrevented()) return;

    this.transitioning = 1;

    this.$element[method]('in');

    $.support.transition && this.$element.hasClass('collapse') ? this.$element.one($.support.transition.end, complete) : complete();
  },

  toggle: function toggle() {
    this[this.$element.hasClass('in') ? 'hide' : 'show']();
  }

};

/* COLLAPSE PLUGIN DEFINITION
 * ========================== */

var old$2 = $.fn.collapse;

$.fn.collapse = function (option) {
  return this.each(function () {
    var $this = $(this),
        data = $this.data('collapse'),
        options = $.extend({}, $.fn.collapse.defaults, $this.data(), typeof option == 'object' && option);
    if (!data) $this.data('collapse', data = new Collapse(this, options));
    if (typeof option == 'string') data[option]();
  });
};

$.fn.collapse.defaults = {
  toggle: true
};

$.fn.collapse.Constructor = Collapse;

/* COLLAPSE NO CONFLICT
 * ==================== */

$.fn.collapse.noConflict = function () {
  $.fn.collapse = old$2;
  return this;
};

/* COLLAPSE DATA-API
 * ================= */

$(document).on('click.collapse.data-api', '[data-toggle=collapse]', function (e) {
  var $this = $(this),
      href,
      target = $this.attr('data-target') || e.preventDefault() || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '') //strip for ie7
  ,
      option = $(target).data('collapse') ? 'toggle' : $this.data();
  $this[$(target).hasClass('in') ? 'addClass' : 'removeClass']('collapsed');
  $(target).collapse(option);
});

/* ============================================================
 * bootstrap-dropdown.js v2.3.2
 * http://getbootstrap.com/2.3.2/javascript.html#dropdowns
 * ============================================================
 * Copyright 2013 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ============================================================ */

/* DROPDOWN CLASS DEFINITION
 * ========================= */

var toggle$1 = '[data-toggle=dropdown]';
var Dropdown = function Dropdown(element) {
  var $el = $(element).on('click.dropdown.data-api', this.toggle);
  $('html').on('click.dropdown.data-api', function () {
    $el.parent().removeClass('open');
  });
};

Dropdown.prototype = {

  constructor: Dropdown,

  toggle: function toggle$1(e) {
    var $this = $(this),
        $parent,
        isActive;

    if ($this.is('.disabled, :disabled')) return;

    $parent = getParent($this);

    isActive = $parent.hasClass('open');

    clearMenus();

    if (!isActive) {
      if ('ontouchstart' in document.documentElement) {
        // if mobile we we use a backdrop because click events don't delegate
        $('<div class="dropdown-backdrop"/>').insertBefore($(this)).on('click', clearMenus);
      }
      $parent.toggleClass('open');
    }

    $this.focus();

    return false;
  },

  keydown: function keydown(e) {
    var $this, $items, $active, $parent, isActive, index;

    if (!/(38|40|27)/.test(e.keyCode)) return;

    $this = $(this);

    e.preventDefault();
    e.stopPropagation();

    if ($this.is('.disabled, :disabled')) return;

    $parent = getParent($this);

    isActive = $parent.hasClass('open');

    if (!isActive || isActive && e.keyCode == 27) {
      if (e.which == 27) $parent.find(toggle$1).focus();
      return $this.click();
    }

    $items = $('[role=menu] li:not(.divider):visible a', $parent);

    if (!$items.length) return;

    index = $items.index($items.filter(':focus'));

    if (e.keyCode == 38 && index > 0) index--; // up
    if (e.keyCode == 40 && index < $items.length - 1) index++; // down
    if (! ~index) index = 0;

    $items.eq(index).focus();
  }

};

function clearMenus() {
  $('.dropdown-backdrop').remove();
  $(toggle$1).each(function () {
    getParent($(this)).removeClass('open');
  });
}

function getParent($this) {
  var selector = $this.attr('data-target'),
      $parent;

  if (!selector) {
    selector = $this.attr('href');
    selector = selector && /#/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, ''); //strip for ie7
  }

  $parent = selector && $(selector);

  if (!$parent || !$parent.length) $parent = $this.parent();

  return $parent;
}

/* DROPDOWN PLUGIN DEFINITION
 * ========================== */

var old$3 = $.fn.dropdown;

$.fn.dropdown = function (option) {
  return this.each(function () {
    var $this = $(this),
        data = $this.data('dropdown');
    if (!data) $this.data('dropdown', data = new Dropdown(this));
    if (typeof option == 'string') data[option].call($this);
  });
};

$.fn.dropdown.Constructor = Dropdown;

/* DROPDOWN NO CONFLICT
 * ==================== */

$.fn.dropdown.noConflict = function () {
  $.fn.dropdown = old$3;
  return this;
};

/* APPLY TO STANDARD DROPDOWN ELEMENTS
 * =================================== */

$(document).on('click.dropdown.data-api', clearMenus).on('click.dropdown.data-api', '.dropdown form', function (e) {
  e.stopPropagation();
}).on('click.dropdown.data-api', toggle$1, Dropdown.prototype.toggle).on('keydown.dropdown.data-api', toggle$1 + ', [role=menu]', Dropdown.prototype.keydown);

/* =========================================================
 * bootstrap-modal.js v2.3.2
 * http://getbootstrap.com/2.3.2/javascript.html#modals
 * =========================================================
 * Copyright 2013 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================= */

/* MODAL CLASS DEFINITION
 * ====================== */

var Modal = function Modal(element, options) {
  this.options = options;
  this.$element = $(element).delegate('[data-dismiss="modal"]', 'click.dismiss.modal', $.proxy(this.hide, this));
  this.options.remote && this.$element.find('.modal-body').load(this.options.remote);
};

Modal.prototype = {

  constructor: Modal,

  toggle: function toggle() {
    return this[!this.isShown ? 'show' : 'hide']();
  },

  show: function show() {
    var that = this,
        e = $.Event('show');

    this.$element.trigger(e);

    if (this.isShown || e.isDefaultPrevented()) return;

    this.isShown = true;

    this.escape();

    this.backdrop(function () {
      var transition = $.support.transition && that.$element.hasClass('fade');

      if (!that.$element.parent().length) {
        that.$element.appendTo(document.body); //don't move modals dom position
      }

      that.$element.show();

      if (transition) {
        that.$element[0].offsetWidth; // force reflow
      }

      that.$element.addClass('in').attr('aria-hidden', false);

      that.enforceFocus();

      transition ? that.$element.one($.support.transition.end, function () {
        that.$element.focus().trigger('shown');
      }) : that.$element.focus().trigger('shown');
    });
  },

  hide: function hide(e) {
    e && e.preventDefault();

    var that = this;

    e = $.Event('hide');

    this.$element.trigger(e);

    if (!this.isShown || e.isDefaultPrevented()) return;

    this.isShown = false;

    this.escape();

    $(document).off('focusin.modal');

    this.$element.removeClass('in').attr('aria-hidden', true);

    $.support.transition && this.$element.hasClass('fade') ? this.hideWithTransition() : this.hideModal();
  },

  enforceFocus: function enforceFocus() {
    var that = this;
    $(document).on('focusin.modal', function (e) {
      if (that.$element[0] !== e.target && !that.$element.has(e.target).length) {
        that.$element.focus();
      }
    });
  },

  escape: function escape() {
    var that = this;
    if (this.isShown && this.options.keyboard) {
      this.$element.on('keyup.dismiss.modal', function (e) {
        e.which == 27 && that.hide();
      });
    } else if (!this.isShown) {
      this.$element.off('keyup.dismiss.modal');
    }
  },

  hideWithTransition: function hideWithTransition() {
    var that = this,
        timeout = setTimeout(function () {
      that.$element.off($.support.transition.end);
      that.hideModal();
    }, 500);

    this.$element.one($.support.transition.end, function () {
      clearTimeout(timeout);
      that.hideModal();
    });
  },

  hideModal: function hideModal() {
    var that = this;
    this.$element.hide();
    this.backdrop(function () {
      that.removeBackdrop();
      that.$element.trigger('hidden');
    });
  },

  removeBackdrop: function removeBackdrop() {
    this.$backdrop && this.$backdrop.remove();
    this.$backdrop = null;
  },

  backdrop: function backdrop(callback) {
    var that = this,
        animate = this.$element.hasClass('fade') ? 'fade' : '';

    if (this.isShown && this.options.backdrop) {
      var doAnimate = $.support.transition && animate;

      this.$backdrop = $('<div class="modal-backdrop ' + animate + '" />').appendTo(document.body);

      this.$backdrop.click(this.options.backdrop == 'static' ? $.proxy(this.$element[0].focus, this.$element[0]) : $.proxy(this.hide, this));

      if (doAnimate) this.$backdrop[0].offsetWidth; // force reflow

      this.$backdrop.addClass('in');

      if (!callback) return;

      doAnimate ? this.$backdrop.one($.support.transition.end, callback) : callback();
    } else if (!this.isShown && this.$backdrop) {
      this.$backdrop.removeClass('in');

      $.support.transition && this.$element.hasClass('fade') ? this.$backdrop.one($.support.transition.end, callback) : callback();
    } else if (callback) {
      callback();
    }
  }
};

/* MODAL PLUGIN DEFINITION
 * ======================= */

var old$4 = $.fn.modal;

$.fn.modal = function (option) {
  return this.each(function () {
    var $this = $(this),
        data = $this.data('modal'),
        options = $.extend({}, $.fn.modal.defaults, $this.data(), typeof option == 'object' && option);
    if (!data) $this.data('modal', data = new Modal(this, options));
    if (typeof option == 'string') data[option]();else if (options.show) data.show();
  });
};

$.fn.modal.defaults = {
  backdrop: true,
  keyboard: true,
  show: true
};

$.fn.modal.Constructor = Modal;

/* MODAL NO CONFLICT
 * ================= */

$.fn.modal.noConflict = function () {
  $.fn.modal = old$4;
  return this;
};

/* MODAL DATA-API
 * ============== */

$(document).on('click.modal.data-api', '[data-toggle="modal"]', function (e) {
  var $this = $(this),
      href = $this.attr('href'),
      $target = $($this.attr('data-target') || href && href.replace(/.*(?=#[^\s]+$)/, '')) //strip for ie7
  ,
      option = $target.data('modal') ? 'toggle' : $.extend({ remote: !/#/.test(href) && href }, $target.data(), $this.data());

  e.preventDefault();

  $target.modal(option).one('hide', function () {
    $this.focus();
  });
});

/* ===========================================================
 * bootstrap-tooltip.js v2.3.2
 * http://getbootstrap.com/2.3.2/javascript.html#tooltips
 * Inspired by the original jQuery.tipsy by Jason Frame
 * ===========================================================
 * Copyright 2013 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */

/* TOOLTIP PUBLIC CLASS DEFINITION
 * =============================== */

var Tooltip = function Tooltip(element, options) {
  this.init('tooltip', element, options);
};

Tooltip.prototype = {

  constructor: Tooltip,

  init: function init(type, element, options) {
    var eventIn, eventOut, triggers, trigger, i;

    this.type = type;
    this.$element = $(element);
    this.options = this.getOptions(options);
    this.enabled = true;

    triggers = this.options.trigger.split(' ');

    for (i = triggers.length; i--;) {
      trigger = triggers[i];
      if (trigger == 'click') {
        this.$element.on('click.' + this.type, this.options.selector, $.proxy(this.toggle, this));
      } else if (trigger != 'manual') {
        eventIn = trigger == 'hover' ? 'mouseenter' : 'focus';
        eventOut = trigger == 'hover' ? 'mouseleave' : 'blur';
        this.$element.on(eventIn + '.' + this.type, this.options.selector, $.proxy(this.enter, this));
        this.$element.on(eventOut + '.' + this.type, this.options.selector, $.proxy(this.leave, this));
      }
    }

    this.options.selector ? this._options = $.extend({}, this.options, { trigger: 'manual', selector: '' }) : this.fixTitle();
  },

  getOptions: function getOptions(options) {
    options = $.extend({}, $.fn[this.type].defaults, this.$element.data(), options);

    if (options.delay && typeof options.delay == 'number') {
      options.delay = {
        show: options.delay,
        hide: options.delay
      };
    }

    return options;
  },

  enter: function enter(e) {
    var defaults = $.fn[this.type].defaults,
        options = {},
        self;

    this._options && $.each(this._options, function (key, value) {
      if (defaults[key] != value) options[key] = value;
    }, this);

    self = $(e.currentTarget)[this.type](options).data(this.type);

    if (!self.options.delay || !self.options.delay.show) return self.show();

    clearTimeout(this.timeout);
    self.hoverState = 'in';
    this.timeout = setTimeout(function () {
      if (self.hoverState == 'in') self.show();
    }, self.options.delay.show);
  },

  leave: function leave(e) {
    var self = $(e.currentTarget)[this.type](this._options).data(this.type);

    if (this.timeout) clearTimeout(this.timeout);
    if (!self.options.delay || !self.options.delay.hide) return self.hide();

    self.hoverState = 'out';
    this.timeout = setTimeout(function () {
      if (self.hoverState == 'out') self.hide();
    }, self.options.delay.hide);
  },

  show: function show() {
    var $tip,
        pos,
        actualWidth,
        actualHeight,
        placement,
        tp,
        e = $.Event('show');

    if (this.hasContent() && this.enabled) {
      this.$element.trigger(e);
      if (e.isDefaultPrevented()) return;
      $tip = this.tip();
      this.setContent();

      if (this.options.animation) {
        $tip.addClass('fade');
      }

      placement = typeof this.options.placement == 'function' ? this.options.placement.call(this, $tip[0], this.$element[0]) : this.options.placement;

      $tip.detach().css({ top: 0, left: 0, display: 'block' });

      this.options.container ? $tip.appendTo(this.options.container) : $tip.insertAfter(this.$element);

      pos = this.getPosition();

      actualWidth = $tip[0].offsetWidth;
      actualHeight = $tip[0].offsetHeight;

      switch (placement) {
        case 'bottom':
          tp = { top: pos.top + pos.height, left: pos.left + pos.width / 2 - actualWidth / 2 };
          break;
        case 'top':
          tp = { top: pos.top - actualHeight, left: pos.left + pos.width / 2 - actualWidth / 2 };
          break;
        case 'left':
          tp = { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth };
          break;
        case 'right':
          tp = { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width };
          break;
      }

      this.applyPlacement(tp, placement);
      this.$element.trigger('shown');
    }
  },

  applyPlacement: function applyPlacement(offset, placement) {
    var $tip = this.tip(),
        width = $tip[0].offsetWidth,
        height = $tip[0].offsetHeight,
        actualWidth,
        actualHeight,
        delta,
        replace;

    $tip.offset(offset).addClass(placement).addClass('in');

    actualWidth = $tip[0].offsetWidth;
    actualHeight = $tip[0].offsetHeight;

    if (placement == 'top' && actualHeight != height) {
      offset.top = offset.top + height - actualHeight;
      replace = true;
    }

    if (placement == 'bottom' || placement == 'top') {
      delta = 0;

      if (offset.left < 0) {
        delta = offset.left * -2;
        offset.left = 0;
        $tip.offset(offset);
        actualWidth = $tip[0].offsetWidth;
        actualHeight = $tip[0].offsetHeight;
      }

      this.replaceArrow(delta - width + actualWidth, actualWidth, 'left');
    } else {
      this.replaceArrow(actualHeight - height, actualHeight, 'top');
    }

    if (replace) $tip.offset(offset);
  },

  replaceArrow: function replaceArrow(delta, dimension, position) {
    this.arrow().css(position, delta ? 50 * (1 - delta / dimension) + "%" : '');
  },

  setContent: function setContent() {
    var $tip = this.tip(),
        title = this.getTitle();

    $tip.find('.tooltip-inner')[this.options.html ? 'html' : 'text'](title);
    $tip.removeClass('fade in top bottom left right');
  },

  hide: function hide() {
    var that = this,
        $tip = this.tip(),
        e = $.Event('hide');

    this.$element.trigger(e);
    if (e.isDefaultPrevented()) return;

    $tip.removeClass('in');

    function removeWithAnimation() {
      var timeout = setTimeout(function () {
        $tip.off($.support.transition.end).detach();
      }, 500);

      $tip.one($.support.transition.end, function () {
        clearTimeout(timeout);
        $tip.detach();
      });
    }

    $.support.transition && this.$tip.hasClass('fade') ? removeWithAnimation() : $tip.detach();

    this.$element.trigger('hidden');

    return this;
  },

  fixTitle: function fixTitle() {
    var $e = this.$element;
    if ($e.attr('title') || typeof $e.attr('data-original-title') != 'string') {
      $e.attr('data-original-title', $e.attr('title') || '').attr('title', '');
    }
  },

  hasContent: function hasContent() {
    return this.getTitle();
  },

  getPosition: function getPosition() {
    var el = this.$element[0];
    return $.extend({}, typeof el.getBoundingClientRect == 'function' ? el.getBoundingClientRect() : {
      width: el.offsetWidth,
      height: el.offsetHeight
    }, this.$element.offset());
  },

  getTitle: function getTitle() {
    var title,
        $e = this.$element,
        o = this.options;

    title = $e.attr('data-original-title') || (typeof o.title == 'function' ? o.title.call($e[0]) : o.title);

    return title;
  },

  tip: function tip() {
    return this.$tip = this.$tip || $(this.options.template);
  },

  arrow: function arrow() {
    return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow");
  },

  validate: function validate() {
    if (!this.$element[0].parentNode) {
      this.hide();
      this.$element = null;
      this.options = null;
    }
  },

  enable: function enable() {
    this.enabled = true;
  },

  disable: function disable() {
    this.enabled = false;
  },

  toggleEnabled: function toggleEnabled() {
    this.enabled = !this.enabled;
  },

  toggle: function toggle(e) {
    var self = e ? $(e.currentTarget)[this.type](this._options).data(this.type) : this;
    self.tip().hasClass('in') ? self.hide() : self.show();
  },

  destroy: function destroy() {
    this.hide().$element.off('.' + this.type).removeData(this.type);
  }

};

/* TOOLTIP PLUGIN DEFINITION
 * ========================= */

var old$6 = $.fn.tooltip;

$.fn.tooltip = function (option) {
  return this.each(function () {
    var $this = $(this),
        data = $this.data('tooltip'),
        options = typeof option == 'object' && option;
    if (!data) $this.data('tooltip', data = new Tooltip(this, options));
    if (typeof option == 'string') data[option]();
  });
};

$.fn.tooltip.Constructor = Tooltip;

$.fn.tooltip.defaults = {
  animation: true,
  placement: 'top',
  selector: false,
  template: '<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
  trigger: 'hover focus',
  title: '',
  delay: 0,
  html: false,
  container: false
};

/* TOOLTIP NO CONFLICT
 * =================== */

$.fn.tooltip.noConflict = function () {
  $.fn.tooltip = old$6;
  return this;
};

/* ===========================================================
 * bootstrap-popover.js v2.3.2
 * http://getbootstrap.com/2.3.2/javascript.html#popovers
 * ===========================================================
 * Copyright 2013 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =========================================================== */

/* POPOVER PUBLIC CLASS DEFINITION
 * =============================== */

var Popover = function Popover(element, options) {
  this.init('popover', element, options);
};

/* NOTE: POPOVER EXTENDS BOOTSTRAP-TOOLTIP.js
   ========================================== */

Popover.prototype = $.extend({}, $.fn.tooltip.Constructor.prototype, {

  constructor: Popover,

  setContent: function setContent() {
    var $tip = this.tip(),
        title = this.getTitle(),
        content = this.getContent();

    $tip.find('.popover-title')[this.options.html ? 'html' : 'text'](title);
    $tip.find('.popover-content')[this.options.html ? 'html' : 'text'](content);

    $tip.removeClass('fade top bottom left right in');
  },

  hasContent: function hasContent() {
    return this.getTitle() || this.getContent();
  },

  getContent: function getContent() {
    var content,
        $e = this.$element,
        o = this.options;

    content = (typeof o.content == 'function' ? o.content.call($e[0]) : o.content) || $e.attr('data-content');

    return content;
  },

  tip: function tip() {
    if (!this.$tip) {
      this.$tip = $(this.options.template);
    }
    return this.$tip;
  },

  destroy: function destroy() {
    this.hide().$element.off('.' + this.type).removeData(this.type);
  }

});

/* POPOVER PLUGIN DEFINITION
 * ======================= */

var old$5 = $.fn.popover;

$.fn.popover = function (option) {
  return this.each(function () {
    var $this = $(this),
        data = $this.data('popover'),
        options = typeof option == 'object' && option;
    if (!data) $this.data('popover', data = new Popover(this, options));
    if (typeof option == 'string') data[option]();
  });
};

$.fn.popover.Constructor = Popover;

$.fn.popover.defaults = $.extend({}, $.fn.tooltip.defaults, {
  placement: 'right',
  trigger: 'click',
  content: '',
  template: '<div class="popover"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
});

/* POPOVER NO CONFLICT
 * =================== */

$.fn.popover.noConflict = function () {
  $.fn.popover = old$5;
  return this;
};

/* ===================================================
 * bootstrap-transition.js v2.3.2
 * http://getbootstrap.com/2.3.2/javascript.html#transitions
 * ===================================================
 * Copyright 2013 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */

/* CSS TRANSITION SUPPORT (http://www.modernizr.com/)
 * ======================================================= */

$(function () {

  $.support.transition = function () {

    var transitionEnd = function () {

      var el = document.createElement('bootstrap'),
          transEndEventNames = {
        'WebkitTransition': 'webkitTransitionEnd',
        'MozTransition': 'transitionend',
        'OTransition': 'oTransitionEnd otransitionend',
        'transition': 'transitionend'
      },
          name;

      for (name in transEndEventNames) {
        if (el.style[name] !== undefined) {
          return transEndEventNames[name];
        }
      }
    }();

    return transitionEnd && {
      end: transitionEnd
    };
  }();
});

/* ========================================================
 * bootstrap-tab.js v2.3.2
 * http://getbootstrap.com/2.3.2/javascript.html#tabs
 * ========================================================
 * Copyright 2013 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================== */

/* TAB CLASS DEFINITION
 * ==================== */

var Tab = function Tab(element) {
  this.element = $(element);
};

Tab.prototype = {

  constructor: Tab,

  show: function show() {
    var $this = this.element,
        $ul = $this.closest('ul:not(.dropdown-menu)'),
        selector = $this.attr('data-target'),
        previous,
        $target,
        e;

    if (!selector) {
      selector = $this.attr('href');
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, ''); //strip for ie7
    }

    if ($this.parent('li').hasClass('active')) return;

    previous = $ul.find('.active:last a')[0];

    e = $.Event('show', {
      relatedTarget: previous
    });

    $this.trigger(e);

    if (e.isDefaultPrevented()) return;

    $target = $(selector);

    this.activate($this.parent('li'), $ul);
    this.activate($target, $target.parent(), function () {
      $this.trigger({
        type: 'shown',
        relatedTarget: previous
      });
    });
  },

  activate: function activate(element, container, callback) {
    var $active = container.find('> .active'),
        transition = callback && $.support.transition && $active.hasClass('fade');

    function next() {
      $active.removeClass('active').find('> .dropdown-menu > .active').removeClass('active');

      element.addClass('active');

      if (transition) {
        element[0].offsetWidth; // reflow for transition
        element.addClass('in');
      } else {
        element.removeClass('fade');
      }

      if (element.parent('.dropdown-menu')) {
        element.closest('li.dropdown').addClass('active');
      }

      callback && callback();
    }

    transition ? $active.one($.support.transition.end, next) : next();

    $active.removeClass('in');
  }
};

/* TAB PLUGIN DEFINITION
 * ===================== */

var old$7 = $.fn.tab;

$.fn.tab = function (option) {
  return this.each(function () {
    var $this = $(this),
        data = $this.data('tab');
    if (!data) $this.data('tab', data = new Tab(this));
    if (typeof option == 'string') data[option]();
  });
};

$.fn.tab.Constructor = Tab;

/* TAB NO CONFLICT
 * =============== */

$.fn.tab.noConflict = function () {
  $.fn.tab = old$7;
  return this;
};

/* TAB DATA-API
 * ============ */

$(document).on('click.tab.data-api', '[data-toggle="tab"], [data-toggle="pill"]', function (e) {
  e.preventDefault();
  $(this).tab('show');
});

return jQuery;

});
