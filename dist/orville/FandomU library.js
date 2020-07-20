/*
v2.2 - by Luqgreg
*/
 
require( [
    'wikia.window',
    'jquery',
    'mw'
], function ( window, $, mw ) {
    var config = {
        header: 'New to editing and contributing? We have an <a href="https://community.fandom.com/wiki/Fandom_University" title="Fandom University">extensive video library</a> to help you learn how to edit.',
        player: 'VXc5h4Tf',
        playlist: 'g0INIi6n'
    };
 
    function videoPlaylistModule() {
        if ( $( '#community-page-player' ).length ) {
            return;
        }
 
        $header = $( '<div>', { class: 'community-page-cards-module-header' } ).html( config.header );
        $playerWrapper = $( '<div>', { class: 'community-page-todo-list-module' } );
        $player = $( '<div>', { id: 'community-page-player' } );
        $playlistWrapper = $( '<div>', { class: 'community-page-module' } );
        $playlist = $( '<div>', { id: 'community-page-player-list' } );
 
        mw.util.addCSS(
            '.CommunityPageContainer { flex-wrap: wrap }\
            .CommunityPageFandomU { display: flex; flex-wrap: wrap; width: 100% }\
            .CommunityPageFandomU .community-page-cards-module-header { width: 100% }\
            .CommunityPageFandomU .community-page-todo-list-module { flex: 1 }\
            .CommunityPageFandomU .community-page-rail { background-color: inherit; padding-top: 0 }\
            #community-page-player-list { overflow-y: scroll }\
            .community-page-player-list-item { cursor: pointer; overflow: scroll; opacity: .9; transition: .2s }\
            .community-page-player-list-item:hover { opacity: 1 }\
            .community-page-player-list-item.active { border-left: 3px solid yellow; opacity: 1 }'
        );
 
        $( '.CommunityPageContainer' ).prepend(
            $( '<div>', { class: 'CommunityPageMainContent CommunityPageFandomU' } ).append(
                $header,
                $playerWrapper.append( $player ),
                $( '<div>', { class: 'community-page-rail' } ).append(
                    $playlistWrapper.append( $playlist )
                )
            )
        );
 
        function resize() {
            $playlist.css( 'max-height', $player.height() );
            var headerPaddingLeft = parseInt( $playerWrapper.css( 'margin-left' ) );
            $header.css( {
                'padding-left': headerPaddingLeft,
                'padding-right': $header.outerWidth() - ( $playlistWrapper[0].offsetLeft - $player[0].offsetLeft + $playlistWrapper.width() ) - headerPaddingLeft
            } );
        }
        $( window ).on( 'resize', resize );
 
        $.getScript( 'https://content.jwplatform.com/libraries/' + config.player + '.js' ).then( function() {
            jwplayer( 'community-page-player' ).setup( {
                autostart: false,
                playlist: 'https://cdn.jwplayer.com/v2/playlists/' + config.playlist,
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
                        player.playlistItem( $( this ).index() )
                    } ).appendTo( $playlist );
                } );
 
                resize();
            } ).on( 'playlistItem', function( e ) {
                $playlist.children( '.active' ).removeClass( 'active' );
                $playlist.children().eq( e.index ).addClass( 'active' );
            } );
        } );
    }
 
    if ( document.location.href.indexOf( 'Special:Community' ) > -1 ) {
        videoPlaylistModule();
    }
} );