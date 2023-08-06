/* Any JavaScript here will be loaded for all users on every page load. */
mw.hook('wikipage.content').add(function($content) {
	if ($content.find('#statTable')[0]) importArticle({type:'script', article: 'MediaWiki:Stat Calculator.js'});
});