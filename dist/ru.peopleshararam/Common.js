/* Размещённый здесь JavaScript-код будет загружаться всем пользователям при обращении к каждой странице */

// Автообновление
window.ajaxPages = [
    "Служебная:Watchlist",
    "Служебная:Contributions",
    "Служебная:WikiActivity",
    "Служебная:RecentChanges"
]; 
window.AjaxRCRefreshText = 'Автообновление';
window.AjaxRCRefreshHoverText = 'Автоматическое обновление страницы';

document.querySelector(".premium-recirculation-rail h2").innerHTML = "Популярные статьи";