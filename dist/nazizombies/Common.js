/* Any JavaScript here will be loaded for all users on every page load. */

/* Collapsible */
importScriptPage('ShowHide/code.js', 'dev');

/* Countdown */
importArticles({
    type: "script",
    articles: [
        "w:c:dev:Countdown/code.js"
    ]
});

/* Anon IP */
importArticles({
    type: "script",
    articles: [
        "w:c:dev:RevealAnonIP/code.js"
    ]
});


 
$(function() {
    $('.username').text(mw.config.get('wgUserName'));
});

/* Auto Refresh */
window.AjaxRCRefreshText = 'Auto-refresh';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page';
window.ajaxPages = ['Special:RecentChanges', 'Special:WikiActivity'];
 
window.nullEditDelay = 1000;

/* Last Edit */
importArticles( {
    type: 'script',
    articles: [
        // ...
        'u:dev:LastEdited/code.js',
        // ...
    ]
} );