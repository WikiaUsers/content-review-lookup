/***************************************
 * Massive extension for user tags     *
 ***************************************/
window.UserTagsJS = {
    modules: {},
    tags: {
        bureaucrat: {u: 'Major', link: 'Project:Bureaucrats', order: 1},
        sysop: {u: 'Captain', link: 'Project:Administrators', order: 101},
        chatmoderator: {u: 'First Lieutenant', order: 101},
        inactive: {u: 'Inactive', order: 102},
        bot: {u: 'Bot', order: 103},
        user: {u: 'Private First Class', order: 104},
        test1: {u: 'Tester', order: 105},
        mwdesign: {u: 'Main Wiki Designer', order: 106},
        usa: {u: 'U.S.A. Tanker', order: 107},
        brit: {u: 'British Tanker', order: 108},
        german: {u: 'German Tanker', order: 109},
        japan: {u: 'Japanese Tanker', order: 110},
        china: {u: 'Chinese Tanker', order: 111},
        bannedfromchat: {u: 'Dismissed from the Tankern\'s Lobby', order: 112},
        rollback: {u: 'Loader', order: 0}
    }
};
UserTagsJS.modules.custom = {
    'Master Ceadeus 27': ['test1', 'usa']
};
UserTagsJS.modules.mwGroups = ['bureaucrat', 'sysop', 'bot', 'user', 'bannedfromchat', 'blocked', 'mwdesign', 'usa', 'brit', 'german', 'japan', 'china', 'bannedfromchat', 'rollback'];
UserTagsJS.modules.prefLanguages = true;
UserTagsJS.modules.prefCoding = true;
UserTagsJS.modules.metafilter = {
	'user': ['sysop', 'bureaucrat', 'chatmoderator', 'rollback'],
        'sysop': ['bureaucrat'],
        'chatmoderator': ['sysop', 'bureaucrat']
        
};