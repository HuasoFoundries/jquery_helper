"use strict";

var assert = require("assert"),
	ensureGlobalNotCreated = require("./lib/ensure_global_not_created"),
	jQueryFactory = require(process.env.jquery_path);

assert.throws(function () {
	jQueryFactory({});
}, /jQuery requires a window with a document/);

ensureGlobalNotCreated(module.exports);