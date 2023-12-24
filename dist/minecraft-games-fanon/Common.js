/* Any JavaScript here will be loaded for all users on every page load. */

importScriptPage('Countdown/code.js', 'dev');
importScriptPage('ShowHide/code.js', 'dev');
/* Spoiler Alert */
SpoilerAlert = {
    isSpoiler: function () {
        return -1 !== wgCategories.indexOf('Spoiler');
  },
    back: true
};
importScriptPage('SpoilerAlert/code.js', 'dev');
importScriptPage('BackToTopButton/code.js', 'dev');

$(function(){
	importArticles({
		type: "script",
		articles: ["u:pad.wikia.com:MediaWiki:FilterTable.js"]
	});
});

importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:BalancedTabber.js',
    ]
});