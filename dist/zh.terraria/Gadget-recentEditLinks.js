// By Equazcion: http://terraria.gamepedia.com/User:Equazcion

var l10n = (function(){
	var $text = {
		'undoLinktext': {
			'en': 'undo',
			'de': 'rückgängig machen',
			'fr': 'annuler',
			'ru': 'отменить',
		},
		'undoHovertext': {
			'en': 'Undo this edit',
			'de': 'Diese Bearbeitung rückgängig machen',
			'fr': 'Annuler cette modification',
			'ru': 'Отменить эту правку',
		},
		'editLinktext': {
			'en': 'edit',
			'de': 'bearbeiten',
			'fr': 'modifier',
			'ru': 'править',
		},
		'editHovertext': {
			'en': 'Edit ',
			'de': 'Bearbeiten: ',
			'fr': 'Modifier ',
			'ru': 'Править ',
		}
	}
	var $lang = mw.config.get( 'wgUserLanguage' ) || 'en';
	return function(key){
		return $text[key] && ($text[key][$lang] || $text[key]['en']) || '';
	}
})();

var editLinkPre = mw.config.get('wgServer') + '/index.php?title=';

$('li[class^="mw-line"] a[href$="&action=history"]').each(function(){
	var $this = $(this);
	var receditTitle = $this.siblings('.mw-title').find('a.mw-changeslist-title').attr('title');
	if ($this.siblings('abbr.newpage').length < 1){
		var receditDiff = $this.siblings('a[href*="&diff="]').attr('href');
		var receditUndo = receditDiff
			.replace(/&curid=.*?&/, '&')
			.replace(/&diff=/, '&undo=')
			.replace(/&oldid=/, '&undoafter=');
		var receditUndoLink = '<a title="' + l10n('undoHovertext') + '" href="' + receditUndo + '&action=edit">' + l10n('undoLinktext') + '</a>';
	}
	var receditEditLink = '<a title="' + l10n('editHovertext') + receditTitle +'" href="' + editLinkPre + receditTitle + '&action=edit">' + l10n('editLinktext') + '</a>';
	$this.after(' <b>|</b> ' + (($this.siblings('abbr.newpage').length < 1) ? receditUndoLink + ' | ' : '') + receditEditLink);
});