module.exports = function (grunt) {

	grunt.registerTask('jspmbuild', function () {
		var done = this.async(),
			Builder = require('jspm').Builder,
			builder = new Builder();

		builder.loadConfig('./jspm.config.js');

		grunt.log.writeln('Processing task jspm build');


		var builderOpts = {
			minify: true,
			sourceMaps: true,
			externals: ['jquery'],
			globalName: 'Materialize',
			globalDeps: {
				'jquery': 'jQuery'
			}

		};


		return builder.buildStatic(
				'src/material_helper.js',
				'dist/jquery_helper.min.js',
				builderOpts)
			.then(function (output) {

				if (output && output.modules) {
					console.dir(output.modules);
				}
				var builderOptsAMD = {
					minify: false,
					sourceMaps: false,
					externals: ['jquery'],
					format: 'umd',
					globalName: 'Materialize',
					globalDeps: {
						'jquery': 'jQuery'
					}

				};


				return builder.buildStatic(
					'src/material_helper.js',
					'dist/jquery_helper.js',
					builderOptsAMD);

			}).then(function (output) {
				if (output && output.modules) {
					console.dir(output.modules);
				}
				var builderOptsESM = {
					minify: false,
					sourceMaps: false,
					format: 'esm',
					globalName: 'Materialize',
					externals: ['jquery'],
					globalDeps: {
						'jquery': 'jQuery'
					}

				};


				return builder.buildStatic(
					'src/material_helper.js',
					'dist/jquery_helper.esm.js',
					builderOptsESM);


			}).then(function (output) {
				if (output && output.modules) {
					console.dir(output.modules);
				}
				done();
			}).catch(function (err) {
				console.trace(err);
				done();
			});

	});
};
