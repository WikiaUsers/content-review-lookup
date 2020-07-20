// ==============================
// Background randomiser
// ==============================
 
function randomBack () {
    var opts = [
		'https://images.wikia.nocookie.net/empireearth/images/b/b3/EE2Aircraft.jpg',
		'https://images.wikia.nocookie.net/empireearth/images/f/fd/EE2FGuns.jpg',
	  'https://images.wikia.nocookie.net/empireearth/images/b/b5/EE2MedievalCrusade.jpg',
		'https://images.wikia.nocookie.net/empireearth/images/6/60/EE2Tank.jpg',
		'https://images.wikia.nocookie.net/empireearth/images/4/4c/EE3.jpg',
		'https://images.wikia.nocookie.net/empireearth/images/b/bf/EE3Earth.jpg',
		'https://images.wikia.nocookie.net/empireearth/images/8/86/EE3FvsP.jpg',
                'https://images.wikia.nocookie.net/empireearth/images/2/20/EE3Guys.jpg',
                'https://images.wikia.nocookie.net/empireearth/images/1/17/EE3War.jpg',
                'https://images.wikia.nocookie.net/empireearth/images/3/39/EEBuilding.jpg',
                'https://images.wikia.nocookie.net/empireearth/images/5/59/EEMan.jpg',
                'https://images.wikia.nocookie.net/empireearth/images/3/3d/EETimeline.jpg',
                'https://images.wikia.nocookie.net/empireearth/images/3/3f/Zulu.jpg',
                'https://images.wikia.nocookie.net/empireearth/images/4/40/Russian.jpg',
                ];
 

		$('body').css('background-image','url(' + opts[Math.floor((opts.length-1)*Math.random())] + ')'); //remove +1 to include first element of the array
}
 
randomBack();

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

//Automatically refreshes recent changes.
importScriptPage('AjaxRC/code.js', 'dev');

// Additional UserRights Icons in profile mastheads
importScript('MediaWiki:Wikia.js/userRightsIcons.js');
// END Additional UserRights Icons in profile mastheads

//Automatically refreshes recent changes.
importScriptPage('AjaxRC/code.js', 'dev');