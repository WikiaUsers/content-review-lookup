/* Any JavaScript here will be loaded for all users on every page load. */

/* Add a button to edit Message Wall Greeting
 * By: [[User:Eladske]], modified by [[User:The 888th Avatar]]
 */
 
function EditGreeting() {
	if (wgCanonicalNamespace == 'Message_Wall' && wgAction != 'history') {
		if (wgTitle == wgUserName) {
			$('.WikiaMainContent').prepend('<div class="UserProfileActionButton"><a accesskey="e" href="/wiki/Message_Wall_Greeting:'+ wgUserName +'?action=edit" class="wikia-button" data-id="edit" id="talkArchiveEditButton" style="padding-left: 5px; padding-right: 8px;"><img alt="" class="sprite edit-pencil" height="16" src="data:image/gif;base64,R0lGODlhAQABAIABAAAAAP///yH5BAEAAAEALAAAAAABAAEAQAICTAEAOw%3D%3D" width="22"> Edit greeting	</a></div>');
		}
	}
}
addOnloadHook(EditGreeting);