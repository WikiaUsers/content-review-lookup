/*
    Replaces {{USERNAME}} with the name of the user browsing the page.
    Requires copying Template:USERNAME.
*/
 
$(function() {
    if (window.disableUsernameReplace || mw.config.get('wgUserName') === null) { return; }
    $('span.insertusername').html(mw.config.get('wgUserName'));
});

// **********************************************
// User Tags - http://dev.wikia.com/wiki/UserTags
// **********************************************

window.UserTagsJS = {
    modules: {},
    tags: {
        bureaucrat: {u:'Bureaucrat', order: -1/0 },
        bot: { u:'bot' , order: 0 },
        sysop: { u:'Senior Administrator' , order: 1 },
        'content-moderator': { u:'Junior Administrator', order: 2 },
        threadmoderator: { order: 3 },
        rollback: { u:'Rollback', order: 4 },
        chatmoderator: { u:'Chatroom Moderator', order: 5 },
        montheditor: { u:'Editor of the Month' },
        yeareditor: { u:'Editor of the Year' },
        newuser: { u:'New User'},
        inactive: { u:'Inactive'},
    }
};
UserTagsJS.modules.custom = {
};
UserTagsJS.modules.mwGroups = [
    'bureaucrat',
    'bot',
    'sysop',
    'content-moderator',
    'threadmoderator',
    'rollback',
    'chatmoderator'
];
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
    type: 'script',
    articles: [
        'u:dev:UserTags/code.js'
    ]
});/* Any JavaScript here will be loaded for all users on every page load. */