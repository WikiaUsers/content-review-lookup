/* Countdown */
importArticles({
    type: "script",
    articles: [
        "w:c:dev:Countdown/code.js"
    ]
});
 
/* Auto refresh */
AjaxRCRefreshText = 'Auto-refresh';
AjaxRCRefreshHoverText = 'Automatically Refreshing This Page.';
ajaxPages = ["Special:RecentChanges","Special:WikiActivity"];
importScriptPage('AjaxRC/code.js', 'dev');

/* Creates Back To Top Button in footer */
importScriptPage('BackToTopButton/code.js', 'dev');
    var Speed = 50;

/* Display timer */
importScriptPage('MediaWiki:Common.js/displayTimer.js', 'runescape');
 
/**Reference Popups**/
importArticles({
    type: 'script',
    articles: [
        // ...
        'w:c:dev:ReferencePopups/code.js',
        // ...
    ]
});

importArticle({type:'script', article:'w:c:dev:UserBadges/code.js'});

importScriptPage('ShowHide/code.js', 'dev');