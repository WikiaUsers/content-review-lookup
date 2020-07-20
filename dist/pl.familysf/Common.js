/* Umieszczony tutaj kod JavaScript zostanie załadowany przez każdego użytkownika, podczas każdego ładowania strony. */

/* Wyświetlanie nazwy użytkownika na stronie(Szablon:USERNAME) */
$(function() {
	if(typeof(disableUsernameReplace) !== 'undefined' && disableUsernameReplace || mw.config.get('wgUserName') === null) return;
	$("span.insertusername").text(mw.config.get('wgUserName'));
});

/* Różne takie */
importArticles({
    type: "script",
    articles: [
      "MediaWiki:Common.js/ShowHide.js", /* ShowHide/PokażUkryj */
      "MediaWiki:Common.js/Licznik.js", /* Licznik na żywo */
    ]
});