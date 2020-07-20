// **********************************************
// User Tags - http://dev.wikia.com/wiki/UserTags
// **********************************************
 
window.UserTagsJS = {
	modules: {},
	tags: {
                bureaucrat: { order: -1 },
                sysop: { u: 'Administrator', order: 0 },
                patroller: { u: 'Patroller' , order: 1 },
                threadmoderator: { order: 2 },
                rollback: { u: 'Rollback', order: 3 },
                chatmoderator: { u: 'Chat Moderator', order: 4 },
                montheditor: { u: 'Editor of the Month' },
                yeareditor: { u: 'Editor of the Year' },
                fifty_fifty: { u: '50/50' }
        }
};
UserTagsJS.modules.custom = { 
          'RoxyTheRaccoon9': ['fifty_fifty']
};

UserTagsJS.modules.mwGroups = ['bureaucrat', 'sysop', 'patroller', 'rollback', 'chatmoderator'];
UserTagsJS.modules.autoconfirmed = false;
UserTagsJS.modules.newuser = { days: 4, edits: 10, namespaces: 0 };
UserTagsJS.modules.inactive = { days: 30, namespaces: [0] }; 
UserTagsJS.modules.metafilter = { 
          bureaucrat: ['founder'],
          sysop: ['founder'],
          rollback: ['founder'],
          chatmoderator: ['founder']
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