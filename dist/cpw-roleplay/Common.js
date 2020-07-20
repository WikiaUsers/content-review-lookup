// **********************************************
// User Tags - http://dev.wikia.com/wiki/UserTags
// **********************************************
 
window.UserTagsJS = {
	modules: {},
	tags: {
                bureaucrat: { order: -1/0 },
                sysop: { u:'Administrator' , order: 1 },
                rollback: { order: 2 },
                threadmoderator: { order: 3 },
                chatmoderator: { order: 4 },
                montheditor: { u:'Editor of the Month' },
                yeareditor: { u:'Editor of the Year' }
        }
};
UserTagsJS.modules.custom = { 
          'User1': ['montheditor'],
          'User2': ['yeareditor']
};
UserTagsJS.modules.mwGroups = ['bureaucrat', 'sysop', 'rollback', 'threadmoderator', 'chatmoderator'];
UserTagsJS.modules.autoconfirmed = false;
UserTagsJS.modules.newuser = { days: 4, edits: 10, namespaces: 0 };
UserTagsJS.modules.inactive = { days: 30, namespaces: [0] }; 
UserTagsJS.modules.metafilter = { 
          bureaucrat: ['founder'],
          sysop: ['founder'],
          rollback: ['founder'],
          threadmoderator: ['founder'],
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