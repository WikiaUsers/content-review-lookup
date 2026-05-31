/* Размещённый здесь JavaScript код будет загружаться всем пользователям при обращении к каждой странице */
window.ajaxPages = [
    "Служебная:Watchlist",
    "Служебная:Contributions",
    "Служебная:WikiActivity",
    "Служебная:RecentChanges"
];
window.AjaxRCRefreshText = 'Автообновление'; //Отображаемое название
window.AjaxRCRefreshHoverText = 'Автоматически обновлять страницу'; //Отображаемая подсказка

importArticles({
    type: "script",
    articles: [
        // ...
        //'u:dev:MediaWiki:DiscordIntegrator/code.js'
        'w:c:dev:TopEditors/code.js'        
        // ...
    ]
});

/*LockOldComments*/
window.lockOldComments = (window.lockOldComments || {});
window.lockOldComments.limit = 180;