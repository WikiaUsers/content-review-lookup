/* Add a button to edit Message Wall Greeting
 * By: [[User:Eladske]], modified by [[User:The 888th Avatar]]
 */

$(function() {
    if (mw.config.get('wgCanonicalNamespace') === 'Message_Wall' && mw.config.get('wgAction') != 'history') {
        if (mw.config.get('wgTitle') === mw.config.get('wgUserName')) {
            $('.WikiaMainContent').prepend('<div class="UserProfileActionButton"><a accesskey="e" href="/wiki/Message_Wall_Greeting:'+ wgUserName +'?action=edit" class="wikia-button" data-id="edit" id="talkArchiveEditButton" style="padding-left: 10px; padding-right: 10px;"> Edit greeting	</a></div>');
        }
    }
});