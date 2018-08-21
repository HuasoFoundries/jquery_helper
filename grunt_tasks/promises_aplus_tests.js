module.exports = function (grunt) {

	"use strict";

	var timeout = 2000,
		spawnTest = require("./lib/spawn_test.js"),
		testObj = {
			material_: "../../dist/jquery_material.js",
			bootstrap_: "../../dist/jquery_bootstrap.js",
			jquery: "../../dist/jquery.js"
		};

	grunt.registerTask("promises_aplus_tests", ["promises_aplus_tests:deferred", "promises_aplus_tests:when"]);

	grunt.registerTask("promises_aplus_tests:deferred", function () {
		spawnTest(this.async(),
			"\"" + __dirname + "/../node_modules/.bin/promises-aplus-tests\"" +
			" test/promises_aplus_adapters/deferred.js" +
			" --timeout " + timeout,
			testObj.jquery
		);
	});

	grunt.registerTask("promises_aplus_tests:when", function () {
		spawnTest(this.async(),
			"\"" + __dirname + "/../node_modules/.bin/promises-aplus-tests\"" +
			" test/promises_aplus_adapters/when.js" +
			" --timeout " + timeout,
			testObj.jquery
		);
	});
};