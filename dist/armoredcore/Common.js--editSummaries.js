// ============================================================
// Standard edit summaries
// Source Editor - Original with slight label change
// Visual Editor - Modified by Casualty Wiki from here
// with slight label change
// Current Source - Runescape Wiki
// ============================================================
 
// ====================
// Source Editor
// ====================
 
$(function() {
        if (skin == 'oasis'){
            var $label = $('#edit_enhancements_toolbar #wpSummaryLabel');
	    if (!$label.size()) {
	    	    return;
	    }
        }
 
        if (skin == 'monobook'){
	    var $label = $('.editOptions #wpSummaryLabel');
	    if (!$label.size()) {
	    	    return;
	    }
        }
 
	$combo = $('<select />').attr('id', 'stdSummaries').change(function() {
		var val = $(this).val();
		var val2 = $('#wpSummaryEnhanced,#wpSummary').val();
		if (val != '' && val2 != '' ) {
			$('#wpSummaryEnhanced,#wpSummary').val($('#wpSummaryEnhanced,#wpSummary').val() + ", " + val);
		}
		else {
			$('#wpSummaryEnhanced,#wpSummary').val(val);
		}
	});
 
        $label.prepend('<br />').prepend($combo).prepend('Opisy zmian: ');
 
	$.ajax({
		'dataType': 'text',
		'data': {
			'title': 'Template:Summaries',
			'action': 'raw',
			'ctype': 'text/plain'
		},
		'url': wgScript,
		'success': function(data) {
			var lines = data.split("\n");
			for (var i in lines) {
				var val = (lines[i].indexOf('-- ') == 0) ? lines[i].substring(3) : '';
				var text = (lines[i].indexOf('-- ') == 0) ? '&nbsp;&nbsp;' + lines[i].substring(3) : lines[i];
				var disable = (lines[i].indexOf('-- ') == 0 || lines[i].indexOf('(') == 0) ? '' : 'disabled';
				var $opt = '<option value="' + val + '" ' + disable + '>' + text + '</option>';
				$combo.append($opt);
			}
		}
	});
})
 
// ====================
// Visual Editor
// ====================
 
$(function() {
	var $label = $('.module_content #wpSummaryLabel');
	if (!$label.size()) {
		return;
	}
 
	$combo = $('<select />').attr('id', 'stdSummaries').change(function() {
		var val = $(this).val();
		var val2 = $('#wpSummaryEnhanced,#wpSummary').val();
		if (val != '' && val2 != '' ) {
			$('#wpSummaryEnhanced,#wpSummary').val($('#wpSummaryEnhanced,#wpSummary').val() + ", " + val);
		}
		else {
			$('#wpSummaryEnhanced,#wpSummary').val(val);
		}
	});
 
	$label.after($combo);
 
	$.ajax({
		'dataType': 'text',
		'data': {
			'title': 'Template:Summaries',
			'action': 'raw',
			'ctype': 'text/plain'
		},
		'url': wgScript,
		'success': function(data) {
			var lines = data.split("\n");
			for (var i in lines) {
				var val = (lines[i].indexOf('-- ') == 0) ? lines[i].substring(3) : '';
				var text = (lines[i].indexOf('-- ') == 0) ? '&nbsp;&nbsp;' + lines[i].substring(3) : lines[i];
				var disable = (lines[i].indexOf('-- ') == 0 || lines[i].indexOf('(') == 0) ? '' : 'disabled';
				var $opt = '<option value="' + val + '" ' + disable + '>' + text + '</option>';
				$combo.append($opt);
			}
		}
	});
	$('.module_content #wpSummary').css({"margin-bottom": '8px'});
	$('.module_content #stdSummaries').css({"width": '284px'});
	$('.module_content #stdSummaries').css({"background-color": '#000609'});
	$('.module_content #stdSummaries').css({"color": '#d5d4d4'});
	$('.module_content #stdSummaries').css({"border": '1px solid #333'});
	$('.module_content #stdSummaries').css({"border-radius": '4px'});
	$('.module_content #stdSummaries').css({"font-size": 'inherit'});
	$('.module_content #stdSummaries').css({"margin-bottom": '5px'});
})