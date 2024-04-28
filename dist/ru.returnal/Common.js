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