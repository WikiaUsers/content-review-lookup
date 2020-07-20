/* Umieszczony tutaj kod JavaScript zostanie załadowany przez każdego użytkownika, podczas każdego ładowania strony. */

/* Umieszczony tutaj kod JavaScript zostanie załadowany przez każdego użytkownika, podczas każdego ładowania strony. */
/*
== Automatyczne opisy zmian ==
; Autor (Author): [[:pl:User:Adziura|Adam Dziura]]
; Poprawki (Fixes): [[:pl:User:Nux|Maciej Jaros]]
*/

function przyciskiOpis()
{
	// stop before starting
	if (window.przyciskiOpisDone)
		return;

	//
	// sprawdzenie, czy to jest pole edycji z opisem zmian (nie jest takie jako nagłówek)
	var el = document.getElementById('wpSummaryLabel');
	if (el)
	{
		if (el.innerHTML.indexOf('Opis zmian')==-1)
			return	// stop
		;
		
	}
	else
	{
		return;	// stop
	}
	
	//
	// dodanie elementu okalającego przyciski bezpośrednio za opisem zmian
	var el = document.getElementById('wpSummary').nextSibling;
	var opisBtns = document.createElement('span');
	opisBtns.id = 'userSummaryButtons'
	el.parentNode.insertBefore(document.createElement('br'), el)
	el.parentNode.insertBefore(opisBtns, el)
	
	//
	// dodawanie przycisków
	//var kl = 'userButtonsStyle';
	var kl = '';	// klasa jest niepotrzebna (wszystkie <a> w #userSummaryButtons ustawione poprzez CSS)
	if (opisBtns)
	{
		// drobne różne
                przyciskiDodaj(opisBtns, 'ort.', 'dodajOpis("ort.")', kl,
                        'Poprawiono błąd ortograficzny');
		przyciskiDodaj(opisBtns, 'lit.', 'dodajOpis("lit.")', kl,
			'Poprawiono literówkę');
                przyciskiDodaj(opisBtns, 'int.', 'dodajOpis("int.")', kl,
                        'Poprawiono interpunkcję');
		przyciskiDodaj(opisBtns, 'ogonki', 'dodajOpis("polskie znaki")', kl,
			'Poprawa polskich znaków');

		// opisBtns.appendChild(document.createTextNode(' ')); // odstęp

		// drobne około wikizacyjne
		przyciskiDodaj(opisBtns, 'linki-zew', 'dodajOpis("linki zewnętrzne")', kl,
			'Poprawiono/dodano linki zewnętrzne');
		przyciskiDodaj(opisBtns, 'linki-popr', 'dodajOpis("poprawa linków")', kl,
			'Poprawiono linki zewnętrzne/wewnętrzne');
		przyciskiDodaj(opisBtns, 'kat.', 'dodajOpis("kat.")', kl,
			'Poprawiono/dodano kategorię');
		przyciskiDodaj(opisBtns, 'przypisy', 'dodajOpis("źródła/przypisy")', kl,
			'Dodanie/poprawienie przypisów lub źródeł');

		opisBtns.appendChild(document.createTextNode(' ')); // odstęp

		// drobne około techniczne
		przyciskiDodaj(opisBtns, 'stub', 'dodajOpis("stub (zalążek)")', kl,
			'Ten artykuł to stub');
		przyciskiDodaj(opisBtns, 'disamb', 'dodajOpis("disambig (ujednoznacznienie)")', kl,
			'Poprawiono/dodano stronę ujednoznaczniającą');
		przyciskiDodaj(opisBtns, 'grafika', 'dodajOpis("grafika")', kl,
			'Poprawiono/dodano grafikę');
		przyciskiDodaj(opisBtns, 'szablon', 'dodajOpis("szablon")', kl,
			'Poprawiono/dodano szablon');
		przyciskiDodaj(opisBtns, 'infobox', 'dodajOpis("infobox")', kl,
			'Poprawiono/uzupełnienio/dodano infobox');

		opisBtns.appendChild(document.createElement('br'));

		// drobne inne
		przyciskiDodaj(opisBtns, 'dr.meryt.', 'dodajOpis("drobne merytoryczne")', kl,
			'Drobne zmiany merytoryczne');
		przyciskiDodaj(opisBtns, 'dr.red.', 'dodajOpis("drobne redakcyjne")', kl,
			'Drobne zmiany redakcyjne');
		przyciskiDodaj(opisBtns, 'dr.tech.', 'dodajOpis("drobne techniczne")', kl,
			'Drobne zmiany techniczne');

		opisBtns.appendChild(document.createTextNode(' ')); // odstęp

		// do użytkownika i około administracyjne
		przyciskiDodaj(opisBtns, 'witaj', 'dodajOpis("witaj")', kl,
			'Dodano powitanie dla użytkownika');
		przyciskiDodaj(opisBtns, 'test', 'dodajOpis("test")', kl,
			'Dodano ostrzeżenie dla użytkownika');
		przyciskiDodaj(opisBtns, 'delete', 'dodajOpis("[[:Kategoria:Usunąć|delete]]")', kl,
			'Zgłoszono artykuł do skasowania');
		przyciskiDodaj(opisBtns, 'rev.', 'dodajOpis("przywrócenie poprzedniej wersji")', kl,
			'przywrócenie poprzedniej wersji');

		opisBtns.appendChild(document.createTextNode(' ')); // odstęp

		// insze do dyskusji i głosowań
		przyciskiDodaj(opisBtns, 'głos', 'dodajOpis("głos")', kl,
			'Oddano głos');
		przyciskiDodaj(opisBtns, 'komentarz', 'dodajOpis("komentarz")', kl,
			'Dodano komentarz w dyskusji lub do głosu');
		przyciskiDodaj(opisBtns, 'aktual.', 'dodajOpis("aktualizacja strony")', kl,
			'Aktualizacja strony');

		// odstęp przed własnymi
		opisBtns.appendChild(document.createTextNode(' ')); // odstęp

		// typowo lostpedyczne
		przyciskiDodaj(opisBtns, 'ep', 'dodajOpis("[[Szablon:ep|ep]]")', kl,
			'Zmieniono nazwy odcinków na szablon ep');
		przyciskiDodaj(opisBtns, 'crossref', 'dodajOpis("[[Szablon:crossref|crossref]]")', kl,
			'Dodano/poprawiono odniesienia do odcinków');
		przyciskiDodaj(opisBtns, 'teorie', 'dodajOpis("teorie")', kl,
			'Dodano teorie');
		przyciskiDodaj(opisBtns, 'tł.', 'dodajOpis("tłumaczenie")', kl,
			'Dodano/poprawiono tłumaczenie');
		// tutaj dodawać następne

//		document.editform.wpMinoredit.onclick = onMinorEditClick;
	}
}

/*
Parametry:
* elUserBtns - element okalający, do którego dodać przycisk
* pTekst - tekst w środku przycisku
* pAkcja - akcja (w formie tekstowej) jaką wykonać przy naciśnięciu; może być ciągiem poleceń
* pKlasa - klasa jeśli konieczna
* pOpis - opis widoczny w dymku przy przycisku
*/
function przyciskiDodaj(elUserBtns, pTekst, pAkcja, pKlasa, pOpis)
{
	var nowyBtn = document.createElement('a');

	// atrybuty
	nowyBtn.appendChild(document.createTextNode(pTekst));
	nowyBtn.title = pOpis;
	if (pKlasa != '')
		nowyBtn.className = pKlasa
	;
	nowyBtn.onclick = new Function(pAkcja);

	// dodanie przycisku
	elUserBtns.appendChild(nowyBtn);
}

