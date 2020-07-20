/* 
/* ここにあるすべてのJavaScriptは、すべての利用者のどのページに対しても読み込まれます。
Any JavaScript here will be loaded for all users on every page load.
*/

/* auto refresh */
AjaxRCRefreshText = '自動更新';
AjaxRCRefreshHoverText = 'このページを自動的に更新します';
ajaxPages = ["特別:最近の更新","特別:WikiActivity"];

/* Replaces {{USERNAME}} with the name of the user browsing the page.
   Requires copying Template:USERNAME. */
$(function() {
    if (window.disableUsernameReplace || mw.config.get('wgUserName') === null) return;
    $('span.insertusername').html(mw.config.get('wgUserName'));
});