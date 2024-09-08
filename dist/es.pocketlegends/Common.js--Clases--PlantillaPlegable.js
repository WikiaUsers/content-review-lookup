//<pre>
/************************************/
/* PlantillaPlegable: Principalmente para plantillas, aunque solo soporta tablas (no div)
 * Añade un botón para plegar/desplegar la plantilla, útil para plantillas que ocupan mucho.
 *
 * Copyright (C) 2008  Jesús Martínez Novo ([[User:Ciencia Al Poder]])
 * This program is free software; you can redistribute it and/or modify
 *   it under the terms of the GNU General Public License as published by
 *   the Free Software Foundation; either version 2 of the License, or
 *   (at your option) any later version
 *
 * Funcionamiento:
 *  Se ocultan todas las filas excepto la primera.
 *  El control se muestra en la primera fila y se sitúa en la última columna, como primer elemento (porque será float:right)
 *  Si se crea un span de clase "plegable-ctrl", se usará ese para ubicar el control
 *  Para que las plantillas que no tienen ancho fijo, se comprueba si ha cambiado el ancho de la tabla al plegar y, de seer así, fuerza el ancho anterior.
 *
 * parámetros:
 *  el: [HTMLTable] Tabla a plegar/desplegar
 *  iniPlegada: [bool] Opcional. Indica si debe plegarse automáticamente tras usarlo
 */
(function(){

// Frameworks y funciones externas
var $ = jQuery,
	$UT = UtilityTools;
//Constantes
var K_CTRL = 'plegable-ctrl',
	K_MOSTRAR = 'mostrar',
	K_OCULTAR = 'ocultar';

PlantillaPlegable = function(el, iniPlegada){
	// Elemento a convertir en plegable
	this.oElem = el;
	// Elemento con el control a plegar/desplegar
	this.oCtrl = null;
	// Estado
	this.bPlegada = false;
	// Estado inicial
	this.bInicialPlegada = (iniPlegada||false);
	// Indica si se ha ajustado el ancho al plegar
	this.bAjustado = false;
	this.init();
};

PlantillaPlegable.prototype = {
	version:'1.2',
	// Inicialización. Por ahora solo soporte para tablas
	init: function(){
		if (this.oElem.tagName.toLowerCase() != 'table' || !this.oElem.rows.length) return;
		var r0 = this.oElem.rows[0];
		// Miramos si ya existe
		for (var i = 0, ss = r0.getElementsByTagName('span'); i < ss.length; i++){
			if ($UT.hasClass(ss[i], K_CTRL)){
				ss[i].tabIndex = '0';
				this.oCtrl = ss[i];
				break;
			}
		}
		if (!this.oCtrl){
			var c = r0.cells[r0.cells.length-1];
			this.oCtrl = $UT.create('span', {'class':K_CTRL,tabindex:'0'});
			c.hasChildNodes() ? c.insertBefore(this.oCtrl, c.firstChild) : c.appendChild(this.oCtrl);
		}
		$UT.addHandler(this.oCtrl, 'click', function(thisArg) {
			return function() {
				thisArg.cambiarEstado(!thisArg.bPlegada);
			};
		}(this));
		$UT.addHandler(this.oCtrl, 'keyup', function(thisArg) {
			return function(e) {
				var key = e.keyCode || e.charCode || 0;
				if (key == 13) {
					thisArg.cambiarEstado(!thisArg.bPlegada);
				}
			};
		}(this));
		this.cambiarEstado(this.bInicialPlegada);
	},
	// Evento de cambio. plegar: [bool] indica si cambiar a estado plegado
	cambiarEstado: function(plegar){
		// Control
		this.oCtrl.innerHTML='';
		$UT.makeChildren([( plegar ? K_MOSTRAR : K_OCULTAR )], this.oCtrl);
		// Almacenamos dimensiones antes y después de aplicar visibilidad
		var jqElem = $(this.oElem);
		var oldWidth = jqElem.width();
		for (var i = 1, rs = this.oElem.rows; i < rs.length && plegar != this.bPlegada; i++){
			var jqRow = $(rs[i]);
			if (plegar){
				jqRow.hide();
			} else {
				jqRow.show();
			}
		}
		this.bPlegada = plegar;
		var newWidth = jqElem.width();
		// Si ha cambiado el ancho, forzamos el mismo que tenía, para evitar que se redimensione al plegar
		if (plegar && newWidth !== oldWidth && this.oElem.style.width === ''){
			this.bAjustado = true;
			jqElem.width(oldWidth);
		}
		if (this.bAjustado && !plegar)
			this.oElem.style.width = '';
	}
};
})();
//</pre>