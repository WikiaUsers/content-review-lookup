// **********************************************
// User Tags - http://dev.wikia.com/wiki/UserTags
// **********************************************

window.UserTagsJS = {
	modules: {},
	tags: {
	}
};
UserTagsJS.modules.mwGroups = ['bureaucrat', 'sysop', 'rollback'];
UserTagsJS.modules.autoconfirmed = false;
UserTagsJS.modules.inactive = { days: 30, namespaces: [0] };

// *****************************
// Beginning of Script importing
// *****************************
 
importArticles({
    type: "script",
    articles: [
        "w:c:dev:UserTags/code.js"
    ]
});