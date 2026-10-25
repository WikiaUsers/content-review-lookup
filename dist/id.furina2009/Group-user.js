/* Semua Skrip Java di sini hanya dimuatkan untuk pengguna terdaftar saja */



mw.loader.using( [ 'mediawiki.util' ] ).done( function () {
	/**
	 * Redirect User:Name/skin.js and skin.css to the current skin's pages
	 * (unless the 'skin' page really exists).
	 *
	 * Dependencies: mediawiki.util
	 *
	 * @source https://www.mediawiki.org/wiki/Snippets/Redirect_skin.js
	 * @revision 2016-04-13
	 */
	if ( mw.config.get( 'wgArticleId' ) === 0 && mw.config.get( 'wgNamespaceNumber' ) === 2 ) {
		var titleParts = mw.config.get( 'wgPageName' ).split( '/' );
		// Make sure there was a part before and after the slash
		// And that the latter is 'skin.js' or 'skin.css'
		if ( titleParts.length === 2 ) {
			var userSkinPage = titleParts[0] + '/' + mw.config.get( 'skin' );
			if ( titleParts[1] === 'skin.js' ) {
				window.location.href = mw.util.getUrl( userSkinPage + '.js' );
			} else if ( titleParts[1] === 'skin.css' ) {
				window.location.href = mw.util.getUrl( userSkinPage + '.css' );
			}
		}
	}
	/* Actions specific to the edit page */
	if ( mw.config.get( 'wgAction' ) === 'edit' || mw.config.get( 'wgAction' ) === 'submit' ) {
		/**
		 * Fix edit summary prompt for undo
		 *
		 *  Fixes the fact that the undo function combined with the "no edit summary prompter"
		 *  complains about missing editsummary, if leaving the edit summary unchanged.
		 *  Added by [[User:Deskana]], code by [[User:Tra]].
		 *  See also [[phab:T10912]].
		 */
		$( function () {
			if ( document.location.search.indexOf( 'undo=' ) !== -1 && document.getElementsByName( 'wpAutoSummary' )[ 0 ] ) {
				document.getElementsByName( 'wpAutoSummary' )[ 0 ].value = '1';
			}
		} );
	}
});