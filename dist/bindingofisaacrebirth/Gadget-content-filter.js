mw.loader.getScript( 'https://dev.fandom.com/load.php?mode=articles&articles=MediaWiki:ArticlesAsResources.js&only=scripts' ).then( function () {
	return importArticle( {
		type: 'script',
		article: 'MediaWiki:Gadget-content-filter/config.js'
	} );
} ).then( function ( require ) {
	if ( require ) {
		importArticle( {
			type: 'script',
			article: 'MediaWiki:Gadget-content-filter/code.js'
		} );
	}
} );