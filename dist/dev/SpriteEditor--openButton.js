( function ( mw ) {
	'use strict';
	if ( window.SpriteEditorModules.openButton && window.SpriteEditorModules.openButton.loaded ) {
		return;
	}
	window.SpriteEditorModules.openButton = { loaded: true };
	const config = mw.config.get( [
		'skin',
		'wgArticlePath',
		'wgFormattedNamespaces',
		'wgTitle'
	] );
	function getURL() {
		return config.wgArticlePath.replace( '$1', config.wgFormattedNamespaces[ -1 ] + ':Blankpage/SpriteEditor?sprite=' + config.wgTitle );
	}
	if ( config.skin === 'fandomdesktop' ) {
		mw.hook( 'dev.ct' ).add( function ( customTools ) { // ToDo: Localization
			customTools( [
				{
					link: getURL(),
					// i18n: 'SpriteEditor',
					icon: 'images',
					placement: 'page-tools-left',
					position: -1,
					text: 'Open in SpriteEditor'
				},
				{
					link: getURL(),
					// i18n: 'SpriteEditor',
					icon: 'images',
					placement: 'page-actions-dropdown',
					position: 0,
					text: 'Open in SpriteEditor'
				}
			] );
		} );

		window.importArticle( {
			type: 'script',
			articles: [
				'u:dev:MediaWiki:CustomTools.js'
			]
		} );
	} else if ( config.skin === 'vector' || config.skin === 'vector-2022' ) {
		const ele = document.createElement( 'li' ),
			inner = document.createElement( 'a' ),
			label = document.createElement( 'span' );

		ele.id = 'se-open';
		ele.className = 'vector-tab-noicon mw-list-item collapsible';

		inner.setAttribute( 'href', getURL() );
		inner.setAttribute( 'title', 'Open in SpriteEditor' );

		label.innerText = 'Open in SpriteEditor';

		inner.appendChild( label );
		ele.appendChild( inner );

		document.querySelector( '#right-navigation .vector-menu-content > ul' ).appendChild( ele );
		if ( config.skin === 'vector-2022' ) {
			document.getElementById( 'p-views' ).classList.remove( 'emptyPortlet' );
		}
	}
}( window.mediaWiki ) );