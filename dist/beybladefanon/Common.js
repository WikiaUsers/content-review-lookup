/* Any JavaScript here will be loaded for all users on every page load. */
$(function() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
    $("span.insertusername").text(wgUserName);
});

importScriptPage('ShowHide/code.js', 'dev');
importScriptPage('EditIntroButton/code.js', 'dev');
importScriptPage('PurgeButton/code.js', 'dev');
importScriptPage('DupImageList/code.js', 'dev');


importScriptPage('MediaWiki:Common.js/displayTimer.js', 'runescape');
/* =============
   MOS box 
   from Brickipedia
   ==============
   This is the little box underneath the
   search bar and article tally, which has the 
   Seal of Rassilon in it.
   ===============
   Keep at end of common.js, but before
   any addOnloadHooks.
   ================ */
 
importScript('MediaWiki:Common.js/mosbox.js');

/* AddRailModule on top */
window.AddRailModule = [
    {page: 'Template:RailModule', prepend: true}
];

/* For card details on card icon hover */
window.tooltips_list = [
    {
        classname: 'card-images',
        parse: '{{CardImages|<#cardname#>}}'
    }
];
window.tooltips_config = {
    offsetX: 10,
    offsetY: 10
};

/* PreloadTemplate config */
window.preloadTemplates_list = "MediaWiki:Custom-PreloadTemplatesList";
window.preloadTemplates_subpage = "syntax";

/* Adds icons to page header bottom border
 * by: [[User:The 888th Avatar]]
 */
 
$(document).ready(function() {
	if (skin == "oasis" || skin == "wikia") {
		$('.WikiaPageHeader').append($('#icons'));
		$('#icons').css({'position' : 'absolute', 'right' : '0', 'bottom' : '-1.2em'});
	}
});