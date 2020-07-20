/* Any JavaScript here will be loaded for all users on every page load. */

window.UserTagsJS = {
	modules: {},
	tags: {
        bureaucrat: {u:'Bureaucrat'},
        founder: {u:'Founder'},
        sysop: {u:'Administrator'},
        chatmoderator: {u:'Chat Mod'},
        rollback: {u:'Rollback'},
        'content-moderator': {u:'Content Mod'},
        threadmoderator: {u:'Disc. Mod'},
        coder: {u:'Wiki Coder'},
        owner: {u:'Wiki Owner'},
        subadmin: {u:'Sub-Admin'},
        emoticon: {u:'Emoticon Artist'},
        sic: {u:'Second in Command'},
        //Non-staff
        Defi: {u:'Gif Man'},
        Focri: {u:'DaDarkness'},
        Tyran: {u:'T-Rex'},
	}
};
UserTagsJS.modules.custom = {
    'TheSecondEdgeOfTheBlade': ['owner', 'coder', 'emoticon'],
    'TechnoXenoHolic': ['sic', 'emoticon'],
    'Paradox.XXIV': ['emoticon'],
    'Good Demopan': ['subadmin'],
    'Ddefinitivo58': ['Defi'],
    'Focri': ['Focri'],
    'Tyrannosaurus dude11': ['Tyran'],
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
    chatmoderator: ['bureaucrat', 'sysop', 'subadmin', 'content-moderator', 'threadmoderator'], 
    rollback: ['sysop', 'subadmin'], 
    'content-moderator': ['bureaucrat', 'sysop', 'subadmin'],
    threadmoderator: ['sysop', 'subadmin', 'content-moderator'], 
    newuser: ['chatmoderator', 'bannedfromchat', 'newuser'] 
};
UserTagsJS.modules.autoconfirmed = false;
UserTagsJS.modules.isblocked = true;
UserTagsJS.modules.inactive = 30; // 30 days
UserTagsJS.modules.newuser = false;