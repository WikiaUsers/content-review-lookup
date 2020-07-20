var quizName = "Quiz — Risen";
var quizLang = "pl";
var resultsTextArray = [ 
	"Poszło bardzo źle. Przypomnij sobię wiedzę o Risenie i spróbuj jeszcze raz!",
	"Nie jest źle, ale mogłoby być lepiej! Może czas odświeżyć sobie pamięć o informacje z Risena??",
	"Masz większość poprawnych odpowiedzi, brawo!",
	"Gratulacje, masz poprawne wszystkie odpowiedzi!"
	];
var questions = [
 
	["Kto założył Risenpedię?",
	"Urbanski97",
	"Wedkarski",
	"ProOski",
	"NihilusX",
	"Nikt"], 

        ["Jaki potwór wystraszył Vasco?",
	"Mogilny pająk",
	"Łodzik",
	"Ćma Grobowa",
	"Ćma Szponiasta",
	"Świerszcz bojowy"], 
        
        ["Gdzie ukrył się Garcia?",
	"Udawał Corrientesa",
	"Na Tacarigui",
	"W swojej chacie",
	"Nie wiadomo",
	"U Wrony"], 
 
         ["W którym roku powstała Piranha Bytes?",
	"1997",
	"1996",
	"1998",
	"Powstała rok przed wydaniem Gothic",
	"2000"], 
 
	["Gdzie znajduje się spreparowana głowa?",
	"Na cmentarzu Shaganumbi",
	"Cały czas ma ją przy sobie Wrona",
	"Cały czas ma ją przy sobie Stalowobrody",
	"W serii nie ma takiej rzeczy",
	"Żaden z powyższych"]
	];

        ["Kto prowadzi dom publiczny w mieście portowym na Farandze",
	"Sonia",
  	"Patty",
	"Carlos",
	"W pierwszej części nie ma domu publicznego",
	"Don Esteban"]
	];
 
importArticles({
    type: 'script',
    articles: [
        'u:dev:Quiz/code.js'
    ]
});