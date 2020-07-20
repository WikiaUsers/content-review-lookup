AjaxRCRefreshText = 'Автообновление';
AjaxRCRefreshHoverText = 'Автоматически обновлять страницу';
ajaxPages = ["Служебная:RecentChanges", "Служебная:WikiActivity"];

importArticles({
    type: 'script',
    articles: [
        'u:dev:AjaxRC/code.js', /* Автообновление на страницах активности */
        'u:dev:Countdown/code.js', /* Таймер */
        'MediaWiki:PurgeButton/code.js', /* Кнопка "Обновить" */
    ]
});