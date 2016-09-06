module.exports = function (grunt) {

	function readOptionalJSON(filepath) {
		var stripJSONComments = require("strip-json-comments"),
			data = {};
		try {
			data = JSON.parse(stripJSONComments(
				fs.readFileSync(filepath, {
					encoding: "utf8"
				})
			));
		} catch (e) {}
		return data;
	}


	grunt.initConfig({
		build: {
			es6: {
				globals: grunt.file.read("src/helpers/noglobal.js"),
				wrapper: grunt.file.read("src/helpers/wrapper_es6.js"),
				dest: "src/jquery_shim/jquery.es6.js",
				//srcFolder: __dirname + '/src/jquery_shim',
				srcFolder: __dirname + '/node_modules/jquery/src',
				minimum: [
					"core",
					"selector"
				],
				rjsconfig: {
					generateSourceMaps: false,
					optimize: "none",
				},
				// Exclude specified modules if the module matching the key is removed
				removeWith: {
					ajax: ["manipulation/_evalUrl", "event/ajax"],
					callbacks: ["deferred"],
					css: ["effects", "dimensions", "offset"],
					"css/showHide": ["effects"],
					deferred: {
						remove: ["ajax", "effects", "queue", "core/ready"],
						include: ["core/ready-no-deferred"]
					},
					sizzle: ["css/hiddenVisibleSelectors", "effects/animatedSelector"]
				}
			},

			full: {
				globals: grunt.file.read("src/helpers/global.js"),
				wrapper: grunt.file.read("src/helpers/wrapper_amd.js"),
				dest: "dist/jquery.js",
				srcFolder: __dirname + '/src/jquery_shim',
				minimum: [
					"core",
					"selector"
				],
				rjsconfig: {
					generateSourceMaps: false,
					optimize: "uglify",
					uglify: {
						//Example of a specialized config. If you are fine
						//with the default options, no need to specify
						//any of these properties.
						output: {
							beautify: true
						},
						mangle: false,
						width: 300
					}

				},
				// Exclude specified modules if the module matching the key is removed
				removeWith: {
					ajax: ["manipulation/_evalUrl", "event/ajax"],
					callbacks: ["deferred"],
					css: ["effects", "dimensions", "offset"],
					"css/showHide": ["effects"],
					deferred: {
						remove: ["ajax", "effects", "queue", "core/ready"],
						include: ["core/ready-no-deferred"]
					},
					sizzle: ["css/hiddenVisibleSelectors", "effects/animatedSelector"]
				}
			},

			min: {
				globals: grunt.file.read("src/helpers/global.js"),
				wrapper: grunt.file.read("src/helpers/wrapper_amd.js"),
				dest: "dist/jquery.min.js",
				srcFolder: __dirname + '/src/jquery_shim',
				minimum: [
					"core",
					"selector"
				],
				rjsconfig: {
					generateSourceMaps: true,
					preserveLicenseComments: false,
					optimize: "uglify",
					uglify: {
						mangle: true,
						screw_ie8: true,
						stats: true,
						lint: true,
						verbose: true,
						compress: {
							dead_code: true,
							unused: true,
							join_vars: true

						},
						output: {
							beautify: false
						}
					}

				},
				// Exclude specified modules if the module matching the key is removed
				removeWith: {
					ajax: ["manipulation/_evalUrl", "event/ajax"],
					callbacks: ["deferred"],
					css: ["effects", "dimensions", "offset"],
					"css/showHide": ["effects"],
					deferred: {
						remove: ["ajax", "effects", "queue", "core/ready"],
						include: ["core/ready-no-deferred"]
					},
					sizzle: ["css/hiddenVisibleSelectors", "effects/animatedSelector"]
				}
			}
		}
	});

	grunt.loadTasks('grunt_tasks');





	grunt.registerTask('concates6', ['concat:hammer', 'concat:material']);

	grunt.registerTask('publish', ['concates6', 'jspmbuild']);



};
