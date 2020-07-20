/* Размещённый здесь JavaScript код будет загружаться всем пользователям при обращении к каждой странице */
var ajaxPages = ["Служебная:WikiActivity","Служебная:RecentChanges","Служебная:Watchlist","Служебная:Log","Служебная:Contributions"];
var ajaxRefresh = 30000;
var AjaxRCRefreshText = 'Авто-обновление';
var AjaxRCRefreshHoverText = 'Автоматически обновляет страницу каждые '+ajaxRefresh/1000+' секунд' ;

PurgeButtonText = 'Обновить';
importArticles({
    type: "script",
    articles: [
	"w:c:ru.bleach:MediaWiki:BackToTop.js",	// Кнопка возврата вверх
	"w:c:dev:PurgeButton/code.js",			// Кнопка очистки кеша
	"w:c:dev:AjaxRC/code.js",			// Автообновление ленты
	"MediaWiki:Countdown.js",			// Таймер обратного отсчета
	"MediaWiki:RepeatableTimer.js",			// Новый таймер обратного отсчета
	"MediaWiki:Toggle.js",				// Переключение картинок в инфобоксе
	"MediaWiki:GoogleAnalytics.js",			// Google Analitics 
//	"MediaWiki:SamogotTagGallery.js",		// Галерея артов
	"MediaWiki:Badges.js",				// Ярлычки статусов страницах участников
        "w:c:ru.otaku:MediaWiki:Wikificator.js",	// Wikificator + UnTagger
	"MediaWiki:StandardEditSummary.js"		// Быстрое описание правки 
   ]
});
$.getScript('/wiki/MediaWiki:SamogotTagGallery.js?action=raw');