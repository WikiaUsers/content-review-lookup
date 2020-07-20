/* Warning! Global gadget file! */
function liveClock() {
	appendCSS( '#utcdate a { font-weight:bolder; font-size:120%; }' );

	if ( typeof( UTCLiveClockConfig ) == 'undefined' ) {
		UTCLiveClockConfig = {};
	}
	var portletId = UTCLiveClockConfig.portletId || 'p-personal';
	var nextNode = UTCLiveClockConfig.nextNodeId ? document.getElementById( UTCLiveClockConfig.nextNodeId ) : undefined;
	liveClock.node = addPortletLink(
		portletId,
		wgScript + '?title=' + encodeURIComponent( wgPageName ) + '&action=purge',
		'',
		'utcdate',
		undefined,
		undefined,
		nextNode
	);
	if( !liveClock.node ) {
		return;
	}

	showTime();
}
addOnloadHook( liveClock );

function showTime() {
	var dateNode = liveClock.node;
	if( !dateNode ) {
		return;
	}

	var now = new Date();
	var hh = now.getUTCHours();
	var mm = now.getUTCMinutes();
	var ss = now.getUTCSeconds();
	var time = ( hh < 10 ? '0' + hh : hh ) + ':' + ( mm < 10 ? '0' + mm : mm ) + ':' + ( ss < 10 ? '0' + ss : ss );
	dateNode.firstChild.replaceChild( document.createTextNode( time ), dateNode.firstChild.firstChild );

	window.setTimeout( showTime, 1000 );
}