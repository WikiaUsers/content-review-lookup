( function( $, mw, window ) {
    'use strict';

    // Double-loading prevention
    if ( window.FandomNoticeLoaded ) {
        return;
    }
    window.FandomNoticeLoaded = true;

    // Load CSS and dependencies
    importArticles( {
        type: 'style',
        article: 'u:dev:MediaWiki:FandomMergeNotice.css'
    }, {
        type: 'script',
        articles: [
            'u:dev:MediaWiki:I18n-js/code.js',
            'u:dev:MediaWiki:Fetch.js'
        ]
    } );


    // Main function
    function init( i18n, msg ) {
        const fandomURL = 'https://fandom.com';

        if ( msg === undefined ) {
            return console.error( 'Missing notice setup in the MediaWiki:Custom-FandomMergeNotice' );
        }

        var content = '';

        var data = msg.split( '|' );
        if ( data.length == 3 && data[0] === 'close' ) {
            // Close notice: close|date|url
            const date = new Date( data[1] );
            const days = Math.max( Math.ceil( ( date.getTime() - Date.now() ) / ( 24 * 60 * 60 * 1000 ) ), 0 ) || 0;

            var url = data[2];
            if ( !( /(^|\.)(fandom\.com|gamepedia\.com|wikia\.(com|org))$/.test( new URL( url, window.location ).hostname ) ) ) {
                url = fandomURL;
            }

            content = i18n.msg( 'fandom-closenotice_text', days, date.toLocaleDateString( mw.config.get( 'wgUserLanguage' ) ), url ).parse();
        } else {
            // Merge notice: target[/lang]
            // Support for non-EN wikis
            const data = msg.split( '/' );
            const url = 'https://' + data[0] + '.fandom.com' + ( data.length === 2 ? ( '/' + data[1] ) : '?utm_source=FandomMerge&utm_medium=banner&utm_campaign=' + data[0] );

            content = i18n.msg( 'fandom-notice_text', url ).parse();
        }

        // Render banner's HTML
        $( '<a>', {
            href: fandomURL,
            id: 'banner_notice'
        } ).append(
            $( '<div>', { id: 'fandom_notice' } ).append(
                $( '<div>', { id: 'fandom_notice-images' } ).append(
                    $( '<a>', { href: fandomURL } )
                ),
                $( '<span>', { html: content } )
            )
        ).insertBefore( '.page-header' );
    }

    // Load i18n-js
    const defI18n = $.Deferred();
    mw.hook( 'dev.i18n' ).add( function( i18n ) {
        i18n.loadMessages( 'FandomMergeNotice' ).then( defI18n.resolve.bind( defI18n ) );
    } );
    
    // Get data from system message using Fetch lib
    const defFetch = $.Deferred();
    mw.hook( 'dev.fetch' ).add( function( fetch ) {
        fetch( {
            noCache: 'true',
            messages: [ 'Custom-FandomMergeNotice' ]
        } ).then( defFetch.resolve.bind( defFetch ) );
    } );

    $.when( defI18n, defFetch ).done( init );
} )( jQuery, mediaWiki, this );