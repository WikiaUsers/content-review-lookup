// By Equazcion: http://terraria.gamepedia.com/User:Equazcion

var l10n = (function(){
	var $text = {
		'text': {
			'en': 'Total edits displayed: ',
			'de': 'Angezeigte Bearbeitungen: ',
			'fr': 'Modifications totales affichées : ',
			'pt-br': 'Total de edições exibidas: ',
			'ru': 'Количество совершённых правок: ',
		},
	}
	var $lang = mw.config.get( 'wgUserLanguage' ) || 'en';
	return function(key){
		return $text[key] && ($text[key][$lang] || $text[key]['en']) || '';
	}
})();

var contribCount = $('li:has(a.mw-changeslist-date)');
var contribNum = contribCount.length;
var contribUL = $('li:has(a.mw-changeslist-date):first').parent('ul');
contribUL.before('<div>' + l10n('text') + '<b>' + contribNum + '</b></div>');