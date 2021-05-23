/* Размещённый здесь JavaScript код будет загружаться всем пользователям при обращении к каждой странице */
var ajaxPages = ["Служебная:WikiActivity","Служебная:RecentChanges","Служебная:Watchlist","Служебная:Log","Служебная:Contributions"];
var ajaxRefresh = 30000;
var AjaxRCRefreshText = 'Авто-обновление';
var AjaxRCRefreshHoverText = 'Автоматически обновляет страницу каждые '+ajaxRefresh/1000+' секунд' ;

importArticles({
    type: "script",
    articles: [
        'u:ru.marvel:MediaWiki:Countdown.js',
//	"MediaWiki:SamogotTagGallery.js",		// Галерея артов
   ]
});
$.getScript('/wiki/MediaWiki:SamogotTagGallery.js?action=raw');