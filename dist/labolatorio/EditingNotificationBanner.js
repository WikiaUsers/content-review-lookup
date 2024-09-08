/* EditingNotificationBanner - edit more pages like this

v1.3 by MtaÄ and Luqgreg
*/
require( [
    'wikia.window',
    'jquery',
    'mw',
    'wikia.tracker',
    'BannerNotification'
], function ( window, $, mw, tracker, banner ) {
    if ( window.EditingNotificationBannerLoaded ) {
        return;
    }
    window.EditingNotificationBannerLoaded = true;

    var api,
        config = mw.config.get( [
            'wgAction',
            'wgCategories',
            'wgContentLanguage',
            'wgFormattedNamespaces',
            'wgNamespaceIds',
            'wgPageName',
            'wgUserName',
            'wgUserLanguage'
        ] ),
        track = tracker.buildTrackingFunction( {
            category: 'editing-notification-banner',
            action: tracker.ACTIONS.CLICK,
            trackingMethod: 'analytics'
        } ),
        nsCategoryPrefix = config.wgFormattedNamespaces[config.wgNamespaceIds.category] + ':',
        categoryIgnore = [];

    function getCategories( page ) {
        return new $.Deferred( function( deferred ) { 
            api.get( {
                action: 'parse',
                prop: 'categories',
                page: page
            } ).done( function( r, s ) {
                if ( s !== 'success' || !r.parse ) {
                    deferred.resolve( [] );
                    return;
                }

                var out = [];
                r.parse.categories.forEach( function( e ) {
                    out.push( e['*'] );
                } );

                deferred.resolve( out );
            } );
        } );
    }

    function isCategoryMember( page, category ) {
        return new $.Deferred( function( deferred ) {
            categoryIgnore.push( page );
            getCategories( page ).done( function( c ) {
                for ( var i = 0; i < c.length; ++i ) {
                   if ( c[i] === category ) {
                       deferred.resolve( true );
                       return;
                   }
                }

                var subdeferreds = [];
                for ( var i = 0; i < c.length; ++i ) {
                    if ( categoryIgnore.indexOf( nsCategoryPrefix + c[i] ) === -1 ) {
                        subdeferreds.push( isCategoryMember( nsCategoryPrefix + c[i], category ) );
                    }
                }

                if ( subdeferreds.length ) {
                    $.when.apply( undefined, subdeferreds ).done( function() {
                        var out = subdeferreds.length === 1 && arguments[0];

                        if ( subdeferreds.length !== 1 ) {
                            for ( var i = 0; i < arguments.length; ++i ) {
                                out = out || arguments[i];
                            }
                        }

                        deferred.resolve( out );
                    } );
                } else {
                    deferred.resolve( false );
                }
            } )
        } );
    }
    
    function AddTrackingOnClick( $element, label ) {
        $element.on( 'mousedown', function( e ) {
            track( {
                browserEvent: e,
                label: label
            } );
        } );
    }

    function ShowBanner( target ) {
        // TODO: Use mw.Message instead (?)
        var message = new banner(
            config.wgUserName === null ?
                'Excellent edit! Information is key in our battle against the Evil. Would you like to be a <span style="font-weight:bold"><a target="_blank" class="editing-notification-banner-loggedout-helppage" href="/wiki/Help:Create_an_account#Account_benefits">key user</a></span> of this community? <span style="font-weight:bold"><a target="_blank" class="editing-notification-banner-loggedout-registeraccount" href="https://www.fandom.com/signin?redirect=' + encodeURI( window.location ) + '&uselang=' + config.wgUserLanguage + '">Register an account here!</a></span>' :
                'Awesome job editing, <span style="font-weight:bold">' + config.wgUserName + '</span>! Many of the "' + mw.html.escape( target ) + '" pages can use your skills! <span style="font-weight:bold"><a target="_blank" class="editing-notification-banner-loggedin-suggestedpage" href="' + mw.util.getUrl( nsCategoryPrefix + target ) + '">Take a look, and see what you can do!</a></span>',
            'notify'
        );

        
		message.show();
		message.$element.find( '.wds-banner-notification__icon' ).html( '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" class="wds-icon wds-icon-small" id="wds-icons-checkmark-small"><path d="M14 8.586L9.414 4 11 2.414 15.586 7 14 8.586zM6.586 16H2v-4.586l6-6L12.586 10l-6 6zm11.121-9.707l-6-6a.999.999 0 0 0-1.414 0l-9.999 10a.99.99 0 0 0-.217.325A.991.991 0 0 0 0 11v6a1 1 0 0 0 1 1h6c.13 0 .26-.026.382-.077a.99.99 0 0 0 .326-.217l9.999-9.999a.999.999 0 0 0 0-1.414z" fill-rule="evenodd">' );
        track( {
            action: tracker.ACTIONS.IMPRESSION,
            label: config.wgUserName === null ? 'editing-notification-banner-impressions-loggedout' : 'editing-notification-banner-impressions-loggedin'
        } );

        message.onClose( function() {
            track( {
                label: config.wgUserName === null ? 'editing-notification-banner-close-loggedout' : 'editing-notification-banner-close-loggedin'
            } );
            localStorage.setItem( 'EditingNotificationsBanner-' + config.wgContentLanguage, Date.now() );
        } );
        AddTrackingOnClick(
            message.$element.find( '.editing-notification-banner-loggedin-suggestedpage' ),
            'editing-notification-banner-clicked-suggestedpage-loggedin'
        );
        AddTrackingOnClick(
            message.$element.find( '.editing-notification-banner-loggedout-helppage' ),
            'editing-notification-banner-clicked-helppage-loggedout'
        );
        AddTrackingOnClick(
            message.$element.find( '.editing-notification-banner-loggedout-registeraccount' ),
            'editing-notification-banner-clicked-registeraccount-loggedout'
        );
    }

    function EditingNotificationBanner() {
        if ( config.wgAction !== 'view' ) {
            return;
        }

        var lastShown = localStorage.getItem( 'EditingNotificationsBanner-' + config.wgContentLanguage );
        if ( lastShown && ( Date.now() - lastShown ) < ( 24 * 3600 * 1000 ) ) { // less than a day
            return;
        }

        api = new mw.Api();
        api.get( {
            action: 'query',
            meta: 'allmessages',
            ammessages: 'Staff-EditingNotificationBanner'
        } ).done( function ( r, s ) {r.query.allmessages[0]['*'] = '*Need for Speed Wiki\n** mode=categorymembers';
            if ( s !== 'success' || !r.query || !r.query.allmessages[0]['*'] ) {
                return;
            }

            var i = 0,
                lines = r.query.allmessages[0]['*'].split( '\n' ),
                modeRegex = /^mode\s*=\s*(\w+)/;

            function internalProcessData() {
                return new $.Deferred( function( deferred ) {
                    if ( i >= lines.length - 1 ) {
                        deferred.resolve( null );
                        return;
                    }

                    var e = lines[i];

                    if ( e.startsWith( '*' ) ) {
                        var target = e.replace( /^\*\s*(?:targetcategory\s*=\s*)?/, '' ).replace( /_/g, ' ' );

                        if ( lines[i+1].startsWith( '**' ) ) {
                            var pages = lines[++i].replace( /^\*\*\s*/, '' ).split( '|' ),
                                mode = null;

                            if ( pages.length === 1 && modeRegex.test( pages[0].trim() ) ) {
                                mode = pages[0].trim().match( modeRegex )[1].toLowerCase();
                            }

                            if ( mode === 'categorymembersstrict' ) {
                                for ( var j = 0; j < config.wgCategories.length; ++j ) {
                                    if ( target === config.wgCategories[j] ) {
                                        deferred.resolve( target );
                                        return;
                                    }
                                }

                                internalProcessData().done( deferred.resolve );
                                return;
                            } else if ( mode === 'categorymembers' ) {
                                isCategoryMember( config.wgPageName, target.replace( / /g, '_' ) ).done( function( r ) {
                                    if ( r ) {
                                        deferred.resolve( target );
                                        return;
                                    } else {
                                        internalProcessData().done( deferred.resolve );
                                    }
                                } );
                            } else if (
                                mode === 'all' ||
                                pages.findIndex( function( e ) {
                                    return config.wgPageName === e.trim().replace( / /g, '_' );
                                } ) !== -1
                            ) {
                                deferred.resolve( target );
                            } else {
                                internalProcessData().done( deferred.resolve );
                            }
                        }
                    }
                } );
            }

            internalProcessData().done( function( target ) {
                if ( target === null ) {
                    return;
                }
    
                // NOTE: document.referrer points at ?action=edit after clicking on any link in the editor, no matter if the page was really edited or not, leading to false-positives
                if ( [ 'edit', 'submit' ].indexOf( mw.util.getParamValue( 'action', document.referrer ) ) !== -1 )  {
                    ShowBanner( target );
                }
    
                mw.hook( 've.activationComplete' ).add( function() {
                    ve.trackSubscribe( 'mwedit.saveSuccess', $.proxy( ShowBanner, undefined, target ) );
                } );
            } );
        } );
    }

    mw.loader.using( [ 'mediawiki.api', 'mediawiki.util' ], EditingNotificationBanner );
} );