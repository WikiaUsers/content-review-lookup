/* Any JavaScript here will be loaded for all users on every page load. */
//Show and Hide stuff
var ShowHideConfig = { autoCollapse: Infinity, userLang: true };
importScriptPage('ShowHide/code.js', 'dev');
mw.config.set('tableSorterCollation', {'�':'ae', '�' : 'oe', '�': 'ss', '�':'ue'});
$(function(){
	importArticles({
		type: "script",
		articles: ["u:pad.wikia.com:MediaWiki:FilterTable.js"]
	});
});