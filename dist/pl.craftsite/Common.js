importArticles({
	type: "script",
	articles: [
	"MediaWiki:Quiz.js"
	]
});

// Licencje
var options = {
	'{{Brak licencji}}': 'Nie znam licencji',
	'{{Screenshot}}': 'Screenshot ze strony',
	'{{CC-BY-SA}}': 'Creative Commons 3.0',
	'{{Copyright}}': 'Plik ma zastrzeżone pr. autorskie',
	'{{Fair-use}}': 'Plik ma dozwolone użycie',
	'{{Wikimedia}}': 'Plik pochodzi z Wikipedii',
	'{{PD}}': 'Plik należy do domeny publicznej'
};

// Stare blogi
window.LockOldBlogs = {
	expiryDays: 60,
	expiryMessage: "Komentowanie zostało wyłączone, ponieważ nikt nie dodał komentarza do tego wpisu od <expiryDays> dni. W razie potrzeby skontaktuj się z administratorem.",
	nonexpiryCategory: "Niearchiwizowane blogi"
};

// Zmiana "użytkownik wiki" na dokładny numer IP
// wersja dla adminów i biurokratów
window.RevealAnonIP = {permissions:['sysop','bureaucrat']};

// DODATKOWE PRZYCISKI W EDYTORZE ŹRÓDŁA

if (typeof (mwCustomEditButtons) != 'undefined') {

	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "http://upload.wikimedia.org/wikipedia/commons/e/ea/Button_align_left.png",
		"speedTip": "Wyrównaj tekst do lewej",
		"tagOpen": "<left>",
		"tagClose": "</left>",
		"sampleText": ""
	};

	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "http://upload.wikimedia.org/wikipedia/commons/a/a5/Button_align_right.png",
		"speedTip": "Wyrównaj tekst do prawej",
		"tagOpen": "<right>",
		"tagClose": "</right>",
		"sampleText": ""
	};

	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "http://upload.wikimedia.org/wikipedia/commons/5/5f/Button_center.png",
		"speedTip": "Wyśrodkuj tekst",
		"tagOpen": "<center>",
		"tagClose": "</center>",
		"sampleText": ""
	};

	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "http://upload.wikimedia.org/wikipedia/commons/2/29/Button_justify.png",
		"speedTip": "Wyjustuj tekst",
		"tagOpen": "<p align=justify>",
		"tagClose": "</p>",
		"sampleText": ""
	};

	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "http://upload.wikimedia.org/wikipedia/commons/8/89/Button_bigger.png",
		"speedTip": "Powiększ czcionkę",
		"tagOpen": "<big>",
		"tagClose": "</big>",
		"sampleText": "Powiększony tekst"
	};

	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "http://upload.wikimedia.org/wikipedia/commons/0/0d/Button_smaller.png",
		"speedTip": "Pomniejsz czcionkę",
		"tagOpen": "<small>",
		"tagClose": "</small>",
		"sampleText": "Pomniejszony tekst"
	};

	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "http://upload.wikimedia.org/wikipedia/commons/3/30/Btn_toolbar_rayer.png",
		"speedTip": "Przekreśl tekst",
		"tagOpen": "<strike>",
		"tagClose": "</" + "strike>",
		"sampleText": "Skreślony tekst"
	};

	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "http://upload.wikimedia.org/wikipedia/commons/f/fd/Button_underline.png",
		"speedTip": "Podkreśl tekst",
		"tagOpen": "<u>",
		"tagClose": "</" + "u>",
		"sampleText": "Podkreślony tekst"
	};

	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "http://upload.wikimedia.org/wikipedia/commons/6/6a/Button_sup_letter.png",
		"speedTip": "Wstaw indeks górny",
		"tagOpen": "<sup>",
		"tagClose": "</" + "sup>",
		"sampleText": "Indeks górny"
	};

	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "http://upload.wikimedia.org/wikipedia/commons/a/aa/Button_sub_letter.png",
		"speedTip": "Wstaw indeks dolny",
		"tagOpen": "<sub>",
		"tagClose": "</" + "sub>",
		"sampleText": "Indeks dolny"
	};

	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "http://upload.wikimedia.org/wikipedia/commons/3/3b/Comment-button-bg.png",
		"speedTip": "Wstaw komentarz widoczny tylko podczas edycji",
		"tagOpen": "<!--",
		"tagClose": "-->",
		"sampleText": "Treść komentarza"
	};

	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "http://images.wikia.com/inciclopedia/images/8/83/Bot%C3%B3n_C%C3%B3digofuente.png",
		"speedTip": "Dodaj kod",
		"tagOpen": "<code><nowiki>",
		"tagClose": "</" + "nowiki></code>",
		"sampleText": "Zakodowany tekst"
	};

	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "http://images.wikia.com/inciclopedia/images/4/49/Bot%C3%B3n_plantilla.png",
		"speedTip": "Wstaw szablon",
		"tagOpen": "{{",
		"tagClose": "}}",
		"sampleText": "Nazwa szablonu"
	};

	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "http://images.wikia.com/inciclopedia/images/7/7a/Bot%C3%B3n_tablas.png",
		"speedTip": "Wstaw tabelkę",
		"tagOpen": '{| {' + '{Tabelka|alineacion=col1izq col2cen col3der|}}\n|-\n',
		"tagClose": "\n|}",
		"sampleText": "!| Nagłówek 1\n!| Nagłówek 2\n!| Nagłówek 3\n|-\n|| komórka 1, kolumna 1\n|| komórka 1, kolumna 2\n|| komórka 1, kolumna 3\n|-\n|| komórka 2, kolumna 1\n|| komórka 2, kolumna 2\n|| komórka 2, kolumna 3"
	};

	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "http://images.wikia.com/inciclopedia/images/4/43/Enlace_a_usuario.png",
		"speedTip": "Zalinkuj użytkownika",
		"tagOpen": "[[Użytkownik:",
		"tagClose": "|Nick_użytkownika]]",
		"sampleText": "Nick_użytkownika"
	};

	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "http://upload.wikimedia.org/wikipedia/commons/6/62/Button_desambig.png",
		"speedTip": "Dodaj szablon ujednoznaczniający",
		"tagOpen": "{{Strona ujednoznaczniająca",
		"tagClose": "}}",
		"sampleText": ""
	};

	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "http://upload.wikimedia.org/wikipedia/commons/5/50/Button_tidyman.png",
		"speedTip": "Zgłoś usunięcie tego artykułu",
		"tagOpen": "{{EK",
		"tagClose": "
