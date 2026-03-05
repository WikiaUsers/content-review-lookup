/* All JavaScript here will be loaded for users of the Vector skin */

/*** Mobile navigation toggle button ***/
$( function () {
		var mobileSidebarButton = document.createElement( 'button' );
		mobileSidebarButton.className = 'mobile-nav-toggle';
		mobileSidebarButton.addEventListener( 'click', function () {
				mobileSidebarButton.classList.toggle( 'nav--expanded' );
		} );
        document.body.classList.add( 'has-vector-mobile-menu' );
		document.getElementById( 'mw-panel' ).prepend( mobileSidebarButton );
} );
/*** End mobile navigation toggle button ***/