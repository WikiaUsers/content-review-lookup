/* Размещённый здесь JavaScript код будет загружаться всем пользователям при обращении к каждой странице */

/*Импорт*/

//Таймеры
importScript("MediaWiki:RepeatableTimer.js");

//Добавление статусов
importScript("MediaWiki:Common.js/masthead.js");

/*Конец импорт*/

window.railWAM = {
    logPage:"Project:WAM Log"
};

/*Кнопка возврата к началу*/
window.BackToTopModern = true;
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:BackToTopButton/code.js',
    ]
});

/*Автообновление*/
importScriptPage( 'AjaxRC/code.js', 'dev' );
var ajaxPages = ["Служебная:Watchlist","Служебная:Contributions","Служебная:WikiActivity","Служебная:RecentChanges"];
var AjaxRCRefreshText = 'Автообновление';
var AjaxRCRefreshHoverText = 'Автоматически обновлять страницу';