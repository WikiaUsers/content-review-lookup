/* Размещённый здесь JavaScript код будет загружаться всем пользователям при обращении к каждой странице */
var ajaxPages = ["Служебная:WikiActivity","Служебная:RecentChanges","Служебная:Watchlist","Служебная:Log","Служебная:Contributions"];
var ajaxRefresh = 30000;
var AjaxRCRefreshText = 'Авто-обновление';
var AjaxRCRefreshHoverText = 'Автоматически обновляет страницу каждые '+ajaxRefresh/1000+' секунд' ;
 
PurgeButtonText = 'Обновить';
importArticles({
    type: "script",
    articles: [
	"w:c:ru.otaku:MediaWiki:Wikificator.js",                   // Викификатор
	"w:c:ru.bleach:MediaWiki:BackToTop.js",                    // Кнопка возврата вверх
	"w:c:dev:PurgeButton/code.js",                             // Кнопка очистки кеша
	"w:c:dev:AjaxRC/code.js",                                  // Автообновление ленты
	"w:c:ru.sword-art-online:MediaWiki:RepeatableTimer.js",    // Таймер обратного отсчета
	"w:c:ru.sword-art-online:MediaWiki:Toggle.js",             // Переключение картинок в инфобоксе
	"MediaWiki:GoogleAnalytics.js",                            // Google Analitics 
	"w:c:ru.sword-art-online:MediaWiki:StandardEditSummary.js" // Быстрое описание правки 
   ]
});

$('.infobox tbody.hide').hide();
$('.infobox tbody.hide').hover(function(){$('td',this).fadeIn()},function(){$('td',this).fadeOut()})
$('.wordmark img')[0].src="https://images.wikia.nocookie.net/__cb20140627113302/thy/ru/images/1/18/Logo_THY.gif"