var clickedMinor = false;
function onMinorEditClick()
{
	if (this.checked && !clickedMinor)
	{
		dodajOpis("drobne");
		clickedMinor = true;
	}
}

function dodajOpis(opis)
{
	var wpS = document.editform.wpSummary;
	if (wpS.value != '' && wpS.value.charAt(wpS.value.length-2) != '/')
	{
		wpS.value += ', ' + opis
	}
	else
	{
		wpS.value += opis
	}
}

addOnloadHook(przyciskiOpis);

// END OF Onlyifediting.js
// 

//Dodatkowe przyciski
//Copyright by Gudys 23 June 2008
//All rights reserved and protected by law of United States of America
//Dupa tam, chronione przez Serby ZKS SLU CHWDP Forza JUVE!!! WZU F.C.B. Shreka
//Made in Harta in Poland
//Made in Grzybownia

var button = {
        "imageFile": "http://upload.wikimedia.org/wikipedia/en/c/c8/Button_redirect.png",  //ścieżka do obrazka (pełna ścieżka)22x22px
        "speedTip": "Przekierowanie",    //tekst który się wyświetli gdy najedziemy na przycisk myszką
        "tagOpen": "#REDIRECT[[",        //znacznik rozpoczynający
        "tagClose": "]]",      //znacznik kończący
        "sampleText": "Tytuł strony"   ////tekst pomiędzy znacznikami (domyślnie zaznaczony)
};
mwCustomEditButtons.push(button);

var button = {
        "imageFile": "http://upload.wikimedia.org/wikipedia/en/c/c9/Button_strike.png",  
        "speedTip": "Tekst przekreślony",    
        "tagOpen": "<s>",
        "tagClose": "</s>",
        "sampleText": "Tekst przekreślony"
};
mwCustomEditButtons.push(button);

var button = {
        "imageFile": "http://upload.wikimedia.org/wikipedia/en/1/13/Button_enter.png",
        "speedTip": "Złamanie linii",    
        "tagOpen": "<br />",
        "tagClose": "",
        "sampleText": ""
};
mwCustomEditButtons.push(button);

var button = {
        "imageFile": "http://upload.wikimedia.org/wikipedia/en/8/80/Button_upper_letter.png",
        "speedTip": "Indeks górny",
        "tagOpen": "<sup>",
        "tagClose": "</sup>",
        "sampleText": "Indeks górny"
};
mwCustomEditButtons.push(button);

var button = {
        "imageFile": "http://upload.wikimedia.org/wikipedia/en/7/70/Button_lower_letter.png",
        "speedTip": "Indeks dolny",
        "tagOpen": "<sub>",
        "tagClose": "</sub>",
        "sampleText": "Indeks dolny"
};
mwCustomEditButtons.push(button);

var button = {
        "imageFile": "http://upload.wikimedia.org/wikipedia/en/5/58/Button_small.png",
        "speedTip": "Mały tekst",
        "tagOpen": "<small>",
        "tagClose": "</small>",
        "sampleText": "Mały tekst"
};
mwCustomEditButtons.push(button);

var button = {
        "imageFile": "http://upload.wikimedia.org/wikipedia/en/3/34/Button_hide_comment.png",
        "speedTip": "Komentarz",
        "tagOpen": "<!-- ",
        "tagClose": " -->",
        "sampleText": "Wstaw komentarz"
};
mwCustomEditButtons.push(button);

var button = {
        "imageFile": "http://upload.wikimedia.org/wikipedia/en/f/fd/Button_blockquote.png",
        "speedTip": "Długi cytat",
        "tagOpen": "<blockquote>",
        "tagClose": "</blockquote>",
        "sampleText": "Tutaj wstaw długi cytat"
};
mwCustomEditButtons.push(button);

var button = {
        "imageFile": "http://upload.wikimedia.org/wikipedia/commons/7/79/Button_reflink.png",
        "speedTip": "Przypis",
        "tagOpen": "<ref>",
        "tagClose": "</ref>",
        "sampleText": "Tutaj wstaw treść przypisu"
};
mwCustomEditButtons.push(button);

var button = {
        "imageFile": "http://upload.wikimedia.org/wikipedia/commons/2/2a/Button_category_plus.png",
        "speedTip": "Wstaw kategorię",
        "tagOpen": "[[Kategoria:",
        "tagClose": "]]",
        "sampleText": "Nazwa kategorii"
};
mwCustomEditButtons.push(button);

var button = {
        "imageFile": "http://upload.wikimedia.org/wikipedia/commons/3/3b/Button_template_alt.png",
        "speedTip": "Wstaw szablon",
        "tagOpen": "{{",
        "tagClose": "}}",
        "sampleText": "Nazwa szablonu"
};
mwCustomEditButtons.push(button);

var button = {
        "imageFile": "http://upload.wikimedia.org/wikipedia/en/6/60/Button_insert_table.png",
        "speedTip": "Tabela",
        "tagOpen": '{| class="wikitable"\n|-\n',
        "tagClose": "\n|}",
        "sampleText": '! nagłówek 1\n! nagłówek 2\n! nagłówek 3\n|-\n| wiersz 1, komórka 1\n| wiersz 1, komórka 2\n| wiersz 1, komórka 3\n|-\n| wiersz 2, komórka 1\n| wiersz 2, komórka 2\n| wiersz 2, komórka 3',
};

mwCustomEditButtons.push(button);

//Gadżet usuń z polskiej wikipedii
//Przeniesienie i edycja Gudys

// Style CSS → [[Mediawiki:Common.css]] ↓
// ID #userSummaryButtons

var del$loadingLinks = '<b>Wczytywanie linkujących...</b>';
var del$loadingHistory = '<b>Wczytywanie historii zmian...</b>';

var del$noLinks = '<span style="color: green; font-size: larger; font-weight:bold">Brak linkujących</span>';

var del$linksHeader = 'Linkujące <span style="font-size: x-small;">(pierwsze $1)</span>';
var del$historyHeader =  'Historia i autorzy <span style="font-size: x-small;">(ostatnie $1)</span>';

var del$showAllCaption = 'pokaż wszystkie';

var del$talkNamespace = /(?:talk$|^dyskusja)/i;

var del$redirect = /#REDIRECT/i;
var del$speedy = /\{\{(?:ek|delete|speedy)\|(?:1=)?(.+?)(?:\}\}|$)/i;

var del$speedyCaption = "z eka";
var del$speedyReason = "z eka: $1";

// ---------------------------------------------------------
// Ustawienia domyślne - przycisków
// ---------------------------------------------------------

if (!del_buttons)
{
	var del_buttons = new Array(
		"general",	// identyfikator grupy (nie zmieniać i nie dodawać)
		"",		// etykieta
		new Array (	// przyciski
		    "nieency",	// etykieta
		    "wpis został uznany za nieencyklopedyczny",	//wstawiany tekst
		    "substub",
		    "wpis został usunięty z powodu  zbyt małej ilości treści - substub",
		    "eksperyment",
		    "wpis został uznany za eksperyment edycyjny",
		    "bełkot",
		    "wpis usunięty z powodu niezrozumiałej treści",
		    "wulgaryzmy",
		    "wpis usunięty z powodu umieszczonych w nim wulgaryzmów",
		    "wygłup",
		    "wpis usunięty - wygłup",
		    "reklama",
		    "wpis uznany za reklamę",
		    "npa",
		    "wpis usunięty z powodu naruszenia praw autorskich",
		    "forma",
		    "wpis usunięto z powodu nieodpowiedniej formy",
		    "zbędne",
		    "artykuł zbędny",
		    "nazwa",
		    "nieprawidłowa nazwa"
		),
		"talk",
		"dyskusja",
		new Array (
		    "forum",
		    "strona dyskusji to nie forum",
		    "problem",
		    "na Wikipedii nie zajmujemy się rozwiązywaniem problemów",
		    "stare",
		    "stare",
		    "sierotka",
		    "sierotka",
		    "odpowiedziano",
		    "odpowiedziano na stronie dyskusji użytkownika"
		),
		"img",
		"grafika",
		new Array (
		    "przeniesiono",
		    "npa",
		    "nazwa",
		    "nieinformatywna nazwa pliku",
		    "zbędne",
		    "zbędna/nieużywana grafika",
		    "dubel",
		    "dubel"
		),
		"redir",
		"przekierowanie",
		new Array (
		    "zbędne",
		    "zbędne przekierowanie",
		    "zerwane",
		    "zerwane przekierowanie",
		    "błędne",
		    "błędne przekierowanie"
		),
		"tech",
		"porządki",
		new Array (
		    "sdu",
		    "usunięto,",
		    "sdu24",
		    "poczekalnia",
		    "pusta kategoria",
		    "pusta kategoria",
		    "dubel",
		    "dubel"
		)
	);
}

