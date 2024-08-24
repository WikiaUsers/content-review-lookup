/* Anpassungen für AjaxRC */
window.ajaxPages = ['Spezial:Letzte_Änderungen','Spezial:WikiActivity'];
window.AjaxRCRefreshText = 'Auto-Aktualisierung';
window.AjaxRCRefreshHoverText = 'Automatische Aktualisierung der kompletten Seite';

// UserTags
window.UserTagsJS = {
	modules: {},
	tags: {
        'klasse1a': {
            u: 'Klasse 1-A',
            order: 1e101,
            link:'My Hero Academia Wiki:Teams'
        },
        'ligaderboesen': { 
            u: 'Liga der Bösen',
            order: 1e101,
            link:'My Hero Academia Wiki:Teams'
        },
        'oneforall': { 
            u: 'One For All',
            order: 1e101,
            link:'My Hero Academia Wiki:Teams'
        },
        'sysop': {
            u: 'Profiheld',
            f: 'Profiheldin',
            link:'My Hero Academia Wiki:Administratoren'
        },
        'content-moderator': {
            u: 'Sidekick'
        }
    }
};

UserTagsJS.modules.mwGroups = [
    'bureaucrat',
    'chatmoderator',
    'threadmoderator',
    'content-moderator',
    'rollback',
    'sysop',
    'bannedfromchat',
    'bot',
    'bot-global',
    'vanguard',
    'vstf',
    'wiki-manager',
    'content-team-member',
    'global-discussions-moderator',
    'staff'
];

UserTagsJS.modules.custom = {
	'RainA': ['klasse1a'],
	'DarkBarbarian': ['ligaderboesen']
};

UserTagsJS.modules.metafilter = {
	'bureaucrat': ['sysop'],
	'chatmoderator': ['sysop'],
	'content-moderator': ['sysop'],
	'threadmoderator': ['sysop'],
	'content-volunteer': ['vanguard','global-discussions-moderator','vstf','helper','wiki-manager','content-team-member'],
	'vanguard': ['global-discussions-moderator','vstf','helper','wiki-manager','content-team-member'],
	'global-discussions-moderator': ['vstf','helper','wiki-manager','content-team-member']
};

UserTagsJS.modules.userfilter = {
    'RainA': ['vstf', 'wiki-manager']
};