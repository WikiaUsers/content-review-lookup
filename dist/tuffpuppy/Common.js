/* Any JavaScript here will be loaded for all users on every page load. */

/* Ajax Auto-Refresh (courtesy pcj) */
var ajaxPages = ["Special:RecentChanges", "Special:Watchlist", "Special:Log", "Special:Contributions", "Forum:FOP-related_Discussion", "Forum:Site News and Announcements", "Fairly Odd Parents Wiki:Page_maintenance"];
var AjaxRCRefreshText = 'Auto-refresh';
importScriptPage('AjaxRC/code.js', 'dev');


/* Replacing Wiki Activity button with superior Recent Changes */
function WikiActivity2RecentChanges() {
	$('a.wikia-button[data-id$="wikiactivity"]').replaceWith('<a data-id="recentchanges" class="wikia-button secondary" accesskey="g" title="Special:RecentChanges" href="/wiki/Special:RecentChanges"><img height="0" width="0" class="sprite activity" src="https://images.wikia.nocookie.net/common/skins/common/blank.gif">Recent Changes</a>');
}