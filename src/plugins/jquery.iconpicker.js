define([
	'jquery',
	'lodash',
	'css!./iconpicker.css'
], function (jQuery, _) {


	_.templateSettings = {
		interpolate: /\{\{(.+?)\}\}/g,
		evaluate: /\{\{(.+?)\}\}/g,
		escape: /\{\{-(.+?)\}\}/g
	};

	jQuery.widget("ui.iconpicker", {

		version: '0.1.0',

		options: {
			colorset: [
				["000066", "660066", "660000", "CC3300", "666600", "006600", "006666", "333333"],
				["000099", "990099", "990000", "FF3300", "999900", "009900", "009999", "666666"],
				["0000CC", "CC00CC", "CC0000", "FF6600", "CCCC00", "00CC00", "00CCCC", "999999"],
				["0000FF", "FF00FF", "FF0000", "FF9900", "FFFF00", "00FF00", "00FFFF", "CCCCCC"]
			],
			color: '#123456',
			characters: [{
				"character": "e834",
				"classname": "Check Box"
			}, {
				"character": "e851",
				"classname": "Account Box"
			}, {
				"character": "e885",
				"classname": "Grade"
			}, {
				"character": "e88a",
				"classname": "Home"
			}, {
				"character": "e88c",
				"classname": "Hourglass Full"
			}, {
				"character": "e892",
				"classname": "Label"
			}, {
				"character": "e894",
				"classname": "Language"
			}, {
				"character": "e897",
				"classname": "Lock"
			}, {
				"character": "e8a8",
				"classname": "Perm Phone Msg"
			}, {
				"character": "e8cd",
				"classname": "Speaker Notes"
			}, {
				"character": "e8f4",
				"classname": "Visibility"
			}, {
				"character": "e905",
				"classname": "Flight Takeoff"
			}, {
				"character": "e227",
				"classname": "Attach Money"
			}, {
				"character": "e872",
				"classname": "Delete"
			}, {
				"character": "e53e",
				"classname": "Local Atm"
			}, {
				"character": "e407",
				"classname": "Nature People"
			}, {
				"character": "e32a",
				"classname": "Security"
			}, {
				"character": "e84f",
				"classname": "Account Balance"
			}, {
				"character": "e548",
				"classname": "Local Hospital"
			}, {
				"character": "e545",
				"classname": "Local Florist"
			}, {
				"character": "e8cc",
				"classname": "Shopping Cart"
			}, {
				"character": "e559",
				"classname": "Local Taxi"
			}, {
				"character": "e55f",
				"classname": "Place"
			}, {
				"character": "e80c",
				"classname": "School"
			}, {
				"character": "e04b",
				"classname": "Videocam"
			}, {
				"character": "e836",
				"classname": "Radio Button Unchecked"
			}, {
				"character": "e837",
				"classname": "Radio Button Checked"
			}, {
				"character": "e80b",
				"classname": "Public"
			}, {
				"character": "e7ef",
				"classname": "Group"
			}, {
				"character": "e52f",
				"classname": "Directions Bike"
			}, {
				"character": "e534",
				"classname": "Directions Railway"
			}, {
				"character": "e7fd",
				"classname": "Person"
			}],

			buttonCharTemplate: _.template('<button class="newCharacter" style="color:{{thecolor}};" value="{{character}}|{{classname}}" ></button>'),
			buttonColorTemplate: _.template('<button class="iconNew" style="color:{{thecolor}};" value="{{thecolor}}" ></button>'),

			readOnly: false,
			iconclass: null,
			character: 'e8b4',
			container: '#datasets',
			placement: 'top',
			onChange: function (thiscolor, thischaracter, thisclassname) {
				console.log({
					color: thiscolor,
					character: thischaracter,
					classname: thisclassname
				});
			}

		},


		_create: function () {
			var _this = this,
				thetable = jQuery('<table class="insidepopover iconpicker_character"></table>'),

				tr;



			if (this.options.color === '#123456') {
				this.options.color = this.options.colorset[Math.floor(Math.random() * 4)][Math.floor(Math.random() * 8)];
			}

			_this.character = _this.options.character;


			var hideIconpicker = function () {

				_this.element.popover('hide');
			};

			var changeCharacter = function (e) {
				var jqThis = jQuery(this),
					newcharacter = jqThis.val().split('|');


				thetable.find('.newCharacter').removeClass('selected');

				_this.setElementCharacter(_this.element.find('i'), newcharacter[0]);

				_this.setElementCharacter(thetable.find('.iconNew'), newcharacter[0]);

				_this.character = newcharacter[0];
				_this.classname = newcharacter[1];
				jqThis.addClass('selected');
				console.log('changed character', newcharacter);
			};

			var changeColor = function (e) {
				var jqThis = jQuery(this),
					newcolor = jqThis.val();


				thetable.find('.iconNew').removeClass('selected');

				jqThis.addClass('selected');


				_this.element.css('color', newcolor).data('thecolor', newcolor).popover('hide');

				_this.options.onChange(newcolor, _this.character, _this.classname);

			};

			var stopPropagation = function (e) {
				console.zdebug('click on popover');
				e.stopPropagation();
			};


			thetable.css('cursor', 'pointer');
			_this.options.specialchar = _this.fromCharCode(_this.options.character);
			_this.element.html(_.template('<i class="icon-large iconpicker_character" >{{specialchar}}</i>')(_this.options));
			_this.element.css('color', _this.options.color).data('thecolor', _this.options.color);


			if (!_this.options.readOnly) {
				var popoverContainer = jQuery(_this.options.container);


				_this.element.popover({
					html: true,
					placement: _this.options.placement,
					content: function () {
						return thetable;
					},
					container: popoverContainer
				});

				var thead = _this.populateHead();
				thetable.append(thead);


				var tbody = _this.populateBody();
				thetable.append(tbody);


				_this.element.on('show', function (event) {
					console.zdebug('Iconpicker: Event show', event);
					var popover = _this.element.data('popover'),
						popoverDiv = popover.tip();

					_.delay(function () {
						popoverDiv.addClass('iconpicker');
						popoverDiv.on('click', stopPropagation);
						popoverContainer.on('click', hideIconpicker);

						tbody.on('click', '.iconNew', changeColor);
						thead.on('click', '.newCharacter', changeCharacter);
					}, 100);
				});


				_this.element.on('hide', function (event) {
					console.zdebug('popover closed');
					var popover = _this.element.data('popover'),
						popoverDiv = popover.tip();

					popoverDiv.removeClass('iconpicker');
					popoverContainer.off('click', hideIconpicker);
					popoverDiv.off('click', stopPropagation);

					tbody.off('click', '.iconNew', changeColor);
					thead.off('click', '.newCharacter', changeCharacter);
				});





			}

		},

		setElementCharacter: function (container, character) {
			var specialchar = this.fromCharCode(character);
			return container.text(specialchar);
		},

		populateBody: function () {
			var _this = this,
				tbody = jQuery('<tbody></tbody>'),
				tr = jQuery('<tr></tr>');

			for (var row = 0; row < 4; row++) {
				tr = _this.populateRow(row);
				tbody.append(tr);
			}

			return tbody;
		},

		populateHead: function () {
			var _this = this,
				thead = jQuery('<thead></thead>');

			var chunkedcharacters = _.chunk(_this.options.characters, 8);

			_.each(chunkedcharacters, function (row) {
				var tr = jQuery('<tr></tr>');
				_.each(row, function (characterObj) {
					var th = jQuery('<th></th>'),

						buttonOptions = {
							thecolor: _this.options.color,
							character: characterObj.character,
							classname: characterObj.classname
						},

						thebutton = jQuery(_this.options.buttonCharTemplate(buttonOptions));
					_this.setElementCharacter(thebutton, characterObj.character);

					if (buttonOptions.character === _this.options.character) {
						thebutton.addClass('selected');
					}

					th.append(thebutton);
					tr.append(th);
				});
				thead.append(tr);
			});



			return thead;
		},

		populateRow: function (row) {
			var _this = this,
				tr = jQuery('<tr></tr>');
			for (var col = 0; col < 8; col++) {

				var thecolor = _this.options.colorset[row][col];

				if (thecolor.length === 6 || thecolor.length === 3) {
					thecolor = '#' + thecolor;
				}
				var td = jQuery('<td></td>'),

					thebutton = jQuery(_this.options.buttonColorTemplate({
						thecolor: thecolor
					}));

				_this.setElementCharacter(thebutton, _this.options.character);

				if (_this.options.iconclass) {
					thebutton.addClass(_this.options.iconclass);
				}
				if (_this.options.color === thecolor) {
					thebutton.addClass('selected');
				}
				td.append(thebutton);
				tr.append(td);
			}
			return tr;
		},


		fromCharCode: function (charcode) {
			return String.fromCharCode("0x" + charcode);
		}

	});


	return jQuery.ui.iconpicker;

});
