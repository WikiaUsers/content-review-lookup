/* Any JavaScript here will be loaded for all users on every page load. */

window.UserTagsJS = {
	modules: {},
	tags: {
        bureaucrat: {u:'Bureaucrat'},
        founder: {u:'Founder'},
        sysop: {u:'Administrator'},
        chatmoderator: {u:'Chat Moderator'},
        rollback: {u:'Rollback'},
        threadmoderator: {u:'Forum Moderator'},
        sic: {u:'Second in Command'},
        coder: {u:'Coder'},
        assassin: {u:'Master Assassin'},
	}
};
UserTagsJS.modules.custom = {
    /*'Nightrap':[],*/
    'Withered Toy Bonnie Bunny':['sic', 'assassin'],
    /*'Pushing Guy':[],*/
    'TheSecondEdgeOfTheBlade': ['coder'],
    /*'KittySL':[],*/
};
 
UserTagsJS.modules.mwGroups = [
    'bureaucrat', 
    'moderator',
    'chatmoderator',
    'patroller',
    'rollback',
    'sysop',
    'bannedfromchat',
    'bot',
    'bot-global',
    'newuser'
];
UserTagsJS.modules.metafilter = { 
    sysop: ['bureaucrat', 'founder'],
    chatmoderator: ['sysop', 'bureaucrat', 'threadmoderator'], 
    rollback: ['sysop', 'content-moderator'], 
    threadmoderator: ['sysop'], 
    newuser: ['chatmoderator', 'bannedfromchat', 'newuser'] 
};
UserTagsJS.modules.autoconfirmed = false;
UserTagsJS.modules.isblocked = true;
UserTagsJS.modules.inactive = 30; // 30 days
UserTagsJS.modules.newuser = false;

window.MessageWallUserTags = {
    tagColor: 'GhostWhite',
    glow: true,
    glowSize: '10px',
    glowColor: 'Crimson',
    users: {
        'Nightrap' : 'Head of Command',
        'Withered Toy Bonnie Bunny' : 'Second in Command',
        'Pushing Guy' : 'Administrator',
        'TheSecondEdgeOfTheBlade' : 'Wiki Coder',
        'KittySL' : 'Moderator'
    }
};