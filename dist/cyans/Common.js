/* Any JavaScript here will be loaded for all users on every page load. */

(function() {
    if (
        mw.config.get('wgCanonicalSpecialPageName') !== 'AdminDashboard' ||
        window.AdminDashboardCSSButtonLoaded
    ) {
        return;
    }
    window.AdminDashboardCSSButtonLoaded = true;
    var AdminDashboardCSSButton = {
        init: function(i18n) {
            console.log(i18n);
            this.$control = $('<li>', {
                'class': 'control',
                'data-tooltip': i18n.msg('tooltip').plain()
            }).append(
                $('<a>', {
                    'class': 'set',
                    href: mw.util.getUrl('MediaWiki:Common.css', { action: 'edit' })
                }).append(
                    $('<span>', {
                        'class': 'representation AdminDashboardCSSButton'
                    }).append(
                        $('<div>').append(
                            $('<span>', {
                                text: 'CSS1_'
                            })
                        )
                    ),
                    'CSS'
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
            i18n.loadMessages('AdminDashboard CSS-Button')
                .then($.proxy(this.init, this));
        }
    };
    mw.hook('dev.i18n').add($.proxy(AdminDashboardCSSButton.hook, AdminDashboardCSSButton));
    importArticle(
        {
            type: 'script',
            article: 'u:dev:MediaWiki:I18n-CSS/code.js'
        },
        {
            type: 'style',
            article: 'u:dev:MediaWiki:AdminDashboardJSButton.css'
        }
    );
})();