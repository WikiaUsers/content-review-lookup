/* Any JavaScript here will be loaded for all users on every page load. */

/* Countdown Timer */
importScript('MediaWiki:Common.js/countdowntimer.js');

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
			Node.textContent = 'Sanctuary For All';
		} else if ( Node.innerText ) { // IE doesn't handle .textContent
			Node.innerText = 'Sanctuary For All';
		} else {                       // Fallback
			Node.replaceChild( Node.firstChild, document.createTextNode( 'Sanctuary For All' ) ); 
		}
	} catch(e) {
		// bailing out!
	}
}

if ( wgTitle == 'Sanctuary Wiki' && ( wgNamespaceNumber == 0 || wgNamespaceNumber == 1 ) ) {
	addOnloadHook( mainPageRenameNamespaceTab );
} 
// *******************************************************************************************************
// *************************** END: [[Main Page]] tab-rename using javascript ****************************
// *******************************************************************************************************