import $ from 'jquery';


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


export {
	$
};
