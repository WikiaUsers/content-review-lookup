/* Any JavaScript here will be loaded for all users on every page load. */

// Auto-refresh
window.ajaxPages = ["Special:RecentChanges", "Special:Watchlist", "Special:Log", "Special:Contributions", "Special:WikiActivity"];
window.AjaxRCRefreshText = 'Auto-refresh';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page';

//Last Edited Config
window.lastEdited = {
    avatar: false
};

// MessageWallUserTags
window.MessageWallUserTags = {
    tagColor: 'red',
    glow: true,
    glowSize: '15px',
    glowColor: '#f77',
    users: {
        // Admins and Moderators of the wiki.
        'ThunderGemios10': 'Founder, Bureaucrat',
        'Light.Runner.Explorer': 'Admin',
        'BobbytheBlobby': 'Admin',
        'The_GreatPerhaps': 'Admin',
        'TheDimensionalUser': 'Forum Moderator',
        '2Actimv': 'Forum Moderator',
        'SaltyPearl7152': 'Forum Moderator',
        
        // Special People :)
        'Рanamaniac': 'Wiki Designer',
    }
};

//Reorder of User Profile Tags
window.UserTagsJS = {
	modules: {},
	tags: {

founder: { u:'Founder', order:-1 },
        // Important stuff
		bureaucrat: { u:'Bureaucrat', order:0 },
		sysop: { u:'Admin', order:0 },
		contentmoderator: { u:'Content Moderator', order:0 },
		threadmoderator: { u:'Forum Moderator', order:0 },
		chatmoderator: { u:'Chat Moderator', order:0 },
		rollback: { u:'Rollback', order:0 },
		autoconfirmed: { u:'Autoconfirmed User', order:0 },
		
		// Extra Profile tags.
		wikidesigner: { u:'Wiki Designer', order:0 },
		
	},
	oasisPlaceBefore: ''
};