/*============================================================================*/
			Quiz.js Gothicpedii
/*============================================================================*/
Umieszczony tutaj kod CSS/JS wpłynie na wygląd lub działanie Gothicpedii.

WSZYSTKIE nowe style proszę umieszczać na samym dole arkusza
w sekcji "Badanie użyteczności" z informacją czego dotyczą w komentarzu.
/*============================================================================*/
			Kolory na Gothicpedii

1. Linki		rgb(190,167,113)	#ca7	#bea771
2. Nagłówki		rgb(204,204,153)		#cebc96
3. Tła nieprzezr.	rgb(43,46,39)		#332	#2b2e27
4. darkolivegreen	rgb(68,70,20)		#441	#444614
5. Tła półprzezr.	rgba(0,7,0,.6)

/*============================================================================*/
Styl większości boksów na Gothicpedii {
	background-color: rgba(42,25,18,.7) !important;
	background-image: linear-gradient(to bottom,transparent 40%,#000 120%) !important;
	background-image: -o-linear-gradient(top,transparent 40%,#000 120%) !important;
	background-image: -moz-linear-gradient(top,transparent 40%,#000 120%) !important;
	background-image: -webkit-linear-gradient(top,transparent 40%,#000 120%) !important;
	background-image: -webkit-gradient(linear,left top,left bottom,
		color-stop(40%,transparent),
		color-stop(120%,#000));
	border: 2px groove #cebc96 !important;
	border-radius: 0;
	margin: 0 5px 10px 0;
}
/*============================================================================*/

var quizName = "Quiz — Gothic";
var quizLang = "pl";
var resultsTextArray = [ 
	"Poszło kiepsko. Czas odświeżyć swoją wiedzę z Gothika!",
	"Nie jest źle, ale mogłoby być lepiej! Może czas odświeżyć sobie serię Gothic?",
	"Masz większość poprawnych odpowiedzi, brawo!",
	"Gratuluję, twoja wiedza o Jedzeniu i odżywianiu jest godna naśladowania!"
	];
 
	["Czy cola jest zdrowa?",
	"Nie",
	"Tak",]
	
 
	["Kto jest założycielem Przepis Wiki?",
	"Rzymianin",
	"OwocekTV",
	"Terechna",
	"DanielekKMA",
	
	];
 
importArticles({
    type: 'script',
    articles: [
        'u:dev:Quiz/code.js'
    ]
});