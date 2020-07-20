/* 此处的JavaScript将加载于所有用户每一个页面。 */


// Google+ JS
mw.loader.load('https://apis.google.com/js/platform.js');
 
// Import production scripts
importArticles({
    type: "script",
    articles: [
        "MediaWiki:SidebarBox.js",
        "MediaWiki:ThreeblocksFade.js",
        "MediaWiki:DailyEvent.js"
    ]
});