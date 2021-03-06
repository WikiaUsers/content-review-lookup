/* Any JavaScript here will be loaded for all users on every page load. */

/* Auto Refresh */
AjaxRCRefreshText = 'Auto-refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page';
ajaxPages = ["Special:RecentChanges","Special:WikiActivity"];
InactiveUsers = { months: 1 };
EditIntroButtonText = 'Edit Intro';
cacheSkip = [];
cacheSkipLimit = 1000;
importArticles({
    type: 'script',
    articles: [
        "u:dev:AjaxRC/code.js",
        "u:dev:WallGreetingButton/code.js",
        "u:dev:BackToTopButton/code.js",
        "u:dev:ShowHide/code.js",
        "u:dev:FloatingToc/code.js",
        "u:dev:RevealAnonIP/code.js",
        "u:dev:MiniComplete/code.js",
        "u:dev:FixWantedFiles/code.js",
        "u:dev:View_Source/code.js",
        "u:dev:InactiveUsers/code.js",
        "u:dev:EditIntroButton/code.js",
        "u:dev:CacheCheck/code.js",
        "MediaWiki:Common.js/displayTimer.js"
    ]
});

/* FileLinksAutoUpdate */
if (wgPageName.indexOf("Special:MovePage/File:") != -1 || (wgCanonicalNamespace == "File" && Storage)){
   importScriptPage("FileUsageAuto-update/code.js/min.js", "dev");
}

// BEGINNING: JavaScript for placing the fair use rationale template inside the summary box on [[Special:Upload]]. Code by "[[wikipedia:User:Pinky49]]", created and coded specifically for [[wikia:c:cdnmilitary|Duty & Valour]].
 
function FairUseRationale() {
        if((wgPageName == 'Special:Upload' || wgPageName == 'Special:MultipleUpload') && document.getElementById('wpDestFile').value == '') {
                document.getElementById('wpUploadDescription').value = '== Source ==\n\n== Licensing ==\n\n[[Category:';
        }
}
addOnloadHook(FairUseRationale);
 
// ****** END: JavaScript for [[Special:Upload]] ******