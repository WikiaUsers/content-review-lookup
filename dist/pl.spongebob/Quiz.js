var quizName = "Quiz — SpongeBob Kanciastoporty";
var quizLang = "pl";
var resultsTextArray = [ 
	"Poszło kiepsko. Czas odświeżyć swoją wiedzę o serialu SpongeBob Kanciastoporty!",
	"Nie jest źle, ale mogłoby być lepiej! Może czas odświeżyć sobie wiedzę na temat serialu SpongeBob Kanciastoporty??",
	"Masz większość poprawnych odpowiedzi, brawo!",
	"Gratulacje, twoja wiedza o serialu SpongeBob Kanciastoporty jest godna naśladowania!"
	];
var questions = [
 
	["Jaka jest data urodzenia SpongeBoba?",
	"14 lipca 1986",
	"16 lipca 1989",
	"4 sierpnia 1983",
	"25 lipca 1993"],

	["Kto wymyślił zwrot Wambo?",
	"Patryk",
	"SpongeBob",
	"Sandy",
	"Pan Krab"],

	["Którego z wymienionych wynalazków NIE stworzyła Sandy?",
	"Holograficzna mielonka",
	"Laserowe portki",
	"Separator molekularny ",
	"Kamera w nosie"],

	["W który dzień tygodnia odbywa się akcja odcinka Nocna zmiana? ",
	"Wtorek",
	"Środa",
	"Czwartek",
	"Piątek",
	"Poniedziałek"],
	
	["W ilu odcinkach pojawił się Fiasko?",
	"W dwóch",
	"W jednym",
	"W czterech",
	"W trzech"],

	["Jaki jest ulubiony zespół Perły? ",
	"Mazgaje",
	"Ned i Metaloryby ",
	"Glony G",
	"Plankton i Złodzieje Burgerów "],

	["Jak się nazywał przewodnik w odcinku Wakacje z Krabem?",
	"Bill",
	"Buck",
	"Jim",
	"Jerry"],
	
	["Która para postaci to dalecy krewni?",
	"Gacuś i Patryk",
	"Plankton i Perła",
	"Skalmar i Sandy",
	"SpongeBob i Pan Krab"],
	
	["Pod jakim adresem mieszka SpongeBob?",
	"Conch Street 124",
	"Scallop Ave 5",
	"Krabby Road 87 ",
	"Barbecue Way 900"],
	
	["Kto podpisał SpongeBobowi szpachelkę?",
	"Kenny Kiciuś",
	"Syrenaman",
	"Larry Homar ",
	"Skorupin"],

	["Kto jest twórcą serialu SpongeBob Kanciastoporty? ",
	"Stephen Hillenburg",
	"Paul Tibbitt",
	"C.H. Greenblatt",
	"Kaz"],

	["Dlaczego SpongeBob przychodzi codziennie pod Tłustego Kraba o trzeciej rano?",
	"By policzyć ziarenka sezamu",
	"Po nocną przekąskę",
	"By usmażyć i zamrozić kotleciki",
	"By sprawdzić, czy system anty-włamaniowy działa"],

	["Jak ma na imię brat bliźniak Sandy? ",
	"Randy",
	"Brandy",
	"Earl",
	"Scott "],

	["Z jakiego serwisu społecznościowego korzystają mieszkańcy Bikini Dolnego?",
	"Instaclam ",
	"Fishbook",
	"Twater",
	"Żaden z wymienionych"],

	["Kiedy odbywa się akcja odcinka Kanciastoportym być albo nie być? ",
	"7 stycznia",
	"10 stycznia",
	"14 stycznia",
	"18 stycznia"],

	["W którym roku sezon czwarty po raz pierwszy miał premierę w Polsce?",
	"2013",
	"2009",
	"2012",
	"2014"]
	];
importArticles({
    type: 'script',
    articles: [
        'u:dev:Quiz/code.js'
    ]
});