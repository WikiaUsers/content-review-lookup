/* ######################################################################### */
/* {{Username}} の設定 */
/* ######################################################################### */
 
/* {{USERNAME}}テンプレートを入力した箇所に閲覧者のユーザー名を表示させます。*/
 
$(function() {
    if (window.disableUsernameReplace || mw.config.get('wgUserName') === null) return;
    $('span.insertusername').text(mw.config.get('wgUserName'));
});
 
/* ######################################################################### */
/* {{Username}} の設定　おしまい */
/* ######################################################################### */