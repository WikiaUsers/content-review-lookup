/**
 * AnalyticsShortcut
 * Adds shortcut to analytics dashboard page in community header
 */
;( function( mw ) {
    'use strict';

    var config = mw.config.get( [
        'wgUserGroups',
        'wgVersion'
    ] );

    if (
        !new RegExp( [
            'sysop',
            'staff',
            'helper',
            'wiki-manager',
            'content-team-member'
        ].join('|') ).test( config.wgUserGroups.join() ) ||
        document.getElementById( 'analytics-header-button' )
    ) {
        return;
    }

    var isUCP = config.wgVersion !== '1.19.24';

    mw.loader.using( 'mediawiki.util', function() {
        mw.util.addCSS( '.wds-community-header #analytics-header-button svg { height: 18px }' );
        mw.hook( 'dev.fetch' ).add( function( fetch ) {
            fetch( 'analytics_dashboard' ).then( function( msg ) {
                var button = document.createElement( 'a' ),
                    button_group = document.querySelector( '.wds-community-header__wiki-buttons .wds-dropdown' ),
                    parent = button_group.parentNode;

                button.classList.add( 'wds-button', 'wds-is-secondary' );
                button.href = mw.util.getUrl( 'Special:Analytics' );
                button.title = msg;
                button.id = 'analytics-header-button';
                button.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><defs><path id="poll-a" d="M17 21h5V10h-5v11zm-7-6V3h5v18h-5v-6zm-7 6h5v-5H3v5zM23 8h-6V2a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v12H2a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h21a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1z"/></defs><use fill-rule="evenodd" xlink:href="#poll-a"/></svg>';

                parent.insertBefore( button, button_group.previousSibling );
            } );
        } );
    } );

    if ( isUCP ) {
        mw.loader.load( 'https://dev.fandom.com/load.php?mode=articles&only=scripts&articles=MediaWiki:Fetch.js' );
    } else {
        importArticle( {
            type: 'script',
            article: 'u:dev:MediaWiki:Fetch.js'
        } );
    }
} )( mediaWiki );