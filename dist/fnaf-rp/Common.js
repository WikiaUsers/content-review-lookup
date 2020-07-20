/* Any JavaScript here will be loaded for all users on every page load. */
/* This code was put together with various snippets of code from [[w:c:dev]], or the Dev Wiki! */
/* Auto refresh */
window.ajaxPages = [
    "Special:NewFiles",
    "Blog:Recent posts",
    "Special:WikiActivity",
    "Special:RecentChanges",
    "Special:Watchlist",
    "Special:Log",
    "Special:Contributions"
];

/* QuickDelete [Categories ONLY] */
window.category = 'Candidates for deletion';
window.reason = 'Marked for deletion';

window.UserTagsJS = {
	modules: {},
	tags: {
	   	bureaucrat: {u:'Bureaucrat', link:'Project:Staff#Bureaucrats'},
        founder: {u:'Founder', link:'Project:Staff#Bureaucrats'},
        sysop: {u:'Admin', link:'Project:Staff#Admins'},
        chatmoderator: {u:'Chat moderator', link:'Project:Staff#Chat_Moderators'},
        rollback: {u:'Rollback', link:'Project:Staff#Rollbacks'},
        threadmoderator: {u:'Moderator', link:'Project:Staff#Moderators'},
        vy: {u:'Matt Hargreaves'},
        coder: {u:'Wiki Coder'},
        test: {u:'Coding Test'},
        yeetmod: {u:'Yeet Mod'},
        burn: {u:'Awesome-est guy'},
	}
};
UserTagsJS.modules.custom = {
    'Vyris': ['vy'],
    'Xersin': ['coder','bureaucrat'],
    'The Name Is Nick': ['rollback'],
    'Fireburn12': ['founder', 'burn'],
    'Foxdini': ['yeetmod','bureaucrat'],
    'Jillips Entertainment': ['yeetmod'],
    'HugeClockTowerFan': ['co-owner'],
    'LeTesla': ['owner'],
};
UserTagsJS.modules.metafilter = {
	'inactive': ['sysop', 'bureaucrat'], 
	'sysop': ['bureaucrat'],
	'chatmoderator': ['sysop', ['patroller', 'rollback']]
};

window.MessageWallUserTags = {
    tagColor: 'Ghostwhite',
    glow: true,
    glowSize: '22px',
    glowColor: '#3104B4',
    users: {
        'Fireburn12': 'Founder',
        'Xersin': 'Owner',
        'Foxdini': 'Bureaucrat',
        'HugeClockTowerFan': 'Bureaucrat',
        'Vyris': 'Admin',
        'The_Name_Is_Nick': 'Rollback',
        'Jillips_Entertainment': 'Moderator',
        'Springy_Boy': 'Chat Moderator',
    }
};