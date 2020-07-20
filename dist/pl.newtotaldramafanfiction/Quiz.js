/* Umieszczony tutaj kod JavaScript spowoduje załadowanie NFTP Drama Quizu we wszystkich skórkach */
/* QUIZ */
var quizName = "Quiz";
var quizLang = "pl";
var resultsTextArray = [ 
	"No, trochę kiepsko.",
	"Nie tak źle, ale mogłoby być lepiej.",
	"Dobra robota!" 
	];
var questions = [
 
    ["Kto był głównym antagonistą we wszystkich częściach programu? (1 sezon - 5.2 sezon)",
	"Chris",
	"Duncan",
	"Courtney",
	"Mike"],
 
	["Kto stał za eliminacją Modowych Blogerów?",
	"Oni sami",
	"Tom",
	"Jen",
	"Carrie",
	"A co to ma wspólnego z Wariackim Wyścigiem?"],
 
	["Które miejsce jest wyspą?",
	"Wawanakwa",
	"Toronto",
	"Skaftafell",
	"Crazy's Hill"],
 
    ["Gdzie wylądowała Heather po swojej eliminacji w Plejadzie Gwiazd?",
	"W Kanadzie",
	"W Syberii",
	"W Rosji",
	"W Grenlandii"], 
	
	["Ile razy w Wariackim Wyścigu zawodnicy zwiedzają Kanadę?",
	"3",
	"1",
	"2",
	"4",], 
	
    ["Jakim Acapulco było etapem w Wariackim Wyścigu?",
	"Dwudziestym",
	"Piętnastym",
	"Osiemnastym",
	"Dwudziestym pierwszym"], 
	
    ["Kto odpadł jako dwudziesty na Wyspie Totalnej Porażki",
	"LeShawna",
	"Sadie",
	"Justin",
	"Izzy"], 
	
	["Kiedy nastąpiła polska premiera Totalnej Porażki w Trasie?",
	"09.09.2010r.",
	"05.04.2010r.",
	"21.06.2010r.",
	"10.06.2010r."],

	["Jaki „przydomek” nosi Lindsay?",
	"The Dumb Princess",
	"The Dumb Idiot",
	"The Dumb Queen",
	"The Dumb Girl"],

	["Którym numerem odcinka (ogólnie) był odcinek pt. „Podsumowanie I: Łza Konca Problemów Bridgette”?",
	"Pięćdziesiątym ósmym",
	"Pięćdziesiątym czwartym",
	"Pięćdziesiątym trzecim",
        "Pięćdziesiątym szóstym"],
	];
 
importArticles({
    type: 'script',
    articles: [
        'u:dev:Quiz/code.js'
    ]
});