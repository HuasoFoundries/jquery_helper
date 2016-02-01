define([
	'jquery',
	'jquery.cookie',
	'jquery.waitforChild',
	'jquery-serializejson',
	'jquery-csv',
	'jquery-ui/ui/core',
	'jquery-ui/ui/widget',
	'jquery-ui/ui/mouse',
	'jquery-ui/ui/position',
	'jquery-ui/ui/draggable',
	'jquery-ui/ui/droppable',
	'jquery-ui/ui/resizable',
	'jquery-ui/ui/selectable',
	'jquery-ui/ui/sortable',
	'jquery-ui/ui/autocomplete',
	'jquery-ui/ui/menu',
	'jquery-ui/ui/progressbar',
	'jquery-ui/ui/slider',
	'jquery-ui/ui/tabs',


	'./plugins/jquery-impromptu',
	'./plugins/jquery.ajax.progress',
	'./plugins/jquery.hotkeys',
	'./plugins/jquery.iconpicker',
	'./plugins/jquery.ui.rotatable',
	'css!./colorpicker.css'

], function (jQuery) {

	'use strict';

	jQuery.error = function (message) {
		console.warn('jQuery.error', message);
		globalvars.trackJavaScriptError('jQuery', message, navigator.userAgent);

	};
	// Track AJAX errors (jQuery API)
	jQuery(document).ajaxError(function (event, jqXHR, ajaxSettings, thrownError) {
		console.debug('ajaxError', {
			jqXHR: jqXHR,
			thrownError: thrownError
		});

		// Si viene el atributo responseJSON, tirarlo a la consola como tabla
		if (jqXHR.responseJSON) {
			globalvars.jsonErrorDump(jqXHR.responseJSON);
		}


		globalvars.trackJavaScriptError('jQuery Ajax', ajaxSettings.url, JSON.stringify({
			result: event.result,
			status: jqXHR.status,
			statusText: jqXHR.statusText,
			crossDomain: ajaxSettings.crossDomain,
			dataType: ajaxSettings.dataType
		}));
	});





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
