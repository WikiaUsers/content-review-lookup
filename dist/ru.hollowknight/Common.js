importScriptPage('MediaWiki:AjaxRC/code.js', 'dev');
// AjaxRC configuration
var ajaxPages = ["Special:Watchlist", "Special:Contributions", "Special:WikiActivity", "Special:RecentChanges", "Служебная:Watchlist", "Служебная:Contributions", "Служебная:WikiActivity", "Служебная:RecentChanges"];
var AjaxRCRefreshText = 'Автообновление страницы';
var PurgeButtonText = 'Обновить';



/*Подключение карт*/
if (mw.config.get('wgPageName') === 'Карта_Халлоунеста') {
    importArticle({ type: 'script', article: 'MapHK.js' });
}

if (mw.config.get('wgPageName') === 'Шаблон:Map2') {
    importArticle({ type: 'script', article: 'MapSS.js' });
}