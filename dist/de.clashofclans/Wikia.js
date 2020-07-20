window.UserTagsJS = {
	modules: {},
	tags: {
        'bureaucrat': { 
            u: 'Bürokrat',
            m: 'Bürokrat',
            f: 'Bürokratin',
            order: 1,
            link:'Clash of Clans Wiki:Bürokraten'
        },
        'sysop': { 
            u: 'Administrator',
            m: 'Administrator',
            f: 'Administratorin',
            order: 2,
            link:'Clash of Clans Wiki:Administratoren'
        },
        'realsysop': { 
            u: 'Technischer Administrator',
            m: 'Technischer Administrator',
            f: 'Technische Administratorin',
            order: 2,
            link:'Clash of Clans Wiki:Administratoren'
        },
        'vstf': {link:'Hilfe:VSTF'},
        'vanguard': { u: 'Vanguard', link:'Hilfe:Vanguard'},
        'global-discussions-moderator': {
            u: 'Globaler Diskussions-Moderator',
            m: 'Globaler Diskussions-Moderator',
            f: 'Globale Diskussions-Moderatorin',
            link:'Hilfe:Globale Diskussions-Moderatoren'
        },
        'bot': { u: 'Bot-Konto', link:'Hilfe:Bots'},
        'council': {link:'Hilfe:Community Council'},
        'semiaktiv': { u: 'Sporadisch aktiv'},
        'bannedfromchat': { u: 'Aus dem Chat verbannt'},
        'helper': {link:'Hilfe:Helfer'},
        'founder': { u: 'Wiki-Gründer', link:'Clash of Clans Wiki:Administration'},
        'threadmoderator': { 
            u: 'Moderator',
            m: 'Moderator',
            f: 'Moderatorin',
            order: 4,
            link:'Clash of Clans Wiki:Moderatoren'
        },
        'content-moderator': { 
            u: 'Super-Moderator',
            m: 'Super-Moderator',
            f: 'Super-Moderatorin',
            order: 3,
            link:'Clash of Clans Wiki:Super-Moderatoren'
        },
        'chatmoderator': { 
            u: 'Chat-Moderator',
            m: 'Chat-Moderator',
            f: 'Chat-Moderatorin',
            order: 5, 
            link:'Clash of Clans Wiki:Chat-Moderatoren'
        },
        'rollback': { 
            u: 'Rollback-Benutzer',
            m: 'Rollback-Benutzer',
            f: 'Rollback-Benutzerin',
            order: 6, 
            link:'Clash of Clans Wiki:Rollback-Benutzer'
        },
        'youtuber': {
            u: 'Wiki-Youtuber',
            m: 'Wiki-Youtuber',
            f: 'Wiki-Youtuberin',
        },
        'champion9': {
            u: 'Rh9-Turnier-Sieger',
            m: 'Rh9-Turnier-Sieger',
            f: 'Rh9-Turnier-Siegerin',
        },
        'champion10': {
            u: 'Rh10-Turnier-Sieger',
            m: 'Rh10-Turnier-Sieger',
            f: 'Rh10-Turnier-Siegerin',
        },
        'champion11': {
            u: 'Rh11-Turnier-Sieger',
            m: 'Rh11-Turnier-Sieger',
            f: 'Rh11-Turnier-Siegerin',
        },
        'supercell': {
            u: 'Supercell Community-Manager',
            m: 'Supercell Community-Manager',
            f: 'Supercell Community-Managerin',
        }
	}
};

UserTagsJS.modules.mwGroups = ['staff', 'wiki-manager', 'content-team-member', 'helper', 'vstf', 'global-discussions-moderator', 'vanguard', 'council', 'bureaucrat', 'sysop', 'content-moderator', 'threadmoderator', 'chatmoderator', 'rollback', 'bot'];

UserTagsJS.modules.userfilter = {
    //'AmonFatalis': ['sysop'],
    'IchMachMucke': ['bureaucrat'],
    'DarkBarbarian': ['global-discussions-moderator', 'vanguard', 'council']
};
UserTagsJS.modules.metafilter = {
	'chatmoderator': ['content-moderator'],
	'threadmoderator': ['content-moderator'],
	'rollback': ['content-moderator']
};
UserTagsJS.modules.custom = {
    'Clash of Clans Wikia': ['bot', 'sysop'],
    //'AmonFatalis': ['realsysop'],
    'Reazor': ['youtuber'],
    'Krümelmonsta97': ['champion9'],
    'HockeTW': ['champion10'],
    'MrMobilefanboyFred': ['youtuber'],
    'Tobi bs': ['champion11'],
    'SkelA.de': ['champion9'],
    'SwissDaggy': ['champion10'],
    'AUT-Aventador': ['champion11'],
    'Dennis - Clash of Clans': ['supercell'],
    'Stefan - Clash of Clans CM': ['supercell'],
    'Missbrauchsfilter': ['bot', 'sysop'],
    'NicoHohadler': ['champion9'],
    'Braindeadwulf': ['champion10'],
    'Body95': ['champion11']
};

// ClashRoyale-Link
$('#ClashRoyaleLink').appendTo('header#WikiaPageHeader');