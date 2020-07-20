(function($) {
    if (!$('.avatar_body').length) {
        return;
    }
 
    $('.avatar_body').each(function() {
        var $that = $(this),
            nickname = $(this).attr('data-nick'),
            width = $(this).attr('data-width') + 'px';
 
        $.ajax({
            url: '/ru/wiki/Участник:' + nickname,
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

importArticles({
    type: "script",
    articles: [
        "u:dev:MediaWiki:Medals/code.js"
    ]
});

importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:SeeMoreActivityButton/code.js',
    ]
});

// Автообновление
window.ajaxPages = [
    "Служебная:Watchlist",
    "Служебная:Contributions",
    "Служебная:WikiActivity",
    "Служебная:RecentChanges",
    "Project:Главная",
    "Служебная:NewPages",
    "Служебная:NewFiles",
    "Служебная:Log",
    "Служебная:Исследования",
    "Шаблон:Заглавная:Шапка"
]; 
window.AjaxRCRefreshText = 'Автообновление страницы';
window.AjaxRCRefreshHoverText = 'Эта функция позволяет данным этой страницы обновляться автоматически. Вам не придётся вручную перезагружать вкладку, чтобы увидеть новые данные, они будут появляться сами';
window.ajaxIndicator = 'https://vignette.wikia.nocookie.net/lucky/images/d/de/Ajax-loader.gif/revision/latest?cb=20190302164956&path-prefix=ru';
window.ajaxRefresh = 30000;