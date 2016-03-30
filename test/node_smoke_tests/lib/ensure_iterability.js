/* jshint esnext: true */

"use strict";

var assert = require("assert");

module.exports = function ensureIterability() {
	require("jsdom").env("", function (errors, window) {
		assert.ifError(errors);

		var i, 
		ensureJQuery = require("./ensure_jquery"), 
		jQuery = require("../../../dist/jquery.js")(window), 
		elem = jQuery("<div></div><span></span><a></a>"), 
		result = "";

		ensureJQuery(jQuery);var _iteratorNormalCompletion = true;var _didIteratorError = false;var _iteratorError = undefined;try {

			for (var _iterator = elem[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {i = _step.value;
				result += i.nodeName;}} catch (err) {_didIteratorError = true;_iteratorError = err;} finally {try {if (!_iteratorNormalCompletion && _iterator["return"]) {_iterator["return"]();}} finally {if (_didIteratorError) {throw _iteratorError;}}}


		assert.strictEqual(result, "DIVSPANA", "for-of doesn't work on jQuery objects");});};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3Qvbm9kZV9zbW9rZV90ZXN0cy9saWIvZW5zdXJlX2l0ZXJhYmlsaXR5X2VzNi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBLFlBQVksQ0FBQzs7QUFFYixJQUFJLE1BQU0sR0FBRyxPQUFPLENBQUUsUUFBUSxDQUFFLENBQUM7O0FBRWpDLE1BQU0sQ0FBQyxPQUFPLEdBQUcsU0FBUyxpQkFBaUIsR0FBRztBQUM3QyxRQUFPLENBQUUsT0FBTyxDQUFFLENBQUMsR0FBRyxDQUFFLEVBQUUsRUFBRSxVQUFVLE1BQU0sRUFBRSxNQUFNLEVBQUc7QUFDdEQsUUFBTSxDQUFDLE9BQU8sQ0FBRSxNQUFNLENBQUUsQ0FBQzs7QUFFekIsTUFBSSxDQUFDO0FBQ0osY0FBWSxHQUFHLE9BQU8sQ0FBRSxpQkFBaUIsQ0FBRTtBQUMzQyxRQUFNLEdBQUcsT0FBTyxDQUFFLHlCQUF5QixDQUFFLENBQUUsTUFBTSxDQUFFO0FBQ3ZELE1BQUksR0FBRyxNQUFNLENBQUUsaUNBQWlDLENBQUU7QUFDbEQsUUFBTSxHQUFHLEVBQUUsQ0FBQzs7QUFFYixjQUFZLENBQUUsTUFBTSxDQUFFLENBQUM7O0FBRXZCLHdCQUFXLElBQUksOEhBQUcsQ0FBWixDQUFDO0FBQ04sVUFBTSxJQUFJLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FDckI7OztBQUVELFFBQU0sQ0FBQyxXQUFXLENBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSx1Q0FBdUMsQ0FBRSxDQUFDLENBQ2xGLENBQUUsQ0FBQyxDQUNKLENBQUMiLCJmaWxlIjoidGVzdC9ub2RlX3Ntb2tlX3Rlc3RzL2xpYi9lbnN1cmVfaXRlcmFiaWxpdHlfZXM2LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoganNoaW50IGVzbmV4dDogdHJ1ZSAqL1xuXG5cInVzZSBzdHJpY3RcIjtcblxudmFyIGFzc2VydCA9IHJlcXVpcmUoIFwiYXNzZXJ0XCIgKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBlbnN1cmVJdGVyYWJpbGl0eSgpIHtcblx0cmVxdWlyZSggXCJqc2RvbVwiICkuZW52KCBcIlwiLCBmdW5jdGlvbiggZXJyb3JzLCB3aW5kb3cgKSB7XG5cdFx0YXNzZXJ0LmlmRXJyb3IoIGVycm9ycyApO1xuXG5cdFx0dmFyIGksXG5cdFx0XHRlbnN1cmVKUXVlcnkgPSByZXF1aXJlKCBcIi4vZW5zdXJlX2pxdWVyeVwiICksXG5cdFx0XHRqUXVlcnkgPSByZXF1aXJlKCBcIi4uLy4uLy4uL2Rpc3QvanF1ZXJ5LmpzXCIgKSggd2luZG93ICksXG5cdFx0XHRlbGVtID0galF1ZXJ5KCBcIjxkaXY+PC9kaXY+PHNwYW4+PC9zcGFuPjxhPjwvYT5cIiApLFxuXHRcdFx0cmVzdWx0ID0gXCJcIjtcblxuXHRcdGVuc3VyZUpRdWVyeSggalF1ZXJ5ICk7XG5cblx0XHRmb3IgKCBpIG9mIGVsZW0gKSB7XG5cdFx0XHRyZXN1bHQgKz0gaS5ub2RlTmFtZTtcblx0XHR9XG5cblx0XHRhc3NlcnQuc3RyaWN0RXF1YWwoIHJlc3VsdCwgXCJESVZTUEFOQVwiLCBcImZvci1vZiBkb2Vzbid0IHdvcmsgb24galF1ZXJ5IG9iamVjdHNcIiApO1xuXHR9ICk7XG59O1xuIl19
