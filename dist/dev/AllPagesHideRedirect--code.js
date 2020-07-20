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
            this.$button = $('<a>', {
                // WDS buttons look horribly out of place currently
                'class': 'button',
                // 'class': 'wds-button',
                click: $.proxy(this.click, this),
                href: '#',
                id: 'AllPagesHideRedirectButton',
                text: this.getMsg()
            });
            this.$css = $('<style>', {
                id: 'AllPagesHideRedirectCSS',
                text: this.getCSS()
            }).appendTo('head');
            $('.mw-input').last().append(this.$button);
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
        click: function() {
            this.shown = !this.shown;
            this.$css.text(this.getCSS());
            this.$button.text(this.getMsg());
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