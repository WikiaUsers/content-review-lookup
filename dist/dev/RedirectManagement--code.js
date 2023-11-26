/**
 * Redirect Management
 * @description Delete broken redirects and fix double redirects automatically.
 * @author Ozuzanna
 * @author KockaAdmiralac
 */
(function($, mw) {
    'use strict';
    var specialPage = mw.config.get('wgCanonicalSpecialPageName');
    var isBrokenRedirectsPage = specialPage === 'BrokenRedirects';
    var isDoubleRedirectsPage = specialPage === 'DoubleRedirects';
    var isLoaded = window.RedirectManagement &&
                   window.RedirectManagement.init;
    if (!(isBrokenRedirectsPage || isDoubleRedirectsPage) || isLoaded) {
        return;
    }
    window.RedirectManagement = $.extend({
        toPreload: isBrokenRedirectsPage ? 5 : 4,
        preload: function(resource, arg) {
            switch (resource) {
                case 'mw':
                    this.api = new mw.Api();
                    if (isBrokenRedirectsPage) {
                        mw.user.getRights()
                            .then(this.preload.bind(this, 'rights'));
                    }
                    break;
                case 'i18n':
                    arg.loadMessages('RedirectManagement', {
                        cacheVersion: 2
                    }).done(this.preload.bind(this, 'msg'));
                    break;
                case 'msg':
                    this.i18n = arg;
                    break;
                case 'rights':
                    if (!arg.includes('delete')) {
                        return;
                    }
                    break;
            }
            if (--this.toPreload === 0) {
                this.init();
            }
        },
        init: function() {
            window.dev.ct.setup({
                click: this.onClick.bind(this),
                link: '#',
                placement: 'page-actions',
                text: this.i18n.msg('button').plain()
            });
        },
        onClick: function(event) {
            event.preventDefault();
            this.pages = $('.special > li').toArray().map(function(li) {
                var $li = $(li);
                var children = $li.children();
                if (children.length !== 4) {
                    // Already resolved
                    return;
                }
                var page = $(children[0]).text();
                var newPage = $(children[3]).text();
                return [page, newPage, $li];
            }).filter(Boolean);
            this.next();
        },
        resolve: function() {
            var pair = this.pages.shift();
            if (!pair) {
                // We're done.
                setTimeout(window.location.reload.bind(window.location), 10000);
                return;
            }
            var page = pair[0];
            var newPage = pair[1];
            var $li = pair[2];
            var summaryMsg = isDoubleRedirectsPage ?
                'edit-summary' :
                'delete-reason';
            var summary = this.i18n
                .inContentLang()
                .msg(summaryMsg, page, newPage)
                .plain();
            var $promise;
            if (isDoubleRedirectsPage) {
                $promise = this.api.edit(page, function(revision) {
                    var text = revision.content.replace(
                        /\[\[([^\n]+)\]\]/,
                        '[' + '[' + newPage + ']' + ']'
                    );
                    return {
                        bot: true,
                        minor: true,
                        summary: summary,
                        text: text,
                        watchlist: 'nochange'
                    };
                });
            } else {
                $promise = this.api.postWithEditToken({
                    action: 'delete',
                    bot: true,
                    reason: summary,
                    title: page,
                    watchlist: 'nochange'
                });
            }
            $promise
                .done(this.successCallback.bind(this, page, $li))
                .fail(this.errorCallback.bind(this, page, newPage));
        },
        next: function() {
            setTimeout(this.resolve.bind(this), 1000);
        },
        successCallback: function(page, $li) {
            $li.css('text-decoration', 'line-through');
            this.next();
        },
        errorCallback: function(page, newPage, code) {
            if (code === 'ratelimited') {
                // Wait some more, then retry.
                this.pages.unshift([page, newPage]);
                setTimeout(this.next.bind(this), 29000);
            } else {
                var prefix = isDoubleRedirectsPage ? 'double' : 'broken';
                mw.notify(this.i18n.msg(prefix + '-error', page, code).plain(), {
                    type: 'error'
                });
                this.next();
            }
        },
        i18nPrefix: function(k, param) {
            var prefix = this.double ? 'Double' : 'Broken';
            return this.i18n.msg([k + prefix], param).plain();
        }
    }, window.RedirectManagement);
    // Translate the deprecated summary variable into I18n-js overrides.
    if (window.RedirectManagementSummary) {
        window.dev = window.dev || {};
        window.dev.i18n = window.dev.i18n || {};
        window.dev.i18n.overrides = window.dev.i18n.overrides || {};
        window.dev.i18n.overrides.RedirectManagement = {
            'delete-reason': window.RedirectManagementSummary,
            'edit-summary': window.RedirectManagementSummary
        };
    }
    // Load script's dependencies.
    importArticles({
        articles: [
            'u:dev:MediaWiki:CustomTools.js',
            'u:dev:MediaWiki:I18n-js/code.js'
        ]
    });
    var rm = window.RedirectManagement;
    mw.loader.using([
        'mediawiki.api',
        'mediawiki.user'
    ], rm.preload.bind(rm, 'mw'));
    mw.hook('dev.ct').add(rm.preload.bind(rm, 'ct'));
    mw.hook('dev.i18n').add(rm.preload.bind(rm, 'i18n'));
})(window.jQuery, window.mediaWiki);