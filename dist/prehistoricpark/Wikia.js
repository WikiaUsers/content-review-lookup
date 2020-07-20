/* ------------------- PREHISTORIC PARK WIKI OASIS JS -------------------- */
 
/* ------------------------ EDITOR DROPDOWN ITEMS ------------------------ */
 
function EditorDropdown() {
	$('section#EditPage nav.wikia-menu-button ul').prepend('<li><a id="wpHistory" href="/wiki/'+ wgPageName +'?action=history"> History </a></li>');
	$('section#EditPage nav.wikia-menu-button ul').append('<li><a id="wpCancel" href="/wiki/'+ wgPageName +'"> Cancel </a></li>');
}
addOnloadHook(EditorDropdown);
 
/* -------------------------- MESSAGE WALL TOOLS ------------------------- */
 
function WallTools() {
	if (wgCanonicalNamespace == 'Thread') {
		$('#WallBrickHeader').append('<a href="/wiki/'+ wgPageName +'?action=history" class="wikia-button" style="margin-left:10px; margin-right:10px; float: right;" id="History">View History</a>');
	}
	if (wgCanonicalNamespace == 'Message_Wall' && wgAction != 'history') {
		$('.WikiaMainContent').prepend('<div class="UserProfileActionButton"><a href="/wiki/'+ wgPageName +'?action=history" class="wikia-button" style="margin-left:10px; margin-right:10px;" id="History">View History</a></div>');
		$('blockquote.wallgreeting').css('margin-top', '0px');
		if (wgTitle == wgUserName) {
			$('.UserProfileActionButton').prepend('<a accesskey="e" href="/wiki/Message_Wall_Greeting:'+ wgUserName +'?action=edit" class="wikia-button" data-id="edit" id="talkArchiveEditButton" style="padding-left: 5px; padding-right: 8px;"><img alt="" class="sprite edit-pencil" height="16" src="data:image/gif;base64,R0lGODlhAQABAIABAAAAAP///yH5BAEAAAEALAAAAAABAAEAQAICTAEAOw%3D%3D" width="22"> Edit Greeting	</a>');
		}
	}
}