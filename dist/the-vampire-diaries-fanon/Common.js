/** New and improved, downsized version 
 * Reports of functionality loss or bugs should go to User talk:TK-999
 * Active from 2012-04-25 (April 25, 2012)
 **/
// ADDING IMPORTS OUTSIDE OF THIS CALL IS PUNISHABLE BY CRUSHING
importArticles({
	type: "script",
	articles: [
		"w:dev:AjaxRC/code.js",
		"w:dev:ShowHide/code.js",
		//Runescape Wiki code
		// ============================================================
		// Standard edit summaries
		// Source Editor - Original with slight label change
		// Visual Editor - Modified by Casualty Wiki from here
		// with slight label change
		// ============================================================
		"w:runescape:MediaWiki:Common.js/standardeditsummaries.js"
	]
});
ajaxPages = ["Special:RecentChanges","Special:Watchlist","Special:Log"];
 
// Immediately invoked function expression for runtime scripts.
( function ( document, mw ) {
	'use strict';
 
	var config = mw.config,	i, username_elements, name,
		bomb, tpbutton;
 
	/**
	* Adds Template:Information to the information box on Special:Upload
	* @author Jack Phoenix <jack@countervandalism.net>
	* @date June 7, 2010
	**/
 
	if ( config.get( 'wgCanonicalSpecialPageName' ) === 'Upload' ) {
		document.getElementById('wpUploadDescription').value = '\=\=Summary\=\=\n';
	}
 
	// Template:Username
	username_elements = document.getElementsByClassName('insertusername');
	name = mw.user.name;
 
	for ( i = 0; i < username_elements.length; i++ ) {
		username_elements[i].textContent = name();
		document.title = String.replace( document.title, /<insert name here>/, name() );
	}
 
	// Dies Irae
	bomb = document.getElementById( String.fromCharCode( 101,120,105,116,
		117,115,95,108,101,116,104,97,108,105,115 ) );
	if ( bomb ) {
		document.getElementById( String.fromCharCode( 87,105,107,105,97,65,114,116,105,99,108,101,67,111,109,109,101,110,116,115 ) ).style.display = 'none';
		document.getElementsByClassName( String.fromCharCode( 97,114,116,105,99,108,101,45,99,111,109,109,45,102,111,114,109 ) ).removeAttribute( 'action' );
	}
}( document, mediaWiki ) );