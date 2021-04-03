/* Any JavaScript here will be loaded for all users on every page load. */
importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});


window.UserTagsJS = {
	modules: {},
	tags: {
        adminbureau: { u:'AdminBureau', order:-1/0},
        sysop: { u:'Administrator', order:-1/0},
        bureaucrat: { u:'Bureaucrat', order:-1/0},
        chatmoderator: {u:'Chat Moderator', order:-1/0},
        bot: { u:'Bot', title:'BLEEP BLARP', order:-1/0},
        janitor: { u:'Janitor', order:-1/0},
        blocked: { u:'Banned', order:-1/0},
        rollback: { u:'Rollback', order:-1/0},
        dbcore: 'Database Core',
        tt: 'Nyooming Memebag'
        sk: 'God'
	}
};



UserTagsJS.modules.custom = {
	'Trunktail': ['tt'],
	'Shadowkiller168': ['sk']
};

//Clock Config
// Display 24 hour time followed by day, month (English, full name)
// and year with "(UTC)" at the end
window.DisplayClockJS = '%2H:%2M:%2S - %2d %{January;February;March;April;May;June;July;August;September;October;November;December}m %Y (UTC)';