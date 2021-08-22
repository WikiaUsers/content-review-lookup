!(function( mw ) {
	'use strict';
	
	var pagename = '';

	if ( mw.config.get( 'wgNamespaceNumber' ) == 8 // MediaWiki
	|| mw.config.get( 'wgNamespaceNumber' ) == 9 // Discussion
	|| mw.config.get( 'wgNamespaceNumber' ) == 202 // Profil
	) {
		pagename = mw.config.get( 'wgCanonicalNamespace' ) + ':' + mw.config.get( 'wgTitle' );
	} 
	else if ( mw.config.get( 'wgNamespaceNumber' ) == -1 ) { // Special pages
		pagename = mw.config.get( 'wgCanonicalNamespace' ) + ':' + mw.config.get( 'wgCanonicalSpecialPageName' );
		var subpageIdx = mw.config.get( 'wgTitle' ).indexOf( '/' );
		if ( subpageIdx >= 0 )
		pagename = pagename + mw.config.get( 'wgTitle' ).substr( subpageIdx );
	}
	
	var wikilang = 'Deutsch';
	var langs = {
		'en': 'English',
		'ru': 'Русский'
	};

	if ( pagename.length ) {
		var element = document.querySelector(".page-header__top").appendChild(document.createElement("div"));
			element.classList.add('page-header__languages');
			
		var element2 = element.appendChild(document.createElement("div"));
			element2.classList.add('wds-dropdown');
			
		var element3 = element2.appendChild(document.createElement("div"));
			element3.classList.add('wds-dropdown__toggle');
			element3.textContent = wikilang;
			
		var	element4 = element2.appendChild(document.createElement("div"));
			element4.classList.add('wds-dropdown__content');

		var element5 = element4.appendChild(document.createElement("ul"));
			element5.classList.add('wds-list');
			element5.classList.add('wds-is-linked');

		
		for ( var lang in langs ) {
			var element6 = element5.appendChild(document.createElement("li"));
			var element7 = element6.appendChild(document.createElement("a"));
				element7.setAttribute('href', 'https://undermine.fandom.com' + (lang == 'en' ? '' : '/' + lang ) + '/wiki/' + pagename );
				element7.textContent = langs[lang];
		}
	}
})( this.mediaWiki );