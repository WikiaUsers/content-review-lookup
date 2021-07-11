/* Code written by Pcj for importing dev modules on former Gamepedia wikis */
mw.loader.getScript('https://dev.fandom.com/wiki/MediaWiki:ArticlesAsResources.js?action=raw&ctype=text/javascript').then(function() {
		importArticles({
		    type: 'script',
		    articles: [
		    	'u:dev:AddRailModule/code.js'
		    ]
		});
	});