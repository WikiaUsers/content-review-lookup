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
    {name: 'Voidan Dether', className: 'admin'},
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