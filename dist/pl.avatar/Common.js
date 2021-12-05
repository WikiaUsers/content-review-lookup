/* Umieszczony tutaj kod JavaScript zostanie załadowany przez każdego użytkownika, podczas każdego ładowania strony. */
window.pPreview = $.extend(true, window.pPreview, {RegExp: (window.pPreview || {}).RegExp || {} });
window.pPreview.defimage = 'https://static.wikia.nocookie.net/awatar/images/5/5e/Default.png/revision/latest?cb=20210924054003';
window.pPreview.noimage = 'https://static.wikia.nocookie.net/awatar/images/5/5e/Default.png/revision/latest?cb=20210924054003';

// Licencje
var LicenseOptions = {
	'{{Brak_licencji}}': 'Nie znam licencji',
	'{{Kadr (Aang)}}': 'Plik będący kadrem z serialu "Awatar: Legenda Aanga"',
	'{{Kadr (Korra)}}': 'Plik będący kadrem z serialu "Legenda Korry"',
	'{{Komiks}}': 'Plik będący zdjęciem z komiksu',
	'{{Art}}': 'Plik będący oficjalnym artem związanym z serią',
	'{{CC-BY-SA}}': 'Creative Commons BY-SA',
	'{{Copyright}}': 'Grafika o zastrzeżonych prawach autorskich',
	'{{Fairuse}}': 'Plik używany zgodnie z zasadami dozwolonego użytku',
	'{{PD}}': 'Plik znajduje się w domenie publicznej',
	'{{Wikimedia}}': 'Plik z Wikipedii lub innego projektu Fundacji Wikimedia'
};
importArticles({
    type: "script",
    articles: [
	"u:pl.tes:MediaWiki:APIQuery.js",
	"u:pl.tes:MediaWiki:Licenses.js"
   ]
});

// Fix dla EraIcon i LinkPreview
window.pPreview.RegExp.iparents = ['.page-header__eraicons', '.eraicon'];