"use strict";

var i18n = {
    playTitle : "Нажмите, чтобы проиграть",
    pauseTitle : "Нажмите, чтобы приостановить",
    stopTitle : "Нажмите, чтобы остановить"
};

/* Fired whenever wiki content is added. (#mw-content-text, live preview, load page, etc.) */
mw.hook( "wikipage.content" ).add( function( $wikipageContent ) {
    var $players = $wikipageContent.find( ".audio-player-mobile" );
    $players.click( function() {
        var audio = $( this ).find( "audio" )[0];
        if (audio) { // Audio exists?
            // Toggle play state
            if (audio.paused) {
                audio.play();
            } else {
                audio.pause();
            }
        }
    });

    var $audios = $players.find( "audio" );
    $audios.on( "play", function () {
        var $player = $( this ).closest(".audio-player-mobile");
        // Before playing, stop any other audio players
        var $otherAudios = $audios.not( this );
        $otherAudios.trigger( "pause" );
        $otherAudios.closest( ".audio-player-mobile" ).attr( "title", i18n.playTitle );

        $player.toggleClass( "playing" , true ).attr( "title", $player.hasClass("pausable") ? i18n.pauseTitle : i18n.stopTitle );
    });

    $audios.on( "pause", function () {
        var $player = $( this ).closest(".audio-player-mobile");
        $player.toggleClass( "playing" , false );
        
        if (!$player.hasClass("pausable"))
            this.currentTime = 0;
    });
});