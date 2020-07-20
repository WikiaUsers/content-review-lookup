/* Any JavaScript here will be loaded for all users on every page load. */
$(function(){
	importArticles({
		type: "script",
		articles: ['MediaWiki:FilterTable.js',
		'MediaWiki:Clipboardpersonal.js']
	});
});