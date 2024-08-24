/* Autor:             Karol "[[Usuário:Nanaki]]" Dylewski */
/* Licenciamento:    CC-BY-SA 3.0 */

( function( $ ) {
	function gridFiltering() {
		var grid = $(gridContainer)
		if(!grid.length) return
		if(!gridFilteringSwitches()) return
		
		window.gridElements = []
		grid.find('.champion-icon').each(function() {
			var obj = {}
			var elem = $(this)
			obj['*'] = elem
			for(x in gridFilters) {
				obj[x] = elem.data(x).split(',')
				for(var y=0;y<obj[x].length;y++) {
					obj[x][y] = obj[x][y].replace(/^\s+|\s+$/g, '').toLowerCase()
				}
			}
			window.gridElements.push(obj)
		})
	}
	
	function gridFilteringSwitches() {
		var flag = false
		for(x in gridFilters) {
			var container = $('#grid-filter-'+x)
			if(!container.length) continue
			flag = true
			
			if(gridFilters[x] == 'pesquisar') {
				var field = $('<input type="text" placeholder="Pesquisar..." />').appendTo(container).attr('id', container.attr('id')+'-field').data('tipo', 'pesquisar')
				
				field.keyup(function() {
					gridFilteringApply()
				})
			} else if(gridFilters[x] instanceof Array) {
				var field = $('<select></select>').appendTo(container).attr('id', container.attr('id')+'-field').data('tipo', 'select')
				$('<option></option>').appendTo(field).attr('value', '').html(gridFilters[x][0])
				for(var y=1;y<gridFilters[x].length;y++) {
					$('<option></option>').appendTo(field).attr('value', gridFilters[x][y][0]).html(gridFilters[x][y][1])
				}
				field.val('')
				
				field.change(function() {
					gridFilteringApply()
				})
			}
		}
		return flag
	}
	function gridFilteringClear() {
		for(x in gridFilters) {
			$('#grid-filter-'+x+'-field').val('')
		}
		gridFilteringApply()
	}
	function gridFilteringApply() {
		for(var x=0;x<gridElements.length;x++) {
			var elem = $(gridElements[x]['*'])
			var active = true
			for(y in gridFilters) {
				var field = $('#grid-filter-'+y+'-field')
				
				var value = field.val().toLowerCase()
				if(value == '') continue;
				
				var tipo = field.data('tipo')
				if(tipo == 'pesquisar') {
					var rx = new RegExp('^.*?(' + value.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&") + ').*?$','i');
					var flag = rx.test(gridElements[x][y].join(', '))
					if(!flag) active = false
				} else if(tipo == 'select') {
					if(gridElements[x][y].indexOf(value) == -1) active = false
				}
			}
			if(active) gridFilteringShow(elem)
			else gridFilteringHide(elem)
		}
	}
	function gridFilteringHide(elem) {
		$(elem).stop(true);
		$(elem).fadeTo(200, 0.1);
	}
	function gridFilteringShow(elem) {
		$(elem).stop(true);
		$(elem).fadeTo(200, 1);
	}
	$( gridFiltering )
} )( jQuery );