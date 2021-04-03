//Шаблон {{Имя}}
$('.Имя').text(mw.config.get('wgUserName'));
//Авто-обновление ряда страниц
window.ajaxPages = [
    "Служебная:Watchlist",
    "Служебная:Contributions",
    "Служебная:WikiActivity",
    "Служебная:RecentChanges"
]; 
window.AjaxRCRefreshText = 'Авто-обновление'; //Отображаемое название