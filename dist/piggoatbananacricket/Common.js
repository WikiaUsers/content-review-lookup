
/* Any JavaScript here will be loaded for all users on every page load. */
 AjaxRCRefreshText = 'Auto-Refresh';
 AjaxRCRefreshHoverText = 'Automatically refresh the page';
 ajaxPages = ["Special:RecentChanges","Special:WikiActivity","Special:UncategorizedPages","Special:AllPages"];
 importScriptPage('AjaxRC/code.js', 'dev');
importArticles({
    type: "script",
    articles: [
        'u:dev:MediaWiki:AjaxRC/code.js',
        'u:dev:MediaWiki:Countdown/code.js',
        'u:dev:MediaWiki:DisplayClock/code.js',
        'u:dev:MediaWiki:HighlightUsers/code.js',
        'u:dev:MediaWiki:Standard_Edit_Summary/code.js',
    ]
});
// Imports LinkImagePopup by Bobogoobo (credit to MLP Wiki)
// Shows a popup image of a character/episode/location when hovering over a link to it
// Lists of categories in the script need to be updated manually
// To delete stored data: window.sessionStorage.removeItem('linkPopupStorage');
// To disable the script: in your Special:MyPage/wikia.js add: window.linkImagePopupDisabled = true;
// To disable sessionStorage caching: window.linkImagePopupCachingDisabled = true;
if (
  !mw.config.get('wgCanonicalNamespace') &&
  !window.linkImagePopupDisabled &&
  !mw.util.getParamValue('diff')
) {
    importScript('MediaWiki:Common.js/LinkImagePopup.js');
}