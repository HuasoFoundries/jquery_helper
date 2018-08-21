module.exports = function (grunt) {

	"use strict";

	var fs = require("fs"),
		spawnTest = require("./lib/spawn_test.js"),
		testsDir = "./test/node_smoke_tests/",
		nodeSmokeTests = ["babel:nodeSmokeTests"],
		testObj = {
			material_: "../../dist/jquery_material.js",
			bootstrap_: "../../dist/jquery_bootstrap.js",
			jquery_: "../../dist/jquery.js",
			jquery_min_: "../../dist/jquery.min.js"
		};

	// Fire up all tests defined in test/node_smoke_tests/*.js in spawned sub-processes.
	// All the files under test/node_smoke_tests/*.js are supposed to exit with 0 code
	// on success or another one on failure. Spawning in sub-processes is
	// important so that the tests & the main process don't interfere with
	// each other, e.g. so that they don't share the require cache.

	for (var prefix in testObj) {

		fs.readdirSync(testsDir)
			.filter(function (testFilePath) {
				return fs.statSync(testsDir + testFilePath).isFile() &&
					/\.test\.js$/.test(testFilePath);
			})
			.forEach(function (testFilePath) {
				var taskName = prefix + testFilePath.replace(/\.js$/, "");

				grunt.registerTask(taskName, function () {
					//let testFile = `${testsDir}/${testFilePath}`;

					spawnTest(this.async(), "node \"test/node_smoke_tests/" + testFilePath + "\"", testObj[prefix]);
				});

				nodeSmokeTests.push(taskName);
			});
	}
	grunt.registerTask("all_smoke_tests", nodeSmokeTests);
};