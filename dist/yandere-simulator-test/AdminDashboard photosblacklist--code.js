(function() {
    if (
        mw.config.get('wgCanonicalSpecialPageName') !== 'AdminDashboard' ||
        window.AdminDashboardPhotoLoaded
    ) {
        return;
    }
    window.AdminDashboardPhotoLoaded = true;
    var AdminDashboardTitle = {
        init: function(i18n) {
            console.log(i18n);
            this.$control = $('<li>', {
                'class': 'control',
                'data-tooltip': 'Edit the Photosblacklist.' //i18n.msg('tooltip').plain()
            }).append(
                $('<a>', {
                    'class': 'set',
                    href: mw.util.getUrl('MediaWiki:Photosblacklist', { action: 'edit' })
                }).append(
                    $('<span>', {
                        'class': 'representation AdminDashboardPhoto'
                    }).append(
                        $('<div>').append(
                            $('<span>', {
                                text: 'Photos Blacklist'
                            })
                        )
                    ),
                    'Photoblacklist'
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
            i18n.loadMessages('AdminDashboard Photo')
                .then($.proxy(this.init, this));
        }
    };
    mw.hook('dev.i18n').add($.proxy(AdminDashboardPhoto.hook, AdminDashboardPhoto));
    importArticle(
        {
            type: 'script',
            article: 'u:dev:MediaWiki:I18n-js/code.js'
        },
        {
            type: 'style',
            article: 'u:dev:MediaWiki:AdminDashboardPhoto.css'
        }
    );
})();