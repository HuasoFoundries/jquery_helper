import {
	jQuery
} from 'materialize';




var $ = jQuery;


jQuery.fn.animate = jQuery.fn.velocity;


jQuery.fn.fadeOut = function (speed, easing, callback) {
	return this.each(function () {
		$(this).velocity({
			opacity: 'hide'
		}, speed, easing, callback);
	});
};

jQuery.fn.fadeIn = function (speed, easing, callback) {
	return this.each(function () {
		$(this).velocity({
			opacity: 'show'
		}, speed, easing, callback);
	});
};

/*
		jQuery.fn.extend({
		show: function () {
			return jQuery(this).removeClass('invisible');
		},
		hide: function () {
			return jQuery(this).addClass('invisible');
		},
		toggle: function (state) {
			return jQuery(this).toggleClass('invisible');
		}
	});
	*/

$.fn.modal = function (option) {
	var defaults = {
		dismissible: true, // Modal can be dismissed by clicking outside of the modal
		opacity: 0.5, // Opacity of modal background
		in_duration: 300, // Transition in duration
		out_duration: 200, // Transition out duration
		ready: function () {
			alert('Ready');
		}, // Callback for Modal open
		complete: function () {
				alert('Closed');
			} // Callback for Modal close
	};

	var options = $.extend(defaults, option);

	return this.each(function () {
		if (option === 'show') {
			$(this).openModal();
		} else if (options === 'hide') {
			$(this).closeModal();
		} else {
			$(this).leanModal(options);
		}
	});
};


/**
 * Devuelve el elemento que calza con el selector, o crea un nuevo elemento
 * @param  {String} selector  selector CSS para buscar si existe el elemento
 * @param  {String} html  definicion del elemento a crear
 * @return {jQuery Object} uno o mas elementos que calzan con el criterio de seleccion
 */
jQuery.getOrCreate = function (selector, html) {
	var elemento = jQuery(selector);

	if (elemento.length === 0) {
		elemento = jQuery(html);
	}

	return elemento;
};




$.fn.tabs = function (methodOrOptions) {
	var methods = {
		init: function () {
			return this.each(function () {

				// For each set of tabs, we want to keep track of
				// which tab is active and its associated content
				var $this = $(this),
					window_width = $(window).width();

				$this.width('100%');
				var $active, $content, $links = $this.find('li.tab a'),
					$tabs_width = $this.width(),
					$tab_width = Math.max($tabs_width, $this[0].scrollWidth) / $links.length,
					$index = 0;

				// If the location.hash matches one of the links, use that as the active tab.
				$active = $($links.filter('[href="' + location.hash + '"]'));

				// If no match is found, use the first link or any with class 'active' as the initial active tab.
				if ($active.length === 0) {
					$active = $(this).find('li.tab a.active').first();
				}
				if ($active.length === 0) {
					$active = $(this).find('li.tab a').first();
				}

				$active.addClass('active');
				$index = $links.index($active);
				if ($index < 0) {
					$index = 0;
				}

				if ($active[0] !== undefined) {
					$content = $($active[0].hash);
				}

				// append indicator then set indicator width to tab width
				$this.append('<div class="indicator"></div>');
				var $indicator = $this.find('.indicator');
				if ($this.is(":visible")) {
					$indicator.css({
						"right": $tabs_width - (($index + 1) * $tab_width)
					});
					$indicator.css({
						"left": $index * $tab_width
					});
				}
				$(window).resize(function () {
					$tabs_width = $this.width();
					$tab_width = Math.max($tabs_width, $this[0].scrollWidth) / $links.length;
					if ($index < 0) {
						$index = 0;
					}
					if ($tab_width !== 0 && $tabs_width !== 0) {
						$indicator.css({
							"right": $tabs_width - (($index + 1) * $tab_width)
						});
						$indicator.css({
							"left": $index * $tab_width
						});
					}
				});

				// Hide the remaining content
				$links.not($active).each(function () {
					$(this.hash).hide();
				});


				// Bind the click event handler
				$this.on('click', 'a', function (e) {
					if ($(this).parent().hasClass('disabled')) {
						e.preventDefault();
						return;
					}

					$tabs_width = $this.width();
					$tab_width = Math.max($tabs_width, $this[0].scrollWidth) / $links.length;

					// Make the old tab inactive.
					$active.removeClass('active');
					if ($content !== undefined) {
						$content.hide();
					}

					// Update the variables with the new link and content
					$active = $(this);
					$content = $(this.hash);
					$links = $this.find('li.tab a');

					// Make the tab active.
					$active.addClass('active');
					var $prev_index = $index;
					$index = $links.index($(this));
					if ($index < 0) {
						$index = 0;
					}
					// Change url to current tab
					// window.location.hash = $active.attr('href');

					if ($content !== undefined) {
						$content.show();
					}

					// Update indicator
					if (($index - $prev_index) >= 0) {
						$indicator.velocity({
							"right": $tabs_width - (($index + 1) * $tab_width)
						}, {
							duration: 300,
							queue: false,
							easing: 'easeOutQuad'
						});
						$indicator.velocity({
							"left": $index * $tab_width
						}, {
							duration: 300,
							queue: false,
							easing: 'easeOutQuad',
							delay: 90
						});

					} else {
						$indicator.velocity({
							"left": $index * $tab_width
						}, {
							duration: 300,
							queue: false,
							easing: 'easeOutQuad'
						});
						$indicator.velocity({
							"right": $tabs_width - (($index + 1) * $tab_width)
						}, {
							duration: 300,
							queue: false,
							easing: 'easeOutQuad',
							delay: 90
						});
					}

					// Prevent the anchor's default click action
					e.preventDefault();
				});
			});

		},
		select_tab: function (id) {
			this.find('a[href="#' + id + '"]').trigger('click');
		}
	};
	if (methods[methodOrOptions]) {
		return methods[methodOrOptions].apply(this, Array.prototype.slice.call(arguments, 1));
	} else if (typeof methodOrOptions === 'object' || !methodOrOptions) {
		// Default to "init"
		return methods.init.apply(this, arguments);
	} else {
		$.error('Method ' + methodOrOptions + ' does not exist on jQuery.tooltip');
	}
};

