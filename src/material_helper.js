define([
	'jquery',
	'velocity',
	'hammerjs',
	'./material_components/waves',
	'./material_components/animation',
	'./material_components/buttons',
	'./material_components/cards',
	'./material_components/character_counter',
	'./material_components/chips',
	'./material_components/dropdown',
	'./material_components/jquery.easing.1.3',
	'./material_components/jquery.hammer',
	'./material_components/leanModal',
	'./material_components/materialbox',
	'./material_components/parallax',
	'./material_components/pushpin',
	'./material_components/scrollspy',
	'./material_components/sideNav',
	'./material_components/slider',
	'./material_components/tabs',
	'jquery.cookie',
	'jquery.waitforChild',
	'jquery-serializejson',

	'jquery-ui/ui/core',
	'jquery-ui/ui/widget',
	'jquery-ui/ui/mouse',
	'jquery-ui/ui/position',
	'jquery-ui/ui/draggable',
	'jquery-ui/ui/droppable',
	'jquery-ui/ui/resizable',
	'jquery-ui/ui/selectable',
	'jquery-ui/ui/sortable',
	'jquery-ui/ui/progressbar',
	'./plugins/jquery.ajax.progress',
	'./plugins/jquery.hotkeys',
	'./plugins/jquery.ui.rotatable'

], function (jQuery, Velocity, hammerjs, Waves) {

	var $ = jQuery;

	var Materialize = {};

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

	// Unique ID
	Materialize.guid = (function () {
		function s4() {
			return Math.floor((1 + Math.random()) * 0x10000)
				.toString(16)
				.substring(1);
		}
		return function () {
			return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
				s4() + '-' + s4() + s4() + s4();
		};
	})();

	Materialize.elementOrParentIsFixed = function (element) {
		var $element = $(element);
		var $checkElements = $element.add($element.parents());
		var isFixed = false;
		$checkElements.each(function () {
			if ($(this).css("position") === "fixed") {
				isFixed = true;
				return false;
			}
		});
		return isFixed;
	};

	// Image transition function
	Materialize.fadeInImage = function (selector) {
		var element = $(selector);
		element.css({
			opacity: 0
		});
		$(element).velocity({
			opacity: 1
		}, {
			duration: 650,
			queue: false,
			easing: 'easeOutSine'
		});
		$(element).velocity({
			opacity: 1
		}, {
			duration: 1300,
			queue: false,
			easing: 'swing',
			step: function (now, fx) {
				fx.start = 100;
				var grayscale_setting = now / 100;
				var brightness_setting = 150 - (100 - now) / 1.75;

				if (brightness_setting < 100) {
					brightness_setting = 100;
				}
				if (now >= 0) {
					$(this).css({
						"-webkit-filter": "grayscale(" + grayscale_setting + ")" + "brightness(" + brightness_setting + "%)",
						"filter": "grayscale(" + grayscale_setting + ")" + "brightness(" + brightness_setting + "%)"
					});
				}
			}
		});
	};

	// Horizontal staggered list
	Materialize.showStaggeredList = function (selector) {
		var time = 0;
		$(selector).find('li').velocity({
			translateX: "-100px"
		}, {
			duration: 0
		});

		$(selector).find('li').each(function () {
			$(this).velocity({
				opacity: "1",
				translateX: "0"
			}, {
				duration: 800,
				delay: time,
				easing: [60, 10]
			});
			time += 120;
		});
	};

	Materialize.scrollFire = function (options) {

		var didScroll = false;

		window.addEventListener("scroll", function () {
			didScroll = true;
		});

		var conditionallyFire = function (windowScroll, value) {
			var selector = value.selector,
				offset = value.offset,
				callback = value.callback;

			var currentElement = document.querySelector(selector);
			if (currentElement !== null) {
				var elementOffset = currentElement.getBoundingClientRect().top + window.pageYOffset;

				if (windowScroll > (elementOffset + offset) && value.done !== true) {

					var callbackFunc = callback;
					callbackFunc();
					value.done = true;

				}
			}
		};

		// Rate limit to 100ms
		setInterval(function () {
			if (didScroll) {
				didScroll = false;

				var windowScroll = window.pageYOffset + window.innerHeight;

				for (var i = 0; i < options.length; i++) {
					// Get options from each line
					var value = options[i];
					conditionallyFire(windowScroll, value);

				}
			}
		}, 100);
	};

	// Text based inputs
	Materialize.input_selector = [
		'input[type=text]',
		'input[type=password]',
		'input[type=email]',
		'input[type=url]',
		'input[type=tel]',
		'input[type=number]',
		'input[type=search]',
		'textarea'
	].join(',');

	// Function to update labels of text fields
	Materialize.updateTextFields = function () {

		$(Materialize.input_selector).each(function (index, element) {
			if ($(element).val().length > 0 || $(this).attr('placeholder') !== undefined || $(element)[0].validity.badInput === true) {
				$(this).siblings('label').addClass('active');
			} else {
				$(this).siblings('label, i').removeClass('active');
			}
		});
	};

	var validate_field = function (object) {
		var hasLength = object.attr('length') !== undefined;
		var lenAttr = parseInt(object.attr('length'), 10);
		var len = object.val().length;

		if (object.val().length === 0 && object[0].validity.badInput === false) {
			if (object.hasClass('validate')) {
				object.removeClass('valid');
				object.removeClass('invalid');
			}
		} else if (object.hasClass('validate')) {
			// Check for character counter attributes
			if ((object.is(':valid') && hasLength && (len <= lenAttr)) || (object.is(':valid') && !hasLength)) {
				object.removeClass('invalid');
				object.addClass('valid');
			} else {
				object.removeClass('valid');
				object.addClass('invalid');
			}
		}

	};

	// Make option as selected and scroll to selected position
	var activateOption = function (collection, newOption) {
		collection.find('li.active').removeClass('active');
		$(newOption).addClass('active');
		collection.scrollTo(newOption);
	};

	$.fn.collapsible = function (options) {
		var defaults = {
			accordion: undefined
		};

		options = $.extend(defaults, options);


		return this.each(function () {

			var $this = $(this);

			var $panel_headers = $(this).find('> li > .collapsible-header');

			var collapsible_type = $this.data("collapsible");

			// Turn off any existing event handlers
			$this.off('click.collapse', '.collapsible-header');
			$panel_headers.off('click.collapse');


			/****************
			Helper Functions
			****************/

			// Accordion Open
			function accordionOpen(object) {
				$panel_headers = $this.find('> li > .collapsible-header');
				if (object.hasClass('active')) {
					object.parent().addClass('active');
				} else {
					object.parent().removeClass('active');
				}
				if (object.parent().hasClass('active')) {
					object.siblings('.collapsible-body').stop(true, false).slideDown({
						duration: 350,
						easing: "easeOutQuart",
						queue: false,
						complete: function () {
							$(this).css('height', '');
						}
					});
				} else {
					object.siblings('.collapsible-body').stop(true, false).slideUp({
						duration: 350,
						easing: "easeOutQuart",
						queue: false,
						complete: function () {
							$(this).css('height', '');
						}
					});
				}

				$panel_headers.not(object).removeClass('active').parent().removeClass('active');
				$panel_headers.not(object).parent().children('.collapsible-body').stop(true, false).slideUp({
					duration: 350,
					easing: "easeOutQuart",
					queue: false,
					complete: function () {
						$(this).css('height', '');
					}
				});
			}

			// Expandable Open
			function expandableOpen(object) {
				if (object.hasClass('active')) {
					object.parent().addClass('active');
				} else {
					object.parent().removeClass('active');
				}
				if (object.parent().hasClass('active')) {
					object.siblings('.collapsible-body').stop(true, false).slideDown({
						duration: 350,
						easing: "easeOutQuart",
						queue: false,
						complete: function () {
							$(this).css('height', '');
						}
					});
				} else {
					object.siblings('.collapsible-body').stop(true, false).slideUp({
						duration: 350,
						easing: "easeOutQuart",
						queue: false,
						complete: function () {
							$(this).css('height', '');
						}
					});
				}
			}

			/**
			 * Get panel header from a children element
			 * @param  {Object} object Jquery object
			 * @return {Object} panel header object
			 */
			function getPanelHeader(object) {

				return object.closest('li > .collapsible-header');
			}

			/**
			 * Check if object is children of panel header
			 * @param  {Object}  object Jquery object
			 * @return {Boolean} true if it is children
			 */
			function isChildrenOfPanelHeader(object) {

				var panelHeader = getPanelHeader(object);

				return panelHeader.length > 0;
			}

			/*****  End Helper Functions  *****/

			if (options.accordion || collapsible_type === "accordion" || collapsible_type === undefined) { // Handle Accordion
				// Add click handler to only direct collapsible header children
				$panel_headers = $this.find('> li > .collapsible-header');
				$panel_headers.on('click.collapse', function (e) {
					var element = $(e.target);

					if (isChildrenOfPanelHeader(element)) {
						element = getPanelHeader(element);
					}

					element.toggleClass('active');
					accordionOpen(element);
				});
				// Open first active
				accordionOpen($panel_headers.filter('.active').first());
			} else { // Handle Expandables
				$panel_headers.each(function () {
					// Add click handler to only direct collapsible header children
					$(this).on('click.collapse', function (e) {
						var element = $(e.target);
						if (isChildrenOfPanelHeader(element)) {
							element = getPanelHeader(element);
						}
						element.toggleClass('active');
						expandableOpen(element);
					});
					// Open any bodies that have the active class
					if ($(this).hasClass('active')) {
						expandableOpen($(this));
					}

				});
			}

		});
	};


	// Select Plugin
	$.fn.material_select = function (callback) {
		$(this).each(function () {
			var $select = $(this);

			if ($select.hasClass('browser-default')) {
				return; // Continue to next (return false breaks out of entire loop)
			}

			// Tear down structure if Select needs to be rebuilt
			var lastID = $select.data('select-id');
			if (lastID) {
				$select.parent().find('span.caret').remove();
				$select.parent().find('input').remove();

				$select.unwrap();
				$('ul#select-options-' + lastID).remove();
			}

			// If destroying the select, remove the selelct-id and reset it to it's uninitialized state.
			if (callback === 'destroy') {
				$select.data('select-id', null).removeClass('initialized');
				return;
			}

			var uniqueID = Materialize.guid();
			$select.data('select-id', uniqueID);
			var wrapper = $('<div class="select-wrapper"></div>');
			wrapper.addClass($select.attr('class'));
			var options = $('<ul id="select-options-' + uniqueID + '" class="dropdown-content select-dropdown"></ul>');
			var selectOptions = $select.children('option');

			var label;
			if ($select.find('option:selected') !== undefined) {
				label = $select.find('option:selected');
			} else {
				label = options.first();
			}


			// Create Dropdown structure
			selectOptions.each(function () {
				// Add disabled attr if disabled
				options.append($('<li class="' + (($(this).is(':disabled')) ? 'disabled' : '') + '"><span>' + $(this).html() + '</span></li>'));
			});


			options.find('li').each(function (i) {
				var $curr_select = $select;
				$(this).click(function () {
					// Check if option element is disabled
					if (!$(this).hasClass('disabled')) {
						$curr_select.find('option').eq(i).prop('selected', true);
						// Trigger onchange() event
						$curr_select.trigger('change');
						$curr_select.siblings('input.select-dropdown').val($(this).text());
						if (typeof callback !== 'undefined') {
							callback();
						}
					}
				});

			});

			// Wrap Elements
			$select.wrap(wrapper);
			// Add Select Display Element
			var dropdownIcon = $('<span class="caret">&#9660;</span>');
			if ($select.is(':disabled')) {
				dropdownIcon.addClass('disabled');
			}

			// escape double quotes
			var sanitizedLabelHtml = label.html().replace(/"/g, '&quot;');

			var $newSelect = $('<input type="text" class="select-dropdown" readonly="true" ' + (($select.is(':disabled')) ? 'disabled' : '') +
				' data-activates="select-options-' +
				uniqueID + '" value="' + sanitizedLabelHtml + '"/>');
			$select.before($newSelect);
			$newSelect.before(dropdownIcon);

			$('body').append(options);
			// Check if section element is disabled
			if (!$select.is(':disabled')) {
				$newSelect.dropdown({
					"hover": false
				});
			}

			// Copy tabindex
			if ($select.attr('tabindex')) {
				$($newSelect[0]).attr('tabindex', $select.attr('tabindex'));
			}

			$select.addClass('initialized');

			$newSelect.on('focus', function () {
				$(this).trigger('open');
				label = $(this).val();
				var selectedOption = options.find('li').filter(function () {
					return $(this).text().toLowerCase() === label.toLowerCase();
				})[0];
				activateOption(options, selectedOption);
			});

			$newSelect.on('blur', function () {
				$(this).trigger('close');
			});



			// Allow user to search by typing
			// this array is cleared after 1 second
			var filterQuery = [];

			var onKeyDown = function (event) {
				var newOption, activeOption;
				// TAB - switch to another input
				if (event.which === 9) {
					$newSelect.trigger('close');
					return;
				}

				// ARROW DOWN WHEN SELECT IS CLOSED - open select options
				if (event.which === 40 && !options.is(":visible")) {
					$newSelect.trigger('open');
					return;
				}

				// ENTER WHEN SELECT IS CLOSED - submit form
				if (event.which === 13 && !options.is(":visible")) {
					return;
				}

				event.preventDefault();

				// CASE WHEN USER TYPE LETTERS
				var letter = String.fromCharCode(event.which).toLowerCase();
				var nonLetters = [9, 13, 27, 38, 40];
				if (letter && (nonLetters.indexOf(event.which) === -1)) {
					filterQuery.push(letter);

					var string = filterQuery.join("");

					newOption = options.find('li').filter(function () {
						return $(this).text().toLowerCase().indexOf(string) === 0;
					})[0];

					if (newOption) {
						activateOption(options, newOption);
					}
				}

				// ENTER - select option and close when select options are opened
				if (event.which === 13) {
					activeOption = options.find('li.active:not(.disabled)')[0];
					if (activeOption) {
						$(activeOption).trigger('click');
						$newSelect.trigger('close');
					}
				}

				// ARROW DOWN - move to next not disabled option
				if (event.which === 40) {
					newOption = options.find('li.active').next('li:not(.disabled)')[0];
					if (newOption) {
						activateOption(options, newOption);
					}
				}

				// ESC - close options
				if (event.which === 27) {
					$newSelect.trigger('close');
				}

				// ARROW UP - move to previous not disabled option
				if (event.which === 38) {
					newOption = options.find('li.active').prev('li:not(.disabled)')[0];
					if (newOption) {
						activateOption(options, newOption);
					}
				}

				// Automaticaly clean filter query so user can search again by starting letters
				setTimeout(function () {
					filterQuery = [];
				}, 1000);
			};

			$newSelect.on('keydown', onKeyDown);
		});
	};

	$.fn.tooltip = function (options) {
		var timeout = null,
			counter = null,
			started = false,
			counterInterval = null,
			margin = 5;

		// Defaults
		var defaults = {
			delay: 350
		};

		// Remove tooltip from the activator
		if (options === "remove") {
			this.each(function () {
				$('#' + $(this).attr('data-tooltip-id')).remove();
			});
			return false;
		}

		options = $.extend(defaults, options);


		return this.each(function () {
			var tooltipId = Materialize.guid();
			var origin = $(this);
			origin.attr('data-tooltip-id', tooltipId);

			// Create Text span
			var tooltip_text = $('<span></span>').text(origin.attr('data-tooltip'));

			// Create tooltip
			var newTooltip = $('<div></div>');
			newTooltip.addClass('material-tooltip').append(tooltip_text)
				.appendTo($('body'))
				.attr('id', tooltipId);

			var backdrop = $('<div></div>').addClass('backdrop');
			backdrop.appendTo(newTooltip);
			backdrop.css({
				top: 0,
				left: 0
			});


			//Destroy previously binded events
			origin.off('mouseenter.tooltip mouseleave.tooltip');
			// Mouse In
			origin.on({
				'mouseenter.tooltip': function (e) {
					var tooltip_delay = origin.data("delay");
					tooltip_delay = (tooltip_delay === undefined || tooltip_delay === '') ? options.delay : tooltip_delay;
					counter = 0;
					counterInterval = setInterval(function () {
						counter += 10;
						if (counter >= tooltip_delay && started === false) {
							started = true;
							newTooltip.css({
								display: 'block',
								left: '0px',
								top: '0px'
							});

							// Set Tooltip text
							newTooltip.children('span').text(origin.attr('data-tooltip'));

							// Tooltip positioning
							var originWidth = origin.outerWidth();
							var originHeight = origin.outerHeight();
							var tooltipPosition = origin.attr('data-position');
							var tooltipHeight = newTooltip.outerHeight();
							var tooltipWidth = newTooltip.outerWidth();
							var tooltipVerticalMovement = '0px';
							var tooltipHorizontalMovement = '0px';
							var scale_factor = 8;

							if (tooltipPosition === "top") {
								// Top Position
								newTooltip.css({
									top: origin.offset().top - tooltipHeight - margin,
									left: origin.offset().left + originWidth / 2 - tooltipWidth / 2
								});
								tooltipVerticalMovement = '-10px';
								backdrop.css({
									borderRadius: '14px 14px 0 0',
									transformOrigin: '50% 90%',
									marginTop: tooltipHeight,
									marginLeft: (tooltipWidth / 2) - (backdrop.width() / 2)

								});
							}
							// Left Position
							else if (tooltipPosition === "left") {
								newTooltip.css({
									top: origin.offset().top + originHeight / 2 - tooltipHeight / 2,
									left: origin.offset().left - tooltipWidth - margin
								});
								tooltipHorizontalMovement = '-10px';
								backdrop.css({
									width: '14px',
									height: '14px',
									borderRadius: '14px 0 0 14px',
									transformOrigin: '95% 50%',
									marginTop: tooltipHeight / 2,
									marginLeft: tooltipWidth
								});
							}
							// Right Position
							else if (tooltipPosition === "right") {
								newTooltip.css({
									top: origin.offset().top + originHeight / 2 - tooltipHeight / 2,
									left: origin.offset().left + originWidth + margin
								});
								tooltipHorizontalMovement = '+10px';
								backdrop.css({
									width: '14px',
									height: '14px',
									borderRadius: '0 14px 14px 0',
									transformOrigin: '5% 50%',
									marginTop: tooltipHeight / 2,
									marginLeft: '0px'
								});
							} else {
								// Bottom Position
								newTooltip.css({
									top: origin.offset().top + origin.outerHeight() + margin,
									left: origin.offset().left + originWidth / 2 - tooltipWidth / 2
								});
								tooltipVerticalMovement = '+10px';
								backdrop.css({
									marginLeft: (tooltipWidth / 2) - (backdrop.width() / 2)
								});
							}

							// Calculate Scale to fill
							scale_factor = tooltipWidth / 8;
							if (scale_factor < 8) {
								scale_factor = 8;
							}
							if (tooltipPosition === "right" || tooltipPosition === "left") {
								scale_factor = tooltipWidth / 10;
								if (scale_factor < 6)
									scale_factor = 6;
							}

							newTooltip.velocity({
									marginTop: tooltipVerticalMovement,
									marginLeft: tooltipHorizontalMovement
								}, {
									duration: 350,
									queue: false
								})
								.velocity({
									opacity: 1
								}, {
									duration: 300,
									delay: 50,
									queue: false
								});
							backdrop.css({
									display: 'block'
								})
								.velocity({
									opacity: 1
								}, {
									duration: 55,
									delay: 0,
									queue: false
								})
								.velocity({
									scale: scale_factor
								}, {
									duration: 300,
									delay: 0,
									queue: false,
									easing: 'easeInOutQuad'
								});

						}
					}, 10); // End Interval

					// Mouse Out
				},
				'mouseleave.tooltip': function () {
					// Reset State
					clearInterval(counterInterval);
					counter = 0;

					// Animate back
					newTooltip.velocity({
						opacity: 0,
						marginTop: 0,
						marginLeft: 0
					}, {
						duration: 225,
						queue: false,
						delay: 225
					});
					backdrop.velocity({
						opacity: 0,
						scale: 1
					}, {
						duration: 225,
						delay: 275,
						queue: false,
						complete: function () {
							backdrop.css('display', 'none');
							newTooltip.css('display', 'none');
							started = false;
						}
					});
				}
			});
		});
	};

	$(document).ready(function () {

		var swipeLeft = false;
		var swipeRight = false;

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

		// Add active if form auto complete
		$(document).on('change', Materialize.input_selector, function () {
			if ($(this).val().length !== 0 || $(this).attr('placeholder') !== undefined) {
				$(this).siblings('label').addClass('active');
			}
			validate_field($(this));
		});


		Materialize.updateTextFields();


		// HTML DOM FORM RESET handling
		$(document).on('reset', function (e) {
			var formReset = $(e.target);
			if (formReset.is('form')) {
				formReset.find(Materialize.input_selector).removeClass('valid').removeClass('invalid');
				formReset.find(Materialize.input_selector).each(function () {
					if ($(this).attr('value') === '') {
						$(this).siblings('label, i').removeClass('active');
					}
				});

				// Reset select
				formReset.find('select.initialized').each(function () {
					var reset_text = formReset.find('option[selected]').text();
					formReset.siblings('input.select-dropdown').val(reset_text);
				});
			}
		});

		// Add active when element has focus
		$(document).on('focus', Materialize.input_selector, function () {
			$(this).siblings('label, i').addClass('active');
		});

		$(document).on('blur', Materialize.input_selector, function () {
			var $inputElement = $(this);
			if ($inputElement.val().length === 0 && $inputElement[0].validity.badInput !== true && $inputElement.attr('placeholder') === undefined) {
				$inputElement.siblings('label, i').removeClass('active');
			}

			if ($inputElement.val().length === 0 && $inputElement[0].validity.badInput !== true && $inputElement.attr('placeholder') !== undefined) {
				$inputElement.siblings('i').removeClass('active');
			}
			validate_field($inputElement);
		});


		// Textarea Auto Resize
		var hiddenDiv = $('.hiddendiv').first();
		if (!hiddenDiv.length) {
			hiddenDiv = $('<div class="hiddendiv common"></div>');
			$('body').append(hiddenDiv);
		}
		var text_area_selector = '.materialize-textarea';

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


		/****************
		 *  Range Input  *
		 ****************/

		/*var range_type = 'input[type=range]';
			var range_mousedown = false;
			var left;

			$(range_type).each(function () {
				var thumb = $('<span class="thumb"><span class="value"></span></span>');
				$(this).after(thumb);
			});

			var range_wrapper = '.range-field';
			$(document).on('change', range_type, function (e) {
				var thumb = $(this).siblings('.thumb');
				thumb.find('.value').html($(this).val());
			});

			$(document).on('input mousedown touchstart', range_type, function (e) {
				var thumb = $(this).siblings('.thumb');

				// If thumb indicator does not exist yet, create it
				if (thumb.length <= 0) {
					thumb = $('<span class="thumb"><span class="value"></span></span>');
					$(this).append(thumb);
				}

				// Set indicator value
				thumb.find('.value').html($(this).val());

				range_mousedown = true;
				$(this).addClass('active');

				if (!thumb.hasClass('active')) {
					thumb.velocity({
						height: "30px",
						width: "30px",
						top: "-20px",
						marginLeft: "-15px"
					}, {
						duration: 300,
						easing: 'easeOutExpo'
					});
				}

				if (e.pageX === undefined || e.pageX === null) { //mobile
					left = e.originalEvent.touches[0].pageX - $(this).offset().left;
				} else { // desktop
					left = e.pageX - $(this).offset().left;
				}
				var width = $(this).outerWidth();

				if (left < 0) {
					left = 0;
				} else if (left > width) {
					left = width;
				}
				thumb.addClass('active').css('left', left);
				thumb.find('.value').html($(this).val());


			});

			$(document).on('mouseup touchend', range_wrapper, function () {
				range_mousedown = false;
				$(this).removeClass('active');
			});

			$(document).on('mousemove touchmove', range_wrapper, function (e) {
				var thumb = $(this).children('.thumb');
				var left;
				if (range_mousedown) {
					if (!thumb.hasClass('active')) {
						thumb.velocity({
							height: '30px',
							width: '30px',
							top: '-20px',
							marginLeft: '-15px'
						}, {
							duration: 300,
							easing: 'easeOutExpo'
						});
					}
					if (e.pageX === undefined || e.pageX === null) { //mobile
						left = e.originalEvent.touches[0].pageX - $(this).offset().left;
					} else { // desktop
						left = e.pageX - $(this).offset().left;
					}
					var width = $(this).outerWidth();

					if (left < 0) {
						left = 0;
					} else if (left > width) {
						left = width;
					}
					thumb.addClass('active').css('left', left);
					thumb.find('.value').html(thumb.siblings(range_type).val());
				}
			});

			$(document).on('mouseout touchleave', range_wrapper, function () {
				if (!range_mousedown) {

					var thumb = $(this).children('.thumb');

					if (thumb.hasClass('active')) {
						thumb.velocity({
							height: '0',
							width: '0',
							top: '10px',
							marginLeft: '-6px'
						}, {
							duration: 100
						});
					}
					thumb.removeClass('active');
				}
			});
*/


	}); // End of $(document).ready


	var _idx = 0,
		isIE = false,
		_ie = isIE ? '-ie' : '',
		isMoz = false,
		history = [],



		int2Hex = function (i) {
			var h = i.toString(16);
			if (h.length === 1) {
				h = '0' + h;
			}
			return h;
		},
		st2Hex = function (s) {
			return int2Hex(Number(s));
		},

		toHex3 = function (c) {
			if (c && c.length > 10) { // IE9
				var p1 = 1 + c.indexOf('('),
					p2 = c.indexOf(')'),
					cs = c.substring(p1, p2).split(',');
				console.log(cs);
				return ['#', st2Hex(cs[0]), st2Hex(cs[1]), st2Hex(cs[2])].join('');
			} else {
				return c;
			}
		};

	jQuery.widget("evol.colorpicker", {

		version: '2.1',

		options: {
			color: null, // example default:'#31859B'
			showOn: 'both', // possible values 'focus','button','both'
			displayIndicator: true,
			history: true,
			strings: 'Pick A Color',
			cols: 9,
			rows: 4,
			type: 'colorpicker',
			gradientid: 0,
			extraClassnames: '',
			subThemeColors: ['f2f2f2', 'ddd9c3', 'c6d9f0', 'dbe5f1', 'f2dcdb', 'ebf1dd', 'e5e0ec', 'dbeef3', 'fdeada',
				'd8d8d8', 'c4bd97', '8db3e2', 'b8cce4', 'e5b9b7', 'd7e3bc', 'ccc1d9', 'b7dde8', 'fbd5b5',
				'bfbfbf', '938953', '548dd4', '95b3d7', 'd99694', 'c3d69b', 'b2a2c7', '92cddc', 'fac08f',
				'a5a5a5', '494429', '17365d', '366092', '953734', '76923c', '5f497a', '31859b', 'e36c09',
				'7f7f7f', '1d1b10', '0f243e', '244061', '632423', '4f6128', '3f3151', '205867', '974806'
			]

		},

		_create: function () {

			this._paletteIdx = 1;
			this._id = 'evo-cp' + _idx++;
			this._enabled = true;
			var self = this;

			switch (this.element.get(0).tagName) {
			case 'INPUT':
				var color = this.options.color;

				this._isPopup = true;
				this._palette = null;
				if (color !== null) {
					this.element.val(color);
				} else {
					var v = this.element.val();
					if (v !== '') {
						color = this.options.color = v;
					}
				}
				this.element.addClass('colorPicker ' + this._id);


				if (this.options.type === 'gradient') {
					this.options.rows = this.options.subThemeColors.length;
					var thisgradient = this.getGradient(this.options.gradientid);
					//console.log(thisgradient);
					this.element.wrap('<span class="gradientpickerwrap"></span>')
						.after('<div class="gradientpicker ' + ((this.options.showOn === 'focus') ? '' : 'evo-pointer ') + 'evo-colorind' + (isMoz ? '-ff' : _ie) + '"  style="' + thisgradient +
							'"></div>');
				} else {
					this.element.wrap('<div class="colorpickerwrap" style="width:' + (this.element.width() + 32) + 'px;' + (isIE ? 'margin-bottom:-21px;' : '') + (isMoz ? 'padding:1px 0;' :
							'') + '"></div>')
						.after('<div class="colorpickerafter ' + ((this.options.showOn === 'focus') ? '' : 'evo-pointer ') + 'evo-colorind' + (isMoz ? '-ff' : _ie) + '" ' + (color !== null ?
							'style="background-color:' + color + '"' : '') + '></div>');
				}


				this.element.on('keyup onpaste', function (evt) {
					var thisvalue = jQuery(this).val();
					if (thisvalue !== self.options.color) {
						self._setValue(thisvalue, true);
					}
				});

				var showOn = this.options.showOn;
				if (showOn === 'both' || showOn === 'focus') {
					this.element.on('focus', function () {
						self.showPalette();
					});
				}
				if (showOn === 'both' || showOn === 'button') {
					this.element.next().on('click', function (evt) {
						evt.stopPropagation();
						self.showPalette();
					});
				}
				break;
			default:
				this._isPopup = false;
				this._palette = this.element.html(this._paletteHTML())
					.attr('aria-haspopup', 'true');
				this._bindColors();
			}
			if (color !== null && this.options.history) {
				this._add2History(color);
			}
		},

		_paletteHTML: function () {
			var h = [],
				pIdx = this._paletteIdx = Math.abs(this._paletteIdx),
				opts = this.options,
				labels = opts.strings.split(',');
			h.push('<div  class="lecolorpicker evo-pop', _ie, this.options.extraClassnames, '"',
				this._isPopup ? ' style="position:absolute"' : '', '>');
			// palette
			h.push('<span>', this['_paletteHTML' + pIdx](), '</span>');
			// links
			h.push('<div class="evo-more"><a href="javascript:void(0)">', labels[1 + pIdx], '</a>');

			h.push('</div>');

			h.push('</div>');
			return h.join('');
		},

		_colorIndHTML: function (c, fl) {
			var h = [];
			h.push('<div class="evo-color" style="float:left"><div style="');
			h.push(c ? 'background-color:' + c : 'display:none');
			if (isIE) {
				h.push('" class="evo-colorbox-ie"></div><span class=".evo-colortxt-ie" ');
			} else {
				h.push('"></div><span ');
			}
			h.push(c ? '>' + c + '</span>' : '/>');
			h.push('</div>');
			return h.join('');
		},

		_paletteHTML1: function () {
			var h = [],
				labels = this.options.strings.split(','),
				oTD = '<td  class="colorpickersquare" style=" ',
				cTD = isIE ? '"><div style="width:2px;"></div>' : '"><span>',
				fTD = '</span></td>',
				oTRTH = '<tr><th colspan="' + this.options.cols + '" class="ui-widget-content">';
			// base theme colors



			h.push('<table class="evo-palette', _ie, '">', oTRTH, labels[0], '</th></tr>');


			//console.log('subThemeColors',this.options.subThemeColors,this.options);
			// theme colors

			for (var r = 0; r < this.options.rows; r++) {
				h.push('<tr class="in">');
				if (this.options.type === 'colorpicker') {
					for (var i = 0; i < this.options.cols; i++) {
						h.push(oTD, 'background: #' + this.options.subThemeColors[r * this.options.cols + i] + ';" data-color="' + this.options.subThemeColors[r * this.options.cols + i], cTD,
							fTD);
					}
				} else if (this.options.type === 'gradient') {
					h.push(oTD);
					h.push(this.getGradient(r));
					h.push(';width: 150px;border:1px solid #EEE" data-gradient="' + r, cTD, fTD);
				}
				h.push('</tr>');

			}


			h.push('</table>');
			return h.join('');
		},

		getGradient: function (gradientid) {
			var thisgradient = [];
			thisgradient.push('background: linear-gradient(to right ');
			var colorlength = this.options.subThemeColors[gradientid][1].length;

			for (var i = 0; i < colorlength; i++) {
				thisgradient.push(' , ', this.options.subThemeColors[gradientid][1][i], ' ', 10 * (10 * i / colorlength), '% ');
			}
			thisgradient.push(')');

			thisgradient = thisgradient.join('');
			return thisgradient;
		},

		showPalette: function () {
			if (this._enabled) {
				jQuery('.colorPicker').not('.' + this._id).colorpicker('hidePalette');
				if (this._palette === null) {
					this._palette = this.element.next()
						.after(this._paletteHTML()).next()
						.on('click', function (evt) {
							evt.stopPropagation();
						});
					this._bindColors();
					var that = this;
					jQuery(document.body).on('click.' + this._id, function (evt) {
						if (evt.target !== that.element.get(0)) {
							that.hidePalette();
						}
					});
				}
			}
			return this;
		},

		hidePalette: function () {
			if (this._isPopup && this._palette) {
				jQuery(document.body).off('click.' + this._id);
				var that = this;
				this._palette.off('mouseover click', 'td')
					.fadeOut(function () {
						that._palette.remove();
						that._palette = that._cTxt = null;
					})
					.find('.evo-more a').off('click');
			}
			return this;
		},

		_bindColors: function () {
			var es = this._palette.find('div.evo-color'),
				sel = this.options.history ? 'td,.evo-cHist div' : 'td';
			this._cTxt1 = es.eq(0).children().eq(0);
			this._cTxt2 = es.eq(1).children().eq(0);
			var that = this;
			this._palette
				.on('click', sel, function (evt) {
					if (that._enabled) {
						if (that.options.type === 'colorpicker') {
							var c = toHex3(jQuery(this).data('color'));
							that._setValue(String(c));
						} else if (that.options.type === 'gradient') {
							var gradientid = jQuery(this).data('gradient');


							that.options.gradientid = gradientid;
							that._setValue(String(gradientid));
							jQuery('.gradientpicker', that.element.parent()).attr('style', that.getGradient(gradientid));
						}


					}
				})
				.on('mouseover', sel, function (evt) {
					if (that._enabled) {
						var c = toHex3(jQuery(this).data('color'));
						if (that.options.displayIndicator) {
							that._setColorInd(c, 2);
						}
						that.element.trigger('mouseover.color', c);
					}
				})
				.find('.evo-more a').on('click', function () {
					that._switchPalette(this);
				});
		},

		val: function (value) {
			if (typeof value === 'undefined') {
				return this.options.color;
			} else {
				this._setValue(value);
				return this;
			}
		},

		_setValue: function (c, noHide) {
			c = c || '#999999';
			c = String(c).replace(/ /g, '');
			this.options.color = c;
			if (this._isPopup) {
				if (!noHide) {
					this.hidePalette();
				}
				this.element.val(c)
					.next().attr('style', 'background-color:' + c);
			} else {
				this._setColorInd(c, 1);
			}
			if (this.options.history && this._paletteIdx > 0) {
				this._add2History(c);
			}

			this.element.trigger('change.color', c);
		},

		_setColorInd: function (c, idx) {
			this['_cTxt' + idx].attr('style', 'background-color:' + c)
				.next().html(c);
		},

		_setOption: function (key, value) {
			if (key === 'color') {
				this._setValue(value, true);
			} else {
				this.options[key] = value;
			}
		},

		_add2History: function (c) {
			var iMax = history.length;
			// skip color if already in history
			for (var i = 0; i < iMax; i++) {
				if (c === history[i]) {
					return;
				}
			}
			// limit of 28 colors in history
			if (iMax > 27) {
				history.shift();
			}
			// add to history
			history.push(c);

		},

		enable: function () {
			var e = this.element;
			if (this._isPopup) {
				e.removeAttr('disabled');
			} else {
				e.css({
					'opacity': '1',
					'pointer-events': 'auto'
				});
			}
			if (this.options.showOn !== 'focus') {
				this.element.next().addClass('evo-pointer');
			}
			e.removeAttr('aria-disabled');
			this._enabled = true;
			return this;
		},

		disable: function () {
			var e = this.element;
			if (this._isPopup) {
				e.attr('disabled', 'disabled');
			} else {
				this.hidePalette();
				e.css({
					'opacity': '0.3',
					'pointer-events': 'none'
				});
			}
			if (this.options.showOn !== 'focus') {
				this.element.next().removeClass('evo-pointer');
			}
			e.attr('aria-disabled', 'true');
			this._enabled = false;
			return this;
		},

		isDisabled: function () {
			return !this._enabled;
		},

		destroy: function () {
			jQuery(document.body).off('click.' + this._id);
			if (this._palette) {
				this._palette.off('mouseover click', 'td')
					.find('.evo-more a').off('click');
				if (this._isPopup) {
					this._palette.remove();
				}
				this._palette = this._cTxt = null;
			}
			if (this._isPopup) {
				this.element
					.next().off('click').remove()
					.end().off('focus').unwrap();
			}
			this.element.removeClass('colorPicker ' + this.id).empty();
			jQuery.Widget.prototype.destroy.call(this);
		}

	});

	return jQuery;
});
