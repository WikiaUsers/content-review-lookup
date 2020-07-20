function include(s) {
  document.write("<script type=\"text/javascript\" src=\"http://ja.wikia.com/index.php?title=" + encodeURI(s) + "&action=raw&ctype=text/javascript&dontcountme=s\"></script>");
}

include("User:Tommy6/js/hatenawithcounter.js");
include("User:Tommy6/js/livedoorclipwithcounter.js");
include("User:Tommy6/js/yahoobookmarkwithcounter.js");
include("User:Tommy6/js/buzzurlwithcounter.js");

/* ######################################################################### */
/* {{Username}} の設定 */
/* ######################################################################### */
 
/* {{USERNAME}}テンプレートを入力した箇所に閲覧者のユーザー名を表示させます。*/
 
$(function() {
    if (window.disableUsernameReplace || mw.config.get('wgUserName') === null) return;
    $('span.insertusername').html(mw.config.get('wgUserName'));
});
 
/* ######################################################################### */
/* {{Username}} の設定　おしまい */
/* ######################################################################### */