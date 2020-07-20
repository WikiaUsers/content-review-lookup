(function() {
    if (
        mw.config.get('wgCanonicalSpecialPageName') !== 'AdminDashboard' ||
        window.AdminDashboardAbuseFilterLoaded
    ) {
        return;
    }
    window.AdminDashboardAbuseFilterLoaded = true;
    var AdminDashboardAbuseFilter = {
        init: function(i18n) {
            console.log(i18n);
            this.$control = $('<li>', {
                'class': 'control',
                'data-tooltip': 'Set filters for AbuseFilter.' //i18n.msg('tooltip').plain()
            }).append(
                $('<a>', {
                    'class': 'set',
                    href: mw.util.getUrl('Special:AbuseFilter')
                }).append(
                    $('<span>', {
                        'class': 'representation AdminDashboardCustom'
                    }).append(
                        $('<div>').append(
                            $('<span>', {
                                text: 'Abuse Filter'
                            })
                        )
                    ),
                    'AbuseFilter'
                )
            ).hover($.proxy(this.hover, this), $.proxy(this.unhover, this));
            $('section.wiki ul.controls').append(this.$control);
            this.$tooltip = $('.control-section.wiki > header > .dashboard-tooltip');
        },
        hover: function(e) {
            this.$tooltip.text(this.$control.data('tooltip'));
        },
        unhover: function(e) {
            this.$tooltip.text('');
        },
        hook: function(i18n) {
            i18n.loadMessages('AdminDashboard abusefilter')
                .then($.proxy(this.init, this));
        }
    };
    mw.hook('dev.i18n').add($.proxy(AdminDashboardAbuseFilter.hook, AdminDashboardAbuseFilter));
    importArticle(
        {
            type: 'script',
            article: 'u:dev:MediaWiki:I18n-js/code.js'
        },
        {
            type: 'style',
            article: 'u:dev:MediaWiki:AdminDashboardAbuseFilter.css'
        }
    );
})();