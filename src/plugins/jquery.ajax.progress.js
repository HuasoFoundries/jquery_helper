/**
 * adds XHR2 progress event to jQuery.ajax
 * taken from https://gist.github.com/db/966388/e4bf5999f59aee137f471b5f7b7289f1a4469c58
 * @param  {[type]} root    [description]
 * @param  {[type]} factory [description]
 * @return {[type]}         [description]
 */
(function (root, factory) {

	if (typeof define === "function" && define.amd) {
		// AMD (+ global for extensions)
		define(['jquery'], factory);

	} else if (typeof module !== 'undefined' && typeof exports === "object") {
		// CommonJS
		module.exports = factory(require('jquery'));
	} else {
		// Browser
		root.jQuery = factory(root.jQuery);
	}
}(this, function (jQuery) {

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

}));
