/**
 * Name:        WhatLinksHere
 * Version:     v1.1
 * Author:      KockaAdmiralac <wikia@kocka.tech>
 * Description: Adds a link to Special:WhatLinksHere below the edit dropdown
 */

(function() {
    'use strict';

    var $list = $('.page-header__actions .wds-list, .UserProfileActionButton .WikiaMenuElement');

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
            var url = mw.util.getUrl('Special:WhatLinksHere/' + config.wgPageName);
            $list.append(
                $('<li>', {
                    id: 'ca-whatlinkshere'
                }).append(
                    $('<a>', {
                        href: url,
                        text: text
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