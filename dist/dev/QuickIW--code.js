/**
 * <nowiki>
 * Add Interwiki easily and quick. 
 * @author: [[w:User:BlackZetsu]]
 * @todo: Autofill possible languages
 * @todo: Autosuggest pages
 */
(function($, mw) {
    if (window.QuickIWLoaded) {
        return;
    }
    window.QuickIWLoaded = true;
    var QuickIW = {
        preloads: 2,
        page: mw.config.get('wgPageName'),
        isUCP: mw.config.get('wgVersion') !== '1.19.24',
        preload: function() {
            if (--this.preloads === 0) {
                $.when(
                    window.dev.i18n.loadMessages('QuickIW'),
                    mw.loader.using([
                        'mediawiki.api',
                        'mediawiki.user',
                        'mediawiki.util'
                    ].concat(this.isUCP ? ['mediawiki.notify'] : []))
                ).then($.proxy(this.init, this));
            }
        },
        init: function(i18n) {
            this.i18n = i18n;
            this.api = new mw.Api();
            this.modal = this.createModal();
            $('.skin-fandomdesktop .page-header .page-header__actions .wds-dropdown__content > ul, .page-header__contribution-buttons .wds-list, .UserProfileActionButton .WikiaMenuElement').append(
                $('<li>').append(
                    $('<a>', {
                        click: $.proxy(this.click, this),
                        id: 'QuickIW',
                        href: '#',
                        text: i18n.msg('interwiki').plain()
                    })
                )
            );
        },
        createModal: function() {
            var modal = new window.dev.modal.Modal({
                buttons: [
                    {
                        event: 'execute',
                        primary: true,
                        text: this.i18n.msg('add').plain()
                    }
                ],
                content: $('<form>').append(
                    $('<div>').append(
                        $('<label>', {
                            'for': 'QuickIWLanguage',
                            'text': this.i18n.msg('language').plain()
                        }),
                        $('<input>', {
                            id: 'QuickIWLanguage',
                            name: 'QuickIWLanguage',
                            type: 'text'
                        })
                    ),
                    $('<div>').append(
                        $('<label>', {
                            'for': 'QuickIWPage',
                            'text': this.i18n.msg('page').plain()
                        }),
                        $('<input>', {
                            id: 'QuickIWPage',
                            name: 'QuickIWPage',
                            type: 'text'
                        }).attr('placeholder', this.page)
                    ),
                    $('<div>').append(
                        $('<label>', {
                            'for': 'QuickIWSummary',
                            'text': this.i18n.msg('summary').plain()
                        }),
                        $('<input>', {
                            id: 'QuickIWSummary',
                            name: 'QuickIWSummary',
                            type: 'text'
                        }).attr(
                            'placeholder',
                            this.i18n
                                .inContentLang()
                                .msg('placeholder')
                                .plain()
                        )
                    )
                ).prop('outerHTML'),
                context: this,
                events: {
                    execute: this.edit
                },
                id: 'QuickIWModal',
                title: this.i18n.msg('interwiki').plain()
            });
            modal.create();
            return modal;
        },
        click: function(event) {
            event.preventDefault();
            this.modal.show();
        },
        edit: function() {
            var language = $('#QuickIWLanguage').val(),
                $summary = $('#QuickIWSummary');
            if (!language || this.editing) {
                // TODO: Show error
                return;
            }
            this.editing = true;
            this.api.post({
                action: 'edit',
                title: this.page,
                summary: $summary.val() || $summary.attr('placeholder'),
                appendtext: '\n[[' + language + ':' +
                    ($('#QuickIWPage').val() || this.page) + ']]',
                token: mw.user.tokens.get('editToken'),
                minor: true,
                bot: true
            })
            .then($.proxy(this.callback, this))
            .fail($.proxy(this.fail, this));
        },
        callback: function(d) {
            if (d.error) {
                this.editing = false;
                this.error(d.error.code);
            } else {
                window.location.href = mw.util.getUrl(this.page);
            }
        },
        fail: function() {
            this.editing = false;
            this.error(this.i18n.msg('ajax-error').plain());
        },
        error: function(text) {
            if (this.isUCP) {
                mw.notify(this.i18n.msg('error', text).plain(), {
                    type: 'error'
                });
            } else {
                new BannerNotification(
                    this.i18n.msg('error', text).escape(),
                    'error'
                ).show();
            }
        }
    };
    importArticles({
        type: 'script',
        articles: [
            'u:dev:MediaWiki:I18n-js/code.js',
            'u:dev:MediaWiki:Modal.js'
        ]
    });
    importArticle({
        type: 'style',
        article: 'u:dev:MediaWiki:QuickIW.css'
    });
    mw.hook('dev.i18n').add($.proxy(QuickIW.preload, QuickIW));
    mw.hook('dev.modal').add($.proxy(QuickIW.preload, QuickIW));
}(jQuery, mediaWiki));