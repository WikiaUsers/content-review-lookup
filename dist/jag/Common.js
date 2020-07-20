/* Any JavaScript here will be loaded for all users on every page load. */


importScriptPage('ShowHide/code.js', 'dev');

// *************************************************************************************************************
// *************************** BEGINNING: [[Main Page]] tab-rename using javascript ****************************
// ** Modified version. Originally from [[Wikipedia:MediaWiki:Monobook.js]]/[[Wikipedia:MediaWiki:Common.js]] ** 
// *************************************************************************************************************
// **************** Code Source: Avatar Wiki - http://avatar.wikia.com/wiki/MediaWiki:Common.js ****************
// *************************************************************************************************************

function mainPageRenameNamespaceTab() {
	try {
		var Node = document.getElementById( 'ca-nstab-main' ).firstChild;
		if ( Node.textContent ) {      // Per DOM Level 3
			Node.textContent = 'JAG';
		} else if ( Node.innerText ) { // IE doesn't handle .textContent
			Node.innerText = 'JAG';
		} else {                       // Fallback
			Node.replaceChild( Node.firstChild, document.createTextNode( 'JAG' ) ); 
		}
	} catch(e) {
		// bailing out!
	}
}

if ( wgTitle == 'JAG Database' && ( wgNamespaceNumber == 0 || wgNamespaceNumber == 1 ) ) {
	addOnloadHook( mainPageRenameNamespaceTab );
} 
// *******************************************************************************************************
// *************************** END: [[Main Page]] tab-rename using javascript ****************************
// *******************************************************************************************************