require([
    'jquery',
    'mw',
    'wikia.window'
], function( $, mw, window ) {
    // Double-loading prevention
    if ( $('#gamepedia_notice').exists() || window.GamepediaNoticeLoaded ) return;
    window.GamepediaNoticeLoaded = true;

    // Load CSS and dependencies
    importArticle({
        type: 'style',
        article: 'u:dev:MediaWiki:GamepediaNotice.css'
    }, {
        type: 'script',
        articles: [
            'u:dev:MediaWiki:I18n-js/code.js',
            'u:dev:MediaWiki:Fetch.js'
        ]
    });

    // Main function
    function init(i18n) {
        // Render banner's HTML
        $('<a>', {
            href: 'https://gamepedia.com',
            id: 'banner_notice'
        }).append(
            $('<div>', {
                id: 'gamepedia_notice'
            }).append(
                $('<div>', {
                    id: 'gamepedia_notice-images'
                }).append(
                    $('<img>', {
                        src: 'https://vignette.wikia.nocookie.net/rappy/images/b/bc/Fandom_logo.png/revision/latest/scale-to-height-down/75'
                    }),
                    $('<img>', {
                        src: 'https://vignette.wikia.nocookie.net/rappy/images/3/38/Gamepedia_dark_transparent.png'
                    })
                ),
                $('<span>').html(i18n.msg('gamepedia-notice_text', 'https://gamepedia.com').parse())
            )
        ).insertBefore('#PageHeader');

        // Get data from system message using Fetch lib
        mw.hook('dev.fetch').add(function(fetch) {
            fetch({
                    noCache: 'true',
                    messages: ['Custom-GamepediaNotice']
                }).then(function(msg) {
                $('#banner_notice, #gamepedia_notice-images + span > a').attr('href', 'https://' + msg + '.gamepedia.com?utm_source=Fandom&utm_medium=banner&utm_campaign=' + msg);
            });
        });
    }

    // Load i18n-js
    mw.hook('dev.i18n').add(function(i18n) {
        i18n.loadMessages('GamepediaNotice').then(init);
    });
});