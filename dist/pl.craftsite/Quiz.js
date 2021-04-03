var quizName = "Quiz — Craftsite";
var quizLang = "pl";
var resultsTextArray = [ 
	"Poszło bardzo źle. Przypomnij sobie wiedzę o Craftsite i spróbuj jeszcze raz!",
	"Nie jest źle, ale mogłoby być lepiej! Może czas odświeżyć sobie pamięć o informacje z Craftsite?",
	"Masz większość poprawnych odpowiedzi, brawo!",
	"Gratulacje, udało ci się odpowiedzieć poprawnie na wszystkie pytania!"
	];
var questions = [
 
	["Kto założył Craftsite?",
	"Adshi",
	"Chuck Norris",
	"Chlitto",
	"Qvazi",
	"Wirtualnosc"], 
 
        ["W którym roku został stworzony Craftite?",
	"2009",
	"2011",
	"2008",
	"2007",
	"2006",
	"2010",
	"2012",
	"2014",
	"2013"], 
 
        ["Jaki kolor nicku mają Operatorzy Kopalni?",
	"Zielony",
	"Żółty",
	"Czarny",
	"Niebieski",
	"Czerwony"]
	];
 
importArticles({
    type: 'script',
    articles: [
        'u:dev:Quiz/code.js'
    ]
});