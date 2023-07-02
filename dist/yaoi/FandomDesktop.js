mw.hook('dev.ct').add(function(addButtons) {
	addButtons([
		{
		link: 'https://yaoi.fandom.com/wiki/Wiki_Article_Creators',
		placement: 'toolbar',
		text: 'Page Creators',
		},
		{
		link: 'https://yaoi.fandom.com/wiki/Special:Upload',
		placement: 'toolbar',
		text: 'Upload Images',
		},
	]);
});

importArticle({
	type: 'script',
	articles: [
		'u:dev:MediaWiki:CustomTools.js'
	]
});