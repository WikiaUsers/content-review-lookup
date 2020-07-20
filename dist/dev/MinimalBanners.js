(function () {
    if (window.MinimalBannersLoaded) {
        return;
    }
    window.MinimalBannersLoaded = true;
    var preloads = 0;
    var placement;
    function click () {
        $('.wds-banner-notification').each(function () {
            $(this).find('svg:nth-child(3)').click();
        });
    }
    function init (i18n) {
        placement.script('MinimalBanners');    
        $(placement.element('tools'))[placement.type('append')](
            $('<li>').append(
                $('<a>', {
                    click: click,
                    text: i18n.msg('label').plain()
                })
            )
        );
    }
    function preload () {
        if (++preloads === 2) {
            placement = window.dev.placement.loader;
            window.dev.i18n.loadMessages('MinimalBanners').then(init);
        }
    }
    mw.hook('dev.i18n').add(preload);
    mw.hook('dev.placement').add(preload);
    importArticles({
        type: 'script',
        articles: [
            'u:dev:MediaWiki:I18n-js/code.js',
            'u:dev:MediaWiki:Placement.js'
        ]
    });
})();