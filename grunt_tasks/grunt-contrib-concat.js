module.exports = function (grunt) {

	grunt.config('concat', {

		hammer: {
			options: {
				stripBanners: {
					block: true
				},
				process: function (src, filepath) {

					// Replaces head with my own code
					if (filepath.indexOf('src/hammer.prefix.js') !== -1) {

						var modified_src = "var $_GLOBAL = typeof window !== 'undefined' ? window : ";
						modified_src = modified_src + '\n' + "typeof global !== 'undefined' ? global :    Function('return this')();";
						modified_src = modified_src + '\n' + "'use strict';";
						modified_src = modified_src + '\n' + "var document = $_GLOBAL.document;";
						return modified_src;
					} else if (filepath.indexOf('src/expose.js') !== -1) {

						return src.split('var freeGlobal')[0].replace('window', '$_GLOBAL');

					} else if (filepath.indexOf('src/hammer.suffix.js') !== -1) {

						grunt.log.writeln('CREATING: ' + 'libs/hammer.es6.js');
						return "export {Hammer};" + '\n' + "export default Hammer;";
					} else {
						return src.replace('window', '$_GLOBAL');
					}

				}

			},
			src: [
				'node_modules/hammerjs/src/hammer.prefix.js',
				'node_modules/hammerjs/src/utils.js',
				'node_modules/hammerjs/src/input.js',
				'node_modules/hammerjs/src/input/*.js',
				'node_modules/hammerjs/src/touchaction.js',
				'node_modules/hammerjs/src/recognizer.js',
				'node_modules/hammerjs/src/recognizers/*.js',
				'node_modules/hammerjs/src/hammer.js',
				'node_modules/hammerjs/src/manager.js',
				'node_modules/hammerjs/src/expose.js',
				'node_modules/hammerjs/src/hammer.suffix.js'
			],
			dest: 'libs/hammer.es6.js'

		},

		velocityes6: {
			options: {

				stripBanners: {
					block: true
				},
				process: function (src, filepath) {

					var modified_src = (src.split('return function (global, window, document, undefined) {')[1])
						.replace(/global/g, 'jQuery')
						.replace(/window/g, '$_GLOBAL')
						.split('}(($_GLOBAL.jQuery || $_GLOBAL.Zepto || $_GLOBAL), $_GLOBAL, document);');

					if (filepath.indexOf('velocity.js') !== -1) {

						var modified_head = "import jQuery from 'jquery';";
						modified_head = modified_head + '\n' + "'use strict';";
						modified_head = modified_head + '\n' +
							"var $_GLOBAL = typeof window !== 'undefined' ? window :    typeof global !== 'undefined' ? global :    Function('return this')();";
						modified_head = modified_head + '\n' + "var document = $_GLOBAL.document;";

						var intercept_return_final = modified_src[0].replace('return Velocity;', '').split('var DURATION_DEFAULT'),
							intercept_return_begin = intercept_return_final[0].split('if (IE <= 8 && !isJQuery) {');

						modified_head = modified_head + '\n' + intercept_return_begin[0] + '\n' + "var DURATION_DEFAULT" + intercept_return_final[1];


						return modified_head;

					} else if (filepath.indexOf('velocity.ui.js') !== -1) {
						var modified_footer = modified_src[0].split('var velocityVersion');
						return 'var velocityVersion' + modified_footer[1] + '\n' + "export {Velocity};" + '\n' + "export default Velocity;";
					}
				}
			},
			src: [
				'node_modules/velocity-animate/velocity.js',
				'node_modules/velocity-animate/velocity.ui.js'
			],
			dest: 'libs/velocity.es6.js'
		},


		velocity: {

			options: {
				stripBanners: {
					block: true
				},
				process: function (src, filepath) {


					if (filepath.indexOf('velocity.js') !== -1) {

						grunt.log.writeln('Generating ', 'src/velocity.js');

						var modified_src = (src.split('return function (global, window, document, undefined) {')[1])
							.split('}((window.jQuery || window.Zepto || window), window, document);');


						var intercept_return_final = modified_src[0].replace('return Velocity;', '').split('var DURATION_DEFAULT');

						return '\n' + "var DURATION_DEFAULT " + intercept_return_final[1].replace(/global/g, 'root');

					} else {
						return src;
					}
				}
			},
			src: [
				'src/helpers/velocity_initial.js',
				'node_modules/velocity-animate/velocity.js',
				'src/helpers/animation_shim.js'
			],
			dest: 'src/velocity.js'
		},
		hammer_effects: {
			options: {
				stripBanners: {
					block: true
				},
				process: function (src, filepath) {
					var explodedpath = filepath.split('/'),
						filename = explodedpath.pop().replace('.js', ''),
						modified_src = '',
						common_replaces = function (content) {
							content = content.replace('(function($) {', '').replace('(function ($) {', '');
							content = content.replace('}( jQuery ));', '').replace('})(jQuery);', '');
							content = content.replace('}(jQuery));', '').replace(/methods/g, filename + 'methods');
							content = content.replace(/window/g, '$_GLOBAL').replace(/wodniw/g, 'window');

							return content;
						};


					modified_src = '// Source: ' + filepath + '\n' + common_replaces(src);
					return modified_src;

				}

			},
			// the files to concatenate
			src: [
				"src/helpers/hammer_initial.js",
				"node_modules/materialize-css/js/sideNav.js",
				"node_modules/materialize-css/js/scrollspy.js",
				"node_modules/materialize-css/js/slider.js",
				"node_modules/materialize-css/js/pushpin.js",
				"node_modules/materialize-css/js/transitions.js"

			],
			// the location of the resulting JS file
			dest: 'src/hammer_helper.js'
		},
		material: {
			options: {
				stripBanners: {
					block: true
				},
				process: function (src, filepath) {
					var explodedpath = filepath.split('/'),
						filename = explodedpath.pop().replace('.js', ''),
						modified_src = '',
						common_replaces = function (content) {
							content = content.replace('(function($) {', '').replace('(function ($) {', '');
							content = content.replace('}( jQuery ));', '').replace('})(jQuery);', '');
							content = content.replace('}(jQuery));', '').replace(/methods/g, filename + 'methods');
							//content = content.replace(/window/g, '$_GLOBAL').replace(/wodniw/g, 'window');

							return content;
						};


					modified_src = '// Source: ' + filepath + '\n' + common_replaces(src);
					return modified_src;

				}

			},
			// the files to concatenate
			src: [
				"src/helpers/initial.js",
				"src/helpers/collapsible.js",
				"src/helpers/dropdown.js",
				"src/helpers/leanModal.js",
				"node_modules/materialize-css/js/materialbox.js",
				"node_modules/materialize-css/js/tooltip.js",
				"node_modules/materialize-css/js/cards.js",
				"node_modules/materialize-css/js/chips.js",
				"node_modules/materialize-css/js/buttons.js",
				"src/helpers/waves.js"
			],
			// the location of the resulting JS file
			dest: 'src/material_helper.js'

		}


	});

	grunt.loadNpmTasks('grunt-contrib-concat');

};
