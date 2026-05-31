/* Any JavaScript here will be loaded for all users on every page load. */

importArticles({
    type: 'script',
    articles: [
        'MediaWiki:Common.js/mastheadBoxes.js' /* Masthead ranks ~ EditedByOwnslo */
    ]
});
/* TEST CODE (If Break Delete IT)*/
/* Custom Status Icon based on PAGE PROTECTION */


/* -----------------Admin TAGS-----------------*/
/* --------- 1 --------- */
/* Custom user tags */
/* -------- 1.1 -------- */
/* Initializing the custom user tags */
window.UserTagsJS = {
    modules: {},
    tags: {
        former_staff: { u: 'Former Drednot Wiki Staff', order: 100 },
        impactful: { u: 'Impactful Editor', order: 101 },
        bureaucrat: { order: 1 },
        founder: { u: 'Drednot Wiki Founder', order: 0 }
    }
};


/* -------- 1.2 -------- */
/* Remove the Administrator user tag from Bureaucrats */
UserTagsJS.modules.metafilter = {
    sysop: ['bureaucrat'],
};


/* -------- 1.3 -------- */
/* '123 bst': ['founder'], */
/* Manually giving the custom user tags to users */
UserTagsJS.modules.custom = {
    'Ownslo': ['impactful'],
};


/* -------- 1.4 -------- */
/* Inactive users who have not edited the wiki for more than 40 days */
UserTagsJS.modules.inactive = {
    days: 40,
    zeroIsInactive: true,
    namespaces: [0],
    custom: {
        'inactive-6m': { days: 180, tag: 'Inactive >6 Months' },
        'inactive-1y': { days: 365,  tag: 'Inactive >1 Year' },
        'inactive-2y': { days: 730,  tag: 'Inactive >2 Years' },
        'inactive-5y': { days: 1825, tag: 'Abandoned Account' }
    }
};

UserTagsJS.modules.mwGroups = [
    'inactive',
    'inactive-6m',
    'inactive-1y',
    'inactive-2y',
    'inactive-5y'
];

UserTagsJS.modules.metafilter = {
    'inactive':    ['inactive-6m', 'inactive-1y', 'inactive-2y', 'inactive-5y'],
    'inactive-6m': ['inactive-1y', 'inactive-2y', 'inactive-5y'],
    'inactive-1y': ['inactive-2y', 'inactive-5y'],
    'inactive-2y': ['inactive-5y']
};

/* -------- 1.5 -------- */
/* New wiki editors & disable the autoconfirmed user tag */
UserTagsJS.modules.autoconfirmed = false;
// Add new user Config
UserTagsJS.modules.newuser = {
	namespace: 0, // Edits must be made to articles to count
	computation: function(days, edits) {
		// Newuser is removed as soon as the user gets 10 edits, OR as soon as they have been present for 5 days, whichever happens first
		return days < 5 && edits < 10;
	}
};