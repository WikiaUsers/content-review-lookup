/* Размещённый здесь код JavaScript будет загружаться пользователям при обращении к каждой странице */

mw.loader.implement("ext.popups@1wum5",function($,jQuery,require,module){mw.requestIdleCallback(function(){var isTouchDevice='ontouchstart'in document.documentElement;if(!isTouchDevice){mw.loader.using('ext.popups.main');}});});

$(document).ready(function () {

  $(document).on('click', '.spoiler-text', function() {
    $(this).removeClass('on');
  });
});

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