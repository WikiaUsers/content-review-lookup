/*Helsinkistä lähtevät lähijunat*/
importScript('MediaWiki:Common.js/trains.js‎');

/*Collapsible Tables*/
importScript('MediaWiki:Common.js/collapsibletables.js');

//Laskin-koodi

addOnloadHook( function() {
	if ( $( '.jcConfig' ).size() > 0 ) {
		importScript( 'MediaWiki:Common.js/calc.js' );
		importStylesheet( 'MediaWiki:Common.css/calc.css' );
	}
});

// ==================================================================
// Insert username 
// ==================================================================
$(function() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
    $("span.insertusername").text(wgUserName);
});