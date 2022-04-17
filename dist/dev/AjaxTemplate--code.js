// <nowiki>
(function() {
    if (window.AjaxTemplateLoaded || mw.config.get('wgNamespaceNumber') === -1) {
        return;
    }
    window.AjaxTemplateLoaded = true;
    var AjaxTemplate = {
        init: function(i18n) {
            this.i18n = i18n;
            this.api = new mw.Api();
            this.$element = $('<a>', {
                'class': 'wds-button wds-is-secondary',
                'click': $.proxy(this.click, this),
                'text': i18n.msg('button').plain()
            });
            this.config = mw.config.get([
                'wgNamespaceNumber',
                'wgPageName'
            ]);
            $('.page-header__contribution-buttons, .page-header__actions')
                .append(this.$element);
        },
        click: function() {
            var text = prompt(this.i18n.msg('insert').plain());
            if (!text) {
                return;
            }
            var talk = this.config.wgNamespaceNumber % 2 === 0,
                options = {
                    action: 'edit',
                    title: this.config.wgPageName,
                    summary: this.i18n
                        .inContentLang()
                        .msg('reason')
                        .plain()
                };
            if (this.config.wgNamespaceNumber % 2 === 0) {
                options.prependtext = '{{' + text + '}}<br />';
            } else {
                options.appendtext = '<br /><br /> {{subst:' + text + '}}~~' + '~~';
            }
            this.api
                .postWithEditToken(options)
                .then($.proxy(this.callback, this));
        },
        callback: function(d) {
            if (!d.error) {
                mw.notify(this.i18n.msg('added').escape());
            }
        },
        hook: function(i18n) {
            $.when(
                i18n.loadMessages('AjaxTemplate'),
                mw.loader.using([
                    'mediawiki.api',
                    'mediawiki.notify'
                ])
            ).then($.proxy(this.init, this));
        }
    };
    mw.hook('dev.i18n').add($.proxy(AjaxTemplate.hook, AjaxTemplate));
    importArticle({
        type: 'script',
        article: 'u:dev:MediaWiki:I18n-js/code.js'
    });
})();
// </nowiki>