/* Code written by Pcj for importing dev modules on former Gamepedia wikis */
mw.loader.getScript('https://dev.fandom.com/load.php?mode=articles&articles=MediaWiki:ArticlesAsResources.js&only=scripts').then(function() {
	importArticles({
		type: 'script',
		articles: [
			'u:dev:DiscordIntegrator/code.js'
		]
	});
});