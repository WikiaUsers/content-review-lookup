/* Вставка юзернейма с помощью <span class="insertusername"></span> */
(function( $, mw ) {
    if ( !$( '.insertusername' ).length ) return;
    var nick = mw.config.get( 'wgUserName' );
    $( '.insertusername' ).text( ( nick !== null ) ? nick : 'Анонимный участник' );
})( this.jQuery, this.mediaWiki );

//AjaxRC
window.ajaxSpecialPages = [
    "RecentChanges",
    "Watchlist",
    "Log",
    "WikiActivity"
];
window.AjaxRCRefreshText = 'Автообновление';

// Автоматическая выдача плашек по числу правок участника ([[w:c:ru.warriors-cats:MediaWiki:Common.js]])
/*
$(function () {
    if ($(".tally > em").length && $('#UserProfileMasthead').length && mw.config.get('wgAction') === 'view') {
        var editCount = $( '.masthead-info-lower .tally:first-child > em' ).text(),
            title = '';
        if (editCount <= 100) {
            title = "Новый";
        } else if (editCount > 100 && editCount <= 500) {
            title = "Продолжаю";
        } else if (editCount > 500 && editCount <= 1000) {
            title = "Нестарый";
        } else {
            title = "Ура";
        }
        $('<span />', {
            class: 'tag',
            text: title
        }).appendTo('.masthead-info hgroup');
    }
});
*/
// Взято с ABW. Автор: Wildream.
(function($) {
    if (!$('.avatar_body').length) {
        return;
    }
 
    $('.avatar_body').each(function() {
        var $that = $(this),
            nickname = $(this).attr('data-nick'),
            width = $(this).attr('data-width') + 'px';
 
        $.ajax({
            url: '/wiki/Special:Contributions/' + nickname,
            type: 'GET',
            success: function(data) {
                if (data) {
                    $that.empty().append(
                        $(data).find('.masthead-avatar').children('img').css({
                            'width' : width,
                            'height': 'auto'
                        })
                    );
                }
            },
            error: function() {
                console.log('Error: Cannot obtain user avatar.');
            }
        });
    });
})(this.jQuery);