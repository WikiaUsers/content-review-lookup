(function() {
    'use strict';
    if ([
            'Allpages',
            'Prefixindex'
        ].indexOf(mw.config.get('wgCanonicalSpecialPageName')) === -1 ||
        window.AllPagesHideRedirectLoaded
    ) {
        return;
    }
    window.AllPagesHideRedirectLoaded = true;
    var AllPagesHideRedirect = {
        shown: $('.allpagesredirect').css('display') === 'block',
        preload: function(i18n) {
            i18n.loadMessages('AllPagesHideRedirect')
                .then($.proxy(this.init, this));
        },
        init: function(i18n) {
            this.i18n = i18n;
            if ($('.mw-htmlform-submit-buttons').length) {
                this.$label = $('<span>', {
                    'class': 'oo-ui-labelElement-label',
                    text: this.getMsg()
                });
                this.$button = $('<span>', {
                    'class': [
                        'oo-ui-buttonElement',
                        'oo-ui-buttonElement-framed',
                        'oo-ui-flaggedElement-primary',
                        'oo-ui-flaggedElement-progressive',
                        'oo-ui-labelElement',
                        'oo-ui-widget-enabled'
                    ].join(' '),
                    click: $.proxy(this.click, this),
                    id: 'AllPagesHideRedirectButton'
                }).append(
                    $('<button>', {
                        'class': 'oo-ui-buttonElement-button',
                        tabindex: '0'
                    }).append(this.$label)
                );
            } else {
                this.$label = this.$button = $('<a>', {
                    'class': 'button',
                    click: $.proxy(this.click, this),
                    href: '#',
                    id: 'AllPagesHideRedirectButton',
                    text: this.getMsg()
                });
            }
            this.$css = $('<style>', {
                id: 'AllPagesHideRedirectCSS',
                text: this.getCSS()
            }).appendTo('head');
            $('.mw-input, .mw-htmlform-submit-buttons').last().append(this.$button);
            mw.hook('AllPagesHideRedirect.loaded').fire();
        },
        getCSS: function() {
            return  '.allpagesredirect {' +
                        'display: ' + (this.shown ? 'block' : 'none') + ';' +
                    '}';
        },
        getMsg: function() {
            return this.i18n.msg(this.shown ? 'hide' : 'show').plain();
        },
        click: function(event) {
            event.preventDefault();
            this.shown = !this.shown;
            this.$css.text(this.getCSS());
            this.$label.text(this.getMsg());
        }
    };
    importArticle({
        type: 'script',
        article: 'u:dev:MediaWiki:I18n-js/code.js'
    });
    mw.hook('dev.i18n').add(
        $.proxy(AllPagesHideRedirect.preload, AllPagesHideRedirect)
    );
})();