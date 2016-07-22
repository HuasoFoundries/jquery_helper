import $ from '../../libs/jquery.es6.js';

export default ((jQuery) => {
	var originalXhr = jQuery.ajaxSettings.xhr;
	jQuery.ajaxSetup({
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
})($);
