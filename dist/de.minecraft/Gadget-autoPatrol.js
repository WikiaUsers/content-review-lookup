$( function() {
	if ( $( '.patrollink a' ).length )
	{
		var element = $( '.patrollink a' )[0];
		var href = $( element ).attr( 'href' );
		var rcid = mw.util.getParamValue( 'rcid', href );
		var apiRequest = new mw.Api();
		apiRequest.postWithToken(
			'patrol',
			{
				formatversion: 2,
				action: 'patrol',
				rcid: rcid
			}
		).done( function( data ) {
			$( '.patrollink' ).remove();
			if ( data.patrol !== undefined ) {
				var title = new mw.Title( data.patrol.title );
				mw.notify(
					mw.msg(
						'markedaspatrollednotify',
						title.toText()
					)
				);
			} else {
				mw.notify(
					mw.msg('markedaspatrollederrornotify'),
					{
						type: 'error'
					}
				);
			}
		} ).fail( function( error ) {
			if ( error === 'noautopatrol' ) { 
				mw.notify(
					mw.msg('markedaspatrollederror-noautopatrol'),
					{
						type: 'warn'
					}
				);
			} else {
				mw.notify(
					mw.msg('markedaspatrollederrornotify'),
					{
						type: 'error'
					}
				);
				console.log( error );
			}
		} );
	}
} );