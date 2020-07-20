/* Ajax Auto-Refresh (courtesy pcj) */
var ajaxPages = ["Special:RecentChanges", "Special:Watchlist", "Special:Log", "Special:Contributions"];
var AjaxRCRefreshText = 'Auto-refresh';
importScriptPage('AjaxRC/code.js', 'dev')

/*Recent changes button */
$(function () {
  if (typeof window.personalJS !== 'undefined') { return true; }
  $('<li><a data-id="recentchanges" accesskey="g" title="Special:RecentChanges" href="/wiki/Special:RecentChanges"><img height="0" width="0" class="sprite activity" src="https://images.wikia.nocookie.net/common/skins/common/blank.gif">Recent Changes</a></li><li><a data-id="logs" accesskey="g" title="Logs" href="/wiki/Special:Log">Logs</a></li><li><a data-id="purge" accesskey="g" title="Purge the current page" href="/index.php?title='+ encodeURIComponent(wgPageName) +'&action=purge">Purge</a></li>').appendTo('#WikiHeader .buttons .WikiaMenuElement');
});