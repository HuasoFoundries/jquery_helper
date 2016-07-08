"format amd";
define([
	'jquery',
	'velocity',
	'hammerjs',
	'./materialize.js',
	'materialize-css/jquery.hammer.js',
	'velocity/velocity.ui.js',
	'jquery-ui/ui/core.js',
	'jquery-ui/ui/widget.js',
	'jquery-ui/ui/mouse.js',
	'jquery-ui/ui/position.js',
	'jquery-ui/ui/draggable.js',
	'jquery-ui/ui/droppable.js',
	'jquery-ui/ui/resizable.js',
	'jquery-ui/ui/selectable.js',
	'jquery-ui/ui/sortable.js',
	'jquery-ui/ui/progressbar.js',
	'./material_amd/tabs.js',
	'./plugins/jquery.ajax.progress.js',
	'./plugins/jquery.hotkeys.js',
	'./plugins/jquery.ui.rotatable.js',
	'./plugins/jquery.evol.colorpicker.js',

	'jquery.cookie',
	'jquery.waitforChild',
	'jquery-serializejson'

], function (jQuery, Velocity, hammerjs, Materialize) {

	var $ = jQuery;



	var guidfn = (function () {
		function s4() {
			return Math.floor((1 + Math.random()) * 0x10000)
				.toString(16)
				.substring(1);
		}
		return function () {
			return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
				s4() + '-' + s4() + s4() + s4();
		};
	});

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
	Materialize.guid = guidfn();

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
				label = selectOptions.first();
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

		console.debug({
			option: option,
			options: options
		});

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


	});


	return jQuery;
});
