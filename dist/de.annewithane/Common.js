/* JavaScript hier wird für alle Benutzer für jede Seite geladen. */

/* User Tags*/
window.UserTagsJS = {
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
            'content-moderator',
            'bot',
            'rollback'
        ],
        newuser: true
    },
	tags: {
        bureaucrat: { u:'Kindred Spirit',
            link: 'Special:ListUsers/bureaucrat'
        },
         sysop: { u:'Ann-E',
            link: 'Special:ListUsers/sysop'
        },
         chatmoderator: {
            link: 'Special:ListUsers/chatmoderator'
        },
        threadmoderator: {
            link: 'Special:ListUsers/threadmoderator'
        },
        blocked: {
            link: 'Special:BlockList'
        },
        bot: {
            link: 'Special:ListUsers/bot'
        },
        'content-moderator': { u: 'Content Moderator', link: 'Special:ListUsers/content-moderator'
        },
        'rollback': { u: 'Rollback', link: 'Special:ListUsers/rollback'
        },
      Franziseifen: { u:'Gilbert',
            link: 'Gilbert_Blythe' }
	}
};
 
UserTagsJS.modules.custom = {
	
	'Franziseifen': ['Franziseifen']
};
 
UserTagsJS.modules.metafilter = {
	'rollback': ['sysop', 'bureaucrat', 'content-moderator'],
	'chatmoderator': ['sysop', 'bureaucrat', 'threadmoderator'],
	'threadmoderator':['sysop', 'bureaucrat', 'content-moderator' ],
	'content-moderator':['sysop', 'bureaucrat']
};
 
importArticles({
    type: 'script',
    articles: [
        'u:dev:UserTags/code.js',
    ]
});