/* Any JavaScript here will be loaded for all users on every page load. */
/* https://dev.wikia.com/wiki/RevealAnonIP This must be placed above all imports. */
window.RevealAnonIP = {
    permissions : ['user']
};
 
importArticles({
    type: "script",
    articles: [
        "MediaWiki:Common.js/PersistentHeaders.js", /* Scrolling table headers ~Flightmare*/
        "u:dev:MediaWiki:RevealAnonIP/code.js",
        "MediaWiki:Common.js/collapse.js", /*Collapsibles ~HaLo2FrEeEk*/
        "MediaWiki:Common.js/DiscussionsProfile.js" /* If user's posts are all deleted */
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
	case 'Invasion':
		$( this ).addClass( 'invasion' );
		break;
	case 'Underworld':
		$( this ).addClass( 'underworld' );
		break;
	case 'Akavir':
		$( this ).addClass( 'akavir' );
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
	case 'Dominion':
        $( this ).addClass( 'dominion' );
        break;
	case 'Moonstrider':
		$( this ).addClass( 'moonstrider' );
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

/* UploadMultipleFiles Dev Wiki JS import: don't require licensing to upload */
mw.config.set('UMFBypassLicenseCheck', true);

/*Discord module below recent activity module*/
$(function() {
    mw.hook('Discord.widget.rail').add(function(railModule) {
        document.querySelector('.sticky-modules-wrapper .activity-module, .right-rail-wrapper .WikiaLatestEarnedBadgesModule').insertAdjacentElement("afterend", railModule);
    });
});

/* importing some useful js */
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:TopEditors/code.js',
        'u:dev:MediaWiki:MassNullEdit/code.js',
    ]
});