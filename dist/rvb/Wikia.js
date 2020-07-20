/* Ajax Auto-Refresh (courtesy pcj) */
var ajaxPages = ["Special:RecentChanges", "Special:Watchlist", "Special:Log", "Special:Contributions"];
var AjaxRCRefreshText = 'Auto-refresh';
importScriptPage('AjaxRC/code.js', 'dev')
 
/* purge button */
function CreatePurgeButton() {
	$('section header div.buttons a:first-child').before('<a style="margin:0 3px 3px 0" href="/index.php?title='+ encodeURIComponent(wgPageName) +'&action=purge" title="Purge the current page" accesskey="b" class="wikia-button secondary" id="purgeButton" data-id="purgebutton">Purge</a>');
}
 
addOnloadHook(CreatePurgeButton);
 
/* logs button */
function CreateLogsButton() {
	$('section header div.buttons a:first-child').before('<a data-id="logs" class="wikia-button secondary" accesskey="g" title="Special:Logs" href="/wiki/Special:Logs">Logs</a>');
}
 
addOnloadHook(CreateLogsButton)
 
/*Recent changes button */
function CreateRecentChangesButton() {
	$('section header div.buttons a:first-child').before('<a data-id="recentchanges" class="wikia-button secondary" accesskey="g" title="Special:RecentChanges" href="/wiki/Special:RecentChanges"><img height="0" width="0" class="sprite activity" src="https://images.wikia.nocookie.net/common/skins/common/blank.gif">Recent Changes</a>');
} 
 
addOnloadHook(CreateRecentChangesButton)