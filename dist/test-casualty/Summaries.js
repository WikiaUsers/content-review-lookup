 // ==========================================================================
// Preloadable Edit Summaries
//   - Originally from Runescape Wiki
//   - Modified at Casualty Wiki for Editor V2
//   - Modified at Runescape Wiki for better compatibility with skins
//   - Modified at Casualty Wiki to remove excess code and improve interface
//
// So basically, this code has been bounced between wikis and improved.
// ==========================================================================
 
$(function() {
	if (skin == 'oasis'){
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
        }
 
	if (skin == 'monobook'){
		var $label = $('.editOptions #wpSummary');
		if (!$label.size()) {
			return;
	    	}
        
 
		$combo = $('<select />').attr('id', 'stdSummaries').change(function() {
			var val = $(this).val();
			if (val != '') {
				$('#wpSummaryEnhanced,#wpSummary').val(val);
			}
		});
 
		$label.after($combo).after('<br />');
	}
 
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
				var text = (lines[i].indexOf('-- ') == 0) ? '&nbsp;&nbsp;' + lines[i].substring(3) : lines[i];
				var disable = (lines[i].indexOf('-- ') == 0 || lines[i].indexOf('(') == 0) ? '' : 'disabled';
				var $opt = '<option value="' + val + '" ' + disable + '>' + text + '</option>';
				$combo.append($opt);
			}
		}
	});
})