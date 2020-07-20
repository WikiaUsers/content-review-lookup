/* ------
Hi, I'm [[User:DapperFiz]]
PLEASE don't edit JS unless you know what you're doing
it breaks easily
------ */
window.UserTagsJS = {
	modules: {},
	tags: {
	    founder: {u:'Founder'},
	    bureaucrat: {u:'Bureaucrat'},
	    sysop: {u:'Administrator'},
	    threadmoderator: {u:'Discussions Moderator'},
	    chatmoderator: {u:'Chat Moderator'},
	    //idfk if custom tags will be a thing
	}
};
UserTagsJS.modules.custom = {
    'Grumpisimo': ['founder'],
    'The Haze3456': ['bureaucrat'],
}
 
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
    bureaucrat: ['founder'],
    sysop: ['bureaucrat'],
    threadmoderator: ['sysop', 'bureaucrat'],
    chatmoderator: ['sysop', 'bureaucrat', 'threadmoderator'],
    rollback: ['sysop', 'bureaucrat'],
    newuser: ['chatmoderator']
};

window.MessageWallUserTags = {
    tagColor: '#c94f16',
    glow: true,
    glowSize: '22px',
    glowColor: '#000000',
    users: {
        'Grumpisimo': 'Founder',
        'The Haze3456': 'Bureaucrat',
        
    }
};