AjaxRCRefreshText = 'Actualizar Automaticamente'; AjaxRCRefreshHoverText = 'Refrescar esta página automáticamente'; ajaxPages = ["Especial:CambiosRecientes","Especial:WikiActivity"]; importScriptPage('AjaxRC/code.js', 'dev');

UserTagsJS.modules.mwGroups = ['bureaucrat', 'sysop', 'rollback', 'rollbacker', 'bannedfromchat']; UserTagsJS.modules.autoconfirmed = false; UserTagsJS.modules.newuser = false; importArticles({  type: 'script',  articles: [  'u:dev:UserTags/code.js'  ]  });

/* Cualquier código JavaScript escrito aquí se cargará para todos los usuarios en cada carga de página. */
 
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
 
// AutoRefreshing RecentChanges and WikiActivity
 
AjaxRCRefreshText = 'Act. automát.';
AjaxRCRefreshHoverText = 'Refrescar esta página automáticamente';
ajaxPages = ["Especial:CambiosRecientes","Especial:WikiActivity"];
importScriptPage('AjaxRC/code.js', 'dev');