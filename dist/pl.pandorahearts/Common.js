// Ikony społecznościowe (Google+, Facebook, Twitter)
var SocialMediaButtons = { 
	position: "top",
	colorScheme: "light",
	buttonSize: "25px"
};


// http://dev.wikia.com/wiki/RevealAnonIP
window.RevealAnonIP = {
    permissions : ['rollback', 'sysop', 'bureaucrat']
};

 
// Licencje
var options = {
        '{{Brak_licencji}}': 'Nie znam licencji',
	'{{CC-BY-SA}}': 'Plik na licencji Creative Commons BY-SA',
	'{{Copyright}}': 'Plik z zastrzeżonymi prawami autorskich',
	'{{Dozwolony_użytek|comic}}': 'Plik jest skanem z mangi',
        '{{Dozwolony_użytek|tv-screenshot}}': 'Plik jest zrzutem ekranu z anime',
	'{{PD}}': 'Plik znajduje się w domenie publicznej',
        '{{Wikimedia}}': 'Plik pochodzi z Wikipedii lub z jednego z projektów Wikimedia'
};


importArticles({
    type: "script",
    articles: [
      "MediaWiki:Common.js/chatango.js",     // Chatango
      "MediaWiki:Common.js/przełączanie.js", // Przełączanie
      "MediaWiki:Common.js/ajax.js",         // Automatyczne odświeżanie ostatnich zmian
      "u:pl.tes:MediaWiki:License.js",       // Licencje plików
      "w:c:dev:RevealAnonIP/code.js",        // Odkrywanie IP niezarejestrowanych użytkowników
      "w:c:dev:ShowHide/code.js",            // Rozwijane tabelki
      "w:c:dev:SocialIcons/code.js"          // Ikony społecznościowe (Google+, Facebook, Twitter)
      ]
});
// Uzasadnienie dowolonego użytku
function preloadUploadDescAddSummary(field) {
	if(field && !field.summaryAdded) {
		field.appendChild(document.createTextNode("{{Uzasadnienie dozwolonego użytku\r| opis                 = \r| źródło               = \r| część                = \r| cel                  = \r| rozmiar              = \r| wymienny             = \r| pozostałe informacje = \r}}"));
		field.summaryAdded = true;
	}
}
function preloadUploadDesc() {
	if (wgPageName.toLowerCase() == 'specjalna:prześlij')
		preloadUploadDescAddSummary(document.getElementById('wpUploadDescription'));
 
	UploadPhotos.destFileSetRedir = UploadPhotos.destFileSet
	UploadPhotos.destFileSet = function() {
		preloadUploadDescAddSummary(UploadPhotos.d.find('form')[0].wpUploadDescription);
		return UploadPhotos.destFileSetRedir();
	}
}
addOnloadHook(preloadUploadDesc)