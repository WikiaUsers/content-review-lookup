// By Equazcion: http://terraria.gamepedia.com/User:Equazcion

var linkPurge = mw.config.get( 'wgScript' ) + '?title=' + 
    encodeURIComponent( mw.config.get( 'wgPageName' ) ) + '&action=purge';
    
var l10n = (function(){
	var $text = {
		'buttonlabel': {
			'en': 'Purge',
			'de': 'Aktualisieren',
			'fr': 'Purger',
			'ru': 'Обновить',
			'pt': 'Actualizar',
			'pt-br': 'Actualizar',
		},
		'hovertext': {
			'en': 'Purge the server cache for this page',
			'de': 'Den Server-Cache dieser Seite löschen',
			'fr': 'Purge le cache du serveur de cette page',
			'ru': 'Очистить кэш сервера на этой странице',
			'pt': 'Limpe o cache do servidor para esta página',
			'pt-br': 'Limpe o cache do servidor para esta página',
		}
	}
	var $lang = mw.config.get( 'wgUserLanguage' ) || 'en';
	return function(key){
		return $text[key] && ($text[key][$lang] || $text[key]['en']) || '';
	}
})();
    
var linkPurgeElement = '<li><span><a title="' + l10n('hovertext') + '" href="' + linkPurge + '">' + l10n('buttonlabel') + '</a></span></li>';
    
$('#left-navigation ul').append(linkPurgeElement);