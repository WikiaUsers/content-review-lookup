// jshint jquery:true, esversion:5
/* globals require, module, mediaWiki, mw, OO */
'use strict';

mw.hook( 'wikipage.content' ).add( function( $content ) {
	var i18n = {
		playTitle: "Нажмите для проигрывания",
		stopTitle: "Нажмите для остановки",
	};
	$content.find('.sound' ).prop( 'title', i18n.playTitle ).on( 'click', function( e ) {
		// Игнорирование ссылок
		if ( e.target.tagName === 'A' ) {
			return;
		}
		
		var audio = $( this ).find( '.sound-audio' )[0];
		if ( audio ) {
			audio.paused ? audio.play() : audio.pause();
		}
	} ).find( '.sound-audio' ).on( 'play', function() {
		// Остановка любых уже играющих звуков
		var playing = $( '.sound-playing .sound-audio' )[0];
		playing && playing.pause();
		
		$( this ).closest( '.sound' )
			.addClass( 'sound-playing' ).prop( 'title', i18n.stopTitle );
	} ).on( 'pause', function() {
		// Сброс обратно к началу трека
		this.currentTime = 0;
		
		$( this ).closest( '.sound' )
			.removeClass( 'sound-playing' ).prop( 'title', i18n.playTitle );
	} );

} );