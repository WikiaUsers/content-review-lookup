if (mw.config.get( 'wgCanonicalSpecialPageName' ) == 'RecentChanges') {

	var l10n = (function(){
		var $text = {
			'delete': {
				'en': 'delete',
				'de': 'löschen',
				'fr': 'annuler',
				'pt': 'Excluir',
			},
		}
		var $lang = mw.config.get( 'wgUserLanguage' ) || 'en';
		return function(key){
			return $text[key] && ($text[key][$lang] || $text[key]['en']) || '';
		}
	})();
	
	var $pages = $('.mw-changeslist .special li');
	
	$pages.each(function(index,value){
		var $this = $(this);
		if ($this.find('.newpage').length > 0) { 
			var $title = $this.find('.mw-title');
			var delLink = ' (<a href="' + mw.config.get( 'wgServer' ) + '/index.php?title=' + $title.text() + '&action=delete">' + l10n('delete') + '</a>)';
			$title.after(delLink);
		}
	});

}