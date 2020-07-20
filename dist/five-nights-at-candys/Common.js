/* Any JavaScript here will be loaded for all users on every page load. */


importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});

window.UserTagsJS = {
	modules: {},
	tags: {
		Contmod: { u:'Content Moderator', order:-1/0 },
		ContentMod: 'Head Of Content Moderators',
		Coowner: 'Co-Owner',
		Owner: 'Trained Penguin',
		Found: 'Retired Owner',
		CEO: 'CEO'
	}
};

UserTagsJS.modules.mwGroups = ['Owner', 'Co-owner'];

UserTagsJS.modules.custom = {
    'PalomonsF': ['Owner', 'Found'],
    'Scientedfic': ['CEO'],
};

// Namespace for notiplus
window.notiplus = window.notiplus || {};
// Settings for notiplus
notiplus.url = '/wiki/Project:Notiplus?action=render';
notiplus.cookiePrefix = 'notiplus';
notiplus.consentRequired = false;
notiplus.reverseOrder = false;
notiplus.lang = 'en';



importArticles({
    type: "script",
    articles: [
        "u:dev:MediaWiki:Medals/code.js",
        "w:c:dev:MediaWiki:Countdown/code.js",
        "w:c:dev:UserTags/code.js"
    ]
});