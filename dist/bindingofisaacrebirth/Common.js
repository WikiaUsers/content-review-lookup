/* Any JavaScript here will be loaded for all users on every page load. */

$.when( mw.loader.using( 'mediawiki.api' ), $.ready ).then( function () {

	// Cache purge shortcut
	$( '#ca-cargo-purge' )
		.remove()
		.appendTo( '#p-views > ul' )
		.children()
		.wrap( '<span>' )
		.text( '⟳' )
		.attr( {
			title    : 'Purge the cache [alt-shift-g]',
			accesskey: 'g'
		} )
		.css( {
			'line-height': 0,
			'font-size'  : 'large'
		} );

	// Link titles
	$( '.notitle a' ).removeAttr( 'title' );

	// Slideshows
	loadSlideshows( $( '.mw-parser-output' ), 2500 );
	slideshows.init( $( '.mw-parser-output' ) );

	// Collection pages
	$( 'div.collection' ).on( 'scroll', function () {
		$( 'div.collection' ).scrollLeft( $( this ).scrollLeft() );
	} );
} );

// TODO: Remove
/**
 * @param {JQuery} $container 
 * @param {number} timeout 
 */
function loadSlideshows( $container, timeout ) {
	$container.find( '.infobox-slideshow' ).each( function () {
		var $slideshow = $( this ),
			$slides    = $slideshow.children();
		if ( $slides.length < 2 ) {
			$slideshow.removeClass( 'infobox-slideshow' );
			$slides.children().unwrap();
			return;
		}

		(function interval() {
			setTimeout( interval, timeout );
			$slideshow.append( $slideshow.children( ':first' ) );
		})();
	} );
}

var dlcUtil = {
	/**
	 * The currently selected DLC filter.
	 */
	selectedFilter: 0,

	/**
	 * Gets the DLC filter of a DLC icon.
	 * @param {HTMLElement} img The DLC icon.
	 * @returns The DLC filter of the given DLC icon, 0 otherwise.
	 */
	getDlcFilter: function ( img ) {
		var classList = img.classList;
		for ( var i = 0; i < classList.length; ++i ) {
			if ( classList[ i ].startsWith( 'dlc-' ) ) {
				return +classList[ i ].substr( 4 );
			}
		}
		return 0;
	},

	/**
	 * @param {JQuery} $elem 
	 */
	update: function ( $elem ) {}
};

var slideshows = {
	/**
	 * @param {JQuery} $container 
	 */
	init: function ( $container ) {
		$container
			.find( '.infobox2-slideshow:not( .infobox2-slideshow-enabled, .infobox2-slideshow-disabled )' )
			.each( slideshows.initSlideshow );
	},

	/**
	 * @this HTMLElement
	 */
	initSlideshow: function () {
		var $slideshow = $( this ),
			$slides    = $slideshow.children( '.infobox2-slide' );
		if ( $slides.length < 2 ) {
			$slideshow.addClass( 'infobox2-slideshow-disabled' );
			$slides.children( '.infobox2-slide-title:first-of-type' ).remove();
			return;
		}
		$slideshow.addClass( 'infobox2-slideshow-enabled' );
		var $titleBar  = $( '<div class="infobox2-slideshow-titlebar">' );
		function cycle() {
			var $nextTitle = $titleBar
				.children( '.infobox2-slide-title-active' )
				.removeClass( 'infobox2-slide-title-active' )
				.next();
			( $nextTitle.length
				? $nextTitle
				: $titleBar.children( '.infobox2-slide-title:first' )
			).addClass( 'infobox2-slide-title-active' );
			var $nextSlide = $slideshow
				.children( '.infobox2-slide-active' )
				.removeClass( 'infobox2-slide-active' )
				.next();
			( $nextSlide.length
				? $nextSlide
				: $slideshow.children( '.infobox2-slide:first' )
			).addClass( 'infobox2-slide-active' );
		}
		$slideshow.prepend( $titleBar );
		$slides
			.each( function () {
				var $slide = $( this ),
					$title = $slide.children( '.infobox2-slide-title:first' );
				$title
					.remove()
					.appendTo( $titleBar )
					.on( 'click', function () {
						$titleBar
							.children( '.infobox2-slide-title-active' )
							.removeClass( 'infobox2-slide-title-active' );
						$slideshow
							.children( '.infobox2-slide-active' )
							.removeClass( 'infobox2-slide-active' );
						$title.addClass( 'infobox2-slide-title-active' );
						$slide.addClass( 'infobox2-slide-active' );
					} );
			} )
			.last()
			.addClass( 'infobox2-slide-active' );
		$titleBar
			.children( ':last' )
			.addClass( 'infobox2-slide-title-active' );
		if ( !$slideshow.hasClass( 'infobox2-slideshow-hidden' ) ) {
			$slides.on( 'click', cycle );
		}
		if ( $slideshow.hasClass( 'infobox2-slideshow-auto' ) ) {
			(function interval() {
				setTimeout( interval, 1500 );
				cycle();
			})();
		}
	}
};