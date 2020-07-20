/* <pre> */
// ============================================================
// Standard edit summaries
// Source Editor - Original with slight label change
// Visual Editor - Modified by Casualty Wiki from here
// with slight label change
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
				var $opt = $('<option />').val(val).text(lines[i]);
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
			'title': 'Template:Stdsummaries',
			'action': 'raw',
			'ctype': 'text/plain'
		},
		'url': wgScript,
		'success': function(data) {
			var lines = data.split("\n");
			for (var i in lines) {
				var val = (lines[i].indexOf('-- ') == 0) ? lines[i].substring(3) : '';
				var $opt = $('<option />').val(val).text(lines[i]);
				$combo.append($opt);
			}
		}
	});
	$('.module_content #wpSummary').css({"margin-bottom": '8px'});
	$('.module_content #stdSummaries').css({"width": '258px'});
	$('.module_content #stdSummaries').css({"margin-bottom": '5px'});
})

/* </pre> */