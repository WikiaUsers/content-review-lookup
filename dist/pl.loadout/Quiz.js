var quizName = "Quiz — Loadout";
var quizLang = "pl";
var resultsTextArray = [ 
	"Poszło bardzo źle. Przypomnij sobię wiedzę o Loadout i spróbuj jeszcze raz!",
	"Nie jest źle, ale mogłoby być lepiej! Może czas odświeżyć sobie pamięć o informacje z Loadout??",
	"Masz większość poprawnych odpowiedzi, brawo!",
	"Gratulacje, udało ci się odpowiedzieć poprawnie na wszystkie pytania!"
	];
var questions = [
 
	["Jaką postać przypomina Axl z gry?",
	"Rambo",
	"Mr. T",
	"Barrack Obama",
	"Chuck Norris",
	"Donald Tusk"], 
 
        ["Jaka broń ma najwięcej części do podmiany?",
	"Wyrzutnia Rakiet",
	"Karabin",
	"Laser",
	"Broń Pulsacyjna",
	"Granat"], 
 
        ["Która mapa jako pierwsza obsługiwała tryb Zagłady?",
	"Parking Przyczep Kempingowych",
	"Cztery Punkty",
	"Grota Wierteł"], 
 
         ["W którym roku Loadout wyszedł z zamkniętej bety?",
	"2014",
	"2013",
	"2012",
	"Nie wyszła z bety",
	"Wyjdzie w 2016"], 

         ["Który bonus z trybu Zagłada daje więcej życia?",
	"Tank",
	"Medyk",
	"Pogromca",
	"Żaden",
	"Wszystkie naraz"], 
 
	["Który z tych przedmiotów nie ukazuje się domyślnie w menu ubrań?",
	"Koszulka Alienware",
	"Topless",
	"Żaden",
	"Afro",
	"Gangsterska Bandana"]
	];
 
importArticles({
    type: 'script',
    articles: [
        'u:dev:Quiz/code.js'
    ]
});