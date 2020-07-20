/* Any JavaScript here will be loaded for all users on every page load. */
$( function () {
	if ( !document.getElementById( 'ca-skins' ) ) {
		if ( skin === 'oasis' || skin === 'wikia' ) {
			$('#my-tools-menu').prepend('<li id="ca-skins"><a href="/index.php?title=' + encodeURIComponent( wgPageName ) + '&useskin=monobook">Monobook</a></li>' ); $('#my-tools-menu').prepend('<li id="ca-skins"><a href="/index.php?title=' + encodeURIComponent( wgPageName ) + '&useskin=wikiamobile">Wikia Mobile</a></li>' ); $('#my-tools-menu').prepend( '<li id="ca-skins"><a href="/index.php?title=' + encodeURIComponent( wgPageName ) + '&useskin=monobook&printable=yes">Bản in</a></li>' );$('#my-tools-menu').prepend( '<li id="ca-skins"><a href="/index.php?title=' + encodeURIComponent( wgPageName ) + '&useskin=venus">Venus</a></li>' );
		} else {
			$( '<li id="ca-skins"><a href="/index.php?title=' + encodeURIComponent( wgPageName ) + '&useskin=wikia">Oasis</a></li>' ).appendTo( '#p-cactions > .pBody > ul' ); $( '<li id="ca-skins"><a href="/index.php?title=' + encodeURIComponent( wgPageName ) + '&useskin=wikiamobile">Mobile</a></li>' ).appendTo( '#p-cactions > .pBody > ul' );$( '<li id="ca-skins"><a href="/index.php?title=' + encodeURIComponent( wgPageName ) + '&useskin=venus">Venus</a></li>' ).appendTo( '#p-cactions > .pBody > ul' );
		} 
	}
} );
//