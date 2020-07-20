/* Размещённый здесь JavaScript код будет загружаться всем пользователям при обращении к каждой странице */

//insertusername class
$(function UserNameReplace() {
    if(typeof(disableUsernameReplace) !== 'undefined' && disableUsernameReplace || wgUserName === null) return;
    $("span.insertusername").html(wgUserName);
});

window.ajaxPages = ["Служебная:WikiActivity","Служебная:RecentChanges"]; 
window.AjaxRCRefreshText = 'Автообновление';

//Неактивные пользователи
InactiveUsers = { 
    days: 30,
    text: 'Неактивен'
};