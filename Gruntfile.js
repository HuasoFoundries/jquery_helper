module.exports = function (grunt) {


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
					modified_src = '';

				if (filepath.indexOf('npm/materialize-css') !== -1) {
					// Replaces head with my own code
					if (filepath.indexOf('initial.js') !== -1) {
						return "define(['jquery','velocity','hammerjs'], function ($, Velocity, hammerjs) { var jQuery=$, Materialize={};";
						// Replaces tail
					} else if (filepath.indexOf('waves.js') !== -1) {
						return '// Source: ' + filepath + '\n' + src.replace('})(window);', ' return Materialize; });').replace(';(function(window) {', '');
					} else {
						modified_src = '// Source: ' + filepath + '\n' + src.replace('(function($) {', '').replace('(function ($) {', '');
						return modified_src.replace('}( jQuery ));', '').replace('})(jQuery);', '').replace(/methods/g, filename + 'methods');
					}
				}
			}

		},
		dist: {
			// the files to concatenate
			src: [
				"jspm_packages/npm/materialize-css@0.97.6/initial.js",
				"jspm_packages/npm/materialize-css@0.97.6/jquery.easing.1.3.js",
				"jspm_packages/npm/materialize-css@0.97.6/animation.js",


				"src/material_components/collapsible.js",

				"jspm_packages/npm/materialize-css@0.97.6/dropdown.js",
				"jspm_packages/npm/materialize-css@0.97.6/leanModal.js",
				"jspm_packages/npm/materialize-css@0.97.6/materialbox.js",
				"jspm_packages/npm/materialize-css@0.97.6/tabs.js",

				"jspm_packages/npm/materialize-css@0.97.6/tooltip.js",
				"jspm_packages/npm/materialize-css@0.97.6/sideNav.js",
				"jspm_packages/npm/materialize-css@0.97.6/scrollspy.js",
				"jspm_packages/npm/materialize-css@0.97.6/slider.js",
				"jspm_packages/npm/materialize-css@0.97.6/cards.js",
				"jspm_packages/npm/materialize-css@0.97.6/chips.js",
				"jspm_packages/npm/materialize-css@0.97.6/pushpin.js",
				"jspm_packages/npm/materialize-css@0.97.6/buttons.js",
				"jspm_packages/npm/materialize-css@0.97.6/transitions.js",

				//"jspm_packages/npm/materialize-css@0.97.6/collapsible.js",

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
			dest: 'src/materialize.js'

		}

	});


	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-concat');
};
/*'./material_components/animation',
'./material_components/buttons',
'./material_components/cards',
'./material_components/character_counter',
'./material_components/chips',
'./material_components/dropdown',
'./material_components/jquery.easing.1.3',
'./material_components/jquery.hammer',
'./material_components/leanModal',
'./material_components/materialbox',
'./material_components/parallax',
'./material_components/pushpin',
'./material_components/scrollspy',
'./material_components/sideNav',
'./material_components/slider',
'./material_components/tabs',*/
