/* Размещённый здесь код JavaScript будет загружен всем пользователям при обращении к какой-либо странице */

// AJAX-обновление некоторых страниц (выбор страниц)
window.ajaxPages = [
    "Служебная:Watchlist",
    "Служебная:Contributions",
    "Служебная:WikiActivity",
    "Служебная:RecentChanges"
]; 
window.AjaxRCRefreshText = 'Автообновление'; //Отображаемое название
window.AjaxRCRefreshHoverText = 'Автоматически обновлять страницу'; //Отображаемое подсказку

if (document.URL.indexOf("action=edit") > 0 || document.URL.indexOf("action=submit") > 0) {
        if (wgCanonicalNamespace != "Special") {
            addOnloadHook(function(){
            if (mwEditButtons.length >= 3) {
                mwEditButtons[0].imageFile = 'http://upload.wikimedia.org/wikipedia/commons/f/fa/Button_bold_ukr.png';
                mwEditButtons[1].imageFile = 'http://upload.wikimedia.org/wikipedia/commons/f/f3/Button_italic_ukr.png';
                mwEditButtons[2].imageFile = 'http://upload.wikimedia.org/wikipedia/commons/0/03/Button_internal_link_ukr.png';
            }
        });
    }
}

 if (mwCustomEditButtons) { 
    //Перенаправление
    mwCustomEditButtons[mwCustomEditButtons.length] = { 
        "imageFile": "http://upload.wikimedia.org/wikipedia/ru/1/1d/Button_redirect_rus.png", 
        "speedTip": "Перенаправление", 
        "tagOpen": "#перенаправление [[", 
        "tagClose": "]]", 
        "sampleText": "название страницы"
    };
    
    //Template button
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "http://upload.wikimedia.org/wikipedia/commons/3/3b/Button_template_alt.png",
        "speedTip": "Шаблон",
        "tagOpen": "{{",
        "tagClose": "}}",
        "sampleText": "Название шаблона"
    };
}

// Avatar Insertion
// Author: Wildream
// Для страниц Викии_Вики:Доска_почёта и Викии_Вики:Администрация
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

// Открытие ссылок в отдельной вкладке
!function( $ ) {
    if ( $( '.user-link' ).length ) { $( '.user-link a' ).attr( 'target', '_blank' ); }
    if ( $( '.references' ).length ) { $( '.references .reference-text a' ).attr( 'target', '_blank' ); }
}( jQuery );

/* Запрет на создание сообщений в главной теме «Архив» */
$(function() {
    if (wgPageName == 'Главная_тема:Архив') {
        $('#ForumNewMessage').replaceWith('<blockquote class="message">Это архив, вы не можете оставлять здесь сообщения</blockquote>');
    }
});

// https://dev.fandom.com/wiki/DiscordModule#Use_nicknames
(window.dev = window.dev || {}).discordmodule = {usenick: true};

// Убирает замену тега сносок на шаблон через викификатор
mw.hook('wikificator.ready').add(function(wikificator) {
    wikificator.t.rr.stage4 = [
        {reg: /<<(\S.+\S)>>/g, m: "g", exp: '"$1"'},
        {reg: /(su[pb]>)-(\d)/g, m: "g", exp: "$1−$2"},
        {reg: /<(b|strong)>(.*?)<\/(b|strong)>/gi, m: "gi", exp: "'''$2'''"},
        {reg: /<(i|em)>(.*?)<\/(i|em)>/gi, m: "gi", exp: "''$2''"},
        {reg: /^<hr ?\/?>/gim, m: "gim", exp: "----"},
        {reg: /[\u00A0 \t]*<ref(?:\s+name="")?(\s|>)/gi, m: "gi", exp: "<ref$1"},
    ];
});