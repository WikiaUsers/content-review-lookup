// Example configuration for MapsExtended - This applies to ALL maps
window.mapsExtendedConfig =
{
    sortMarkers: "unsorted",
    openPopupsOnHover: false,
    enableFullscreen: true,
    enableSidebar: true,
    sidebarOverlay: false,
    sidebarSide: "left",
    sidebarBehaviour: "autoInitial",
    sidebarInitialState: "show",
    fullscreenMode: "window",
    enableSearch: true,
    hiddenCategories: [ "examinable" ],
    disabledCategories: [],
    collectibleCategories: [ "poi", "container" ],
    categoryGroups:
    [
        {
            label: "General",
            children:
            [
                {
                    label: "Points of interest",
                    children: [ "poi", "exit", "examinable" ]
                }, 
                "trap"
            ]
        },
        {
            label: "Interactable",
            children: [ "npc", "container", "usable" ],
        }
    ]
};

// Example configuration for MapsExtended - This applies to specific maps
window.mapsExtendedConfigs = 
{
    "Castle": {
        collectibleCategories: [ "poi", "container", "enemies" ]
    },
    "Bridge": {
        collectibleCategories: [ "container" ],
        hiddenCategories: [ "poi" ]
    }
}

//Discord
window.DiscordBannerSettings = {
    bannerStyle: '4',
    inviteLink: 'CnREzhvGyw',
    prependToRail: true
};


// Миниатюрный проигрыватель
'use strict';

mw.hook( 'wikipage.content' ).add( function( $content ) {
	var i18n = {
		playTitle: 'Щёлкните, чтобы воспроизвести',
		stopTitle: 'Щёлкните, чтобы остановить',
	};
	$content.find('.sound' ).prop( 'title', i18n.playTitle ).on( 'click', function( e ) {
		// Ignore links
		if ( e.target.tagName === 'A' ) {
			return;
		}
		
		var audio = $( this ).find( '.sound-audio audio' )[0];
		if ( audio ) {
			audio.paused ? audio.play() : audio.pause();
		}
	} ).find( '.sound-audio audio' ).on( 'play', function() {
		// Stop any already playing sounds
		var playing = $( '.sound-playing .sound-audio audio' )[0];
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