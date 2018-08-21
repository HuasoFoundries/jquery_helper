"use strict";

// Run Node with provided parameters: the first one being the Grunt
// done function and latter ones being files to be tested.
// See the comment in ../node_smoke_tests.js for more information.
module.exports = function spawnTest(done, command, jquery_path) {
	var spawn = require("child_process").spawn;
	process.env.jquery_path = jquery_path;
	spawn(command, {
			stdio: "inherit",
			shell: true,
			env: process.env
		})
		.on("close", function (code) {
			done(code === 0);
		});
};