/* Author:     Karol "[[User:Nanaki]]" Dylewski */
/* License:    CC-BY-SA 3.0 */
 
( function( $ ) {
	function avatarGridFiltering() {
		var avatarGrid = $(avatarGridContainer)
		if(!avatarGrid.length) return
		if(!avatarGridFilteringSwitches()) return
 
		window.avatarGridElements = []
		avatarGrid.find('.avatar-icon').each(function() {
			var obj = {}
			var elem = $(this)
			obj['*'] = elem
			for(x in avatarGridFilters) {
				obj[x] = (elem.data(x) || '').split(',')
				for(var y=0;y<obj[x].length;y++) {
					obj[x][y] = obj[x][y].replace(/^\s+|\s+$/g, '').toLowerCase()
				}
			}
			window.avatarGridElements.push(obj)
		})
	}
 
	function avatarGridFilteringSwitches() {
		var flag = false
		for(x in avatarGridFilters) {
			var container = $('#avatar-grid-filter-'+x)
			if(!container.length) continue
			flag = true
 
			if(avatarGridFilters[x] == 'search') {
				var field = $('<input type="text" placeholder="Search..." />').appendTo(container).attr('id', container.attr('id')+'-field').data('type', 'search')
 
				field.keyup(function() {
					avatarGridFilteringApply()
					if(window.avatarGridFiltersTimeout) window.clearTimeout(window.avatarGridFiltersTimeout)
					window.avatarGridFiltersTimeout = window.setTimeout(avatarGridFilteringClear, 120000)
				})
			} else if(avatarGridFilters[x] instanceof Array) {
				var field = $('<select></select>').appendTo(container).attr('id', container.attr('id')+'-field').data('type', 'select')
				$('<option></option>').appendTo(field).attr('value', '').html(avatarGridFilters[x][0])
				for(var y=1;y<avatarGridFilters[x].length;y++) {
					$('<option></option>').appendTo(field).attr('value', avatarGridFilters[x][y][0]).html(avatarGridFilters[x][y][1])
				}
				field.val('')
 
				field.change(function() {
					avatarGridFilteringApply()
					if(window.avatarGridFiltersTimeout) window.clearTimeout(window.avatarGridFiltersTimeout)
					window.avatarGridFiltersTimeout = window.setTimeout(avatarGridFilteringClear, 120000)
				})
			}
		}
		return flag
	}
	function avatarGridFilteringClear() {
		for(x in avatarGridFilters) {
			$('#avatar-grid-filter-'+x+'-field').val('')
		}
		avatarGridFilteringApply()
	}
	function avatarGridFilteringApply() {
		for(var x=0;x<avatarGridElements.length;x++) {
			var elem = $(avatarGridElements[x]['*'])
			var active = true
			for(y in avatarGridFilters) {
				var field = $('#avatar-grid-filter-'+y+'-field')
 
				var value = field.val().toLowerCase()
				if(value == '') continue;
 
				var type = field.data('type')
				if(type == 'search') {
					var rx = new RegExp('^.*?(' + value.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&") + ').*?$','i');
					var flag = rx.test(avatarGridElements[x][y].join(', '))
					if(!flag) active = false
				} else if(type == 'select') {
					if(avatarGridElements[x][y].indexOf(value) == -1) active = false
				}
			}
			if(active) avatarGridFilteringShow(elem)
			else avatarGridFilteringHide(elem)
		}
	}
	function avatarGridFilteringHide(elem) {
		$(elem).stop(true);
		$(elem).hide();
	}
	function avatarGridFilteringShow(elem) {
		$(elem).stop(true);
		$(elem).show();
	}
	$( avatarGridFiltering )
} )( jQuery );