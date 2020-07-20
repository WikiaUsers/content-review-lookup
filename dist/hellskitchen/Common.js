/* Any JavaScript here will be loaded for all users on every page load. */
/* User profile header custom tags */
window.UserTagsJS = {
	modules: {},
	tags: {
		bureaucrat: { u:'Executive Chef', link:'Project:Wiki_Staff' },
		sysop: { u:'Head Chef', link:'Project:Wiki_Staff' },
		rollback: { u:'Sous Chef', link:'Project:Wiki_Staff' },
		threadmoderator: { u:'Black Jacket', link:'Project:Wiki_Staff' },
		bot: { u: 'Bot', link: 'Special:ListUsers/bot' },
		inactive: { u: 'Inactive' },
		blocked: { u: 'Ejected', link: 'Special:BlockList' },
		'wiki-manager': { u: 'Wiki Manager', link: 'Help:Wiki_Managers' },
		'vstf': { u: 'VSTF', link: 'Help:VSTF' },
		chatmoderator: {u: 'Verified', link: 'Project:Verified' },
	}
};
UserTagsJS.modules.autoconfirmed = true;
UserTagsJS.modules.newuser = true;
UserTagsJS.modules.inactive = 30; 
UserTagsJS.modules.mwGroups = ['bureaucrat','threadmoderator','bot','sysop','rollback','blocked','wiki-manager','vstf','chatmoderator',]; 
UserTagsJS.modules.metafilter = {
	sysop: ['bureaucrat'], 
};
window.highlightUsersConfig = {
    colors: {
        // 'group-name': 'color',
        'bureaucrat': '#db3737',
        'sysop': '#db3737',
    },
    styles: {
        // 'group-name': 'styles',
        'staff': 'font-weight: bold;'
    }
};
if (wgUserName != 'null') {
	$('.insertusername').html(wgUserName);
}