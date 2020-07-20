function hideFade () {
	// hide #backtobottom first
	$( "#backtobottom" ).hide ();
	// fade in #backtobottom
	$( function () {
		$( window ).scroll( function () {
			if ( $( this ).scrollbottom () > ButtonStart ) {
				switch(FadeSwitch) {
					case 0:				
						$( '#backtobottom' ).show ();
						break;
					default:
						$( '#backtobottom' ).fadeIn ();
						break;
				}
			} else {
				switch(FadeSwitch) {
					case 0:				
						$( '#backtobottom' ).hide ();
						break;
					default:
						$( '#backtobottom' ).fadeOut ();
						break;
				}					
			}
		});
	});
}
 
function goToBottom (){
	// scroll body to 0px on click
	$( 'body,html' ).animate ({
		scrollBottom: 0
	}, ScrollSpeed );
	return false;
}
 
function addBackToBottom () {
	if( skin == 'oasis' ) {
		$('<li id="backtobottom" style="position: absolute; right:20px; bottom:1px; border:none;"><button style="height: 20px;" type="button" value="Back To bottom" onClick="goTobottom();">Back To bottom</button></li>').appendTo('#WikiaBarWrapper .toolbar > .tools');	
		hideFade ();
	}	
}
 
var ButtonStart = 800;
var ScrollSpeed = 600;
var FadeSwitch = 1;
 
if( !window.BackTobottom  ) {
	$( document ).ready( addBackTobottom );
}
 
var BackTobottom = true; // prevent duplication
 
if( typeof Start == "number" ) {
	ButtonStart = Start;
}
 
if( typeof Speed == "number" ) {
	ScrollSpeed = Speed;
}	
 
if( typeof ToggleFading == "number" ) {
	FadeSwitch = ToggleFading;
}
//