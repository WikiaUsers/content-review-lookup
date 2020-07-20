/* Any JavaScript here will be loaded for all users on every page load. */
// User tags
window.UserTagsJS = {
	modules: {
        inactive: 45,
		mwGroups: [
            'bureaucrat',
            'chatmoderator',
            'patroller',
            'rollback',
            'sysop',
            'bannedfromchat',
            'bot',
            'bot-global'
        ],
		autoconfirmed: true,
		metafilter: {
			sysop: ['bureaucrat'],
			chatmoderator: ['sysop'],
			rollback: ['sysop'],
		},
		newuser: true,
	},

    tags: {
        bureaucrat: {
            u:'Consul',
            link:'Project:Administrators',
            color:'white',
            title:'Bureaucrat' 
        },
		sysop: {
            u:'Council member',
            link:'Project:Administrators',
            color:'white',
            title:'Admin' 
        },
		patroller: { 
            u:'Inquisitor',
            link:'Project:Administrators',
            color:'white',
            title:'Patroller' 
        },
		rollback: {
            u:'Shadowhunter',
            link:'Project:Administrators',
            color:'white',
            title:'Rollback' 
        },
	}
};
// -end - User tags

// Spoiler and Not Final Alert
window.SpoilerAlert = {
    question: 'WARNING! This area contains either spoilers or tentative information you may not<br />want to see. Are you sure you wish to proceed?',
    yes: 'Yes, please',
    no: 'No, not yet',
    fadeDelay: 1600
};
// - end -  Spoiler and Not Final Alert

// RailWAM
window.railWAM = {
    logPage:"Project:WAM Log"
};
// - end - RailWAM

// ** Recent Wiki Activity and Recent changes auto refresh ** //
window.ajaxPages = [
    "Special:RecentChanges",
    "Special:WikiActivity"
];
// - end - Auto-refresh