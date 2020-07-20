/*Recent changes button */
$(function () {
  if (typeof window.personalJS !== 'undefined') { return true; }
  $('<li><a data-id="recentchanges" accesskey="g" title="Special:RecentChanges" href="/wiki/Special:RecentChanges">Recent Changes</a></li><li><a data-id="afd" accesskey="g" title="Articles for Deletion" href="/wiki/Heropedia talk:Articles for Deletion">AfD</a></li><li><a data-id="afc" accesskey="g" title="Articles for Creation" href="/wiki/Heropedia talk:Articles for Creation">AfC</a></li><li><a data-id="logs" accesskey="g" title="Logs" href="/wiki/Special:Log">Logs</a></li><li><a data-id="purge" accesskey="g" title="Purge the current page" href="/index.php?title='+ encodeURIComponent(wgPageName) +'&action=purge">Purge</a></li>').appendTo('#WikiHeader .buttons .WikiaMenuElement');
});

/*UserContribsMenuItem */
function UserContribsMenuItem() {
	$('ul.AccountNavigation li:first-child ul.subnav li:first-child').after('<li><a href="/wiki/Special:Contributions/'+ encodeURIComponent (wgUserName) +'">My contributions</a></li>');
}
 
addOnloadHook(UserContribsMenuItem);