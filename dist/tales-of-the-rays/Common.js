/* Any JavaScript here will be loaded for all users on every page load. */
//Onload functions

$(function(){
	importArticles({
		type: "script",
		articles: ["u:tales-of-the-rays.wikia.com:MediaWiki:FilterTable.js"]
		          ["w:c:dev:MediaWiki:Countdown/code.js"]
	});
});