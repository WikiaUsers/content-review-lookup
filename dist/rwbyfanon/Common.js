importArticles({
    type: "script",
    articles: [
        "w:c:dev:RevealAnonIP/code.js",
        "w:c:dev:DisplayClock/code.js",
        "w:c:dev:Countdown/code.js"
    ]
});

/***Refresh***/
window.AjaxRCRefreshText = 'Auto-refresh';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page';
window.ajaxPages = ['Special:RecentChanges', 'Special:WikiActivity'];
 
window.nullEditDelay = 1000;

/***User Tags***/
window.UserTagsJS = {
	modules: {},
	tags: {
		// group: { associated tag data }
		Tsu: 'Maple Syrup',
                Flora: 'Resident Artist',
                Hype: 'Not Tank',
                Amet: 'Duck',
 
	}
};
//Custom
UserTagsJS.modules.custom = {
	'Tsubori': ['Tsu'], 
	'Winter Edition': ['Flora'],
        'BurningHype': ['Hype'],
        'Amet Revfold': ['Amet'],

};
importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});