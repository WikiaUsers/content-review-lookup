$(function() {
	'use strict';
	if ( window.iosp_loaded || mw.config.get( 'skin' ) !== 'fandomdesktop' || (mw.config.get( 'wgNamespaceNumber' ) == -1 && !mw.config.get( 'wgCanonicalSpecialPageName' )) )  return; 
	window.iosp_loaded = true;
	var pagename = '';
	if ( mw.config.get( 'wgNamespaceNumber' ) == 8 // MediaWiki
	|| mw.config.get( 'wgNamespaceNumber' ) == 9 // Discussion
	|| mw.config.get( 'wgNamespaceNumber' ) == 202 // Gamepedia User Profile
	) {
		pagename = mw.config.get( 'wgCanonicalNamespace' ) + ':' + mw.config.get( 'wgTitle' );
	} 
	else if ( mw.config.get( 'wgNamespaceNumber' ) == -1 ) { // Special pages
		pagename = mw.config.get( 'wgCanonicalNamespace' ) + ':' + mw.config.get( 'wgCanonicalSpecialPageName' );
		var subpageIdx = mw.config.get( 'wgTitle' ).indexOf( '/' );
		if ( subpageIdx >= 0 )
		pagename = pagename + mw.config.get( 'wgTitle' ).substr( subpageIdx );
	}
	
	if ( pagename.length && $( '.page-header__languages' ).length === 0 && $( '.article-footer-languages').length === 0 ) {
		new mw.Api().get({
			action: 'query',
			amlang: mw.config.get( 'wgUserLanguage' ),
			ammessages: 'page-footer-languages-header',
			format: 'json',
			meta: 'siteinfo|allmessages',
			siprop: 'interwikimap|languages',
			sifilteriw: 'local'
		}).done(function (d) {
			
			const langs = [];
			var wiki_lang = 'English';
			
			d.query.interwikimap.forEach(function(entry){
				if (entry.language !== undefined) {
					var l = entry.language;
					l = l.charAt(0).toUpperCase() + l.slice(1);
					langs.push({ url: entry.url, language: l, prefix: entry.prefix });
				}
			});
			
			if (langs.length > 0) {
				
				// Searching for current-language
				d.query.languages.forEach(function(entry){
					if(entry.code === mw.config.get( 'wgContentLanguage' )){
						wiki_lang = entry["*"];
					}
				});
				
				// Header
				$( '.page-header__top' ).append(
					$( '<div>' )
					.addClass( 'page-header__languages' )
					.append(
						$( '<div>' )
						.addClass( 'wds-dropdown' )
						.append(
							$( '<div>' )
							.addClass ('wds-dropdown__toggle iosp-icon-header' )
							.text( wiki_lang )
						)
						.append(
							$( '<div>' )
							.addClass( 'wds-dropdown__content' )
							.append(
								$( '<ul>' )
								.addClass( 'wds-list' )
								.addClass( 'wds-is-linked' )
							)
						)
					)
				);
				
				// Footer
				$( '.page-footer' ).prepend(
					$( '<div>' )
					.addClass( 'wds-collapsible-panel wds-is-collapsed page-footer__languages' )
					.append(
						$( '<header>' )
						.addClass( 'wds-collapsible-panel__header iosp-icon-footer' )
						.text( d.query.allmessages[0]['*'] )
					)
					.append(
						$( '<div>' )
						.addClass( 'wds-collapsible-panel__content' )
					)
				);
				
				// Adding hook for arrow-icon
				mw.hook( 'dev.wds' ).add( function( wds ) {
					$( '.iosp-icon-header' ).append( wds.icon( 'dropdown-tiny', {
						'class': 'wds-dropdown__toggle-chevron'
					}) );
					$( '.iosp-icon-footer' ).append( wds.icon( 'menu-control-small' ) );
				});
				
				// Adding language-entries
				for ( var lang in langs ) {
					$( '.page-header__languages .wds-dropdown__content .wds-list' ).append(
						$( '<li>' )
						.append(
							$( '<a>' )
							.attr( 'href', langs[lang].url.replace('$1', pagename) )
							.attr( 'data-tracking-label', 'lang-' + langs[lang].prefix )
							.text( langs[lang].language )
						)
					);
					$( '.page-footer__languages .wds-collapsible-panel__content' ).append(
						$( '<a>' )
						.attr( 'href', langs[lang].url.replace('$1', pagename) )
						.attr( 'data-tracking-label', 'lang-' + langs[lang].prefix )
						.text( langs[lang].language )
					);
				}
			}
		});
	}
	
	importArticle( {
		type: 'script',
		articles: [
			'u:dev:MediaWiki:WDSIcons/code.js'
		]
	} );
} );