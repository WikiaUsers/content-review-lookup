window.ajaxPages = ["Special:RecentChanges","Specjalna:Ostatnie_zmiany","Specjalna:Aktywność_na_wiki","Special:WikiActivity"];
window.AjaxRCRefreshText = 'Automatyczne odświeżanie';
window.AjaxRCRefreshHoverText = 'Włącza automatyczne odświeżanie strony';
importScriptPage('AjaxRC/code.js', 'dev');


$(function(){
	importArticles({
		type: "script",
		articles: ["u:zh.pad.wikia.com:MediaWiki:CountDown.js"]
	}, {
		type: "style",
		articles: ["u:zh.pad.wikia.com:MediaWiki:CountDown.css"]
	});
});

function emptyLicenseAlert(form) {
        var msg = "Licencja pliku nie została wybrana. Możesz spróbować ponownie ale pamiętaj, że pliki bez licencji są usuwane."
        if(window.emptyLicenseWarningDelivered) return true;
        if($('#wpLicense').val() == '') {
                alert(msg);
                window.emptyLicenseWarningDelivered = true
                return false
        }
        return true;
}
$('#mw-upload-form').submit(function(e) {return emptyLicenseAlert(this);});



importScriptPage('User:Pio387/BackToTop.js', 'pl.lotr');
 
/* Importy zewnętrzne */
importArticles({
    type: "script",
    articles: [
        'w:c:dev:Countdown/code.js',
        'w:c:pl.tes:MediaWiki:Change.js',
        'u:dev:Message/code.js',
        'u:dev:User Rights Reasons Dropdown/code.js',
        'u:dev:DiscordIntegrator/code.js'
    ]
});

/* Importy wewnętrzne */
importArticles({
    type: "script",
    articles: [
         'MediaWiki:Familytree.js'
    ]
});

/* Komunikat */
var WikiaNotificationMessage = "Kliknij <a href='/wiki/Śródziemie_Wiki:Dołącz_do_nas'>tutaj</a> i już dziś dołącz do grona redaktorów Śródziemie Wiki.";
var WikiaNotificationexpiry = 999;
importScriptPage('WikiaNotification/code.js', 'dev');

/* Quiz */
importScriptPage('Quiz/code.js', 'dev');
var quizName = "Test wiedzy na temat Shire";
var quizLang = "pl";
var resultsTextArray = [
	"Głupi Tuk!",
	"Chyba nie często wychylasz się ze swojej norki.",
	"Nie jest źle, ale zgubiłbyś się w Bucklandzie.",
	"Wiesz tyle, że stawialiby Ci piwo Pod Zielonym Smokiem."
	];
var questions = [
 
	["Jak nazywało się wielkie domostwo Tuków?",
	"Wielkie Smajale",
	"Brandy Hall",
	"Tuczyn",
	"Ustroń"], 
 
	["Który władca Arthedainu pozwolił hobbitom osiedlić się na terenach Shire'u?",
	"Argeleb II",
	"Aragorn II",
	"Arvedui",
	"Arveleg I"],
 
	["Który hobbit był pierwszym thanem Shire'u?",
	"Bukka z Moczarów",
	"Bandobras Tuk",
	"Isumbras I",
	"Gorhendad Oldbuck"],
 
	["Ile lat trwała kadencja burmistrza Michel Delving?",
	"7",
	"5",
	"6",
	"4"],
 
	["Która z rzek płynących w Shire, nie wpadała do Brandywiny?",
	"Ostowy Potok",
	"Słupianka",
	"Rzeka Graniczna",
	"Woda"],
 
	["Z jakiej miejscowości pochodziła żona Pippina?",
	"Long Cleeve",
	"Hobbiton",
	"Zielone Pola",
	"Little Delvig"],
 
	["Który z tych hobbitów nie był obecny na 111 urodinach Bilbo Bagginsa?",
	"Gerontius Tuk",
	"Everard Proudfoot",
	"Melilot Brandybuck",
	"Everard Tuk"],
 
	["Co Lobelia Sackville-Baggins ukradła z domu Bilbio Bagginsa?",
	"Srebrne łyżki",
	"Parasolkę",
	"Spinki'",
	"Biżuterię rodzinną"],
 
	["Czy Sam pełnił urząd burmistrza Shire?",
	"Prawda",
	"Fałsz"],
 
	["Gdzie przeprowadził się Frodo po sprzedarzy Bag End?",
	"Do Ustroni",
	"Do Wielkich Smajalów",
	"Do Brandy Hall",
	"Frodo nigdy nie sprzedał Bag End"]
 
	];