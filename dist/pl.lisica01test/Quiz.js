var quizName = "Quiz — Ben 10";
var quizLang = "pl";
var resultsTextArray = [ 
	"Poszło kiepsko. Czas odświeżyć swoją wiedzę o Benie 10!",
	"Nie jest źle, ale mogłoby być lepiej! Może czas odświeżyć sobie serię „Ben 10”?",
	"Masz większość poprawnych odpowiedzi, brawo!",
	"Gratulacje, twoja wiedza o Benie 10 jest godna naśladowania!"
	];
var questions = [
 
	["Który gatunek jest uważany za najmądrzejszy?",
	"Galwan",
	"Człowiek",
	"Wulpimancer",
	"Polarny Manzardill",
	"Osmozjanin"], 
 
	["Askalon to...",
	"Miecz stworzony przez Azmutha",
	"Gatunek obcego",
	"Kosmita z Omnitrixa",
	"Tytuł odcinka",
	"Nie ma czegoś takiego"],
 
	["Któremu z obcych w trakcie serii „Omniverse” zmienił się wygląd?",
	"Szlamfajerowi",
	"Dzikopyskowi",
	"Armowiertłowi",
	"NRG",
	"Szarej Materii"],
 
	["Jak nazywa się zaklęcie tworzące wiatr do popychania rzeczy?",
	"Gallius Disruptus",
	"Nie wiadomo",
	"Ortis Expositis",
	"Barban Hextida Zerzam",
	"Transfera Identica"],
 
	["Z jakiej planety pochodzi rasa Spheroidów?",
	"Scalpasc",
	"Viscosia",
	"Anur Phaetos",
	"Encephalonus IV",
	"Terraexcava"],
 
	["Jak ma na imię Czarodziejka?",
	"Hope",
	"Rayona",
	"Nie pada jej imię w serialu",
	"Jennifer",
	"Elena",
	"Marianna"],
 
	["W którym odcinku zadebiutował król Xarion?",
	"Król Viktor",
	"W kazamatach",
	"Szkolenie",
	"Nie pijcie wody",
	"Jeszcze się nie pojawił"],
 
	["Kto nie należy do Szwadronu Alfa?",
	"Gwen",
	"Kodek",
	"Cykor",
	"Molly"],
 
	["Jakiego gatunku jest Khyber?",
	"Nie wiadomo",
	"Petrosapien",
	"Wulpimancer",
	"Loboan",
	"Człowiek"],
 
	["Jak brzmi oryginalna, angielska nazwa Klona?",
	"Ditto",
	"ChamAlien",
	"Diamondhead",
	"Upchuck",
	"Frankenstrike"],
 
	["Kto jest zastępcą kosmicznego wilkołaka w OV?",
	"Crüjo",
	"Kuphulu",
	"Fantom",
	"Viktor",
	"Eunice"],
 
	["Ile zwierzaków posiada/posiadał Khyber?",
	"2",
	"1",
	"3",
	"4",
	"5"],
 
	["Trombipulor to przyjaciel czy wróg Bena?",
	"Wróg",
	"Przyjaciel",
	"Nie wiadomo"],
 
	["Jaka jest jednostka monetarna w Undertown?",
	"Tajden",
	"Euro",
	"Dolar",
	"Nie wiadomo",
	"Grosz"],
 
	["W którym roku zmarł Dwayne McDuffie?",
	"2011",
	"1999",
	"2000",
	"2004",
	"2014"],
 
	["Kto jest założycielem Ben 10 Wiki?",
	"Rafi862",
	"Szynka013",
	"Arachnet",
	"Luki12024",
	"Edwin282"]
	];
 
importArticles({
    type: 'script',
    articles: [
        'u:dev:Quiz/code.js'
    ]
});