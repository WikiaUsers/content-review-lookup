/* 这里的任何JavaScript将为所有用户在每次页面加载时加载。 */
$(function(){
	importArticles({
		type: "script",
		articles: ["u:pad.wikia.com:MediaWiki:FilterTable.js"]
	});
});