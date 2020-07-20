(function () {
    var profile = $('.UserProfileMasthead hgroup');
    if (
        !profile.exists() ||
        window.VSTFReportMenuLoaded
    ) {
        return;
    }
    window.VSTFReportMenuLoaded = true;
    importArticle(
        {
            type: 'style',
            article: 'u:dev:MediaWiki:VSTF Report Menu.css'
        },
        {
            type: 'script',
            article: 'u:dev:MediaWiki:I18n-js/code.js'
        }
    );
    function init (i18n) {
        profile.append(
            $('<a>', {
                'class': 'vstf-report-menu',
                'href': '//vstf.fandom.com/wiki/Report:Profile',
                'title': i18n.msg('title').plain(),
                'target': '_blank'
            })
        );
    }
    mw.hook('dev.i18n').add(function(i18n) {
        i18n.loadMessages('VSTF Report Menu').then(init);
    });
})();