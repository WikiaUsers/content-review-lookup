/* Размещённый здесь JavaScript код будет загружаться всем пользователям при обращении к каждой странице */
// AJAX-обновление некоторых страниц (выбор страниц)
var ajaxPages = [
    "Служебная:Watchlist",
    "Служебная:Contributions",
    "Служебная:WikiActivity",
    "Служебная:RecentChanges"
];
var AjaxRCRefreshText = 'автообновление страницы'; //Отображаемое название
 
var PurgeButtonText = 'Обновить'; //Отображаемое название
 
/*Показ IP анонимов в комментариях*/
window.RevealAnonIP = {
    permissions: ['rollback', 'sysop', 'bureaucrat'] };