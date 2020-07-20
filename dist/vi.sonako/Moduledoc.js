// Documentation for wiki modules
$(function () {
    if (wgCanonicalNamespace === 'Module' ) {
        if (wgTitle.indexOf('/doc') === -1 && wgAction === 'view' && document.URL.indexOf('\?diff\=')<0) {
            mw.loader.using('mediawiki.api', function () {
                (new mw.Api())
                    .get({
                        action: 'parse',
                        page: wgPageName + '/doc'
                    }).done(function (data) {
                        if (data.error) {
                            return;
                        }
                        $('#mw-content-text').prepend(data.parse.text["*"]);
                    });
            });
        } else if (wgTitle.indexOf('/doc') > -1 && ['edit', 'submit'].indexOf(wgAction) > -1) {
            $('.wikia-scribunto-console').hide();
            $('.scribunto_ignore_errors')
                .hide()
                .children()
                    .prop('checked', true);
        }
    }
});