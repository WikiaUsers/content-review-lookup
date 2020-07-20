/* Any JavaScript here will be loaded for all users on every page load. */
/*
 * Adds an edit button so you can use the other skin
 * Written by KeeblerPie
 * Uses EditIntroButton/code.js as a basis for jQuery layout
 *
 */
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
		case 'monobook':
			$('#p-cactions > .pBody > ul > #ca-edit').after('<li id="ca-edit-0"><a href="/index.php?title='+encodeURIComponent(wgPageName)+'&action=edit&useskin=wikia" title="Edit in Wikia skin">'+ theText + '</a></li>');
			break;
		case 'wikia':
			$((( wgNamespaceNumber == 2 || wgNamespaceNumber == 3 ) && $( '.UserProfileActionButton' ).length ? '.UserProfileActionButton' : '#WikiaPageHeader' ) + ' > .wikia-menu-button > ul').prepend('<li><a href="/index.php?title='+encodeURIComponent(wgPageName)+'&action=edit&useskin=monobook" title="Edit in Monobook skin">'+ theText + '</a></li>');
			break;
 
	}
}
 
//