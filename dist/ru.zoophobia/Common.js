/* Импорт JS-страниц Fixes.js, Scroll.js */
importArticles({
	    type: 'script',
	    articles: [
	        "u:ru.wikicorporate:MediaWiki:Fixes.js",
	        "u:ru.wikicorporate:MediaWiki:Scroll.js"
	    ]
	});

/* Кастомизация */
const staff = [
    {name: 'Swit4er', className: 'bur'},
    {name: 'LeraBE', className: 'bur'},
    {name: 'Voidan Dether', className: 'admin'},
    {name: 'Lich night', className: 'threadMod'},
    {name: 'Creepy Owl', className: 'contMod'},
    {name: 'IamNotFreddy', className: 'discordAdmin'},
    {name: 'KykS911', className: 'discordAdmin'},
    {name: 'Haruko4711', className: 'discordAdmin'},
    {name: 'Lubitel obnimashek', className: 'discordAdmin'},
    {name: 'Kostinger', className: 'discordMod'},
    {name: 'TimurKhan', className: 'discordMod'},
    {name: 'Om3gaZT', className: 'discordMod'},
    {name: 'Fleshka5856', className: 'intern'},
    {name: 'JustAccount', className: 'intern'},
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