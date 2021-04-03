// Warning! Global gadget file!
mw.loader.using(['mediawiki.util', 'mediawiki.api', 'mediawiki.notify']).then( function () {
var $target;

function showTime( $target ) {
	var now = new Date();
	var hh = now.getUTCHours();
	var mm = now.getUTCMinutes();
	var ss = now.getUTCSeconds();
	var time = ( hh < 10 ? '0' + hh : hh ) + ':' + ( mm < 10 ? '0' + mm : mm ) + ':' + ( ss < 10 ? '0' + ss : ss );
	$target.text( time );

	var ms = now.getUTCMilliseconds();

	setTimeout( function () {
		showTime( $target );
	}, 1100 - ms );
}

function liveClock() {
	mw.util.addCSS( '#utcdate a { font-weight:bolder; font-size:120%; }' );

	if ( !window.UTCLiveClockConfig ) {
		UTCLiveClockConfig = {};
	}
	var portletId = UTCLiveClockConfig.portletId || 'p-personal';
	var nextNode = UTCLiveClockConfig.nextNodeId ? document.getElementById( UTCLiveClockConfig.nextNodeId ) : undefined;
	var node = mw.util.addPortletLink(
		portletId,
		mw.util.getUrl( null, { action: 'purge' } ),
		'',
		'utcdate',
		null,
		null,
		nextNode
	);
	if ( !node ) {
		return;
	}
	$( node ).on( 'click', function ( e ) {
		new mw.Api().post( { action: 'purge', titles: mw.config.get( 'wgPageName' ) } ).then( function () {
			location.reload();
		}, function () {
			mw.notify( 'Purge failed', { type: 'error' } );
		} );
		e.preventDefault();
	} );

	showTime( $( node ).find( 'a:first' ) );
}

$( liveClock );
} );