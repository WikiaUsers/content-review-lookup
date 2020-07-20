( function ( mw, $ ) {
'use strict';
function initializeRefTools() {
	if( !mw.user.options.get( 'showtoolbar' ) || window.refToolbarInstalled || $( '#wpTextbox1[readonly]' ).length ){
		return;
	}
	if ( mw.user.options.get( 'usebetatoolbar' ) ) {
		// Enhanced editing toolbar is on. Going to load RefToolbar 2.0a or 2.0b.
		if ( mw.user.options.get( 'usebetatoolbar-cgd' ) ) {
			// Dialogs are on. Loading 2.0b. (standard)
			$.getScript( '//en.wikipedia.org/w/index.php?title=MediaWiki:Gadget-refToolbarBase.js&action=raw&ctype=text/javascript', function() {
				mw.loader.using( [ 'ext.wikiEditor.toolbar' ], function () {
					mw.loader.load( '//en.wikipedia.org/w/index.php?title=MediaWiki:RefToolbar.js&action=raw&ctype=text/javascript' );
				} );
			} );
		} else {
			// Dialogs are off. Loading 2.0a.
			mw.loader.using( 'ext.wikiEditor.toolbar', function () {
				mw.loader.load( '//en.wikipedia.org/w/index.php?title=MediaWiki:RefToolbarNoDialogs.js&action=raw&ctype=text/javascript' );
			} );
		}
	} else {
		// Enhanced editing toolbar is off. Loading RefToolbar 1.0. (legacy)
		mw.loader.load( '//en.wikipedia.org/w/index.php?title=MediaWiki:RefToolbarLegacy.js&action=raw&ctype=text/javascript&smaxage=21600&maxage=86400' );
	}
	window.refToolbarInstalled = true;
}

if ( $.inArray( mw.config.get( 'wgAction' ), [ 'edit', 'submit' ] ) !== -1 ) {
	$( initializeRefTools );
}
 
}( mediaWiki, jQuery ) );