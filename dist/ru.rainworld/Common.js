importScriptPage('MediaWiki:AjaxRC/code.js', 'dev');
var ajaxPages = ["Special:Watchlist", "Special:Contributions", "Special:WikiActivity", "Special:RecentChanges", "Служебная:Watchlist", "Служебная:Contributions", "Служебная:WikiActivity", "Служебная:RecentChanges"];
var AjaxRCRefreshText = 'Автообновление страницы';
var PurgeButtonText = 'Обновить';

//Код для замены имени участника. 
$(function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName === null) return;
    $("span.insertusername").html(wgUserName);
});