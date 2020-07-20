// Any JavaScript here will be loaded for all users on every page load.
// Code is working; do not edit without telling an experienced coder

importArticles({
    type: "script",
    articles: [
        'u:dev:DisplayClock/code.js',
        'u:dev:MessageWallUserTags/code.js',
        'w:c:dev:UserTags/code.js',
        'MediaWiki:Common.js/minx.js',
        'w:c:dev:AjaxRC/code.js',
        'u:dev:MessageBlock/code.js',
        'u:dev:LastEdited/code.js',
        'u:dev:GiveChatModPrompt/code.js'
    ]
});
 
// Auto refresh
window.ajaxPages = ["Special:NewFiles","Blog:Recent posts","Special:WikiActivity","Special:RecentChanges","Special:Watchlist","Special:Log","Special:Contributions"];
window.AjaxRCRefreshText = 'Auto-refresh';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page';

// User tags
window.UserTagsJS = {
	modules: {},
	tags: {
		bureaucrat: { u:'Bureaucrat'},
        coder: { u:'Wiki Coder'},
		role: { u:'Roleplayer'},
		aquu: {u:'Asslord'},
		dremora: {u:'Dremora God'},
		toybonnie: {u:'Dremora Goddess'},
		whalemouth: {u:'Barrel Roll'},
		ygf: {u: 'Yandere Sim Fanatic'},
		foxyoh: {u: 'Furry'},
		sunset: {u: 'The Rainbow'},
		sasuke: {u: 'Sasuke Uchiha'},
		insanity: {u: 'Human Bill Cipher'},
		ben: {u: 'Ben the Drowned One'},
		goldie: {u:'Golden Freddy'},
		scratch: {u:'Vinyl Scratch'},
		rainbiw: {u:'Shibbles'},
		owner: {u: 'Owner'},
		freddy: {u: 'Freddy Fazbear'},
		assie: {u:'A Drunk'},
	}
};
 
// Tag applications
UserTagsJS.modules.custom = {
	'Taz Da Wolf': ['coder'],
	'TheAquuaHybrid': ['aquu'],
    'Dremora Stormcloak': ['breaker','dremora'],
    'Toy Bonnie 2': ['toybonnie'],
    'Whalemouth': ['whalemouth'],
    'BenTheDrowned': ['ygf','ben' ,'owner' ,'coder'],
    'Foxy Oh foxy the pirate': ['foxyoh'],
    'General Phychodash': ['sunset','insanity','assie'],
    'Vyris': ['sasuke'],
    'SketchNebula': ['goldie', 'scratch'],
    'Rainbowsmash34': ['rainbiw'],
};

// User tag filters
UserTagsJS.modules.mwGroups = ['bureaucrat', 'moderator', 'chatmoderator', 'patroller', 'rollback', 'sysop', 'bannedfromchat', 'bot', 'bot-global', 'newuser'];
UserTagsJS.modules.metafilter = { sysop: ['bureaucrat', 'founder'], chatmoderator: ['sysop', 'bureaucrat', 'rollback'], rollback: ['sysop'], newuser: ['chatmoderator', 'bannedfromchat', 'newuser'] };
UserTagsJS.modules.autoconfirmed = false;
UserTagsJS.modules.isblocked = true;
UserTagsJS.modules.inactive = 30; // 30 days
UserTagsJS.modules.newuser = false;
UserTagsJS.modules.userfilter = {
};

// Message wall user tags
window.MessageWallUserTags = {
    tagColor: 'Ghostwhite',
    glow: true,
    glowSize: '22px',
    glowColor: '#3104B4',
    users: {
        'Dremora Stormcloak': 'Founder',
        'HugeClockTowerFan': 'Bureaucrat',
        'Young BenDrowned': 'Bureaucrat',
        'Dan_and_Phil_1987': 'Bureaucrat',
        'DARK_CHICA': 'Bureaucrat',
        'DroidUnit774': 'Bureaucrat',
        'Whalemouth': 'Bureaucrat',
        'Kingfireblast': 'Bureaucrat',
        'Toy_Bonnie_2': 'Bureaucrat',
        'TheAquuaHybrid': 'Admin',
        'FFoxyThePirateFox': 'Admin',
        'Vyris': 'Admin',
        'SketchNebula': 'Admin',
        'Female_Foxy_1987': 'Moderator',
        'ThePuppet1987': 'Moderator',
        'Majin_Symbiote_(Kaine_Flow)': 'Moderator',
        'Tyrannosaurus_dude11': 'Chat Moderator',
        'Avvhovhk': 'Chat Moderator',
        'Springy_Boy': 'Chat Moderator',
        'Didn%27tMangleBeheadYou': 'Chat Moderator',
        'Foxy_Oh_foxy_the_pirate': 'Chat Moderator',
        'GforGolden': 'Chat Moderator',
        'Dalokohs_Pootis_Spencer': 'Chat Moderator',
    }
};

// Block message
var MessageBlock = {
  title : 'Block',
  message : 'You have been blocked for $2 because $1'
};