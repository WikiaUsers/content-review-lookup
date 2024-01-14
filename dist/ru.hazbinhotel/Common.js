/* Импорт JS-страниц Fixes.js, Scroll.js */
importArticles({
	    type: 'script',
	    articles: [
	        "u:ru.wikicorporate:MediaWiki:Fixes.js",
	        "u:ru.wikicorporate:MediaWiki:Scroll.js"
	    ]
	});

/* Выделение комментариев */
const staff = [
    {name: 'Swit4er', className: 'bur'},
    {name: 'Voidan Dether', className: 'bur'},
    {name: 'P4kaidu', className: 'admin'},
    {name: 'Creepy Owl', className: 'admin'},
    {name: 'Lich night', className: 'threadMod'},
    {name: 'IamNotFreddy', className: 'discordAdmin'},
    {name: 'KykS911', className: 'discordAdmin'},
    {name: 'Merzlyak', className: 'discordMod'},
    {name: 'Kostinger', className: 'discordMod'},
    {name: 'TimurKhan', className: 'discordMod'},
    {name: 'LeraBE', className: 'discordMod'},
    {name: 'Om3gaZT', className: 'discordMod'},
    {name: 'Lubitel obnimashek', className: 'intern'},
    {name: 'JustAccount', className: 'intern'},
    {name: 'Fleshka5856', className: 'intern'},
];

setInterval(function (user) {
	staff.forEach(function (user) {
	  $('.wds-avatar a[href$="' + window.encodeURIComponent(user.name) + '"]').closest('.Reply, .Reply_body__PM9kM').addClass('Reply--role-' + user.className)
	})
}, 500)

/* Конфигурация для dev:DiscussionTemplates */
window.DiscussionTemplates = {
    templates: {
        'Предупреждение (1 уровень)': {
            name: 'Шаблон:Предупреждение_1',
            title: 'Предупреждение'
        },
        'Предупреждение (2 уровень)': {
            name: 'Шаблон:Предупреждение_2',
            title: 'Предупреждение'
        },
        'Блокировка (1 уровень)': {
            name: 'Шаблон:Блокировка_1',
            title: 'Блокировка'
        },
        'Блокировка (Смертный грех)': {
            name: 'Шаблон:Блокировка_2',
            title: 'Блокировка'
        },
    },
    allowedGroups: ['bureaucrat', 'sysop', 'content-moderator', 'threadmoderator', 'rollback']
};


/* Конфигурация для dev:AddRailModule */
 window.AddRailModule = [
 	{page: 'Template:DiscordRail', maxAge: 0},
 	{page: 'Template:VKRail', maxAge: 0},
 	{page: 'Template:NewPagesModule', maxAge: 0},
 	{page: 'Template:CodeRail', maxAge: 0},
 	{page: 'Template:SliderRail', maxAge: 0},
 	{page: 'Template:VideoRail', maxAge: 0}
 ];