/* Any JavaScript here will be loaded for all users on every page load. */

importArticle({type:'script', article:'w:c:dev:CollapsibleInfobox/code.js'});

window.UserTagsJS = {
	modules: {},
	tags: {
		water: { u:'Hydro', order: -1/0 },
		fire: { u:'Pyro', order: -1/0 },
		bitch: { u:'Hydros Bitch', order: -1/0 }
	}
};
UserTagsJS.modules.inactive = 30;
UserTagsJS.modules.newuser = true;
UserTagsJS.modules.autoconfirmed = true;
UserTagsJS.modules.mwGroups = ['bureaucrat', 'chatmoderator', 'patroller', 'rollback', 'sysop', 'bannedfromchat', 'bot',
'bot-global'];
UserTagsJS.modules.custom = {
	'Thepenguin9': ['water'],
	'Luna_Laufeyson': ['fire'],
	'Aethelhelm': ['bitch']
};
UserTagsJS.modules.metafilter = {
};
importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});

importArticle({type:'script', article:'w:c:dev:DisplayClock/code.js'});

importArticles({
    type: "script",
    articles: [
        "w:c:dev:RevealAnonIP/code.js",
    ]
});

importArticles({
    type: "script",
    articles: [
        "w:c:dev:Countdown/code.js"
    ]
});

importScriptPage('CollapsibleInfobox/code.js', 'dev');

importScriptPage('AjaxRC/code.js', 'dev');

importScriptPage('BackToTopButton/code.js', 'dev');