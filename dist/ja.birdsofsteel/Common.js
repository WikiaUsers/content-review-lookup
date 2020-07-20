function include(s) {
  document.write("<script type=\"text/javascript\" src=\"http://ja.wikia.com/index.php?title=" + encodeURI(s) + "&action=raw&ctype=text/javascript&dontcountme=s\"></script>");
}

include("User:Tommy6/js/hatenawithcounter.js");
include("User:Tommy6/js/livedoorclipwithcounter.js");
include("User:Tommy6/js/yahoobookmarkwithcounter.js");
include("User:Tommy6/js/buzzurlwithcounter.js");




/**
 * BEGIN ShowHide
 **/
/* Any JavaScript here will be loaded for all users on every page load. */
 
importScriptPage('ShowHide/code.js', 'dev');
importScriptPage('CollapsibleInfobox/code.js', 'dev');
 
/**
 * Begin infowidgets demo
 **/
$( function() {
	if ( $( '#infowidgets-demo' ).length ) {
		importScriptPage( 'InfoWidgets/demo.js', 'dev' );
		importStylesheetPage( 'InfoWidgets/demo.css', 'dev' );
	}
} );
/**
 * End infowidgets demo
 **/
 
/**
 * Begin spoileralert demo
 **/
$(function () {
	if ($('#SpoilerAlertDemo').length) {
		$('#SpoilerAlertDemo').empty();
		$('<button>Clear cookie and reload</button>').appendTo('#SpoilerAlertDemo').css({
			width: '200px',
			margin: '200px auto'
		}).click(function () {
			$.cookies.set('spoilers', '', {
				path: '/', domain: wgServer.substr('http://'.length), hoursToLive: 24
			});
			location.reload();
		});
		$('<p>' +
			'This page is a demo for ' +
			'<a href="http://dev.wikia.com/wiki/SpoilerAlert">SpoilerAlert</a>' +
			'</p>').appendTo('#SpoilerAlertDemo').css({
			textAlign: 'center',
			fontSize: '0.8em',
		});
 
		window.SpoilerAlert = { isSpoiler: function () { return true; } };
		importScriptPage('SpoilerAlert/code.js', 'dev');
	}
});
/**
 * End spoileralert demo
 **/
/**
 * END ShowHide
 **/