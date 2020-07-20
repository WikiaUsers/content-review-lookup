/* Any JavaScript here will be loaded for all users on every page load. */

/* Collapsible */
importScriptPage('ShowHide/code.js', 'dev');

/* Auto Refresh */
AjaxRCRefreshText = 'Auto-refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page';
ajaxPages = ["Special:RecentChanges","Special:WikiActivity"];
importScriptPage('AjaxRC/code.js', 'dev');

/* Imports */
importArticles({
    type: "script",
    articles: [
        // Countdown long dates
        "w:c:dev:Countdown/code.js",
        // Back to top button
        "w:c:dev:BackToTopButton/code.js"
    ]
});
 
/* SearchSuggest */
importArticles({
    type: 'script',
    articles: [
        'u:dev:SearchSuggest/code.js'
    ]
});
 
//Message Wall Posts Tags
var messageWallUserTags = {
    'Miyanlove': 'Admin',
    '2Actimv': 'Admin'
};
window.messageWallTagColor = '#FA5302';
 
var messageWallTagColor = window.messageWallTagColor || '#034001';
 
(function($) {
    for (var name in messageWallUserTags) {
        $('a.subtle[href$="Message_Wall:' + name + '"]').after('<span style="color:' + messageWallTagColor + ';margin-left:-2px;font-size:10px;vertical-align:top;">(' + messageWallUserTags[name] + ')</span>');
    }
}(jQuery));
//