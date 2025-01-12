(function () {
    if (
        (
            mw.config.get('wgCanonicalSpecialPageName') !== 'Contributions' &&
            mw.config.get('wgCanonicalSpecialPageName') !== 'UserProfileActivity'
        ) ||
        window.ModalLogsLoaded
    ) {
        return;
    }
    window.ModalLogsLoaded = true;
    var preloads = 2;

    function modal (data, qdmodal, isDeletedContributions) {
        qdmodal.show({
            title: $(data).find('.page-header__title').text(),
            content: $(data).find('#mw-content-text')
                        .find('fieldset, .mw-specialpage-summary, p:first-child, .mw-warning-with-logexcerpt, .mw-htmlform-ooui-wrapper, noscript, noscript + p')
                            .remove()
                            .end()
                        .html(),
            onShow: function (modal) {
                if (modal.$content.find('.listfiles tbody > tr > td[colspan="5"]').length) {
                    modal.$content.text(modal.$content.find('.listfiles tbody > tr > td[colspan="5"]').text());
                }
                if (isDeletedContributions) {
                    var container = modal.$content.find('.mw-pager-body');
                    container.find('.mw-index-pager-list-header').remove();
                    container.prepend($('<ul>', {
                        class: 'mw-contributions-list main'
                    }));
                    container.find('ul li').each(function (_, el) {
                        $(el).appendTo(container.find('.main'));
                    });
                    container.find('ul:not(.main)').remove();
                }
            }
        });
    }

    function init (selector) {
        var qdmodal = new mw.libs.QDmodal('ModalLogs');
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
            #ModalLogs .mw-contributions-list.main {\
                list-style: none;\
            }\
            #ModalLogs .mw-contributions-list.main li {\
                margin: unset;\
            }\
        ');
        $('.mw-contributions-user-tools').find(selector).click(function (e) {
            e.preventDefault();
            qdmodal.show({
                loading: true,
                title: 'Loading...'
            });
            var url = $(e.target).attr('href');
            var isDeletedContributions = $(e.target).hasClass('mw-contributions-link-deleted-contribs');
            $.get(url).done(function (data) {
                modal(data, qdmodal, isDeletedContributions);
            });
        });
    }
    
    function selectors () {
        var selector;

        if (
            window.ModalLogsCustomSelectors &&
            !(
                window.ModalLogsCustomSelectors instanceof jQuery ||
                typeof window.ModalLogsCustomSelectors === 'string'
            )
        ) {
            console.warn('[ModalLogs] `window.ModalLogsCustomSelectors` was not set to a jQuery selector object or a string, falling back to default selectors.');
        }

        if (window.ModalLogsCustomSelectors &&
            (
                window.ModalLogsCustomSelectors instanceof jQuery ||
                typeof window.ModalLogsCustomSelectors === 'string'
            )
        ) {
            selector = window.ModalLogsCustomSelectors;
        } else {
            selector = '.mw-changeslist-links :is(a.mw-contributions-link-abuse-log, a.mw-contributions-link-logs, a.mw-contributions-link-block-log, a.mw-contributions-link-deleted-contribs, a.mw-contributions-link-uploads)';
            selector = $(selector);
        }
        init(selector);
    }
    
    function preload () {
        if (--preloads === 0) {
            //clean up old mapping now that it's no longer needed
            //TODO: remove in the future once a long enough time has past
            if (mw.storage.get('ModalLogsMapping')) {
                mw.storage.remove('ModalLogsMapping');
            }

            selectors();
        }
    }
    
    mw.hook('dev.qdmodal').add(preload);
    mw.loader.using('mediawiki.util').done(preload);
    importArticle({
        type: 'script',
        article: 'u:dev:MediaWiki:QDmodal.js'
    });
})();