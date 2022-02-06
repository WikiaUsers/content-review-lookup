$( document ).ready( function( $ ) {
	'use strict';
	var pagename = '';

	if ( mw.config.get( 'wgNamespaceNumber' ) == 8 // MediaWiki
	|| mw.config.get( 'wgNamespaceNumber' ) == 9 // Diskussion
	|| mw.config.get( 'wgNamespaceNumber' ) == 202 // Profil
	) {
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
		'lzh': '文言',
		'nl': 'Nederlands',
		'pl': 'Polski',
		'pt': 'Português',
		'ru': 'Русский',
		'th': 'ไทย',
		'tr': 'Türkçe',
		'uk': 'Українська',
		'zh': '中文'
	};

	if ( pagename.length ) {
		$( '.page-header__top' ).append(
			$( '<div>' )
			.addClass( 'page-header__languages' )
			.append(
				$( '<div>' )
				.addClass( 'wds-dropdown' )
				.append(
					$( '<div>' )
					.addClass ('wds-dropdown__toggle' )
					.text( 'Deutsch' )
				)
				.append(
					$( '<div>')
					.addClass( 'wds-dropdown__content' )
					.append(
						$( '<ul>' )
						.addClass( 'wds-list' )
						.addClass( 'wds-is-linked' )
					)
				)
			)
		);
		
		for ( var lang in langs ) {
			$( '.page-header__languages .wds-dropdown__content .wds-list' ).append(
				$( '<li>')
				.append(
					$( '<a>')
					.attr( 'href', 'https://minecraft' + ( lang == 'technik' ? '-technik.fandom.com/de' : '.fandom.com' + (lang == 	'en' ? '' : '/' + lang ) ) + '/wiki/' + pagename )
					.text( langs[lang] )
				)
			);
		}
	}
} );