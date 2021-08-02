/* ======================================================
//Добавляет в меню около кнопки «Править» ссылки на дополнительные служебные страницы: «Ссылки сюда», «Связанные правки» и «Сведения о странице»
//Скрипт основан на dev.fandom.com/wiki/WhatLinksHere
//Автор оригинального скрипта: KockaAdmiralac
========================================================*/
importArticle({
        type: 'script',
        article: [
        	'u:dev:MediaWiki:Fetch.js',
        	'u:nkch:MediaWiki:WhatLeavesHere.js'
        	]
    });

(function() {
    'use strict';

    var $list = $('.page-header__contribution-buttons .wds-list, .page-header__actions .wds-list, .UserProfileActionButton .WikiaMenuElement');
    
    if (!$list.length || window.AdditionalToolsPages) {
        return;
    }
    window.AdditionalToolsPages = true;

    var config = mw.config.get([
        'wgPageName',
        'wgUserLanguage'
    ]);

    mw.hook('dev.fetch').add(function(fetch) {
        $.when(
            mw.loader.using('mediawiki.util')
        ).then(function(text) {
            var url_whatlinkshere = mw.util.getUrl('Special:WhatLinksHere/' + config.wgPageName);
            var url_WhatLeavesHere = mw.util.getUrl('Special:WhatLeavesHere') + '?target=' + config.wgPageName;
            var url_action_info = mw.util.getUrl(config.wgPageName) + '?action=info';
            $list.append(
                $('<li>', {
                    id: 'atp-whatlinkshere'
                }).append(
                    $('<a>', {
                        href: url_whatlinkshere,
                        text: 'Ссылки сюда'
                    })
                )
            );
            $list.append(
                $('<li>', {
                    id: 'atp-WhatLeavesHere'
                }).append(
                    $('<a>', {
                        href: url_WhatLeavesHere,
                        text: 'Ссылки отсюда'
                    })
                )
            );
            $list.append(
                $('<li>', {
                    id: 'atp-action_info'
                }).append(
                    $('<a>', {
                        href: url_action_info,
                        text: 'Сведения о странице'
                    })
                )
            );
        });
    });
})();