/**
 * NoLicenseWarning
 * Shows banner notification and rejects uploading is user didn't select license
 *
 * Original author unknown
 * Rewritten and improved by Rail <rail01@protonmail.com>
 */
;( function( mw, window ) {
    'use strict';

    // Meta-site configuration
    const conf = mw.config.get( [
        'wgCanonicalSpecialPageName',
        'wgUserGroups'
    ] );

    // Loading restrictions
    if ( conf.wgCanonicalSpecialPageName !== 'Upload' || window.NoLicenseWarningLoaded ) {
        return;
    }

    // Script configuration options
    window.NoLicenseWarning = window.NoLicenseWarning || {};
    window.NoLicenseWarning.forceLicense = window.NoLicenseWarning.forceLicense || false;
    window.NoLicenseWarning.excludedGroups = window.NoLicenseWarning.excludedGroups || [
        'bureaucrat',
        'sysop',
        'content-moderator',
        'bot'
    ];

    // List of mandatory excluded groups
    const mandatoryExcludedGroups = [
        'staff',
        'util',
        'helper',
        'vanguard',
        'content-volunteer',
        'content-team-member',
        'wiki-manager',
        'bot-global',
        'soap'
    ];

    // Don't run for users in excluded groups
    if (
        new RegExp( window.NoLicenseWarning.excludedGroups.join('|') ).test( conf.wgUserGroups.join() ) ||
        new RegExp( mandatoryExcludedGroups.join('|') ).test( conf.wgUserGroups.join() )
    ) {
        return;
    }

    /**
     * Main function responsible for core functionalities of NoLicenseWarning
     * @param {*} i18n
     */
    function init( i18n ) {
        // Get required elements from ids
        const form = document.getElementById( 'mw-upload-form' );
        const license = document.getElementById( 'wpLicense' );

        // Clean, UCP-compatible banners
        function notify( key, type ) {
            var msg = i18n.msg( key ).plain();

            mw.loader.using( 'mediawiki.notification', function() {
                mw.notification.notify( msg );
            } );
            
        }

        // Prepare variable for delivery state
        var isMessageDelivered;

        // Listen for upload form being submitted
        form.addEventListener( 'submit', function( event ) {
            // Determine whether license is provided
            var isLicenseProvided = ( license.value === '' ? false : true );

            /**
             * Different behaviour based on script setting
             * Allow users to upload file without license after showing them warning
             */
            if ( window.NoLicenseWarning.forceLicense === false ) {
                // Message has been delivered, do nothing
                if ( isMessageDelivered === true ) return;

                // License isn't provided
                if ( isLicenseProvided === false ) {
                    // Prevent form from being sent
                    event.preventDefault();

                    // Show warning message
                    notify( 'warning-text', 'warn' );

                    // Mark message as delivered
                    isMessageDelivered = true;
                }
            } else if ( isLicenseProvided === false ) {
                // Prevent form from being sent
                event.preventDefault();

                // Show rejection message
                notify( 'rejected-text', 'error' );
            }
        } );

        // Mark script as loaded
        window.NoLicenseWarningLoaded = true;
    }

    // Load i18n messages and run main function
    mw.hook( 'dev.i18n' ).add( function( i18n ) {
        i18n.loadMessages( 'NoLicenseWarning' ).then( init );
    } );

    // Load dependencies
    importArticle( {
        type: 'script',
        article: 'u:dev:MediaWiki:I18n-js/code.js'
    } );
} )( mediaWiki, this );