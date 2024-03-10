if ( mw.config.get( 'wgAction' ) == 'edit' || mw.config.get( 'wgAction' ) == 'submit' ) {
	mw.loader.load( '/index.php?title=MediaWiki:Gadget-SummaryButtonsCore.js&action=raw&ctype=text/javascript' );
	}