// Gadżet – Responsive Mobile
( function() {
	'use strict';

	// Stwórz element <meta>
	var meta = document.createElement( 'meta' );
	meta.name = 'viewport';
	meta.content = 'width=device-width, initial-scale=1';

	// Dodaj element do tagu <head> strony
	document.head.appendChild( meta );
} )();