var pt$times = {
	"godzina"	: "1 godzina",
	"2 godziny"	: "2 godziny",
	"6 godzin"	: "6 godzin",
	"dzień "	: "1 dzień",
	"3 dni "	: "3 dni",
	"tydzień"	: "1 tydzień",
	"miesiąc"	: "1 miesiąc",
	"na zawsze"	: "na zawsze"
};

var pt$reasons = {
	"wandalizm"	: "częste wandalizmy",
	"wygłupy"	: "wygłupy",
	"spam"	: "spam",
	"wojna"		: "wojna edycyjna",
	"nieency"	: "nieencyklopedyczne wpisy"
};

var bk$times = pt$times;

var br$hideLink = 'Ukrywaj rewerty edycji tego użytkownika';
var br$hideWarning = 'Rewerty edycji tego użytkownika będą ukryte - pamiętaj aby robić to w zgodzie z <a href="' + wgArticlePath.replace('$1', 'Wikipedia:Narz%C4%99dzia_administracji#Ukrywanie_wandalizmu_z_ostatnich_zmian') +'">zasadami</a>!';

// ---------------------------------------------------------
// Ustawienia domyślne - linkujące oraz historia
// ---------------------------------------------------------

// maksymalna ilość pobieranych linkujących, 0 - nie pobiera
try { del_max_links = del_max_links } catch (e) { del_max_links = 10 }

// maksymalna ilość pobieranych wpisów z historii, 0 - nie pobiera
try { del_max_versions = del_max_versions } catch (e) { del_max_versions = 5 }

// czy włączony jest tryb hardcode?
try { del_hardcore = del_hardcore } catch (e) { del_hardcore = 0 }

// czy włączone jest podświetlanie linku do strony dyskusji
try { del_talk_highlight = del_talk_highlight } catch (e) { del_talk_highlight = 1 }

// tak, wiem... ale nie wymyśliłem nic lepszego...

// ---------------------------------------------------------
// Fragment kodu z LiveRC
// *Documentation : [[:fr:User:EDUCA33E/LiveRC/Documentation]]
// *Authors : [[:fr:User:EDUCA33E]], [[:fr:User:TiChou]] & [[:pl:User:Leafnode]]
// ---------------------------------------------------------

var wpajax = {
	http: function(bundle) {
		// mandatory: bundle.url
		// optional:  bundle.async
		// optional:  bundle.method
		// optional:  bundle.headers
		// optional:  bundle.data
		// optional:  bundle.onSuccess (xmlhttprequest, bundle)
		// optional:  bundle.onFailure (xmlhttprequest, bundle)
		// optional:  bundle.otherStuff OK too, passed to onSuccess and onFailure
		var xmlhttp;
		try {
			xmlhttp = new XMLHttpRequest();
		} catch(e) {
			try {
				xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
			} catch (e) {
				try {
					xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
				} catch (e) {
					xmlhttp = false
				}
			}
		}

		if (xmlhttp) {
			xmlhttp.onreadystatechange = function() {
				if (xmlhttp.readyState == 4)
				wpajax.httpComplete(xmlhttp,bundle);
			};
			xmlhttp.open(bundle.method ? bundle.method : "GET",bundle.url,bundle.async == false ? false : true);
			if (bundle.headers) {
				for (var field in bundle.headers)
					xmlhttp.setRequestHeader(field,bundle.headers[field]);
			}
			xmlhttp.send(bundle.data ? bundle.data : null);
		}
		return xmlhttp;
	},

	httpComplete: function(xmlhttp,bundle) {
		if (xmlhttp.status == 200 || xmlhttp.status == 302) {
			if (bundle.onSuccess)
				bundle.onSuccess(xmlhttp,bundle);
		} else if (bundle.onFailure) {
			bundle.onFailure(xmlhttp,bundle);
		} else {
			// A activer en debug mode ?
			// alert(xmlhttp.statusText);
		}
	}
};

// Parser
if (document.implementation.createDocument) {
	var gml_xmlparser = new DOMParser();
}

function gml_XMLParse(string) {
	if (document.implementation.createDocument) {
		return gml_xmlparser.parseFromString(string, "text/xml");
	} else if (window.ActiveXObject) {
		var gml_xmldoc = new ActiveXObject("Microsoft.XMLDOM");
		gml_xmldoc.async = "false";
		ret = gml_xmldoc.loadXML(string);
		if (!ret)
			return null;
		return gml_xmldoc.documentElement;
	}
	return null;
}

// ---------------------------------------------------------

function del$callAPI(query) {
	var url = wgServer + wgScriptPath + '/api.php?';
	
	for (var field in query) {
		var value = query[field];
		url += '&' + field + '=' + encodeURIComponent(value);
	}
	url += '&format=json';
	importScriptURI(url);
}

function del$gotHist(xmlreq, data)
{
	var doc = gml_XMLParse(xmlreq.responseText);
	var bodyContent  = doc.getElementById('bodyContent')

	var history_content = document.getElementById( 'history_content' );
	history_content.innerHTML = '';

	for (var i=0; i< bodyContent.childNodes.length; i++)
	{
		var tagName = bodyContent.childNodes[i].tagName;
		if (tagName && tagName.toLowerCase() == 'form')
		{
			history_content.appendChild(bodyContent.childNodes[i]);
			return;
		}
	}
	history_content.appendChild(bodyContent);
}

function del_gotBackLinks(data)
{
	var links_content = document.getElementById( 'links_content' );

	var titles = new Array();
	
	for (var id in data.query.backlinks) {
		var page = data.query.backlinks[id];
		titles.push( page.title );
	}
	
	del$addLinks(links_content, titles);
}

function del_gotImageUsage(data)
{
	var links_content = document.getElementById( 'links_content' );

	var titles = new Array();
	
	for (var id in data.query.imageusage) {
		var page = data.query.imageusage[id];
		titles.push( page.title );
	}

	del$addLinks(links_content, titles);
}

function del$addLinks(container, list)
{
	if (list.length > 0) {
		var ul = document.createElement('ul');
		for (var i = 0; i < list.length; i++) {
			var title = list[i];
			var li = document.createElement('li');
			var link = document.createElement('a');
			link.title = title;
			link.href = wgScript + "?title=" + encodeURIComponent(title);
			link.appendChild( document.createTextNode(title) );
			li.appendChild(link);
			ul.appendChild(li);
		}
		container.innerHTML = '';
		container.appendChild(ul);
		return;
	}

	container.innerHTML = del$noLinks;
}

