import $ from 'libs/jquery.es6.js';

((root, jQuery) => {

	root.jQuery = jQuery;
	root.$ = jQuery;
})(window, $);

export {
	$
};
