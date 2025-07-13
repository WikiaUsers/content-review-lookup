// Please use https://www.mediawiki.org/wiki/Manual:Coding_conventions/JavaScript for development.
( function ( mw ) {
	'use strict';
	if ( window.SEOpenButtonLoaded ) {
		return;
	}
	window.SEOpenButtonLoaded = true;
	const config = mw.config.get( [
			'skin',
			'wgArticlePath',
			'wgFormattedNamespaces',
			'wgTitle'
		] ),
		openTxt = 'Open in SpriteEditor';
	function getURL() {
		return config.wgArticlePath.replace( '$1', config.wgFormattedNamespaces[ -1 ] + ':Blankpage/SpriteEditor?sprite=' + config.wgTitle );
	}
	if ( config.skin === 'fandomdesktop' ) {
		mw.hook( 'dev.ct' ).add( ( customTools ) => { // ToDo: Localization
			customTools( [
				{
					link: getURL(),
					// i18n: 'SpriteEditor',
					icon: 'images',
					placement: 'page-tools-left',
					position: -1,
					text: openTxt
				},
				{
					link: getURL(),
					// i18n: 'SpriteEditor',
					icon: 'images',
					placement: 'page-actions-dropdown',
					position: 0,
					text: openTxt
				}
			] );
		} );

		mw.loader.using( 'ext.fandom.ContentReview.legacyLoaders.js' ).then( () => {
			window.importArticle( {
				type: 'script',
				articles: [
					'u:dev:MediaWiki:CustomTools.js'
				]
			} );
		} );
	} else if ( config.skin === 'vector' || config.skin === 'vector-2022' ) {
		const ele = document.createElement( 'li' ),
			inner = ele.appendChild( document.createElement( 'a' ) ),
			label = inner.appendChild( document.createElement( 'span' ) );

		ele.id = 'se-open';
		ele.className = 'vector-tab-noicon mw-list-item collapsible';

		inner.setAttribute( 'href', getURL() );
		inner.setAttribute( 'title', openTxt );

		label.innerText = openTxt;

		document.querySelector( '#right-navigation .vector-menu-content > ul' ).appendChild( ele );
		if ( config.skin === 'vector-2022' ) {
			document.getElementById( 'p-views' ).classList.remove( 'emptyPortlet' );
		}
	}
}( window.mediaWiki ) );