module.exports = function (grunt) {

	var enableREST = function (req, res, next) {
		res.setHeader('Access-Control-Allow-Origin', '*');
		res.setHeader('Access-Control-Allow-Credentials', true);
		res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
		console.log(req.url);
		//res.setHeader('Access-Control-Allow-Headers', req.headers['access-control-request-headers']);

		return next();
	};

	grunt.loadNpmTasks('grunt-contrib-connect');

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
		test: {
			options: {
				middleware: function (connect, options, middlewares) {


					middlewares.unshift(enableREST);
					return middlewares;

				},
				keepalive: true,
				port: 8089,
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


};
