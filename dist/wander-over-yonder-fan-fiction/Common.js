// **********************************************
// User Tags - http://dev.wikia.com/wiki/UserTags
// **********************************************
 
window.UserTagsJS = {
	modules: {},
	tags: {
                bureaucrat: { u: 'Commander', order: -1 },
                sysop: { u: 'Alpha Watchdog', order: 0 },
                rollback: { u: 'Beta Watchdog', order: 1 },
                chatmoderator: { u: 'Watchdog', order: 2 },
                montheditor: { u: 'Editor of the Month' },
                yeareditor: { u: 'Editor of the Year' },
              
        }
};
UserTagsJS.modules.custom = { 
          'User1': ['montheditor']
          
};

UserTagsJS.modules.mwGroups = ['bureaucrat', 'sysop', 'rollback', 'chatmoderator'];
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