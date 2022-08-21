/**
 * Shows the wiki rep on the toolbar
 * https://dev.fandom.com/wiki/ShowWROnToolbar
 *
 * Data obtained by this script is subject to caching on per-wiki basis!
 * Remove your browser cookies to invalidate it or wait 24 hours auto-expiration
 * 
 * Alternatively, you can force-disable cache by setting:
 * window.ShowWROnToolbarDisableCache = true;
 *
 * Authors: Noreplyz, Sophiedp
 * Rewritten by: Rail
 */
mw.loader.using( [
    'mediawiki.api',
    'mediawiki.util',
    'mediawiki.cookie'
], function() {
    'use strict';

    /**
     * Some wikis (such as Community Central) have this special page disabled so check for that
     * Also prevent double loading
     */
    if ( !document.querySelector( 'a[data-tracking="explore-community"]' ) || window.ShowWROnToolbarLoaded ) {
        return;
    }
    window.ShowWROnToolbarLoaded = true;

    const conf = mw.config.get( [
        'wgContentLanguage',
        'wgFormattedNamespaces',
        'wgCityId',
        'wgServerName'
    ] );

    var self = {};

    self.cachePrefix = conf.wgCityId + '-';
    self.cacheKey = 'wikiRepresentative';

    /**
     * Get data from cache. Defaults to null if data isn't cached
     * Done via cookies and not localStorage because of expiration time
     *
     * @returns {string|null}
     */
    self.getCachedData = function() {
        return mw.cookie.get( self.cacheKey, self.cachePrefix );
    };

    /**
     * Function to save data to cache without having
     * to set mw.cookie.set() options on your own
     *
     * @param {string} cacheValue
     */
    self.cacheData = function( cacheValue ) {
        self.cacheDuration = ( !window.ShowWROnToolbarDisableCache
            ? 3600 * 24 // One day
            : 0 // force session cookie
        );

        mw.cookie.set( self.cacheKey, cacheValue, {
            prefix: self.cachePrefix,
            expires: self.cacheDuration,
            domain: conf.wgServerName
        } );
    };

    self.wikiRepresentative = null;
    self.hasNoWr = self.getCachedData() === 'null';

    /**
     * Scrap Special:Community to obtain information about assigned Wiki Representative
     * or ARC (Admin Request Coordination – that's a non-EN thing) person and parse them.
     *
     * Theoretically Special:Community has an API but id doesn't contain WR information.
     * We use `apioutput` value for `useskin` parameter to make this scrapping a bit more optimal.
     *
     * @param {Function} callback
     */
    self.getWikiRepresentative = function( callback ) {
        const communityPageUrl = mw.util.getUrl(
            conf.wgFormattedNamespaces[-1] + ':Community', {
                useskin: 'apioutput',
                safemode: 1
            }
        );
        const scrapRequest = function( callback ) {
            fetch( communityPageUrl ).then( function( resp ) {
                return resp.text();
            } ).then( function( html ) {
                const parseApi = new DOMParser();
                const parsedHTML = parseApi.parseFromString( html, 'text/html' );

                callback( parsedHTML );
            } );
        };

        scrapRequest( function( communityHtml ) {
            const wrHandleSelector = 'a[data-tracking="wiki-representative-avatar-username"]';
            const wrHandle = communityHtml.querySelector( wrHandleSelector );

            // Wiki has no WR assigned – we panic
            if ( !wrHandle ) {
                // Not type-correct but eh
                self.cacheData( 'null' );
                self.hasNoWr = true;

                callback( null );
                return false;
            }

            // For whatever reason DOM element with this has a lot of spaces around its text
            const wrUsername = wrHandle.innerText.trim();

            self.cacheData( wrUsername );
            self.wikiRepresentative = wrUsername;

            mw.hook( 'dev.showWROnToolbar' ).fire( wrUsername );

            callback( wrUsername );
        } );
    };

    self.buildUI = function() {
        const toolbarElement = document.createElement( 'li' );
        const toolbarWrapper = document.querySelector( '#WikiaBar .tools' );

        const wrLabel = ( conf.wgContentLanguage === 'en'
            ? 'WR'
            : 'ARC'
        );

        toolbarElement.classList.add( 'custom' );
        toolbarElement.classList.add( 'wrOnToolbar' );
        toolbarElement.innerHTML = wrLabel + ':&nbsp;';

        if ( !self.hasNoWr ) {
            const wrLink = document.createElement( 'a' );
            const wrUrl = mw.util.getUrl(
                conf.wgFormattedNamespaces[2] + ':' + self.wikiRepresentative
            );

            wrLink.setAttribute( 'href', wrUrl );
            wrLink.setAttribute( 'title', self.wikiRepresentative );
            wrLink.innerText = self.wikiRepresentative;

            toolbarElement.appendChild( wrLink );
        } else {
            // There is no WR – this requires mw.Api() call beforhand to get message in place
            new mw.Api().loadMessagesIfMissing( ['rightsnone'] ).then( function() {
                const noneMessage = mw.messages.get( 'rightsnone' );

                toolbarElement.innerHTML += noneMessage;
                toolbarElement.setAttribute( 'title', noneMessage );
            } );
        }

        toolbarWrapper.appendChild( toolbarElement );
    };

    self.init = function() {
        // Check for data in cache. If it's not present – scrap S:Community
        if ( !self.getCachedData() ) {
            self.getWikiRepresentative( function() {
                self.buildUI();
            } );
        } else {
            self.wikiRepresentative = self.getCachedData();
            this.buildUI();
        }
    };

    self.init();

    // Export API
    window.ShowWROnToolbar = self;
} );