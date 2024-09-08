/*<pre> */
// Une las filas de varias tablas en una misma tabla.
// (c) Jesús Martínez Novo (Ciencia Al Poder)
// Licencia/License: http://www.gnu.org/copyleft/gpl.html GNU General Public Licence 2.0 or later
// This program is free software; you can redistribute it and/or
// modify it under the terms of the GNU General Public License
// as published by the Free Software Foundation; either version 2
// of the License, or (at your option) any later version.
 
MergeTables = {
	btnTitle: 'Unir las tablas en una sola, útil para ordenar las filas de la tabla.',
	timeoutToHide: 500,
	tableClassName: 'mergetable',
	mergeButton: null,
	timeoutId: null,
	init: function() {
		var tables = $UT.getElementsByClassName(MergeTables.tableClassName, 'table', 'bodyContent');
		for (var i = 0; i < tables.length; i++) {
			var t = tables[i];
			if (t.rows.length < 1) continue;
			var header = null;
			if (t.tHead && t.tHead.rows.length > 0) {
				header = t.tHead.rows[t.tHead.rows.length-1];
			} else {
				header = t.rows[0];
			}
			$UT.addHandler(header, 'mouseover', MergeTables.muestraMergeIcon);
			$UT.addHandler(header, 'mouseout', MergeTables.ocultaMergeIcon);
		}
	},
	creaButton: function() {
		var button = $UT.create('div', {id: 'mergetables-button', title: MergeTables.btnTitle});
		$UT.addHandler(button, 'click', MergeTables.uneTablas);
		$UT.addHandler(button, 'mouseover', MergeTables.muestraMergeIcon);
		$UT.addHandler(button, 'mouseout', MergeTables.ocultaMergeIcon);
		MergeTables.mergeButton = button;
	},
	muestraMergeIcon: function(event) {
		var target = $UT.getTarget(event);
		if (!target) return;
		if (! MergeTables.mergeButton) {
			MergeTables.creaButton();
		}
		if (MergeTables.timeoutId){
			window.clearTimeout(MergeTables.timeoutId);
			MergeTables.timeoutId = null;
		}
		var table = target;
		while (table && table.nodeName.toUpperCase() != 'TABLE') {
			table = table.parentNode;
		}
		if (!table) return;
		table.parentNode.insertBefore(MergeTables.mergeButton,table);
	},
	ocultaMergeIcon: function(event) {
		var target = $UT.getTarget(event);
		if (!target) return;
		var icon = MergeTables.mergeButton;
		if (icon && icon.parentNode && !MergeTables.timeoutId) {
			MergeTables.timeoutId = window.setTimeout(MergeTables.quitaIcon,MergeTables.timeoutToHide);
		}
	},
	quitaIcon: function() {
		var btn = MergeTables.mergeButton;
		btn.parentNode.removeChild(btn);
		MergeTables.timeoutId = null;
	},
	uneTablas: function(event) {
		var target = $UT.getTarget(event);
		if (!target) return;
		MergeTables.quitaIcon();
		var parentTable = null;
		var tables = $UT.getElementsByClassName(MergeTables.tableClassName, 'table', 'bodyContent');
		for (var i = 0; i < tables.length; i++) {
			var t = tables[i];
			var header = null;
			if (t.tHead && t.tHead.rows.length > 0) {
				header = t.tHead.rows[t.tHead.rows.length-1];
			} else {
				header = t.rows[0];
			}
			$UT.removeHandler(header, 'mouseover', MergeTables.muestraMergeIcon);
			$UT.removeHandler(header, 'mouseout', MergeTables.ocultaMergeIcon);
			if (!parentTable) {
				parentTable = t;
				continue;
			}
			if (t.rows.length <= 1 || t.tBodies.lenght < 1) continue;
			// Asumimos que sólo hay un tBody y saltamos la primera fila (se supone que es la cabecera del sorttable)
			while (t.tBodies[0].rows.length > 1) {
				parentTable.tBodies[0].appendChild(t.tBodies[0].rows[1]);
			}
			t.parentNode.removeChild(t);
			//i--; // Solo necesario si es un HTMLCollection
		}
	}
}
 
MergeTables.init();
 
/* </pre> *