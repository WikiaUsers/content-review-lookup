/**
 * @name     UserAndIPTools
 * @desc     Script used to get data about users and include quick tools related to them
 * @author   Rail01
 *
 * @external jquery
 * @external mediawiki
 * @external wikia.window
 * 
 * @todo Rewrite to Vanilla JS
 * @todo UCP support
 */
require( [
    'jquery',
    'mw',
    'wikia.window'
], function( $, mw, window ) {

    // Loading restrictions and double-run prevention
    if ( !$( '#UserProfileMasthead' ).length || window.UserAndIPToolsLoaded ) return;
    window.UserAndIPToolsLoaded = true;

    // Great way to get user nick
    var $user = $( '#UserProfileMasthead hgroup h1[itemprop="name"]' ).text(),
        $wrapperHTML,
        ccLink = '//community.fandom.com/',
        ucpLink = '//ucp.fandom.com/',
        groups = mw.config.get( 'wgUserGroups' ).join();

    function init ( i18n ) {
        // Fetch data from API
        new mw.Api().get( {
            action: 'query',
            list: 'users',
            ususers: $user,
            usprop: [
                'groups',
                'gender',
                'registration',
                'editcount'
            ].join( '|' )
        } ).done( function( d ) {
            /**
             * Create links in better way
             *
             * @param href
             * @param name
             */
            function buildToolLink( href, name ) {
                return {
                    href: href,
                    text: i18n.msg( name ).plain(),
                    title:  i18n.msg( name + '_title' ).plain(),
                    target: ( window.UserAndIPToolsOpenInNewPage === true ? '_blank' : '_self' )
                };
            }

            // Handling request errors
            if ( d.error ) {
                var errorData = d.error;

                // us400 means "User does not exist" - therefore display IP tools
                if ( errorData.code === 'us400' ) {
                    $wrapperHTML = $( '<div>', { class: 'stalker-ip-tools' } ).append(
                        $( '<h3>', {
                            class: 'ip-tools-header',
                            text: i18n.msg( 'tools-header_ip' ).plain()
                        } ),
                        $( '<ul>', { class: 'anon-tools' } ).append(
                            $('<li>').append(
                                $( '<a>', buildToolLink( '//whois.toolforge.org/gateway.py?' + $.param( {
                                    lookup: true,
                                    ip: $user
                                } ), 'ip-tool-whois' ) ) // WHOIS
                            ),
                            $('<li>').append(
                                $('<a>', buildToolLink( '//www.xmyip.com/tor-ip-check/' + $user, 'ip-tool-torcheck' ) ) // TOR Check
                            ),
                            $('<li>').append(
                                $('<a>', buildToolLink( '//www.xmyip.com/proxy-check/' + $user, 'ip-tool-proxy-check' ) ) // Proxy Checker
                            ),
                            $('<li>').append(
                                $('<a>', buildToolLink( '//db-ip.com/' + $user, 'ip-tool-geolocate' ) ) // Geolocate
                            )
                        )
                    );
                } else {
                    // Log API errors
                    return console.error( i18n.msg( 'error', $user, errorData.code, errorData.info ).plain() );
                }
            } else if ( !d.query.users || d.query.users.length === 0 ) {
                // Log errors on user accounts that doesn't exist
                return console.error( i18n.msg( 'error-no-user' ).plain() );
            } else {
                // Store fetched data as an object
                var userData = d.query.users[0];

                /**
                 * Debug log
                 *
                 * Could be disabled by window.UserAndIPToolsDisableDebugLog = true
                 */
                if ( !window.UserAndIPToolsDisableDebugLog ) {
                    console.log(
                        i18n.msg( 'debug-log', $user, userData.userid ).plain()
                    );
                }

                // Display data and tools for registered users
                $wrapperHTML = $( '<div>', { class: 'user-stalk_wrapper' } ).append(
                    $( '<div>', { class: 'stalker-user-info' } ).append(
                        $( '<h3>', {
                            class: 'user-info-header',
                            text: i18n.msg( 'info-header' ).plain()
                        } ),
                        $( '<ul>', { class: 'user-info' } ).append(
                            $( '<li>' ).append( // ID
                                $( '<span>', {
                                    text: i18n.msg( 'user-id' ).plain(),
                                    class: 'data-label'
                                } ),
                                $( '<span>', {
                                    text: userData.userid,
                                    class: 'data-value'
                                } )
                            ),
                            $( '<li>' ).append( // Gender
                                $( '<span>', {
                                    text: i18n.msg( 'user-gender' ).plain(),
                                    class: 'data-label'
                                } ),
                                $( '<span>', {
                                    text: userData.gender,
                                    class: 'data-value'
                                } )
                            ),
                            $( '<li>' ).append( // Registeration
                                $( '<span>', {
                                    text: i18n.msg( 'user-registration' ).plain(),
                                    class: 'data-label'
                                } ),
                                $( '<span>', {
                                    text: userData.registration,
                                    class: 'data-value'
                                } )
                            ),
                            $( '<li>' ).append( // Editcount
                                $( '<span>', {
                                    text: i18n.msg( 'user-editcount' ).plain(),
                                    class: 'data-label'
                                } ),
                                $( '<span>', {
                                    text: userData.editcount,
                                    class: 'data-value'
                                } )
                            ),
                            $( '<li>' ).append( // Groups
                                $( '<span>', {
                                    text: i18n.msg( 'user-groups' ).plain(),
                                    class: 'data-label'
                                } ),
                                $( '<span>', {
                                    text: userData.groups.join(),
                                    class: 'data-value'
                                } )
                            )
                        )
                    ),
                    $( '<div>', { class: 'stalker-user-tools' } ).append(
                        $( '<h3>', {
                            class: 'user-tools-header',
                            text: i18n.msg( 'tools-header' ).plain()
                        } ),
                        $('<ul>', { class: 'user-tools' }).append(
                            $( '<li>' ).append(
                                $( '<a>', buildToolLink( ccLink + 'User:' + $user + '/global.js', 'user-tool-js' ) ), // Global JS
                                // Additional UCP link
                                ' (',
                                $( '<a>', {
                                    href: ucpLink + 'User:' + $user + '/global.js',
                                    text: 'UCP',
                                    target: '_blank'
                                } ),
                                ')'
                            ),
                            $( '<li>' ).append(
                                $( '<a>', buildToolLink( ccLink + 'User:' + $user + '/global.css', 'user-tool-css' ) ), // Global CSS
                                // Additional UCP link
                                ' (',
                                $( '<a>', {
                                    href: ucpLink + 'User:' + $user + '/global.css',
                                    text: 'UCP',
                                    target: '_blank'
                                } ),
                                ')'
                            ),
                            $( '<li>' ).append(
                                $( '<a>', buildToolLink( '//services.fandom.com/user-attribute/user/' + userData.userid, 'user-tool-services' ) ) // Services API
                            ),
                            $( '<li>' ).append(
                                $( '<a>', buildToolLink( ccLink + 'Special:Log/rights?' + $.param( { page: $user } ), 'user-tool-cc_log' ) ) // CC userrights log
                            )
                        )
                    )
                );
            }
            // Display UI
            $( '#UserProfileMasthead .details' ).after( $wrapperHTML );

            // CC MultiLookup
            if ( window.UserAndIPToolsShowMultiLookup || new RegExp( ['staff', 'helper', 'vstf', 'wiki-manager'].join( '|' ) ).test( groups ) ) {
                $( '<li>' ).append(
                    $( '<a>', buildToolLink( ccLink + 'Special:MultiLookup?' + $.param( { wptarget: $user } ), 'ip-tool-multilookup' ) )
                ).appendTo( '.stalker-ip-tools .anon-tools' );
            }

            // CC LookupContribs
            if ( window.UserAndIPToolsShowLookupContribs || new RegExp( ['staff', 'helper', 'vstf', 'wiki-manager', 'content-team-member'].join( '|' ) ).test( groups ) ) {
                $( '<li>' ).append(
                    $( '<a>', buildToolLink( ccLink + 'Special:LookupContribs?' + $.param( { target: $user } ), 'user-tool-lookupcontribs' ) )
                ).appendTo( '.stalker-user-tools .user-tools' );
            }

            // CC LookupUser
            if ( window.UserAndIPToolsShowLookupUser || new RegExp( ['staff', 'util', 'vstf', 'wiki-manager'].join( '|' ) ).test( groups ) ) {
                $( '<li>' ).append(
                    $( '<a>', buildToolLink( ccLink + 'Special:LookupUser/' + $user, 'user-tool-lookupuser' ) )
                ).appendTo( '.stalker-user-tools .user-tools' );
            }
        } );
    }

    // Load i18n messages
    mw.hook( 'dev.i18n' ).add( function( i18n ) {
        $.when(
            i18n.loadMessages( 'UserAndIPTools' ),
            mw.loader.using( 'mediawiki.api' )
        ).then( init );
    } );

    // Import i18n-js
    if ( !window.dev || !window.dev.i18n ) {
        importArticle( {
            type: 'script',
            article: 'u:dev:MediaWiki:I18n-js/code.js'
        } );
    }

    // Import CSS
    importArticle( {
        type: 'style',
        article: 'u:dev:MediaWiki:UserAndIPTools.css'
    } );
} );