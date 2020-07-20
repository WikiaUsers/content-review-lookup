// 08:57, September 6, 2011 (UTC)
// <source lang="JavaScript">
 
// ================================================================
// Standard edit summaries
// Source Editor - Original RuneScape Wiki with slight label change
// Visual Editor - Modified by Casualty Wiki from here
// with slight label change
// ================================================================
 
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
		if (val != '') {
			$('#wpSummaryEnhanced,#wpSummary').val(val);
		}
	});
 
        $label.prepend('<br />').prepend($combo).prepend('Summaries: ');
 
	$.ajax({
		'dataType': 'text',
		'data': {
			'title': 'Template:Stdsummaries',
			'action': 'raw',
			'ctype': 'text/plain'
		},
		'url': wgScript,
		'success': function(data) {
			var lines = data.split("\n");
			for (var i in lines) {
				var val = (lines[i].indexOf('-- ') == 0) ? lines[i].substring(3) : '';
				var text = (lines[i].indexOf('-- ') == 0) ? '  ' + lines[i].substring(3) : lines[i];
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
		if (val != '') {
			$('#wpSummaryEnhanced,#wpSummary').val(val);
		}
	});
 
	$label.after($combo);
 
	$.ajax({
		'dataType': 'text',
		'data': {
			'title': 'Template:Stdsummaries',
			'action': 'raw',
			'ctype': 'text/plain'
		},
		'url': wgScript,
		'success': function(data) {
			var lines = data.split("\n");
			for (var i in lines) {
				var val = (lines[i].indexOf('-- ') == 0) ? lines[i].substring(3) : '';
				var text = (lines[i].indexOf('-- ') == 0) ? '  ' + lines[i].substring(3) : lines[i];
				var disable = (lines[i].indexOf('-- ') == 0 || lines[i].indexOf('(') == 0) ? '' : 'disabled';
				var $opt = '<option value="' + val + '" ' + disable + '>' + text + '</option>';
				$combo.append($opt);
			}
		}
	});
	$('.module_content #wpSummary').css({"margin-bottom": '8px'});
	$('.module_content #stdSummaries').css({"width": '258px'});
	$('.module_content #stdSummaries').css({"margin-bottom": '5px'});
})
 
// </source>