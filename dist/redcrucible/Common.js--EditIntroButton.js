// 09:44, August 30, 2011 (UTC)
// <source lang="JavaScript">
 
// Adds a button next to the regular edit button which acts as a "section edit" button for the intro
// Written by Grunny (http://www.wikia.com/wiki/User:Grunny)
// Uses PurgeButton/code.js as a basis for jQuery layout
 
if ( wgNamespaceNumber != -1 && !window.EditIntroButtonLoaded ) {
	addOnloadHook( addEditIntroButton );
}
 
var EditIntroButtonLoaded = true;
 
function addEditIntroButton () {
	var theText = 'Edit intro';
 
	if ( typeof EditIntroButtonText == "string" ) {
		theText = EditIntroButtonText;
	}
 
	switch( skin ) {
		case 'answers':
		case 'awesome':
		case 'monaco_old':
		case 'monaco':
			$('#page_controls > #control_edit').after('<li><img src="/skins/common/blank.gif" class="sprite edit" /><a id="ca-edit-0" href="/index.php?title='+encodeURIComponent(wgPageName)+'&action=edit&section=0" rel="nofollow" title="Edit intro">'+ theText + '</a></li>');
			break;
 
 
		case 'uncyclopedia':
		case 'wowwiki':
		case 'lostbook':
		case 'monobook':
			$('#p-cactions > .pBody > ul > #ca-edit').after('<li id="ca-edit-0"><a href="/index.php?title='+encodeURIComponent(wgPageName)+'&action=edit&section=0" title="Edit intro">'+ theText + '</a></li>');
			break;
 
		case 'oasis':
		case 'wikia':
			$((( wgNamespaceNumber == 2 || wgNamespaceNumber == 3 ) && $( '.UserProfileActionButton' ).length ? '.UserProfileActionButton' : '#WikiaPageHeader' ) + ' > .wikia-menu-button > ul').prepend('<li><a href="/index.php?title='+encodeURIComponent(wgPageName)+'&action=edit&section=0" title="Edit intro">'+ theText + '</a></li>');
			break;
 
	}
}
 
// </source>