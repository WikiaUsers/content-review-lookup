/* Any JavaScript here will be loaded for all users on every page load. */
// 13:53, October 2, 2011 (UTC)
// <source lang="JavaScript">
 
if( wgNamespaceNumber >= 0 && !window.PurgeButtonsLoaded && document.getElementById('control_purge') == null && wgNamespaceNumber != 500 && wgNamespaceNumber != 502 ) {
	addOnloadHook( addPurgeButton );
}
var PurgeButtonsLoaded = true; // prevent duplicate running (but not dupe buttons from outside this code)
 
function addPurgeButton () {
	var theText = 'Refresh'; //default text, ala SMW
 
	if( typeof PurgeButtonText == "string" ) {
		theText = PurgeButtonText;
	}
 
	switch( skin ) {
		case 'answers': /* forked from monaco, close enough, pass to monaco */
		case 'awesome': /* you really shouldnt even have this value... */
		case 'monaco_old': /* really, where are you getting these skin settings from... */
		case 'monaco':
			$('#page_controls').append('<li id="control_purgebutton"><img src="/skins/common/blank.gif" class="sprite refresh" /><a id="ca-purge" href="/index.php?title='+encodeURIComponent(wgPageName)+'&action=purge" rel="nofollow" title="Purge page">'+ theText + '</a></li>');
			break;
 
 
		case 'uncyclopedia': /* monobook clone, pass to monobook */
		case 'wowwiki': /* monobook clone, pass to monobook */
		case 'lostbook': /* monobook clone, pass to monobook */
		case 'monobook':
			$('#p-cactions > .pBody > ul').append('<li id="ca-purge"><a href="/index.php?title='+encodeURIComponent(wgPageName)+'&action=purge" title="Purge page">'+ theText + '</a></li>');
			break;
 
		case 'oasis':
		case 'wikia':
			$(((wgNamespaceNumber == 2 || wgNamespaceNumber == 3) && $( '.UserProfileActionButton' ).length ? '.UserProfileActionButton' : '#WikiaPageHeader') + ' > .wikia-menu-button > ul').append('<li><a href="/index.php?title='+encodeURIComponent(wgPageName)+'&action=purge" title="Purge page">'+ theText + '</a></li>');
			break;
 
	}
}
 
//</source>