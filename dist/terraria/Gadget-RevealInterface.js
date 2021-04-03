// By Equazcion: http://terraria.gamepedia.com/User:Equazcion

var l10n = (function(){
	var $text = {
		'linktext': {
			'en': 'Reveal interface',
			'de': 'Interface aufdecken',
			'fr': 'Révèle l\'interface',
			'pt-br': 'Revelação de interface',
			'ru': 'Раскрыть интерфейс'
		},
		'hovertext': {
			'en': 'Reveal MediaWiki interface message names',
			'de': 'MediaWiki-Systemnachrichtsnamen anzeigen',
			'fr': 'Révéle les noms des messages de l\'interface MediaWiki',
			'pt-br': 'Revelar os nomes das mensagens da interface do MediaWiki',
			'ru': 'Раскрыть названия системных сообщений интерфейса MediaWiki'
		},
		'rLinktext': {
			'en': 'Regular view',
			'de': 'Reguläre Ansicht',
			'fr': 'Vue régulière',
			'pt-br': 'Visualização normal',
			'ru': 'Исходный вид'
		},
		'rHovertext': {
			'en': 'Reload this page in regular view (un-reveal MediaWiki interface message names)',
			'de': 'MediaWiki-Systemnachrichten verbergen und die Seite normal neu laden',
			'fr': 'Recharger cette page en vue régulière (enlève les noms des messages de l\'interface MediaWiki)',
			'pt-br': 'Recarregue esta página na visualização normal (revelar os nomes das mensagens da interface do MediaWiki)',
			'ru': 'Перезагрузить данную страницу с возвращением в исходный вид (скрыть названия системных сообщений интерфейса MediaWiki)'
		}
	};
	var $lang = mw.config.get( 'wgUserLanguage' ) || 'en';
	return function(key){
		return $text[key] && ($text[key][$lang] || $text[key]['en']) || '';
	};
})();

var wgNamespaceNumber = mw.config.get( 'wgNamespaceNumber' );
var currHref = window.location.href;

if (wgNamespaceNumber != 8){
	if (currHref.indexOf('uselang=qqx') < 0 ) {
		var qqxToken = (currHref.indexOf('?') < 0 ? '?uselang=qqx' : '&uselang=qqx' );
		$('#right-navigation #p-cactions .menu ul').append('<li><a title="' + l10n('hovertext') + '" href="' + currHref + qqxToken + '">' + l10n('linktext') + '</a></li>');
	} else {
		var qqxRem = currHref.replace(/[\?|&]uselang=qqx/,'');
		$('#right-navigation #p-views ul').prepend('<li><span><a title="' + l10n('rHovertext') + '" href="' + qqxRem + '">' + l10n('rLinktext') + '</a></span></li>');
	}
}