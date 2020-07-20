/* Any JavaScript here will be loaded for all users on every page load. */

importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});

importArticles({
    type: 'script',
    articles: [
        //...
        'w:c:dev:DISPLAYTITLE/code.js',
        //...
    ]
});

$("#hide").click(function(){
    $("p").hide();
});

$("#show").click(function(){
    $("p").show();
});

window.UserTagsJS = {
	modules: {},
	tags: {}
};
UserTagsJS.modules.inactive = 30;
UserTagsJS.modules.newuser = true;
UserTagsJS.modules.autoconfirmed = true;
// NOTE: bannedfromchat displays in Oasis but is not a user-identity group so must be checked manually
UserTagsJS.modules.mwGroups = ['bureaucrat', 'chatmoderator', 'patroller', 'rollback', 'sysop', 'bannedfromchat', 'bot', 'bot-global'];
UserTagsJS.modules.metafilter = {
	sysop: ['bureaucrat', 'founder'],
	bureaucrat: ['founder'],
	chatmoderator: ['sysop', 'bureaucrat']
};
importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});

window.UserTagsJS = {
	modules: {},
	tags: {
		jshelper: { u: 'JavaScript', order: 100 },
		csshelper: { u: 'CSS', order: 101 },
		templatehelper: { u: 'Templates', order: 102 },
		bureaucrat: { order: 1 }
	}
};
UserTagsJS.modules.custom = {
	'Jorre22225': ['csshelper', 'templatehelper', 'jshelper'] // NOTE: order of list here does NOT matter
};
UserTagsJS.modules.mwGroups = ['bureaucrat', 'sysop'];
importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});