/* Imports */

importArticles({
    type: 'script',
    articles: [
        'MediaWiki:Wikia.js/Sidebar.js'
    ]
});

/* Animation Tchat */

var msg = $('.Chat .inline-alert').text();
if(msg.indexOf("Bienvenue") !== -1) {
$('.Chat').css('background', 'red');
}
 
/* Bouton pour revenir en haut */
 
function hideFade () {             
	$( "#backtotop" ).hide ();
	// fade in #backtotop
	$( function () {
		$( window ).scroll( function () {
			if ( $( this ).scrollTop () > ButtonStart ) {
				switch(FadeSwitch) {
					case 0:				
						$( '#backtotop' ).show ();
						break;
					default:
						$( '#backtotop' ).fadeIn ();
						break;
				}
			} else {
				switch(FadeSwitch) {
					case 0:				
						$( '#backtotop' ).hide ();
						break;
					default:
						$( '#backtotop' ).fadeOut ();
						break;
				}					
			}
		});
	});
}
 
function goToTop (){

	$( 'body,html' ).animate ({
		scrollTop: 0
	}, ScrollSpeed );
	return false;
}
 
function addBackToTop () {
	if( skin == 'oasis' ) {
		$('<li id="backtotop" style="position: absolute; right:20px; top:1px; border:none;"><button style="height: 20px;" type="button" value="Back To Top" onClick="goToTop();">Revenir en haut</button></li>').appendTo('#WikiaBarWrapper .toolbar > .tools');	
		hideFade (); 
	}	
}
 
var ButtonStart = 800;
var ScrollSpeed = 600;
var FadeSwitch = 1;
 
if( !window.BackToTop  ) {
	$( document ).ready( addBackToTop );
}
 
var BackToTop = true;
 
if( typeof Start == "number" ) {
	ButtonStart = Start;
}
 
if( typeof Speed == "number" ) {
	ScrollSpeed = Speed;
}	
 
if( typeof ToggleFading == "number" ) {
	FadeSwitch = ToggleFading;
}
 
var Speed = 300;
 
var Start = 600;

/* Bouton d'éditions */
 
// Bouton d'édtion pour MEP Personnage
 
mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://vignette.wikia.nocookie.net/lequipage-legendaire/images/2/2d/Bouton_d%27%C3%A9dition_Personnage.jpg/revision/latest?cb=20150419165140&path-prefix=fr",
		"speedTip": "Mise en page d'un article concernant un personnage de la fiction",
		"tagOpen": "<h2>Apparence</h2><br /><h2>Personnalité</h2><br /><h3>Relations</h3><br /><h2>Pouvoirs</h2><br />",
		"tagClose": "<h2>Histoire</h2><br /><h2>Batailles principales</h2><br /><h2>Navigation du site</h2><br />[[Catégorie:Personnage]]",
	};