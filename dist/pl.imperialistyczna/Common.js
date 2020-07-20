/* Umieszczony tutaj kod JavaScript zostanie załadowany przez każdego użytkownika, podczas każdego ładowania strony. */

importArticles({
    type: 'script',
    articles: [
/* Rozbudowana nawigacja */
        'u:dev:ExtendedNavigation/code.js',
/* Łatwe edytowanie przywitania na tablicy wiadomości */
        'w:dev:MediaWiki:WallGreetingButton/code.js',        
]});

/* Dod. linków na karcie "Na Wiki" w menu nawigacji (podziękowania dla Vuha za pozwolenie użycia skryptu!)*/
$(document).ready(function() {
	$('.WikiHeader > nav > ul > li:first-child > ul').append('<li><a class="subnav-2a" href="/wiki/Imperialistyczna_Wikia:Regulamin">Regulamin</a></li>');
});