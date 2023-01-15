/*
v1 - by Luqgreg
*/
   
require( [
    'wikia.window',
    'jquery',
    'mw',
    'wikia.mustache',
    'communitypage.templates.mustache'
], function ( window, $, mw, mustache, templates ) {
    function wikiManagerModule() {
        if ( $( '#wiki-manager-module' ).length ) {
            return;
        }
   
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
            } ).done( function ( r, s ) {
                if ( s !== 'success' || !r.query ) {
                    return;
                }
     
                var user = r.query.users[0];
                $.getJSON( mw.config.get( 'wgScriptPath' ) + '/api/v1/User/Details', { ids: user.userid, size: 50 } ).done( function( r, s ) {
                    if ( s !== 'success' || !r.items ) {
                        return;
                    }
     
                    var user2 = r.items[0];
                    var badge = user.groups.includes( 'staff' ) ? 'staff' : user.groups.includes( 'helper' ) ? 'helper' : undefined;
     
                    if ( badge ) {
                        var badge = {
                            badgeText: badge,
                            badgeMarkup: dev.wds.badge( badge, { width: 18 } ).outerHTML
                        }
                    }
     
                    $(
                        mustache.render( templates.adminsModule, {
                            topAdminsData: {
                                topAdminsHeaderText: 'Wiki Manager',
                                topAdminsList: [
                                    {
                                        avatar: '<img src="' + user2.avatar + '">',
                                        badge: badge,
                                        profilePage: user2.url,
                                        userName: user.name
                                    }
                                ],
                                adminsText: '<a href="https://community.fandom.com/wiki/Help:Wiki_Managers">Here to support and help the wiki grow and thrive.</a>'
                            }
                        }, {
                            topAdmins: templates.topAdmins.replace( /([^{]){{adminsText}}([^}])/, '$1{{{adminsText}}}$2' )
                        } )
                    ).attr( 'id', 'wiki-manager-module' ).insertAfter( '.community-page-admins-module' );
                } );
            } );
        } );
    }
   
    if ( document.location.href.indexOf( 'Special:Community' ) > -1 ) {
        if ( window.dev.wds ) {
            wikiManagerModule();
        } else {
            mw.hook( 'dev.wds' ).add( wikiManagerModule );
            importArticle( { type: 'script', article: 'u:dev:MediaWiki:WDSIcons/code.js' } );
        }
    }
} );