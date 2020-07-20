/* Common.js <pre>
Cualquier JavaScript que esté aquí será cargado para todos los usuarios en todas las páginas cargadas del wiki. */




/* Show/Hide Config */
var ShowHideConfig = { 
    brackets: '[]'
};
importScriptPage('ShowHide/code.js', 'dev');
importScriptPage('CollapsibleInfobox/code.js', 'dev'); //for examples on [[CollapsibleInfobox]]
/* Fin */


/* [[Plantilla:Nombreusuario]] */
function UserNameReplace(){
  if (wgUserName){
    var spans = getElementsByClassName(document, "span", "InsertUserName");
 
    for (var i = 0; i < spans.length; i++){
      spans[i].innerHTML = wgUserName;
    }
  }
} 
addOnloadHook(UserNameReplace);
/* Fin */


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
		$('<li id="backtotop" style="position: absolute; right:20px; top:-2px; border:none;"><button style=" font-size: 97%; height: 17px; line-height: 16px;" type="button" value="Volver Arriba" onClick="goToTop();">Volver Arriba</button></li>').appendTo('#WikiaBarWrapper .toolbar > ul.tools');	
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

// **************************************************
//  Fin - BackToTopButton
// **************************************************


/* Usuarios Inactivos - idea de Sam Wang y dev.wikia.com */
InactiveUsers = {
    months: 1,
    gone: ['Ivan Uchiha', 'Leodix', 'Waxo159'],
    text: 'Inactivo'
};
importScriptPage('InactiveUsers/code.js', 'dev');
/* Fin */

importScriptPage('Countdown/code.js', 'dev');

importScriptPage('DupImageList/code.js', 'dev');

/* chat */
none

/* Prueba */

$("#prueba").click(function(){
    alert("Hola");    
});