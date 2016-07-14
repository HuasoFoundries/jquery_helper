module.exports = function (grunt) {

	var fs = require("fs"),
		// Skip jsdom-related tests in Node.js 0.10 & 0.12
		runJsdomTests = !/^v0/.test(process.version),
		requirejs = require("requirejs"),
		jqFolder = __dirname + "/node_modules/jquery/",
		pkg = require(jqFolder + "package.json"),
		srcFolder = jqFolder + "src/",
		rdefineEnd = /\}\s*?\);[^}\w]*$/,
		read = function (fileName) {
			return grunt.file.read(srcFolder + fileName);
		},
		globals = grunt.file.read("libs/global.js"),
		wrapper = grunt.file.read("libs/wrapper_2.js").split('@CODE');
	/**
	 * Strip all definitions generated by requirejs
	 * Convert "var" modules to var declarations
	 * "var module" means the module only contains a return
	 * statement that should be converted to a var declaration
	 * This is indicated by including the file in any "var" folder
	 * @param {String} name
	 * @param {String} path
	 * @param {String} contents The contents to be written (including their AMD wrappers)
	 */
	function convert(name, path, contents) {
		var amdName;

		// Convert var modules
		if (/.\/var\//.test(path.replace(process.cwd(), ""))) {
			contents = contents
				.replace(
					/define\([\w\W]*?return/,
					"var " +
					(/var\/([\w-]+)/.exec(name)[1]) +
					" ="
				)
				.replace(rdefineEnd, "");

			// Sizzle treatment
		} else if (/\/sizzle$/.test(name)) {
			contents = "var Sizzle =\n" + contents

			// Remove EXPOSE lines from Sizzle
				.replace(/\/\/\s*EXPOSE[\w\W]*\/\/\s*EXPOSE/, "return Sizzle;");

		} else {

			contents = contents
				.replace(/\s*return\s+[^\}]+(\}\s*?\);[^\w\}]*)$/, "$1")

			// Multiple exports
			.replace(/\s*exports\.\w+\s*=\s*\w+;/g, "");

			// Remove define wrappers, closure ends, and empty declarations
			contents = contents
				.replace(/define\([^{]*?{\s*(?:("|')use strict\1(?:;|))?/, "")
				.replace(rdefineEnd, "");

			// Remove anything wrapped with
			// /* ExcludeStart */ /* ExcludeEnd */
			// or a single line directly after a // BuildExclude comment
			contents = contents
				.replace(/\/\*\s*ExcludeStart\s*\*\/[\w\W]*?\/\*\s*ExcludeEnd\s*\*\//ig, "")
				.replace(/\/\/\s*BuildExclude\n\r?[\w\W]*?\n\r?/ig, "");

			// Remove empty definitions
			contents = contents
				.replace(/define\(\[[^\]]*\]\)[\W\n]+$/, "");
		}

		// AMD Name
		if ((amdName = grunt.option("amd")) !== null && /^exports\/amd$/.test(name)) {
			if (amdName) {
				grunt.log.writeln("Naming jQuery with AMD name: " + amdName);
			} else {
				grunt.log.writeln("AMD name now anonymous");
			}

			// Remove the comma for anonymous defines
			contents = contents
				.replace(/(\s*)"jquery"(\,\s*)/, amdName ? "$1\"" + amdName + "\"$2" : "");

		}
		return contents;
	}

	var config = {
		baseUrl: srcFolder,
		name: "jquery",

		// Allow strict mode
		useStrict: true,

		// We have multiple minify steps
		optimize: "none",

		// Include dependencies loaded with require
		findNestedDependencies: true,

		// Avoid inserting define() placeholder
		skipModuleInsertion: true,

		// Avoid breaking semicolons inserted by r.js
		skipSemiColonInsertion: true,
		wrap: {
			start: wrapper[0].replace(/\/\*eslint .* \*\/\n/, ""),
			end: globals.replace(
				/\/\*\s*ExcludeStart\s*\*\/[\w\W]*?\/\*\s*ExcludeEnd\s*\*\//ig,
				""
			) + wrapper[1]
		},
		rawText: {},
		onBuildWrite: convert
	};


	grunt.registerMultiTask(
		"build",
		"Concatenate source, remove sub AMD definitions, " +
		"(include/exclude modules with +/- flags), embed date/version",
		function () {
			var index,
				done = this.async(),
				flags = this.flags,
				optIn = flags["*"],
				name = grunt.option("filename"),
				minimum = this.data.minimum,
				removeWith = this.data.removeWith,
				excluded = [],
				included = [],
				version = grunt.config("pkg.version"),
				excludeList = function () {},

				/**
				 * Adds the specified module to the excluded or included list, depending on the flag
				 * @param {String} flag A module path relative to
				 *  the src directory starting with + or - to indicate
				 *  whether it should included or excluded
				 */
				excluder = function (flag) {
					var additional,
						m = /^(\+|\-|)([\w\/-]+)$/.exec(flag),
						exclude = m[1] === "-",
						module = m[2];

					if (!exclude) {
						grunt.log.writeln(flag);
						included.push(module);
					} else if (minimum.indexOf(module) === -1) {
						// Can't exclude certain modules

						// Add to excluded
						if (excluded.indexOf(module) === -1) {
							grunt.log.writeln(flag);
							excluded.push(module);

							// Exclude all files in the folder of the same name
							// These are the removable dependencies
							// It's fine if the directory is not there
							try {
								excludeList(fs.readdirSync(srcFolder + module), module);
							} catch (e) {
								grunt.verbose.writeln(e);
							}
						}

						additional = removeWith[module];

						// Check removeWith list
						if (additional) {
							excludeList(additional.remove || additional);
							if (additional.include) {
								included = included.concat(additional.include);
								grunt.log.writeln("+" + additional.include);
							}
						}
					} else {
						grunt.log.error("Module \"" + module + "\" is a minimum requirement.");
						if (module === "selector") {
							grunt.log.error(
								"If you meant to replace Sizzle, use -sizzle instead."
							);
						}
					}

				};

			/**
			 * Recursively calls the excluder to remove on all modules in the list
			 * @param {Array} list
			 * @param {String} [prepend] Prepend this to the module name.
			 *  Indicates we're walking a directory
			 */
			excludeList = function (list, prepend) {
				if (list) {
					prepend = prepend ? prepend + "/" : "";
					list.forEach(function (module) {

						// Exclude var modules as well
						if (module === "var") {
							excludeList(
								fs.readdirSync(srcFolder + prepend + module), prepend + module
							);
							return;
						}
						if (prepend) {

							// Skip if this is not a js file and we're walking files in a dir
							if (!(module = /([\w-\/]+)\.js$/.exec(module))) {
								return;
							}

							// Prepend folder name if passed
							// Remove .js extension
							module = prepend + module[1];
						}

						// Avoid infinite recursion
						if (excluded.indexOf(module) === -1) {
							excluder("-" + module);
						}
					});
				}
			};


			// Filename can be passed to the command line using
			// command line options
			// e.g. grunt build --filename=jquery-custom.js
			name = name ? ("dist/" + name) : this.data.dest;

			// append commit id to version
			if (process.env.COMMIT) {
				version += " " + process.env.COMMIT;
			}

			// figure out which files to exclude based on these rules in this order:
			//  dependency explicit exclude
			//  > explicit exclude
			//  > explicit include
			//  > dependency implicit exclude
			//  > implicit exclude
			// examples:
			//  *                  none (implicit exclude)
			//  *:*                all (implicit include)
			//  *:*:-css           all except css and dependents (explicit > implicit)
			//  *:*:-css:+effects  same (excludes effects because explicit include is
			//                     trumped by explicit exclude of dependency)
			//  *:+effects         none except effects and its dependencies
			//                     (explicit include trumps implicit exclude of dependency)

			Object.keys(flags).forEach(function (flag) {
				if (flag !== '*') {
					excluder(flag);
				}
			});

			// Handle Sizzle exclusion
			// Replace with selector-native
			if ((index = excluded.indexOf("sizzle")) > -1) {
				config.rawText.selector = "define(['./selector-native']);";
				excluded.splice(index, 1);
			}

			// Replace exports/global with a noop noConflict
			if ((index = excluded.indexOf("exports/global")) > -1) {
				config.rawText["exports/global"] = "define(['../core']," +
					"function( jQuery ) {\njQuery.noConflict = function() {};\n});";
				excluded.splice(index, 1);
			}

			grunt.verbose.writeflags(excluded, "Excluded");
			grunt.verbose.writeflags(included, "Included");

			// append excluded modules to version
			if (excluded.length) {
				version += " -" + excluded.join(",-");

				// set pkg.version to version with excludes, so minified file picks it up
				grunt.config.set("pkg.version", version);
				grunt.verbose.writeln("Version changed to " + version);

				// Have to use shallow or core will get excluded since it is a dependency
				config.excludeShallow = excluded;
			}
			config.include = included;

			/**
			 * Handle Final output from the optimizer
			 * @param {String} compiled
			 */
			config.out = function (compiled) {
				compiled = compiled

				// Embed Version
					.replace(/@VERSION/g, version)
					.replace(/window/g, '$_GLOBAL')

				// Embed Date
				// yyyy-mm-ddThh:mmZ
				.replace(/@DATE/g, (new Date()).toISOString().replace(/:\d+\.\d+Z$/, "Z"));

				// Write concatenated source to file
				grunt.file.write(name, compiled);
			};

			// Turn off opt-in if necessary
			/*if (!optIn) {

				// Overwrite the default inclusions with the explicit ones provided
				config.rawText.jquery = "define([" +
					(included.length ? included.join(",") : "") +
					"]);";
			}*/
			console.dir(config);

			// Trace dependencies and concatenate files
			requirejs.optimize(config, function (response) {
				grunt.verbose.writeln(response);
				grunt.log.ok("File '" + name + "' created.");
				done();
			}, function (err) {
				done(err);
			});
		});

	// Special "alias" task to make custom build creation less grawlix-y
	// Translation example
	//
	//   grunt custom:+ajax,-dimensions,-effects,-offset
	//
	// Becomes:
	//
	//   grunt build:*:*:+ajax:-dimensions:-effects:-offset
	grunt.registerTask("custom", function () {
		var args = this.args,
			modules = args.length ? args[0].replace(/,/g, ":") : "",
			done = this.async();

			grunt.log.writeln("Modules are",JSON.stringify(modules));

		function exec() {
			var defaultPath = ["build", "custom"];
			grunt.task.run(["build:*:*" + (modules ? ":" + modules : "")]);
			done();
		}

		grunt.log.writeln("Creating custom build...\n");

		exec();

	});


	grunt.initConfig({
		build: {
			all: {
				dest: "libs/jquery.slim.js",
				minimum: [
					"core",
					"selector"
				],

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


	grunt.config('connect', {

		temporary: {
			options: {
				middleware: function (connect, options, middlewares) {

					middlewares.unshift(function (req, res, next) {
						var url = req.url;

						if (url.indexOf('.') === -1) {
							req.url = '/example/index.html';
						}
						return next();
					});
					return middlewares;

				},
				port: 8088,
				base: './'
			}
		},
		local: {
			options: {
				middleware: function (connect, options, middlewares) {

					middlewares.unshift(function (req, res, next) {
						var url = req.url;

						if (url.indexOf('.') === -1) {
							req.url = '/example/index.html';
						}
						return next();
					});
					return middlewares;

				},
				keepalive: true,
				port: 8086,
				base: './'
			}
		}

	});

	grunt.config('concat', {

		options: {
			process: function (src, filepath) {
				var explodedpath = filepath.split('/'),
					filename = explodedpath.pop().replace('.js', ''),
					modified_src = '',
					common_replaces = function (content) {
						content = content.replace('(function($) {', '').replace('(function ($) {', '');
						content = content.replace('}( jQuery ));', '').replace('})(jQuery);', '');
						content = content.replace('}(jQuery));', '').replace(/methods/g, filename + 'methods');
						return content;
					};


				// Replaces head with my own code
				if (filepath.indexOf('tabs.js') !== -1) {

					modified_src = src.replace('(function ($) {', "define(['jquery'], function ($) { " + '\n' + "var jQuery=$; " + '\n');
					return modified_src.replace('}( jQuery ));', '});');

				} else if (filepath.indexOf('animation.js') !== -1) {

					modified_src = 'jQuery.easing = {linear: function( p ) {return p;},swing: function( p ) ';
					modified_src = modified_src + '{return 0.5 - Math.cos( p * Math.PI ) / 2;},_default: "swing"};' + '\n';
					modified_src = modified_src + '\n' + common_replaces(src);
					return modified_src;

				} else if (filepath.indexOf('initial.js') !== -1) {
					return "define(['jquery','velocity','hammerjs'], function ($, Velocity, hammerjs) { " + '\n' + "var jQuery=$, Materialize={};" + '\n';
					// Replaces tail
				} else if (filepath.indexOf('waves.js') !== -1) {
					return '// Source: ' + filepath + '\n' + src.replace('})(window);', ' return Materialize; });').replace(';(function(window) {', '');
				} else {
					modified_src = '// Source: ' + filepath + '\n' + common_replaces(src);
					return modified_src;
				}

			}

		},
		tabs: {
			src: ["jspm_packages/npm/materialize-css@0.97.6/tabs.js"],
			dest: 'src_material/material_amd/tabs.js'
		},
		dist: {
			// the files to concatenate
			src: [
				"jspm_packages/npm/materialize-css@0.97.6/initial.js",
				"jspm_packages/npm/materialize-css@0.97.6/animation.js",
				"jspm_packages/npm/materialize-css@0.97.6/jquery.easing.1.3.js",


				"src_material/material_components/collapsible.js",

				"src_material/material_components/dropdown.js",
				"jspm_packages/npm/materialize-css@0.97.6/leanModal.js",
				"jspm_packages/npm/materialize-css@0.97.6/materialbox.js",


				"jspm_packages/npm/materialize-css@0.97.6/tooltip.js",
				"jspm_packages/npm/materialize-css@0.97.6/sideNav.js",
				"jspm_packages/npm/materialize-css@0.97.6/scrollspy.js",
				"jspm_packages/npm/materialize-css@0.97.6/slider.js",
				"jspm_packages/npm/materialize-css@0.97.6/cards.js",
				"jspm_packages/npm/materialize-css@0.97.6/chips.js",
				"jspm_packages/npm/materialize-css@0.97.6/pushpin.js",
				"jspm_packages/npm/materialize-css@0.97.6/buttons.js",
				"jspm_packages/npm/materialize-css@0.97.6/transitions.js",


				//"jspm_packages/npm/materialize-css@0.97.6/global.js",
				//"jspm_packages/npm/materialize-css@0.97.6/parallax.js",
				//"jspm_packages/npm/materialize-css@0.97.6/toasts.js",
				//"jspm_packages/npm/materialize-css@0.97.6/forms.js",
				//"jspm_packages/npm/materialize-css@0.97.6/date_picker/picker.js",
				//"jspm_packages/npm/materialize-css@0.97.6/date_picker/picker.date.js",
				//"jspm_packages/npm/materialize-css@0.97.6/character_counter.js",
				//"jspm_packages/npm/materialize-css@0.97.6/carousel.js"
				//"jspm_packages/npm/materialize-css@0.97.6/scrollFire.js",
				"jspm_packages/npm/materialize-css@0.97.6/waves.js"
			],
			// the location of the resulting JS file
			dest: 'src_material/materialize.js'

		}

	});


	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-concat');
};
