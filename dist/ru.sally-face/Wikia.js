/* Импорт Скриптов */
importArticles({
    type: 'script',
    articles: [
        'u:dev:AjaxBatchDelete/code.2.js',
        'u:dev:AjaxBatchUndelete.js',
        'u:dev:AjaxRC/code.js',
        'u:dev:DiscordIntegrator/ru/code.js',
        'u:dev:Medals/code.js', //Почему бы и нет?
    ]
}, {
    type: 'style',
    article: 'u:dev:MediaWiki:FontAwesome.css'
});

/* ======== Автообновление ======== */
// AJAX-скрипт, обновляющий некоторые страницы. Выбор страниц:
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