function textareaAutoResize($textarea) {
	// Set font properties of hiddenDiv

	var fontFamily = $textarea.css('font-family');
	var fontSize = $textarea.css('font-size');

	if (fontSize) {
		hiddenDiv.css('font-size', fontSize);
	}
	if (fontFamily) {
		hiddenDiv.css('font-family', fontFamily);
	}

	if ($textarea.attr('wrap') === "off") {
		hiddenDiv.css('overflow-wrap', "normal")
			.css('white-space', "pre");
	}


	hiddenDiv.text($textarea.val() + '\n');
	var content = hiddenDiv.html().replace(/\n/g, '<br>');
	hiddenDiv.html(content);


	// When textarea is hidden, width goes crazy.
	// Approximate with half of window size

	if ($textarea.is(':visible')) {
		hiddenDiv.css('width', $textarea.width());
	} else {
		hiddenDiv.css('width', $(window).width() / 2);
	}

	$textarea.css('height', hiddenDiv.height());
}


$(document).ready(function () {

	var swipeLeft = false;
	var swipeRight = false;
	$('ul.tabs').tabs();
	// Dismissible Collections
	$('.dismissable').each(function () {
		$(this).hammer({
			prevent_default: false
		}).bind('pan', function (e) {
			if (e.gesture.pointerType === "touch") {
				var $this = $(this);
				var direction = e.gesture.direction;
				var x = e.gesture.deltaX;
				var velocityX = e.gesture.velocityX;

				$this.velocity({
					translateX: x
				}, {
					duration: 50,
					queue: false,
					easing: 'easeOutQuad'
				});

				// Swipe Left
				if (direction === 4 && (x > ($this.innerWidth() / 2) || velocityX < -0.75)) {
					swipeLeft = true;
				}

				// Swipe Right
				if (direction === 2 && (x < (-1 * $this.innerWidth() / 2) || velocityX > 0.75)) {
					swipeRight = true;
				}
			}
		}).bind('panend', function (e) {
			// Reset if collection is moved back into original position
			if (Math.abs(e.gesture.deltaX) < ($(this).innerWidth() / 2)) {
				swipeRight = false;
				swipeLeft = false;
			}

			if (e.gesture.pointerType === "touch") {
				var $this = $(this);
				if (swipeLeft || swipeRight) {
					var fullWidth;
					if (swipeLeft) {
						fullWidth = $this.innerWidth();
					} else {
						fullWidth = -1 * $this.innerWidth();
					}

					$this.velocity({
						translateX: fullWidth
					}, {
						duration: 100,
						queue: false,
						easing: 'easeOutQuad',
						complete: function () {
							$this.css('border', 'none');
							$this.velocity({
								height: 0,
								padding: 0
							}, {
								duration: 200,
								queue: false,
								easing: 'easeOutQuad',
								complete: function () {
									$this.remove();
								}
							});
						}
					});
				} else {
					$this.velocity({
						translateX: 0
					}, {
						duration: 100,
						queue: false,
						easing: 'easeOutQuad'
					});
				}
				swipeLeft = false;
				swipeRight = false;
			}
		});

	});


	// Handle HTML5 autofocus
	$('input[autofocus]').siblings('label, i').addClass('active');


	// Textarea Auto Resize
	var hiddenDiv = $('.hiddendiv').first();
	if (!hiddenDiv.length) {
		hiddenDiv = $('<div class="hiddendiv common"></div>');
		$('body').append(hiddenDiv);
	}
	var text_area_selector = '.materialize-textarea';



	$(text_area_selector).each(function () {
		var $textarea = $(this);
		if ($textarea.val().length) {
			textareaAutoResize($textarea);
		}
	});

	$('body').on('keyup keydown autoresize', text_area_selector, function () {
		textareaAutoResize($(this));
	});


	// File Input Path

	$(document).on('change', '.file-field input[type="file"]', function () {
		var file_field = $(this).closest('.file-field');
		var path_input = file_field.find('input.file-path');
		var files = $(this)[0].files;
		var file_names = [];
		for (var i = 0; i < files.length; i++) {
			file_names.push(files[i].name);
		}
		path_input.val(file_names.join(", "));
		path_input.trigger('change');
	});


});

var $_GLOBAL = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : Function('return this')();


if (typeof exports === 'object' && typeof module !== 'undefined') {
	module.exports = jQuery;
} else if (typeof define === 'function' && define.amd) {
	define(function () {
		return jQuery;
	});
} else {
	$_GLOBAL.jQuery = jQuery;
}

export {
	jQuery
};
export default jQuery;
