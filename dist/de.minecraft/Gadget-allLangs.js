$( document ).ready( function( $ ) {
	var pagename = '';

	if ( mw.config.get( 'wgNamespaceNumber' ) == 8 || mw.config.get( 'wgNamespaceNumber' ) == 9 || mw.config.get( 'wgNamespaceNumber' ) == 202 ) { // MediaWiki-Namespace, Diskussion und Profil
		pagename = mw.config.get( 'wgCanonicalNamespace' ) + ':' + mw.config.get( 'wgTitle' );
	} 
	else if ( mw.config.get( 'wgNamespaceNumber' ) == -1 ) { // Spezialseiten
		pagename = mw.config.get( 'wgCanonicalNamespace' ) + ':' + mw.config.get( 'wgCanonicalSpecialPageName' );
		var subpageIdx = mw.config.get( 'wgTitle' ).indexOf( '/' );
		if ( subpageIdx >= 0 )
		pagename = pagename + mw.config.get( 'wgTitle' ).substr( subpageIdx );
	}

	var langs = {
		'technik': 'Technik Wiki',
		'cs': 'Čeština',
		// 'de': 'Deutsch',
		'el': 'Ελληνικά',
		'en': 'English',
		'es': 'Español',
		'fr': 'Français',
		'hu': 'Magyar',
		'it': 'Italiano',
		'ja': '日本語',
		'ko': '한국어',
		'nl': 'Nederlands',
		'pl': 'Polski',
		'pt': 'Português',
		'ru': 'Русский',
		'th': 'ไทย',
		'tr': 'Türkçe',
		'uk': 'Українська',
		'zh': '中文'
	};

	if ( !$( '#p-lang' ).length && pagename.length ) {
		$( '#p-tb' ).after(
			$( '<div>', { 'class': 'portal expanded', 'id': 'p-lang', 'aria-labelledby': 'p-lang-label' } ).append(
				$( '<h3>', {
					'id': 'p-lang-label',
					'href': '#',
					'aria-haspopup': 'true',
					'aria-controls': 'p-lang-list',
					'role': 'button',
					'aria-pressed': 'true',
					'aria-expanded': 'true'
				} ).html( 'In anderen Sprachen' ),
				$( '<div>', { 'class': 'body' } ).append(
					$( '<ul>', { 'id': 'p-lang-list' } )
				).hide()
			)
		);
		
		for ( var lang in langs ) {
			$( '#p-lang-list' ).append(
				$( '<li>', { 'class': 'interlanguage-link interwiki-' + lang } ).append(
					$( '<a>',
						{
							'title': pagename + ' – ' + langs[lang],
							'href': 'https://minecraft' + ( lang == 'technik' ? '-technik.fandom.com/de' : '.fandom.com' + ( lang == 'en' ? '' : '/' + lang ) ) + '/wiki/' + pagename,
							'lang': lang,
							'hreflang': lang
						} )
					.html( langs[lang] )
				)
			);
		}
	}
} );