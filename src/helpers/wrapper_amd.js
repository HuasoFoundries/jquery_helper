/*eslint-disable no-unused-vars*/
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(global) :
		typeof define === 'function' && define.amd ? define(function () {
			return factory(global)
		}) :
		(global.jQuery = factory(global));
}(this, function ($_GLOBAL) {
	"use strict";

	// @CODE
	return jQuery;
}));
