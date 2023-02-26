(function() {
    if (
        mw.config.get('wgCanonicalSpecialPageName') !== 'AdminDashboard' ||
        window.AdminDashboardimportJSButtonLoaded
    ) {
        return;
    }
    window.AdminDashboardimportJSButtonLoaded = true;
    var AdminDashboardimportJSButton = {
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
                        'class': 'representation AdminDashboardimportJSButton'
                    }).append(
                        $('<span>', {
                            text: 'imp'
                        })
                    ),
                    i18n.msg('text').plain()
                )
            ).hover($.proxy(this.hover, this), $.proxy(this.unhover, this));
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
            i18n.loadMessages('AdminDashboard_importJS-Button')
                .then($.proxy(this.init, this));
        }
    };
    mw.hook('dev.i18n').add($.proxy(AdminDashboardimportJSButton.hook, AdminDashboardimportJSButton));
    importArticle(
        {
            type: 'script',
            article: 'u:dev:MediaWiki:I18n-js/code.js'
        },
        {
            type: 'style',
            article: 'u:dev:MediaWiki:AdminDashboardimportJSButton.css'
        }
    );
})();