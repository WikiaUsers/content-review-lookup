// **********************************************
// User Tags - http://dev.wikia.com/wiki/UserTags
// **********************************************
 
window.UserTagsJS = {
	modules: {},
	tags: {
                bureaucrat: { u: 'Royalty', order: -1 },
                sysop: { u: 'Witch Hunter', order: 0 },              
                patroller: { u: 'Weapon Master', order: 1 },            
                rollback: { u: 'Weapon Smith', order: 2 },
                chatmoderator: { u: 'Palace Guard', order: 3 },
                montheditor: { u: 'Editor of the Month' },
                yeareditor: { u: 'Editor of the Year' },
                fifty_fifty: { u: '50/50' },
                advisor: { u: 'Royal Adviser' },
                king: { u: 'King' }
        }
};
UserTagsJS.modules.custom = { 
          'The Great Lord David': ['advisor'],
          
          
};

UserTagsJS.modules.mwGroups = ['bureaucrat', 'sysop', 'patroller', 'rollback', 'chatmoderator'];
UserTagsJS.modules.autoconfirmed = false;
UserTagsJS.modules.newuser = { days: 4, edits: 10, namespaces: 0 };
UserTagsJS.modules.inactive = { days: 30, namespaces: [0] }; 
UserTagsJS.modules.metafilter = { 
          bureaucrat: ['Royalty'],
                 
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