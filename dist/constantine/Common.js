window.UserTagsJS = {
	modules: {},
	tags: {
		bureaucrat: { order: -1/0 }
	}
};
UserTagsJS.modules.mwGroups = ['bureaucrat', 'sysop'];
UserTagsJS.modules.autoconfirmed = false;
 
importArticles({
    type: "script",
    articles: [
        'w:c:dev:UserTags/code.js'
    ]
});