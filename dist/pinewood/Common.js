/* Any JavaScript here will be loaded for all users on every page load. */
window.UserTagsJS = {
	modules: {},
	tags: {
            'bot': {
                u: 'Bot',
                order: -1/0 
            },
            bureaucrat: { 
                u: 'Bureaucrat',
                order: 1 
            },
            sysop: {
                u: 'Administrator',
                order: 2
            },
            moderator: {
                u: 'Moderator',
                order: 3
            },
            'content-moderator': {
                u: 'Content Moderator',
                order: 4 
            },
            threadmoderator: {
                u: 'Discussion Moderator',
                order: 5 
            },
            newuser: { 
                u: 'New User',
                order: 6
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
var MessageBlock = {
  title : 'Blocked',
  message : 'You have been blocked for $2 because you have $1. If you wish to appeal this block please contact me or another administrator.',
  autocheck : true
};