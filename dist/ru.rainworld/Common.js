/* Размещённый здесь JavaScript код будет загружаться всем пользователям при обращении к каждой странице */

//AJAX-обновление некоторых страниц(выбор страниц)
window.ajaxPages = [
    "Служебная:Watchlist",
    "Служебная:Contributions",
    "Служебная:WikiActivity",
    "Служебная:RecentChanges"
];
window.AjaxRCRefreshText = 'автообновление страницы'; //Отображаемое название

//Код для замены имени участника. 
$(function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName === null) return;
    $("span.insertusername").html(wgUserName);
});