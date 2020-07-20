importScriptPage('SocialIcons/code.js', 'dev');
 
/* Изменение плашек */
importScript('MediaWiki:Common.js/masthead.js');
 
/* Автоматическая выдача плашек по числу правок участника */
$(function () {
    if ($(".tally > em").length && $('#UserProfileMasthead').length && mw.config.get('wgAction') === 'view') {
        var editCount = $(".tally > em").text();
        var title = '';
        if (editCount <= 100) {
            title = "Совёнок";
        } else if (editCount > 100 && editCount <= 500) {
            title = "Член клюва";
        } else if (editCount > 500 && editCount <= 1000) {
            title = "Ночной Страж";
        } else {
            title = "Парламентарий";
        }
        $('<span />', {
            class: 'tag',
            text: title
        }).appendTo('.masthead-info hgroup');
    }
});
 
/*Отображение ника на странице с соответствующим шаблоном*/
(function($, mw) {
   if (!$('.insertusername').length) {
       return;
   }
 
   if (wgUserName != 'null') {
       $('.insertusername').html(wgUserName);
   } else {
       $('.insertusername').text('Анонимный участник');
   }
   })(this.jQuery, this.mediaWiki);


/*Хехехе, автообновление*/
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
	"MediaWiki:GoogleAnalytics.js",                            // Google Analitics 
	"MediaWiki:Wikificator.js",                                // Wikificator 
   ]
});