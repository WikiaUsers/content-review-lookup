(function () {
    var profile = $('.UserProfileMasthead hgroup');
    if (
        !profile.exists() ||
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
        profile.append(
            $('<a>', {
                'class': 'soap-report-menu',
                'href': '//soap.fandom.com/wiki/Report:Profile',
                'title': i18n.msg('title').plain(),
                'target': '_blank'
            })
        );
    }
    mw.hook('dev.i18n').add(function(i18n) {
        i18n.loadMessages('SOAPReportMenu').then(init);
    });
})();