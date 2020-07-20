//Import some scripts
importArticles({
        type: "script",
        articles: [
                "w:c:dev:SignatureCheck/code.js",
                "w:c:dev:View_Source/code.js",
                "w:c:dev:ListAdmins/code.js",
                "u:dev:SearchSuggest/code.js",
                "w:c:dev:RevealAnonIP/code.js",
                "MediaWiki:Common.js/Usertags.js",
        ]
});

/* add upload photo button to main page - 3/8/11 */
function UploadOnMainPage() {
	$('.mainpage #WikiaPageHeader div:first').append('<div style="float: right; padding-left: 15px;"><a class="uploadimage" title="Upload a new image to this wiki" href="/wiki/Special:Upload"><img height="0" width="0" class="sprite photo" src="' + wgBlankImgUrl + '"></a><a class="uploadimage" title="Special:Upload" href="/wiki/Special:Upload">Upload Image</a></div>');
}

addOnloadHook(UploadOnMainPage);

/* Auto updating recent changes opt-in
  * See w:c:dev:AjaxRC for info & attribution 
  */
 
 AjaxRCRefreshText = 'Auto-Refresh';
 AjaxRCRefreshHoverText = 'Automatically refresh the page';
 ajaxPages = ["Special:RecentChanges","Special:WikiActivity","Special:UncategorizedPages","Special:AllPages"];
 importScriptPage('AjaxRC/code.js', 'dev');

window.UserBadgesJS = {
	inactive: 30, // Inactive if no edits in this many days, 0=disabled
	groups: { bureaucrat:1, patroller:1, rollback:1 },
	newusers: true, // Tag non-autoconfirmed users (MW1.19 only)
	nonusers: true, // Tag global Wikia accounts that have never edited anything
}


/* Replaces {{USERNAME}} with the name of the user browsing the page.
   Requires copying Template:USERNAME. */

function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
    $("span.insertusername").html(wgUserName);
 }
 addOnloadHook(UserNameReplace);

//Show/hide
importScriptPage( 'ShowHide/code.js', 'dev' )