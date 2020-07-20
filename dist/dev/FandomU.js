/*
v2.3 - by Luqgreg
*/

require( [
    'wikia.window',
    'jquery',
    'mw',
    'wikia.tracker'
], function ( window, $, mw, tracker ) {
    var config = {
        player: 'VXc5h4Tf',
        langs: {
            en: {
                header: 'New to editing and contributing? We have an <a href="https://community.fandom.com/wiki/Fandom_University" title="Fandom University">extensive video library</a> to help you learn how to edit.',
                playlist: 'g0INIi6n'
            },
            es: {
                header: '¿Estás empezando a editar y contribuir? Tenemos una <a href="https://comunidad.fandom.com/wiki/Universidad_de_FANDOM" title="Universidad de FANDOM">extensa videoteca</a> para ayudarte a aprender.',
                playlist: 'XdgYjVRp?related_media_id=sxyvaxtY'
            }
        }
    }, track = tracker.buildTrackingFunction( {
        category: 'fandomu-module',
        action: tracker.ACTIONS.CLICK,
        trackingMethod: 'analytics'
    } );

    function videoPlaylistModule() {
        if ( $( '#community-page-player' ).length ) {
            return;
        }

        importArticle( {
            type: 'style',
            article: 'u:dev:MediaWiki:FandomU.css'
        } );

        var lang = mw.config.get( 'wgUserLanguage' );
        lang = config.langs.hasOwnProperty( lang ) ? lang : 'en';

        var $header = $( '<div>', { class: 'community-page-cards-module-header' } ).html( config.langs[lang].header ),
            $playerWrapper = $( '<div>', { class: 'community-page-todo-list-module' } ),
            $player = $( '<div>', { id: 'community-page-player' } ),
            $playlistWrapper = $( '<div>', { class: 'community-page-module' } ),
            $playlist = $( '<div>', { id: 'community-page-player-list' } );

        $( '<div>', { class: 'CommunityPageMainContent CommunityPageFandomU' } ).append(
            $header,
            $playerWrapper.append( $player ),
            $( '<div>', { class: 'community-page-rail' } ).append(
                $playlistWrapper.append( $playlist )
            )
        ).prependTo( '.CommunityPageContainer' );

        // Feel free to replace this monstrosity
        function resize() {
            $playlist.css( 'max-height', $player.height() );
            var headerPaddingLeft = parseInt( $playerWrapper.css( 'margin-left' ) );
            $header.css( {
                'padding-left': headerPaddingLeft,
                'padding-right': $header.outerWidth() - ( $playlistWrapper[0].offsetLeft - $player[0].offsetLeft + $playlistWrapper.width() ) - headerPaddingLeft
            } );
        }
        $( window ).on( 'resize', resize );

        $.getScript( '//content.jwplatform.com/libraries/' + config.player + '.js' ).then( function() {
            jwplayer( 'community-page-player' ).setup( {
                autostart: false,
                playlist: '//cdn.jwplayer.com/v2/playlists/' + config.langs[lang].playlist,
                pid: config.player,
                width: '100%'
            } ).on( 'ready', function() {
                $player = $( '#community-page-player' ); // using $player from before, causes $player.height() to return 0 (?)
                var player = this;

                player.getPlaylist().forEach( function( e ) {
                    $( '<img>', {
                        class: 'community-page-player-list-item',
                        src: e.image,
                        width: 'calc( 100% - 3px )'
                    } ).click( function() {
                        player.playlistItem( $( this ).index() );
                    } ).appendTo( $playlist );
                } );

                track( {
                    action: tracker.ACTIONS.FLOW_START,
                    label: 'jwplayer-ready'
                } );

                resize();
            } ).on( 'viewable', function() {
                resize();
            } ).on( 'playlistItem', function( e ) {
                $playlist.children( '.active' ).removeClass( 'active' );
                $playlist.children().eq( e.index ).addClass( 'active' );
                track( {
                    action: tracker.ACTIONS.SELECT,
                    label: 'playlistitem',
                    value: e.index
                } );
            } ).on( 'firstFrame', function() {
                track( {
                    action: tracker.ACTIONS.PLAY_VIDEO,
                    label: 'play',
                    value: this.getPlaylistIndex()
                } );
            } ).on( 'complete', function() {
                track( {
                    action: tracker.ACTIONS.PLAY_VIDEO,
                    label: 'complete',
                    value: this.getPlaylistIndex()
                } );
            } );
        } );
    }

    if ( mw.config.get( 'wgCanonicalSpecialPageName' ) === 'Community') {
        videoPlaylistModule();
    }
} );