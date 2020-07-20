window.UserTagsJS = {
	modules: {},
	tags: {
	    // group: { associated tag data },
		blocked: { order: '1' },
		bannedfromchat: { order: '2' },
		'bot-global': { order:'1' },
		bot: { link:'Poptropica Wiki:Bots', order:'1' },
		globalpwadmin: { u:'Global PW Admin', order: '2', title: 'Admin on all 3 PHN wikis' },
        bureaucrat: { link:'Poptropica Fashion Wiki:Bureaucrats', order: '3' },
        sysop: { link:'Poptropica Fashion Wiki:Administrators', order: '4' },
        threadmoderator: { u:'Thread Moderator', link:'Poptropica Fashion Wiki:Thread Moderators', order:'5' },
        chatmoderator: { link:'Poptropica Fashion Wiki:Chat Moderators', order:'6' },
        rollback: { u:'Rollbacker', link:'Poptropica Fashion Wiki:Rollbackers', order:'7' },
        'autoconfirmed_users': { order:'999' },
        inactive: { order:'1', title:"Hasn't edited for 90 days" },
	},
	oasisPlaceBefore: ''
};

UserTagsJS.modules.inactive = 90; // 90 days
 
UserTagsJS.modules.mwGroups = ['bureaucrat', 'sysop', 'rollback', 'bannedfromchat', 'blocked', 'chatmoderator', 'threadmoderator', 'autoconfirmed_users'];
 
UserTagsJS.modules.custom = {
	'Legofan100': ['globalpwadmin',],
	'Ultimate iPad Expert': ['globalpwadmin',],
};
importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});

$('.username').text(mw.config.get('wgUserName'));