// v1.2 by Luqgreg
// forked to support YSW refering to Wiki Managers as Fandom Ambassadors
// <nowiki>
require( [
    'wikia.window',
    'jquery',
    'mw'
], function( window, $, mw ) {
    var config = mw.config.get( [
        'wgScriptPath',
        'wgCanonicalSpecialPageName'
    ] );

    if ( config.wgCanonicalSpecialPageName !== 'Community' || $( '#wiki-manager-module' ).length ) {
        return;
    }

    function wikiManagerModule( wds, i18n ) {
        var api = new mw.Api();
        api.get( {
            action: 'query',
            meta: 'allmessages',
            ammessages: 'custom-Wiki_Manager'
        } ).done( function( r, s ) {
            if ( s !== 'success' || !r.query ) {
                return;
            }

            api.get( {
                action: 'query',
                list: 'users',
                ususers: r.query.allmessages[0]['*'],
                usprop: 'groups'
            } ).done( function( r, s ) {
                if ( s !== 'success' || !r.query ) {
                    return;
                }

                var user = r.query.users[0];
                $.getJSON( config.wgScriptPath + '/api/v1/User/Details', {
                    ids: user.userid,
                    size: 50
                } ).done( function( r, s ) {
                    if ( s !== 'success' || !r.items ) {
                        return;
                    }

                    var user2 = r.items[0],
                        badge = user.groups.includes( 'staff' ) ? 'staff' : user.groups.includes( 'helper' ) ? 'helper' : undefined;

                    if ( badge ) {
                        badge = {
                            badgeText: badge,
                            badgeMarkup: wds.badge( badge, {
                                width: 18
                            } ).outerHTML
                        };
                    }

                    require( [
                        'wikia.mustache',
                        'communitypage.templates.mustache'
                    ], function( mustache, templates ) {
                        $(
                            mustache.render( templates.adminsModule, {
                                topAdminsData: {
                                    topAdminsHeaderText: 'Fandom Ambassador',
                                    topAdminsList: [ {
                                        avatar: '<img src="' + user2.avatar + '">',
                                        badge: badge,
                                        profilePage: user2.url,
                                        userName: user.name
                                    } ],
                                    adminsText: '<a href="https://community.fandom.com/wiki/Help:Wiki_Managers">' + i18n.msg( 'wiki-manager_desc' ).escape() + '</a>'
                                }
                            }, {
                                topAdmins: templates.topAdmins.replace(/([^{]){{adminsText}}([^}])/, '$1{{{adminsText}}}$2')
                            } )
                        ).attr( 'id', 'wiki-manager-module' ).insertAfter( '.community-page-admins-module' );
                    } );
                } );
            } );
        } );
    }

    $.when(
        new $.Deferred( function( deferred ) {
            if ( window.dev && window.dev.wds ) {
                deferred.resolve( window.dev.wds );
            } else {
                mw.hook( 'dev.wds' ).add( function( wds ) {
                    deferred.resolve( wds );
                });
                importArticle( {
                    type: 'script',
                    article: 'u:dev:MediaWiki:WDSIcons/code.js'
                } );
            }
        } ),
        new $.Deferred( function( deferred ) {
            if ( window.dev && window.dev.i18n ) {
                window.dev.i18n.loadMessages( 'WikiManager_Nameplate' ).done( deferred.resolve );
            } else {
                mw.hook( 'dev.i18n' ).add( function( i18n ) {
                    i18n.loadMessages( 'WikiManager_Nameplate' ).done( deferred.resolve );
                } );
                importArticle( {
                    type: 'script',
                    article: 'u:dev:MediaWiki:I18n-js/code.js'
                } );
            }
        } ),
        mw.loader.using( [ 'mediawiki.api', 'mediawiki.util' ] )
    ).done( wikiManagerModule );
} );