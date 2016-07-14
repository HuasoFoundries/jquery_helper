/* ExcludeStart */
/* eslint strict: "off" */
/* ExcludeEnd */
var	_jQuery = $_GLOBAL.jQuery,
	_$ = $_GLOBAL.$;

jQuery.noConflict = function( deep ) {
	if ( $_GLOBAL.$ === jQuery ) {
		$_GLOBAL.$ = _$;
	}
	if ( deep && $_GLOBAL.jQuery === jQuery ) {
		$_GLOBAL.jQuery = _jQuery;
	}
	return jQuery;
};

