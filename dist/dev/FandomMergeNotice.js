( function( $, mw, window ) {
    'use strict';

    // Double-loading prevention
    if ( window.FandomNoticeLoaded ) {
        return;
    }
    window.FandomNoticeLoaded = true;

    // UCP support
    var isUCP = mw.config.get( 'wgVersion' ) !== '1.19.24';

    // Load CSS and dependencies
    if ( isUCP ) {
        mw.loader.load( 'https://dev.fandom.com/load.php?mode=articles&only=scripts&articles=MediaWiki:I18n-js/code.js|MediaWiki:Fetch.js' );
        mw.loader.load( 'https://dev.fandom.com/load.php?mode=articles&only=styles&articles=MediaWiki:FandomMergeNotice.css', 'text/css' );
    } else {
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
    }

    // Main function
    function init( i18n ) {
        var fandomURL = 'https://fandom.com';

        // Render banner's HTML
        $( '<a>', {
            href: fandomURL,
            id: 'banner_notice'
        } ).append(
            $( '<div>', { id: 'fandom_notice' } ).append(
                $( '<div>', { id: 'fandom_notice-images' } ).append(
                    $( '<a>', { href: fandomURL } ).append(
                        $( '<img>', {
                            src: 'https://vignette.wikia.nocookie.net/rappy/images/b/bc/Fandom_logo.png/revision/latest/scale-to-height-down/75'
                        } )
                    )
                ),
                $( '<span>', { html: i18n.msg( 'fandom-notice_text', fandomURL ).parse() } )
            )
        ).insertBefore( '#PageHeader' );

        // Get data from system message using Fetch lib
        mw.hook( 'dev.fetch' ).add( function( fetch ) {
            fetch( {
                noCache: 'true',
                messages: ['Custom-FandomMergeNotice']
            } ).then( function( msg ) {
                // Support for non-EN wikis
                var data = msg.split( '/' );

                $( '#banner_notice, #fandom_notice-images + span > a' ).attr( 'href',
                    // 'https://' + data[0] + '.fandom.com' + ( data.length === 2 ? ( '/' + data[1] ) : '' ) + '?utm_source=FandomMerge&utm_medium=banner&utm_campaign=' + ( data.length === 2 ? ( data[0] + '-' + data[1] ) : data[0] )
                    'https://' + data[0] + '.fandom.com' + ( data.length === 2 ? ( '/' + data[1] ) : '?utm_source=FandomMerge&utm_medium=banner&utm_campaign=' + data[0] )
                );
            } );
        } );
    }

    // Load i18n-js
    mw.hook( 'dev.i18n' ).add( function( i18n ) {
        i18n.loadMessages( 'FandomMergeNotice' ).then( init );
    } );
} )( jQuery, mediaWiki, this );