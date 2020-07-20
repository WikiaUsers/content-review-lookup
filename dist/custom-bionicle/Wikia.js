/* Ajax Auto-Refresh (courtesy pcj) */
var ajaxPages = ["Special:RecentChanges", "Special:Watchlist", "Special:Log", "Special:Contributions"];
var AjaxRCRefreshText = 'Auto-refresh';
importScriptPage('AjaxRC/code.js', 'dev')

/* purge button */
function CreatePurgeButton() {
	$('section header div.buttons a:first-child').before('<a style="margin:0 3px 3px 0" href="/index.php?title='+ encodeURIComponent(wgPageName) +'&action=purge" title="Purge the current page" accesskey="b" class="wikia-button secondary" id="purgeButton" data-id="purgebutton">Purge</a>');
}
 
addOnloadHook(CreatePurgeButton);

/* logs button */
function CreateLogsButton() {
	$('section header div.buttons a:first-child').before('<a data-id="logs" class="wikia-button secondary" accesskey="g" title="Special:Logs" href="/wiki/Special:Logs">Logs</a>');
}

addOnloadHook(CreateLogsButton)
 
/*Recent changes button */
function CreateRecentChangesButton() {
	$('section header div.buttons a:first-child').before('<a data-id="recentchanges" class="wikia-button secondary" accesskey="g" title="Special:RecentChanges" href="/wiki/Special:RecentChanges"><img height="0" width="0" class="sprite activity" src="https://images.wikia.nocookie.net/common/skins/common/blank.gif">Recent Changes</a>');
} 
 
addOnloadHook(CreateRecentChangesButton)

// ================================================================
// JavaScript here will be loaded only for users on the Oasis theme
// ================================================================
 
 
// ==============================
// Background randomiser
// ==============================
 
function randomBack () {
    var opts = [
		'https://i.imgur.com/SsomDlH.jpg',
		'https://i.imgur.com/yABRUvY.jpg',
		'https://i.imgur.com/fEKEyxO.jpg',
        'https://i.imgur.com/QLIzd65.jpg',
        'https://i.imgur.com/iBoDZvy.jpg',
        'https://i.imgur.com/VbxJ7bN.jpg',
		'https://i.imgur.com/SsomDlH.jpg',
		];
 
	if (wgPageName=='Main_Page') {
		$('body').css('background-image','url(' + opts[0] + ')');
		$('body').css('background-size','105%'); //for the DS3 background to look better
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
 
 
// ==============================
// Snow!
// ==============================
 
//importScriptPage('MediaWiki:Snow.js', 'community');