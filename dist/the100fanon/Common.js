/* Any JavaScript here will be loaded for all users on every page load. */
importArticles({
    type: 'script',
    articles: [
        'u:dev:Standard_Edit_Summary/code.js',
        'u:dev:DisplayClock/code.js',
        'u:dev:DupImageList/code.js',
        'u:dev:BackToTopButton/code.js',
        'u:dev:ShowHide/code.js',
        'u:dev:RevealAnonIP/code.js',
        'u:dev:InactiveUsers/code.js',
        'u:dev:SocialIcons/code.js',
        'u:dev:ExtendedNavigation/code.js',      
        'w:c:dev:Countdown/code.js',
        'w:c:dev:RevealAnonIP/code.js'
    ]
});
/* Replaces {{USERNAME}} with the name of the user browsing the page.
   Requires copying Template:USERNAME. */

function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
    $("span.insertusername").html(wgUserName);
 }
 addOnloadHook(UserNameReplace);