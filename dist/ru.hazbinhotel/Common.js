/* Импорт JS-страниц Fixes.js, Scroll.js, RefTooltips.js */
importArticles({
	    type: 'script',
	    articles: [
	        "u:ru.wikicorporate:MediaWiki:Fixes.js",
	        "u:ru.wikicorporate:MediaWiki:Scroll.js",
	        "u:ru.wikicorporate:MediaWiki:RefTooltips.js"
	    ]
	});

/* Выделение комментариев */
const staff = [
    {name: 'Swit4er', className: 'bur'},
    {name: 'Voidan Dether', className: 'bur'},
    {name: 'Creepy Owl', className: 'admin'},
    {name: 'Hwjeei', className: 'contMod'},
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
    {name: 'JustAccount', className: 'intern'},
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

/* Конфигурация для dev:AddRailModule */
 window.AddRailModule = [
 	{page: 'Template:DiscordRail', maxAge: 0},
 	{page: 'Template:VKRail', maxAge: 0},
 	{page: 'Template:NewPagesModule', maxAge: 0},
 	{page: 'Template:CodeRail', maxAge: 0},
 	{page: 'Template:SliderRail', maxAge: 0},
 	{page: 'Template:VideoRail', maxAge: 0},
 	{page: 'Template:CommunityCorner', maxAge: 0},
 	{page: 'Template:WikiRail', maxAge: 0}
 ];