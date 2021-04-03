/* Author:     Karol "[[User:Nanaki]]" Dylewski */
/* License:    CC-BY-SA 3.0 */
 
(function($) {
	function esportsGridFiltering() {
		var esportsGrid = $(esportsGridContainer)
		if(!esportsGrid.length) return
		if(!esportsGridFilteringSwitches()) return
 
		window.esportsGridElements = []
		esportsGrid.find('.esports-icon').each(function() {
			var obj = {}
			var elem = $(this)
			obj['*'] = elem
			for(x in esportsGridFilters) {
				obj[x] = (elem.data(x) || '').split(',')
				for(var y=0;y<obj[x].length;y++) {
					obj[x][y] = obj[x][y].replace(/^\s+|\s+$/g, '').toLowerCase()
				}
			}
			window.esportsGridElements.push(obj)
		})
	}
 
	function esportsGridFilteringSwitches() {
		var flag = false
		for(x in esportsGridFilters) {
			var container = $('#esports-grid-filter-'+x)
			if(!container.length) continue
			flag = true
 
			if(esportsGridFilters[x] == 'pesquisa') {
				var field = $('<input type="text" placeholder="Pesquisa..." />').appendTo(container).attr('id', container.attr('id')+'-field').data('type', 'search')
 
				field.keyup(function() {
					esportsGridFilteringApply()
				})
			} else if(esportsGridFilters[x] instanceof Array) {
				var field = $('<select></select>').appendTo(container).attr('id', container.attr('id')+'-field').data('type', 'select')
				$('<option></option>').appendTo(field).attr('value', '').html(esportsGridFilters[x][0])
				for(var y=1;y<esportsGridFilters[x].length;y++) {
					$('<option></option>').appendTo(field).attr('value', esportsGridFilters[x][y][0]).html(esportsGridFilters[x][y][1])
				}
				field.val('')
 
				field.change(function() {
					esportsGridFilteringApply()
				})
			}
		}
		return flag
	}
	function esportsGridFilteringClear() {
		for(x in esportsGridFilters) {
			$('#esports-grid-filter-'+x+'-field').val('')
		}
		esportsGridFilteringApply()
	}
	function esportsGridFilteringApply() {
		for(var x=0;x<esportsGridElements.length;x++) {
			var elem = $(esportsGridElements[x]['*'])
			var active = true
			for(y in esportsGridFilters) {
				var field = $('#esports-grid-filter-'+y+'-field')
 
				var value = field.val().toLowerCase()
				if(value == '') continue;
 
				var type = field.data('type')
				if(type == 'search') {
					var rx = new RegExp('^.*?(' + value.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&") + ').*?$','i');
					var flag = rx.test(esportsGridElements[x][y].join(', '))
					if(!flag) active = false
				} else if(type == 'select') {
					if(esportsGridElements[x][y].indexOf(value) == -1) active = false
				}
			}
			if(active) esportsGridFilteringShow(elem)
			else esportsGridFilteringHide(elem)
		}
	}
	function esportsGridFilteringHide(elem) {
		$(elem).stop(true);
		$(elem).fadeTo(200, 0.1);
	}
	function esportsGridFilteringShow(elem) {
		$(elem).stop(true);
		$(elem).fadeTo(200, 1);
	}
	$( esportsGridFiltering )
})(jQuery);