// ==============================
// Background randomiser
// ==============================
 
function randomBack () {
    var opts = [
		'http://images.wikia.com/terranova/pt-br/images/archive/d/dc/20130103222822%21Terra_Nova_Background.png',
		'http://images.wikia.com/terranova/pt-br/images/8/81/Wordpress-background-Terra-Nova.jpg',

		];
 
	if (wgPageName=='Main_Page') {
		$('body').css('background-image','url(' + opts[0] + ')');
		$('body').css('background-size','120%'); //for the DS3 background to look better
	}
	else
		$('body').css('background-image','url(' + opts[Math.floor((opts.length-1)*Math.random()+1)] + ')'); //remove +1 to include first element of the array
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
		$('<li id="backtotop" style="position: absolute; right:20px; top:0px; border:none;"><button type="button" value="Back To Top" onClick="goToTop();">Voltar ao Topo</button></li>').appendTo('#WikiaBarWrapper .toolbar > .tools');	
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

// =================
// Titulo em Rolagem
// =================
var txt=&quot;Terra Nova, um novo começo; var espera=100; var refresco=null; function rotulo_title() { document.title=txt; txt=txt.substring(1,txt.length)+txt.charAt(0); refresco=setTimeout(&quot;rotulo_title()&quot;,espera);} rotulo_title();