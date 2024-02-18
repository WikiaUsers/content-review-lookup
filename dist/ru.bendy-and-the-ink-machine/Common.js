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

/* LinkPreview */
window.pPreview = $.extend(true, window.pPreview, {RegExp: (window.pPreview || {}).RegExp || {} });
window.pPreview.defimage = 'https://static.wikia.nocookie.net/bendy-and-the-ink-machine/images/2/28/TimetheHobo%D0%91%D0%B5%D0%BD%D0%B4%D0%B8%D0%91%D1%8C%D1%91%D1%82%D1%81%D1%8F%D0%93%D0%BE%D0%BB%D0%BE%D0%B2%D0%BE%D0%B9.gif/revision/latest?cb=20210827193141&path-prefix=ru';
window.pPreview.noimage = 'https://static.wikia.nocookie.net/bendy-and-the-ink-machine/images/d/dd/Unknown.png/revision/latest?cb=20180519100741&path-prefix=ru';
window.pPreview.tlen = 1000;