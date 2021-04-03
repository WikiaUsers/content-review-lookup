/* Any JavaScript here will be loaded for all users on every page load. */
 
/* Replaces {{Template:InsertUsername}} with the name of the user browsing the page.
   Requires copying Template:InsertUsername. */

function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
    $("span.insertusername").html(wgUserName);
 }
 addOnloadHook(UserNameReplace);

/* End of the {{InsertUsername}} replacement */

// WikiActivity Config
window.rwaOptions = {
    limit : 50,
    namespaces : [ 0, 1, 2, 3, 4, 5, 500, 501 ],
    autoInit : true,
    themeName : "main",
    showBotEdits : false,
    loadModule : true,
    customRendering : { },
    headerLink : false,
    refresh : false,
    refreshDelay : 5 * 60 * 1000,
    timeout : 10 * 1000
};