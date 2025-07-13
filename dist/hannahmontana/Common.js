window.AddRailModule = [{prepend: true}];

/*** Auto-refreshing recent changes ***/
AjaxRCRefreshText = 'Auto-refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page';
ajaxPages = ["Special:RecentChanges","Special:WikiActivity", "Special:AbuseLog"];

importScriptPage('AjaxRC/code.js', 'dev');
importArticles({
    type: 'script',
    articles: [
        //...
        'w:c:dev:DISPLAYTITLE/code.js',
        //...
    ]
});

// Automatic file fixing
if (wgPageName.indexOf("Special:MovePage/File:") != -1 || (wgCanonicalNamespace == "File" && Storage)){
   LIRoptions = {
	bottomMessage: 'This appears below the buttons on Special:MovePage',
	editSummary: 'Updating file link (automatic)',
	singleButtonText: 'Rename and replace',
        queueButtonText: 'Rename and add to queue'
   }
 
   importScriptPage("FileUsageAuto-update/code.js", "dev");
}

// Unchecks redirects when moving files
if (wgPageName.indexOf("Special:MovePage/File:") != -1) {
    $('input#wpLeaveRedirect').removeAttr('checked'); 
}

// *** Custom user rights icons on userpages ***
if (wgCanonicalNamespace == "User" || wgCanonicalNamespace == "User_talk" || wgPageName.indexOf("Special:Contributions") != -1){
    importScript('MediaWiki:Common.js/userRightsIcons.js');
}