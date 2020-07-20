/* Any JavaScript here will be loaded for all users on every page load. */
/* Code is working; do not edit without telling an experienced coder */
 
importArticles({
    type: "script",
    articles: [
        'u:dev:DisplayClock/code.js',
        'u:dev:MessageWallUserTags/code.js',
	'w:c:dev:UserTags/code.js',
	'MediaWiki:Common.js/minx.js'
    ]
});
 
window.UserTagsJS = {
	modules: {},
	tags: {
		bureaucrat: { u:'Bureaucrat'},
        coder: { u:'Wiki Coder'},
		role: { u:'Roleplayer'},
		aquu: {u:'Asslord'},
		breaker: {u:'Ass Kicker'},
		toybonnie: {u:'Toy Bonnie'},
		oswald: {u:'Oswald'},
		ben: {u: 'The Drowned One'},
		foxyoh: {u: 'Toy Chicweed'},
		Rebun: {u: 'Nope'}
}
 
}
UserTagsJS.modules.custom = {
	'Taz Da Wolf': ['coder'],
	'TheAquuaHybrid': ['aquu'],
    'Golden Hybrid, Animatronic Breaker': ['breaker'],
    'Toy Bonnie 2': ['toybonnie'],
    'Oswald the Unlucky Rabbit': ['oswald'],
    'BenTheDrowned': ['ben'],
    'Foxy Oh foxy the pirate': ['foxyoh'],
    'Rebun123': ['Rebun']
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
    tagColor: 'Ghostwhite',
    glow: true,
    glowSize: '22px',
    glowColor: '#3104B4',
    users: {
        'Golden_Hybrid,_Animatronic_Breaker': 'Founder',
        'Jacob_The_FluX_Ov3r_Ki11': 'Bureaucrat',
        'Toy_Bonnie_2': 'Bureaucrat',
        'HugeClockTowerFan': 'Bureaucrat',
        'Taz_Da_Wolf': 'Admin',
        'BenTheDrowned': 'Admin',
        'Kosh_naranek': 'Admin',
        'Oswald_the_Unlucky_Rabbit': 'Admin',
        'TheAquuaHybrid': 'Admin',
        'Vyris': 'Admin',
        'DARK_CHICA': 'Admin',
        'DroidUnit774': 'Moderator',
        'Dan_and_Phil_1987': 'Chat Moderator',
        'Bonnie_The_King_Bunny': 'Chat Moderator',
        'Didn%27tMangleBeheadYou': 'Chat Moderator',
        'Glem3': 'Chat Moderator',
    }
};