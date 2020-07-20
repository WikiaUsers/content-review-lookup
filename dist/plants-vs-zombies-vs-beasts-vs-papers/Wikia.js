$( function () {
	if ( !document.getElementById( 'ca-skins' ) ) {
		if ( skin === 'oasis' || skin === 'wikia' ) {
			$( '<li id="ca-skins"><a href="/index.php?title=' + encodeURIComponent( wgPageName ) + '&useskin=monobook">MB</a></li>' ).appendTo( '#AccountNavigation' ); $( '<li id="ca-skins"><a href="/index.php?title=' + encodeURIComponent( wgPageName ) + '&useskin=wikiamobile">WM</a></li>' ).appendTo( '#AccountNavigation' );
		} else {
			$( '<li id="ca-skins"><a href="/index.php?title=' + encodeURIComponent( wgPageName ) + '&useskin=wikia">Oasis</a></li>' ).appendTo( '#p-cactions > .pBody > ul' ); $( '<li id="ca-skins"><a href="/index.php?title=' + encodeURIComponent( wgPageName ) + '&useskin=wikiamobile">Mobile</a></li>' ).appendTo( '#p-cactions > .pBody > ul' );
		} 
	}
} );