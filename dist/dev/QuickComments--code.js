(function() {
    var config = mw.config.get([
        'wgCanonicalSpecialPageName',
        'wgUserGroups'
    ]);
    if (
        window.QuickComments ||
        config.wgCanonicalSpecialPageName !== 'WikiActivity' ||
        !/sysop|vstf|helper|staff|content-team-member|wiki-manager|content-moderator/.test(config.wgUserGroups.join('|'))
    ) {
        return;
    }
    window.QuickComments = {
        preload: function(i18n) {
            $.when(
                i18n.loadMessages('QuickComments'),
                mw.loader.using([
                    'mediawiki.api',
                    'mediawiki.util',
                    'mediawiki.Title'
                ])
            ).then($.proxy(this.init, this));
        },
        init: function(i18n) {
            this.i18n = i18n;
            this.api = new mw.Api();
            window.ajaxCallAgain = window.ajaxCallAgain || [];
            window.ajaxCallAgain.push($.proxy(this.run, this));
            if (window.WikiActivity) {
                this.alias = window.WikiActivity.ajax;
                window.WikiActivity.ajax = $.proxy(this.waAjax, this);
            }
            this.run();
        },
        waAjax: function(a, b, callback) {
            this.callback = callback;
            return this.alias.call(
                window.WikiActivity, a, b, $.proxy(this.waCallback, this)
            );
        },
        waCallback: function() {
            var result = this.callback.apply(window.WikiActivity, arguments);
            this.run();
            return result;
        },
        run: function() {
            $('li.activity-type-talk.activity-ns-1:not(.QuickCommentsLoaded)').append(
                $('<a>', {
                    'class': 'QuickCommentsDelete',
                    click: $.proxy(this.clickDelete, this),
                    text: this.i18n.msg('deletebutton').plain()
                }),
                '&nbsp;&nbsp;',
                $('<a>', {
                    'class': 'QuickCommentsBlock',
                    click: $.proxy(this.clickBlock, this),
                    text: this.i18n.msg('blockbutton').plain()
                })
            ).addClass('QuickCommentsLoaded');
        },
        clickDelete: function(e) {
            var reason = prompt(
                this.i18n.msg('deletetext').plain() + ':',
                this.i18n.inContentLang().msg('default-reason').plain()
            );
            if (!reason) {
                return;
            }
            var $parent = $(e.target).parent();
            this.api.post({
                action: 'delete',
                title: decodeURIComponent(
                    $parent
                        .find('a.title')
                        .attr('href')
                        .substring(mw.util.getUrl('').length)
                ),
                reason: reason,
                token: mw.user.tokens.get('editToken')
            }).done($.proxy(this.generateDeleteDone($parent), this))
            .fail($.proxy(this.ajaxFail, this));
        },
        clickBlock: function(e) {
            var reason = prompt(
                this.i18n.msg('reason').plain() + ':',
                this.i18n.inContentLang().msg('default-reason').plain()
            );
            if (!reason) {
                return;
            }
            var expiry = prompt(this.i18n.msg('expiry').plain() + ':', '3 days');
            if (!expiry) {
                return;
            }
            var $link = $(e.target).parent().find('a[rel="nofollow"]'),
                href = $link.attr('href').substring(mw.util.getUrl('').length),
                index = href.indexOf('/');
            this.api.post({
                action: 'block',
                user: (index === -1) ?
                    $link.text() :
                    href.substring(index + 1),
                expiry: expiry,
                reason: reason,
                token: mw.user.tokens.get('editToken')
            }).done($.proxy(this.generateBlockDone($link), this))
            .fail($.proxy(this.ajaxFail, this));
        },
        error: function(text) {
            return new BannerNotification(text, 'error').show();
        },
        generateDeleteDone: function($parent) {
            return function(d) {
                if (d.error) {
                    this.error(this.i18n.msg('errorapi').plain() + ': ' + d.error.code);
                } else {
                    $parent.css({
                        'color': 'grey',
                        'text-decoration': 'line-through'
                    }).fadeOut(3000).find('a').removeAttr('href');
                }
            };
        },
        generateBlockDone: function($link) {
            return function(d) {
                if (d.error) {
                    this.error(this.i18n.msg('errorapi').plain() + ': ' + d.error.code);
                } else {
                    $link.css({
                        'color': 'grey',
                        'text-decoration': 'line-through'
                    }).removeAttr('href');
                }
            };
        },
        ajaxFail: function() {
            this.error(this.i18n.msg('ajax-error').plain());
        }
    };
    importArticle({
        type: 'script',
        article: 'u:dev:MediaWiki:I18n-js/code.js'
    });
    mw.hook('dev.i18n').add(
        $.proxy(
            window.QuickComments.preload,
            window.QuickComments
        )
    );
})();