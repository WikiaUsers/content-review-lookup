/* Размещённый здесь JavaScript код будет загружаться всем пользователям при обращении к каждой странице */
var ajaxPages = ["Служебная:WikiActivity","Служебная:RecentChanges","Служебная:Watchlist","Служебная:Log","Служебная:Contributions"];
var ajaxRefresh = 30000;
var AjaxRCRefreshText = 'Авто-обновление';
var AjaxRCRefreshHoverText = 'Автоматически обновляет страницу каждые '+ajaxRefresh/1000+' секунд' ;

PurgeButtonText = 'Обновить';
importArticles({
    type: "script",
    articles: [
	"w:c:dev:PurgeButton/code.js",         // Кнопка очистки кеша
	"w:c:dev:AjaxRC/code.js",              // Автообновление ленты
	"MediaWiki:Countdown.js",              // Таймер обратного отсчета
	"MediaWiki:Toggle.js",                 // Переключение картинок в инфобоксе
	"MediaWiki:GoogleAnalytics.js",        // Google Analitics 
//	"MediaWiki:SamogotTagGallery.js",      // Галерея артов
	"MediaWiki:StandardEditSummary.js"     // Быстрое описание правки 
   ]
});


function addWikifButton() {
        var toolbar = document.getElementById('toolbar')
        if (!toolbar) return
        var i = document.createElement('img')
        i.src = 'http://upload.wikimedia.org/wikisource/ru/d/d1/Button-wikifikator.png'
        i.alt = i.title = 'викификатор'
        i.onclick = Wikify
        i.style.cursor = 'pointer'
        toolbar.appendChild(i)
}
if (wgAction == 'edit' || wgAction == 'submit') {
        importScriptURI('http://ru.wikipedia.org/w/index.php?title=MediaWiki:Wikificator.js&action=raw&ctype=text/javascript')
        addOnloadHook(addWikifButton)
}