/* Размещённый здесь JavaScript код будет загружаться всем пользователям при обращении к каждой странице */

/* AjaxRC */
window.ajaxPages = ["Служебная:WikiActivity","Служебная:RecentChanges"]; 
window.AjaxRCRefreshText = 'Автообновление';

importArticles({
    type: 'script',
    articles: [
        'u:dev:WallGreetingButton/code.js'
    ]
});