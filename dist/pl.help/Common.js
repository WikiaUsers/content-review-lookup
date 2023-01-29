/* Umieszczony tutaj kod JavaScript zostanie załadowany przez każdego użytkownika, podczas każdego ładowania strony. */
/* Any JavaScript here will be loaded for all users on every page load. */

/* Replaces {{USERNAME}} with the name of the user browsing the page.
   Requires copying Template:USERNAME. */
$(function () {
    if (window.disableUserReplace || mw.config.get('wgUserName') === null) return;
    $('span.insertusername').html(mw.config.get('wgUserName'));
});
/* End of the {{USERNAME}} replacement */

$(function () {
    if (window.disableUserReplace || mw.config.get('wgUserName') === null) return;
    $('span.insertusersandboxlink').html('<a href="/User:' + mw.config.get('wgUserName') + '/sandbox">sandbox</a>');
});