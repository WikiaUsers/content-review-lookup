(function() {
    if (
        mw.config.get('wgCanonicalSpecialPageName') !== 'AdminDashboard' ||
        window.AdminDashboardBlockLoaded
    ) {
        return;
    }
    window.AdminDashboardBlockLoaded = true;
    var AdminDashboardBlock = {
        init: function(i18n) {
            console.log(i18n);
            this.$control = $('<li>', {
                'class': 'control',
                'data-tooltip': i18n.msg('tooltip').plain()
            }).append(
                $('<a>', {
                    'class': 'set',
                    href: mw.util.getUrl('Special:Block')
                }).append(
                    $('<span>', {
                        'class': 'representation AdminDashboardBlock'
                    }).append(
                        $('<div>').append(
                            $('<span>', {
                                text: 'block'
                            })
                        )
                    ),
                    'Block'
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
            i18n.loadMessages('AdminDashboard block')
                .then($.proxy(this.init, this));
        }
    };
    mw.hook('dev.i18n').add($.proxy(AdminDashboardBlock.hook, AdminDashboardBlock));
    importArticle(
        {
            type: 'script',
            article: 'u:dev:MediaWiki:I18n-js/code.js'
        },
        {
            type: 'style',
            article: 'u:dev:MediaWiki:AdminDashboardBlock.css'
        }
    );
})();