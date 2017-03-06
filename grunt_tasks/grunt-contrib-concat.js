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
						grunt.log.writeln('Generating: ' + 'src/libs/hammer.es6.js');

						var modified_src = "var $_GLOBAL = typeof window !== 'undefined' ? window : ";
						modified_src = modified_src + '\n' + "typeof global !== 'undefined' ? global :    Function('return this')();";
						modified_src = modified_src + '\n' + "'use strict';";
						modified_src = modified_src + '\n' + "var document = $_GLOBAL.document;";
						return modified_src;
					} else if (filepath.indexOf('src/expose.js') !== -1) {

						return src.split('var freeGlobal')[0].replace('window', '$_GLOBAL');

					} else if (filepath.indexOf('src/hammer.suffix.js') !== -1) {


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
			dest: 'src/libs/hammer.es6.js'

		},
		hammer_effects: {
			options: {
				stripBanners: {
					block: true
				},
				process: function (src, filepath) {

					if (filepath.indexOf('hammer_initial') !== -1) {
						grunt.log.writeln('Generating: ' + 'src/libs/materialize_hammer_fns.js');
					}
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
			dest: 'src/libs/materialize_hammer_fns.js'
		},


		velocity: {

			options: {
				stripBanners: true,
				process: function (src, filepath) {


					if (filepath.indexOf('velocity.js') !== -1) {

						grunt.log.writeln('Generating ', 'src/jquery_shim/jquery_ui/velocity.js');

						var modified_src = (src.split('return function(global, window, document, undefined) {')[1])
							.split('}((window.jQuery || window.Zepto || window), window, (window ? window.document : undefined));');


						var intercept_return_final = modified_src[0].replace('return Velocity;', '').split('var DURATION_DEFAULT');




						modified_src = '\n' + "var DURATION_DEFAULT " + intercept_return_final[1].replace(/global/g, '$');



						var penultimo = modified_src.replace(/\|\| rAFShim/g, '').replace(/\/\*[^\*\/]+\*\//g, '');

						return penultimo
							.replace(/Data/g, 'VData')
							.replace(/\$\./g, 'jQuery.')
							.replace(/\$\(/g, 'jQuery(');

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
			dest: 'src/jquery_shim/jquery_ui/velocity.js'
		},

		material: {
			options: {
				stripBanners: {
					block: true
				},
				process: function (src, filepath) {

					if (filepath.indexOf('materialize_initial.js') !== -1) {

						grunt.log.writeln('Generating ', 'src/jquery_shim/jquery_ui/materialize.js');
					}

					var explodedpath = filepath.split('/'),
						filename = explodedpath.pop().replace('.js', ''),
						modified_src = '',
						common_replaces = function (content) {
							content = content.replace('(function($) {', '').replace('(function ($) {', '');
							content = content.replace('}( jQuery ));', '').replace('})(jQuery);', '');
							content = content.replace('}(jQuery));', '').replace(/methods/g, filename + 'methods');
							content = content.replace(/jQuery\./g, '$.');
							content = content.replace(/jQuery\(/g, '$(');
							//content = content.replace(/window/g, '$_GLOBAL').replace(/wodniw/g, 'window');

							return content;
						};


					modified_src = '// Source: ' + filepath + '\n' + common_replaces(src);
					return modified_src;

				}

			},
			// the files to concatenate
			src: [
				"src/helpers/materialize_initial.js",
				"src/helpers/collapsible.js",
				"src/helpers/dropdown.js",
				"src/helpers/leanModal.js",
				"node_modules/materialize-css/js/materialbox.js",
				"node_modules/materialize-css/js/tooltip.js",
				"node_modules/materialize-css/js/cards.js",
				"node_modules/materialize-css/js/chips.js",
				"node_modules/materialize-css/js/buttons.js",
				"node_modules/materialize-css/js/forms.js",
				"src/helpers/waves.js"
			],
			// the location of the resulting JS file
			dest: 'src/jquery_shim/jquery_ui/materialize.js'

		}


	});

	grunt.loadNpmTasks('grunt-contrib-concat');

};
