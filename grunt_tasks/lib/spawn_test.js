"use strict";

// Run Node with provided parameters: the first one being the Grunt
// done function and latter ones being files to be tested.
// See the comment in ../node_smoke_tests.js for more information.
module.exports = function spawnTest(done) {
	var testPaths = [].slice.call(arguments, 1),
		spawn = require("cross-spawn"),
		jquery_path = testPaths.pop();


	spawn("node", testPaths, {
			stdio: "inherit",
			shell: true,
			env: {
				jquery_path: jquery_path
			}
		})
		.on("close", function (code) {
			done(code === 0);
		});
};