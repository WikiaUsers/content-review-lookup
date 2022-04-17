/**
 * AjaxRedirect
 * @description Redirects the current page quickly.
 * @author Ozuzanna
 * <nowiki>
 */

(function() {
    var config = mw.config.get([
        'wgCanonicalNamespace',
        'wgCanonicalSpecialPageName',
        'wgPageName'
    ]),
    i18n;

    if (
        config.wgCanonicalNamespace === "Thread" ||
        config.wgCanonicalSpecialPageName ||
        window.AjaxRedirectLoaded
    ) {
        return;
    }

    window.AjaxRedirectLoaded = true;

    function respHandler(res) {
        if (res === true) {
            console.log(i18n.msg('success').plain());
            mw.notify(i18n.msg('success').plain());
            setTimeout(function() {
                window.location.reload();
            }, 3000);
        } else {
            console.log(i18n.msg('fail').plain());
            mw.notify(i18n.msg('fail').plain(), {
                type: 'error'
            });
        }
    }

    function click() {
        var redir = prompt(i18n.msg('enterPage').plain());

        if (!redir) {
            console.log(i18n.msg('specify').plain());
            return;
        }

        new mw.Api().postWithEditToken({
            action: 'edit',
            watchlist: 'nochange',
            title: config.wgPageName,
            minor: true,
            bot: true,
            text: '#REDIRECT [[' + redir.charAt(0).toUpperCase() + redir.slice(1) + ']]'
        }).done(function(d) {
            respHandler(!d.error);
        }).fail(function() {
            respHandler(false);
        });
    }

    function init(lang) {
        i18n = lang;

        $('.page-header__contribution-buttons .wds-list, .page-header__actions .wds-list').first().append(
            $('<li>').append(
                $('<a>', {
                    css: {
                        cursor: 'pointer'
                    },
                    id: 'ca-redirect',
                    text: i18n.msg('redirect').plain(),
                    click: click
                })
            )
        );
    }

    mw.hook('dev.i18n').add(function(lib) {
        $.when(
            lib.loadMessages('AjaxRedirect'),
            mw.loader.using([
                'mediawiki.api',
                'mediawiki.notify',
                'mediawiki.user'
            ])
        ).then(init);
    });

    importArticle({
        type: 'script',
        article: 'u:dev:MediaWiki:I18n-js/code.js'
    });
})();