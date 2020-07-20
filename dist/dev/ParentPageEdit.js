//==================================================================================
// ParentPageEdit.js, by Withersoul 235
// Thanks to KockaAdmiralac and DuckeyD for their assistance on making this script,
// and Puxlit for fixing the Regexes
//==================================================================================

(function() {
    function addButtons(match, i18n) {
        $('.page-header__contribution-buttons .wds-list').append(
            $('<li>').append(
                $('<a>', {
                    href: mw.util.getUrl(match[1], { action: 'edit' }),
                    text: window.EditBasePageText || i18n.msg('editBase').plain(),
                    id: 'edit-basepage'
                })
            ),
            $('<li>').append(
                $('<a>', {
                    href: mw.util.getUrl(match[2], { action: 'edit' }),
                    text: window.EditRootPageText || i18n.msg('editRoot').plain(),
                    id: 'edit-rootpage'
                })
            )
        );
    }

    var match = mw.config.get('wgPageName').match(/(([^/]+).*)\//);
    if (match) {
        mw.hook('dev.i18n').add(function(lib) {
            lib.loadMessages('ParentPageEdit').then(addButtons.bind(null, match));
        });

        importArticle({
            type: 'script',
            article: 'u:dev:MediaWiki:I18n-js/code.js'
        });
    }
})();