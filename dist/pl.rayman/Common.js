importArticles({
    type: "script",
    articles: [
        "w:c:dev:RevealAnonIP/code.js"
    ]
});

// PurgeButton
PurgeButtonText = 'Odśwież';
 
// IMPORT SKRYPTÓW
// W ostatnim imporcie nie umieszczamy przecinka.
importArticles({
    type: "script",
    articles: [
	"u:pl.tes:MediaWiki:AjaxRC.js", 			// AjaxRC
	"u:dev:PurgeButton/code.js",				// PurgeButton
	"u:dev:WallGreetingButton/code.js",			// WallGreetingButton
	"u:dev:SearchSuggest/code.js",				// SearchSuggest
   ]
});
importArticles({
	type: "script",
	articles: [
	"u:dev:SearchSuggest/code.js"
	]
});

// Blokada starych blogów i wątków
window.LockForums = {
    expiryDays: 30,
    expiryMessage: "Nikt nie napisał tu żadnego postu od ponad 30 dni, więc dalsze komentowanie zostało automatycznie wyłączone, ponieważ ewentualne nowe wpisy zostałyby prawdopodobnie uznane za odkopywanie starych dyskusji. Jeśli masz coś ważnego do przekazania na dany temat, załóż nowy wątek.",
    forumName: "Forum" 
};
 
window.LockOldBlogs = {
    expiryDays: 30,
    expiryMessage: "Nikt nie skomentował tego blogu od ponad 30 dni. Nowy komentarz zostałby i tak prawdopodobnie uznany za odkopywanie starych dyskusji, więc możliwość komentowania została automatycznie wyłączona. Jeśli jesteś autorem bloga i chcesz, aby komentowanie zawsze było możliwe, dodaj kategorię „Blogi zawsze aktualne”.",
    nonexpiryCategory: "Blogi zawsze aktualne"
};

// DODATKOWE PRZYCISKI W EDYTORZE ŹRÓDŁA by Wedkarski
if (typeof(mwCustomEditButtons) != 'undefined') {
 
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.nocookie.net/szynka013/pl/images/a/a8/CudzyslowIconWhite.svg",
        "speedTip": "Wstaw polskie cudzysłowy",
        "tagOpen": "„",
        "tagClose": "”",
        "sampleText": ""
    };
 
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.nocookie.net/szynka013/pl/images/6/62/PpauzaIconWhite.svg",
        "speedTip": "Wstaw półpauzę",
        "tagOpen": "–",
        "tagClose": "",
        "sampleText": ""
    };
}

/* Quiz */
importScriptPage('Quiz/code.js', 'dev');
var quizName = "Test wiedzy na temat serii Rayman";
var quizLang = "pl";
var resultsTextArray = [
	"Jak to możliwe? Wracaj do gry!",
	"Nieźle, mogło być gorzej!",
	"Udało ci dość często odpowiedzieć na pytania. Gratulacje!",
	"Wspaniale! Jesteś prawdziwym fanem Raymana."
	];
var questions = [
 
	["Gdzie po raz pierwszy mogliśmy zobaczyć Raymana w 3D?",
	"Na węgierskiej okładce Rayman Gold",
	"Na europejskiej okładce Rayman 2: The Great Escape",
	"Na grafice promocyjnej Rayman Arena",
	"Na jednym ze zwiastunów Rayman Legends"], 
 
	["Jakie gry znajdują się w pakiecie Rayman 100 Levels?",
	"Rayman 60 Levels i Rayman Designer",
	"Rayman Designer",
	"Rayman By His Fans",
	"Rayman Gold i Rayman By His Fans"],
	
	["Gdzie można znaleźć Znak Wyjścia w Rayman 3?",
	"Pod koniec mini-gry Szaleństwo 2D",
	"Pod koniec mini-gry Cyrk Razoffa",
	"W poziomie w rezydencji Razoffa",
	"W jednym z poziomów Najdłuższego Skrótu"], 
 
	["W jakiej grze z Kórlikami można znaleźć Lumy?",
	"Rayman Raving Rabbids – wersja na NDS",
	"Rayman Raving Rabbids – wersja na GBA",
	"Rayman Raving Rabbids 2",
	"Rabbids Go Home"],
	
	["Co się stanie jak strzelimy w Chenille?",
	"Jedna z jej części zmieni się w Małą Gąsienicę",
	"Jedna z jej części zniknie",
	"Jedna z jej części zmieni się w dwie Małe Gąsienice"],
 
	["Jakie gry znajdują się w pakiecie Rayman 100 Levels?",
	"Rayman 60 Levels i Rayman Designer",
	"Rayman Designer",
	"Rayman By His Fans",
	"Rayman Gold i Rayman By His Fans"],
	
	["Skąd można dojść do Świątyni Wody i Lodu w Rayman 2 na PS1?",
	"Z Zatoki Wielorybów",
	"Z Jaskini Złych Snów",
	"Z Czarodziejskiej Polany",
	"Ze Sklepienia"], 
 
	["Jaki kolor mają kule energii Raymana w Rayman M na wyścigach?",
	"Purpurowy",
	"Niebieski",
	"Żółty",
	"Zielony"],
	
	["Jak się nazywa dziecko Globoksa, które Rayman uratował w Fabryce Robo-Piratów?",
	"Bimbette",
	"Catastrox",
	"Oktette",
	"Globs"],
	
	["Co ma wspólnego Tysięczny Lum z Radarem Lumów?",
	"Można je znaleźć w tym samym miejscu",
	"Mają to samo zastosowanie",
	"Pojawiają się w Świątynich"],
 
	["Kiedy w Rayman Origins dostajemy umiejętność nurkowania?",
	"W poziomie Port Paniki",
	"W poziomie Pływanie z gwiazdami",
	"W poziomie Skąd te kraby",
	"W poziomie Wybuchowe Gejzery"],
 
	];