/* Author:     Karol "[[User:Nanaki]]" Dylewski */
/* License:    CC-BY-SA 3.0 */
 
( function( $ ) {
	function wowRosterGridFiltering() {
		var wowRosterGrid = $(wowRosterGridContainer)
		if(!wowRosterGrid.length) return
		if(!wowRosterGridFilteringSwitches()) return
 
		window.wowRosterGridElements = []
		wowRosterGrid.find('.wowRoster-icon').each(function() {
			var obj = {}
			var elem = $(this)
			obj['*'] = elem
			for(x in wowRosterGridFilters) {
				obj[x] = (elem.data(x) || '').split(',')
				for(var y=0;y<obj[x].length;y++) {
					obj[x][y] = obj[x][y].replace(/^\s+|\s+$/g, '').toLowerCase()
				}
			}
			window.wowRosterGridElements.push(obj)
		})
	}
 
	function wowRosterGridFilteringSwitches() {
		var flag = false
		for(x in wowRosterGridFilters) {
			var container = $('#wowRoster-grid-filter-'+x)
			if(!container.length) continue
			flag = true
 
			if(wowRosterGridFilters[x] == 'search') {
				var field = $('<input type="text" placeholder="Search..." />').appendTo(container).attr('id', container.attr('id')+'-field').data('type', 'search')
 
				field.keyup(function() {
					wowRosterGridFilteringApply()
				})
			} else if(wowRosterGridFilters[x] instanceof Array) {
				var field = $('<select></select>').appendTo(container).attr('id', container.attr('id')+'-field').data('type', 'select')
				$('<option></option>').appendTo(field).attr('value', '').html(wowRosterGridFilters[x][0])
				for(var y=1;y<wowRosterGridFilters[x].length;y++) {
					$('<option></option>').appendTo(field).attr('value', wowRosterGridFilters[x][y][0]).html(wowRosterGridFilters[x][y][1])
				}
				field.val('')
 
				field.change(function() {
					wowRosterGridFilteringApply()
				})
			}
		}
		return flag
	}
	function wowRosterGridFilteringClear() {
		for(x in wowRosterGridFilters) {
			$('#wowRoster-grid-filter-'+x+'-field').val('')
		}
		wowRosterGridFilteringApply()
	}
	function wowRosterGridFilteringApply() {
		for(var x=0;x<wowRosterGridElements.length;x++) {
			var elem = $(wowRosterGridElements[x]['*'])
			var active = true
			for(y in wowRosterGridFilters) {
				var field = $('#wowRoster-grid-filter-'+y+'-field')
 
				var value = field.val().toLowerCase()
				if(value == '') continue;
 
				var type = field.data('type')
				if(type == 'search') {
					var rx = new RegExp('^.*?(' + value.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&") + ').*?$','i');
					var flag = rx.test(wowRosterGridElements[x][y].join(', '))
					if(!flag) active = false
				} else if(type == 'select') {
					if(wowRosterGridElements[x][y].indexOf(value) == -1) active = false
				}
			}
			if(active) wowRosterGridFilteringShow(elem)
			else wowRosterGridFilteringHide(elem)
		}
	}
	function wowRosterGridFilteringHide(elem) {
		$(elem).stop(true);
		$(elem).hide();
	}
	function wowRosterGridFilteringShow(elem) {
		$(elem).stop(true);
		$(elem).show();
	}
	$( wowRosterGridFiltering )
} )( jQuery );