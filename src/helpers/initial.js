import {
    $
} from './velocity.js';



var Materialize = {},
    document = window.document;

var Waves = {},
    $$ = document.querySelectorAll.bind(document);

$.fn.stop = function () {
    return this.each(function () {
        $(this).velocity('stop');
    });
};


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
// Unique ID
Materialize.guid = guidfn();

$.fn.material_select = function (callback) {

    // Make option as selected and scroll to selected position
    var activateOption = function (collection, newOption) {
        collection.find('li.active').removeClass('active');
        $(newOption).addClass('active');
        collection.scrollTo(newOption);
    };


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
