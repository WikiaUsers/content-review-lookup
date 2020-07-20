/* Any JavaScript here will be loaded for all users on every page load. */

/* Auto updating recent changes opt-in
 * See w:c:dev:AjaxRC for info & attribution 
 */
 
AjaxRCRefreshText = 'Auto-refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page';
ajaxPages = ["Special:RecentChanges","Special:WikiActivity"];
importScriptPage('AjaxRC/code.js', 'dev');
 
/* change wiki activity to recent changes */
function WikiActivity2RecentChanges() {
	$('.wikia-button[data-id$="wikiactivity"]').replaceWith('<a data-id="recentchanges" class="wikia-button secondary" accesskey="g" title="Special:RecentChanges" href="/wiki/Special:RecentChanges"><img height="0" width="0" class="sprite activity" src="https://images.wikia.nocookie.net/common/skins/common/blank.gif">Recent Changes</a>');
}
 
addOnloadHook(WikiActivity2RecentChanges);
// **************************************************
// Experimental javascript countdown timer (Splarka)
// Version 0.0.3
// **************************************************
//
// Usage example:
//  <span class="countdown" style="display:none;">
//  Only <span class="countdowndate">November 24 2011 00:00:00 PST</span> until Thanksgiving.
//  </span>
//  <span class="nocountdown">Javascript disabled.</span>





/**
 * Replaces {{USERNAME}} with the name of the user browsing the page.
 * Requires copying Template:USERNAME.
 */
 
$(function() {
    if ( window.disableUsernameReplace || mw.config.get('wgUserName') === null ) { return; }
    $('span.insertusername').html(mw.config.get('wgUserName'));
});