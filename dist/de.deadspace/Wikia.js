// Basierend auf dem englischen Dead Space Wiki http://deadspace.wikia.com/wiki/MediaWiki:Wikia.js

// ================================================================
// JavaScript here will be loaded only for users on the Oasis theme
// ================================================================


// ==============================
// Background randomiser
// ==============================

/* function randomBack () {
    var opts = [
		'https://images.wikia.nocookie.net/deadspace/images/archive/f/fe/20120817172520!RandomBG.jpg',
		'https://images.wikia.nocookie.net/deadspace/images/f/fe/RandomBG.jpg',
		'https://images.wikia.nocookie.net/deadspace/images/archive/f/fe/20120530002036%21RandomBG.jpg',
		'https://images.wikia.nocookie.net/deadspace/images/archive/f/fe/20120520195733!RandomBG.jpg',
		'https://images.wikia.nocookie.net/deadspace/images/archive/f/fe/20120520195706!RandomBG.jpg',
		'https://images.wikia.nocookie.net/deadspace/images/archive/f/fe/20120520195640!RandomBG.jpg',
		'https://images.wikia.nocookie.net/deadspace/images/archive/f/fe/20120520195614!RandomBG.jpg',
		'https://images.wikia.nocookie.net/deadspace/images/archive/f/fe/20120520195530!RandomBG.jpg'
		];
	
	if (wgPageName=='Dead_Space_Wiki') {
		$('body').css('background-image','url(' + opts[0] + ')');
		$('body').css('background-size','120%'); //for the DS3 background to look better
	}
	else
		$('body').css('background-image','url(' + opts[Math.floor((opts.length-1)*Math.random()+1)] + ')'); //remove +1 to include first element of the array
}
 
randomBack();
*/

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