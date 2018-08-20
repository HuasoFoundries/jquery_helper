"use strict";

var assert = require("assert");

require("jsdom").env("", function (errors, window) {
	assert.ifError(errors);

	// Pretend the window is a global.
	global.window = window;

	var ensureJQuery = require("./lib/ensure_jquery"),
		jQuery = require(process.env.jquery_path);

	ensureJQuery(jQuery);

	assert(typeof jQuery.fn.waitforChild === 'function', "jQuery.fn.waitforChild is a function");
});