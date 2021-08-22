/*
-------------------------------------------------------
 Auto Animate, Play/Pause Animate and Toggle functions
-------------------------------------------------------
*/

//Auto Animated
$(function() {
		interval = setInterval( function() {
			$( '.animated-auto:not(.paused)' ).each( function() {
				var $elem = $(this);
				var $current = $elem.children( '.active' );
				var $next = $current.nextAll( ':first' );
				if ( !$next.length ) {
					$next = $elem.children( ':first' );
				}
				$current.removeClass( 'active' );
				$next.addClass( 'active' );
			} );
		}, 2000 );
		$('.animation-button').click(function() {
			$('.animated-auto').toggleClass('paused');
			$(this).toggleClass('paused');
		});
}() );

//Next/Prev Animated
$(function() {
		$('.animation-button-back').click(function() {
			$( '.animated' ).each( function() {
				var $elem = $(this);
				var $current = $elem.children( '.active' );
				var $back = $current.prev();
				if ( !$back.length ) {
					$back = $elem.children( ':last' );
				}
				$current.removeClass( 'active' );
				$back.addClass( 'active' );
			} );
		});
		$('.animation-button-next').click(function() {
			$( '.animated' ).each( function() {
				var $elem = $(this);
				var $current = $elem.children( '.active' );
				var $next = $current.nextAll( ':first' );
				if ( !$next.length ) {
					$next = $elem.children( ':first' );
				}
				$current.removeClass( 'active' );
				$next.addClass( 'active' );
			} );
		});
}() );
//Toggle Function
$(function() {
		$('.toggle-button').click(function() {
			$( '.toggle' ).each( function() {
				var $elem = $(this);
				var $current = $elem.children( '.active' );
				var $next = $current.nextAll( ':first' );
				if ( !$next.length ) {
					$next = $elem.children( ':first' );
				}
				$current.removeClass( 'active' );
				$next.addClass( 'active' );
			} );
		});
}() );
//Stop Images from being lazy
$(function() {
	$('.toggle img.lazyload, .animated img.lazyload, .animated-auto img.lazyload').attr('src', function(){
			return $(this).attr('data-src');
	}).removeClass('lazyload');
}() );