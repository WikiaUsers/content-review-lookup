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
                coder: { u:'Wiki Coder'},
		godfather: { u:'Godfather'},
		scary: { u:'Moeko Lord'},
		framer: { u:'Framer'},
                lol: { u:'Senpai'},
                consigliere: { u:'Consigliere'},
		blackmail: { u:'Blackmailer'},
		janitor: { u:'Janitor'},
                lolliepuff: { u:'Big Mean Mother Hubbard'},
                bacon: { u:'Overlord Of Bacon'},
                blocked: { u:'Illuminati'},
                penguin: { u:'Penguin Emperor'},
                soccer: { u:'Soccer Penalty Taker'},

	}
};
 
UserTagsJS.modules.custom = {
	'Foxy Da Pirate': ['coder'],
        'Jillips Entertainment': ['bacon'], 
        'SwizzySwag': ['penguin'],
        'The Golden Foxy guy BB 3.0': ['lol'],
        'Drifterzzzz': ['soccer'],
        'Fox flames': ['scary'],
        'Lolliepuff': ['lolliepuff'], 
};
 
UserTagsJS.modules.mwGroups = ['bureaucrat', 'moderator', 'chatmoderator', 'patroller', 'rollback', 'sysop', 'bannedfromchat', 'bot', 'bot-global', 'newuser'];
UserTagsJS.modules.metafilter = { sysop: ['bureaucrat', 'founder'], chatmoderator: ['sysop', 'bureaucrat', 'rollback'], rollback: ['sysop'], newuser: ['chatmoderator', 'bannedfromchat', 'newuser'] };
UserTagsJS.modules.autoconfirmed = false;
UserTagsJS.modules.isblocked = true;
UserTagsJS.modules.inactive = 30; // 30 days
UserTagsJS.modules.newuser = false;
UserTagsJS.modules.userfilter = {
};

window.MessageWallUserTags = {
    tagColor: 'black',  
    glow: true,           
    glowSize: '20px',     
    glowColor: 'Indigo', 
    users: {
        'Foxy_Da_Pirate': 'Admin',
    }
};

importArticles({
    type: 'script',
    articles: [
        // ...
        'u:dev:LastEdited/code.js',
        // ...
    ]
});

var MessageBlock = {
  title : 'Block.',
  message : 'You have been blocked for $2 for the following reason(s): "$1"',
  autocheck : true
};