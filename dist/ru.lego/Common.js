/* Размещённый здесь JavaScript код будет загружаться всем пользователям при обращении к каждой странице */
MastRights = {};
MastRights["Рыбка"] = ["Консультант"];
MastRights["Count Dooku2012"] = ["Консультант"];

importScriptPage("MediaWiki:Masthead.js", "ru.c");
// ************************************************** 
// Автоматическое обновление 
// **************************************************  importScriptPage( 'AjaxRC/code.js', 'dev' ); // AJAX-обновление некоторых страниц 
var ajaxPages = ["Служебная:Watchlist","Служебная:Contributions","Служебная:WikiActivity","Служебная:RecentChanges"]; // AJAX-обновление некоторых страниц(выбор страниц) 
var AjaxRCRefreshText = 'Автообновление'; //Отображаемое название 
var AjaxRCRefreshHoverText = 'Автоматически обновлять страницу'; //Отображаемое подсказку