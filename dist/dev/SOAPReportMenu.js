(function () {
    if (
        !mw.config.get('profileUserName') ||
        window.SOAPReportMenuLoaded
    ) {
        return;
    }
    window.SOAPReportMenuLoaded = true;
    importArticle(
        {
            type: 'style',
            article: 'u:dev:MediaWiki:SOAPReportMenu.css'
        },
        {
            type: 'script',
            article: 'u:dev:MediaWiki:I18n-js/code.js'
        }
    );
    function init (i18n) {
        $('.user-identity-header__actions').append(
            $('<a>', {
                'class': 'soap-report-menu',
                'href': '//soap.fandom.com/wiki/Report:Spam',
                'title': i18n.msg('title').plain(),
                'target': '_blank'
            })
        );
    }
    mw.hook('dev.i18n').add(function(i18n) {
        i18n.loadMessages('SOAPReportMenu').then(init);
    });
})();