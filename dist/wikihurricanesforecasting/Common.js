/* Any JavaScript here will be loaded for all users on every page load. */

importArticles({
	type: 'script',
	articles: [
	    'w:c:dev:UserTags/code.js', // User tags
		'u:dev:DisplayClock/code.js', // Display clock
		'u:dev:LastEdited/code.js', // Last edited
	]
});

// Clock configuration
window.DisplayClockJS = '%2H:%2M:%2S %p %2d %{January;February;March;April;May;June;July;August;September;October;November;December}m %Y (UTC)';
// User tag configuration
window.UserTagsJS = {
	modules: {},
	tags: {
		rollback: { u:'WHFC Staff' },
		founder:  { u:'Webmaster / WHFC Staff' },
		autoconfirmed: { u:' ' },
		staff: { u:'Wikia Staff' },
		
	}
};
window.lastEdited = {
    avatar: false,
    size: false,
    diff: false,
    comment: false,
    time: 'timestamp',
    lang: 'en',
    namespaces: {
        include: [0],
        exclude: []
    },
    pages: ["Wiki-Hurricanes Forecasting Wikia"]
};

// MassCategorization module for WHFC
massCategorizationDelay = 1000;
importScriptPage('MassCategorization/code.js', 'dev');