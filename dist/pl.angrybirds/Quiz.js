var quizName = "Quiz — AngryBirds";
var quizLang = "pl";
var resultsTextArray = [ 
	"Poszło kiepsko. Czas odświeżyć swoją wiedzę o AngryBirds!",
	"Nie jest źle, ale mogłoby być lepiej! Może czas odświeżyć sobie serię „AngryBirds”?",
	"Masz większość poprawnych odpowiedzi, brawo!",
	"Gratulacje, twoja wiedza o AngryBirds jest godna naśladowania!"
	];
var questions = [
 
	["Który ptak jest maskotką AngryBirds?",
	"Red",
	"Chuck",
	"Bomb",
	"Potężny Orzeł",
	"Hokejowy Ptak"],

	["Król Świń jest...",
	"Dziecinny",
	"Wyniosły",
	"Bezwzględny",
	"Przyjacielski",
	"Mądry"],

	["Chuck jest...",
	"Kanarkiem",
	"Kurą",
	"Krukiem",
	"Świnią",
	"Smokiem"],

	["Potężnym stworzeniem nie jest...",
	"Red",
	"Filadelski Orzeł",
	"Orzeł",
	"Smok",
	"Buzzard"],
	["W którym odcinku debiutuje Bomb w serii Angry Birds Toons?",
	"Off Duty",
	"Nighty Night Terence",
	"Slow the Chuck Down!",
	"Mona Litha",
	"Clash o Corns"],

	["Ile było śwìńskich malarzy całej historii Angry Birds?",
	"2",
	"4",
	"1",
	"5",
	"8",
	"Nie było żadnego malarza"],

	["Firma, która wyprodukowała AngryBirds to?",
	"Rovio Entertainment",
	"Acclaim Entertainment",
	"Mojang",
	"Ubisoft",
	"Jeszcze się nie pojawił"],

	["Który odcinek jest z drugiego sezonu Angry Birds Toons?",
	"Boulder Bro",
	"Gardening with Terence",
	"Chuck Time",
	"Snowed Up"],
	["Arcee transformuje się w...?",
	"Poduszkowiec",
	"Czołg",
	"Motor",
	"Wyścigówkę",
	"Ciężarówkę"],

	["Kto jest najstarszą świnią?",
	"Świnia Kronikarz",
	"Profesor Świń",
	"Wąsata Świnia",
	"Król Świń",
	"Piggy Mc'Cool"],

	["Piggy Mc'Cool jest przebrany za...?",
	"Jednego z Bluesów",
	"Chucka",
	"Reda",
	"Bomba",
	"Hala"],

	["Red ma moc w rozdziale...",
	"Red's Mighty Feathers",
	"Mighty Hoax",
	"Big Setup",
	"Danger Zone",
	"Mine and Dine"],

	["Hal gra na...",
	"Banjo",
	"Gitarze",
	"Skrzypcach"],

	["Gale zginęła w odcinku...",
	"To the Bitter End",
	"The Portait",
	"Don't Steal my Birthday",
	"Gale nie zginęła",
	"Piggy Love"],

	["Peter Vesterbacka znany też jest jako...",
	"Potężny Orzeł",
	"Red",
	"Ekspert AngryBirds",
	"Król Gniazda",
	"Nie ma przezwiska"],

	["Kto założył AngryBirds Wiki?",
	"Rrouge",
	"Pawel1631",
	"Lubie Bendera",
	"Bomb Bird",
	"Night Furia"]
	];
importArticles({
    type: 'script',
    articles: [
        'u:dev:Quiz/code.js'
    ]
});