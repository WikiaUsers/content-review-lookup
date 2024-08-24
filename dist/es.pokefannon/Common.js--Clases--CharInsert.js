// OJO CON JS COMPRESSOR: en addGroup si se reducen variables, la variable 'bloque' no la reemplaza bien en todas partes
/**
* CharInsert: Caracteres y expresiones que aparecen debajo de la caja de edición para insertar en el texto. 
* El siguiente módulo genera regiones de texto que se pueden clickear para insertar caracteres extraños no presentes en el teclado, o conjuntos de texto útiles. Extensible por el usuario.
* Detalles sobre su funcionamiento en [[w:User:Ciencia Al Poder/CharInsert]].
* Copyright (C) 2007-2009  Jesús Martínez Novo ([[User:Ciencia Al Poder]])
* 
* This program is free software; you can redistribute it and/or modify
*   it under the terms of the GNU General Public License as published by
*   the Free Software Foundation; either version 2 of the License, or
*   (at your option) any later version
*/
// <pre>
CharInsert = function(id, groups){
	// ID del Elemento donde se generará
	this.bindId = id;
	// Para agregar conjuntos de caracteres especiales, agregar nuevos identificadores a this.groups como elementos de arrays. Si el elemento es otro array, será un "elemento doble"
	// ejemplo: groups["Nombre del grupo"] = ['a','b','c', ['d','e'], ['f','g'] ];
	this.groups = groups||{};
	this.actionPanel = null;
	this.init();
};

CharInsert.prototype = {
	version: '2.0',
	init: function () {
		this.actionPanel = $UT.get(this.bindId);
		if (!this.actionPanel) {
			return;
		}
		// 1. Añadimos una caja de selección según los conjuntos de caracteres que hay
		var select = $UT.create('select', {id:'chargroup-select'});
		// 1.1 Conjuntos de caracteres que ya haya en el código
		var listaCharGrp = this.actionPanel.getElementsByTagName('div');
		for (var i = 0; i < listaCharGrp.length; i++) {
			var p = listaCharGrp[i];
			if ($UT.hasClass(p, 'chargroup')) {
				var option = $UT.create('option', {value:p.title}, [p.title]);
				option.groupRef = p;
				select.appendChild(option);
				p.title = ''; // Borramos el título para que no aparezca al pasar el mouse por encima
				// IE Fix: la selección actual en el textarea se pierde si se hace clic en un elemento que no sea un 'a' o un elemento de formulario ('input', etc)
				/*@cc_on
				var el = p.firstChild;
				if (el) {
					do {
						if (el.nodeType == 1 && el.tagName.toLowerCase() == 'span') {
							var inel = el.firstChild;
							if (!inel) {
								continue;
							}
							var a = $UT.create('a', {href:'#'});
							do {
								var refinel = inel;
								inel = inel.nextSibling;
								a.appendChild(refinel);
							} while (inel);
							el.appendChild(a);
						}
					} while (el = el.nextSibling);
				}
				@*/
				// Fin IE Fix
			}
		}
		// 1.2 Conjuntos de caracteres definidos en this.groups (custom)
		if (this.groups !== null) {
			for (grupo in this.groups) {
				var option = $UT.create('option', {value: grupo}, [grupo]);
				option.groupRef = null;
				option.groupArray = this.groups[grupo];
				select.appendChild(option);
			}
		}

		if (select.options.length > 1) {
			this.actionPanel.insertBefore(select, this.actionPanel.firstChild);
			// 2. Capturamos el evento de cambio
			$UT.addHandler(select, 'change', function(thisArg) {
				return function(e){
					thisArg.eSelectChanged(e);
				};
			}(this));
			// 3. Seleccionamos grupo por defecto
			var selectedGrp = select.options[0].value,
				cookieVal = $UT.cookie('chargroup');
			if (cookieVal !== null) {
				selectedGrp = cookieVal;
			}
			select.value = selectedGrp;
			this.selectChargroup(select.options[select.selectedIndex]);
		} else {
			delete select;
		}
		// 4. Asignamos un evento para todo el area
		$UT.addHandler(this.actionPanel, 'click', function(thisArg) {
			return function(e){
				thisArg.specialCharClick(e);
			};
		}(this));
	},
	eSelectChanged: function(e) {
		var targetElement = $UT.getTarget(e);
		this.selectChargroup(targetElement.options[targetElement.selectedIndex]);
		$UT.cookie('chargroup', targetElement.options[targetElement.selectedIndex].value);
	},
	selectChargroup: function(item) {
		var listaCharGrp = this.actionPanel.getElementsByTagName('div');
		for (var i = 0; i < listaCharGrp.length; i++){
			var p = listaCharGrp[i];
			if ($UT.hasClass(p, 'chargroup')) {
				if ((p.isSameNode && p.isSameNode(item.groupRef)) || p == item.groupRef) { //DOM || IE
					p.style.display = 'inline';
				} else {
					p.style.display = 'none';
				}
			}
		}
		// Miramos si es uno que aun no se ha cargado
		if (!item.groupRef && item.groupArray) {
			var p = this.addGroup(item.groupArray);
			item.groupRef = p;
			p.style.display = 'inline';
		}
	},
	addGroup: function(group) {
		var bloque = $UT.create('div', {'class':'chargroup'}),
			car = null;
		for (var i = 0; i < group.length; i++) {
			// IE Patch
			/*@cc_on
			if (true) {
				car = $UT.create('a', {href:'#'});
			} else { @*/
				car = $UT.create('span');
			/*@cc_on
			} @*/
			if (typeof group[i] == 'string') {
				$UT.makeChildren([ group[i] ], car);
			} else if (group[i] instanceof Array && group[i].length == 2) {
				$UT.makeChildren([
					$UT.create('span', [ group[i][0] ]),
					$UT.create('span', [ group[i][1] ])
				], car);
			}
			// IE Patch
			/*@cc_on
			if (true) {
				bloque.appendChild($UT.create('span', [ car ]));
			} else { @*/
				bloque.appendChild(car);
			/*@cc_on
			} @*/
			$UT.makeChildren([' '], bloque);
		}
		this.actionPanel.appendChild(bloque);
		return bloque;
	},
	specialCharClick: function(e){
		var charEl = $UT.getTarget(e);
		// Obtenemos el span más externo posible, pero que descienda directamente del div de class 'chargroup'
		// For IE patch
		/*@cc_on
		if (charEl.parentNode.tagName.toLowerCase() == 'a') {
			charEl = charEl.parentNode;
		}
		if (charEl.tagName.toLowerCase() == 'a') {
			charEl = charEl.parentNode;
			e.returnValue = false;
		}
		@*/
		// End IE
		if (charEl.nodeType != 1 || charEl.tagName.toLowerCase() != 'span') {
			return;
		}
		if (!$UT.hasClass(charEl.parentNode, 'chargroup')) { // span interno?
			if ( $UT.hasClass(charEl.parentNode.parentNode, 'chargroup') ) {
				charEl = charEl.parentNode;
			} else {
				return;
			}
		}
		var spans = charEl.getElementsByTagName('span');
		if (spans.length < 2) {
			insertTags($UT.getInnerText(charEl), '', '');
		} else {
			insertTags($UT.getInnerText(spans[0]), $UT.getInnerText(spans[1]), '');
		}
	}
};
/**** END código CharInsert ****/

// Esto se pondría en el load, pero asumiendo que este archivo se carga después del load, se llama directamente.
if (window.postloadFunctionData && postloadFunctionData['charinsert']) {
	new CharInsert('charinsert-block', postloadFunctionData['charinsert']);
} else {
	new CharInsert('charinsert-block');
}
// </pre>