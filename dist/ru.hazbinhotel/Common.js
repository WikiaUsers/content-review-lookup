/* Импорт JS-страниц Fixes.js, Scroll.js, RefTooltips.js */
importArticles({
	    type: 'script',
	    articles: [
	        "u:ru.wikicorporate:MediaWiki:Fixes.js",
	        "u:ru.wikicorporate:MediaWiki:Scroll.js",
	        "u:ru.wikicorporate:MediaWiki:RefTooltips.js"
	    ]
	});

/* Кастомизация */
const staff = [
    {name: 'Voidan Dether', className: 'bur'},
    {name: 'Creepy Owl', className: 'admin'},
    {name: 'Lich night', className: 'threadMod'},
    {name: 'Lubitel obnimashek', className: 'discordAdmin'},
    {name: 'Орешко Ричард', className: 'intern'},
    {name: 'Сырослав 3000', className: 'bot'},
];

setInterval(function () {
  staff.forEach(function (user) {
    document.querySelectorAll(user.name.split(' ').reduce(function (query, href) {
      return query += "[href*=\"".concat(window.encodeURIComponent(href), "\"]:not(.highlighted)");
    }, '')).forEach(function (element) {
      element.classList.add("highlighted", user.className);
    });
  });
}, 500);

var highlightStaffPage = setInterval(function () {
  staff.forEach(function (user) {
  	if (document.querySelector("body[class*=\"_".concat(user.name.split(' ').join('_'), "\"] .page"))) {
  	  document.querySelector("body[class*=\"_".concat(user.name.split(' ').join('_'), "\"] .page")).classList.add(user.className);
  	  clearInterval(highlightStaffPage);
  	}
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