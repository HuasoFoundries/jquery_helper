"use strict";

var assert = require("assert");

require("jsdom").env("", function (errors, window) {
	assert.ifError(errors);

	// Pretend the window is a global.
	global.window = window;

	var ensureJQuery = require("./lib/ensure_jquery"),
		jQuery = require("../../dist/jquery_material.js");

	ensureJQuery(jQuery);


	assert(typeof jQuery.cookie === 'function', "jQuery.cookie is a function");
});
