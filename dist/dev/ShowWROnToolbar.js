/**
 * Shows the wiki rep on the toolbar
 * https://dev.fandom.com/wiki/ShowWROnToolbar
 *
 * Authors: Noreplyz, Sophiedp
 * Rewritten by: Rail
 */
mw.loader.using( ['mediawiki.api', 'mediawiki.util'], function() {
    'use strict';

    // Some wikis (such as Community Central) have this special page disabled
    if ( !document.querySelector( 'a[data-tracking="explore-community"]' ) || window.ShowWROnToolbarLoaded ) {
        return;
    }
    window.ShowWROnToolbarLoaded = true;

    var showWR = {};

    showWR.wikiRepresentative = {
        user: null,
        link: null
    };
    showWR.hasNoWR = false;

    showWR.scrapCommunity = function( callback ) {
    	// `apioutput` skin makes this less of a tragedy, safemode prevents custom codes from loading
        const communityUrl = mw.util.getUrl( 'Special:Community', {
            useskin: 'apioutput',
            safemode: 1
        } );

        fetch( communityUrl ).then( function( resp ) {
            return resp.text();
        } ).then( function( html ) {
            const parsedHTML = new DOMParser().parseFromString(
                html, 'text/html'
            );

            callback( parsedHTML );
        } );
    };

    showWR.getWRData = function( callback ) {
        showWR.scrapCommunity( function( cDOM ) {
            const wrElement = cDOM.querySelector( 'a[data-tracking="wiki-representative-avatar-username"]' );
            
            // Wiki has no WR or ARC person assigned
            if ( !wrElement ) {
                showWR.hasNoWR = true;
                return callback( null );
            }

            showWR.wikiRepresentative.user = wrElement.innerText.trim();
            showWR.wikiRepresentative.link = wrElement;

            mw.hook( 'dev.showWROnToolbar' ).fire(
                showWR.wikiRepresentative
            );

            callback( showWR.wikiRepresentative );
        } );
    };

    showWR.buildUI = function() {
        const toolbarEl = document.createElement( 'li' );
        const wrLabel = ( mw.config.get( 'wgContentLanguage' ) === 'en'
            ? 'WR'
            : 'ARC'
        );

        toolbarEl.classList.add( 'custom' );
        toolbarEl.classList.add( 'wrOnToolbar' );
        toolbarEl.innerHTML = wrLabel + ':&nbsp;';

        if ( !showWR.hasNoWR ) {
            toolbarEl.appendChild( showWR.wikiRepresentative.link );
        } else {
            toolbarEl.innerHTML += mw.messages.get( 'rightsnone' );
        }

        document.querySelector( '#WikiaBar .tools' ).appendChild( toolbarEl );
    };

    showWR.init = function() {
        showWR.getWRData( function() {
            new mw.Api().loadMessagesIfMissing( ['rightsnone'] ).then( function() {
                showWR.buildUI();
            } );
        } );
    };

    showWR.init();
    window.ShowWROnToolbar = showWR;
} );