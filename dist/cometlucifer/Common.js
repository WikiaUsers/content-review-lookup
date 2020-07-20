/* Any JavaScript here will be loaded for all users on every page load. */

/* importScriptPages-start */

PurgeButtonText = 'Purge';
importScriptPage('PurgeButton/code.js', 'dev');

importScriptPage('ExternalImageLoader/code.js', 'dev');
importScriptPage('ReferencePopups/code.js', 'dev');
importScriptPage('Countdown/code.js', 'dev');
importScriptPage('AutoEditDropdown/code.js', 'dev');
importScriptPage('OasisToolbarButtons/code.js', 'dev');
importScriptPage('BackToTopButton/code.js', 'dev');
importScriptPage('PortableCSSPad/code.js', 'dev');
importScriptPage('SexyUserPage/code.js', 'dev');
importScriptPage('SignatureCheck/code.js', 'dev');
importScriptPage('AllPagesHideRedirect/code.js', 'dev');
importScriptPage('Highlight/code.css', 'dev');
importScriptPage('Countdown/code.js', 'dev');
importScriptPage('ShowHide/code.js', 'dev');

/* importScriptPages-end */

AjaxRCRefreshText = 'Auto-refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page'; 
ajaxPages = ["Special:RecentChanges","Special:WikiActivity"]; 
importScriptPage('AjaxRC/code.js', 'dev'); 

/* Replaces {{USERNAME}} with the name of the user browsing the page.
   Requires copying Template:USERNAME. */

function UserNameReplace() {
    if (typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
    $("span.insertusername").text(wgUserName);
}
addOnloadHook(UserNameReplace);

/* End of the {{USERNAME}} replacement */

/* FileLinksAutoUpdate */
if (wgPageName.indexOf("Special:MovePage/File:") != -1 || (wgCanonicalNamespace == "File" && Storage)){
   importScriptPage("FileUsageAuto-update/code.js/min.js", "dev");
}