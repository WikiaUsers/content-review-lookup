/* 
/* ここにあるすべてのJavaScriptは、すべての利用者のどのページに対しても読み込まれます。
Any JavaScript here will be loaded for all users on every page load.
*/

/* Replaces {{USERNAME}} with the name of the user browsing the page.
   Requires copying Template:USERNAME. */
$(function() {
    if (window.disableUsernameReplace || mw.config.get('wgUserName') === null) return;
    $('span.insertusername').html(mw.config.get('wgUserName'));
});

//Redirect chat to a url if the chat isn't enabled
if (
    mw.config.get('wgCanonicalSpecialPageName') === 'Chat' &&
    !mw.loader.getState('ext.Chat2')
) {
    window.location = 'https://community.fandom.com/ja/wiki/Help:Discord';
}

//LockForums - lock after 60 days (default: 30)
window.LockForums = {
    expiryDays: 60
};