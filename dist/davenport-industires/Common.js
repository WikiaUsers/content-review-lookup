// **********************************************
// User Tags - http://dev.wikia.com/wiki/UserTags
// **********************************************
 
window.UserTagsJS = {
	modules: {},
	tags: {
                bureaucrat: { u: 'Publisher', order: -1 },
                sysop: { u: 'Engineer', order: 0 },
                rollback: { u: 'Reviewer', order: 1 },
                chatmoderator: { u: 'Desk Worker', order: 2 },
        }    
              
};

UserTagsJS.modules.mwGroups = ['bureaucrat', 'sysop', 'rollback', 'chatmoderator'];
UserTagsJS.modules.autoconfirmed = false;
UserTagsJS.modules.newuser = { days: 1, edits: 5, namespaces: 0 };
UserTagsJS.modules.inactive = { days: 40, namespaces: [0] }; 
UserTagsJS.modules.metafilter = { 
          founder: ['Author'],
                 
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