/* Any JavaScript here will be loaded for all users on every page load. */
window.chatReloadTime = 60000;
var ajaxRefresh = 30000;

importArticles({
 type:'script',
 articles:[
  'MediaWiki:sm2.js', 
  'u:dev:AjaxBatchDelete/code.js',
  'u:dev:AjaxRC/code.js',
  'u:dev:DisplayClock/code.js',
  'u:dev:LastEdited/code.js',
  'u:maxigamertest:MediaWiki:YoutubePlayer/code.js',
  'MediaWiki:Common.js/plok.js',
  'MediaWiki:Common.js/popup.js',
  'u:dev:ChatReload/code.js'
  ]
});

if (
  !mw.config.get('wgCanonicalNamespace') &&
  !window.linkImagePopupDisabled &&
  !mw.util.getParamValue('diff')
) {
    importScript('MediaWiki:Common.js/LinkImagePopup.js');
}

//InactiveUser
importScriptPage('InactiveUsers/code.js', 'dev');
InactiveUsers = { months: 1 };

// Auto-refresh
window.ajaxPages = ["Special:RecentChanges", "Special:Watchlist", "Special:Log", "Special:Contributions", "Special:WikiActivity"];
window.AjaxRCRefreshText = 'Auto-refresh';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page';

//Last Edited Config
window.lastEdited = {
    avatar: false
};