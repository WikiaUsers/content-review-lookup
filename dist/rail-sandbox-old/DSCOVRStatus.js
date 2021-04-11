/**
 * Fetch latest Earth picture from DSCOVR satellite API
 * @author Rail01
 * @status Beta
 */
require( ['jquery', 'mw', 'wikia.window'], function( $, mw, window ) {
	if (
		mw.config.get( 'wgCanonicalSpecialPageName' ) !== 'Blankpage' ||
		$.getUrlVar( 'blankspecial' ) !== 'dscovrstatus' ||
		window.GetDSCOVRStatusLoaded
	) return;
	window.GetDSCOVRStatusLoaded = true;

	$( 'title' ).text( 'DSCOVR Status | ' + mw.config.get( 'wgSiteName' ) );
	$( '.page-header__title' ).text( 'DSCOVR Status' );
	$( '#mw-content-text' ).empty().append(
		$( '<p>', { class: 'dscovrstatus-intro' } ).html(
			'This page uses <a href="https://epic.gsfc.nasa.gov/about/api" title="DSCOVR API" target="_blank">JavaScript</a> to display current picture of Earth taken by <a href="https://epic.gsfc.nasa.gov/" title="Deep Space Climate Observatory" target="_blank">DSCOVR</a> spacecraft.'
		),
		$( '<p>', {
			class: 'error',
			text: 'Warning! DSCOVR is currently in safe mode and no new pictures are available.'
		} ),
		$( '<hr>' ),
		$( '<div>', { class: 'dscovrstatus-data' } ).append(
			$( '<p>', {
				class: 'dscovrstatus-loading',
				text: 'Loading...'
			} )
		)
	);

	$.getJSON( 'https://epic.gsfc.nasa.gov/api/natural', function( _d ) {
		var data = {
			date: _d[0].date.slice( 0, 10 ).replace( /-/g, '/' ),
			image: _d[0].image + '.jpg',
			response: _d[0]
		};
		var image_url = 'https://epic.gsfc.nasa.gov/archive/natural/' + data.date + '/jpg/' + data.image;
		$( '.dscovrstatus-data' ).empty().append(
			$( '<div>', { class: '_dscovr-image' } ).append(
				$( '<span>', {
					class: '_dscovr-image_caption',
					text: 'Earth as of ' + data.response.date
				} ).css( { 'display': 'flex' } ),
				$( '<a>', {
					href: image_url.replace( /jpg/g, 'png' ),
					title: data.response.caption,
					target: '_blank'
				} ).append(
					$( '<img>', {
						src: image_url,
						width: '575px',
						height: '575px',
						class: '_dscovr-image_img',
						id: 'image-' + data.response.identifier
					} )
				)
			)
		);
	} );
} );