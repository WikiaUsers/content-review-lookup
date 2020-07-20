/* Jedes JavaScript hier wird für alle Benutzer für jede Seite geladen. */

importScriptPage('ShowHide/code.js', 'dev');

var ShowHideConfig = { 
    autoCollapse: 3, 
    userLang: false, 
    en: {
	show: "anzeigen",
	hide: "ausblenden",
	showAll: "alle anzeigen",
	hideAll: "alle ausblenden"
    }
};

importArticles({
    type: 'script',
    articles: [
        'u:dev:Interlanguage Flags/code.js',
    ]
});

var quizName = "Willkommen bei den Louds Quiz";
var quizLang = "de";
var resultsTextArray = [ 
	"Du solltest mehr Willkommen bei den Louds ansehen...",
	"Nicht schlecht, du weisst viel über Willkommen bei den Louds.",
	"WOW! Du bist ein Willkommen bei den Louds experte!" 
    ];
var questions = [

	["Wie viele schwester hat Lincoln Loud?",
	"10",
	"7",
	"4",
	"Er hat keine Schwester."], 

	["Wo wohnt die Loud Familie?",
	"Royal Woods",
	"Michigan",
	"Washington",
	"New Orleans"],
	
	["Wer ist Lincolns bester Freund?",
	"Clyde McBride",
	"Rusty Spokes",
	"Liam",
	"Zach"],

	["Was war die erste Folge?",
	"Allein im Dunkeln",
	"Nachricht für dich",
	"Der Schul-Rowdy",
	"Auf Trophäenjagd"],

	["Wer hat die serie kreiert?",
	"Chris Savino",
	"Kyle Marshall",
	"Alec Schwimmer",
	"Karla Sakas Shropshire"],

	["Welche ist die Reihenfolge der Loud Schwestern? Alt zu jung.",
	"Lori, Leni, Luna, Luan, Lynn, Lucy, Lana, Lola, Lisa und Lily.",
	"Lily, Lola, Lucy, Luan, Leni, Lisa, Lana, Lynn, Luna und Lori.",
	"Luna, Lucy, Lisa, Leni, Lynn, Lola, Lori, Luan, Lana und Lily.",
	"Lily, Lisa, Lola, Lana, Lucy, Lynn, Luan, Luna, Leni und Lori"],

	["Wie nennt sich die Weinachts Folge der Serie?",
	"Weihnachten bei den Louds",
	"11 Louds am Hüpfen",
	"Der Loud Weihnachten",
	"Loudlicher Weihnachten"],

	["Wann hat die Serie gestartet in Deutschland?",
	"Mai 16, 2016",
	"August 1, 2016",
	"September 27, 2016",
	"März 1, 2016"],

	["Was macht Lincoln gerne?",
	"Videospielen, Comics Lesen und mit seine Schwester abhängen.",
	"Die ganze Zeit am Schlafen.",
	"Die Welt zu beherrschen.",
	"Fehrnsehen und Sport treiben."],

	["Wie heisst die Freundin von Lincoln?",
	"Ronnie Anne",
	"Christina",
	"Amalia",
	"Tabby"]
	
	];