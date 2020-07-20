(function() {
    if (window.SandboxTabLoaded) {
        return;
    }
    window.SandboxTabLoaded = true;
    importArticle({
        type: 'script',
        article: 'u:dev:MediaWiki:I18n-js/code.js'
    });
    mw.hook('dev.i18n').add(function(i18no) {
        $.when(
            i18no.loadMessages('SandboxTab'),
            mw.loader.using('mediawiki.util')
        ).then(function(i18n) {
            var $header = $('#WikiaUserPagesHeader'),
                title = 'User:' + $header.find('#UserProfileMasthead h1').text() + '/' + i18n.inContentLang().msg('sandbox').plain();
            if ($header.exists()) {
                $header.find('.tabs-container .tabs').append(
                    $('<li>', { 'data-id': 'sandbox' }).append(
                        $('<a>', {
                            href: mw.util.getUrl(title),
                            title: title,
                            text: i18n.msg('sandbox').plain()
                        })
                    )
                );
            }
        });
    });
})();