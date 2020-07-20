/* Any JavaScript here will be loaded for all users on every page load. */

/* Any JavaScript here will be loaded for all users on every page load. */
 
importArticles({
    type: "script",
    articles: [
"u:dev:HighlightUsers/code.js",
    "w:c:dev:Countdown/code.js",
	'w:c:dev:UserTags/code.js',
	'u:dev:DisplayClock/code.js',
	'u:dev:MediaWiki:DiscordIntegrator/code.js',
	"w:dev:ShowHide/code.js", /* Collapsible elements and tables */
    "MediaWiki:Common.js/insertusername.js", /* User name replace for Template:USERNAME */
    "MediaWiki:Common.js/disablecommentsblogs.js", /* Disable blog comments on old blog posts */
		"MediaWiki:Common.js/disablecomments.js", /* Disable comments for specified pages at discretion */
		"MediaWiki:Common.js/wallgreetingbutton.js", /* Add a button to edit Message Wall Greeting */
    ]
 
});

window.UserTagsJS = {
	modules: {},
	tags: {
		// group: { associated tag data }, (The last line doesn't need a comma at the end but all the other do)
                coowner: { u:'Mod Staff' },
		voiceactor: { u:'Friends of admins' },
                synopsis: {u:'Potential Admins'},
                synopsiss: {u:'Big Blue Pupswoof Meloncar'},
                synopsisss:{f:'Big Blue Pupswoof Meloncar'},
                Overwatcher:{u:'Overwatch' }
	}
};


UserTagsJS.modules.custom = {
    // 'username': ['tag'], (The last line doesn't need a comma at the end but all the other do)
	'Punchcar63': ['synopsiss'], 
	'Pups_The_Mechanic': ['synopsisss'], 
	'Pupswoof117': ['Overwatcher']
};

importArticles({
	type:'script',
	articles: [
		// ...
		'w:c:dev:UserTags/code.js',
		// ...
	]
});

// Tags
window.UserTagsJS = {
    tags: {
        bureaucrat: {
            link: 'Special:ListUsers/bureaucrat'
        },
        bot: {
           link: 'Special:Listusers/bot'
        },
        contentmoderator: {
           link: 'Special:ListUsers/content-moderator'
        },
        chatmoderator: {
            link: 'Special:ListUsers/chatmoderator'
        },
        rollback: {
            link: 'Special:ListUsers/rollback'
        },
        sysop: {
            link: 'Special:ListUsers/sysop'
        },
        threadmoderator: {
            link: 'Special:ListUsers/threadmoderator'
        },
    },
    modules: {
        autoconfirmed: true,
        inactive: {
            days: 60,
            namespaces: [0],
            zeroIsInactive: true
        },
        mwGroups: [
            'bannedfromchat',
            'bureaucrat',
            'chatmoderator',
            'sysop',
            'rollback',
            'content-moderator',
            'bot',
            'imagecontroller',
            'threadmoderator',
        ],
        
        
    }
};

newuser: true