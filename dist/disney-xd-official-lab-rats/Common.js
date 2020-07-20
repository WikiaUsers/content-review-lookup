// **********************************************
// User Tags - http://dev.wikia.com/wiki/UserTags
// **********************************************
 
window.UserTagsJS = {
	modules: {},
	tags: {
                bureaucrat: { u: 'Mission Leader', order: -1 },
                sysop: { u: 'Mission Specialist', order: 0 },
                rollback: { u: 'Rollbacker', order: 1 },
                chatmoderator: { u: 'Eddy', order: 2 },
        }    
 
};
 
UserTagsJS.modules.mwGroups = ['bureaucrat', 'sysop', 'rollback', 'chatmoderator'];
UserTagsJS.modules.autoconfirmed = false;
UserTagsJS.modules.newuser = { days: 2, edits: 5, namespaces: 0 };
UserTagsJS.modules.inactive = { days: 30, namespaces: [0] }; 
UserTagsJS.modules.metafilter = { 
          
};
// *****************************
// Beginning of Script importing
// *****************************
 
importArticles({
    type: "script",
    articles: [
        "w:c:dev:UserTags/code.js"
    ]
});