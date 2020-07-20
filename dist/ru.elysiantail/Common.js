/*** НАСТРОЙСКИ СКРИПТОВ ***/
/*Добавляет плашку "НЕАКТИВЕН" для неактивных участников*/
InactiveUsers = { 
    months: 1,
    text: 'НЕАКТИВЕН'
};
 
/*** ИМПОРТЫ ***/
importArticles({
    type: 'script',
    articles: [
        'u:dev:InactiveUsers/code.js',
        'u:dev:ExtendedNavigation/code.js',
        'u:dev:PurgeButton/code.js',
        'u:dev:FloatingToc/code.js',
        'u:dev:MediaWiki:AjaxRC/code.js'
    ]
});
var ajaxPages = ["Служебная:Watchlist","Служебная:Contributions","Служебная:WikiActivity","Служебная:RecentChanges"];
var AjaxRCRefreshText = 'Автообновление';
var AjaxRCRefreshHoverText = 'Автоматически обновлять страницу';
 
/*Скрипт для работы тега <span class="insertusername"></span>*/
/**Подставляет ник читающего статью, или заданое слово если аноним\не прогрузился**/
(function () {
    if ( !wgUserName ) return;
    $("span.insertusername").html(wgUserName); 
})();
 
/*Добавление к внешним ссылкам автоматическое открытие в новой вкладке*/
/**Спёр со стены Kopcap94**/
$(function() {
    if ($('.external').length) {
        $('.external').attr('target','_blank');
    }
});