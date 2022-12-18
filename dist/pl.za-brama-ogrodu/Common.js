importArticles({
    type: "script",
    articles: [
        "u:halo:MediaWiki:Wikia.js/Slider.js"
    ]
});

window.InactiveUsers = { text: 'nieaktywny' };

// Skrypt dodaje na pasku narzędzi przycisk powrotu na górę strony.
$(function ToTop() {
	$('.WikiaBarWrapper .tools')
		.append('<li style="border:none;float:right;"><a href="#top">Powrót do góry</a></li>');
});

// Konfiguracja dla AutoEditDropdown
window.AutoEditDropdownConfig = {
    expandedAreaContribute: true,
    expandedAreaEdit: false
};
 
//===============================================================================
//   Ostrzeżenie o braku licencji dla plików
//===============================================================================
function emptyLicenseAlert(form) {
	var msg = "Licencja pliku nie została wybrana. Możesz spróbować ponownie, ale pamiętaj, że pliki bez licencji są usuwane."
	if(window.emptyLicenseWarningDelivered) return true;
	if($('#wpLicense').val() == '') {
		alert(msg);
		window.emptyLicenseWarningDelivered = true
		return false
	}
	return true;
}

$('#mw-upload-form').submit(function(e) {return emptyLicenseAlert(this);});
 
$(".wikia-gallery-item .thumbimage").each(function(i,elem) {
		$(elem).attr('title',$(elem).attr('alt'));
	});
	$(".wikia-gallery-item .image").each(function(i,elem) {
		$(elem).attr('title',$(elem).attr('alt'));
});
 
// Licencje
var LicenseOptions = {
	'{{Brak_licencji}}': 'Nie znam licencji',
	'{{Kadr}}': 'Plik będący zrzutem z ekranu (screenshotem)',
	'{{Art}}': 'Plik będący oficjalnym artem związanym z serią',
	'{{Foto użytkownika}}': 'Plik do użytku użytkownika',
	'{{CC-BY-SA}}': 'Creative Commons BY-SA',
	'{{Copyright}}': 'Grafika o zastrzeżonych prawach autorskich',
	'{{Fairuse}}': 'Plik o dozwolonym użytku',
	'{{PD}}': 'Plik znajduje się w domenie publicznej',
	'{{Wikimedia}}': 'Plik z Wikipedii i Fundacji Wikimedia'
};

importArticles({
    type: "script",
    articles: [
	    "u:pl.tes:MediaWiki:APIQuery.js",
	    "u:pl.tes:MediaWiki:Licenses.js"
   ]
});
 
$(function FixNs() {
    $('.ns-4 #WikiaPageHeader > h1').text(wgTitle);
    $('.ns-4 #WikiaPageHeader').append('<h2>Strona Za bramą ogrodu Wiki</h2>');
    $('.ns-112 #WikiaPageHeader > h1').text(wgTitle);
    $('.ns-112 #WikiaPageHeader').append('<h2>Strona transkryptu</h2>');
    $('.ns-114 #WikiaPageHeader > h1').text(wgTitle);
    $('.ns-114 #WikiaPageHeader').append('<h2>Strona galerii</h2>');
    $('.ns-116 #WikiaPageHeader > h1').text(wgTitle);
    $('.ns-116 #WikiaPageHeader').append('<h2>Strona fanonu</h2>');
});

// WIDOCZNOŚĆ IP DLA ADMINISTRACJI
window.RevealAnonIP = {permissions:['sysop','bureaucrat']};

// Blokada starych wątków
window.LockForums = {
    expiryDays: 30,
    expiryMessage: "Nikt nie napisał tu żadnego postu od ponad 30 dni, więc dalsze komentowanie zostało automatycznie wyłączone, ponieważ ewentualne nowe wpisy zostałyby prawdopodobnie uznane za odkopywanie starych dyskusji. Jeśli masz coś ważnego do przekazania na dany temat, załóż nowy wątek.",
    forumName: "Forum" 
};