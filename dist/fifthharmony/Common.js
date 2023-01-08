/* Auto updating recent changes opt-in
 * See w:c:dev:AjaxRC for info & attribution 
 */

window.AjaxRCRefreshText = 'Auto-refresh';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page';
window.ajaxPages = ["Special:RecentChanges","Special:WikiActivity"];

/* Replaces {{USERNAME}} with the name of the user browsing the page.
   Requires copying Template:USERNAME. */
 
$(function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName === null) return;
    $("span.insertusername").html(wgUserName);
});
 
/* End of the {{USERNAME}} replacement */

/* Disable comments for specified pages without disabling feature
 * by: [[User:The 888th Avatar|The 888th Avatar]], with additions by [[User:Hasdi|Hasdi]], based on code by [[User:Pecoes|Pecoes]]
 */

function  isCategoryBlacklisted (blacklist) {
	for (var i = 0; i < wgCategories.length; i++)
		if (-1 < $.inArray(wgCategories[i], blacklist ))
			return true;
	return false;
}
 
$(function() {
	if (isCategoryBlacklisted(["No_comment_pages"]) && wgTitle !== "Partners_%26_Parachutes") {
		$('.WikiaArticleComments #article-comments').remove();
	}
});

$(function() {
	if (wgCanonicalNamespace == 'Message_Wall' && wgAction != 'history') {
		if (wgTitle == wgUserName) {
			$('.WikiaMainContent').prepend('<div class="UserProfileActionButton"><a accesskey="e" href="/wiki/Message_Wall_Greeting:'+ wgUserName +'?action=edit" class="wikia-button" data-id="edit" id="talkArchiveEditButton" style="padding-left: 5px; padding-right: 8px;"><img alt="" class="sprite edit-pencil" height="16" src="data:image/gif;base64,R0lGODlhAQABAIABAAAAAP///yH5BAEAAAEALAAAAAABAAEAQAICTAEAOw%3D%3D" width="22"> Edit greeting	</a></div>');
		}
	}
});

// User Tags
window.UserTagsJS = {
	modules: {
		inactive: 30,
		mwGroups: [
            'bureaucrat',
            'chatmoderator',
            'rollback',
            'sysop',
            'bannedfromchat',
            'bot',
            'bot-global'
        ],
		autoconfirmed: true,
		metafilter: {
			sysop: ['bureaucrat'],
			chatmoderator: ['sysop'],
			rollback: ['sysop'],
		},
		newuser: true,
	},
	tags: {
		bureaucrat: { link: 'Fifth_Harmony_Wiki:Administrators' },
		sysop: { link:'Fifth_Harmony_Wiki:Administrators' },
		featured: { u:'Featured Wikian' },
		css: { u:'CSS', order: 101 },
		javascript: { u:'JavaScript', order: 102 }
	}
};
UserTagsJS.modules.custom = {
	'BatJarleyPatrcikCher': ['bureaucrat'],
};
UserTagsJS.modules.userfilter = {};
UserTagsJS.modules.mwGroups = ['bureaucrat']; 
UserTagsJS.modules.mwGroups = ['rollback'];