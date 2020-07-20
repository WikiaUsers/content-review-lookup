/* Размещённый здесь JavaScript код будет загружаться всем пользователям при обращении к каждой странице */
/** 'u:c:MediaWiki:Snow.js',**/ 
/*^вписать вслучай нового года^*/

/*Кнопки СоцСетей*/
$('.WikiaRail').prepend(
    '<div style="right:5px; position: absolute;">' +
        '<div style="position: absolute;" class="SocialIcon">' +
            '<div style="float:right;">' +
                '<a href="https://vk.com/killlakill" target="_blank">' +
                    '<img src="https://images.wikia.nocookie.net/kill-la-kill/ru/images/d/dd/%D0%92%D0%9A%D0%BE%D0%BD%D1%82%D0%B0%D0%BA%D1%82%D0%B5.png">' +
                '</a>' +
            '</div>' + 
        '</div>' +
        '<div style="position: absolute; margin-top:42px" class="SocialIcon">' +
            '<div style="float:right;">' + 
                '<a href="https://twitter.com/KillLaKillUSA" target="_blank">' + 
                    '<img src="https://images.wikia.nocookie.net/kill-la-kill/ru/images/a/ac/%D0%A2%D0%B2%D0%B8%D1%82%D1%82%D0%B5%D1%80.png">' +
                '</a>' +
            '</div>' + 
        '</div>' +
        '<div style="position: absolute; margin-top:84px" class="SocialIcon">' +
            '<div style="float:right;">' +
                '<a href="https://web.facebook.com/Killlakillusa/" target="_blank">' +
                    '<img src="https://images.wikia.nocookie.net/kill-la-kill/ru/images/7/72/%D0%A4%D0%B5%D0%B9%D1%81%D0%B1%D1%83%D0%BA.png">' +
                '</a>' +
            '</div>' +
        '</div>' +
    '</div>'
);


/*** НАСТРОЙСКИ СКРИПТОВ ***/
/*Добавляет плашку "НЕАКТИВЕН" для неактивных участников*/
InactiveUsers = { 
    months: 1,
    text: 'НЕАКТИВЕН'
};
 
/*** ИМПОРТЫ ***/
importArticles({
    type: 'script',
    articles: [
        'MediaWiki:Common.js/BackToTopButton.js',
        'MediaWiki:Common.js/vk_comments.js',
        'u:dev:AjaxRC/code.js',
        'u:dev:ExtendedNavigation/code.js',
        'u:dev:PurgeButton/code.js',
        'u:dev:RecentChangesMultiple/code.2.js',
        'u:dev:TopEditors/code.js',
        'u:dev:FloatingToc/code.js',
        'u:dev:InactiveUsers/code.js',
    ]
});

var ajaxPages = ["Служебная:Watchlist","Служебная:Contributions","Служебная:WikiActivity","Служебная:RecentChanges"];
var AjaxRCRefreshText = 'Автообновление';
var AjaxRCRefreshHoverText = 'Автоматически обновлять страницу';

/*Скрипт для работы тега <span class="insertusername"></span>*/
/**чтоб мой профайл не выглядил ещё более идиотским**/
(function () {
    if ( !wgUserName ) return;
    $("span.insertusername").html(wgUserName); 
})();

/*Добавление к внешним ссылкам автоматическое открытие в новой вкладке*/
/**Спёр со стены Kopcap94**/
$(function() {
    if ($('.external').length) {
        $('.external').attr('target','_blank');
    }
});

/* Вкладки */
;(function($) {
    $('.tab-content:not(".tab-current")').hide();
    
    $(".tabs-menu li").click(function() {
        if ($(this).hasClass('current')) { return; }
        
        var tab = $(this).attr("data-tab");
        
        $('.current').toggleClass('current');
        $(this).addClass('current');
        
        $('.tab-content:not("#' + tab + '")').hide().removeClass('tab-current');
        $('#' + tab).addClass('tab-current').fadeIn();
    });
})(this.jQuery);