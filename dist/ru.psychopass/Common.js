/*************************************/
/** Добавление неактивного статуса **/
/************************************/
//Inactive users
InactiveUsers = { 
    months: 3,
    text: 'Неактивный Участник'
};
 
window.onload = function () {
    if (wgUserName !== 'null') {
        $('.insertusername').html(wgUserName);
    }
};

/*******************************/
/** Инструмент описания правок **/
/******************************/ 

$(function() {
    if (skin == 'oasis'){
        var $label = $('#edit_enhancements_toolbar #wpSummaryLabel');
        if (!$label.size()) { return; }
    }
 
    if (skin == 'monobook'){
	    var $label = $('.editOptions #wpSummaryLabel');
	    if (!$label.size()) { return; }
    }
 
	$combo = $('<select />').attr('id', 'stdSummaries').change(function() {
		var val = $(this).val();
		if (val !== '') {
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
				var val = (lines[i].indexOf('-- ') === 0) ? lines[i].substring(3) : '';
				var text = (lines[i].indexOf('-- ') === 0) ? '  ' + lines[i].substring(3) : lines[i];
				var disable = (lines[i].indexOf('-- ') === 0 || lines[i].indexOf('(') === 0) ? '' : 'disabled';
				var $opt = '<option value="' + val + '" ' + disable + '>' + text + '</option>';
				$combo.append($opt);
			}
		}
	});
});

$(function() {
	var $label = $('.module_content #wpSummaryLabel');
	if (!$label.size()) {
		return;
	}
 
	$combo = $('<select />').attr('id', 'stdSummaries').change(function() {
		var val = $(this).val();
		if (val !== '') {
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
				var val = (lines[i].indexOf('-- ') === 0) ? lines[i].substring(3) : '';
				var text = (lines[i].indexOf('-- ') === 0) ? '  ' + lines[i].substring(3) : lines[i];
				var disable = (lines[i].indexOf('-- ') === 0 || lines[i].indexOf('(') === 0) ? '' : 'disabled';
				var $opt = '<option value="' + val + '" ' + disable + '>' + text + '</option>';
				$combo.append($opt);
			}
		}
	});
	$('.module_content #wpSummary').css({"margin-bottom": '8px'});
	$('.module_content #stdSummaries').css({"width": '258px'});
	$('.module_content #stdSummaries').css({"margin-bottom": '5px'});
});


/*******************************/
/** Авто-обновление активности **/
/*********************************/
var ajaxPages = [
    "Служебная:Watchlist",
    "Служебная:Contributions",
    "Служебная:WikiActivity",
    "Служебная:RecentChanges"
]; // AJAX-обновление некоторых страниц(выбор страниц)
var AjaxRCRefreshText = 'Автообновление'; //Отображаемое название
var AjaxRCRefreshHoverText = 'Автоматически обновлять страницу'; //Отображаемое подсказку
 
importArticles({
    type: 'script',
    articles: [
        'MediaWiki:Common.js/masthead.js',
        'u:dev:AjaxRC/code.js',             // AJAX-обновление некоторых страниц
        'u:dev:AutoEditDropdown/code.js'
    ]
});