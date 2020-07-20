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
			Node.textContent = 'Stargate Command';
		} else if ( Node.innerText ) { // IE doesn't handle .textContent
			Node.innerText = 'Stargate Command';
		} else {                       // Fallback
			Node.replaceChild( Node.firstChild, document.createTextNode( 'Stargate Command' ) ); 
		}
	} catch(e) {
		// bailing out!
	}
}

if ( wgTitle == 'Stargate Command' && ( wgNamespaceNumber == 0 || wgNamespaceNumber == 1 ) ) {
	addOnloadHook( mainPageRenameNamespaceTab );
} 
// *******************************************************************************************************
// *************************** END: [[Main Page]] tab-rename using javascript ****************************
// *******************************************************************************************************
importScriptPage('AjaxRC/code.js', 'dev');
AjaxRCRefreshText = 'Auto-refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page';
ajaxPages=["Special:RecentChanges","Special:Watchlist","Special:Log","Special:WikiActivity","Special:Contributions","Blog:Recent posts","Blog:News","Blog:Featured blog posts","Blog:Popular blog posts"];