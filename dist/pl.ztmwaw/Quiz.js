/* Kod na podstawie kodu Gothicpedii */
var quizName = "Quiz";
var quizLang = "pl";
var resultsTextArray = [ 
	"Poszło kiepsko. Czas odświeżyć swoją wiedzę z ZTM!",
	"Nie jest źle, ale mogłoby być lepiej! Może czas odświeżyć sobie wiedzę o ZTM?",
	"Masz większość poprawnych odpowiedzi, brawo!",
	"Gratuluję, twoja wiedza o ZTM jest godna naśladowania!"
	];
var questions = [
 
	["Gdzie jedzie linia autobusowa 163 (kierunek od ... w okolicach ulicy Sobieskiego)",
	"Sadyba",
	"Wilanów",
	"Stegny",
	"Branickiego",
	"Świątynia opatrzności Bożej"], 
 

	["Gdzie leży pętla tramwajowa Mokotów?",
	"Nie wiadomo",
	"Przy Galerii Mokotów",
	"Przy ulicy Rzymowskiego"],
 
 
	["Kto jest dyrektorem ZTM?",
	"Wiesław Witek",
	"Hertan",
	"Hanna Gronkiewicz-Waltz",
	"Donald Tusk"],
 
 
	["Kto jest założycielem ZTM Warszawa Wiki?",
	"DanielekKMA",
	"DeXart",
	"Wedkarski",
	"Light22",
	"Baakamono"]
	];
 
importArticles({
    type: 'script',
    articles: [
        'u:dev:Quiz/code.js'
    ]
});