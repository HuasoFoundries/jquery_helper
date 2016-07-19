import {
	$
} from './position.js';
import {
	Widget,
	widgetUuid,
	widgetSlice
} from './Widget.js';

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
		proxiedPrototype[prop] = (function () {
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
		})();
	});
	constructor.prototype = $.widget.extend(basePrototype, {

		// TODO: remove support for widgetEventPrefix
		// always use the name + a colon as the prefix, e.g., draggable:start
		// don't prefix for widgets that aren't DOM-based
		widgetEventPrefix: existingConstructor ? (basePrototype.widgetEventPrefix || name) : name
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
			$.widget(childPrototype.namespace + "." + childPrototype.widgetName, constructor,
				child._proto);
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
					target[key] = $.isPlainObject(target[key]) ?
						$.widget.extend({}, target[key], value) :

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
					return $.error("cannot call methods on " + name +
						" prior to initialization; " +
						"attempted to call method '" + options + "'");
				}

				if (!$.isFunction(instance[options]) || options.charAt(0) === "_") {
					return $.error("no such method '" + options + "' for " + name +
						" widget instance");
				}

				methodValue = instance[options].apply(instance, args);

				if (methodValue !== instance && methodValue !== undefined) {
					returnValue = methodValue && methodValue.jquery ?
						returnValue.pushStack(methodValue.get()) :
						methodValue;
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

var widget = $.widget;
export {
	widget
};
