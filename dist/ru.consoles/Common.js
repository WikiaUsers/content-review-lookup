/* Размещённый здесь JavaScript код будет загружаться всем пользователям при обращении к каждой странице */

 // **************************************************
 //  Автоматическое обновление
 // **************************************************
 
importScriptPage( 'AjaxRC/code.js', 'dev' ); //
var ajaxPages = ["Служебная:Watchlist","Служебная:Contributions","Служебная:WikiActivity","Служебная:RecentChanges"]; //
var AjaxRCRefreshText = 'Авто-обновление'; //
var AjaxRCRefreshHoverText = 'Включить авто-обновление страницы'; //

/*Неактивные пользователи*/
//Inactive users
InactiveUsers = { 
    months: 1,
    text: 'НЕАКТИВЕН'
};
 
importScriptPage('InactiveUsers/code.js', 'dev');