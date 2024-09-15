/* Any JavaScript here will be loaded for all users on every page load. */

/* Auto updating recent changes opt-in
  * See w:c:dev:AjaxRC for info & attribution 
  */
 
 AjaxRCRefreshText = 'Auto-Refresh';
 AjaxRCRefreshHoverText = 'Automatically refresh the page';
 ajaxPages = ["Special:WikiActivity","Special:UncategorizedPages","Special:AllPages"];
 importScriptPage('AjaxRC/code.js', 'dev');

/*UserTags settings*/
window.UserTagsJS = {
	modules: {},
	tags: {}
};
UserTagsJS.modules.autoconfirmed = true; // Switch on
UserTagsJS.modules.inactive = 30;
UserTagsJS.modules.custom = {
	'Purple Heart': ['founder'], // Founder of the wiki
};