/* Any JavaScript here will be loaded for all users on every page load. */
 
window.DisplayClockJS = '%2H:%2M:%2S - %2d %{January;February;March;April;May;June;July;August;September;October;November;December}m %Y (UTC)';
 
importArticles({
    type: "script",
    articles: [
        'u:dev:DisplayClock/code.js',
	'w:c:dev:UserTags/code.js',
	'MediaWiki:Common.js/minx.js'
    ]
});
 
window.UserTagsJS = {
	modules: {},
	tags: {
		bureaucrat: { u:'Admin'},
                coder: { u:'Coder'},
		godfather: { u:'Godfather'},
		mafioso: { u:'Mafioso'},
		framer: { u:'Framer'},
                second: { u:'Second In Command'},
                co: { u:'Mafioso'},
                consigliere: { u:'Consigliere'},
		blackmail: { u:'Blackmailer'},
		janitor: { u:'Janitor'},
                fan: { u:'Markiplier Fangirl'},
                bacon: { u:'Overlord Of Bacon'},
                ceo: { u:'CEO Editor'},
                m: { u:'Constable Trainee'},
                parttime: { u:'Part Time Admin'},
                ceoguard: { u:'CEO Guard'},
                royal: { u:'Royal Guard'},
 
	}
};
 
UserTagsJS.modules.custom = {
	'Ninja Bush02': ['royal'],
        'Doggymarkiplier': ['fan'],
 
};
 
UserTagsJS.modules.mwGroups = ['bureaucrat', 'moderator', 'chatmoderator', 'patroller', 'rollback', 'sysop', 'bannedfromchat', 'bot', 'bot-global', 'newuser'];
UserTagsJS.modules.metafilter = { sysop: ['bureaucrat', 'founder'], chatmoderator: ['sysop', 'bureaucrat', 'rollback'], rollback: ['sysop'], newuser: ['chatmoderator', 'bannedfromchat', 'newuser'] };
UserTagsJS.modules.autoconfirmed = false;
UserTagsJS.modules.isblocked = true;
UserTagsJS.modules.inactive = 30; // 30 days
UserTagsJS.modules.newuser = false;
UserTagsJS.modules.userfilter = {
  
};


importArticles({
    type: 'script',
    articles: [
        // ...
        'u:dev:LastEdited/code.js',
        // ...
    ]
});