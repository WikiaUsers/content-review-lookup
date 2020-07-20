/* Any JavaScript here will be loaded for all users on every page load. */
 
function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
    $("span.insertusername").html(wgUserName);
 }
 addOnloadHook(UserNameReplace);
 
importArticle({ type:'script', article: 'w:c:dev:UserTags/code.js' });
 
window.UserTagsJS = {
	modules: {},
	tags: {
		a: { u: 'Coder', order:1 },
		b: { u: 'Scribe', order:2 },
		c: { u: 'Necromancer', order:3 },
		d: { u: 'Senior', order:4 },
}
};
 
UserTagsJS.modules.inactive = 35;
UserTagsJS.modules.autoconfirmed = true;
UserTagsJS.modules.custom = {
	'Pschycron': ['b', 'a', 'd', 'c']
};
 
importScriptPage('ChatTags/code.js', 'dev');
 
importArticles({
    type: "script",
    articles: [
        "w:c:dev:RevealAnonIP/code.js"
    ]
});
 
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
        'u:dev:FloatingToc/code.js'
    ]
});
 
importArticles({
    type: 'script',
    articles: [
        'u:dev:ExtendedNavigation/code.js'
    ]
});