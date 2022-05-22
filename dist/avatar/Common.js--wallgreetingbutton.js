/* Add a button to edit Message Wall Greeting
 * By: [[User:Eladske]], modified by [[User:The 888th Avatar]]
 */

$(function() {
	if (mw.config.get('wgCanonicalNamespace') == 'Message_Wall' && mw.config.get('wgAction') != 'history') {
		if (mw.config.get('wgTitle') == mw.config.get('wgUserName')) {
			$('.page__main').prepend('<div class="UserProfileActionButton"><a accesskey="e" href="/wiki/Message_Wall_Greeting:'+ mw.config.get('wgUserName') +'?action=edit" class="wikia-button" data-id="edit" id="talkArchiveEditButton" style="padding-left: 5px; padding-right: 8px;"><img alt="" class="sprite edit-pencil" height="16" src="data:image/gif;base64,R0lGODlhAQABAIABAAAAAP///yH5BAEAAAEALAAAAAABAAEAQAICTAEAOw%3D%3D" width="22"> Edit greeting	</a></div>');
		}
	}
});