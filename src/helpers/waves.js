/*!
 * Waves v0.6.4
 * http://fian.my.id/Waves
 *
 * Copyright 2014 Alfiana E. Sibuea and other contributors
 * Released under the MIT license
 * https://github.com/fians/Waves/blob/master/LICENSE
 */





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

$(document).ready(function () {
    // Add active if form auto complete
    $(document).on('change', Materialize.input_selector, function () {
        if ($(this).val().length !== 0 || $(this).attr('placeholder') !== undefined) {
            $(this).siblings('label').addClass('active');
        }
        validate_field($(this));
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
});





// Find exact position of element
function isWindow(obj) {
    return obj !== null && obj === obj.window;
}

function getWindow(elem) {
    return isWindow(elem) ? elem : elem.nodeType === 9 && elem.defaultView;
}

function offset(elem) {
    var docElem, win,
        box = {
            top: 0,
            left: 0
        },
        doc = elem && elem.ownerDocument;

    docElem = doc.documentElement;

    if (typeof elem.getBoundingClientRect !== typeof undefined) {
        box = elem.getBoundingClientRect();
    }
    win = getWindow(doc);
    return {
        top: box.top + win.pageYOffset - docElem.clientTop,
        left: box.left + win.pageXOffset - docElem.clientLeft
    };
}

function convertStyle(obj) {
    var style = '';

    for (var a in obj) {
        if (obj.hasOwnProperty(a)) {
            style += (a + ':' + obj[a] + ';');
        }
    }

    return style;
}

var Effect = {

    // Effect delay
    duration: 750,

    show: function (e, element) {

        // Disable right click
        if (e.button === 2) {
            return false;
        }

        var el = element || this;

        // Create ripple
        var ripple = document.createElement('div');
        ripple.className = 'waves-ripple';
        el.appendChild(ripple);

        // Get click coordinate and element witdh
        var pos = offset(el);
        var relativeY = (e.pageY - pos.top);
        var relativeX = (e.pageX - pos.left);
        var scale = 'scale(' + ((el.clientWidth / 100) * 10) + ')';

        // Support for touch devices
        if ('touches' in e) {
            relativeY = (e.touches[0].pageY - pos.top);
            relativeX = (e.touches[0].pageX - pos.left);
        }

        // Attach data to element
        ripple.setAttribute('data-hold', Date.now());
        ripple.setAttribute('data-scale', scale);
        ripple.setAttribute('data-x', relativeX);
        ripple.setAttribute('data-y', relativeY);

        // Set ripple position
        var rippleStyle = {
            'top': relativeY + 'px',
            'left': relativeX + 'px'
        };

        ripple.className = ripple.className + ' waves-notransition';
        ripple.setAttribute('style', convertStyle(rippleStyle));
        ripple.className = ripple.className.replace('waves-notransition', '');

        // Scale the ripple
        rippleStyle['-webkit-transform'] = scale;
        rippleStyle['-moz-transform'] = scale;
        rippleStyle['-ms-transform'] = scale;
        rippleStyle['-o-transform'] = scale;
        rippleStyle.transform = scale;
        rippleStyle.opacity = '1';

        rippleStyle['-webkit-transition-duration'] = Effect.duration + 'ms';
        rippleStyle['-moz-transition-duration'] = Effect.duration + 'ms';
        rippleStyle['-o-transition-duration'] = Effect.duration + 'ms';
        rippleStyle['transition-duration'] = Effect.duration + 'ms';

        rippleStyle['-webkit-transition-timing-function'] = 'cubic-bezier(0.250, 0.460, 0.450, 0.940)';
        rippleStyle['-moz-transition-timing-function'] = 'cubic-bezier(0.250, 0.460, 0.450, 0.940)';
        rippleStyle['-o-transition-timing-function'] = 'cubic-bezier(0.250, 0.460, 0.450, 0.940)';
        rippleStyle['transition-timing-function'] = 'cubic-bezier(0.250, 0.460, 0.450, 0.940)';

        ripple.setAttribute('style', convertStyle(rippleStyle));
    },

    hide: function (e) {
        TouchHandler.touchup(e);

        var el = this;
        var width = el.clientWidth * 1.4;

        // Get first ripple
        var ripple = null;
        var ripples = el.getElementsByClassName('waves-ripple');
        if (ripples.length > 0) {
            ripple = ripples[ripples.length - 1];
        } else {
            return false;
        }

        var relativeX = ripple.getAttribute('data-x');
        var relativeY = ripple.getAttribute('data-y');
        var scale = ripple.getAttribute('data-scale');

        // Get delay beetween mousedown and mouse leave
        var diff = Date.now() - Number(ripple.getAttribute('data-hold'));
        var delay = 350 - diff;

        if (delay < 0) {
            delay = 0;
        }

        // Fade out ripple after delay
        setTimeout(function () {
            var style = {
                'top': relativeY + 'px',
                'left': relativeX + 'px',
                'opacity': '0',

                // Duration
                '-webkit-transition-duration': Effect.duration + 'ms',
                '-moz-transition-duration': Effect.duration + 'ms',
                '-o-transition-duration': Effect.duration + 'ms',
                'transition-duration': Effect.duration + 'ms',
                '-webkit-transform': scale,
                '-moz-transform': scale,
                '-ms-transform': scale,
                '-o-transform': scale,
                'transform': scale,
            };

            ripple.setAttribute('style', convertStyle(style));

            setTimeout(function () {
                try {
                    el.removeChild(ripple);
                } catch (e) {
                    return false;
                }
            }, Effect.duration);
        }, delay);
    },

    // Little hack to make <input> can perform waves effect
    wrapInput: function (elements) {
        for (var a = 0; a < elements.length; a++) {
            var el = elements[a];

            if (el.tagName.toLowerCase() === 'input') {
                var parent = el.parentNode;

                // If input already have parent just pass through
                if (parent.tagName.toLowerCase() === 'i' && parent.className.indexOf('waves-effect') !== -1) {
                    continue;
                }

                // Put element class and style to the specified parent
                var wrapper = document.createElement('i');
                wrapper.className = el.className + ' waves-input-wrapper';

                var elementStyle = el.getAttribute('style');

                if (!elementStyle) {
                    elementStyle = '';
                }

                wrapper.setAttribute('style', elementStyle);

                el.className = 'waves-button-input';
                el.removeAttribute('style');

                // Put element as child
                parent.replaceChild(wrapper, el);
                wrapper.appendChild(el);
            }
        }
    }
};


/**
 * Disable mousedown event for 500ms during and after touch
 */
var TouchHandler = {
    /* uses an integer rather than bool so there's no issues with
     * needing to clear timeouts if another touch event occurred
     * within the 500ms. Cannot mouseup between touchstart and
     * touchend, nor in the 500ms after touchend. */
    touches: 0,
    allowEvent: function (e) {
        var allow = true;

        if (e.type === 'touchstart') {
            TouchHandler.touches += 1; //push
        } else if (e.type === 'touchend' || e.type === 'touchcancel') {
            setTimeout(function () {
                if (TouchHandler.touches > 0) {
                    TouchHandler.touches -= 1; //pop after 500ms
                }
            }, 500);
        } else if (e.type === 'mousedown' && TouchHandler.touches > 0) {
            allow = false;
        }

        return allow;
    },
    touchup: function (e) {
        TouchHandler.allowEvent(e);
    }
};


/**
 * Delegated click handler for .waves-effect element.
 * returns null when .waves-effect element not in "click tree"
 */
function getWavesEffectElement(e) {
    if (TouchHandler.allowEvent(e) === false) {
        return null;
    }

    var element = null;
    var target = e.target || e.srcElement;

    while (target.parentElement !== null) {
        if (!(target instanceof SVGElement) && target.className.indexOf('waves-effect') !== -1) {
            element = target;
            break;
        } else if (target.classList.contains('waves-effect')) {
            element = target;
            break;
        }
        target = target.parentElement;
    }

    return element;
}

/**
 * Bubble the click and show effect if .waves-effect elem was found
 */
function showEffect(e) {
    var element = getWavesEffectElement(e);

    if (element !== null) {
        Effect.show(e, element);

        if ('ontouchstart' in window) {
            element.addEventListener('touchend', Effect.hide, false);
            element.addEventListener('touchcancel', Effect.hide, false);
        }

        element.addEventListener('mouseup', Effect.hide, false);
        element.addEventListener('mouseleave', Effect.hide, false);
    }
}

Waves.displayEffect = function (options) {
    options = options || {};

    if ('duration' in options) {
        Effect.duration = options.duration;
    }

    //Wrap input inside <i> tag
    Effect.wrapInput($$('.waves-effect'));

    if ('ontouchstart' in window) {
        document.body.addEventListener('touchstart', showEffect, false);
    }

    document.body.addEventListener('mousedown', showEffect, false);
};

/**
 * Attach Waves to an input element (or any element which doesn't
 * bubble mouseup/mousedown events).
 *   Intended to be used with dynamically loaded forms/inputs, or
 * where the user doesn't want a delegated click handler.
 */
Waves.attach = function (element) {
    //FUTURE: automatically add waves classes and allow users
    // to specify them with an options param? Eg. light/classic/button
    if (element.tagName.toLowerCase() === 'input') {
        Effect.wrapInput([element]);
        element = element.parentElement;
    }

    if ('ontouchstart' in window) {
        element.addEventListener('touchstart', showEffect, false);
    }

    element.addEventListener('mousedown', showEffect, false);
};

window.Waves = Waves;

document.addEventListener('DOMContentLoaded', function () {
    Waves.displayEffect();
}, false);

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


    $('ul.tabs').tabs();
    // Dismissible Collections



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




export {
    Materialize
};
export default Materialize;
