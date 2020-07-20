/* Any JavaScript here will be loaded for all users on every page load. */
/* Replaces {{USERNAME}} with the name of the user browsing the page.
   Requires copying Template:USERNAME. */

function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
    $("span.insertusername").html(wgUserName);
 }
 addOnloadHook(UserNameReplace);

/* End of the {{USERNAME}} replacement */

/* Array of articles to import */

var imports = [
    'MediaWiki:Countdown.js' // Adds a countdown function using span class (http://dev.wikia.com/wiki/Countdown)
];

/* End articles to import */

/* Redirects people visiting [[Project:WW]] and [[Project:WS]] to a random Writer's Workshop
   & Writer's Showcase thread, respectively */
   
var wgTitle = mw.config.get('wgTitle'),
    wgNamespaceNumber = mw.config.get('wgNamespaceNumber');
if ((wgTitle == "WW" || wgTitle == "WS") && wgNamespaceNumber == 4) {
    imports[imports.length] = 'MediaWiki:WWWS.js';
}

/* End of the Writer's Workshop & Writer's Showcase redirect function */

/* Import selected articles */

importArticles({
    type: "script",
    articles: imports
});

/* End imports */

/* Added by Psychobilly2422 - Cleric requested, pls no kill me */

// Auto-refresh
window.ajaxPages = [
    "Special:RecentChanges",
    "Special:Watchlist",
    "Special:Log",
    "Special:Contributions",
    "Special:WikiActivity"
];
window.AjaxRCRefreshText = 'Auto-refresh';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page';