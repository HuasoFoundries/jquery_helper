import $ from 'libs/jquery.es6.js';


import './plugins_es6/jquery.hotkeys.js';
import './plugins_es6/jquery.cookie.js';
import './plugins_es6/jquery.waitforChild.js';
import './plugins_es6/jquery.serializejson.js';
//import './plugins/jquery-csv.js';

((jQuery) => {
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


((root, jQuery) => {

	root.jQuery = jQuery;
	root.$ = jQuery;
})(window, $);

export {
	$
};
