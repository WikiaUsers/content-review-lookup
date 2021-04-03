/* Any JavaScript here will be loaded for all users on every page load. */
/*Imports - Full credits on imported pages*/

/* https://dev.wikia.com/wiki/RevealAnonIP This must be placed above all imports. */
window.RevealAnonIP = {
    permissions : ['user']
};
 
importArticles({
    type: "script",
    articles: [
        "MediaWiki:Common.js/PersistentHeaders.js", /* Scrolling table headers ~Flightmare*/
        "u:dev:MediaWiki:RevealAnonIP/code.js",
        "MediaWiki:Common.js/collapse.js" /*Collapsibles ~HaLo2FrEeEk*/
    ]
});

/* Prevent ProfileTags from overwriting default tags (December 2020) */
(window.dev = window.dev || {}).profileTags = {
	noHideTags: true
};

/* Standard Edit Summary code */
window.dev = window.dev || {};
window.dev.editSummaries = {
    select: 'MediaWiki:Custom-Summaries'
};

/* Portable Infobox subtheme overrides by Kopcap94 */
(function( $ ) {
	"use strict";
	var title_text;
	$( '.pi-theme-book .pi-header' ).each( function() {	
		title_text = $( this ).text();
		switch( title_text ) {
	case 'Dungeon Siege':
                $( this ).addClass( 'ds' );
		break;
	case 'Legends of Aranna':
		$( this ).addClass( 'loa' );
		break;
	case 'Dungeon Siege II':
		$( this ).addClass( 'dsii' );
		break;
	case 'Broken World':
                $( this ).addClass( 'bw' );
                break;
	case 'Throne of Agony':
                $( this ).addClass( 'toa' );
                break;
	case 'Dungeon Siege III':
                $( this ).addClass( 'dsiii' );
                break;
	case 'Treasures of the Sun':
		$( this ).addClass( 'tots' );
		break;
	default:
		return;
	}
    });
})( this.jQuery );