// Title notifications -- credit to Rose (Incongruence)
// rewritten by Colouratura
 
( function ( mainRoom ) {
	var settings = new Map();
 
	settings.set( 'old_title', document.title );
	settings.set( 'unread_count', 0 );
	settings.set( 'ping_audio_url', 'https://images.wikia.nocookie.net/d97/images/6/66/Beep.ogg' );
 
	mainRoom.model.chats.bind( 'afteradd', function () {
		if ( !document.hasFocus() ) {
			new Audio( settings.get( 'ping_audio_url' ) ).play();
 
			settings.set( 'unread_count', settings.get( 'unread_count' ) + 1 );
 
			document.title = '(' + settings.get( 'unread_count' ) + ') ' + settings.get( 'old_title' );
		}
	} );
 
	window.onfocus = function () {
		document.title = settings.get( 'old_title' );
		settings.set( 'unread_count', 0 );
	};
}( mainRoom ) );