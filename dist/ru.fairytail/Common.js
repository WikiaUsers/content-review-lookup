/* Размещённый здесь JavaScript код будет загружаться всем пользователям при обращении к каждой странице */

/** Инструмент описания правок **/
$(function() {
        if (skin == 'oasis'){
            var $label = $('#edit_enhancements_toolbar #wpSummaryLabel');
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


/** Для пользовательской страницы участника: добавление неактивного статуса **/
//Inactive users
InactiveUsers = { 
    months: 3,
    text: 'Неактивный Участник'
};
 
importScriptPage('InactiveUsers/code.js', 'dev');

window.onload = function () {
if (wgUserName !== 'null') {
        $('.insertusername').html(wgUserName);
    }
}