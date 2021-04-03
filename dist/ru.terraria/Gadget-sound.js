// Ported from https://minecraft.gamepedia.com/MediaWiki:Gadget-sound.js.

// jshint jquery:true, esversion:5
/* globals require, module, mediaWiki, mw, OO */
'use strict';

mw.hook( 'wikipage.content' ).add( function( $content ) {
	
	var l10n = (function(){
		var $text = {
			'playTitle': {
				'en': 'Click to play',
				'de': 'Zum Abspielen anklicken',
				'fr': 'Cliquer pour jouer',
				'ru': 'Щёлкните, чтобы воспроизвести',
				'zh': '点击播放',
				'zh-cn': '点击播放'
			},
			'stopTitle': {
				'en': 'Click to stop',
				'de': 'Zum Beenden anklicken',
				'fr': 'Cliquer pour arrêter',
				'ru': 'Щёлкните, чтобы остановить',
				'zh': '点击停止',
				'zh-cn': '点击停止'
			}
		}
		var $lang = mw.config.get( 'wgUserLanguage' ) || 'en';
		return function(key){
			return $text[key] && ($text[key][$lang] || $text[key]['en']) || '';
		}
	})();	
	
	
	$content.find('.sound' ).prop( 'title', l10n('playTitle') ).on( 'click', function( e ) {
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
			.addClass( 'sound-playing' ).prop( 'title', l10n('stopTitle') );
	} ).on( 'pause', function() {
		// Reset back to the start
		this.currentTime = 0;
		
		$( this ).closest( '.sound' )
			.removeClass( 'sound-playing' ).prop( 'title', l10n('playTitle') );
	} );

} );