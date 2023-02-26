// ================================================================
// JavaScript here will be loaded only for users on the Oasis theme
// ================================================================


// ==============================
// BackToTopButton
// ==============================
 
//A script that adds a "Back To Top" option in the footer of the Oasis theme.
//I don't like scrolling back to top on long pages neither do you :)
//Created by Noemon from Dead Space Wiki
 
 
function hideFade () {
	// hide #backtotop first
	$( "#backtotop" ).hide ();
	// fade in #backtotop
	$( function () {
		$( window ).scroll( function () {
			if ( $( this ).scrollTop () > ButtonStart ) {
				$( '#backtotop' ).fadeIn ();
			} else {
				$( '#backtotop' ).fadeOut ();
			}
		});
	});
}

function goToTop (){
	// scroll body to 0px on click
	$( 'body,html' ).animate ({
		scrollTop: 0
	}, ScrollSpeed );
	return false;
}

function addBackToTop () {
	if( skin == 'oasis' ) {
		$('<li id="backtotop" style="position: absolute; right:20px; top:0px; border:none;"><button type="button" value="Back To Top" onClick="goToTop();">Back To Top</button></li>').appendTo('#WikiaBarWrapper .toolbar > .tools');	
		hideFade ();
	}	
}

var ButtonStart = 800;
var ScrollSpeed = 600;

if( !window.BackToTop  ) {
	$( document ).ready( function () { 
		addBackToTop (); 
	});
}
var BackToTop = true; // prevent duplication


// ==============================
// Snow!
// ==============================

//importScriptPage('MediaWiki:Snow.js', 'community');