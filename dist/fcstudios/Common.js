/******************** Any JavaScript here will be loaded for all users on every page load. *********************/
/******************** Importing articles *********************/
importArticles({
    type: 'script',
    articles: [
    ]
});

/******************** UserTags *********************/
/** Dissabling override **/
(window.dev = window.dev || {}).profileTags = { noHideTags: true };

/** Custom UserTags **/
window.UserTagsJS = {
	modules: {},
	tags: {
		founder: { u: 'Founder', order: 108 },
		fcstudios: { u: 'FCStudios', order: 109 },
		leadprogrammer: { u: 'Lead Programmer', order: 110 },
	}
};
/** Users **/
UserTagsJS.modules.custom = { // NOTE: order of list here does NOT matter //
	'Fcstudios' : ['fcstudios', 'leadprogrammer'],
	'JoasJSD' : ['founder'],
};
UserTagsJS.modules.mwGroups = ['founder', 'bureaucrat', 'sysop'];