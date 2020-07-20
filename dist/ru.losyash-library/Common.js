/* Главная тема «Референдумы» */
/* Автор: Rendann */
/* Позаимствовано с Angry Birds Wiki*/
$(function() {
    if (mw.config.get( 'wgPageName' ) == 'Главная_тема:Референдумы' && mw.config.get( 'wgUserGroups' ).indexOf('sysop') === -1) {
        $('#ForumNewMessage').replaceWith('<blockquote class="message">Эта главная тема защищена. Вы можете предложить свою идею для референдума администрации.</blockquote>');
    }
});

/*AjaxRC*/
window.ajaxPages = [
    "Служебная:Watchlist",
    "Служебная:Contributions",
    "Служебная:WikiActivity",
    "Служебная:RecentChanges"
];
window.AjaxRCRefreshText = 'Автообновление'; //Отображает название
window.AjaxRCRefreshHoverText = 'Автоматически обновлять страницу'; //Отображает подсказку

/* Доска Почёта*/
/* Автор: Wildream*/
/* Позаимствовано с Angry Birds Wiki*/
(function($) {
    if (!$('.avatar_body').length) {
        return;
    }
 
    $('.avatar_body').each(function() {
        var $that = $(this),
            nickname = $(this).attr('data-nick'),
            width = $(this).attr('data-width') + 'px';
 
        $.ajax({
            url: '/ru/wiki/Special:Contributions/' + nickname,
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