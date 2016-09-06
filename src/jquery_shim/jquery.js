/**
 * Entry point to build jQuery + plugins using grunt
 * @return {[type]}         [description]
 */
define([
	"./core.js",

	'./plugins/jquery.hotkeys.js',
	'./plugins/jquery.cookie.js',
	'./plugins/jquery.waitforChild.js',
	'./plugins/jquery.serializejson.js'
	//'./plugins/jquery.csv.js'

], function (jQuery) {

	"use strict";

	(function addXhrProgressEvent($) {
		var originalXhr = $.ajaxSettings.xhr;
		$.ajaxSetup({
			progress: function (e) {
				//console.log("standard progress callback", e);
			},
			xhr: function () {
				var req = originalXhr(),
					_this = this;
				if (req) {
					if (typeof req.addEventListener === "function") {
						req.addEventListener("progress", function (evt) {
							if (_this.progress) {
								_this.progress(evt);
							}
						}, false);
					}
				}
				return req;
			}
		});
	})(jQuery);

	return (window.jQuery = window.$ = jQuery);

});
