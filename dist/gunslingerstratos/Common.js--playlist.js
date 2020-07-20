//__NOWYSIWYG__ <source lang="javascript">
 
//A script that adds a "Back To Top" button in the footer of the Oasis theme.
//I don't like scrolling back to top on long pages neither do you :)
//Created by Noemon from Dead Space Wiki
 
 
function hideFade () {
	// hide #backtotop first
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


importArticles({
	type: "script",
	articles: [
// Scripts on Wiki
	"MediaWiki:MusicMainPage",			
	]
});

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
//</source>