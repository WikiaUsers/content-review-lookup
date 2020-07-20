(function () {
    if (mw.config.get('wgCanonicalSpecialPageName') !== 'Contributions' || window.ModalLogsLoaded) {
        return;
    }
    window.ModalLogsLoaded = true;
    var preloads = 3;
    var ucp = mw.config.get('wgVersion') !== '1.19.24';

    function style () {
        var color = window.dev.colors.parse($('.wds-community-header').css('background-color'));
        mw.util.addCSS('\
            #ModalLogs {\
                max-height: calc(100% - 120px);\
            }\
            #ModalLogs footer,\
            #ModalLogs .mw-logevent-actionlink {\
                display: none;\
            }\
            #ModalLogs h3 {\
                -webkit-mask-image: none;\
                mask-image: none;\
                padding-right: 5px;\
            }\
            #ModalLogs li {\
                padding: 0.5em;\
                list-style: none;\
            }\
            #ModalLogs li:nth-child(odd) {\
                background-color: ' + color.lighten(-15) + ';\
            }\
            #ModalLogs li:nth-child(even) {\
                background-color: ' + color.saturate(-15) + ';\
            }\
        ');
    }

    function modal (data) {
        new mw.libs.QDmodal('ModalLogs').show({
            title: $(data).find('.page-header__title').html(),
            content: $(data).find('#mw-content-text')
                        .find('form, fieldset, .mw-specialpage-summary, p:first-child, .mw-warning-with-logexcerpt, .mw-htmlform-ooui-wrapper, noscript, noscript + p')
                            .remove()
                            .end()
                        .html()
        });
    }

    function init (selector) {
        style();
        $('#WikiaPage').find(selector).click(function (e) {
            e.preventDefault();
            var url = $(e.target).attr('href');
            $.get(url).done(modal);
        });
    }
    
    function selectors (specialPageAliases) {
        var selector;
        var prefix = ucp ? '.mw-changeslist-links' : '#contentSub';

        if (window.ModalLogsCustomSelectors && !(window.ModalLogsCustomSelectors instanceof jQuery)) {
            console.error('[ModalLogs] `window.ModalLogsCustomSelectors` was not set to a jQuery selector object, falling back to default selectors.');
        }

        if (window.ModalLogsCustomSelectors && window.ModalLogsCustomSelectors instanceof jQuery) {
            selector = window.ModalLogsCustomSelectors;
        } else {
            selector = prefix + ' a[href*="' + specialPageAliases.AbuseLog + '"], ';
            selector += prefix + ' a[title^="' + specialPageAliases.Log + '/"], ';
            selector += prefix + ' a[title^="' + specialPageAliases.DeletedContributions + '/"], ';
            selector += prefix + ' a[title^="' + specialPageAliases.Listfiles + '/"], ';
            selector += '.chat-ban-log, ';
            selector += '.mw-warning-with-logexcerpt > a[href$="&type=chatban"]';
            selector = $(selector);
        }
        init(selector);
    }
    
    function preload () {
        if (--preloads === 0) {
            var getStorage = ucp ? JSON.parse(mw.storage.get('ModalLogsMapping')) : $.storage.get('ModalLogsMapping');
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
                    if (ucp) {
                        mw.storage.set('ModalLogsMapping', JSON.stringify(mapping));
                    } else {
                        $.storage.set('ModalLogsMapping', mapping);
                    }
                    selectors(mapping);
                }).error(function (error) {
                    return console.error(error);
                });
            }
        }
    }
    
    mw.hook('dev.colors').add(preload);
    mw.hook('dev.qdmodal').add(preload);
    mw.loader.using('mediawiki.api').done(preload);
    importArticles({
        type: 'script',
        articles: [
            'u:dev:MediaWiki:QDmodal.js',
            'u:dev:MediaWiki:Colors/code.js'
        ]
    });
})();