// **********************************************
// User Tags - http://dev.wikia.com/wiki/UserTags
// **********************************************
  
window.UserTagsJS = {
	modules: {},
	tags: {
                 bureaucrat: { order: -1/0 },
                 bot: { u:'Bot' , order: 0 },
                 sysop: { u:'Administrator' , order: 1 },
                 codeeditor: { u:'Code Editor' , order: 2 },
                 forumadministrator: { u:'Forum Administrator' , order: 3 },   
                 forummoderator: { u:'Forum Moderator' , order: 4 }, 
                 imagecontrol: { u:'Image Control' , order: 5 },   
                 blogpolice: { u: 'Blog Police' , order: 6 },                                
                 rollback: { order: 7 },
                 autopatrol: { u:'Autopatrol' , order: 8 },
                 chatmoderator: { order: 9 },
                 montheditor: { u:'Editor of the Month' },
                 yeareditor: { u:'Editor of the Year' },
                 }
};
UserTagsJS.modules.custom = { 
           'User1': ['montheditor'],
           'User2': ['yeareditor']
};
UserTagsJS.modules.mwGroups = ['bureaucrat', 'sysop', 'codeeditor', 'rollback', 'forummoderator', 'forumadministrator', 'imagecontrol', 'autopatrol', 'chatmoderator', 'founder', 'blogpolice', 'bot'];
UserTagsJS.modules.autoconfirmed = false;
UserTagsJS.modules.newuser = { days: 10, edits: 4, namespaces: 0 };
UserTagsJS.modules.inactive = { days: 30, namespaces: [0] }; 
UserTagsJS.modules.metafilter = { 
           bureaucrat: ['founder', 'techbcrat'],
           sysop: ['founder', 'techadmin'],
           rollback: ['founder', 'techadmin', 'techbcrat'],
           chatmoderator: ['founder', 'techadmin', 'techbcrat']
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


window.MessageWallUserTags = {
    tagColor: 'blue',
    glow: true,
    glowSize: '15px',
    glowColor: '#000080',
    users: {
        'HypercaneTeen': 'Founder',
        'Ultimate_Dark_Carnage': 'Administrator',
    }
};

// *****************************
// Beginning of Script importing
// ***************************** 

importArticles({
    type: 'script',
    articles: [
        //other scripts,
        'u:dev:MessageWallUserTags/code.js'
    ]
});