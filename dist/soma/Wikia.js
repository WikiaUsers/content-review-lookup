// Loading Scripts
importArticles({
    type: 'script',
    articles: [
        "w:dev:WallGreetingButton/code.js",
        "w:dev:RevealAnonIP/code.js",
        "w:dev:PurgeButton/code.js",
        "w:dev:AjaxRC/code.js",
        "w:dev:VisualSpellCheck/code.js",
        "w:dev:ListFiles/code.js"
    ]
});

// Some AjaxRefresh stuff.
AjaxRCRefreshText = 'Auto-refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page';
ajaxPages = ["Special:RecentChanges","Special:WikiActivity"];

// ==============================
// BackToTopButton
// ==============================
 
//A script that adds a "Back To Top" option in the footer of the Oasis theme.
//People don't like scrolling back to top on long pages neither do you :)
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