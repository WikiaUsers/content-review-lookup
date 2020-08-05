/*Imports - Full credits on imported pages*/

//UserTags   ~T95450
//importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});

/*End imports*/

//=============================================================================================

/* Any JavaScript here will be loaded for all users on every page load. */
importScriptPage('ShowHide/code.js', 'dev');
importScriptPage('CollapsibleInfobox/code.js', 'dev'); //for examples on [[CollapsibleInfobox]]

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
 * Begin BotoneraPopups demo
 **/
if ( wgPageName === 'BotoneraPopups' ) {
	importScriptURI( 'http://dev.wikia.com/wiki/BotoneraPopups/Code/en.js?action=raw&ctype=text/javascript&templates=expand' );
	importStylesheetPage( 'BotoneraPopups/code.css', 'dev' );
}
/**
 * End BotoneraPopups demo
 **/