/* Размещённый здесь код JavaScript будет загружаться только участникам, имеющим статус администраторов (sysops) */
//===================================
// ссылка возврата со страниц MediaWiki 
// 
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:MediaWikiBacklink/code.js',
    ]
});

//===================================
// ссылка в меню кнопки на страницу MediaWiki
// 
(function() {
    'use strict';

    var $list = $('.page-header__contribution-buttons .wds-list, .page-header__actions .wds-list, .UserProfileActionButton .WikiaMenuElement');

    if (!$list.length || window.WhatLinksHereLoaded) {
        return;
    }
    window.WhatLinksHereLoaded = true;

    var config = mw.config.get([
        'wgPageName',
        'wgUserLanguage'
    ]);

    mw.hook('dev.fetch').add(function(fetch) {
        $.when(
            fetch('whatlinkshere'),
            mw.loader.using('mediawiki.util')
        ).then(function(text) {
            var url = mw.util.getUrl('Mediawiki:' + config.wgPageName.replace(/:/g,'_')+'.css');
            $list.append(
                $('<li>', {
                    id: 'ca-whatlinkshere'
                }).append(
                    $('<a>', {
                        href: url,
                        text: 'MediaWiki'
                    })
                )
            );
            if (mw.util.getParamValue('redirect') === 'no') {
                $('.redirectText').append(
                    $('<br>'),
                    $('<span>', {
                        id: 'redirectWLH'
                    }).append(
                        '→ ',
                        $('<a>', {
                            'class': 'redirectWLH-link',
                            href: url,
                            text: text
                        })
                    )
                );
            }
        });
    });
    importArticle({
        type: 'script',
        article: 'u:dev:MediaWiki:Fetch.js'
    });
})();