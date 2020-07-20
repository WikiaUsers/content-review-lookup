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