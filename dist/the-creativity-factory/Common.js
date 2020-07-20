importArticles({
    type: "script",
    articles: [
        "w:c:dev:RevealAnonIP/code.js",
        "w:c:dev:DisplayClock/code.js",
        "w:c:dev:Countdown/code.js"
    ]
});
 
/***User Tags***/
window.UserTagsJS = {
	modules: {},
	tags: {
		// group: { associated tag data }
		Bertie: 'That guy',
		Jet: 'An aeroplane',
		Keyz: 'The master lokey',
		Pam: 'Banana-nii-chan',
		Sam: 'President Uvil',
 
	}
};
//Custom
UserTagsJS.modules.custom = {
	'BRTE500': ['Bertie'],
	'Advancedpwng': ['Jet'],
	'LordKeyZ': ['Keyz'],
	'Vanity Chaos': ['Pam'],
	'SamjaySyndrome': ['Sam'],
};
importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});
 
importArticles({
    type: "script",
    articles: [
        "w:dev:AjaxRC/code.js",
    ]
});
/* Auto Refresh */
AjaxRCRefreshText = 'Auto-Refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page';
ajaxPages = ["Special:RecentChanges","Special:WikiActivity"];