/* Any JavaScript here will be loaded for all users on every page load. */

/* Replaces {{USERNAME}} with the name of the user browsing the page.
   Requires copying Template:USERNAME. */
 
$(function() {
    if (window.disableUsernameReplace || mw.config.get('wgUserName') === null) return;
    $('span.insertusername').html(mw.config.get('wgUserName'));
});
 
/* End of the {{USERNAME}} replacement */

window.UserTagsJS = {
	modules: {},
	tags: {
		// group: { associated tag data }
		blocked: { order: '1' },
		bannedfromchat: { order: '2' },
		owner: { u:'Owner', order:'1' },
		'bot-global': { order:'1' },
		bot: { link:'Poptropica Wiki:Bots', order:'1' },
		globalpwadmin: { u:'Global PW Admin', order: '2', title: 'Admin on all 3 PHN wikis' },
        bureaucrat: { link:'Poptropica Fanon Wiki:Bureaucrats', order: '3' },
        sysop: { link:'Poptropica Fanon Wiki:Administrators', order: '4' },
        threadmoderator: { link:'Poptropica Fanon Wiki:Thread Moderators', order:'5' },
        chatmoderator: { link:'Poptropica Fanon Wiki:Chat moderators', order:'6' },
        rollback: { u:'Rollbacker', link:'Poptropica Fanon Wiki:Rollbackers', order:'7' },
        'autoconfirmed_users': { order:'999' },
        inactive: { order:'1', title:"Hasn't edited for 90 days" },
	},
	oasisPlaceBefore: ''
};
 
UserTagsJS.modules.inactive = 90; // 90 days
 
UserTagsJS.modules.mwGroups = ['bureaucrat', 'sysop', 'rollback', 'bannedfromchat', 'blocked', 'chatmoderator', 'threadmoderator', 'autoconfirmed_users'];
 
UserTagsJS.modules.custom = {
	'Legofan100': ['globalpwadmin',],
	'Ultimate iPad Expert': ['globalpwadmin', 'owner',],
};

importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});