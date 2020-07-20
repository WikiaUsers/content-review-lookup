/* Any JavaScript here will be loaded for all users on every page load. */

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
            'bot'
        ],
        newuser: true
    },
	tags: {
        bureaucrat: {
            link: 'Special:ListUsers/bureaucrat'
        },
         sysop: {
            link: 'Special:ListUsers/sysop'
        },
         chatmoderator: {
            link: 'Special:ListUsers/chatmoderator'
        },
        threadmoderator: {
            link: 'Special:ListUsers/threadmoderator'
        },
        bot: {
            link: 'Special:ListUsers/bot'
        },
        ScreamKings: { u:'King' },
        Ricardo8a: { u:'Chanel #1' },
        Idekmandy: { u:'Chanel #2' },
		QueenBela: { u:'Coco' }
		Lucas Millonario: { u:'Ariana' },
	}
};
 
UserTagsJS.modules.custom = {
	'ScreamKings': ['ScreamKings'],
	'Idekmandy': ['Idekmandy'],
	'Ricardo8a': ['Ricardo8a'],
	'Queen Bela': ['QueenBela']
	'Lucas Millonario': ['QueenBela']
};
 
importArticles({
    type: 'script',
    articles: [
        'u:dev:Countdown/code.js',
        'u:dev:UserTags/code.js'
    ]
});