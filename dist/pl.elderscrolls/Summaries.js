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
var ieswsumm=ieswsumm || 'MediaWiki:Custom-summaries';

$(function () {
	if(skin == 'oasis') {
		var $label = $('#edit_enhancements_toolbar #wpSummaryLabel');
		if(!$label.size()) {
			return;
		}
	}
	if(skin == 'monobook') {
		var $label = $('.editOptions #wpSummaryLabel');
		if(!$label.size()) {
			return;
		}
	}
	$combo = $('<select />').attr('id', 'stdSummaries').change(function () {
		var val = $(this).val();
		var val2 = $('#wpSummaryEnhanced,#wpSummary').val();
		if(val !== '' && val2 !== '') {
			$('#wpSummaryEnhanced,#wpSummary').val($('#wpSummaryEnhanced,#wpSummary').val() + ", " + val);
		} else {
			$('#wpSummaryEnhanced,#wpSummary').val(val);
		}
	});
	$label.prepend('<br />').prepend($combo).prepend('Opisy zmian: ');
	$.ajax({
		'dataType': 'text',
		'data': {
			'title': ieswsumm,
			'action': 'raw',
			'ctype': 'text/plain'
		},
		'url': wgScript,
		'success': function (data) {
			var lines = data.split("\n");
			for(var i in lines) {
				var val = (lines[i].indexOf('-- ') === 0) ? lines[i].substring(3) : '';
				var text = (lines[i].indexOf('-- ') === 0) ? '&nbsp;&nbsp;' + lines[i].substring(3) : lines[i];
				var disable = (lines[i].indexOf('-- ') === 0 || lines[i].indexOf('(') === 0) ? '' : 'disabled';
				var $opt = '<option value="' + val + '" ' + disable + '>' + text + '</option>';
				$combo.append($opt);
			}
		}
	});
});
// ====================
// Visual Editor
// ====================
$(function () {
	var $label = $('.module_content #wpSummaryLabel');
	if(!$label.size()) {
		return;
	}
	$combo = $('<select />').attr('id', 'stdSummaries').change(function () {
		var val = $(this).val();
		var val2 = $('#wpSummaryEnhanced,#wpSummary').val();
		if(val !== '' && val2 !== '') {
			$('#wpSummaryEnhanced,#wpSummary').val($('#wpSummaryEnhanced,#wpSummary').val() + ", " + val);
		} else {
			$('#wpSummaryEnhanced,#wpSummary').val(val);
		}
	});
	$label.after($combo);
	$.ajax({
		'dataType': 'text',
		'data': {
			'title': ieswsumm,
			'action': 'raw',
			'ctype': 'text/plain'
		},
		'url': wgScript,
		'success': function (data) {
			var lines = data.split("\n");
			for(var i in lines) {
				var val = (lines[i].indexOf('-- ') === 0) ? lines[i].substring(3) : '';
				var text = (lines[i].indexOf('-- ') === 0) ? '&nbsp;&nbsp;' + lines[i].substring(3) : lines[i];
				var disable = (lines[i].indexOf('-- ') === 0 || lines[i].indexOf('(') === 0) ? '' : 'disabled';
				var $opt = '<option value="' + val + '" ' + disable + '>' + text + '</option>';
				$combo.append($opt);
			}
		}
	});
	$('.module_content #wpSummary').css({
		"margin-bottom": '8px'
	});
	$('.editpage-sourcewidemode-off .module_content #stdSummaries').css({
		"width": '264px',
		"border-radius": '4px',
		"font-size": 'inherit',
		"margin-bottom": '5px'
	});
	$('.oasis-dark-theme #stdSummaries').css({
		"background-color": '#050505',
		"color": '#d5d4d4',
		"border": '1px solid #333'
	});
	$('.editpage-sourcewidemode-on .module_content #stdSummaries').css({
		"margin": '28px 0 0 -5px !important',
		"max-width": '258px !important'
	});
});