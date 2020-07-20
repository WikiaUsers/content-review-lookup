/* Umieszczony tutaj kod JavaScript zostanie załadowany przez każdego użytkownika, podczas każdego ładowania strony. */

/* Komunikat */
var WikiaNotificationMessage = "Pomóż Dr House Wiki! Kliknij <a href='/wiki/Dołącz_do_nas'>tutaj</a> i dołącz do grona edytorów.";
var WikiaNotificationexpiry = 999;
importScriptPage('WikiaNotification/code.js', 'dev');
/* Quiz */
importScriptPage('Quiz/code.js', 'dev');
var quizName = "Test wiedzy na temat serialu Dr House";
var quizLang = "pl";
var resultsTextArray = [
	"Uuu... ;(",
	"Może być lepiej",
	"Nie jest źle",
	"Świetny wynik"
	];
var questions = [
 
	["Który aktor zagrał Jamesa Wilsona?",
	"Robert Sean Leonard",
	"Bogusław Linda",
	"Gregory House",
	"James Rodriguez"], 
 
	["Dlaczego Lawrence Kutner przestaje pracować u House'a?",
	"Popełnia samobójstwo",
	"Przenosi się do lepiej płatnej pracy",
	"Wyjerzdza do Indii"],
 
	["W jakim kraju mieszkał Dr House, gdy był dzieckiej?",
	"W Japonii",
	"W Hondurasie",
	"W Chinach"],
 
	["Na co chorowała Remy Hadley?",
	"Na Pląsawicę Huntingtona",
	"Na Sarkoidoze",
	"Była zdrowa",
	"Na Dżumę"],
 
	["Jak ma na imię Foreman?",
	"Eric",
	"Jacob",
	"Junior",
	"Adam"],
 
	["Jaką specjalność miała Allison Cameron?",
	"Immunologia",
	"Internista",
	"Kardiologia",
	"Chirurgia"],
 
	["Gdzie House poznał Jessice Adams?",
	"W więzieniu",
	"W burdelu",
	"Na przesłuchaniu o pracę",
	"W parku obok szpitala"],
 
	["Jak miał na imię ojciec Chi Park",
	"Kwansik",
	"Chung",
	"Ching",
	"Kim"],
 
	["Czy serial dzieje się w New Jersey?",
	"Prawda",
	"Fałsz"],
 
	["Na co umiera House w ostatnim odcinku?",
	"Nie umiera",
	"Na AIDS",
	"Popełnia samobujstwo",
	"Zostaje zastrzelony"]
 
	];