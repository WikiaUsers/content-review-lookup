window.ajaxPages = [
    "Служебная:RecentChanges",
    "Служебная:WikiActivity",
    "Служебная:NewFiles"
];
window.ajaxRefresh = 60000;
window.AjaxRCRefreshText = 'Авто-Обновление';
window.AjaxRCRefreshHoverText  = 'Включить авто-обновление страницы';

importArticles({
    type: 'script',
    articles: [
        'u:dev:AjaxRC/code.js'
    ]
});