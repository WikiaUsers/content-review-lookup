// Used files: [[File:Loading.gif]]

(function () {
    if (window.PurgeButtonLoaded) {
        return;
    }
    window.PurgeButtonLoaded = true;

    function callback() {
        window.location.reload(true);
    }

    function click() {
        $(this).html($('<img>', {
            src: 'https://images.wikia.nocookie.net/dev/images/4/42/Loading.gif'
        }));
        $.post(mw.util.wikiScript('api'), {
            action: 'purge',
            titles: mw.config.get('wgPageName')
        }, callback);
    }

    function init(text) {
        $('.page-header__contribution-buttons .wds-list').first().append(
            $('<li>').append(
                $('<a>', {
                    id: 'ca-purge',
                    click: click,
                    href: '#',
                    text: text
                })
            )
        );
    }

    function hook2(i18n) {
        init(i18n.msg('purge').plain());
    }

    function hook1(i18no) {
        i18no.loadMessages('PurgeButton').then(hook2);
    }

    mw.loader.using('mediawiki.util').then(function() {
        if (typeof window.PurgeButtonText === 'string') {
            init(window.PurgeButtonText);
        } else {
            importArticle({
                type: 'script',
                article: 'u:dev:MediaWiki:I18n-js/code.js'
            });
            mw.hook('dev.i18n').add(hook1);
        }
    });
})();