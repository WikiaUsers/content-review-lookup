/* Импорт JS-страниц Fixes.js, Scroll.js */
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