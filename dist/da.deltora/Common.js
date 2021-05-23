/***** Twitter feed on main page *****/
function twit(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src="//platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}
twit(document,"script","twitter-wjs");
$('<a class="twitter-timeline" href="https://twitter.com/AskBS01" data-widget-id="537044828773969920" width="520" height="450" data-theme="dark" data-link-color="#1A97AF">Tweets by @AskBS01</a>').appendTo('#twitter-timeline');
// twttr.widgets.load(); // force the thing to load because it doesn't want to otherwise
/*$('#twitter-widget-1').ready(function() {
$( 'iframe#twitter-widget-1' ).css( {'width': '100%'} ); //If width:100% !important is placed in Common.css, the widget loads without using its small CSS and the format breaks (the "tweet @AskBS01" box is cut off). This tricks it into loading the small version and then making it larger so the small CSS is used and everything is formatted correctly. jQuery doesn't understand !important, but it works if you just set the width to 100% without it. (Maybe it's not needed because the CSS is applied after everything else loads?)
});*/

/***** Spoilers *****/

$( document ).ready(function() {
  $( '.hidden-spoilers a' ).attr( 'disabled', 'disabled' ); /* disable links on page load */
});

$( '.spoilers' ).click(function() {
  $( this ).toggleClass( 'hidden-spoilers' );
  if ( $( this ).hasClass( 'hidden-spoilers' ) ) {
    $( this ).find( 'a' ).attr( 'disabled', 'disabled' ); /* disable links (attribute does it for IE, CSS does it for other browsers) */
  } else {
    $( this ).find( 'a' ).removeAttr( 'disabled' ); /* enable links */
  }
});


/***** Tabs for infoboxes.
There can be up to four main tabs, each of which can have up 4 subtabs. They are named like this:
1, 1b, 1c, 1d
2, 2b, 2c, 2d
3, 3b, 3c, 3d
4, 4b, 4c, 4d *****/

// in the beginning set the height of each infobox container to the height of its tallest infobox, hide all the infoboxes, show the start infobox
$( '.infobox-container' ).each( function() {
	var infoboxContainer = $( this );
	var startInfobox = infoboxContainer.children( '.infobox' + infoboxContainer.attr( 'data-start-infobox' ) )[0]; // get the start infobox (which is specified in the .infobox-container's "data-start-infobox" attribute)
	var maxHeight = 0; // can't do infoboxContainer.height(); as the starting value since currently the infoboxContainer has all the boxes visible, so it could be super tall!
	infoboxContainer.children( '.infobox' ).each( function() { // iterate through all the infoboxes
		if ( maxHeight < $( this ).outerHeight() ) { // if this infobox is taller than the container
		  maxHeight = $( this ).outerHeight();
		}
		$( this ).hide().css( 'height', '100%' ); // hide the infobox (if JS is disabled, we want everything to be visible, so we only hide stuff if JS is enabled), have it fill the container
	} );
	infoboxContainer.css( 'height', maxHeight ); // set the container's height to this infobox's height
	$( startInfobox ).show(); // show the start infobox
} );

// show the appropriate infobox when a tab is clicked
$( '.infobox-tab' ).click( function() {
	var infoboxContainer = $( this ).closest( '.infobox-container' ); // find the appropriate .infobox-container
	var infoboxToShow = infoboxContainer.children( '.infobox' + $( this ).attr( 'data-target' ) ); // get the infobox we want to show (which is specified in the tab's "data-target" attribute)
	infoboxContainer.children( '.infobox' ).hide().css( "height", "100%" ); // hide all the infoboxes
	$( infoboxToShow ).show(); // show the infobox we want to show
} );


/***** Dropdown code (for era dropdown but can be used for other dropdowns).
Fade code adapted from the Refreshed skin's implementation of fading dropdowns. *****/

function toggleFade( elementToFade ) {
	elementToFade.toggleClass( 'faded' );
}

$( document ).click( function( e ) {
	var button;
	$( '.fadable:not(.faded)' ).each( function () {
		// target all open fadable elements
		button = $( '#' + $( this ).attr( 'data-button' ) );
			if ( !$( e.target ).closest( $( this ) ).length && !$( e.target ).closest( $( button ) ).length ) {
			// if starting from the element clicked and moving up the DOM, we don't
			// run into that the current .fadable AND we don't run into the .fadable's
			// corresponding button...
			toggleFade( $( this ) );
		}
	} );
} );

$( '.fade-trigger' ).click( function( e ) {
	var target = $( '#' + $( this ).attr( 'data-target' ) );
	toggleFade( target );
} );

mw.loader.load( 'https://brickinsights.com/widgets/js' );