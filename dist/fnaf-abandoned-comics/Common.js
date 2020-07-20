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
		role: { u:'Roleplayer'},
                blog: { u:'Blog Post King'},
                prev: { u:'Previous Head of Command'},
                one: { u:'Head of Command'},
                two: { u:'Second In Command'},
                three: { u:'Third In Command'},
                former: { u:'Former Roleplayer'},
                change: { u:'Changed Account'},
	}
};
 
UserTagsJS.modules.custom = {
	'Taz Da Wolf': ['coder', 'role'],
	'Dismantled Foxy The Pirate': ['former'],
        'Dionderek.almiranez': ['role'],
        'Old Freddy Fazbear': ['role'],
        'DoubleTake8': ['role'],
        'Marionettewithstyle': ['role'],
        'Mangledmeddlingmetal': ['role', 'three', 'prev', 'coder'],
        'Marionetta the fading rift': ['role'],
        'Tom13': ['role'],
        'Golden Hybrid, Animatronic Breaker': ['role'],
        'Sean the Artic Fox': ['role', 'one'],
        'Dilly Mah Femalez': ['change'],
        'SecretOfTheNight': ['role', 'two'],
        'UltimateSonicGame123': ['role', 'blog', 'prev'],
        'Mr.Endoskely': ['role'],
        'AquaMassage': ['former'],
        'Adam Fazbear': ['former'],
        'Bluesarethebest': ['role'],
        'Fox flames': ['role'],
        'Mr.dippe759': ['role'],
        'SwizzySwag': ['role'],
        'PopRox6012': ['role'],
        'LogicalAnalyst47': ['role'],
        'Bed head zed': ['role'],
        'Ben10fan3': ['former'],
        'Carkle the Animatronic': ['former'],
        'ChicaTheCreepyChicken': ['former'],
        'Dark Pit Knows Best': ['former'],
        'DeadninjaGaming': ['former'],
        'Doomwyre12': ['former'],
        'Freddy Fazbear 666 FTW': ['former'],
        'HTFCuddles': ['former'],
        'Jalbardigmail.com23': ['former'],
        'Mapmaker023': ['former'],
        'Mario31073': ['former'],
        'Minecraftfan9999': ['former'],
        'Miss icyfox': ['former'],
        'Ramadaan': ['former'],
        'XXToy ChicaXx': ['former'],
};
 
UserTagsJS.modules.mwGroups = ['bureaucrat', 'moderator', 'chatmoderator', 'patroller', 'rollback', 'sysop', 'bannedfromchat', 'bot', 'bot-global', 'newuser'];
UserTagsJS.modules.metafilter = { sysop: ['bureaucrat', 'founder'], chatmoderator: ['sysop', 'bureaucrat', 'rollback'], rollback: ['sysop'], newuser: ['chatmoderator', 'bannedfromchat', 'newuser'] };
UserTagsJS.modules.autoconfirmed = false;
UserTagsJS.modules.isblocked = true;
UserTagsJS.modules.inactive = 30; // 30 days
UserTagsJS.modules.newuser = false;
UserTagsJS.modules.userfilter = {
};