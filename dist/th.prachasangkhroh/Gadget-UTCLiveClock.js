/* Warning! Global gadget file! */
( function( $, undefined ) {


var $target;


function showTime( $target ) {
	var dateNode = UTCLiveClockConfig.node;
	if( !dateNode ) {
		return;
	}


	var now = new Date();
	var hh = now.getHours(); /*UTC vs local*/
	var mm = now.getMinutes();
	var ss = now.getSeconds();
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
	appendCSS( '#utcdate a { font-weight:bolder; font-size:120%; }' );


	if ( window.UTCLiveClockConfig === undefined ) {
		window.UTCLiveClockConfig = {};
	}
	var portletId = UTCLiveClockConfig.portletId || 'p-personal';
	var nextNode = UTCLiveClockConfig.nextNodeId ? document.getElementById( UTCLiveClockConfig.nextNodeId ) : undefined;
	UTCLiveClockConfig.node = addPortletLink(
		portletId,
		wgScript + '?title=' + encodeURIComponent( wgPageName ) + '&action=purge',
		'',
		'utcdate',
		undefined,
		undefined,
		nextNode
	);
	if( !UTCLiveClockConfig.node ) {
		return;
	}


	showTime();
}
$( document ).ready( liveClock );


} )( jQuery );