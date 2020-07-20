/* Auto Refresh */
AjaxRCRefreshText = 'Auto-Refresh';
AjaxRCRefreshHoverText = 'Automatically Refreshing This Page.';
ajaxPages = ["Special:RecentChanges","Special:WikiActivity","Special:Log","Special:Contributions"];
 
/* FileLinksAutoUpdate */
if (wgPageName.indexOf("Special:MovePage/File:") != -1 || (wgCanonicalNamespace == "File" && Storage)){
   importScriptPage("FileUsageAuto-update/code.js/min.js", "dev");
}