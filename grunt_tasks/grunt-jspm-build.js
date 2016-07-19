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
			globalName: 'jq_material',
			globalDeps: {
				'jquery': 'jQuery'
			}

		};


		return builder.buildStatic(
				'src/jquery_ui',
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
					globalName: 'jq_material',
					globalDeps: {
						'jquery': 'jQuery'
					}

				};


				return builder.buildStatic(
					'src/jquery_ui',
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
					globalName: 'jq_material',
					externals: ['jquery'],
					globalDeps: {
						'jquery': 'jQuery'
					}

				};

				return builder.buildStatic(
					'src/jquery_ui',
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
