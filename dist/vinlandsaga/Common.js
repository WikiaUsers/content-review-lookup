// ============================================================
//                     Imports
// ============================================================
/* Auto Refresh */
AjaxRCRefreshText = 'Auto-refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page';
ajaxPages = ["Special:RecentChanges","Special:WikiActivity","Special:Log","Special:Contributions","Special:NewFiles"];
importArticles({
    type: 'script',
    articles: [
        "u:dev:AjaxRC/code.js",
        "u:dev:WallGreetingButton/code.js",
        "u:dev:BackToTopButton/code.js",
        "u:dev:ShowHide/code.js",
        "u:dev:CacheCheck/code.js",
        "u:dev:MiniComplete/code.js",
        "u:dev:RevealAnonIP/code.js",
        "u:dev:FixWantedFiles/code.js",
        "MediaWiki:Common.js/displayTimer.js"
    ]
});

//File Links AutoUpdate
if (wgPageName.indexOf("Special:MovePage/File:") != -1 || (wgCanonicalNamespace == "File" && Storage)){
   importScriptPage("FileUsageAuto-update/code.js", "dev");
}

// ============================================================
//                     Script for Special:Upload
// ============================================================
// BEGINNING: JavaScript for placing the fair use rationale template inside the summary box on [[Special:Upload]]. Code by "[[wikipedia:User:Pinky49]]", created and coded specifically for [[wikia:c:cdnmilitary|Duty & Valour]].
 
function FairUseRationale() {
        if((wgPageName == 'Special:Upload' || wgPageName == 'Special:MultipleUpload') && document.getElementById('wpDestFile').value == '') {
                document.getElementById('wpUploadDescription').value = '== Source ==\n\n== Licensing ==\n\n[[Category:';
        }
}
addOnloadHook(FairUseRationale);
 
// ****** END: JavaScript for [[Special:Upload]] ******