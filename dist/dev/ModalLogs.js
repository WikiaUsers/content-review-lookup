(function () {
    if (mw.config.get('wgCanonicalSpecialPageName') !== 'Contributions' || window.ModalLogsLoaded) {
        return;
    }
    window.ModalLogsLoaded = true;
    var preloads = 3;

    function modal (data) {
        new mw.libs.QDmodal('ModalLogs').show({
            title: $(data).find('.page-header__title').text(),
            content: $(data).find('#mw-content-text')
                        .find('form, fieldset, .mw-specialpage-summary, p:first-child, .mw-warning-with-logexcerpt, .mw-htmlform-ooui-wrapper, noscript, noscript + p')
                            .remove()
                            .end()
                        .html()
        });
    }

    function init (selector) {
    	mw.util.addCSS('\
            #ModalLogs li {\
                padding: 0.5em;\
            }\
            #ModalLogs li:nth-child(odd) {\
                background-color: var(--theme-page-text-mix-color-95);\
            }\
            #ModalLogs li:nth-child(even) {\
                background-color: var(--theme-page-background-color--secondary);\
            }\
        ');
        $('.mw-contributions-user-tools').find(selector).click(function (e) {
            e.preventDefault();
            var url = $(e.target).attr('href');
            $.get(url).done(modal);
        });
    }
    
    function selectors (specialPageAliases) {
        var selector;
        var prefix = '.mw-changeslist-links';

        if (window.ModalLogsCustomSelectors && !(window.ModalLogsCustomSelectors instanceof jQuery)) {
            console.warn('[ModalLogs] `window.ModalLogsCustomSelectors` was not set to a jQuery selector object, falling back to default selectors.');
        }

        if (window.ModalLogsCustomSelectors && window.ModalLogsCustomSelectors instanceof jQuery) {
            selector = window.ModalLogsCustomSelectors;
        } else {
            selector = prefix + ' a[href*="' + specialPageAliases.AbuseLog + '"], ';
            selector += prefix + ' a[title^="' + specialPageAliases.Log + '/"], ';
            selector += prefix + ' a[title^="' + specialPageAliases.DeletedContributions + '/"], ';
            selector += prefix + ' a[title^="' + specialPageAliases.Listfiles + '/"]';
            selector = $(selector);
        }
        init(selector);
    }
    
    function preload () {
        if (--preloads === 0) {
            var getStorage = JSON.parse(mw.storage.get('ModalLogsMapping'));
            if (getStorage) {
                selectors(getStorage);
            } else {
                new mw.Api().get({
                    action: 'query',
                    meta: 'siteinfo',
                    siprop: 'namespaces|specialpagealiases',
                    format: 'json'
                }).done(function (data) {
                    var specialNamespace = data.query.namespaces[-1]['*'];
                    var mapping = {};
                    data.query.specialpagealiases.forEach(function (x) {
                        mapping[x.realname] = specialNamespace + ':' + x.aliases[0];
                    });
                    mw.storage.set('ModalLogsMapping', JSON.stringify(mapping));
                    selectors(mapping);
                }).fail(function (error) {
                    return console.error(error);
                });
            }
        }
    }
    
    mw.hook('dev.qdmodal').add(preload);
    mw.loader.using('mediawiki.api').done(preload);
    mw.loader.using('mediawiki.util').done(preload);
    importArticle({
        type: 'script',
        article: 'u:dev:MediaWiki:QDmodal.js'
    });
})();