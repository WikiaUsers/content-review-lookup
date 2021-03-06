/* Any JavaScript here will be loaded for all users on every page load. */
/* Countdown */
importArticles({
    type: "script",
    articles: [
        "w:c:dev:Countdown/code.js"
    ]
});

/* Wall Greeting */
importArticles({
    type: 'script',
    articles: [
        'w:dev:WallGreetingButton/code.js'
    ]
});

/* UserTags */
importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});

/* USERNAME */
function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
    $("span.insertusername").html(wgUserName);
 }
 addOnloadHook(UserNameReplace);
 
/* End of the {{USERNAME}} replacement */
/* Ajax Auto-Refresh (courtesy pcj) */
/* Auto updating recent changes opt-in
 * See w:c:dev:AjaxRC for info & attribution 
 */
 
AjaxRCRefreshText = 'Auto-refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page';
ajaxPages = ["Special:RecentChanges","Special:WikiActivity"];
importScriptPage('AjaxRC/code.js', 'dev');