/* Any JavaScript here will be loaded for all users on every page load. */

importScriptPage('ShowHide/code.js', 'dev');
importScriptPage('CollapsibleInfobox/code.js', 'dev'); //for examples on [[CollapsibleInfobox]]

$( function() {
	if ( $( '#infowidgets-demo' ).length ) {
		importScriptPage( 'InfoWidgets/demo.js', 'dev' );
		importStylesheetPage( 'InfoWidgets/demo.css', 'dev' );
	}
} );