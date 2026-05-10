
/**
 * Grid Filtering
 *
 * Agrega opciones de filtro a [[Plantilla:Nav Criaturas/Nuevo]].
 * 
 * Javascript:          Karol "[[User:Nanaki]]" Dylewski 
 * License:             CC-BY-SA 3.0 
 *
 * ARK Compatibility:   [[User:3mptylord]].
*/
(function($, mw) {
	'use strict';

	/* Config for gridFiltering */
	var gridFilters = {
	'creature': 'search',
	'map': [ '- Contenido -',
		['The Island','The Island'],
		['The Center','The Center'],
		['Scorched Earth','Scorched Earth'],
		['Ragnarok','Ragnarok'],
		['Aberration','Aberration'],
		['Extinction','Extinction'],
		['Valguero','Valguero'],
		['Genesis: Parte 1','Genesis: Parte 1'],
		['Crystal Isles','Crystal Isles'],
		['Genesis: Parte 2','Genesis: Parte 2'],
		['Lost Island','Lost Island'],
		['Fjordur','Fjordur'],
		['Astraeos','Astraeos'],
		['Aquatica','Aquatica'],
		['Lost Colony','Lost Colony'],
		['Mobile (Antiguo)','ARK: Survival Evolved Mobile (Antiguo)'],
		['No publicado','No publicado'],
	],
	'group': [ '- Grupo -',
		['Anfibios','Anfibios'],
		['Aves','Aves'],
		['Criaturas alfa','Criaturas alfa'],
		['Criaturas de fantasía','Criaturas de fantasía'],
		['Criaturas mecánicas','Criaturas mecánicas'],
		['Dinosaurios','Dinosaurios'],
		['Invertebrados','Invertebrados'],
		['Jefes','Jefes'],
		['Mamíferos','Mamíferos'],
		['Peces','Peces'],
		['Reptiles','Reptiles'],
		['Sinápsidos','Sinápsidos'],
		['Titanes','Titanes'],
	],
	'habitat': [ '- Habitat -',
		['Arbóreo','Arbóreo (árboles)'],
		['Aéreo','Aéreo'],
		['Aquatic','Aquatic'],
		['Fossorial','Fossorial (Burrowing)'],
		['Terrestrial','Terrestrial'],
		['Subterranean','Subterráneo'],
		['Boss','Jefes (Summoned)'],
	],
	'dieta': [ '- Dieta -',
		['Carnívoro','Carnívoros'],
		['Piscívoro','Piscívoros'],
		['Herbívoro','Herbívoros'],
		['Omnívoro','Omnívoros'],
		['Carroñero','Carrion Feeders'],
		['Coprófago', 'Coprófagos'],
		['Sanguinívoro', 'Sanguinívoros'],
		['Devorador de fuego', 'Devoradores de fuego'],
		['Minerales', 'Minerales'],
		['Consumidores del fondo', 'Consumidores del fondo'],
		['Goloso', 'Golosos'],
	],
	};

	function gridFiltering() {
		var grid = $('#creature-grid:not(.loaded)');
		if(!grid || !grid.length) return;
		if(!gridFilteringSwitches()) return;
		grid[0].classList.add('loaded');
		window.gridElements = [];
		grid.find('.creature_icon').each(function() {
			var obj = {};
			var elem = $(this);
			obj['*'] = elem;
			for(var x in gridFilters) {
				obj[x] = elem.data(x).split(',');
				for(var y=0;y<obj[x].length;y++) {
					obj[x][y] = obj[x][y].replace(/^\s+|\s+$/g, '').toLowerCase();
				}
			}
			window.gridElements.push(obj);
		});
	}

	function gridFilteringHide(elem) {
		$(elem).stop(true);
		$(elem).fadeTo(200, 0.1);
	}

	function gridFilteringShow(elem) {
		$(elem).stop(true);
		$(elem).fadeTo(200, 1);
	}

	function gridFilteringApply() {
		for(var x=0;x<gridElements.length;x++) {
			var elem = $(gridElements[x]['*']);
			var active = true;
			for(var y in gridFilters) {
				var field = $('#grid-filter-'+y+'-field');
 
				var value = field.val().toLowerCase();
				if(value == '') continue;
 
				var type = field.data('type');
				if(type == 'search') {
					var rx = new RegExp('^.*?(' + value.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&") + ').*?$','i');
					var flag = rx.test(gridElements[x][y].join(', '));
					if(!flag) active = false;
				} else if(type == 'select') {
					if(gridElements[x][y].indexOf(value) == -1) active = false;
				}
			}
			if(active) gridFilteringShow(elem);
			else gridFilteringHide(elem);
		}
	}

	function gridFilteringClear() {
		for(var x in gridFilters) {
			$('#grid-filter-'+x+'-field').val('');
		}
		gridFilteringApply();
	}

	function gridFilteringSwitches() {
		var flag = false;
		for(var x in gridFilters) {
			var container = $('#grid-filter-'+x);
			if(!container.length) continue;
			flag = true;
 
			if(gridFilters[x] == 'search') {
				var field = $('<input type="text" placeholder="Search..." />').appendTo(container).attr('id', container.attr('id')+'-field').data('type', 'search');
 
				field.keyup(function() {
					gridFilteringApply();
					if(window.gridFiltersTimeout) window.clearTimeout(window.gridFiltersTimeout);
					window.gridFiltersTimeout = window.setTimeout(gridFilteringClear, 30000);
				});
			} else if(gridFilters[x] instanceof Array) {
				var field = $('<select></select>').appendTo(container).attr('id', container.attr('id')+'-field').data('type', 'select');
				$('<option></option>').appendTo(field).attr('value', '').html(gridFilters[x][0]);
				for(var y=1;y<gridFilters[x].length;y++) {
					$('<option></option>').appendTo(field).attr('value', gridFilters[x][y][0]).html(gridFilters[x][y][1]);
				}
				field.val('');
 
				field.change(function() {
					gridFilteringApply();
					if(window.gridFiltersTimeout) window.clearTimeout(window.gridFiltersTimeout);
					window.gridFiltersTimeout = window.setTimeout(gridFilteringClear, 30000);
				});
			}
		}
		return flag;
	}

	mw.loader.using( ['mediawiki.util', 'jquery.client']).then(function() {
		mw.hook('wikipage.content').add(gridFiltering);
	});
})(window.jQuery, window.mediaWiki);