importArticles({
	type: 'style',
	articles: [
		'u:dev:MediaWiki:TZclock.css'
		
	]
}, {
	type: 'script',
	articles: [
		'u:dev:TZclock.js'
	]
});

importScriptPage('InactiveUsers/code.js', 'dev');

//Adds 'inactive' tag
InactiveUsers = { months: 2 };