|Wiek = 00
|Płeć = Mężczyzna/Kobieta
|Inne nicki = Inne nicki
|Grupa = Grupa
|Ranga = Ranga
|Status = Aktywny/Nieaktywny/Zbanowany
|Profil = Link",
		"sampleText": ""
	};

	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "http://i.imgur.com/MTV2uwI.png",
		"speedTip": "Dodaj INFOBOX UŻYTKOWNIKA",
		"tagOpen": "{{Szablon:Użytkownik
|Nick = Nick 
|Avatar = Adres.png
|Imię = ",
		"tagClose": "|{" + "{PAGENAME}}]]",
		"sampleText": "Imię"
	};

	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "http://upload.wikimedia.org/wikipedia/commons/9/9e/Btn_toolbar_gallery.png",
		"speedTip": "Wstaw galerię zdjęć",
		"tagOpen": "<gallery spacing=small columns=3 position=center widths=206 orientation=none captionalign=center>\n",
		"tagClose": "</gallery>",
		"sampleText": "Plik:Przykład.jpg|Podpis1\nPlik:Przykład.jpg|Podpis2\nPlik:Przykład.jpg|Podpis3\n"
	};

}

importArticles({
    type: 'script',
    articles: [
        //...
        'w:c:dev:DISPLAYTITLE/code.js',
        //...
    ]
});