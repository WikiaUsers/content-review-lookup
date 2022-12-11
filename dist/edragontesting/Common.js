window.BackToTopModern = true;


importArticles({
    type: "script",
    articles: [
		"u:dev:MediaWiki:BackToTopButton/code.js",
		"u:dev:MediaWiki:AjaxRC.js",
		"MediaWiki:Usernames.js",
		"MediaWiki:HeroSkins.js",
		"MediaWiki:Toggle.js",
		"MediaWiki:Protection.js",
		"MediaWiki:AOTM.js",
		"MediaWiki:Walkthrough.js",
		"MediaWiki:WikiNotification.js",
		"MediaWiki:WallGreetingTweak.js",
		'MediaWiki:Numeral.js', // Defines num.format('<fmt>')
		"MediaWiki:Modifiers.js",
		"MediaWiki:ClanHouseGenerator.js",
		"MediaWiki:Sandbox.js", //JS testing area for small things
    ]
});

/*User Tags Configuration*/
window.UserTagsJS = {
        modules: {},
        tags: {
        	moderator: { u: 'Moderator' },
        	sysop: { u: 'Administrator' },
        	threadmoderator: { u: 'Discussions Moderator' },
            formerstaff: { u: 'Former Staff', title: 'This user was formerly a Wiki Staff member.' },
            imageeditor: { u: 'Image Editor' },
            inactive: { u: 'Inactive', title: 'This user hasn\'t edited in the last 30 days.' },
            blocked: { title: 'This user is currently blocked.' },
            newuser: { u: 'New Editor', title: 'This user is new to the wiki.' },
            notautoconfirmed: { u: 'New User', title: 'This user is new to FANDOM.'}
        }
    };
    
    UserTagsJS.modules.inactive = 30;
	UserTagsJS.modules.newuser = {
		computation: function(days, edits) {
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
        'map-tester',
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
        sysop:           ['bureaucrat', 'bot'],
        'content-moderator': ['bureaucrat', 'sysop'],
        threadmoderator: ['bureaucrat', 'sysop'],
        rollback:        ['bureaucrat', 'sysop', 'moderator', 'content-moderator', 'threadmoderator'],
    };
    
    UserTagsJS.modules.implode = {
		'moderator': ['threadmoderator', 'content-moderator'],
    };
    
    UserTagsJS.modules.custom = {
        'FaceBound': ['imageeditor'],
    };