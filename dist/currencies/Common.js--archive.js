// Archiving forums and talk page archives after 30 days (from Community Central; slightly altered) 
 
if(wgNamespaceNumber == 110) {
 
function disableOldForumEdit() {
	if( typeof( enableOldForumEdit ) != 'undefined' && enableOldForumEdit ) {
		return;
	}
	if( !document.getElementById('old-forum-warning') ) {
		return;
	}
 
if(skin == 'oasis') {
  $('#WikiaPageHeader .wikia-menu-button > a').html('Archived').removeAttr('href');
  return;
 }
	if( !document.getElementById('ca-edit') ) {
		return;
	}
	var editLink = null;
	if( skin == 'monaco' )
	{
		editLink = document.getElementById('ca-edit');
	}
	else if( skin == 'monobook' )
	{
		editLink = document.getElementById('ca-edit').firstChild;
	}
	else
	{
		return;
	}
 
 
	editLink.removeAttribute('href', 0);
	editLink.removeAttribute('title', 0);
	editLink.style.color = 'gray';
	editLink.innerHTML = 'Archived';
 
	$('span.editsection-upper').remove();
 
}
addOnloadHook( disableOldForumEdit );
}

if(wgNamespaceNumber == 1 ||wgNamespaceNumber === 3 ||wgNamespaceNumber === 5 ||wgNamespaceNumber === 7 ||wgNamespaceNumber === 9 ||wgNamespaceNumber === 11 ||wgNamespacenumber === 13 || wgNamespaceNumber === 15 ||wgNamespaceNumber === 111 || wgNamespaceNumber === 401 || wgNamespacenumber === 503 ) {

function disableTalkArchiveEdit() {
        if( typeof( enableTalkArchiveEdit ) != 'undefined' && enableTalkArchiveEdit ) {
		return;
	}
	if( !document.getElementById('archive-warning') ) {
		return;
	}

if(skin == 'oasis') {
  $('#WikiaPageHeader .wikia-menu-button > a').html('Archived').removeAttr('href');  
  $('.istalk').html('Archived').removeAttr('href');
  return;
 }
	if( !document.getElementById('ca-edit') ) {
		return;
	}
	var editLink = null;
	if( skin == 'monaco' )
	{
		editLink = document.getElementById('ca-edit');
	}
	else if( skin == 'monobook' )
	{
		editLink = document.getElementById('ca-edit').firstChild;
	}
	else
	{
		return;
	}
 
 
	editLink.removeAttribute('href', 0);
	editLink.removeAttribute('title', 0);
	editLink.style.color = 'gray';
	editLink.innerHTML = 'Archived';
 
	$('span.editsection-upper').remove();
 
}
addOnloadHook( disableTalkArchiveEdit );
}