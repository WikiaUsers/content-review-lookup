/* Any JavaScript here will be loaded for all users on every page load. */
window.UserTagsJS = {
	modules: {},
	tags: {
            'bot': {
                u: 'Bot',
                order: -1/0 
            },
            owner: { 
                u: 'Wiki Owner',
                order: 1
            },
            maintainer: { 
                u: 'Wiki Maintainer',
                order: 2 
            },
            bureaucrat: { 
                u: 'Bureaucrat',
                order: 5
            },
            sysop: {
                u: 'Administrator',
                order: 6
            },
            moderator: {
                u: 'Moderator',
                order: 7
            },
            'content-moderator': {
                u: 'Content Moderator',
                order: 8
            },
            threadmoderator: {
                u: 'Discussion Moderator',
                order: 9
            },
            facilitator: { 
                u: 'PB Facilitator',
                order: 3 
            },
            pia: { 
                u: 'PIA Member',
                order: 4
            },
            newuser: { 
                u: 'New User',
                order: 10
            }
	}
};
UserTagsJS.modules.implode = {
    'moderator': ['content-moderator','threadmoderator']
};
UserTagsJS.modules.mwGroups = ['bannedfromchat', 'blocked', 'bot', 'bot-global' , 'bureaucrat',  'checkuser', 'content-moderator', 'council', 'helper', 'rollback', 'staff', 'sysop', 'threadmoderator', 'vanguard', 'soap']
UserTagsJS.modules.newuser = { // should be equal to auto-confirmed
	days: 3,
	edits: 0,
	namespace: 0
};
UserTagsJS.modules.custom = {
	'CombatSwift': ['owner'], // NOTE: order of list here does NOT matter
    'Coasterteam': ['facilitator'], // NOTE: order of list here does NOT matter
    'WickyTheUnicorn': ['pia'], // NOTE: order of list here does NOT matter
    'Superstefano4': ['pia'], // NOTE: order of list here does NOT matter
    'Ood23doc': ['pia'], // NOTE: order of list here does NOT matter
    'CorruptBIOS': ['maintainer'], // NOTE: order of list here does NOT matter
    'Powershell_exe': ['maintainer'] // NOTE: order of list here does NOT matter
};
var MessageBlock = {
  title : 'Blocked',
  message : 'You have been blocked for $2 because you have $1. If you wish to appeal this block please contact me or another administrator.',
  autocheck : true
};