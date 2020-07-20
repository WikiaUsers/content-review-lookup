/* created by Curiouscrab */
(function (window, mw) {
    'use strict';

    var config = mw.config.get([
        'wgAction',
        'wgUserGroups'
    ]);
    if (
        config.wgAction !== 'view' ||
        !mw.util.$content.exists()
    ) {
        return;
    }

    var words = window.filteredWords || [],
        text = window.removedText || '',
        sysop = config.wgUserGroups.indexOf('sysop') !== -1,
        i18n;

    function filterWords($content) {
        words.forEach(function(el) {
            if ($content.html().search(el) == -1) {
                return;
            }
            if (sysop) {
                $content.html(function (i, h) {
                    return h.split(el).join('<span style="color :#FF0000;">' + el + '</span>');
                });
                alert(i18n.msg('text').plain() + ': ' + el);
            } else {
                $content.html(function (i, h) {
                    return h.split(el).join(text);
                });
            }
        });
    }

    function init(i18nd) {
        i18n = i18nd;
        mw.hook('wikipage.content').add(filterWords);
    }

    mw.hook('dev.i18n').add(function(i18no) {
        i18no.loadMessages('Filter').then(init);
    });

    importArticle({
        type: 'script',
        article: 'u:dev:MediaWiki:I18n-js/code.js'
    });

}(this, mediaWiki));