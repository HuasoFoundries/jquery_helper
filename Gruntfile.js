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
	var fs = require("fs"),
		gzip = require("gzip-js");

	grunt.initConfig({
		pkg: grunt.file.readJSON("package.json"),
		babel: {
			options: {
				sourceMap: "inline",
				retainLines: true
			},
			nodeSmokeTests: {
				files: {
					"test/node_smoke_tests/lib/ensure_iterability.js": "test/node_smoke_tests/lib/ensure_iterability_es6.js"
				}
			}
		},
		compare_size: {
			files: ["dist/jquery.js", "dist/jquery.min.js"],
			options: {
				compress: {
					gz: function (contents) {
						return gzip.zip(contents, {}).length;
					}
				},
				cache: "src/.sizecache.json"
			}
		},

		build: {
			es6: {
				//globals: grunt.file.read("src/helpers/noglobal.js"),
				wrapper: grunt.file.read("src/helpers/wrapper_es6.js"),
				dest: "src/jquery_shim/jquery.es6.js",
				//srcFolder: __dirname + '/src/jquery_shim',
				srcFolder: __dirname + '/node_modules/jquery/src',
				indexFile: 'jquery',
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
				//globals: grunt.file.read("src/helpers/global.js"),
				wrapper: grunt.file.read("src/helpers/wrapper_umd.js"),
				dest: "dist/jquery.js",
				srcFolder: __dirname + '/src/jquery_shim',
				indexFile: 'jquery',
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
			material: {
				//globals: grunt.file.read("src/helpers/global.js"),
				wrapper: grunt.file.read("src/helpers/wrapper_umd.js"),
				dest: "dist/jquery_material.js",
				srcFolder: __dirname + '/src/jquery_shim',
				indexFile: 'jquery_material',
				minimum: [
					"core",
					"selector"
				],
				rjsconfig: {
					generateSourceMaps: true,
					preserveLicenseComments: false,
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

			bootstrap: {
				//globals: grunt.file.read("src/helpers/global.js"),
				wrapper: grunt.file.read("src/helpers/wrapper_umd.js"),
				dest: "dist/jquery_bootstrap.js",
				srcFolder: __dirname + '/src/jquery_shim',
				indexFile: 'jquery_bootstrap',
				minimum: [
					"core",
					"selector"
				],
				rjsconfig: {
					generateSourceMaps: true,
					preserveLicenseComments: false,
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
				//globals: grunt.file.read("src/helpers/global.js"),
				wrapper: grunt.file.read("src/helpers/wrapper_umd.js"),
				dest: "dist/jquery.min.js",
				srcFolder: __dirname + '/src/jquery_shim',
				indexFile: 'jquery',
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
		},
	});

	grunt.loadNpmTasks('grunt-babel');
	grunt.loadNpmTasks('grunt-compare-size');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	//grunt.loadNpmTasks('grunt-eslint');
	//grunt.loadNpmTasks('grunt-jsonlint');
	//grunt.loadNpmTasks('grunt-newer');
	//grunt.loadNpmTasks('grunt-npmcopy');

	grunt.loadTasks('grunt_tasks');


	grunt.registerTask("test:fast", "all_smoke_tests");





	grunt.registerTask("test:slow", "promises_aplus_tests");

	grunt.registerTask("test", [
		"test:fast",
		"test:slow"
	]);


	grunt.registerTask('concates6', ['concat:hammer', 'concat:material']);

	grunt.registerTask('publish', ['concates6', 'jspmbuild']);



};