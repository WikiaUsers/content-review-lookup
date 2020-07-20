/* Размещённый здесь JavaScript код будет загружаться всем пользователям при обращении к каждой странице */
var ajaxPages = ["Служебная:WikiActivity","Служебная:RecentChanges","Служебная:Watchlist","Служебная:Log","Служебная:Contributions"];
var ajaxRefresh = 30000;
var AjaxRCRefreshText = 'Авто-обновление';
var AjaxRCRefreshHoverText = 'Автоматически обновляет страницу каждые '+ajaxRefresh/1000+' секунд' ;
 
PurgeButtonText = 'Обновить';
importArticles({
    type: "script",
    articles: [
	"MediaWiki:NamespaceParser.js",                            // Обрезание префиксов неймспейсов
	"w:c:ru.bleach:MediaWiki:BackToTop.js",                    // Кнопка возврата вверх
	"w:c:dev:PurgeButton/code.js",                             // Кнопка очистки кеша
	"w:c:dev:AjaxRC/code.js",                                  // Автообновление ленты
//	"w:c:ru.sword-art-online:MediaWiki:Countdown.js",          // Таймер обратного отсчета
	"w:c:ru.sword-art-online:MediaWiki:Toggle.js",             // Переключение картинок в инфобоксе
	"MediaWiki:GoogleAnalytics.js",                            // Google Analitics 
	"MediaWiki:Wikificator.js",                                // Wikificator + UnTagger
	"w:c:ru.sword-art-online:MediaWiki:StandardEditSummary.js" // Быстрое описание правки 
   ]
});
$.getScript('http://ru.sword-art-online.wikia.com/wiki/MediaWiki:SamogotTagGallery.js?action=raw');

// Скрытие спойлера
$('<a>').attr('href','#').attr('class','showspoiler').text('Читать далее...').insertAfter('.showspoiler').click(function(){var p=$(this).parent().next();$(this).remove();p.slideDown();return false;});$('span.showspoiler').remove();

// Скрытие блоков инфобоксов
$('.infobox tbody.hide td').hide();
$('.infobox tbody.hide').hover(function(){$('td',this).fadeIn()},function(){$('td',this).fadeOut()})