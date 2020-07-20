/* Размещённый здесь JavaScript код будет загружаться всем пользователям при обращении к каждой странице */
 
/* importArticles start */
importArticles({
    type: 'script',
    articles: [
        // 'u:dantest:MediaWiki:Search_Fix.js',

        'u:dev:BackToTopButton/code.js',
        'u:dev:Countdown/code.js',
        'u:dev:PurgeButton/code.js',
        'u:dev:ReferencePopups/code.js',
        'u:dev:ShowHide/code.js',
        'u:dev:Toggler.js',
    ]
});
 
/* importArticles end */

/* Bact To Top Button */
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
		$('<li id="backtotop" style="position: absolute; right:20px; top:0px; border:none;"><button type="button" value="Наверх" onClick="goToTop();">Наверх</button></li>').appendTo('#WikiaBarWrapper .toolbar > .tools');	
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
/* END */