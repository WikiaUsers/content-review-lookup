mw.loader.using( "mediawiki.api" ).then(function(){
	importArticles(	{    
		type: 'script',    
		articles: ['u:dev:MediaWiki:FileUsageAuto-update/code.js']
		});
});