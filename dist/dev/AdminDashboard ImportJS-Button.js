(function($, mw) {
    if (
        mw.config.get('wgCanonicalSpecialPageName') !== 'AdminDashboard' ||
        window.AdminDashboardImportJSButtonLoaded
    ) {
        return;
    }
    window.AdminDashboardImportJSButtonLoaded = true;
    var AdminDashboardImportJSButton = {
        init: function(i18n) {
            console.log(i18n);
            this.$control = $('<li>', {
                'class': 'control',
                'data-tooltip': i18n.msg('tooltip').plain()
            }).append(
                $('<a>', {
                    'class': 'set',
                    href: mw.util.getUrl('MediaWiki:ImportJS', { action: 'edit' })
                }).append(
                    $('<span>', {
                        'class': 'representation AdminDashboardImportJSButton'
                    }).append(
                        $('<span>', {
                            text: 'Import JavaScript'
                        })
                    ),
                    i18n.msg('text').plain()
                )
            ).hover(this.hover.bind(this), this.unhover.bind(this));
            $('.control a[data-tracking="special-css"]').parent().after(this.$control);
            this.$tooltip = $('.control-section.wiki > header > .dashboard-tooltip');
        },
        hover: function(e) {
            this.$tooltip.text(this.$control.data('tooltip'));
        },
        unhover: function(e) {
            this.$tooltip.text('');
        },
        hook: function(i18n) {
            i18n.loadMessages('AdminDashboard_ImportJS-Button')
                .then(this.init.bind(this));
        }
    };
    mw.hook('dev.i18n').add(AdminDashboardImportJSButton.hook.bind(AdminDashboardJSButton));
    importArticles(
        {
            type: 'script',
            article: 'u:dev:MediaWiki:I18n-js/code.js'
        },
        {
            type: 'style',
            article: 'u:dev:MediaWiki:AdminDashboardImportJSButton.css'
        }
    );
})(window.jQuery, window.mediaWiki);