function del$createButtons(parentNode, buttonArray)
{
	for (var j = 0; j < buttonArray.length; j+=2)
	{
		var newButton = document.createElement('a');

		// atrybuty
		newButton.title = buttonArray[j+1];
		newButton.onclick = function() { del$insertReason(this.title) };
		newButton.appendChild(document.createTextNode(buttonArray[j]));

		// dodanie przycisku
		parentNode.appendChild(newButton);
	}
}

function del$createGroup(id, caption, buttonArray)
{
	tr = document.createElement('tr');
	tr.id = "del_" + id;

	td_caption = document.createElement('td');
	td_caption.align = 'right';
	td_caption.appendChild( document.createTextNode(caption) );
	tr.appendChild(td_caption);
	
	td_buttons = document.createElement('td');
	td_buttons.align = 'left';
	td_buttons.id = 'userSummaryButtons';
	del$createButtons(td_buttons, buttonArray);
	tr.appendChild(td_buttons);
	
	return tr;
}

function del$showAll()
{
	for (var i = 0; i < del_buttons.length; i+=3)
	{
		var group = del_buttons[i];
		document.getElementById("del_" + group).style.display = '';
	}
	document.getElementById("del_general").cells[0].style.visibility = 'hidden';
}

function del$imageForm()
{
	// zmienił się sposób usuwania plików
	// należy dodać brakujące elementy formularza
	var wpReason = document.getElementById('wpReason');
	var button = document.getElementById('mw-filedelete-submit');
	var table = wpReason.parentNode.parentNode.parentNode;
	
	var tr = document.createElement('tr');
	var td_left = document.createElement('td');
	var td_right = document.createElement('td');

	td_right.appendChild(button);
	tr.appendChild(td_left);
	tr.appendChild(td_right);
	
	table.appendChild(tr);
	return tr;
}

