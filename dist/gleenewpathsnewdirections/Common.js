/* Any JavaScript here will be loaded for all users on every page load. */

var ShowHideConfig = { 
    brackets: '[[]]'
};
importScriptPage( 'AjaxUndo/code.js', 'dev' );
importScriptPage('DupImageList/code.js', 'dev');
importScriptPage( 'FastDelete/code.js', 'dev' );
var fdButtons = [];
fdButtons[fdButtons.length] = {
	'summary': 'spam',
	'label': 'spam'
};
fdButtons[fdButtons.length] = {
	'summary': 'vandalism',
	'label': 'vandal'
};
importScriptPage( 'PurgeButton/code.js', 'dev' );
EditIntroButtonText = 'intro';
importScriptPage( 'EditIntroButton2/code.js', 'dev' );
importScriptPage('AjaxRC/code.js', 'dev');
var ajaxRefresh = 30000;
ajaxPages = ["Special:RecentChanges"]
importScriptPage('ShowHide/code.js', 'dev');
importScriptPage('CollapsibleInfobox/code.js', 'dev'); //for examples on [[CollapsibleInfobox]]

$( function() {
	if ( $( '#infowidgets-demo' ).length ) {
		importScriptPage( 'InfoWidgets/demo.js', 'dev' );
		importStylesheetPage( 'InfoWidgets/demo.css', 'dev' );
	}
} );