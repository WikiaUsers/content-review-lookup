/* Umieszczony tutaj kod JavaScript zostanie załadowany wyłącznie przez użytkowników korzystających ze skórki Wektor */

if (mw.user.anonymous()) {
	importScript('MediaWiki:Gadget-vector4monobookies.js');
}
//
// "Focus the cursor in the search bar on loading the Main Page"
// Autor: [[:en:User:Nihiltres]]
// Zaimportowany z http://en.wikipedia.org/wiki/MediaWiki:Gadget-searchFocus.js wg stanu na 7 paź. 2008
//
// opis działania: skrypt ustawia automatycznie kursor w polu wyszukiwania.
if (mw.config.get('wgPageName') == "Strona_główna") {
	$(document).ready(function() {
		var searchInput = document.getElementById("searchInput");
		if (searchInput)
			searchInput.focus();
	});
}