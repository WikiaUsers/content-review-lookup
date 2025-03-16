/* Any JavaScript here will be loaded for all users on every page load. */
/* Any JavaScript here will be loaded for all users on every page load. */
/* Размещённый здесь JavaScript код будет загружаться всем пользователям при обращении к каждой странице */

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

/*Показ IP анонимов в комментариях*/
window.RevealAnonIP = {
    permissions: ['rollback', 'sysop', 'bureaucrat']
};

/*Отключение принудительной капитализации букв после эмобана*/
window.nAutoCap = $.extend(true, window.nAutoCap, {
    autocap: false,
});

//******* bugfixes start *******
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