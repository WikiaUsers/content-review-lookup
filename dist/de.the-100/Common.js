//* Credits to Twisted Wiki  */
importArticles({
	type: "script",
	articles: [
		"w:dev:AllPagesHideRedirect/code.js",
		"w:dev:RevealAnonIP/code.js",
		"w:dev:VisualSpellCheck/code.js",
                "w:dev:WallGreetingButton/code.js",
		"MediaWiki:Common.js/displayclock.js",
	]
});


/* Collapsible classes
 * See w:c:dev:ShowHide for info and attribution
 */
 
importScriptPage('ShowHide/code.js', 'dev');

importScriptPage('Countdown/code.js', 'dev');
 
/* track incontent share fb button */
$(function(){
    $("#incontent_share").click(function(){
        WET.byStr("articleAction/incontent_share/" + wgPageName);
    });
});
 
/* Replaces {{USERNAME}} with the name of the user browsing the page.
   Requires copying Template:USERNAME. */
 
function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
    $("span.insertusername").html(wgUserName);
 }
 addOnloadHook(UserNameReplace);
 
/* End of the {{USERNAME}} replacement */

AjaxRCRefreshText = 'Auto-refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page';
ajaxPages = ["Special:RecentChanges","Special:WikiActivity"];
importScriptPage('AjaxRC/code.js', 'dev');
/* Adds "purge" option to page controls
 
* See w:c:dev:PurgeButton for info & attribution
*/
 
 
 
importScriptPage('PurgeButton/code.js', 'dev');

var autoCollapse = 2;
var collapseCaption = "hide";
var expandCaption = "show";
var maxHeight = 300;

/* Slider */

importScriptPage('BackToTopButton/code.js', 'dev');
window.UserTagsJS = {
	modules: {},
	tags: {
		founder: { u: 'Admin' },
		
	}
};
UserTagsJS.modules.custom = {

};
UserTagsJS.modules.mwGroups = ['bureaucrat', 'rollback'];
importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});