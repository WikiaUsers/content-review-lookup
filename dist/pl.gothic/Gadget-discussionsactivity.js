importArticle( {
	type: 'script',
	article: 'u:dev:MediaWiki:DiscussionsActivity.js'
} );

// Dodaj skrót do strony w nagłówku wiki
( function( mw ) {
	'use strict';

	const buttonGroup = document.querySelector( '.wds-community-header__wiki-buttons .wds-dropdown' );
	const parent = buttonGroup.parentNode;

	if ( !buttonGroup ) return;

	mw.loader.using( 'mediawiki.util', function() {
		var button = document.createElement( 'a' );

		button.classList.add( 'wds-button', 'wds-is-secondary' );
		button.setAttribute( 'href', mw.util.getUrl( 'Special:DiscussionsActivity' ) );
		button.setAttribute( 'title', 'Aktywność w Dyskusjach' );
		button.setAttribute( 'id', 'discussions-header-button' );

		// https://github.com/Wikia/app/blob/dev/extensions/wikia/DesignSystem/node_modules/design-system/dist/svg/wds-icons-bubble-small.svg
		button.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 18 18"><defs><path id="bubble-small" d="M15 10c0 .551-.449 1-1 1H9a.997.997 0 0 0-.707.293L6 13.586V12a1 1 0 0 0-1-1H4c-.551 0-1-.449-1-1V4c0-.551.449-1 1-1h10c.551 0 1 .449 1 1v6zm-1-9H4C2.346 1 1 2.346 1 4v6c0 1.654 1.346 3 3 3v3a1 1 0 0 0 1.707.707L9.414 13H14c1.654 0 3-1.346 3-3V4c0-1.654-1.346-3-3-3zm-2 5H6a1 1 0 1 0 0 2h6a1 1 0 1 0 0-2"/></defs><use fill-rule="evenodd" xlink:href="#bubble-small"/></svg>';

		parent.insertBefore( button, buttonGroup.previousSibling );
	} );
} )( mediaWiki );