/* Размещённый здесь JavaScript код будет загружаться всем пользователям при обращении к каждой странице */
/*Автообновления*/
importScriptPage( 'AjaxRC/code.js', 'dev' );
var ajaxPages = ["Служебная:Watchlist","Служебная:Contributions","Служебная:WikiActivity","Служебная:RecentChanges"];
var AjaxRCRefreshText = 'Автообновление';
var AjaxRCRefreshHoverText = 'Автоматически обновлять страницу';
/*Похожие названия*/
importArticles({
    type: 'script',
    articles: [
        'u:dev:SearchSuggest/code.js'
    ]
});