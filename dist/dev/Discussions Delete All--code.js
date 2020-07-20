// Discussions Delete All
// Button from Special:Contribs that deletes all Discussions posts of user
// @author: Jr Mime
( function( mw, window ) {
    'use strict';

    var config = mw.config.get( [
        'wgCityId',
        'wgUserGroups',
        'wgVersion',
        'wgCanonicalSpecialPageName',
        'wgTitle',
        'wgServer'
    ] );

    if (
        window.dda ||
        config.wgCanonicalSpecialPageName !== 'Contributions' ||
        !new RegExp( [
            'threadmoderator',
            'sysop',
            'staff',
            'vstf',
            'helper',
            'global-discussions-moderator',
            'wiki-manager'
        ].join( '|' ) ).test( config.wgUserGroups.join() )
    ) {
        return;
    }

    var isUCP = config.wgVersion !== '1.19.24';

    if ( isUCP ) {
        mw.loader.load( 'https://dev.fandom.com/load.php?mode=articles&only=scripts&articles=MediaWiki:I18n-js/code.js' );
    } else {
        importArticle( {
            type: 'script',
            article: 'u:dev:MediaWiki:I18n-js/code.js'
        } );
    }

    var dda = {
        preload: function( i18n ) {
            mw.loader.using( 'mediawiki.util', function() {
                i18n.loadMessages( 'Discussions Delete All' ).then( dda.init );
            } );
        },
        init: function( i18n ) {
            dda.i18n = i18n;

            var link = document.createElement( 'span' );
            var contribsTools;

            if ( isUCP ) {
                contribsTools = document.querySelector( '.mw-contributions-user-tools .mw-changeslist-links' );
            } else {
                contribsTools = document.getElementById( 'contentSub' );
            }

            link.setAttribute( 'title', dda.i18n.msg( 'delete' ).plain() );
            link.setAttribute( 'id', 'discussionAllPostsByUser' );

            link.innerText = dda.i18n.msg( 'delete' ).plain();
            link.addEventListener( 'click', dda.click );

            contribsTools.appendChild( link );
            mw.util.addCSS( '#discussionAllPostsByUser:before {' +
                'content:' + ( isUCP ? '" | "' : '" "' ) +
            '}' );
        },
        click: function() {
            if ( window.ddaDoNotConfirm || confirm( dda.i18n.msg( 'confirm' ).plain() ) ) {
                dda.deleteAll();
            }
        },
        deleteAll: function() {
            var user = config.wgTitle.split( '/' )[1];
            new mw.Api().get( {
                action: 'query',
                list: 'users',
                ususers: user
            } ).done( function( userResp ) {
                var userId = userResp.query.users[0].userid;
                var isWikiaOrg = config.wgServer.indexOf( 'wikia.org' ) !== -1;
                fetch( 'https://services.' + ( isWikiaOrg ? 'wikia.org' : 'fandom.com' )  + '/discussion/' + config.wgCityId + '/users/' + userId + '/posts/delete', {
                    method: 'PUT',
                    credentials: 'include'
                } ).then( dda.done );
            } );
        },
        done: function() {
            alert( dda.i18n.msg('done').plain() );
        }
    };

    window.dda = dda;
    mw.hook( 'dev.i18n' ).add( dda.preload );
} )( mediaWiki, window );