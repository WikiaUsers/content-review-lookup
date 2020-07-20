/* Размещённый здесь JavaScript код будет загружаться всем пользователям при обращении к каждой странице */

/****************************************/
/* Import Code                          */
/****************************************/
 
importArticles({
    type: 'script',
    articles: [
        'w:dev:AjaxRC/code.js',
        'w:dev:PurgeButton/code.js',
        'MediaWiki:Common.js/standardeditsummaries.js',
        'MediaWiki:Common.js/BackToTopButton.js',
        'w:dev:DupImageList/code.js',
        'MediaWiki:Common.js/masthead.js',
        'w:dev:AjaxPatrol/code.js',
        'w:dev:TopEditors/code.js',
    ]
});
 
/****************************************/
/* Misc                                 */
/****************************************/
 
var ajaxPages = ["Служебная:Watchlist","Служебная:Contributions","Служебная:WikiActivity","Служебная:RecentChanges"];
var AjaxRCRefreshText = 'Автообновление страницы';
var PurgeButtonText = 'Обновить';

/* Таблички */

/*Мор-Таурон:*/
MastRights = {};
MastRights["Мор-Таурон"] = ["Серый кардинал"];

importScriptPage("MediaWiki:Masthead.js", "ru.c");
MastRights = {};
MastRights["Mikhail 444"] = ["Архивариус"];

importScriptPage("MediaWiki:Masthead.js", "ru.c");