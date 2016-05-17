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

	return Materialize;
});
