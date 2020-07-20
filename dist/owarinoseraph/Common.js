/* Any JavaScript here will be loaded for all users on every page load. */

/* Fair use rationale */

function preloadUploadDesc() {
    if (wgPageName.toLowerCase() != 'special:upload') {
    return;
}
 
document.getElementById('wpUploadDescription').appendChild(document.createTextNode("{{Fair use rationale\r| Description       = \r| Source            = \r| Portion           = \r| Purpose           = \r| Resolution        = \r| Replaceability    = \r| Other Information = \r}}"));
 
}
addOnloadHook (preloadUploadDesc);

AjaxRCRefreshText = 'Auto-refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page'; 
ajaxPages = ["Special:RecentChanges","Special:WikiActivity"]; 

PurgeButtonText = 'Purge';

/* importScriptPages-start */
importArticles({
    type: 'script',
    articles: [
        'u:dev:Toggler.js',
        'u:dev:AjaxBatchDelete/code.2.js',
        'u:dev:AjaxRC/code.js',
        'u:dev:AllPagesHideRedirect/code.js',
        'u:dev:AutoEditDropdown/code.js',
        'u:dev:BackToTopButton/code.js',
        'u:dev:Countdown/code.js',
        'u:dev:ExternalImageLoader/code.js',
        'u:dev:ListFiles/code.js', // ListFiles from Dev Wiki
        'u:dev:PurgeButton/code.js',
        'u:dev:ReferencePopups/code.js',
        'u:dev:SignatureCheck/code.js',
        'u:dev:ShowHide/code.js',
    ]
}, {
    type: 'style',
    article: 'u:dev:Highlight/code.css'
});
/* importScriptPages-end */

/* Replaces {{USERNAME}} with the name of the user browsing the page.
   Requires copying Template:USERNAME. */

function UserNameReplace() {
    if (typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName === null) return;
    $("span.insertusername").text(wgUserName);
}
addOnloadHook(UserNameReplace);

/* End of the {{USERNAME}} replacement */

/* FileLinksAutoUpdate */
if (wgPageName.indexOf("Special:MovePage/File:") != -1 || (wgCanonicalNamespace == "File" && Storage)) {
   importScriptPage("FileUsageAuto-update/code.js/min.js", "dev");
}