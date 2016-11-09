define([

	"../../node_modules/jquery/src/core",
	"../../node_modules/jquery/src/selector",
	"../../node_modules/jquery/src/traversing",
	"../../node_modules/jquery/src/callbacks",
	"../../node_modules/jquery/src/deferred",
	"../../node_modules/jquery/src/deferred/exceptionHook",
	"../../node_modules/jquery/src/core/ready",
	"../../node_modules/jquery/src/data",
	"../../node_modules/jquery/src/queue",
	"../../node_modules/jquery/src/queue/delay",
	"../../node_modules/jquery/src/attributes",
	"../../node_modules/jquery/src/event",
	"../../node_modules/jquery/src/event/alias",
	"../../node_modules/jquery/src/event/focusin",
	"../../node_modules/jquery/src/manipulation",
	"../../node_modules/jquery/src/manipulation/_evalUrl",
	"../../node_modules/jquery/src/wrap",
	"../../node_modules/jquery/src/css",
	"../../node_modules/jquery/src/css/hiddenVisibleSelectors",
	"../../node_modules/jquery/src/serialize",
	"../../node_modules/jquery/src/ajax",
	"../../node_modules/jquery/src/ajax/xhr",
	"../../node_modules/jquery/src/ajax/script",
	"../../node_modules/jquery/src/ajax/jsonp",
	"../../node_modules/jquery/src/ajax/load",
	"../../node_modules/jquery/src/event/ajax",
	"../../node_modules/jquery/src/effects",
	"../../node_modules/jquery/src/effects/animatedSelector",
	"../../node_modules/jquery/src/offset",
	"../../node_modules/jquery/src/dimensions",
	"../../node_modules/jquery/src/deprecated",
	"../../node_modules/jquery/src/exports/amd",
	"../../node_modules/jquery/src/exports/global",

], function (jQuery) {

	"use strict";

	jQuery.fn.waitforChild = function (onFound, querySelector, once) {
		// allows for an object single parameter
		if (typeof arguments[0] === 'object') {
			once = arguments[0].once || false;
			querySelector = arguments[0].querySelector || null;
			onFound = arguments[0].onFound;
		}

		if (!onFound) {
			onFound = function () {};
		}

		var jQuerythis = this;

		// If no querySelector was asked, and the element has children, apply the onFound function either to the first or to all of them
		if (!querySelector && jQuerythis.children().length) {

			if (once) {
				onFound(jQuerythis.children().first());

			} else {
				jQuerythis.children().each(function (key, element) {
					onFound(jQuery(element));
				});
			}

			// If the element already has matching children, apply the onFound function either to the first or to all of them
		} else if (jQuerythis.find(querySelector).length !== 0) {
			if (once) {
				onFound(jQuerythis.find(querySelector).first());

			} else {
				jQuerythis.find(querySelector).each(function (key, element) {
					onFound(jQuery(element));
				});
			}
		} else {
			if (jQuerythis.length === 0) {
				console.warn("Can't attach an observer to a null node", jQuerythis);
			} else {
				// Otherwise, set a new MutationObserver and inspect each new inserted child from now on.
				var observer = new MutationObserver(function (mutations) {
					var _this = this;
					mutations.forEach(function (mutation) {
						if (mutation.addedNodes) {
							if (!querySelector) {
								onFound(jQuery(mutation.addedNodes[0]));
								if (once) {
									_this.disconnect();
								}
							} else {
								for (var i = 0; i < mutation.addedNodes.length; ++i) {
									var addedNode = mutation.addedNodes[i];
									if (jQuery(addedNode).is(querySelector)) {
										onFound(jQuery(addedNode));
										if (once) {
											_this.disconnect();
											break;
										}
									}
								}
							}
						}
					});
				});

				observer.observe(jQuerythis[0], {
					childList: true,
					subtree: true,
					attributes: false,
					characterData: false
				});
			}

		}



		return jQuerythis;
	};

	var pluses = /\+/g;

	function encode(s) {
		return config.raw ? s : encodeURIComponent(s);
	}

	function decode(s) {
		return config.raw ? s : decodeURIComponent(s);
	}

	function stringifyCookieValue(value) {
		return encode(config.json ? JSON.stringify(value) : String(value));
	}

	function parseCookieValue(s) {
		if (s.indexOf('"') === 0) {
			// This is a quoted cookie as according to RFC2068, unescape...
			s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
		}

		try {
			// Replace server-side written pluses with spaces.
			// If we can't decode the cookie, ignore it, it's unusable.
			// If we can't parse the cookie, ignore it, it's unusable.
			s = decodeURIComponent(s.replace(pluses, ' '));
			return config.json ? JSON.parse(s) : s;
		} catch (e) {}
	}

	function read(s, converter) {
		var value = config.raw ? s : parseCookieValue(s);
		return jQuery.isFunction(converter) ? converter(value) : value;
	}

	var config = jQuery.cookie = function (key, value, options) {

		// Write

		if (value !== undefined && !jQuery.isFunction(value)) {
			options = jQuery.extend({}, config.defaults, options);

			if (typeof options.expires === 'number') {
				var days = options.expires,
					t = options.expires = new Date();
				t.setTime(+t + days * 864e+5);
			}

			return (document.cookie = [
				encode(key), '=', stringifyCookieValue(value),
				options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
				options.path ? '; path=' + options.path : '',
				options.domain ? '; domain=' + options.domain : '',
				options.secure ? '; secure' : ''
			].join(''));
		}

		// Read

		var result = key ? undefined : {};

		// To prevent the for loop in the first place assign an empty array
		// in case there are no cookies at all. Also prevents odd result when
		// calling jQuery.cookie().
		var cookies = document.cookie ? document.cookie.split('; ') : [];

		for (var i = 0, l = cookies.length; i < l; i++) {
			var parts = cookies[i].split('=');
			var name = decode(parts.shift());
			var cookie = parts.join('=');

			if (key && key === name) {
				// If second argument (value) is a function it's a converter...
				result = read(cookie, value);
				break;
			}

			// Prevent storing a cookie that we couldn't decode.
			if (!key && (cookie = read(cookie)) !== undefined) {
				result[name] = cookie;
			}
		}

		return result;
	};

	config.defaults = {};

	jQuery.removeCookie = function (key, options) {
		if (jQuery.cookie(key) === undefined) {
			return false;
		}

		// Must not alter options, thus extending a fresh object...
		jQuery.cookie(key, '', jQuery.extend({}, options, {
			expires: -1
		}));
		return !jQuery.cookie(key);
	};


	// jQuery('form').serializeJSON()
	jQuery.fn.serializeJSON = function (options) {
		var f, jQueryform, opts, formAsArray, serializedObject, name, value, _obj, nameWithNoType, type, keys;
		f = jQuery.serializeJSON;
		jQueryform = this; // NOTE: the set of matched elements is most likely a form, but it could also be a group of inputs
		opts = f.setupOpts(options); // calculate values for options {parseNumbers, parseBoolens, parseNulls, ...} with defaults

		// Use native `serializeArray` function to get an array of {name, value} objects.
		formAsArray = jQueryform.serializeArray();
		f.readCheckboxUncheckedValues(formAsArray, opts, jQueryform); // add objects to the array from unchecked checkboxes if needed

		// Convert the formAsArray into a serializedObject with nested keys
		serializedObject = {};
		jQuery.each(formAsArray, function (i, obj) {
			name = obj.name; // original input name
			value = obj.value; // input value
			_obj = f.extractTypeAndNameWithNoType(name);
			nameWithNoType = _obj.nameWithNoType; // input name with no type (i.e. "foo:string" => "foo")
			type = _obj.type; // type defined from the input name in :type colon notation
			if (!type) type = f.tryToFindTypeFromDataAttr(name, jQueryform); // type defined in the data-value-type attr
			f.validateType(name, type, opts); // make sure that the type is one of the valid types if defined

			if (type !== 'skip') { // ignore elements with type 'skip'
				keys = f.splitInputNameIntoKeysArray(nameWithNoType);
				value = f.parseValue(value, name, type, opts); // convert to string, number, boolean, null or customType
				f.deepSet(serializedObject, keys, value, opts);
			}
		});
		return serializedObject;
	};

	// Use jQuery.serializeJSON as namespace for the auxiliar functions
	// and to define defaults
	jQuery.serializeJSON = {

		defaultOptions: {
			checkboxUncheckedValue: undefined, // to include that value for unchecked checkboxes (instead of ignoring them)

			parseNumbers: false, // convert values like "1", "-2.33" to 1, -2.33
			parseBooleans: false, // convert "true", "false" to true, false
			parseNulls: false, // convert "null" to null
			parseAll: false, // all of the above
			parseWithFunction: null, // to use custom parser, a function like: function(val){ return parsed_val; }

			customTypes: {}, // override defaultTypes
			defaultTypes: {
				"string": function (str) {
					return String(str);
				},
				"number": function (str) {
					return Number(str);
				},
				"boolean": function (str) {
					var falses = ["false", "null", "undefined", "", "0"];
					return falses.indexOf(str) === -1;
				},
				"null": function (str) {
					var falses = ["false", "null", "undefined", "", "0"];
					return falses.indexOf(str) === -1 ? str : null;
				},
				"array": function (str) {
					return JSON.parse(str);
				},
				"object": function (str) {
					return JSON.parse(str);
				},
				"auto": function (str) {
					return jQuery.serializeJSON.parseValue(str, null, null, {
						parseNumbers: true,
						parseBooleans: true,
						parseNulls: true
					});
				}, // try again with something like "parseAll"
				"skip": null // skip is a special type that makes it easy to ignore elements
			},

			useIntKeysAsArrayIndex: false // name="foo[2]" value="v" => {foo: [null, null, "v"]}, instead of {foo: ["2": "v"]}
		},

		// Merge option defaults into the options
		setupOpts: function (options) {
			var opt, validOpts, defaultOptions, optWithDefault, parseAll, f;
			f = jQuery.serializeJSON;

			if (options == null) {
				options = {};
			} // options ||= {}
			defaultOptions = f.defaultOptions || {}; // defaultOptions

			// Make sure that the user didn't misspell an option
			validOpts = ['checkboxUncheckedValue', 'parseNumbers', 'parseBooleans', 'parseNulls', 'parseAll', 'parseWithFunction', 'customTypes', 'defaultTypes',
				'useIntKeysAsArrayIndex'
			]; // re-define because the user may override the defaultOptions
			for (opt in options) {
				if (validOpts.indexOf(opt) === -1) {
					throw new Error("serializeJSON ERROR: invalid option '" + opt + "'. Please use one of " + validOpts.join(', '));
				}
			}

			// Helper to get the default value for this option if none is specified by the user
			optWithDefault = function (key) {
				return (options[key] !== false) && (options[key] !== '') && (options[key] || defaultOptions[key]);
			};

			// Return computed options (opts to be used in the rest of the script)
			parseAll = optWithDefault('parseAll');
			return {
				checkboxUncheckedValue: optWithDefault('checkboxUncheckedValue'),

				parseNumbers: parseAll || optWithDefault('parseNumbers'),
				parseBooleans: parseAll || optWithDefault('parseBooleans'),
				parseNulls: parseAll || optWithDefault('parseNulls'),
				parseWithFunction: optWithDefault('parseWithFunction'),

				typeFunctions: jQuery.extend({}, optWithDefault('defaultTypes'), optWithDefault('customTypes')),

				useIntKeysAsArrayIndex: optWithDefault('useIntKeysAsArrayIndex')
			};
		},

		// Given a string, apply the type or the relevant "parse" options, to return the parsed value
		parseValue: function (valStr, inputName, type, opts) {
			var f, parsedVal;
			f = jQuery.serializeJSON;
			parsedVal = valStr; // if no parsing is needed, the returned value will be the same

			if (opts.typeFunctions && type && opts.typeFunctions[type]) { // use a type if available
				parsedVal = opts.typeFunctions[type](valStr);
			} else if (opts.parseNumbers && f.isNumeric(valStr)) { // auto: number
				parsedVal = Number(valStr);
			} else if (opts.parseBooleans && (valStr === "true" || valStr === "false")) { // auto: boolean
				parsedVal = (valStr === "true");
			} else if (opts.parseNulls && valStr == "null") { // auto: null
				parsedVal = null;
			}
			if (opts.parseWithFunction && !type) { // custom parse function (apply after previous parsing options, but not if there's a specific type)
				parsedVal = opts.parseWithFunction(parsedVal, inputName);
			}

			return parsedVal;
		},

		isObject: function (obj) {
			return obj === Object(obj);
		}, // is it an Object?
		isUndefined: function (obj) {
			return obj === void 0;
		}, // safe check for undefined values
		isValidArrayIndex: function (val) {
			return /^[0-9]+jQuery/.test(String(val));
		}, // 1,2,3,4 ... are valid array indexes
		isNumeric: function (obj) {
			return obj - parseFloat(obj) >= 0;
		}, // taken from jQuery.isNumeric implementation. Not using jQuery.isNumeric to support old jQuery and Zepto versions

		optionKeys: function (obj) {
			if (Object.keys) {
				return Object.keys(obj);
			} else {
				var key, keys = [];
				for (key in obj) {
					keys.push(key);
				}
				return keys;
			}
		}, // polyfill Object.keys to get option keys in IE<9


		// Fill the formAsArray object with values for the unchecked checkbox inputs,
		// using the same format as the jquery.serializeArray function.
		// The value of the unchecked values is determined from the opts.checkboxUncheckedValue
		// and/or the data-unchecked-value attribute of the inputs.
		readCheckboxUncheckedValues: function (formAsArray, opts, jQueryform) {
			var selector, jQueryuncheckedCheckboxes, jQueryel, dataUncheckedValue, f;
			if (opts == null) {
				opts = {};
			}
			f = jQuery.serializeJSON;

			selector = 'input[type=checkbox][name]:not(:checked):not([disabled])';
			jQueryuncheckedCheckboxes = jQueryform.find(selector).add(jQueryform.filter(selector));
			jQueryuncheckedCheckboxes.each(function (i, el) {
				jQueryel = jQuery(el);
				dataUncheckedValue = jQueryel.attr('data-unchecked-value');
				if (dataUncheckedValue) { // data-unchecked-value has precedence over option opts.checkboxUncheckedValue
					formAsArray.push({
						name: el.name,
						value: dataUncheckedValue
					});
				} else {
					if (!f.isUndefined(opts.checkboxUncheckedValue)) {
						formAsArray.push({
							name: el.name,
							value: opts.checkboxUncheckedValue
						});
					}
				}
			});
		},

		// Returns and object with properties {name_without_type, type} from a given name.
		// The type is null if none specified. Example:
		//   "foo"           =>  {nameWithNoType: "foo",      type:  null}
		//   "foo:boolean"   =>  {nameWithNoType: "foo",      type: "boolean"}
		//   "foo[bar]:null" =>  {nameWithNoType: "foo[bar]", type: "null"}
		extractTypeAndNameWithNoType: function (name) {
			var match;
			if (match = name.match(/(.*):([^:]+)jQuery/)) {
				return {
					nameWithNoType: match[1],
					type: match[2]
				};
			} else {
				return {
					nameWithNoType: name,
					type: null
				};
			}
		},

		// Find an input in the jQueryform with the same name,
		// and get the data-value-type attribute.
		// Returns nil if none found. Returns the first data-value-type found if many inputs have the same name.
		tryToFindTypeFromDataAttr: function (name, jQueryform) {
			var escapedName, selector, jQueryinput, typeFromDataAttr;
			escapedName = name.replace(/(:|\.|\[|\]|\s)/g, '\\jQuery1'); // every non-standard character need to be escaped by \\
			selector = '[name="' + escapedName + '"]';
			jQueryinput = jQueryform.find(selector).add(jQueryform.filter(selector));
			typeFromDataAttr = jQueryinput.attr('data-value-type'); // NOTE: this returns only the first jQueryinput element if multiple are matched with the same name (i.e. an "array[]"). So, arrays with different element types specified through the data-value-type attr is not supported.
			return typeFromDataAttr || null;
		},

		// Raise an error if the type is not recognized.
		validateType: function (name, type, opts) {
			var validTypes, f;
			f = jQuery.serializeJSON;
			validTypes = f.optionKeys(opts ? opts.typeFunctions : f.defaultOptions.defaultTypes);
			if (!type || validTypes.indexOf(type) !== -1) {
				return true;
			} else {
				throw new Error("serializeJSON ERROR: Invalid type " + type + " found in input name '" + name + "', please use one of " + validTypes.join(', '));
			}
		},


		// Split the input name in programatically readable keys.
		// Examples:
		// "foo"              => ['foo']
		// "[foo]"            => ['foo']
		// "foo[inn][bar]"    => ['foo', 'inn', 'bar']
		// "foo[inn[bar]]"    => ['foo', 'inn', 'bar']
		// "foo[inn][arr][0]" => ['foo', 'inn', 'arr', '0']
		// "arr[][val]"       => ['arr', '', 'val']
		splitInputNameIntoKeysArray: function (nameWithNoType) {
			var keys, f;
			f = jQuery.serializeJSON;
			keys = nameWithNoType.split('['); // split string into array
			keys = jQuery.map(keys, function (key) {
				return key.replace(/\]/g, '');
			}); // remove closing brackets
			if (keys[0] === '') {
				keys.shift();
			} // ensure no opening bracket ("[foo][inn]" should be same as "foo[inn]")
			return keys;
		},

		// Set a value in an object or array, using multiple keys to set in a nested object or array:
		//
		// deepSet(obj, ['foo'], v)               // obj['foo'] = v
		// deepSet(obj, ['foo', 'inn'], v)        // obj['foo']['inn'] = v // Create the inner obj['foo'] object, if needed
		// deepSet(obj, ['foo', 'inn', '123'], v) // obj['foo']['arr']['123'] = v //
		//
		// deepSet(obj, ['0'], v)                                   // obj['0'] = v
		// deepSet(arr, ['0'], v, {useIntKeysAsArrayIndex: true})   // arr[0] = v
		// deepSet(arr, [''], v)                                    // arr.push(v)
		// deepSet(obj, ['arr', ''], v)                             // obj['arr'].push(v)
		//
		// arr = [];
		// deepSet(arr, ['', v]          // arr => [v]
		// deepSet(arr, ['', 'foo'], v)  // arr => [v, {foo: v}]
		// deepSet(arr, ['', 'bar'], v)  // arr => [v, {foo: v, bar: v}]
		// deepSet(arr, ['', 'bar'], v)  // arr => [v, {foo: v, bar: v}, {bar: v}]
		//
		deepSet: function (o, keys, value, opts) {
			var key, nextKey, tail, lastIdx, lastVal, f;
			if (opts == null) {
				opts = {};
			}
			f = jQuery.serializeJSON;
			if (f.isUndefined(o)) {
				throw new Error("ArgumentError: param 'o' expected to be an object or array, found undefined");
			}
			if (!keys || keys.length === 0) {
				throw new Error("ArgumentError: param 'keys' expected to be an array with least one element");
			}

			key = keys[0];

			// Only one key, then it's not a deepSet, just assign the value.
			if (keys.length === 1) {
				if (key === '') {
					o.push(value); // '' is used to push values into the array (assume o is an array)
				} else {
					o[key] = value; // other keys can be used as object keys or array indexes
				}

				// With more keys is a deepSet. Apply recursively.
			} else {
				nextKey = keys[1];

				// '' is used to push values into the array,
				// with nextKey, set the value into the same object, in object[nextKey].
				// Covers the case of ['', 'foo'] and ['', 'var'] to push the object {foo, var}, and the case of nested arrays.
				if (key === '') {
					lastIdx = o.length - 1; // asume o is array
					lastVal = o[lastIdx];
					if (f.isObject(lastVal) && (f.isUndefined(lastVal[nextKey]) || keys.length > 2)) { // if nextKey is not present in the last object element, or there are more keys to deep set
						key = lastIdx; // then set the new value in the same object element
					} else {
						key = lastIdx + 1; // otherwise, point to set the next index in the array
					}
				}

				// '' is used to push values into the array "array[]"
				if (nextKey === '') {
					if (f.isUndefined(o[key]) || !jQuery.isArray(o[key])) {
						o[key] = []; // define (or override) as array to push values
					}
				} else {
					if (opts.useIntKeysAsArrayIndex && f.isValidArrayIndex(nextKey)) { // if 1, 2, 3 ... then use an array, where nextKey is the index
						if (f.isUndefined(o[key]) || !jQuery.isArray(o[key])) {
							o[key] = []; // define (or override) as array, to insert values using int keys as array indexes
						}
					} else { // for anything else, use an object, where nextKey is going to be the attribute name
						if (f.isUndefined(o[key]) || !f.isObject(o[key])) {
							o[key] = {}; // define (or override) as object, to set nested properties
						}
					}
				}

				// Recursively set the inner object
				tail = keys.slice(1);
				f.deepSet(o[key], tail, value, opts);
			}
		}

	};
	return jQuery;

});
