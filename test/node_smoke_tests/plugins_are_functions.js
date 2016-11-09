"use strict";

var assert = require("assert");

require("jsdom").env("", function (errors, window) {
	assert.ifError(errors);

	// Pretend the window is a global.
	global.window = window;

	var ensureJQuery = require("./lib/ensure_jquery"),
		jQuery = require("../../dist/jquery.js");

	ensureJQuery(jQuery);

	assert(typeof jQuery === 'function', "jQuery is an object in CommonJS environment.");
	assert(typeof jQuery.fn.waitforChild === 'function', "jQuery.fn.waitforChild is a function");
	assert(typeof jQuery.cookie === 'function', "jQuery.cookie is a function");
	assert(typeof jQuery.fn.serializeJSON === 'function', "jQuery.fn.serializeJSON is an object in CommonJS environment.");
});
