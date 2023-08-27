if ( $.inArray( mw.config.get( 'wgAction' ), [ 'edit', 'submit' ] ) !== -1 && window.refToolbarInstalled === undefined ) {
	if ( mw.user.options.get( 'usebetatoolbar' ) && mw.user.options.get( 'usebetatoolbar-cgd' ) ) {
		$.getScript( '//en.wikipedia.org/w/index.php?title=MediaWiki:RefToolbarBase.js&action=raw&ctype=text/javascript&smaxage=21600&maxage=86400', function() {
			// Enhanced editing toolbar is on with dialogs. Load standard refToolbar.
			mw.loader.using( 'ext.wikiEditor.toolbar', function () {
				mw.loader.load( '//en.wikipedia.org/w/index.php?title=MediaWiki:RefToolbar.js&action=raw&ctype=text/javascript&smaxage=21600&maxage=86400' );
			});
		});
	} else if (mw.user.options.get( 'usebetatoolbar' ) ) {
		// Dialogs are off. Load refToolbar 2.0 without dialogs.
		mw.loader.using( 'ext.wikiEditor.toolbar', function () {
			mw.loader.load( '//en.wikipedia.org/w/index.php?title=MediaWiki:RefToolbarNoDialogs.js&action=raw&ctype=text/javascript&smaxage=21600&maxage=86400' );
		});
	} else {
		// Enhanced editing toolbar is off. Load legacy refToolbar 1.0.
		mw.loader.load( '//en.wikipedia.org/w/index.php?title=MediaWiki:RefToolbarLegacy.js&action=raw&ctype=text/javascript&smaxage=21600&maxage=86400' );
	}
	window.refToolbarInstalled = true;
}