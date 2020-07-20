window.UserTagsJS = {
	modules: {},
	tags: {
            bureaucrat: { u: 'BUREAUCRAT', order: 1 },
            wikimanager: { u:'WIKI MANAGER', order: 2 },
            sysop: { u: 'SYSOP', order: 3 },
            moderator: {u: 'MODERATOR', order: 4 },
            'content-moderator': {u: 'CONTENT MODERATOR', order: 5 },
            threadmoderator: {u: 'DISCUSSIONS MODERATOR', order: 6 },
            rollback: {u: 'ROLLBACK', order: 7 }, 
            formerstaff: {u: 'FORMER STAFF', order: 8 },
            discordmoderator: {u: 'DISCORD MODERATOR', order: 9 },
            newuser: { u: 'NEW EDITOR', order: 10 }
	}
};

UserTagsJS.modules.custom = {
    'TheEpikPenguin': ['moderator'],
    'SirSc3ptic': ['moderator'],
    'WeathermanEvan': ['moderator'],
    'Wolfman5580': ['sysop'],
    'NateTehNoobRBLX': ['sysop'],
    'Evita128': ['rollback'], 
    'Poepiemax123': ['rollback'], 
    'CelestialCheese': ['bureaucrat'],
    'AmpharosXie': ['bureaucrat'], 
    'Okay Timing': ['bureaucrat'], 
    'TrollStick591': ['bureaucrat'], 
    'Sir123skills': ['discordmoderator'],
    'Swinsie': ['discordmoderator'],
    'Jayaero': ['formerstaff'], 
    'ProfessorMedea': ['formerstaff'],
    'WinterSkiis': ['content-moderator']
};

UserTagsJS.modules.newuser = { //autoconfirmed
	days: 7, // Must have been on the Wiki for 7 days
	edits: 5, // And have at least 5 edits to remove the tag
	namespace: [0, 'Talk', 'User talk', 'Forum'] // Edits must be made to articles to count
};

window.ajaxSpecialPages = ["Recentchanges", "WikiActivity"];