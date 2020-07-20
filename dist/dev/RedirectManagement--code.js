/*
 * Redirect Management
 * @description Delete broken redirects and fix double redirects automatically.
 * @author Ozuzanna
 * @author KockaAdmiralac
 * <nowiki>
 */
(function() {
    var config = mw.config.get([
        'wgCanonicalSpecialPageName',
        'wgContentLanguage',
        'wgUserGroups',
        'wgUserLanguage'
    ]);
    if (
        !(/DoubleRedirects|BrokenRedirects/g.test(config.wgCanonicalSpecialPageName)) ||
        window.RedirectManagementLoaded ||
        (
            !(/sysop|vstf|staff|helper|content-moderator|content-volunteer|content-team-member|wiki-manager/.test(config.wgUserGroups)) &&
            config.wgCanonicalSpecialPageName === 'BrokenRedirects'
        )
    ) {
        return;
    }
    window.RedirectManagementLoaded = true;
    if (!window.dev || !window.dev.i18n) {
        // Importing I18n-js library
        importArticle({
            type: 'script',
            article: 'u:dev:MediaWiki:I18n-js/code.js'
        });
    }
    var RedirectManagement = {
        init: function(i18n) {
            this.i18n = i18n;
            this.api = new mw.Api();
            this.double = config.wgCanonicalSpecialPageName === 'DoubleRedirects';
            this.addButton();
        },
        onClick: function() {
            var summary = window.RedirectManagementSummary ||
                this.i18n.inContentLang().msg(this.double ? 'editSummary' : 'deleteReason').plain();
            $('.special > li').each($.proxy(function(_, el) {
                var children = $(el).children();
                if (children.length !== 4) {
                    // Already resolved
                    return;
                }
                var page = $(children[0]).text(),
                    newpage = $(children[3]).text(),
                    reason = summary
                        .replace(/\$1/g, page)
                        .replace(/\$2/g, newpage);
                this.api.post($.extend({
                    title: page,
                    watchlist: 'nochange',
                    token: mw.user.tokens.get('editToken'),
                    bot: true
                }, this.double ? {
                    action: 'edit',
                    text: '#REDIRECT [[' + newpage + ']]',
                    summary: reason,
                    minor: true
                } : {
                    action: 'delete',
                    reason: reason
                })).done($.proxy(function(d) {
                    if (d.error) {
                        console.error(this.i18nPrefix('error', page) + ': ' + d.error.code);
                    } else {
                        console.info(this.i18nPrefix('success', page));
                    }
                }, this))
                .fail($.proxy(function() {
                    console.error(this.i18nPrefix('error', page));
                }, this));
            }, this));
            setTimeout(function() {
                location.reload();
            }, 15000);
        },
        i18nPrefix: function(k, param) {
            return this.i18n.msg([k + (this.double ? 'Double' : 'Broken')], param).plain();
        },
        addButton: function() {
            if (window.RedirectManagementSitewide) {
                $('.mw-spcontent p').first().append(
                    $('<p>').append(
                        $('<a>', {
                            'class': 'wds-button',
                            style: 'cursor: pointer;',
                            id: 'btn-resolve-redirects',
                            text: this.msg('button')
                        })
                    )
                );
            } else {
                $('.page-header__contribution-buttons').append(
                    $('<a>', {
                        'class': 'wds-is-squished wds-button',
                        id: 'btn-resolve-redirects',
                        title: this.msg('button'),
                        text: this.msg('button')
                    })
                );
            }
            $('#btn-resolve-redirects').click($.proxy(this.onClick, this));
        },
        msg: function(name) {
            return this.i18n.msg(name).plain();
        }
    };
    mw.loader.using('mediawiki.api', function() {
        mw.hook('dev.i18n').add(function(i18no) {
            i18no.loadMessages('RedirectManagement').done(
                $.proxy(RedirectManagement.init, RedirectManagement)
            );
        });
    });
})();