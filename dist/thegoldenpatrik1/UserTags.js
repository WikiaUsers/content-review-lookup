/////////////////////////////////////////////////////////////////////////
/***********************************************************************/
/******************************* UserTags ******************************/
/***********************************************************************/
/////////////////////////////////////////////////////////////////////////
/* Tag Creation */
window.UserTagsJS = {
    modules: {},
    tags: {
        /** Global FANDOM Groups **/
        staff: { link: 'Help:Community_Team' },
        helper: { link: 'Help:Volunteers_and_Helpers#Helpers' },
        vstf: { link: 'Help:VSTF' },
        'global-discussions-moderator': { link: 'Help:Global_Discussions_moderators' },
        voldev: { link: 'Help:Volunteer_Developers' },
        vanguard: { link: 'Help:Vanguard' },
        council: { link: 'Help:Community_Council' },
        authenticated: { link: 'Help:User_rights#Authenticated' },
        'bot-global': { link: 'Help:Bots' },
 
 
        /** Local Groups **/
        'check-user': { link: 'Help:CheckUser' },
        bot: { order: 100, link: 'Help:Bots' },
        rot: { u: 'Rogue Bot', order: 200, link: 'Help:Bots' },
        founder: { order: 300, link: 'Help:Founders' },
        bureaucrat: { order: 400, link: 'Help:User_rights#Bureaucrats' },
        sysop: { order: 500, link: 'Help:User_rights#Administrators' },
        'content-moderator': { order: 625, link: 'Help:User_rights#Content_Moderators' },
        threadmoderator: { order: 650, link: 'Help:User_rights#Discussions_Moderators' },
        chatmoderator: { order: 675, link: 'Help:User_rights#Chat_Moderators' },
        rollback: { order: 700, link: 'Help:User_rights#Rollbacks' },
        blocked: { order: 300, link: 'Help:Blocking' }
    },
};//End TC*/
 
 
/* Custom Tags */
UserTagsJS.modules.custom = {
    'USERNAME': ['founder']//In case his rights are lost
};//End CT*/
 
/* Functionality Modules */
UserTagsJS.modules.newuser = false;
UserTagsJS.modules.inactive = false;
UserTagsJS.modules.autoconfirmed = false;
UserTagsJS.modules.mwGroups = ['staff', 'helper', 'vstf', 'global-discussions-moderator', 'voldev', 'vanguard', 'council', 'authenticated', 'bot-global', 'bot', 'checkuser', 'founder', 'bureaucrat', 'sysop', 'content-moderator', 'threadmoderator', 'chatmoderator', 'rollback', 'blocked'];//End FM*/
 
/* Meta Filter */
UserTagsJS.modules.metafilter = {
    bot: ['bot-global', 'blocked'],
    founder: ['blocked'],
    bureaucrat: ['bureaucrat'],
    sysop: ['bot', 'blocked', 'founder'],
    'content-moderator': ['bot', 'blocked', 'founder', 'bureaucrat', 'sysop'],
    threadmoderator: ['bot', 'blocked', 'founder', 'bureaucrat', 'sysop'],
    chatmoderator: ['bot', 'blocked', 'founder', 'bureaucrat', 'sysop', 'threadmoderator'],
    rollback: ['bot', 'blocked', 'founder', 'bureaucrat', 'sysop', 'content-moderator'],
};//End MF*/
 
 
/* Implode */
UserTagsJS.modules.implode = {
    'rot': ['bot', 'blocked']
};//End Implode*/