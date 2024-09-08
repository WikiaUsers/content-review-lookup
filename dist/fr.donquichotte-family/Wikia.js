/* Imports */

importArticles({
    type: 'script',
    articles: [
        'MediaWiki:Wikia.js/Sidebar.js',
        'MediaWiki:Wikia.js/MEP.js' //Import de la Sidebar
    ]
});

/* Bouton pour revenir en haut */

function hideFade () {             //Fonction déclarée
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
	// scroll body to 0px on click
	$( 'body,html' ).animate ({
		scrollTop: 0
	}, ScrollSpeed );
	return false;
}
 
function addBackToTop () {
	if( skin == 'oasis' ) {
		$('<li id="backtotop" style="position: absolute; right:20px; top:1px; border:none;"><button style="height: 20px;" type="button" value="Back To Top" onClick="goToTop();">Revenir en haut</button></li>').appendTo('#WikiaBarWrapper .toolbar > .tools');	
		hideFade (); //Création du bouton
	}	
}
 
var ButtonStart = 800;
var ScrollSpeed = 600;
var FadeSwitch = 1;
 
if( !window.BackToTop  ) {
	$( document ).ready( addBackToTop );
}
 
var BackToTop = true; // prevent duplication
 
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
	
/* Tchat */
	
 var list = $('#Rail').text();
if(list.indexOf("Franky003") !== -1) {
$('.Chat').css('background-image', 'linear-gradient(60deg, pink, hotpink, black)');
}
var msg = $('.Chat .you').text();
if(msg.indexOf("test") !== -1) {
$('.Chat').css('background', 'none');
}