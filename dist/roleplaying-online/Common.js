/* Any JavaScript here will be loaded for all users on every page load. */

/* Do not. I repeat, DO NOT edit JS unless you're Mangledmeddlingmetal,
or have gotten special permission from her. 

Just don't.*/

/*------------------------------- Imports ---------------------------------*/
importArticles
    ({type:'script',
    articles: [
        'u:dev:UserTags/code.js',
        'u:dev:MessageWallUserTags/code.js',
        'MediaWiki:Common.js/minx.js',
        'u:dev:LastEdited/code.js',
    ]
});
/*--------------------------- Banner User Tags ----------------------------*/
window.UserTagsJS = {
	modules: {},
	tags: {
        bureaucrat: {u:'Bureaucrat'},
        founder: {u:'Founder'},
        sysop: {u:'Administrator'},
        chatmoderator: {u:'Chat Mod'},
        rollback: {u:'Rollback'},
        threadmoderator: {u:'Thread Mod'},
        coder: {u:'Wiki Coder'},
        owner: {u:'Wiki Owner'},
        theme: {u:'Theme Designer'},
        retired: {u:'Retired'},
        inactive: {u:'Inactive'},
	}
};
UserTagsJS.modules.custom = {
    'TheSecondEdgeOfTheBlade': ['owner', 'coder'],
    'Daedalus The Greatest Inventor': ['retired'],
    'ZeroByNothing': ['retired'],
    'Mich2B': ['theme'],
};
 
UserTagsJS.modules.mwGroups = ['bureaucrat', 'moderator', 'chatmoderator', 'patroller', 'rollback', 'sysop', 'bannedfromchat', 'bot', 'bot-global', 'newuser'];
UserTagsJS.modules.metafilter = {
    bureaucrat: ['founder', 'owner', 'coder', 'retired', 'inactive'],
    sysop: ['bureaucrat', 'founder', 'owner', 'coder', 'theme'],
    chatmoderator: ['sysop', 'bureaucrat', 'threadmoderator'],
    rollback: ['sysop'],
    threadmoderator: ['sysop'],
    newuser: ['chatmoderator', 'bannedfromchat', 'newuser'] };
UserTagsJS.modules.autoconfirmed = false;
UserTagsJS.modules.isblocked = true;
UserTagsJS.modules.inactive = 30; // 30 days
UserTagsJS.modules.newuser = false;
UserTagsJS.modules.userfilter = {
};

/*--------------------------- Message User Tags ---------------------------*/

window.MessageWallUserTags = {
    tagColor: '#300000',
    glow: true,
    glowSize: '11px',
    glowColor: '#800000',
    users: {
        'Yeti4dayz': 'Founder',
        'TheSecondEdgeOfTheBlade': 'Owner/Coder',
        'TheColdHell': 'Administrator',
        'Mich2B': 'Theme Designer',
        /*'Are You Freddy For Ready': 'Administrator',*/
    }
};