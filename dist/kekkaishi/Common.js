/* Any JavaScript here will be loaded for all users on every page load. */

/* Back To Top */
importScriptPage('BackToTopButton/code.js', 'dev');
 
/* Auto Refresh */
AjaxRCRefreshText = 'Auto-refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page';
ajaxPages = ["Special:RecentChanges","Special:WikiActivity"];
importScriptPage('AjaxRC/code.js', 'dev');
 
// </syntax>
 
// BEGINNING: JavaScript for placing the fair use rationale template inside the summary box on [[Special:Upload]]. Code by "[[wikipedia:User:Pinky49]]", created and coded specifically for [[wikia:c:cdnmilitary|Duty & Valour]].
 
function FairUseRationale() {
	if((wgPageName == 'Special:Upload' || wgPageName == 'Special:MultipleUpload') && document.getElementById('wpDestFile').value == '') {
		document.getElementById('wpUploadDescription').value = '{{Fair Use Rationale\n| Description       = \n| Source            = \n| Portion           = \n| Purpose           = \n| Resolution        = \n| Replaceability    = \n| Other Information = \n}}';
	}
}
addOnloadHook(FairUseRationale);
 
// ****** END: JavaScript for [[Special:Upload]] ******

/* Collapsible */
importScriptPage('ShowHide/code.js', 'dev');


/* Wiki Notification */
function addPageBottom() {
        $("#WikiaRail").append('<div style="position:fixed; bottom:2.5em; right:0.5em; z-index:999; width:200px; border-radius: 4px; box-shadow: 0px 0px 5px 0px rgb(122, 119, 119); background-color: rgb(213, 10, 115); background-image: -moz-linear-gradient(center top , rgb(0, 139, 227) 35%, rgb(0, 108, 176) 65%); color:white; text-align:center; padding:10px;"><b>Welcome to the Kekkaishi Wiki! Go ahead and visit our <a href="/wiki/Main Page">Main Page</a> for the latest updates. Dont forget to vote on the poll.</b></div>');
}
 
$(addPageBottom);

/* ReferencePopups */
importArticles({
    type: 'script',
    articles: [
        // ...
        "w:c:dev:ReferencePopups/code.js",
        "w:c:dev:LockForums/code.js",
        // ...
    ]
});