//* ShowHide */
 
var ShowHideConfig = { 
    brackets: '[[]]'
};
importScriptPage('ShowHide/code.js', 'dev');

/* importScriptPage; */
 
importArticles({
	type: "script",
	articles: [
    "w:c:dev:RevealAnonIP/code.js",
	"w:c:dev:DupImageList/code.js", /* Finding duplicate images */
    "MediaWiki:Common.js/disablecommentsblogs.js", /* Disable blog comments on old blog posts */
	"MediaWiki:Common.js/preload.js", /* Template preloads */
	]
});