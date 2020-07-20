/* Replaces {{USERNAME}} with the name of the user browsing the page.
   Requires copying Template:USERNAME. */
 
function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName === null) return;
    $("span.insertusername").html(wgUserName);
 }
 addOnloadHook(UserNameReplace);
 
/* End of the {{USERNAME}} replacement */

/* Any JavaScript here will be loaded for all users on every page load. */
importArticles({
    type: 'script',
    articles: [
"w:c:dev:BackToTopButton/code.js",
'u:dev:DisplayClock/code.js',
'u:dev:ExtendedNavigation/code.js',
'u:dev:MessageWallUserTags/code.js',
"w:c:dev:ReferencePopups/code.js",
"w:c:dev:ShowHide/code.js",
"w:c:dev:UserTags/code.js",
"w:dev:WallGreetingButton/code.js",
    ]
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////
 
// ADVANCED AUTO REFRESHING RECENT CHANGES AND WATCHLIST
// Code courtesy of "pcj" of WoWWiki.
 
///////////////////////////////////////////////////////////////////////////////////////////////////////////
 
importScriptPage('AjaxRC/code.js', 'dev');
 
/* AJAX */
importScriptPage('MediaWiki:AjaxRC.js');
ajaxPages = ["Special:RecentChanges", "Special:WikiActivity", "Special:NewPages"];

//Message wall usertags config
window.MessageWallUserTags = {
    tagColor: 'DeepPink',
    glow: true,
    glowSize: '15px',
    glowColor: 'PeachPuff',
    users: {
        'username': 'usergroup',
        'KCCreations': 'Founder',
    }
};