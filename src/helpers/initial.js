import jQuery from 'jquery_shim';

import {
    Velocity
} from 'velocity';
import {
    Hammer
} from 'hammerjs';

var $_GLOBAL = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : Function('return this')();

var $ = jQuery,
    Materialize = {},
    document = window.document;

function hammerify(el, options) {
    var $el = $(el);
    if (!$el.data("hammer")) {
        $el.data("hammer", new Hammer($el[0], options));
    }
}

$.fn.hammer = function (options) {
    return this.each(function () {
        hammerify(this, options);
    });
};

// extend the emit method to also trigger jQuery events
Hammer.Manager.prototype.emit = (function (originalEmit) {
    return function (type, data) {
        originalEmit.call(this, type, data);
        $(this.element).trigger({
            type: type,
            gesture: data
        });
    };
})(Hammer.Manager.prototype.emit);


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


jQuery.easing = {
    linear: function (p) {
        return p;
    },
    swing: function (p) {
        return 0.5 - Math.cos(p * Math.PI) / 2;
    },
    jswing: function (p) {
        return 0.5 - Math.cos(p * Math.PI) / 2;
    },
    easeInOutMaterial: function (x, t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t + b;
        return c / 4 * ((t -= 2) * t * t + 2) + b;
    },
    _default: "swing"
};


jQuery.extend(jQuery.easing, {
    def: 'easeOutQuad',
    swing: function (x, t, b, c, d) {
        //alert(jQuery.easing.default);
        return jQuery.easing[jQuery.easing.def](x, t, b, c, d);
    },
    easeInQuad: function (x, t, b, c, d) {
        return c * (t /= d) * t + b;
    },
    easeOutQuad: function (x, t, b, c, d) {
        return -c * (t /= d) * (t - 2) + b;
    },
    easeInOutQuad: function (x, t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t + b;
        return -c / 2 * ((--t) * (t - 2) - 1) + b;
    },
    easeInCubic: function (x, t, b, c, d) {
        return c * (t /= d) * t * t + b;
    },
    easeOutCubic: function (x, t, b, c, d) {
        return c * ((t = t / d - 1) * t * t + 1) + b;
    },
    easeInOutCubic: function (x, t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
        return c / 2 * ((t -= 2) * t * t + 2) + b;
    },
    easeInQuart: function (x, t, b, c, d) {
        return c * (t /= d) * t * t * t + b;
    },
    easeOutQuart: function (x, t, b, c, d) {
        return -c * ((t = t / d - 1) * t * t * t - 1) + b;
    },
    easeInOutQuart: function (x, t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
        return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
    },
    easeInQuint: function (x, t, b, c, d) {
        return c * (t /= d) * t * t * t * t + b;
    },
    easeOutQuint: function (x, t, b, c, d) {
        return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
    },
    easeInOutQuint: function (x, t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t * t * t * t + b;
        return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
    },
    easeInSine: function (x, t, b, c, d) {
        return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
    },
    easeOutSine: function (x, t, b, c, d) {
        return c * Math.sin(t / d * (Math.PI / 2)) + b;
    },
    easeInOutSine: function (x, t, b, c, d) {
        return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
    },
    easeInExpo: function (x, t, b, c, d) {
        return (t == 0) ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
    },
    easeOutExpo: function (x, t, b, c, d) {
        return (t == d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
    },
    easeInOutExpo: function (x, t, b, c, d) {
        if (t == 0) return b;
        if (t == d) return b + c;
        if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
        return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
    },
    easeInCirc: function (x, t, b, c, d) {
        return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
    },
    easeOutCirc: function (x, t, b, c, d) {
        return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
    },
    easeInOutCirc: function (x, t, b, c, d) {
        if ((t /= d / 2) < 1) return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
        return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
    },
    easeInElastic: function (x, t, b, c, d) {
        var s = 1.70158;
        var p = 0;
        var a = c;
        if (t == 0) return b;
        if ((t /= d) == 1) return b + c;
        if (!p) p = d * .3;
        if (a < Math.abs(c)) {
            a = c;
            var s = p / 4;
        } else var s = p / (2 * Math.PI) * Math.asin(c / a);
        return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
    },
    easeOutElastic: function (x, t, b, c, d) {
        var s = 1.70158;
        var p = 0;
        var a = c;
        if (t == 0) return b;
        if ((t /= d) == 1) return b + c;
        if (!p) p = d * .3;
        if (a < Math.abs(c)) {
            a = c;
            var s = p / 4;
        } else var s = p / (2 * Math.PI) * Math.asin(c / a);
        return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
    },
    easeInOutElastic: function (x, t, b, c, d) {
        var s = 1.70158;
        var p = 0;
        var a = c;
        if (t == 0) return b;
        if ((t /= d / 2) == 2) return b + c;
        if (!p) p = d * (.3 * 1.5);
        if (a < Math.abs(c)) {
            a = c;
            var s = p / 4;
        } else var s = p / (2 * Math.PI) * Math.asin(c / a);
        if (t < 1) return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
        return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b;
    },
    easeInBack: function (x, t, b, c, d, s) {
        if (s == undefined) s = 1.70158;
        return c * (t /= d) * t * ((s + 1) * t - s) + b;
    },
    easeOutBack: function (x, t, b, c, d, s) {
        if (s == undefined) s = 1.70158;
        return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
    },
    easeInOutBack: function (x, t, b, c, d, s) {
        if (s == undefined) s = 1.70158;
        if ((t /= d / 2) < 1) return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
        return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
    },
    easeInBounce: function (x, t, b, c, d) {
        return c - jQuery.easing.easeOutBounce(x, d - t, 0, c, d) + b;
    },
    easeOutBounce: function (x, t, b, c, d) {
        if ((t /= d) < (1 / 2.75)) {
            return c * (7.5625 * t * t) + b;
        } else if (t < (2 / 2.75)) {
            return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b;
        } else if (t < (2.5 / 2.75)) {
            return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b;
        } else {
            return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b;
        }
    },
    easeInOutBounce: function (x, t, b, c, d) {
        if (t < d / 2) return jQuery.easing.easeInBounce(x, t * 2, 0, c, d) * .5 + b;
        return jQuery.easing.easeOutBounce(x, t * 2 - d, 0, c, d) * .5 + c * .5 + b;
    }
});
