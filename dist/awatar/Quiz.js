var quizName = "Quiz — Awatar";
var quizLang = "pl";
var resultsTextArray = [ 
	"Poszło bardzo źle. Przypomnij sobie wiedzę o serii Awatar i spróbuj jeszcze raz!",
	"Nie jest źle, ale mogłoby być lepiej! Może czas odświeżyć sobie pamięć o serii Awatar?",
	"Masz większość poprawnych odpowiedzi, brawo!",
	"Gratulacje, udało ci się odpowiedzieć poprawnie na wszystkie pytania! Jesteś niczym sam Awatar!"
	];
var questions = [
 
	["Na którym kanale są wyświetlane odcinki serialu Awatar?",
	"Nickelodeon",
	"TVP 1",
	"Cartoon Network",
	"Comedy Central",
	"Disney Channel"], 
 
        ["W którym roku został wydany pierwszy odcinek Legendy Aanga?",
	"2005",
	"2016",
	"2007",
	"2008",
	"2009",
	"2010",
	"2011",
	"2003",
	"2004"], 
 
        ["Wybierz odpowiednią kolejność:",
	"Sozin > Azulon > Ozai > Zuko",
	"Azulon > Ozai > Sozin > Zuko",
	"Sozin > Zuko > Azulon > Ozai",
	"Zuko > Azulon > Ozai > Sozin",
	"Ozai > Sozin > Azulon > Zuko"],

        ["Jak nazywała się herbaciarnia Iroh?",
	"Jaśminowy Smok",
	"Herbaciany Smok",
	"Jaśminowa Herbaciarnia",
	"Łagodny Smok",
	"Herbaciarnia Iroh"],

        ["Ile lat powinien mieć Awatar, żeby dowiedzieć się o swoim przeznaczeniu?",
	"16 lat",
	"6 lat",
	"8 lat",
	"10 lat",
	"14 lata",
	"18 lat",
	"20 lat",
	"4 lata",
	"12 lat"],

        ["Jak nazywał się ostatni 'Awatar - Mag Wody' przed Korrą?",
	"Kuruk",
	"Sokka",
	"Roko",
	"Yangchen",
	"Hakoda"]
	];
 
importArticles({
    type: 'script',
    articles: [
        'u:dev:Quiz/code.js'
    ]
});