"use strict";

var assert = require("assert");

require("jsdom").env("", function (errors, window) {
	assert.ifError(errors);

	var ensureJQuery = require("./lib/ensure_jquery"),
		ensureGlobalNotCreated = require("./lib/ensure_global_not_created"),
		jQuery = require("../../dist/material_helper.js")(window);

	ensureJQuery(jQuery);
	ensureGlobalNotCreated(module.exports);
});
