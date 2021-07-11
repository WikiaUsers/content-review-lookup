/**
 * AnalyticsShortcut
 * Adds shortcut to analytics dashboard page in community header
 */
;( function( mw, window ) {
    'use strict';

    if ( !(document.getElementsByClassName( 'wds-community-header__wiki-buttons' )[0] || document.getElementsByClassName( 'wiki-tools' )[0]) || window.analyticsButtonLoaded || !/sysop|staff|helper|wiki-manager|content-team-member/.test(mw.config.get( 'wgUserGroups' ).join()) ) {
        return;
    }

    function buildUI( labelMsg ) {
        mw.hook( 'dev.ui' ).add( function( ui ) {
            const button = ui( {
                type: 'a',
                attr: {
                    id: 'analytics-header-button',
                    class: 'wds-button wds-is-secondary',
                    href: mw.util.getUrl(
                        mw.config.get( 'wgFormattedNamespaces' )[-1] + ':Analytics'
                    ),
                    title: labelMsg
                },
                children: [ {
                    type: 'svg',
                    attr: {
                        class: 'wds-icon wds-icon-small',
                        xmlns: 'http://www.w3.org/2000/svg',
                        'xmlns:xlink': 'http://www.w3.org/1999/xlink',
                        viewBox: '0 0 24 24'
                    },
                    children: [
                        {
                            type: 'defs',
                            children: [ {
                                type: 'path',
                                attr: {
                                    id: 'poll-a',
                                    d: 'M17 21h5V10h-5v11zm-7-6V3h5v18h-5v-6zm-7 6h5v-5H3v5zM23 8h-6V2a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v12H2a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h21a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1z'
                                }
                            } ]
                        },
                        {
                            type: 'use',
                            attr: {
                                'fill-rule': 'evenodd',
                                'xlink:href': '#poll-a'
                            }
                        }
                    ]
                } ]
            } );

            if ( mw.config.get('skin') === 'fandomdesktop' ) {
                document.querySelectorAll( '.wiki-tools' ).forEach( function( buttonGroup ) {
                    buttonGroup.insertBefore( button, buttonGroup.lastElementChild );
                } );
            } else {
                const buttonGroup = document.querySelector( '.wds-community-header__wiki-buttons .wds-dropdown' );
                buttonGroup.parentNode.insertBefore( button, buttonGroup.previousSibling );
            }
        } );
    }

    mw.hook( 'dev.fetch' ).add( function( fetch ) {
        fetch( 'analytics_dashboard' ).then( function( msg ) {
            buildUI( msg );
        } );
    } );

    window.analyticsButtonLoaded = true;

    importArticles( {
        type: 'script',
        articles: [
            'u:dev:MediaWiki:Fetch.js',
            'u:dev:MediaWiki:UI-js/code.js'
        ]
    } );
} )( mediaWiki, this );