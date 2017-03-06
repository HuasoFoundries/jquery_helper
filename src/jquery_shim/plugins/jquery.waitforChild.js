/*!
 * jQuery waitforChild Plugin v0.0.1
 * https://github.com/amenadiel/jquery.waitforChild
 *
 * Copyright 2015 Felipe Figueroa
 * Released under the MIT license
 */
define(["../jquery_src/core"], function (jQuery) {


	'use strict';

	/**
	 * Will execute a function on matching child elements, or set a MutationObserver to detect if they are appended afterwards
	 * @param  {function} onFound   function to execute on matching elements once they exist
	 * @param  {String} [querySelector] optional CSS type selector to filter which elements should receive the onFound function
	 * @param  {Boolean}  [once] optional flag to execute the onFound function only on the first matching child
	 * @return {object} the element, as to keep the return chainable
	 */
	jQuery.fn.waitforChild = function (onFound, querySelector, once) {
		// allows for an object single parameter
		if (typeof arguments[0] === 'object') {
			once = arguments[0].once || false;
			querySelector = arguments[0].querySelector || null;
			onFound = arguments[0].onFound;
		}

		if (!onFound) {
			onFound = function () {};
		}

		var jQuerythis = this;

		// If no querySelector was asked, and the element has children, apply the onFound function either to the first or to all of them
		if (!querySelector && jQuerythis.children().length) {

			if (once) {
				onFound(jQuerythis.children().first());

			} else {
				jQuerythis.children().each(function (key, element) {
					onFound(jQuery(element));
				});
			}

			// If the element already has matching children, apply the onFound function either to the first or to all of them
		} else if (jQuerythis.find(querySelector).length !== 0) {
			if (once) {
				onFound(jQuerythis.find(querySelector).first());

			} else {
				jQuerythis.find(querySelector).each(function (key, element) {
					onFound(jQuery(element));
				});
			}
		} else {
			if (jQuerythis.length === 0) {
				console.warn("Can't attach an observer to a null node", jQuerythis);
			} else {
				// Otherwise, set a new MutationObserver and inspect each new inserted child from now on.
				var observer = new MutationObserver(function (mutations) {
					var _this = this;
					mutations.forEach(function (mutation) {
						if (mutation.addedNodes) {
							if (!querySelector) {
								onFound(jQuery(mutation.addedNodes[0]));
								if (once) {
									_this.disconnect();
								}
							} else {
								for (var i = 0; i < mutation.addedNodes.length; ++i) {
									var addedNode = mutation.addedNodes[i];
									if (jQuery(addedNode).is(querySelector)) {
										onFound(jQuery(addedNode));
										if (once) {
											_this.disconnect();
											break;
										}
									}
								}
							}
						}
					});
				});

				observer.observe(jQuerythis[0], {
					childList: true,
					subtree: true,
					attributes: false,
					characterData: false
				});
			}

		}



		return jQuerythis;
	};

	return jQuery;
});
