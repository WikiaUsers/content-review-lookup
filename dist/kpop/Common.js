/* Any JavaScript here will be loaded for all users on every page load. */
importArticles({
    type: 'script',
    articles: [
        'u:dev:DupImageList/code.js',
        'u:dev:FileUsageAuto-update/code.js',
        'u:dev:ShowHide/code.js',
    ]
});

/* Catch {{USERNAME}} */
function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
    $("span.insertusername").html(wgUserName);
 }
 addOnloadHook(UserNameReplace);