"use strict";

require("jsdom").env("", function (errors, window) {
	if (errors) {
		console.error(errors);
		return;
	}

	var jQuery = require(process.env.jquery_path)(window);

	module.exports.deferred = function () {
		var deferred = jQuery.Deferred();

		return {
			promise: deferred.promise(),
			resolve: deferred.resolve.bind(deferred),
			reject: deferred.reject.bind(deferred)
		};
	};
});