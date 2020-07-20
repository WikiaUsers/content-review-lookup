mw.hook('dev.i18n').add(function (i18n) {
    i18n.loadMessages('FixSpecialPageLabels').done(function (i18no) {
        if (mw.config.get('wgCanonicalSpecialPageName') === 'Specialpages' || window.FixSpecialPageLabelsLoaded) {
            window.FixSpecialPageLabelsLoaded = true;
            $('#mw-specialpagesgroup-other + table td:first-child a').each(function () {
                if ($(this).text() === '&lt;usersignup&gt;') {
                    $(this).text(i18no.msg('signup').plain());
                } else if ($(this).text() === '&lt;wikiaconfirmemail&gt;') {
                    $(this).text(i18no.msg('confirm-email').plain());
                }
            });
        }
    });
});
importArticle({
    type: 'script',
    article: 'u:dev:MediaWiki:I18n-js/code.js'
});