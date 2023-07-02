/**
 * AjaxRedirect
 * @description Redirects the current page quickly.
 * @author KnazO, TheGoldenPatrik1, KockaAdmiralac
 * <nowiki>
 */

(function () {
    var config = mw.config.get([
            'wgCanonicalNamespace',
            'wgCanonicalSpecialPageName',
            'wgPageName',
            'wgUserGroups',
            'wgRevisionId',
            'wgIsRedirect'
        ]),
        groupsWithDeletePerm = [
            'bureaucrat',
            'sysop',
            'content-moderator'
        ],
        i18n;

    if (
        config.wgCanonicalNamespace === 'Thread' ||
        config.wgCanonicalSpecialPageName ||
        window.AjaxRedirectLoaded
    ) {
        return;
    }

    window.AjaxRedirectLoaded = true;

    function makeRedirect(fromPage, toPage) {
        function respHandler1(res) {
            if (res === true) {
                console.log(i18n.msg('success').plain());
                mw.notify(i18n.msg('success').plain());
                setTimeout(function () {
                    window.location.reload();
                }, 3000);
            } else {
                console.log(i18n.msg('fail').plain());
                mw.notify(i18n.msg('fail').plain(), {
                    type: 'error'
                });
            }
        }
        new mw.Api().postWithEditToken({
            action: 'edit',
            watchlist: 'nochange',
            title: fromPage,
            minor: true,
            bot: true,
            text: '#REDIRECT [[' + toPage.charAt(0).toUpperCase() + toPage.slice(1) + ']]'
        }).done(function (d) {
            respHandler1(!d.error);
        }).fail(function () {
            respHandler1(false);
        });
    }

    function deleteAndRedirect(fromPage, toPage) {
        function respHandler2(res) {
            if (res === true) {
                console.log(i18n.msg('deleteSuccess').plain());
                mw.notify(i18n.msg('deleteSuccess').plain());
                makeRedirect(fromPage, toPage); // here, make a redirect
            } else {
                console.log(i18n.msg('deleteFail').plain());
                mw.notify(i18n.msg('deleteFail').plain(), {
                    type: 'error'
                });
            }
        }
        if (!config.wgUserGroups.some(function (g) {
                return groupsWithDeletePerm.includes(g);
            })) {
            alert(i18n.msg('noDeletePerm').plain());
            return;
        }
        if (confirm(i18n.msg('deleteConfirm').plain())) {
            new mw.Api().postWithEditToken({
                action: 'delete',
                watchlist: 'nochange',
                title: fromPage,
                reason: i18n.msg('deleteReason').plain()
            }).done(function (d) {
                respHandler2(!d.error);
            }).fail(function () {
                respHandler2(false);
            });
        }
    }

    function click() {
        var redir = prompt(i18n.msg('enterPage').plain());

        if (!redir) {
            console.log(i18n.msg('specify').plain());
            return;
        }

        if (
            config.wgCanonicalNamespace === 'File' &&
            config.wgRevisionId !== 0 && // page is created
            !config.wgIsRedirect // page is not a redirect
        ) {
            deleteAndRedirect(config.wgPageName, redir);
        } else {
            // doesn't require deletion
            makeRedirect(config.wgPageName, redir);
        }
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

    mw.hook('dev.i18n').add(function (lib) {
        $.when(
            lib.loadMessages('AjaxRedirect'),
            mw.loader.using([
                'mediawiki.api',
                'mediawiki.user'
            ])
        ).then(init);
    });

    importArticle({
        type: 'script',
        article: 'u:dev:MediaWiki:I18n-js/code.js'
    });
})();