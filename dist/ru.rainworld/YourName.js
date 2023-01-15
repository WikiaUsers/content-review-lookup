$(function UserNameReplace() {
    if(typeof(disableUsernameReplace) !== 'undefined' && disableUsernameReplace || mw.config.values.wgUserName === null) return;
    $(".js-insert-user-name").text(mw.config.values.wgUserName);
});