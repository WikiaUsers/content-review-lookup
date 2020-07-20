/* ShowHide */
 
var ShowHideConfig = { 
    brackets: '[[]]'
};
importScriptPage('ShowHide/code.js', 'dev');
 
/* Edit Intro Button */
/* importScriptPage('EditIntroButton/code.js', 'dev'); */
 
/* importScriptPage; */
 
importArticles({
	type: "script",
	articles: [
        "w:c:dev:RevealAnonIP/code.js",
	"w:c:dev:DupImageList/code.js", /* Finding duplicate images */
        "MediaWiki:Common.js/UserTags.js", /* UserTags */
	"MediaWiki:Common.js/preload.js", /* Template preloads */
	"MediaWiki:Common.js/tocmulti.js",  /* Support for multicolumn TOCs */
        "MediaWiki:Common.js/icons.js" /* Adds icons to page header bottom border */
	]
});