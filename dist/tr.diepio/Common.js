/////////////////////////////////////////////////////////////////////////
/*********************** User Tags Configuration ***********************/
/////////////////////////////////////////////////////////////////////////
/* Tag Creation */
window.UserTagsJS = {
    modules: {},
    tags: {
        /** Global FANDOM Groups **/
        staff: {
            link: 'Yardım:Community Team'
        },
        helper: {
            link: 'Yardım:Volunteers and Helpers#Helpers'
        },
        vstf: {
            link: 'Yardım:SpamTaskForce'
        },
        'global-discussions-moderator': {
            link: 'Yardım:Global Discussions moderators'
        },
        voldev: {
            link: 'Yardım:Volunteer Developers'
        },
        vanguard: {
            link: 'Yardım:Vanguard'
        },
        council: {
            link: 'Yardım:Community Council'
        },
        'content-volunteer': {
            link: 'w:c:community:Thread:1401657'
        },
        authenticated: {
            link: 'Yardım:User rights#Authenticated'
        },
        'bot-global': {
            link: 'Yardım:Bots'
        },


        /** Local Groups **/
        blocked: {
            link: 'Özel:Contact/blocked',
            order: 100
        },
        bannedfromchat: {
            link: 'Yardım:Chat',
            order: 875
        },
        'check-user': {
            link: 'Yardım:CheckUser'
        },
        bot: {
            link: 'Yardım:Bots',
            order: 300
        },
        founder: {
            link: 'Yardım:Founders',
            order: 450
        },
        bureaucrat: {
            link: 'Yardım:Bureaucrats\' how-to guide',
            order: 475
        },
        sysop: {
            link: 'Yardım:Administrators\' how-to guide',
            order: 500
        },
        'content-moderator': {
            link: 'Yardım:User rights#Content Moderators',
            order: 525
        },
        threadmoderator: {
            link: 'Yardım:User rights#Discussions Moderators',
            order: 550
        },
        chatmoderator: {
            link: 'Yardım:Chat#Chat moderators',
            order: 575
        },
        rollback: {
            link: 'Yardım:User rights#Rollbacks',
            order: 600
        }
    }
};//End TC*/

/* Functionality Modules */
UserTagsJS.modules.newuser       = false;
UserTagsJS.modules.inactive      = false;
UserTagsJS.modules.autoconfirmed = false;
UserTagsJS.modules.mwGroups      = [
    'blocked',
    'bannedfromchat',
    'staff',
    'helper',
    'vstf',
    'global-discussions-moderator',
    'voldev',
    'vanguard',
    'council',
    'content-volunteer',
    'authenticated',
    'bot-global',
    'bot',
    'checkuser',
    'founder',
    'bureaucrat',
    'sysop',
    'content-moderator',
    'threadmoderator',
    'chatmoderator',
    'rollback'
];//End FM*/

/* Custom Tags */
UserTagsJS.modules.custom = {
    'Haayrullahh':       ['founder']
};//End CT*/

/* Meta Filter */
UserTagsJS.modules.metafilter = {
    bot:                 ['bot-global'],
    bureaucrat:          ['bot', 'founder'],
    sysop:               ['bot', 'bureaucrat'],
    'content-moderator': ['bot', 'bureaucrat', 'sysop'],
    threadmoderator:     ['bot', 'bureaucrat', 'sysop'],
    chatmoderator:       ['bot', 'bureaucrat', 'sysop', 'threadmoderator'],
    rollback:            ['bot', 'bureaucrat', 'sysop', 'content-moderator']
};//End MF*/

/////////////////////////////////////////////////////////////////////////
/******************************* Imports *******************************/
/////////////////////////////////////////////////////////////////////////
importArticle({
    type: 'script',
    article: 'u:elderscrolls:MediaWiki:Common.js/DiscussionsLinks.js'
});