importScriptPage('Countdown/code.js', 'dev');
importScriptPage('YoutubePlayer/code.js', 'dev');
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

/* Protection icons */
importScriptPage('EraIcons/code.js', 'dev');

importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:ProtectionIcons.js',
    ]
});

/* Reference popups */
importScriptPage('ReferencePopups/code.js', 'dev');

importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:ReferencePopups/code.js',
    ]
});