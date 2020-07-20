/* Размещённый здесь JavaScript код будет загружаться всем пользователям при обращении к каждой странице */
// 1. опция с настройками AjaxRC
window.ajaxSpecialPages = ["Recentchanges", "WikiActivity", "Watchlist", "Log", "Contributions"];
window.ajaxRefresh = 60000;
window.AjaxRCRefreshText = 'Автообновление страницы';
window.AjaxRCRefreshHoverText = 'Автоматически обновлять страницу';
 
// 2. опция импорта AjaxRC
importScriptPage('AjaxRC/code.js','dev');