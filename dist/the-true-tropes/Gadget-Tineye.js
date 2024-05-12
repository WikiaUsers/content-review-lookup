/*global mw, $*/
/*jshint curly:false */

$( document ).ready( function() {
	if ( mw.config.get( 'wgNamespaceNumber' ) !== 6 || mw.config.get( 'wgAction' ) !== "view" || !document.getElementById( 'file' ) ) {
		return false;
	}

	var $link = $( '.fullImageLink a[class!="mw-thumbnail-link"]' ),
		$image = $link.find( 'img' ),
		imageurl = $link.attr( 'href' );

	// No preview image, e.g. for large PNGs or video
	if ( imageurl === undefined || $image.length < 1 ) {
		return false;
	}

	imageurl = $image.attr('src');

	mw.util.addPortletLink( 'p-cactions', 'https://tineye.com/search?url=' + encodeURIComponent( imageurl ) + '&sort=size&order=desc', 'TinEye', 'ca-tineye', null );
} );