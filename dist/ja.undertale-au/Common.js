/* ここにあるすべてのJavaScriptは、すべてのページ読み込みですべての利用者に対して読み込まれます */
/* Spoiler */
window.SpoilerAlertJS = {
    question: 'これはNSFWコンテンツです。これは一部の年齢には適さないコンテンツです。表示しますか?',
    yes: 'はい',
    no: 'いいえ',
    fadeDelay: 1600
};
/* [[Template:USERNAME]] */
function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName === null) return;
    $("span.insertusername").html(wgUserName);
 }
$(UserNameReplace);