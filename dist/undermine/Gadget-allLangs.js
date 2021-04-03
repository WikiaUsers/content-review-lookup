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
		'de': 'Deutsch',
		'en': 'English',
		'ru': 'Русский'
	};

	var cur_lang = mw.config.get("wgArticlePath");
	cur_lang = cur_lang.substr(3, 1) === "/" && cur_lang.substr(1, 2) || "en";
	delete langs[cur_lang];
	
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
				} ).html( 'In other languages' ),
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
							'href': 'https://undermine.fandom.com' + ( lang == 'en' ? '' : '/' + lang ) + '/wiki/' + pagename,
							'lang': lang,
							'hreflang': lang
						} )
					.html( langs[lang] )
				)
			);
		}
	}
} );