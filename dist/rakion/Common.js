/* Any JavaScript here will be loaded for all users on every page load. */

/* Replaces {{Template:InsertUsername}} with the name of the user browsing the page.
   Requires copying Template:InsertUsername. */

function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
    $("span.insertusername").html(wgUserName);
 }
 addOnloadHook(UserNameReplace);

/* End of the {{InsertUsername}} replacement */
/* Custom edit buttons */ 
importScript('MediaWiki:Common.js/CEB.js');
 
// <syntax type="javascript">
 
// </syntax>
 
importScriptPage('BackToTopButton/code.js', 'dev');
importScriptPage('AutoEditDropdown/code.js', 'dev');
 
// ******************************************************
// * SearchGoButton - Version 1.2			*
// *							*
// * Script by Eladkse					*
// ******************************************************
//
 
PurgeButtonText = 'Purge';
importScriptPage('PurgeButton/code.js', 'dev');
importScriptPage('DisplayClock/code.js', 'dev');
importArticles({
    type: "script",
    articles: [
        "w:c:dev:Countdown/code.js"
    ]
});