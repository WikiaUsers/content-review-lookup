/* Any JavaScript here will be loaded for all users on every page load. */
window.UserTagsJS = {
	modules: {},
	tags: {
        'rollback': { u:'Coal',link:'Project:Tags#Staff_Tags'},
        'chatmoderator': {u:'Iron', link:'Project:Tags#Staff_Tags'},
        'threadmoderator': {link:'Project:Tags#Staff_Tags'},
        'content-moderator': {link:'Project:Tags#Staff_Tags'},
        'sysop': {link:'Project:Tags#Staff_Tags'},
        'bureaucrat': {link:'Project:Tags#Staff_Tags'},
        'founder': {link:'Project:Tags#Staff_Tags'},
        'inactive': {link:'Project:Tags#User_Tags'},
        'nonuser': { u:'Ghost', link:'Project:Tags#User_Tags'},
        'notautoconfirmed': { u:'Noob', link:'Project:Tags#User_Tags'},
        'newuser': { u:'Enderman', link:'Project:Tags#User_Tags'},
        'html': { u:'HTML Developer', link:'Project:Tags#Utility_Tags'},
        'css': { u:'CSS Developer', link:'Project:Tags#Utility_Tags'},
        'js': { u:'JavaScript Developer', link:'Project:Tags#Utility_Tags'},
        'code': { u:'Code Developer', link:'Project:Tags#Utility_Tags'},
        'hiatus': { u:'On Hiatus', link:'Project:Tags#Utility_Tags'},
        'former': { u:'Former Staff', link:'Project:Tags#Utility_Tags'},
        'demoted': { u:'Demoted Staff', link:'Project:Tags#Utility_Tags'},
        'sketchy': { u:'Sketchy Staff', link:'Project:Tags#Utility_Tags'},
        'untrust': { u:'Untrustworthy Staff', link:'Project:Tags#Utility_Tags'},
        'vip': { u:'VIP', link:'Project:Tags#Title_Tags'},
        'mvp': { u:'MVP', link:'Project:Tags#Title_Tags'},
        'yt': { u:'Youtuber', link:'Project:Tags#Title_Tags'},
        'masteryt': { u:'Master Youtuber', link:'Project:Tags#Title_Tags'},
        'illegal': { u:'Illegal', link:'Project:Tags#Title_Tags'},
        'dnt': { u:'Do Not Trust', link:'Project:Tags#Title_Tags'},
        'Staff': { u:'Official Staff Member', link:'Project:Tags#Staff_Tags'},
        'gmm': { u:'Global Master Moderator', link:'Project:Tags#Staff_Tags'},
        'smm': { u:'Social Master Moderator', link:'Project:Tags#Staff_Tags'},
        'cmm': { u:'Content Master Moderator', link:'Project:Tags#Staff_Tags'},
        'mod': { u:'Moderator', link:'Project:Tags#Staff_Tags'},
	},
	oasisPlaceBefore: ''
};

UserTagsJS.modules.custom = {
    'RavenKing123': ['founder', 'Staff'],
    'NoHaxJustPolar': ['founder', 'Staff'],
    'Firedtnt': ['Staff'],
    'TimmyTally2': ['Staff'],
    'Brandon Rhea': ['mvp'],
    'Kirkburn': ['mvp'],
};

UserTagsJS.modules.userfilter = {
    'RavenKing123': ['bureaucrat', 'sysop'],
    'NoHaxJustPolar': ['bureaucrat', 'sysop'],
};

UserTagsJS.modules.mwGroups =  ['bannedfromchat', 'blocked', 'bot', 'bureaucrat', 'chatmoderator', 'checkuser', 'content-moderator', 'council', 'helper', 'rollback', 'staff', 'sysop', 'threadmoderator', 'vanguard', 'vstf'];

UserTagsJS.modules.metafilter = {
    'newuser': ['notautoconfirmed', 'Staff'],
    'inactive': ['hiatus'],
    'demoted': ['untrust'],
    'notautoconfirmed': ['Staff'],
    'nonuser': ['Staff'],
    'untrust': ['founder'],
    'vip': ['Staff'],
    'mvp': ['Staff'],
    'yt': ['Staff'],
    'masteryt': ['Staff'],
    'illegal': ['founder'],
};

UserTagsJS.modules.implode = {
    'code': ['html', 'css', 'js'],
    'demoted': ['Staff', 'former'],
    'gmm': ['content-moderator', 'threadmoderator'],
    'cmm': ['content-moderator', 'chatmoderator'],
    'smm': ['rollback', 'threadmoderator'],
    'mod': ['chatmoderator', 'rollback'],
};

UserTagsJS.modules.explode = {
    
};

UserTagsJS.modules.inactive = {
	days: 15,
	namespaces: [0, 'Talk', 'User talk', 'Forum'],
	zeroIsInactive: true,
};

UserTagsJS.modules.nonuser = true;

UserTagsJS.modules.autoconfirmed = true;

UserTagsJS.modules.newuser = {
	days: 3,
	edits: 10, 
	namespace: 0 
};

highlight = {
    selectAll: true,
    nonuser: 'white',
    rollback: 'black',
    chatmoderator: 'lightgray',
    threadmoderator: 'gold',
    'content-moderator': 'aqua',
    sysop: 'purple',
    bureaucrat: 'DarkSlateGray',
    users: {
        RavenKing123: 'orange',
        NoHaxJustPolar: 'orange',
    }
};
importArticles({
    type: 'script',
    articles: [
        'u:dev:HighlightUsers/code.js',
        "u:dev:MediaWiki:Medals/code.js"
    ]
});