/* Any JavaScript here will be loaded for users using the mobile site */

mw.loader.using( 'mobile.site.styles' );

$( function () {

	// Uncollapsed first section
	mw.loader.using( [ 'mobile.startup', 'skins.minerva.scripts' ] ).then( function () {
		var skin   = mw.mobileFrontend.require( 'skins.minerva.scripts/skin' ),
			mobile = mw.mobileFrontend.require( 'mobile.startup' );
		skin.$container = skin.$el;
		new mobile.Toggler( skin ).reveal( 'div', $( '.collapsible-heading:first' ) );
	} );

	// Recent changes
	mw.loader.using( 'jquery.makeCollapsible' ).then( function () {
		$( '.mw-changeslist-line.mw-collapsible' ).makeCollapsible();
	} );

	// Slideshows
	slideshows.init( $( '.mw-parser-output' ) );
	// TODO: Remove
	$( '.infobox-slideshow' ).each( function () {
		var $slideshow = $( this );
		var $slides    = $slideshow.children();
		if ( $slides.length < 2 ) {
			$slideshow.removeClass( 'infobox-slideshow' );
			$slides.children().unwrap();
			return;
		}

		var maxHeight = 0;
		var maxWidth  = 0;
		$slides.each( function () {
			var $this = $( this );
			maxHeight = Math.max( maxHeight, $this.height() );
			maxWidth  = Math.max( maxWidth , $this.width () );
		} );
		$slideshow
			.height( maxHeight )
			.width ( maxWidth  );

		nextSlide( $slideshow );
		setInterval( function () { nextSlide( $slideshow ); }, 2500 );
	} );

	function nextSlide( $slideshow ) {
		$slideshow.append( $slideshow.children( ':first' ) );
	}

	// Collapsible infoboxes
	$( 'div.infobox' )
		.addClass( 'infobox-collapsed' )
		.each( function () {
			var $infobox = $( this );
			$infobox.find( '.infobox-title' ).on( 'click', function () {
				$infobox.toggleClass( 'infobox-collapsed' );
			} );
		} );

	// Collapsible infoboxes TEST
	$( '.infobox2' )
		.addClass( 'infobox2-collapsed' )
		.each( function () {
			var $infobox = $( this );
			$infobox.find( '.infobox2-title' ).on( 'click', function () {
				$infobox.toggleClass( 'infobox2-collapsed' );
			} );
		} );
} );

var slideshows = {
	init: function ( $container ) {
		$container
			.find( '.infobox2-slideshow:not( .infobox2-slideshow-enabled )' )
			.addClass( 'infobox2-slideshow-enabled' )
			.each( slideshows.initSlideshow );
	},

	initSlideshow: function () {
		var $slideshow = $( this ),
			$titleBar  = $( '<div class="infobox2-slideshow-titlebar">' );
		$slideshow
			.prepend( $titleBar )
			.children( '.infobox2-slide' )
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
			.on( 'click', function () {
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
			} )
			.last()
			.addClass( 'infobox2-slide-active' );
		$titleBar
			.children( ':last' )
			.addClass( 'infobox2-slide-title-active' );
	}
};