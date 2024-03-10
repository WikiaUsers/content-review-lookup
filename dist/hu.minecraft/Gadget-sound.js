// jshint jquery:true, esversion:5
/* globals require, module, mediaWiki, mw, OO */
'use strict';

mw.hook( 'wikipage.content' ).add( function( $content ) {
	var i18n = {
		playTitle: 'Kattints a lejátszáshoz!',
		stopTitle: 'Kattitnts a megállításhoz!',
	};
	$content.find('.sound' ).prop( 'title', i18n.playTitle ).on( 'click', function( e ) {
		// Ignore links
		if ( e.target.tagName === 'A' ) {
			return;
		}
		
		var audio = $( this ).find( '.sound-audio' )[0];
		if ( audio ) {
			audio.paused ? audio.play() : audio.pause();
		}
	} ).find( '.sound-audio' ).on( 'play', function() {
		// Stop any already playing sounds
		var playing = $( '.sound-playing .sound-audio' )[0];
		playing && playing.pause();
		
		$( this ).closest( '.sound' )
			.addClass( 'sound-playing' ).prop( 'title', i18n.stopTitle );
	} ).on( 'pause', function() {
		// Reset back to the start
		this.currentTime = 0;
		
		$( this ).closest( '.sound' )
			.removeClass( 'sound-playing' ).prop( 'title', i18n.playTitle );
	} );

} );