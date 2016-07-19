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

	grunt.loadNpmTasks('grunt-contrib-connect');
};
