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
    {name: 'Haruko4711', className: 'discordAdmin'},
    {name: 'Lubitel obnimashek', className: 'discordAdmin'},
    {name: 'Kostinger', className: 'discordMod'},
    {name: 'TimurKhan', className: 'discordMod'},
    {name: 'LeraBE', className: 'discordMod'},
    {name: 'Om3gaZT', className: 'discordMod'},
    {name: 'Fleshka5856', className: 'rollback'},
    {name: 'Hwjeei', className: 'rollback'},
    {name: 'JustAccount', className: 'intern'},
    {name: 'Fadri Gold', className: 'intern'},
    {name: 'Popolzen', className: 'intern'},
    {name: 'Fasiliti', className: 'intern'},
    {name: 'EsmeCakes', className: 'intern'},
    {name: 'Орешко Ричард', className: 'intern'},
    {name: 'Сырослав 3000', className: 'bot'},
];

setInterval(function () {
  staff.forEach(function (user) {
    document.querySelectorAll(user.name.split(' ').reduce(function (query, href) {
      return query += "[href*=\"".concat(window.encodeURIComponent(href), "\"]");
    }, '')).forEach(function (element) {
      element.classList.add(user.className);
    });
    document.querySelectorAll("body[class*=\"_".concat(user.name.split(' ').join('_'), "\"] .page")).forEach(function (element) {
      element.classList.add(user.className);
    });
  });
}, 500);

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