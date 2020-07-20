/* Any JavaScript here will be loaded for all users on every page load. */

//Custom user tags
window.UserTagsJS = {
	modules: {
		inactive: { // Edits must be to content namespaces
			days: 30,
			namespaces: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
			zeroIsInactive: false
		},
		mwGroups: [
            'bureaucrat',
            'chatmoderator',
            'rollback',
            'sysop',
            'bannedfromchat',
            'bot',
            'bot-global',
            'threadmoderator'
        ],
		autoconfirmed: false,
		newuser: false,
		metafilter: {
			bot: ['bot-global'],
		},
	},
    tags: {
        bot: { u: 'Bot' },
        chatmoderator: { u:'Ayudante de Nieve', order: 102 },
        rollback: { u: 'Reversor', f: 'Reversora', order: 103 },
        sysop: { u: 'Experto en Frozen', f: 'Experta en Frozen', order: 101 },
        bureaucrat: { u: 'Reina Elsa de Arendelle', order: 100 },
        inactive: { u: 'Inactivo', f: 'Inactiva' }
    }
};

/* Auto updating recent changes opt-in
 * See w:c:dev:AjaxRC for info & attribution 
 */
 
AjaxRCRefreshText = 'Auto-refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page';
ajaxPages = ["Special:RecentChanges","Special:WikiActivity"];

importArticles({
type: 'script',
articles: [
'u:dev:YoutubePlayer/code.js'
]
});