/* Скрипты */
importArticles({
    type: "script",
    articles: [
        "u:dev:ExtendedNavigation/code.js",
        "u:dev:AjaxRC/code.js",
        "u:dev:MediaWiki:Medals/code.js",
        "u:dev:MediaWiki:DiscordIntegrator/ru/code.js"
    ]
});
 
 
/* ======== Автообновление ======== */
// AJAX-обновление некоторых страниц(выбор страниц)
window.ajaxPages = [
    "Служебная:Watchlist",
    "Служебная:Contributions",
    "Служебная:WikiActivity",
    "Служебная:RecentChanges"
]; 
 
window.AjaxRCRefreshText = 'Автообновление'; //Отображаемое название
window.AjaxRCRefreshHoverText = 'Автоматически обновлять страницу'; //Отображаемое подсказку
/* ======== Конец Автообновления ======== */
// Добавление имени участника в шаблон.
(function($, mw) {
    if (!$('.insertusername').length) return;
    $('.insertusername').html( (wgUserName != 'null') ? wgUserName : 'Анонимный участник' );
})(this.jQuery, this.mediaWiki);