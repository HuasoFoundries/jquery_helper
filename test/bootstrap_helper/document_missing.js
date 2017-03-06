"use strict";

var assert = require("assert"),
	ensureGlobalNotCreated = require("./lib/ensure_global_not_created"),
	jQueryFactory = require("../../dist/jquery_bootstrap.js");

assert.throws(function () {
	jQueryFactory({});
}, /jQuery requires a window with a document/);

ensureGlobalNotCreated(module.exports);