function del$init() {
	var current_group = '';
	var defaultReason = '';
	var catalk = document.getElementById('ca-talk');
	if ( del_talk_highlight && catalk.className == '') {
		catalk.style.textDecoration =  'blink';
		catalk.firstChild.style.backgroundColor = 'orange';
	}
	var wpReason = document.getElementById('wpReason');
	if ( wpReason ) {
		wpReason.parentNode.align = "left";
		wpReason.style.width = "100%";
		defaultReason = wpReason.value;
		wpReason.value = '';
	}
	var tr_watch;
	
	if (wgNamespaceNumber == 6 && !document.getElementById('wpConfirmB'))
	{
		current_group = 'img';
		tr_watch = del$imageForm();
	}
	else
	{
		var wpWatch = document.getElementById('wpWatch');
		tr_watch = wpWatch.parentNode.parentNode;
	}
	var table= tr_watch.parentNode;
	
	if (defaultReason.match( del$redirect ))
	{
		current_group = 'redir';
	}
	else if (wgCanonicalNamespace.match( del$talkNamespace ) )
	{
		current_group = 'talk';
	}
	else if (wgNamespaceNumber == 14)
	{
		current_group = 'tech';
	}
	else if (wgNamespaceNumber == 6)
	{
		current_group = 'img';
	}
	else if (defaultReason.match(/\{\{(?:Pocz)?SDU/i))
	{
		current_group = 'tech';
	}

	for (var i = 0; i < del_buttons.length; i+=3)
	{
		var group = del_buttons[i];
		var caption = del_buttons[i+1];
		var buttons = del_buttons[i+2];
 	
		var new_tr = del$createGroup(group, caption, buttons);

		if (group == 'general')
		{
			var newButton = document.createElement('a');
		
			// atrybuty
			newButton.appendChild(document.createTextNode(del$showAllCaption));
			newButton.onclick = del$showAll;
			newButton.style.cursor = 'pointer';
		
			// dodanie przycisku
			new_tr.firstChild.appendChild(newButton);
		}
		else if (group == current_group)
		{
			new_tr.firstChild.style.fontWeight = 'bold';
		}
		else
		{
			new_tr.style.display = 'none';
		}
		table.insertBefore(new_tr, tr_watch);
	}

	var speedy_found = defaultReason.match( del$speedy );

	if (speedy_found)
	{
		var newButton = document.createElement('a');
	
		// atrybuty
		newButton.appendChild(document.createTextNode(del$speedyCaption));
		newButton.title = del$speedyReason.replace('$1', speedy_found[1]);
		newButton.onclick = function () { del$insertReason(this.title) };

		// dodanie przycisku
		document.getElementById('del_general').lastChild.appendChild(newButton);
	}

	var bodyContent = document.getElementById('bodyContent');
	var deletionlog = document.getElementById('mw-article-delete-deletionlog');
	
	if (del_max_versions > 0)
	{
		var history_header = document.createElement('h2');
		history_header.innerHTML = del$historyHeader.replace('$1', del_max_versions);
		bodyContent.insertBefore(history_header, deletionlog);

		var history_content = document.createElement('div');
		history_content.id = 'history_content';
		history_content.innerHTML = del$loadingHistory;
		
		bodyContent.insertBefore(history_content, deletionlog);

		wpajax.http({url:wgServer + wgScript + '?limit=' + del_max_versions + '&title=' + encodeURIComponent(wgPageName) + '&action=history', onSuccess: del$gotHist, message: wgPageName });
	}

	if (del_max_links > 0)
	{
		var links_header = document.createElement('h2');
		links_header.innerHTML = del$linksHeader.replace('$1', del_max_links);
		
		bodyContent.insertBefore(links_header, deletionlog);

		var links_content = document.createElement('div');
		links_content.id = 'links_content';
		links_content.innerHTML = del$loadingLinks;
		
		bodyContent.insertBefore(links_content, deletionlog);

		if (wgNamespaceNumber == 6) // media
			del$callAPI({
				action:	'query',
				list:	'imageusage',
				iulimit:	del_max_links,
				iutitle:	wgPageName,
				callback:	'del_gotImageUsage'
			});
		else
			del$callAPI({
				action:	'query',
				list:	'backlinks',
				bllimit:	del_max_links,
				bltitle:	wgPageName,
				callback:	'del_gotBackLinks'
			});
	}
}

function del$insertReason(reason)
{
	var element = document.getElementById('wpReason');

	element.value = reason;

	if (del_hardcore)
	{
		element.form.submit();
	}
}

function pt$init()
{
	var expires = document.getElementById('expires');
	var td = expires.parentNode;

	td.appendChild(document.createElement('br'));
	td.id = 'userSummaryButtons';
	
	for (var caption in pt$times)
	{
		var newButton = document.createElement('a');

		// atrybuty
		newButton.title = pt$times[caption];
		newButton.onclick = function() { expires.value = this.title; };
		newButton.appendChild(document.createTextNode(caption));

		// dodanie przycisku
		td.appendChild(newButton);
	}

	var reason = document.getElementById('mwProtect-reason');
	var td = reason.parentNode;

	td.appendChild(document.createElement('br'));
	td.id = 'userSummaryButtons';
	
	for (var caption in pt$reasons)
	{
		var newButton = document.createElement('a');

		// atrybuty
		newButton.title = pt$reasons[caption];
		newButton.onclick = function() { reason.value = this.title; };
		newButton.appendChild(document.createTextNode(caption));

		// dodanie przycisku
		td.appendChild(newButton);
	}

	// Fragment z [[testwiki:MediaWiki:Sysop.js]], autor: Alex Smotrov
	var inp = document.getElementById('mw-Protect-Form')
	if (inp) addHandler(inp, 'change', noMoveAutoconfirmedProtection)
	function noMoveAutoconfirmedProtection(){
		inp = document.getElementById('mwProtectUnchained')
		if (!inp || inp.checked) return
		inp = document.getElementById('mwProtect-level-move')
		if (inp && inp.selectedIndex==1) inp.selectedIndex = 0
	}
}

function bk$init()
{
	var wpBlockExpiry = document.getElementById('wpBlockExpiry');
	var wpBlockOther = document.getElementById('mw-bi-other');
	
	var td = wpBlockExpiry.parentNode;

	td.appendChild(document.createElement('br'));
	td.id = 'userSummaryButtons';

	for (var caption in bk$times)
	{
		var newButton = document.createElement('a');
		
		// atrybuty
		newButton.title = bk$times[caption];
		newButton.onclick = function() { wpBlockExpiry.value = 'other'; wpBlockExpiry.onchange(); wpBlockOther.value = this.title; };
		newButton.appendChild(document.createTextNode(caption));

		// dodanie przycisku
		td.appendChild(newButton);
	}
}

function br$init() {
	var div = document.getElementById('contentSub');
	if (!div)
		return;

	var url = new String(document.location);
	var img = document.createElement('img');
	img.src = 'http://upload.wikimedia.org/wikipedia/commons/thumb/8/81/Icon_tools.png/30px-Icon_tools.png';

	div.appendChild(document.createElement('br'));
	div.appendChild(img);
	div.appendChild(document.createTextNode(' '));

	if (url.match(/[?&]bot=1/)) {
		var span = document.createElement('span');
		span.innerHTML = br$hideWarning;
		span.style.cssText = 'color:red; font-weight: bold';
		div.appendChild(span);
	}
	else {
		var a = document.createElement('a');
		a.innerHTML = br$hideLink;
		a.href = url.match('\\?') ? url + "&bot=1" : url + "?bot=1";
		a.style.cssText = 'font-weight: bold';
		div.appendChild(a);
	}
}

addOnloadHook(function()
{
	if (wgAction == 'protect' || wgAction == 'unprotect')
		pt$init();

	// jeżeli to nie jest strona 'Usuń' zakończ działanie
	else if (wgAction == "delete" && wgArticleId != 0)
		del$init();

	else if (wgCanonicalSpecialPageName == 'Blockip')
		bk$init();

	else if (wgCanonicalSpecialPageName == 'Contributions')
		br$init();
});
/* Gadget searchbox */

//
 // Search box for Mediawiki
 // Instrukcja obsługi [[Wikipedia:Narzędzia/Wyszukiwanie i zamiana]]
 // Autor: [[:en:User:Zocky]]
 // Licencja: GNU General Public License, http://opensource.org/licenses/gpl-license.php
 // Wersja tłumaczona skryptu: http://en.wikipedia.org/w/index.php?title=User:Zocky/SearchBox.js&oldid=60000195
 // Tłumaczenie i drobne poprawki: Maciej Jaros [[:pl:User:Nux]]
 
//
 
var sr$t;	// sr$t=document.editform.wpTextbox1;
var sr$f;	// sr$f=document.srForm;
var sr$s;	// sr$s=document.srForm.srSearch;
var sr$r;	// sr$r=document.srForm.srReplace;
var sr$w;	// sr$w=sr$t.style.width;
var sr$i;	// sr$i=document.getElementById('SearchIcon');
 
var sr$lang = {
//	'_num_ ocurrences of _str_ replaced' : '$1 ocurrences of $2 replaced.'
	'_num_ ocurrences of _str_ replaced' : 'Zmieniono $1 wystapien $2.'
};
 
/*
 Translate also:
 var srBoxCode = ...
*/
 
function srBack()
{
	if (sr$s.value=='')
	{
		sr$t.focus();
		return;
	}
 
	var searchString = sr$s.value;
	if (!sr$f.srRegexp.checked)
		searchString = searchString.replace(/([\[\]\{\}\|\.\*\?\(\)\$\^\\])/g,'\\$1')
	;
 
	searchString="("+searchString+")(?![\\s\\S]*"+searchString+")";
	if (sr$f.srCase.checked)
		var re=new RegExp(searchString)
	else
		var re=new RegExp(searchString,"i")
	;
 
	var res = re.exec (sr$t.value.substring(0,sr$t.selectionStart));
	if (!res)
		var res = re.exec (sr$t.value)
	;
 
	if (res)
	{
		sr$t.selectionStart=res.index;
		sr$t.selectionEnd=res.index+res[1].length;
	}
	else
		sr$t.selectionStart=sr$t.selectionEnd
	;
 
	srSync();
}
 
function srNext()
{
	if (sr$s.value=='')
	{
		sr$t.focus();
		return
	}
 
	var searchString = sr$s.value;
	if (!sr$f.srRegexp.checked)
		searchString=searchString.replace(/([\[\]\{\}\|\.\*\?\(\)\$\^\\])/g,'\\$1')
	;
 
	if (sr$f.srCase.checked)
		var re=new RegExp(searchString,"g")
	else
		var re=new RegExp(searchString,"gi")
	;
 
	re.lastIndex=sr$t.selectionEnd;
	var res = re.exec (sr$t.value)
	if (!res)
	{
		re.lastIndex=0;
		var res = re.exec (sr$t.value)
	}
 
	if (res)
	{
		sr$t.selectionEnd=res.index+res[0].length;
		sr$t.selectionStart=res.index;
	}
	else
		sr$t.selectionStart=sr$t.selectionEnd
	;
 
	srSync();
}
 
function srReplace()
{
 
	var sels=sr$t.selectionStart;
	var sele=sr$t.selectionEnd;
	var selr=sr$t.value.length-sele;
 
	if (sr$s.value=='' || sels==sele)
	{
		sr$t.focus();
		return;
	}
 
	var searchString = sr$s.value;
	var replaceString = sr$r.value;
	if (!sr$f.srRegexp.checked)
	{
		searchString=searchString.replace(/([\[\]\{\}\|\.\*\?\(\)\$\^\\])/g,'\\$1');
		replaceString=replaceString.replace(/([\$\\])/g,'\\$1');
	}
 
	if (sr$f.srCase.checked)
		var re=new RegExp(searchString,"g")
	else
		var re=new RegExp(searchString,"gi")
	;
 
	re.lastIndex=sels;
	var res = re.exec (sr$t.value);
	var $$=0;
	if (res && res.index==sels && res[0].length==sele-sels)
	{
		if (sr$f.srRegexp.checked)
		{
			replaceString=replaceString.replace(/\\\\/g,'&backslash;').replace(/\\\$/g,'&dollar;');
			var replaceBits=(" "+replaceString).split(/(?=\$\d)/);
			replaceString=replaceBits[0].substring(1);
			for (var i=1; i<replaceBits.length; i++)
			{
				$$=replaceBits[i][1]-'0';
				if ($$<res.length)
					replaceString += res[$$] + replaceBits[i].substring(2)
				else
					replaceString += replaceBits[i]
				;
			}
			replaceString=replaceString.replace(/\\n/g,"\n").replace(/&backslash;/g,"\\").replace(/&dollar;/g,"\$")
		}
		sr$t.value= sr$t.value.substring(0,sels) + replaceString + sr$t.value.substring(sele);
	}
 
	sr$t.selectionStart=sels;
	sr$t.selectionEnd=sr$t.value.length-selr;
	srSync();
}
 
function srReplaceall()
{
	if (!sr$s.value) {
		sr$t.focus();
		return
	}
 
	var sels=sr$t.selectionStart;
	var sele=sr$t.selectionEnd;
	var selr=sr$t.value.length-sele;
 
	var reps;
	var searchString = sr$s.value;
	var replaceString = sr$r.value;
 
	if (sr$f.srRegexp.checked)
	{
		replaceString = replaceString.replace(/\\\\/,'&backslash;').replace(/\\n/,'\n').replace(/&backslash;/,"\\");
	}
	else
	{
		searchString = searchString.replace(/([\[\]\{\}\|\.\*\?\(\)\$\^\\])/g,'\\$1');
		replaceString = replaceString.replace(/([\$\\])/g,'\\$1');
	}
 
	if (sele>sels)
		reps=sr$t.value.substring(sels,sele)
	else
		reps=sr$t.value
	;
 
	if (sr$f.srCase.checked)
		var re=new RegExp(searchString,"g")
	else
		var re=new RegExp(searchString,"gi")
	;
 
	var replaceCounter=0;
 
	var replaceFunc=function()
	{
		replaceCounter++;
		return replaceString;
	};
 
	reps=reps.replace(re,replaceFunc);
 
	if (sele>sels)
		sr$t.value = sr$t.value.substring(0,sels) + reps + sr$t.value.substring(sele);
	else
		sr$t.value = reps
	;
 
	sr$t.selectionStart=sels;
	sr$t.selectionEnd=sele>sels ? sr$t.value.length-selr : sels;
	// ## window.status = replaceCounter+" ocurrences of " + searchString + " replaced.";
	window.status = sr$lang['_num_ ocurrences of _str_ replaced'].replace(/\$1/, replaceCounter).replace(/\$2/, searchString);
 
	srSync();
}
 
function srToggleCase()
{
	var sels=sr$t.selectionStart;
	var sele=sr$t.selectionEnd;
	var selr=sr$t.value.length-sele;
	var selt=sr$t.value.substring(sels,sele);
 
	if (sele>sels)
	{
		if (selt==selt.toUpperCase())
			selt=selt.toLowerCase()
		else if (selt==selt.toLowerCase() && sele-sels>1)
			selt=selt.substring(0,1).toUpperCase()+selt.substring(1).toLowerCase()
		else
			selt=selt.toUpperCase()
		;
 
		sr$t.value = sr$t.value.substring(0,sels) + selt + sr$t.value.substring(sele);
		sr$t.selectionStart=sels;
		sr$t.selectionEnd=sele>sels ? sr$t.value.length-selr : sels;
	}
	srSync();
}
 
 
function srSync()
{
	var i;
	var allLines=0;
	var lineNo=0;
	var w=sr$t.cols-5;
 
	var dummy=sr$t.value.split("\n");
	for (i=0;i<dummy.length;i++){allLines+=Math.ceil(dummy[i].length/w)}
 
	var dummy=sr$t.value.substring(0,sr$t.selectionStart).split("\n");
	for (i=0;i<dummy.length;i++){lineNo+=Math.ceil(dummy[i].length/w)}
 
//	alert (w+" "+lineNo+"/"+allLines);
 
	sr$t.scrollTop=sr$t.scrollHeight*(lineNo-10)/allLines;
	sr$t.focus();
}
 
 
function srInit()
{
	if(document.getElementById('wpTextbox1'))
	{
		var srBoxCode =
			'<form name="srForm"><table id="srBox" cellpadding="0" cellspacing="2">'
			+'<tr>'
				+'<td valign="bottom">'
					+'<span class="label">znajdź:</span><br />'
					+'<input size="17" type="text" name="srSearch" accesskey="F" tabindex="8" onkeypress="event.which == 13 && srNext()"; value="" />'
				+'</td>'
				+'<td valign="bottom">'
					+'<span class="label">zamień na:</span><br />'
					+'<input size="17" type="text" name="srReplace" accesskey="G" tabindex="9" onkeypress="event.which == 13 && srNext()"; value="" />'
				+'</td>'
				+'<td valign="top">'
					+'<label><input type="checkbox" name="srCase" onclick="sr$t.focus()" tabindex="10" />uwzględnij wielkość liter</label>'
					+'<label><input type="checkbox" name="srRegexp" onclick="sr$t.focus()" tabindex="11" />użyj RegEx</label>'
					+'<br />'
					+'<a href="javascript:srBack()" onmouseover="sr$t.focus()" title="szukaj wstecz [alt-2]" accesskey="2">&lt;</a>&nbsp;'
					+'<a href="javascript:srNext()" onmouseover="sr$t.focus()" title="szukaj dalej [alt-3]" accesskey="3">szukaj&nbsp;&nbsp;&gt;</a>&emsp;'
					+'<a href="javascript:srReplace();srBack()" onmouseover="sr$t.focus()" title="zamień znalezione i szukaj poprzedniego [alt-4]" accesskey="4">&lt;</a>&nbsp;'
					+'<a href="javascript:srReplace()" onmouseover="sr$t.focus()" title="zamień znalezione">zamień</a>&nbsp;'
					+'<a href="javascript:srReplace();srNext()" onmouseover="sr$t.focus()" title="zamień znalezione i szukaj następnego [alt-5]" accesskey="5">&gt;</a>&emsp;'
					+'<a href="javascript:srReplaceall()" onmouseover="sr$t.focus()" title="zamień wszystkie wystąpienia, które zostaną znalezione [alt-7]" accesskey="7">zamień&nbsp;wszystkie</a>&emsp;'
				+'</td>'
			+'</tr>'
			+'</table></form>'
		;
		var el=document.getElementById('searchInput');
		if (el) el.accessKey='none';
 
		sr$t=document.editform.wpTextbox1;
		sr$w=sr$t.style.width;
 
		//
		// inserting buttons
		var btns=document.createElement('span');
		btns.innerHTML=
			'<a id="SearchIcon" href="javascript:srShowHide()">'
				+'<img style="cursor: pointer;" title="Wyszukiwanie i zamiana" alt="Wyszukiwanie i zamiana" src="http://upload.wikimedia.org/wikipedia/en/1/12/Button_find.png" border="0" height="22" width="23">'
			+'</a>'
			+'<a href="javascript:srToggleCase()">'
				+'<img style="cursor: pointer;" title="Zmiana wielkości liter" alt="Zmiana wielkości liter" src="http://upload.wikimedia.org/wikipedia/en/1/12/Button_case.png" border="0" height="22" width="23">'
			+'</a>'
		;
 
		var el=document.getElementById('toolbar');
		if (el)
		{
			el.appendChild(btns)
		}
		else
		{
			el=document.getElementById('editform');
			el.parentNode.insertBefore(btns,el);
		} 
 
		sr$i=document.getElementById('SearchIcon');
		sr$i.accessKey="F";
 
		//
		// inserting box
		var srbox=document.createElement('div');
		srbox.innerHTML=srBoxCode;
		srbox.firstChild.style.display='none';		
 
		el=document.getElementById('editform');
		el.parentNode.insertBefore(srbox,el);
 
		sr$f=document.srForm;
		sr$s=document.srForm.srSearch;
		sr$r=document.srForm.srReplace;
	}
}
 
function srShowHide()
{
	if (sr$f.style.display=='none')
	{
		sr$f.style.display='block';
		sr$i.accessKey="none";
		sr$t.style.width='auto';
		sr$s.focus();
	}
	else
	{
		sr$f.style.display='none';
		sr$t.style.width=sr$w;
		sr$i.accessKey="F";
	}
}
 
addOnloadHook(srInit);
 
//

/*
  Funkcje sortowania w tabelkach
*/
function ts_parseFloat(num) {
        if (!num) return 0;
        num = parseFloat(num.replace(/,/g, ".").replace(/[\xa0]/g, ""));
        return (isNaN(num) ? 0 : num);
}
 
function ts_resortTable(lnk) {
        // get the span
        var span = lnk.getElementsByTagName('span')[0];
 
        var td = lnk.parentNode;
        var tr = td.parentNode;
        var column = td.cellIndex;
 
        var table = tr.parentNode;
        while (table && !(table.tagName && table.tagName.toLowerCase() == 'table'))
                table = table.parentNode;
        if (!table) return;
 
        // Work out a type for the column
        if (table.rows.length <= 1) return;
 
        // Skip the first row if that's where the headings are
        var rowStart = (table.tHead && table.tHead.rows.length > 0 ? 0 : 1);
 
        var itm = "";
        for (var i = rowStart; i < table.rows.length; i++) {
                if (table.rows[i].cells.length > column) {
                        itm = ts_getInnerText(table.rows[i].cells[column]);
                        itm = itm.replace(/^[\s\xa0]+/, "").replace(/[\s\xa0]+$/, "");
                        if (itm != "") break;
                }
        }
 
        sortfn = ts_sort_caseinsensitive;
        if (itm.match(/^\d\d[\/. -][a-zA-Z]{3}[\/. -]\d\d\d\d$/))
                sortfn = ts_sort_date;
        if (itm.match(/^\d\d[\/.-]\d\d[\/.-]\d\d\d\d$/))
                sortfn = ts_sort_date;
        if (itm.match(/^\d\d[\/.-]\d\d[\/.-]\d\d$/))
                sortfn = ts_sort_date;
        if (itm.match(/^[\u00a3$\u20ac]/)) // pound dollar euro
                sortfn = ts_sort_currency;
        if (itm.match(/^[\d.,\xa0]+\%?$/))
                sortfn = ts_sort_numeric;
 
        var reverse = (span.getAttribute("sortdir") == 'down');
 
        var newRows = new Array();
        for (var j = rowStart; j < table.rows.length; j++) {
                var row = table.rows[j];
                var keyText = ts_getInnerText(row.cells[column]);
                var oldIndex = (reverse ? -j : j);
 
                newRows[newRows.length] = new Array(row, keyText, oldIndex);
        }
 
        newRows.sort(sortfn);
 
        var arrowHTML;
        if (reverse) {
                        arrowHTML = '<img src="'+ ts_image_path + ts_image_down + '" alt="↓"/>';
                        newRows.reverse();
                        span.setAttribute('sortdir','up');
        } else {
                        arrowHTML = '<img src="'+ ts_image_path + ts_image_up + '" alt="↑"/>';
                        span.setAttribute('sortdir','down');
        }
 
        // We appendChild rows that already exist to the tbody, so it moves them rather than creating new ones
        // don't do sortbottom rows
        for (var i = 0; i < newRows.length; i++) {
                if ((" "+newRows[i][0].className+" ").indexOf(" sortbottom ") == -1)
                        table.tBodies[0].appendChild(newRows[i][0]);
        }
        // do sortbottom rows only
        for (var i = 0; i < newRows.length; i++) {
                if ((" "+newRows[i][0].className+" ").indexOf(" sortbottom ") != -1)
                        table.tBodies[0].appendChild(newRows[i][0]);
        }
 
        // Delete any other arrows there may be showing
        var spans = getElementsByClassName(tr, "span", "sortarrow");
        for (var i = 0; i < spans.length; i++) {
                spans[i].innerHTML = '<img src="'+ ts_image_path + ts_image_none + '" alt="↓"/>';
        }
        span.innerHTML = arrowHTML;
 
        ts_alternate(table);            
}
/* Test if an element has a certain class **************************************
 *
 * Description: Uses regular expressions and caching for better performance.
 * Maintainers: [[User:Mike Dillon]], [[User:R. Koot]], [[User:SG]]
 */

var hasClass = (function () {
    var reCache = {};
    return function (element, className) {
        return (reCache[className] ? reCache[className] : (reCache[className] = new RegExp("(?:\\s|^)" + className + "(?:\\s|$)"))).test(element.className);
    };
})();

/** Collapsible tables *********************************************************
 *
 *  Description: Allows tables to be collapsed, showing only the header. See
 *               [[Wikipedia:NavFrame]].
 *  Maintainers: [[User:R. Koot]]
 */

var autoCollapse = 2;
var collapseCaption = "ukryj";
var expandCaption = "pokaż";

function collapseTable( tableIndex )
{
    var Button = document.getElementById( "collapseButton" + tableIndex );
    var Table = document.getElementById( "collapsibleTable" + tableIndex );

    if ( !Table || !Button ) {
        return false;
    }

    var Rows = Table.rows;

    if ( Button.firstChild.data == collapseCaption ) {
        for ( var i = 1; i < Rows.length; i++ ) {
            Rows[i].style.display = "none";
        }
        Button.firstChild.data = expandCaption;
    } else {
        for ( var i = 1; i < Rows.length; i++ ) {
            Rows[i].style.display = Rows[0].style.display;
        }
        Button.firstChild.data = collapseCaption;
    }
}

function createCollapseButtons()
{
    var tableIndex = 0;
    var NavigationBoxes = new Object();
    var Tables = document.getElementsByTagName( "table" );

    for ( var i = 0; i < Tables.length; i++ ) {
        if ( hasClass( Tables[i], "collapsible" ) ) {

            /* only add button and increment count if there is a header row to work with */
            var HeaderRow = Tables[i].getElementsByTagName( "tr" )[0];
            if (!HeaderRow) continue;
            var Header = HeaderRow.getElementsByTagName( "th" )[0];
            if (!Header) continue;

            NavigationBoxes[ tableIndex ] = Tables[i];
            Tables[i].setAttribute( "id", "collapsibleTable" + tableIndex );

            var Button     = document.createElement( "span" );
            var ButtonLink = document.createElement( "a" );
            var ButtonText = document.createTextNode( collapseCaption );

            Button.className = "collapseButton";  //Styles are declared in Common.css

            ButtonLink.style.color = Header.style.color;
            ButtonLink.setAttribute( "id", "collapseButton" + tableIndex );
            ButtonLink.setAttribute( "href", "javascript:collapseTable(" + tableIndex + ");" );
            ButtonLink.appendChild( ButtonText );

            Button.appendChild( document.createTextNode( "[" ) );
            Button.appendChild( ButtonLink );
            Button.appendChild( document.createTextNode( "]" ) );

            Header.insertBefore( Button, Header.childNodes[0] );
            tableIndex++;
        }
    }

    for ( var i = 0;  i < tableIndex; i++ ) {
        if ( hasClass( NavigationBoxes[i], "collapsed" ) || ( tableIndex >= autoCollapse && hasClass( NavigationBoxes[i], "autocollapse" ) ) ) {
            collapseTable( i );
        } 
        else if ( hasClass( NavigationBoxes[i], "innercollapse" ) ) {
            var element = NavigationBoxes[i];
            while (element = element.parentNode) {
                if ( hasClass( element, "outercollapse" ) ) {
                    collapseTable ( i );
                    break;
                }
            }
        }
    }
}

addOnloadHook( createCollapseButtons );


/** Dynamic Navigation Bars (experimental) *************************************
 *
 *  Description: See [[Wikipedia:NavFrame]].
 *  Maintainers: UNMAINTAINED
 */

// set up the words in your language
var NavigationBarHide = '[' + collapseCaption + ']';
var NavigationBarShow = '[' + expandCaption + ']';

// shows and hides content and picture (if available) of navigation bars
// Parameters:
//     indexNavigationBar: the index of navigation bar to be toggled
function toggleNavigationBar(indexNavigationBar)
{
    var NavToggle = document.getElementById("NavToggle" + indexNavigationBar);
    var NavFrame = document.getElementById("NavFrame" + indexNavigationBar);

    if (!NavFrame || !NavToggle) {
        return false;
    }

    // if shown now
    if (NavToggle.firstChild.data == NavigationBarHide) {
        for (var NavChild = NavFrame.firstChild; NavChild != null; NavChild = NavChild.nextSibling) {
            if ( hasClass( NavChild, 'NavPic' ) ) {
                NavChild.style.display = 'none';
            }
            if ( hasClass( NavChild, 'NavContent') ) {
                NavChild.style.display = 'none';
            }
        }
    NavToggle.firstChild.data = NavigationBarShow;

    // if hidden now
    } else if (NavToggle.firstChild.data == NavigationBarShow) {
        for (var NavChild = NavFrame.firstChild; NavChild != null; NavChild = NavChild.nextSibling) {
            if (hasClass(NavChild, 'NavPic')) {
                NavChild.style.display = 'block';
            }
            if (hasClass(NavChild, 'NavContent')) {
                NavChild.style.display = 'block';
            }
        }
        NavToggle.firstChild.data = NavigationBarHide;
    }
}

// adds show/hide-button to navigation bars
function createNavigationBarToggleButton()
{
    var indexNavigationBar = 0;
    // iterate over all < div >-elements 
    var divs = document.getElementsByTagName("div");
    for (var i = 0; NavFrame = divs[i]; i++) {
        // if found a navigation bar
        if (hasClass(NavFrame, "NavFrame")) {

            indexNavigationBar++;
            var NavToggle = document.createElement("a");
            NavToggle.className = 'NavToggle';
            NavToggle.setAttribute('id', 'NavToggle' + indexNavigationBar);
            NavToggle.setAttribute('href', 'javascript:toggleNavigationBar(' + indexNavigationBar + ');');

            var isCollapsed = hasClass( NavFrame, "collapsed" );
            /*
             * Check if any children are already hidden.  This loop is here for backwards compatibility:
             * the old way of making NavFrames start out collapsed was to manually add style="display:none"
             * to all the NavPic/NavContent elements.  Since this was bad for accessibility (no way to make
             * the content visible without JavaScript support), the new recommended way is to add the class
             * "collapsed" to the NavFrame itself, just like with collapsible tables.
             */
            for (var NavChild = NavFrame.firstChild; NavChild != null && !isCollapsed; NavChild = NavChild.nextSibling) {
                if ( hasClass( NavChild, 'NavPic' ) || hasClass( NavChild, 'NavContent' ) ) {
                    if ( NavChild.style.display == 'none' ) {
                        isCollapsed = true;
                    }
                }
            }
            if (isCollapsed) {
                for (var NavChild = NavFrame.firstChild; NavChild != null; NavChild = NavChild.nextSibling) {
                    if ( hasClass( NavChild, 'NavPic' ) || hasClass( NavChild, 'NavContent' ) ) {
                        NavChild.style.display = 'none';
                    }
                }
            }
            var NavToggleText = document.createTextNode(isCollapsed ? NavigationBarShow : NavigationBarHide);
            NavToggle.appendChild(NavToggleText);

            // Find the NavHead and attach the toggle link (Must be this complicated because Moz's firstChild handling is borked)
            for(var j=0; j < NavFrame.childNodes.length; j++) {
                if (hasClass(NavFrame.childNodes[j], "NavHead")) {
                    NavFrame.childNodes[j].appendChild(NavToggle);
                }
            }
            NavFrame.setAttribute('id', 'NavFrame' + indexNavigationBar);
        }
    }
}

addOnloadHook( createNavigationBarToggleButton );



// Udostępniane na tej Wiki na licencji CC-BY-NC-SA za zgodą autora
// http://creativecommons.org/licenses/by-nc-sa/3.0/deed.pl
$("body").append('<div id="fb-root"></div><script>(function(d, s, id) {var js, fjs = d.getElementsByTagName(s)[0];if (d.getElementById(id)) return;js = d.createElement(s); js.id = id;js.src = "//connect.facebook.net/pl_PL/all.js#xfbml=1";fjs.parentNode.insertBefore(js, fjs);}(document, \'script\', \'facebook-jssdk\'));</script>');
$(document).ready(function(){
	$("<div id='FacebookWnd'></div>").css({
		background:'url(https://images.wikia.nocookie.net/bleach/pl/images/5/55/Facebook.png)',
		width:242,
		height:401,
		position:'fixed',
		top:150,
		right:-210,
		zIndex:300}).appendTo("body");
	//Zawartość
	$('<div class="fb-like-box" data-href="https://www.facebook.com/pages/Ranczopedia/633050340074276" data-width="185" data-height="361" data-show-faces="true" data-stream="false" data-header="false"></div>').css({marginTop:"10px", marginLeft:"47px"}).appendTo("#FacebookWnd");
	$("#FacebookWnd").click(function(){
		toggleFacebookWnd();
	});
});
 
function toggleFacebookWnd() {
	if (parseInt($("#FacebookWnd").css("right"))!==0) $("#FacebookWnd").animate({right:"0px"}, 700);
	else $("#FacebookWnd").animate({right:"-210px"}, 700);
}


importArticles({
    type: "script",
    articles: [
        "w:c:dev:Countdown/code.js"
    ]
});


//Licznik na żywo - w trakcie optymalizacji
 
function startTime() {
 var c_target = document.getElementById('CountdownTarget');
 var c_timer = document.getElementById('CountdownTimer');
 if(c_target != undefined) {
  var dr = Date.parse(c_target.innerHTML);
  var today=new Date();
  var dt=today.getTime();
  /*var h=today.getHours();
  var m=today.getMinutes();*/
  var s=today.getSeconds();
  var d=Math.floor((dr-dt) / 86400000);
//Teraz następuje sprawdzenie, czy czas do podanej daty już minął i ewentualne zatrzymanie licznika
 if (d<0){
   c_timer.innerHTML = '<tr><td>0<br /><span class="CountdownLabel">Dni</span></td><td>0<br /><span class="CountdownLabel">Godzin</span></td><td>00<br /><span  class="CountdownLabel">Minut</span></td><td>00<br /><span class="CountdownLabel">Sekund</span></td>';
  }
//Jeśli czas jeszcze nie minął, to skrypt jest kontynuowany
 else {
  var h1=Math.floor((dr-dt) % 86400000 / 3600000)
  var m1=Math.floor((dr-dt) % 86400000 % 3600000 / 60000)
  var s1=59-s;
 
  /*m=checkTime(m);
  s=checkTime(s);*/
  m1=checkTime(m1);
  s1=checkTime(s1);
 
   c_timer.innerHTML = '<tr><td>' + d + '<br /><span class="CountdownLabel">' + liczbaMnoga(d, 'Dzień', 'Dni', 'Dni') + '</span></td>' + '<td>' + h1 + '<br /><span class="CountdownLabel">' + liczbaMnoga(h1, 'Godzinę', 'Godziny', 'Godzin') + '</span></td>' + '<td>' + m1 + '<br /><span  class="CountdownLabel">' + liczbaMnoga(m1, 'Minutę', 'Minuty', 'Minut') + '</span></td>' + '<td>' + s1 + '<br /><span class="CountdownLabel">' + liczbaMnoga(s1, 'Sekundę', 'Sekundy', 'Sekund') + '</span></td>';
   t=setTimeout('startTime()',500);
 }
}
 }
function checkTime(i)
{
if (i<10)
  {
  i="0" + i;
  }
return i;
}
 
//Skrypt do obliczania poprawnej formy liczby mnogiej autorstwa Vengira, optymalizowany przez Dj mateooshkę
 
function liczbaMnoga(dana,pojedyncza,mnoga1,mnoga2)
{
  if (dana==1)
  {
    return pojedyncza;
  } else if (dana%10>1&&dana%10<5&&(dana%100<12||dana%100>21)) {
    return mnoga1;
  } else {
    return mnoga2;
  }
}
addOnloadHook(startTime);