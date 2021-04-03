/* Post-UCP fixes - Legacy Gadgets dependecy on 'mediawiki.api and 'mediawiki.util' */
mw.loader.using(['mediawiki.api', 'mediawiki.util']).then(function() {
	window.PurgeButtonText = 'Purge';

	importArticles({
    	type: 'script',
    	articles: [
        	'u:dev:MediaWiki:PurgeButton/code.js',
    	]
	});

})