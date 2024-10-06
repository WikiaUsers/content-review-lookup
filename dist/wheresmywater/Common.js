/* Any JavaScript here will be loaded for all users on every page load. */

//Automated User Pages
window.AutoCreateUserPagesConfig = {
    content: {
        2:'{{sub'+'st:MediaWiki:Welcome-user-page}}',
        3:false,
        1202:false
    },
    summary:'Automatic Creation'
};

//Back to top JS import style setting
window.BackToTopModern = true;

//Imports
importArticles({
    type: 'script',
    articles: [
		'u:dev:MediaWiki:AutoCreateUserPages.js',
		"u:dev:MediaWiki:BackToTopButton/code.js",
		'u:dev:UserTags/code.js',
        'MediaWiki:Protection.js',
		'MediaWiki:AOTM.js',
		'MediaWiki:Walkthrough.js',
		'MediaWiki:Usernames.js',
		'MediaWiki:WikiNotification.js',
		'MediaWiki:Toggle.js',
    ]
});

//User Tags
window.UserTagsJS = {
        modules: {},
        tags: {
        	moderator: { u: 'Moderator' },
        	sysop: { u: 'Administrator' },
        	threadmoderator: { u: 'Discussions Moderator' },
            formerstaff: { u: 'Former Staff', title: 'This user was formerly a Wiki Staff member.' },
            legend: {u: 'Wiki Legend', title: 'This user has made outstanding contributions to the wiki.' },
            inactive: { u: 'Inactive', title: 'This user hasn\'t edited recently.' },
            blocked: { title: 'This user is currently blocked.' },
            newuser: { u: 'New Editor', title: 'This user is new to the Where\'s My Water? Wiki.' },
            notautoconfirmed: { u: 'New User', title: 'This user is not an autoconfirmed user.'}
        }
    };
    
    UserTagsJS.modules.inactive = 60;
	UserTagsJS.modules.newuser = {
		computation: function(days, edits) {
			/*newuser is removed when the user gets 30 edits OR 
			  when they have been present for 7 days*/
			return days < 7 && edits < 30;
		}
	};
	UserTagsJS.modules.autoconfirmed = true;
    UserTagsJS.modules.mwGroups = [
        'bureaucrat',
        'sysop',
        'content-moderator',
        'threadmoderator',
        'rollback',
        'bot',
        'bot-global',
        'blocked', 
        'checkuser',
        'council',
        'helper',
        'staff',
        'vanguard',
        'soap'
    ];
    
    UserTagsJS.modules.metafilter = {
    	inactive: ['bureaucrat', 'sysop', 'bot'], //Remove inactive tag from users with certain groups
        sysop:           ['bureaucrat', 'bot'], //Bot has sysop rights so it can edit protected pages
        'content-moderator': ['bureaucrat', 'sysop'],
        threadmoderator: ['bureaucrat', 'sysop'],
        rollback:        ['bureaucrat', 'sysop', 'moderator', 'content-moderator', 'threadmoderator'],
    };
    
    UserTagsJS.modules.implode = {
		'moderator': ['threadmoderator', 'content-moderator'],
    };
    
    UserTagsJS.modules.custom = {
        'Blitzflame99': ['formerstaff'],
        'Catfan660': ['formerstaff'],
        'Codebreak1': ['formerstaff', 'legend'],
        'Laugh Attack Videos': ['formerstaff'],
        'Pinkgalaxy': ['formerstaff'],
        'Sboy13': ['formerstaff', 'legend'],
        'Jordan853': ['legend'],
        'E12Dragon': ['legend'],
    };
    
//Lock old comments time limit
window.lockOldComments.limit = 90;