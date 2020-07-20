/* Any JavaScript here will be loaded for all users on every page load. */
 
importScriptPage('ShowHide/code.js', 'dev');
 
AjaxRCRefreshText = 'Auto-refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page';
ajaxPages = ["Special:RecentChanges","Special:WikiActivity"];
importScriptPage('AjaxRC/code.js', 'dev');
 
importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});
 
window.UserTagsJS = {
	modules: {},
	tags: {
		bureaucrat: { u:'Bureaucrat' },
		inactive: { u: 'Inactive User' }
	}
};
 
UserTagsJS.modules.mwGroups = ['bureaucrat', 'sysop', 'rollback', 'bannedfromchat'];
UserTagsJS.modules.inactive = 50; // 50 days
 
UserTagsJS.modules.inactive = {
	days: 30,
 
 
};
 
UserTagsJS.modules.newuser = {
	days: 5, // Must have been on the Wiki for 5 days
	edits: 10, // And have at least 10 edits to remove the tag
};
 
//* Thumbnail tags *//
 
var index;
var element;
var a = document.getElementsByClassName("thumbcaption");
for (index = 0; index < a.length; ++index) {
    element = a[index];
    element.innerHTML=element.innerHTML + "<small><span style=\"color:white;\">TALIA IN THE KITCHEN WIKI</span></small>";
}