/* importScriptPages-start */
importArticles({
    type: 'script',
    articles: [
        'u:dev:Toggler.js',
        'u:dev:AllPagesHideRedirect/code.js',
        'u:dev:AutoEditDropdown/code.js',
        'u:dev:MediaWiki:BackToTopButton/code.js',
        'u:dev:Countdown/code.js',
        'u:dev:ListFiles/code.js', // ListFiles from Dev Wiki
        'u:dev:PurgeButton/code.js',
        'u:dev:MediaWiki:ReferencePopups/code.js',
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