
 
function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
    $("span.insertusername").html(wgUserName);
 }
 addOnloadHook(UserNameReplace);
 
importScriptPage('ChatTags/code.js', 'dev');
 
importArticles({
    type: "script",
    articles: [
        "w:c:dev:RevealAnonIP/code.js"
    ]
});
 
window.UserTagsJS = {
	modules: {},
	tags: {
		autoconfirmed: { u: 'Cadet', order:1 },
		b: { u: 'Tactician', order:2 },
		coder: { u: 'Coder', order:3 },
		d: { u: 'Senior', order:4 },
		e: { u: 'Veteran', order:5 },
		f: { u: 'Warlord', order:6 },
inactive: { u:'Deserter', order:7 }
},
oasisPlaceBefore: '> h1'
};
 
UserTagsJS.modules.inactive = 35;
UserTagsJS.modules.autoconfirmed = true;
UserTagsJS.modules.custom = {
	'Slug gunner fan': ['b', 'd', 'e', 'f'],
	'Pschycron': ['b', 'coder', 'd', 'e'],
	'OrkMarine': ['b', 'd', 'e'],
	'Basilisk Centauri': ['d'],
};
 
importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});
 
importArticles({
    type: 'script',
    articles: [
        // ...
        'w:c:dev:ReferencePopups/code.js',
        // ...
    ]
});
 
importArticles({
    type: 'script',
    articles: [
        'u:dev:SearchSuggest/code.js'
    ]
});
 
importArticles({
    type: 'script',
    articles: [
        'u:dev:ExtendedNavigation/code.js'
    ]
});
 
importArticles({
    type: 'script',
    articles: [
        'u:dev:SexyUserPage/code.js'
    ]
});