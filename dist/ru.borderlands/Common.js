/* Размещённый здесь JavaScript код будет загружаться всем пользователям при обращении к каждой странице */

//настройки цитат
window.nQuoteSettings = window.nQuoteSettings || {};
window.nQuoteSettings.useQuoteTemplate = true;

//настройки для pagePreview
window.pPreview = $.extend(true, window.pPreview, {
    defimage: 'https://vignette.wikia.nocookie.net/borderlands/images/0/05/Ajax.gif/revision/latest?cb=20170626182120&path-prefix=ru',
    noimage: 'https://vignette.wikia.nocookie.net/borderlands/images/f/f5/%D0%97%D0%B0%D0%B3%D0%BB%D1%83%D1%88%D0%BA%D0%B0.png/revision/latest/scale-to-width-down/350?cb=20160122074659&path-prefix=ru',
    RegExp: {
        iimages: [new RegExp('^([Ff]ile:|[Фф]айл:)?Indef\\.png$')],
        ipages: [new RegExp('.*?Дерево[_ ]навыков.*')],
        ilinks: [new RegExp('.*?Дерево[_ ]навыков.*')],
    },
});

// AJAX-обновление некоторых страниц(выбор страниц) AjaxRC *****
window.ajaxPages = [
    "Служебная:Watchlist",
    "Служебная:Contributions",
    "Служебная:WikiActivity",
    "Служебная:RecentChanges"
];
window.AjaxRCRefreshText = 'автообновление страницы'; //Отображаемое название
// AjaxRC *****

window.PurgeButtonText = 'Обновить'; //Отображаемое название

/*Показ IP анонимов в комментариях*/
window.RevealAnonIP = {
    permissions: ['rollback', 'sysop', 'bureaucrat']
};

/*Отключение принудительной капитализации букв после эмобана*/
window.nAutoCap = $.extend(true, window.nAutoCap, {
    autocap: false,
});

/*для работы WAM виджета*/
window.railWAM = {
    logPage:"Project:WAM Log",
    // показывать ниже самых интересных вещей
    appendAfter: ['#wikia-recent-activity', '.insights-module'],
};

//******* bugfixes start *******
//*******
//отключение ссылок в recentchanges, иногда посылающих на #
if (wgCanonicalSpecialPageName === 'Recentchanges') {
    $('body').on('click', '.mw-enhanced-rc .mw-collapsible-toggle a', function(e){e.preventDefault()});
}
//******
//правильные формы мн числа для количества "страниц" в заголовке
$(function() {
    // plural for mw:community-header-pages @user:fngplg, 2018
    mw.loader.using(['mediawiki.language']).done(function() {
        $('.wds-community-header__counter-label').text(
            mw.language.convertPlural(
                $('.wds-community-header__counter-value').text(),
                ['страница', 'страниц', 'страницы']
            )
        );
    });
});
//******
//******* bugfixes end *******

//collapsing in the community corner
(function ($) {
    function makeColl () {
        $('.CommunityCornerModule').find('.mw-collapsible').makeCollapsible();
    }
    $(function(){
        var no = new MutationObserver(function(e) {
            for(var i in e) {
                if (e[i].addedNodes && e[i].addedNodes.length > 0) {
                    for (var k in e[i].addedNodes) {
                        if (e[i].addedNodes[k] instanceof Node && $(e[i].addedNodes[k]).hasClass('CommunityCornerModule')) {
                            no.disconnect();
                            mw.loader.using('jquery.makeCollapsible', makeColl);
                            return;
                        }
                    }//for added node
                }//if added nodes
            }//for mutation record
        });//mutation observer
        if ($('#WikiaRail').length) {
            no.observe($('#WikiaRail').get(0), {childList: true});
        }
    });//doc.rdy
}(jQuery)); //collapsing in the community corner