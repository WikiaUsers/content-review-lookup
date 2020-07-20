/* Any JavaScript here will be loaded for all users on every page load. */
window.UserTagsJS = {
	modules: {},
	tags: {
		Owners: { u: 'Owners', order: -1/0 },
		BOT: { u: 'BOT', order: 2 },
		Manager: { u: 'Manager', order: 2 },
		bureaucrat: { order: 0 },
		Useless: { u: 'Useless', order: 1 }
	}
};
UserTagsJS.modules.custom = {
	'Sharpness': ['Manager', 'Owners'],
    'EndBadwikiasToday': ['Useless', 'Owners'], // NOTE: order of list here does NOT
    'OVerify': ['BOT'],
};
UserTagsJS.modules.mwGroups = ['bureaucrat', 'sysop'];

window.MessageWallUserTags = {
    tagColor: '#000000',
    glow: false,
    users: {
        'username': 'usergroup',
        'Sharpness': 'Owner • Bureaucrat',
        'OVerify': 'BOT • Admin',
        'EndBadwikiasToday': 'Owner • Bureaucrat',
    }
};
 
/* User Tags v2 Soon. */
/*
window.UserTagsJS = {
	modules: {
			inactive: 90,
			mwGroups: ['bureaucrat', 'chatmoderator', 'rollback', 'sysop', 'bannedfromchat', 'bot', 'bot-global'],
			autoconfirmed: false,
			metafilter: {
				sysop: ['bureaucrat'],
				chatmoderator: ['sysop'],
				rollback: ['sysop'],
				bot: ['sysop', 'rollback']
			},
			newuser: true,},
tags: {		}
};
 
UserTagsJS.modules.custom = {
	'Sharpness': ['sysop'],
	'EndBadwikiasToday': ['sysop', 'bureaucrat'],
	'OVerify': ['sysop', 'bot'],
};
 
UserTagsJS.modules.userfilter = {
};
 
UserTagsJS.modules.mwGroups = ['bureaucrat,sysop']; 
UserTagsJS.modules.mwGroups = ['rollback'];
importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});
 
if (wgUserName != 'null') {
	$('.insertusername').html(wgUserName);
}
 
window.MessageWallUserTags = {
    tagColor: '#000000',
    glow: false,
    users: {
        'username': 'usergroup',
        'Sharpness': 'Owner • Bureaucrat',
        'OVerify': 'BOT • Admin',
        'EndBadwikiasToday': 'Owner • Bureaucrat',
    }
};
*/

importArticles({
    type: 'script',
    articles: [
        'u:dev:MessageWallUserTags/code.js'
    ]
});