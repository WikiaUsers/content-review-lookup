/* Umieszczony tutaj kod JavaScript zostanie zastosowany we wszystkich skórkach */

// Konfiguracja licencji
var options = {
	'{{Dozwolony_użytek|comic}}': 'Plik jest skanem z mangi',
	'{{Dozwolony_użytek|tv-screenshot}}': 'Plik jest zrzutem ekranu z anime',
	'{{CC-BY-SA}}': 'CC-BY-SA',
	'{{Copyright}}': 'Plik objęty prawami autorskimi',
	'{{PD}}': 'Plik znajduje się w domenie publicznej',
	'{{Wikimedia}}': 'Plik pochodzi z jednego z projektów Wikimedia'
};

// Konfiguracja RAIP
window.RevealAnonIP = {
	permissions: [
		'rollback',
		'sysop',
		'bureaucrat'
	]
};

// Importy zewnętrzne
importArticles( {
	type: 'script',
	articles: [
		'u:pl.tes:MediaWiki:License.js'
	]
} );