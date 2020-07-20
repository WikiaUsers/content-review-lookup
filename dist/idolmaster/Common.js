/* Any JavaScript here will be loaded for all users on every page load. */

// 1. AjaxRC configuration option
var ajaxRefresh = 30000;
 
// 2. AjaxRC import statement
importScriptPage('AjaxRC/code.js','dev')

// 3. AjaxRC import template list for case-by-case basis 
preloadTemplates_list = "MediaWiki:Custom-PreloadTemplatesList";
preloadTemplates_subpage = "case-by-case";

/* Username replace feature
 * Inserts viewing user's name into <span class="insertusername"></span>
 * Put text inside the spans to be viewed by logged out users
 * Originally by [[wikia:User:Splarka|Splarka]], then by [[User:Spang|Spang]],
 * This (jQuery) version by [[wikia:User:Joeyaa]], written to be backwards compatible
 */
 
if (wgUserName != 'null') {
	$('.insertusername').html(wgUserName);
}