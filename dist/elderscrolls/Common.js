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
	case 'Online':
                $( this ).addClass( 'online' );
		break;
	case 'Skyrim':
		$( this ).addClass( 'skyrim' );
		break;
	case 'Dragonborn':
		$( this ).addClass( 'dragonborn' );
		break;
	case 'Dawnguard':
                $( this ).addClass( 'dawnguard' );
                break;
	case 'Oblivion':
                $( this ).addClass( 'oblivion' );
                break;
	case 'Shivering Isles':
                $( this ).addClass( 'shiveringIsles' );
                break;
	case 'Morrowind':
		$( this ).addClass( 'morrowind' );
		break;
	case 'Redguard':
		$( this ).addClass( 'redguard' );
		break;
	case 'Battlespire':
		$( this ).addClass( 'battlespire' );
		break;
	case 'Daggerfall':
		$( this ).addClass( 'daggerfall' );
		break;
	case 'Bloodmoon':
		$( this ).addClass( 'bloodmoon' );
		break;
	case 'Tribunal':
                $( this ).addClass( 'tribunal' );
                break;
	default:
		return;
	}
    });
})( this.jQuery );