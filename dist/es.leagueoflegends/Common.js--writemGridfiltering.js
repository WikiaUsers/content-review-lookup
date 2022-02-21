/* Author:     Karol "[[User:Nanaki]]" Dylewski */
/* License:    CC-BY-SA 3.0 */
 
( function( $ ) {
	function writemGridFiltering() {
		var writemGrid = $(writemGridContainer)
		if(!writemGrid.length) return
		if(!writemGridFilteringSwitches()) return
 
		window.writemGridElements = []
		writemGrid.find('.writem-icon').each(function() {
			var obj = {}
			var elem = $(this)
			obj['*'] = elem
			for(x in writemGridFilters) {
				obj[x] = elem.data(x).split(',')
				for(var y=0;y<obj[x].length;y++) {
					obj[x][y] = obj[x][y].replace(/^\s+|\s+$/g, '').toLowerCase()
				}
			}
			window.writemGridElements.push(obj)
		})
	}
 
	function writemGridFilteringSwitches() {
		var flag = false
		for(x in writemGridFilters) {
			var container = $('#writem-grid-filter-'+x)
			if(!container.length) continue
			flag = true
 
			if(writemGridFilters[x] == 'search') {
				var field = $('<input type="text" placeholder="Search..." />').appendTo(container).attr('id', container.attr('id')+'-field').data('type', 'search')
 
				field.keyup(function() {
					writemGridFilteringApply()
					if(window.writemGridFiltersTimeout) window.clearTimeout(window.writemGridFiltersTimeout)
					window.writemGridFiltersTimeout = window.setTimeout(writemGridFilteringClear, 120000)
				})
			} else if(writemGridFilters[x] instanceof Array) {
				var field = $('<select></select>').appendTo(container).attr('id', container.attr('id')+'-field').data('type', 'select')
				$('<option></option>').appendTo(field).attr('value', '').html(writemGridFilters[x][0])
				for(var y=1;y<writemGridFilters[x].length;y++) {
					$('<option></option>').appendTo(field).attr('value', writemGridFilters[x][y][0]).html(writemGridFilters[x][y][1])
				}
				field.val('')
 
				field.change(function() {
					writemGridFilteringApply()
					if(window.writemGridFiltersTimeout) window.clearTimeout(window.writemGridFiltersTimeout)
					window.writemGridFiltersTimeout = window.setTimeout(writemGridFilteringClear, 120000)
				})
			}
		}
		return flag
	}
	function writemGridFilteringClear() {
		for(x in writemGridFilters) {
			$('#writem-grid-filter-'+x+'-field').val('')
		}
		writemGridFilteringApply()
	}
	function writemGridFilteringApply() {
		for(var x=0;x<writemGridElements.length;x++) {
			var elem = $(writemGridElements[x]['*'])
			var active = true
			for(y in writemGridFilters) {
				var field = $('#writem-grid-filter-'+y+'-field')
 
				var value = field.val().toLowerCase()
				if(value == '') continue;
 
				var type = field.data('type')
				if(type == 'search') {
					var rx = new RegExp('^.*?(' + value.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&") + ').*?$','i');
					var flag = rx.test(writemGridElements[x][y].join(', '))
					if(!flag) active = false
				} else if(type == 'select') {
					if(writemGridElements[x][y].indexOf(value) == -1) active = false
				}
			}
			if(active) writemGridFilteringShow(elem)
			else writemGridFilteringHide(elem)
		}
	}
	function writemGridFilteringHide(elem) {
		$(elem).stop(true);
		$(elem).fadeTo(200, 0.1);
	}
	function writemGridFilteringShow(elem) {
		$(elem).stop(true);
		$(elem).fadeTo(200, 1);
	}
	$( writemGridFiltering )
} )( jQuery );