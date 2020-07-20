/* Any JavaScript here will be loaded for all users on every page load. */

/* Auto Refresh */
AjaxRCRefreshText = 'Auto-Refresh';
AjaxRCRefreshHoverText = 'Automatically Refreshing This Page.';
ajaxPages = ["Special:RecentChanges","Special:WikiActivity"];
importScriptPage('AjaxRC/code.js', 'dev');

/* Collapsible */
importScriptPage('ShowHide/code.js', 'dev');

/* RevealAnonIP */
importScriptPage('RevealAnonIP/code.js', 'dev');
 
/* Creates Back To Top Button In Footer */
importScriptPage('BackToTopButton/code.js', 'dev');
    var Speed = 50;
 
/* View Source  */
importArticles({
    type: 'script',
    articles: [
         'u:dev:View_Source/code.js'
    ]
});
 
/* Intro Edit Button  */
EditIntroButtonText = 'Edit Intro';
importScriptPage('EditIntroButton/code.js', 'dev');


// http://dev.wikia.com/wiki/FixWantedFiles
importScriptPage('FixWantedFiles/code.js', 'dev');

/* FloatingToc */
importArticles({
    type: 'script',
    articles: [
        'u:dev:FloatingToc/code.js'
    ]
});

/* Wall Greeting Edit Button */
importArticles({
    type: 'script',
    articles: [
        'w:dev:WallGreetingButton/code.js'
    ]
});

// BEGINNING: JavaScript for placing the fair use rationale template inside the summary box on [[Special:Upload]]. Code by "[[wikipedia:User:Pinky49]]", created and coded specifically for [[wikia:c:cdnmilitary|Duty & Valour]].
 
function FairUseRationale() {
	if((wgPageName == 'Special:Upload' || wgPageName == 'Special:MultipleUpload') && document.getElementById('wpDestFile').value == '') {
		document.getElementById('wpUploadDescription').value = '== Source ==\n\n== Licensing ==\n\n[[Category:';
	}
}
addOnloadHook(FairUseRationale);
 
// ****** END: JavaScript for [[Special:Upload]] ******