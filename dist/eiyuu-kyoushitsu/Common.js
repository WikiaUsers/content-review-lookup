/* Any JavaScript here will be loaded for all users on every page load. */
 
/* Fair use rationale */
 
function preloadUploadDesc() {
if (wgPageName.toLowerCase() != 'special:upload') {
return;
}
 
document.getElementById('wpUploadDescription').appendChild(document.createTextNode("{{Fair use rationale\r| Description       = \r| Source            = \r| Portion           = \r| Purpose           = \r| Resolution        = \r| Replaceability    = \r| Other Information = \r}}"));
 
}
addOnloadHook (preloadUploadDesc)
 
AjaxRCRefreshText = 'Auto-refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page'; 
ajaxPages = ["Special:RecentChanges","Special:WikiActivity"]; 
 
PurgeButtonText = 'Assassinate';
 
 
function owwsitesearch(f){
    f.q.value='site:http://openwetware.org/wiki/'+
        f.base.value+'++'+f.qfront.value
}
 
 
addOnloadHook(toggleInit);
 
// </syntax>
 
/* Replaces {{USERNAME}} with the name of the user browsing the page.
   Requires copying Template:USERNAME. */
 
function UserNameReplace() {
    if (typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
    $("span.insertusername").html(wgUserName);
}
addOnloadHook(UserNameReplace);
 
/* End of the {{USERNAME}} replacement */
 
// BEGIN JavaScript title rewrite -- jQuery version and new wikia skin fixes by Grunny
 
function rewriteTitle() {
    if (typeof(window.SKIP_TITLE_REWRITE) != 'undefined' && window.SKIP_TITLE_REWRITE) {
        return;
    }
 
    if ($('#title-meta').length == 0) {
        return;
    }
 
    var newTitle = $('#title-meta').html();
    if (skin == "oasis") {
        $('header.WikiaPageHeader > h1').html('<div id="title-meta" style="display: inline;">' + newTitle + '</div>');
        $('header.WikiaPageHeader > h1').attr('style', 'text-align:' + $('#title-align').html() + ';');
    } else {
        $('.firstHeading').html('<div id="title-meta" style="display: inline;">' + newTitle + '</div>');
        $('.firstHeading').attr('style', 'text-align:' + $('#title-align').html() + ';');
    }
}
 
 
// END JavaScript title rewrite
addOnloadHook(rewriteTitle);
 
/* UserTags from Dev Wikia */
window.UserTagsJS = {
	modules: {},
	tags: {
		benriya: { u:'Benriya'},
		threadmoderator: { u:'Thread Mod'},
		chatmoderator: { u:'Chat Mod'},
		poweruser: { u: 'Power User'}
	}
};
UserTagsJS.modules.inactive = 30;
UserTagsJS.modules.newuser = true;
UserTagsJS.modules.newuser = {
	days: 5, // Must have been on the Wiki for 5 days
	edits: 16, // And have at least 16 edits to remove the tag
	namespace: [0, 1, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15] // Edits must be made to content namespaces to count
};
UserTagsJS.modules.autoconfirmed = true;
UserTagsJS.modules.mwGroups = ['bureaucrat', 'threadmoderator', 'chatmoderator', 'patroller', 'rollback', 'sysop', 'bot', 'bot-global', 'poweruser'];
UserTagsJS.modules.metafilter = {
	chatmoderator: ['bureaucrat', 'sysop', 'founder'],
	rollback: ['bureaucrat', 'sysop', 'founder'],
	patroller: ['bureaucrat', 'sysop', 'founder'],
	threadmoderator: ['bureaucrat', 'sysop', 'founder']
};
UserTagsJS.modules.userfilter = {
	'Deadlytoast1695': ['bureaucrat', 'sysop']
};
UserTagsJS.modules.custom = {
	'Demotivator': ['benriya'],
};
 
window.DisplayClockJS = {
	hoverText: 'Assassinate your rivals! (i.e. refresh the page!)'
};
 
/* FileLinksAutoUpdate */
if (wgPageName.indexOf("Special:MovePage/File:") != -1 || (wgCanonicalNamespace == "File" && Storage)){
   importScriptPage("FileUsageAuto-update/code.js/min.js", "dev");
}
 
importArticles({
    type: 'script',
    articles: [
	"u:dev:AjaxRC/code.js", /* Auto Refresh */
	"u:dev:BackToTopButton/code.js", /* Add Back To Top Button */
	"w:c:dev:ReferencePopups/code.js", /* References pop-up when hovered over */
	"u:dev:PurgeButton/code.js", /* Adds refresh button to page controls */
	"u:dev:ExternalImageLoader/code.js", /* Allows adding of images external to the wiki */
	"w:c:dev:Countdown/code.js", /* Creates a Countdown clock where specified */
	"w:c:dev:SignatureCheck/code.js", /* Checks users have signed their talk page replies */
	"u:dev:AllPagesHideRedirect/code.js",
	"w:c:dev:UserTags/code.js", /* Enables customisable User Tags */
	"u:dev:DisplayClock/code.js", /* Displays clock on wiki */
	"u:dev:AjaxBatchDelete/code.2.js", /* Enables deleting of multiple pages */
	"u:dev:OasisToolbarButtons/code.js",
	"u:dev:PortableCSSPad/code.js",
	"w:c:dev:Highlight/code.css",
	"w:c:dev:AutoEditDropdown/code.js", /* Causes the drop down menus for edit buttons to automatically appear */
	"MediaWiki:Common.js/displayTimer.js",
	"MediaWiki:Common.js/Toggler.js"
    ]
});
 
// BEGIN ping function
var a = 0;
for(i=0;i<document.getElementsByClassName('msg-body').length-1;i++) {
while(a<document.getElementsByClassName('msg-body')[i].getElementsByTagName('p').length-1) {
if(document.getElementsByClassName('msg-body')[i].getElementsByTagName('p')[a].innerHTML.search('@username')>-1) {
// stuff
}
a += 1;
}
a = 0;
}
document.getElementsByClassName('msg-body')[i].getElementsByTagName('p')[a].innerHTML.split('@')[1].split(' ')[0];
document.getElementsByClassName('msg-body')[i].getElementsByTagName('p')[a].innerHTML.split(' ')[document.getElementsByClassName('msg-body')[i].getElementsByTagName('p')[a].innerHTML.split(' ').indexOf('@username')];
document.getElementsByClassName('msg-body')[i].getElementsByTagName('p')[a].innerHTML.split(' ')[document.getElementsByClassName('msg-body')[i].getElementsByTagName('p')[a].innerHTML.split(' ').indexOf('@username')].split('@')[1];
// END ping function