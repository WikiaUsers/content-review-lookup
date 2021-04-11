// Get Astronomy Picture of the Day from NASA Api by Rail01
require( ['jquery', 'mw', 'wikia.window'], function( $, mw, window ) {
	// Double-run prevention
	if ( window.ShowNasaPicture ) return;
	window.ShowNasaPicture = true;

	// Hook to find appropriate element in wiki content
	mw.hook( 'wikipage.content' ).add( function( $content ) {
		$content.find( '.apod-nasa' ).each( function() {
			// Meta variables
			var $this = $( this ), width, height,
			data = {
				width: $this.data( 'width' ),
				height: $this.data( 'height' ),
				date: $this.data( 'date' )
			};

			// Handle width and height
			if ( data.width && data.height ) {
				width = data.width;
				height = data.height;
			} else if ( data.width ) {
				width = data.width;
				height = null;
			} else if ( data.height ) {
				height = data.height;
				width = null;
			} else {
				width = '275px';
				height = null;
			}

			// Allow requesting archived images
			var request = { api_key: 'DEMO_KEY' };
			if ( data.date ) request.date = data.date;

			// Load CSS
			importArticle( {
				type: 'style',
				article: 'MediaWiki:APOD-NASA.css'
			} );

			// Get image from API
			$.getJSON( 'https://api.nasa.gov/planetary/apod', request, function( _d ) {
				// Handle errors
				if ( _d.code ) {
					$this.empty().append(
						$( '<span>', { class: '_apod-error' } ).append(
							$( '<strong>', {
								class: '_apod-error_info',
								text: 'An error occurred! '
							} ),
							$( '<span>', {
								class: '_apod-error_details',
								text: 'Error code $1; Explanation: $2'
									.replace( '$1', _d.code )
									.replace( '$2', _d.msg )
							} )
						)
					);
					console.error( 'APOD-NASA request error!' );
					return;
				}

				// Proper title attribute depending on data
				var title = _d.title;
				if ( _d.copyright ) {
					title += ' by "' + _d.copyright + '" | ' + _d.date;
				} else {
					title += ' | ' + _d.date;
				}

				// Add width and height
				$this.css( {
					width: width,
					height: height
				} );

				// Replace element with image
				$this.empty().append(
					$( '<div>', { class: 'apod-nasa_wrapper' } ).append(
						$( '<a>', {
							href: _d.url,
							target: '_blank',
							title: title,
							class: 'apod-nasa_img-container'
						} ).append(
							$( '<img>', {
								src: _d.url,
								width: width,
								height: height,
								class: '_apod-img',
								id: '_apod-' + _d.date
							} )
						),
						$( '<div>', { class: '_apod-credits' } ).append(
							$( '<span>', {
								html: 'Powred by <a href="' + mw.util.getUrl( 'MediaWiki:APOD-NASA.js' ) + '">APOD-NASA.js</a> and <a hrfe="' + mw.util.getUrl( 'Module:APOD-NASA' ) + '">APOD-NASA Lua module</a>. By <a href="' + mw.util.getUrl( 'User:Rail01' ) + '">Rail01</a>',
								class: '_apod-credits_info'
							} )
						)
					)
				);
			} );
		} );
	} );
} );