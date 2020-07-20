// **********************************************
// User Tags - http://dev.wikia.com/wiki/UserTags
// **********************************************
 
window.UserTagsJS = {
	modules: {},
	tags: {
                bureaucrat: { u:'Co-Leader' , order: -1/0 },
                sysop: { u:'Elite Demon Guard' , order: 1 },
                threadmoderator: { u:'Guard' , order: 2 },
                rollback: { u:'Castle Guard' , order: 3 },
                chatmoderator: { u:'Demon Guard' , order: 4 },
                montheditor: { u:'Editor of the Month' },
                yeareditor: { u:'Editor of the Year' }
        }
};
UserTagsJS.modules.custom = { 
          'User1': ['montheditor'],
          'User2': ['yeareditor']
};
UserTagsJS.modules.mwGroups = ['bureaucrat', 'sysop', 'threadmoderator', 'rollback', 'chatmoderator'];
UserTagsJS.modules.autoconfirmed = false;
UserTagsJS.modules.newuser = { days: 4, edits: 10, namespaces: 0 };
UserTagsJS.modules.inactive = { days: 30, namespaces: [0] }; 
UserTagsJS.modules.metafilter = { 
          bureaucrat: ['founder'],
          sysop: ['founder'] 
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