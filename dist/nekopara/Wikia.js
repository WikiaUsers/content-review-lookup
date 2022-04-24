/* Any JavaScript here will be loaded for all users on every page load. */

if (
  !mw.config.get('wgCanonicalNamespace') &&
  !window.linkImagePopupDisabled &&
  !mw.util.getParamValue('diff')
) {
    importScript('MediaWiki:Common.js/LinkImagePopup.js');
}

/* Active Auto-refesh Recent Activity page */
AjaxRCRefreshText = 'Auto-Refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page';
ajaxPages = [
    "Special:RecentChanges",
    "Special:WikiActivity",
    "Special:UncategorizedPages",
    "Special:AllPages"
];
/* --- End of Active Auto-refesh Recent Activity page --- */


/* Wikia Active Clock */
importArticles({
	type: 'script',
	articles: [
        'u:dev:AjaxRC/code.js',
		'u:dev:DisplayClock/code.js',
	]
});
/* --- End of Wikia Active Clock --- */

window.railWAM = {
    logPage:"Project:WAM Log"
};