/* <nowiki> */

/**
 * UTC Live Clock
 * Source: http://www.mediawiki.org/wiki/MediaWiki:Gadget-UTCLiveClock.js
 * Slightly altered:
 *    1) Positioning and style changed to work with our FCW skin
 *    2) Replaced addPortletLink with $().insertAfter()
 */

( function( $, undefined ) {

var $target;

function showTime( $target ) {
	var dateNode = UTCLiveClockConfig.node;
	if( !dateNode ) {
		return;
	}

	var now = new Date();
	var hh = now.getUTCHours();
	var mm = now.getUTCMinutes();
	var ss = now.getUTCSeconds();
	if ( $target === undefined ) {
		$target = $( dateNode ).find( 'a:first' );
	}
	var time = ( hh < 10 ? '0' + hh : hh ) + ':' + ( mm < 10 ? '0' + mm : mm ) + ':' + ( ss < 10 ? '0' + ss : ss );
	$target.text( time );

	setTimeout( function(){
		showTime( $target );	
	}, 1000 );
}

function liveClock() {
	mw.util.addCSS('#utcdate { bottom: 1px; left: -122px; position: absolute; text-align: center; width: 123px; }');
	mw.util.addCSS('#utcdate a { color: #FFF; font-size: 0.8em; }');
	
	if ( window.UTCLiveClockConfig === undefined ) {
		window.UTCLiveClockConfig = {};
	}

	UTCLiveClockConfig.node = $('<div id="utcdate"><a href="' + mw.config.get('wgScript') + '?title=' + mw.util.wikiUrlencode(mw.config.get('wgPageName')) + '&action=purge' + '"></a></div>').insertAfter('#p-personal');

	if( !UTCLiveClockConfig.node ) {
		return;
	}

	showTime();
}
$( document ).ready( liveClock );

} )( jQuery );

/* </nowiki> */