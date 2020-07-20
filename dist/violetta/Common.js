/* Auto updating recent changes opt-in
  * See w:c:dev:AjaxRC for info & attribution 
  */
 
 AjaxRCRefreshText = 'Auto-Refresh';
 AjaxRCRefreshHoverText = 'Automatically refresh the page';
 ajaxPages = ["Special:RecentChanges","Special:WikiActivity","Special:UncategorizedPages","Special:AllPages"];
 importScriptPage('AjaxRC/code.js', 'dev');

/* Thank you to the Sam & Cat Wiki and Dev Wiki! */
importScriptPage('FloatingToc/code.js', 'dev');

importScriptPage('SpellCheckModule/code.js', 'dev');

// User Tags
window.UserTagsJS = {
	modules: {
			inactive: 30,
			mwGroups: ['bureaucrat', 'chatmoderator', 'rollback', 'sysop', 'bannedfromchat', 'bot', 'bot-global'],
			autoconfirmed: true,
			metafilter: {
				sysop: ['bureaucrat'],
				chatmoderator: ['sysop'],
				rollback: ['sysop'],
			},
			newuser: true,},
	tags: {
		bureaucrat: { link:'' },
		sysop: { link:'' },
		chatmoderator: { link:'' },
		rollback: { u:'Rollback', link:'' },
		featured: { u:'Featured Wikian' },
		css: { u:'CSS', order: 101 },
		javascript: { u:'JavaScript', order: 102 }
	}
};
UserTagsJS.modules.custom = {
	'MacyZC55': ['bureaucrat'],
};
UserTagsJS.modules.userfilter = {

};
UserTagsJS.modules.mwGroups = ['bureaucrat']; 
UserTagsJS.modules.mwGroups = ['rollback'];

importArticles({
    type: 'script',
    articles: [
        'w:c:dev:UserTags/code.js',
        'w:dev:TopEditors/code.js'
    ]
});

/* Replaces {{USERNAME}} with the name of the user browsing the page.
   Requires copying Template:USERNAME. */
 
$(function() {
    if (window.disableUsernameReplace || mw.config.get('wgUserName') === null) return;
    $('span.insertusername').html(mw.config.get('wgUserName'));
});
 
/* End of the {{USERNAME}} replacement */