/* Open External Links in New Tabs - by ShermanTheMythran */
$('.links a, .wikis a, a.external, .WikiNav > ul > li:last-child > .subnav-2 > li:first-child > .subnav-2a, .WikiNav > ul > li:last-child > .subnav-2 > li > .subnav-3 > li > .subnav-3a').attr('target', '_blank');

/* Import scripts */
importArticles({
	type: 'script',
	articles: [
		'MediaWiki:AjaxRC.js', //Refresh Activity and Logs
		'u:dev:WallGreetingButton/code.js', //Add Wall Greeting Edit Button
	]
});