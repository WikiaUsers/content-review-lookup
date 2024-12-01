/* Размещённый здесь JavaScript код будет загружаться всем пользователям при обращении к каждой странице */

window.ajaxPages = ["Служебная:WikiActivity","Служебная:RecentChanges"]; 
window.AjaxRCRefreshText = 'Автообновление';

// Запрет на создание тем в архиве
$(function() {
    if (wgPageName == 'Главная_тема:Архив') {
        $('#ForumNewMessage').replaceWith('<blockquote class="message">В этой теме запрещено писать.</blockquote>');
    }
});
 
document.addEventListener('DOMContentLoaded', function() {
    var apperanceBlocks = document.getElementsByClassName( 'appBlock_apperanceBlock' );
    for ( var i = 0; i < apperanceBlocks.length; i++ )//var i -> let
        new ApperanceBlock( apperanceBlocks[ i ] );
});

(function () {
    if ( !wgUserName ) return;
    $("span.InputUsername").text(wgUserName); 
})();

// Запрет на некропостинг
/* LockOldComments */
    window.lockOldComments = (window.lockOldComments || {});
    window.lockOldComments.limit = 90;
        /** translation fix **/
        window.dev = window.dev || {};
        window.dev.i18n = window.dev.i18n || {};
        window.dev.i18n.overrides = window.dev.i18n.overrides || {};
        window.dev.i18n.overrides['LockOldComments'] = window.dev.i18n.overrides['LockOldComments'] || {};
        window.dev.i18n.overrides['LockOldComments']['locked-reply-box'] = "🔒 Этой ветке комментариев более " + window.lockOldComments.limit + " " + (window.lockOldComments.limit > 1 ? 'дней.' : 'дня.') + " Нет необходимости отвечать.";