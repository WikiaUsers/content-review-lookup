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
                Raga: 'Bureaucrat',
                Arren: 'CSS and Coding',

 
	}
};
//Custom
UserTagsJS.modules.custom = {
	'DragonBossGala': ['Arren'], 
	'Ragadorus': ['Raga'],


};
importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});