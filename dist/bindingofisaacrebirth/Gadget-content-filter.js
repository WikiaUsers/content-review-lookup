mw.loader.getScript( 'https://dev.fandom.com/wiki/MediaWiki:ArticlesAsResources.js?action=raw&ctype=text/javascript' ).then( function () {
	importArticle( {
		type: 'script',
		article: 'MediaWiki:Gadget-content-filter/config.js'
	} ).then( function ( require ) {
		if ( require ) {
			importArticle( {
				type: 'script',
				article: 'MediaWiki:Gadget-content-filter/code.js'
			} );
		}
	} );
} );