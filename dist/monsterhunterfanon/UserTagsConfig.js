/***************************************
 * Massive extension for user tags     *
 ***************************************/
/**************************************
 * List of MediaWiki Tag Associations *
 Bureaucrat: Guild Headmaster
 Administrator: Guildmaster
 Chat Mod: Tavern Bouncer
 Rollbacker: Guild Officer
 Bot: Felyne Comrade
 User: Hunter
 Inactive user: Has Not edited Recently
 Blocked: Currently Blocked
 Chat Banned: Banned from Tavern
 * List of made-up tags and their JS association *
 mwdesign: Main Wiki Designer
 ffauthor: Fan Fiction Author
 mauthor: Monster Author
 aauthor: Area Author
 gigas: Project Gigas
 * Notes on usage and who-gets-what * 
 * Please only give the users who /want/ the tags   *
 * a fitting tag, like aauthor or ffauthor. If they *
 * don't want the tag, don't give it to them. Thanks*
 * for cooperation                                  *
*****************************************************/
window.UserTagsJS = {
    modules: {},
    tags: {
        bureaucrat: {u: 'Guild Headmaster', link: 'Project:Bureaucrats', order: 1},
        sysop: {u: 'Guildmaster', link: 'Project:Administrators', order: 101},
        chatmoderator: {u: 'Tavern Bouncer', order: 101},
        inactive: {u: 'Has not edited recently', order: 102},
        bot: {u: 'Felyne Comrade', order: 103},
        user: {u: 'Hunter', order: 104},
        test1: {u: 'Tester', order: 105},
        mwdesign: {u: 'Main Wiki Designer', order: 106},
        ffauthor: {u: 'Fan Fiction Author', order: 107},
        mauthor: {u: 'Monster Author', order: 108},
        aauthor: {u: 'Area Author', order: 109},
        gigas: {u: 'Project Gigas', order: 110},
        blocked: {u: 'Currently blocked', order: 111},
        bannedfromchat: {u: 'Banned from Tavern', order: 112},
        rollback: {u: 'Guild Officer', order: 0}
    }
};
UserTagsJS.modules.custom = {
    'Master Ceadeus 27': ['test1', 'aauthor', 'mauthor', 'ffauthor'],
    'Setheo': ['mwdesign'],
    'Abhi09': ['mwdesign'],
    'UkantorEX': ['ffauthor', 'mauthor']
};
UserTagsJS.modules.mwGroups = ['bureaucrat', 'sysop', 'bot', 'user', 'bannedfromchat', 'blocked', 'mwdesign', 'ffauthor', 'mauthor', 'aauthor', 'gigas', 'chatmoderator', 'test1', 'rollback'];
UserTagsJS.modules.prefLanguages = true;
UserTagsJS.modules.prefCoding = true;