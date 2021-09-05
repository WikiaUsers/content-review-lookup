mw.loader.getScript( 'https://dev.fandom.com/wiki/MediaWiki:ArticlesAsResources.js?action=raw&ctype=text/javascript' ).then( function () {
	return importScript( 'MediaWiki:Gadget-content-filter/config.js' );
} ).then( function ( require ) {
	if ( require ) {
		importScript( 'MediaWiki:Gadget-content-filter/code.js' );
	}
} );