/*Imports - Full credits on imported pages*/

/* https://dev.wikia.com/wiki/RevealAnonIP This must be placed above all imports. */
window.RevealAnonIP = {
    permissions : ['user']
};
 
importArticles({
    type: "script",
    articles: [
        "MediaWiki:Common.js/PersistentHeaders.js", /* Scrolling table headers*/
        "u:dev:MediaWiki:RevealAnonIP/code.js",
        "MediaWiki:Common.js/collapse.js" /*Collapsibles*/
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

/* Portable Infobox subtheme overrides */
(function( $ ) {
	"use strict";
	var title_text;
	$( '.pi-theme-book .pi-header' ).each( function() {	
		title_text = $( this ).text();
		switch( title_text ) {
	case '1929':
                $( this ).addClass( '1929' );
		break;
	case '1932':
		$( this ).addClass( '1932' );
		break;
	case '1983':
		$( this ).addClass( '1983' );
		break;
	case 'TWIY':
                $( this ).addClass( 'twiy' );
                break;
	case 'MPR':
                $( this ).addClass( 'mpr' );
                break;
	case 'P2':
                $( this ).addClass( 'p2' );
                break;
	default:
		return;
	}
    });
})( this.jQuery );