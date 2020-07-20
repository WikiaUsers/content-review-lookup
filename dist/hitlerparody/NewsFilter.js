hpw = hpw || {};

hpw.makeNewsFilter = function(options,filterList) {
	options = options || {Filter:0, Highlight:1};
	filterList = filterList || {'UotM':0, 'PotM':0, 'HoF':0, 'UA':0, 'BNUU':0, 'ULAA':0, 'BUA':0, 'UotY':0, 'PotY':0, 'HPW':0, 'ironcross':0};

	var $content = $('.news-container');
	//var $content = $('.mw-content-text');
	var $fset = $('<fieldset>').attr('id','news-filter');
	$('<legend>').text('News filter').appendTo($fset);
	$('<span>').text('Mode: ').appendTo($fset);
	for (var op in options) {
		var $in = $('<input>').prop('type','checkbox').prop('id',op).prop('checked',options[op]).addClass('option').appendTo($fset);
		var $lbl = $('<label>').prop('for',op).html(op).addClass('option').appendTo($fset);
	}
	$('<br>').appendTo($fset);
	$('<span>').text('Items: ').appendTo($fset);
	for (var n in filterList) {
		var $in = $('<input>').prop('type','checkbox').prop('id',n).prop('checked',filterList[n]).addClass('filter').appendTo($fset);
		var $lbl = $('<label>').prop('for',n).html(n).addClass('filter').appendTo($fset);
	}
	$fset.on('change.HPW', function(e) {
		// prepare filter selectors
		var filterList = [];
		$(this).find('.filter').filter(':checked').each( function() {
			filterList.push('.' + $(this).attr('id'));
		});
		
		// filter elements
		var $filtered = $content.find('.news-marker').filter(filterList.join(', ')).parent();
		
		// reset highlights and filters
		$content.find('.news-marker').parent().removeClass('newshighlight');
		$content.removeClass('apply-filter');
		$content.find('.filtered').removeClass('filtered');
		
		// highlights
		if ($('#Highlight',this).prop('checked')) {
			$filtered.addClass('newshighlight');
		}
		
		// filter
		if ($('#Filter',this).prop('checked')) {
			// applies filter to li, parent ol, and its previous sibling (should be the date)
			$filtered.addClass('filtered').parent().addClass('filtered').prev().addClass('filtered');
			$content.addClass('apply-filter');
		}
	})
	$fset.insertBefore($content);
}

$('#news-filter').remove(); // debug
if ($('.news-container').length) hpw.makeNewsFilter();

/* CSS
.apply-filter :not(.filtered) {display:none}
.apply-filter li.filtered * {display:initial} 
*/