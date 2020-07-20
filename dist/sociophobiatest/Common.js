/* Размещённый здесь JavaScript код будет загружаться всем пользователям при обращении к каждой странице */

if (mw.config.get("wgUserGroups").indexOf('sysop') > -1) {
  massCategorizationDelay = 1000;
  importScriptPage('MediaWiki:MassCategorization/code.js', 'dev');
}

// Автообновление
window.ajaxPages = [
    "Служебная:Watchlist",
    "Служебная:Contributions",
    "Служебная:WikiActivity",
    "Служебная:RecentChanges"
]; 
window.AjaxRCRefreshText = 'Автообновление';
window.AjaxRCRefreshHoverText = 'Автоматическое обновление страницы';