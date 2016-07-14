define([
	'jquery',
	'jquery.cookie',
	'jquery.waitforChild',
	'jquery-serializejson',
	'jquery-csv',
	'jquery-ui/ui/widget.js',
	'jquery-ui/ui/widgets/mouse.js',
	'jquery-ui/ui/position.js',
	'jquery-ui/ui/widgets/draggable.js',
	'jquery-ui/ui/widgets/droppable.js',
	'jquery-ui/ui/widgets/resizable.js',
	'jquery-ui/ui/widgets/selectable.js',
	'jquery-ui/ui/widgets/sortable.js',
	'jquery-ui/ui/widgets/autocomplete.js',
	'jquery-ui/ui/widgets/menu.js',
	'jquery-ui/ui/widgets/progressbar.js',
	'jquery-ui/ui/widgets/slider.js',
	'jquery-ui/ui/widgets/tabs.js',


	'libs/plugins/jquery.ajax.progress.js',
	'libs/plugins/jquery.hotkeys.js',
	'libs/plugins/jquery.evol.colorpicker.js',
	'libs/plugins/jquery.ui.rotatable.js'



], function (jQuery) {

	'use strict';


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





	return jQuery;
});
