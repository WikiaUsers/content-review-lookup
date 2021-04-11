// Add `city_id` to wiki pages with both plain text and links
mw.hook( 'wikipage.content' ).add( function( content ) {
	'use strict';
 
	var elements = content[0].querySelectorAll( 'span.city_id:not(.loaded)' );
 	var city_id = mw.config.get( 'wgCityId' );
 
	if ( !elements ) {
	    return;
	}
 
	Array.from( elements ).forEach( function( span ) {
		var data = span.dataset;
 
		if ( data.link ) {
			var linkNode = document.createElement( 'a' );
			var $1 = /\$1/g;
 
			linkNode.setAttribute( 'href', data.link.replace( $1, city_id ) );
			linkNode.innerText = span.innerText.replace( $1, city_id );
			linkNode.classList.add( 'city_id_link' );
 
			span.innerHTML = '';
			span.appendChild( linkNode );
		} else {
			span.innerText = city_id;
		}
 
		span.classList.add( 'loaded' );
	} );
} );