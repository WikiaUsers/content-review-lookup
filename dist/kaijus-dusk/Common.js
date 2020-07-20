importArticles({
    type: "script",
    articles: [
        "w:c:dev:RevealAnonIP/code.js",
        "w:c:dev:DisplayClock/code.js",
        "w:c:dev:Countdown/code.js"
    ]
});

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
		Sage: 'Vampire',
                Kain: ' ',
                Sumi: 'Poyo',
                Blair: 'Ice Goddess',

	}
};
//Custom
UserTagsJS.modules.custom = {
	'Mensager110': ['Sage'], 
	'Sjelen Kain': ['Kain'],
	'Sumiyo': ['Sumi'],
	'Mizimena Blaire': ['Blair'],

};
importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});