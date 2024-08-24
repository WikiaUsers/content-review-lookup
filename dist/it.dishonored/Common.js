/* Il codice JavaScript inserito qui viene caricato da ciascuna pagina, per tutti gli utenti. */

// **************************************************
// Experimental javascript countdown timer (Splarka)
// Version 0.0.3
// **************************************************
//
// Usage example:
//  <span class="countdown" style="display:none;">
//  Only <span class="countdowndate">January 01 2007 00:00:00 PST</span> until New years.
//  </span>
//  <span class="nocountdown">Javascript disabled.</span>

function updatetimer(i) {
  var now = new Date();
  var then = timers[i].eventdate;
  var diff = count=Math.floor((then.getTime()-now.getTime())/1000);

  // catch bad date strings
  if(isNaN(diff)) { 
    timers[i].firstChild.nodeValue = '** ' + timers[i].eventdate + ' **' ;
    return;
  }

  // determine plus/minus
  if(diff<0) {
    diff = -diff;
    var tpm = ' ';
  } else {
    var tpm = ' ';
  }

  // calcuate the diff
  var left = (diff%60) + ' seconds';
    diff=Math.floor(diff/60);
  if(diff > 0) left = (diff%60) + ' minutes ' + left;
    diff=Math.floor(diff/60);
  if(diff > 0) left = (diff%24) + ' hours ' + left;
    diff=Math.floor(diff/24);
  if(diff > 0) left = diff + ' days ' + left
  timers[i].firstChild.nodeValue = tpm + left;

  // a setInterval() is more efficient, but calling setTimeout()
  // makes errors break the script rather than infinitely recurse
  timeouts[i] = setTimeout('updatetimer(' + i + ')',1000);
}

function checktimers() {
  //hide 'nocountdown' and show 'countdown'
  var nocountdowns = getElementsByClassName(document, 'span', 'nocountdown');
  for(var i in nocountdowns) nocountdowns[i].style.display = 'none'
  var countdowns = getElementsByClassName(document, 'span', 'countdown');
  for(var i in countdowns) countdowns[i].style.display = 'inline'

  //set up global objects timers and timeouts.
  timers = getElementsByClassName(document, 'span', 'countdowndate');  //global
  timeouts = new Array(); // generic holder for the timeouts, global
  if(timers.length == 0) return;
  for(var i in timers) {
    timers[i].eventdate = new Date(timers[i].firstChild.nodeValue);
    updatetimer(i);  //start it up
  }
}
addOnloadHook(checktimers);

// **************************************************
//  - end -  Experimental javascript countdown timer
// **************************************************

$(".openchat a").click(function() {
   window.open('/wiki/Special:Chat', 'wikiachat', 'width=600,height=600,menubar=yes,status=yes,location=yes,toolbar=yes,scrollbars=yes,resizable=no');
   return false;
});

window.LockOldBlogs = {
    expiryDays: 100,
};

importArticles({
    type: 'script',
    articles: [
        'MediaWiki:Common.js/standardeditsummaries.js',
        'MediaWiki:Common.js/displayTimer.js',
        'u:dev:DupImageList/code.js',
        'u:dev:BackToTopButton/code.js',
        'u:dev:ShowHide/code.js',
        'u:dev:LockOldBlogs/code.js',
        'u:dev:RevealAnonIP/code.js',
        'u:dev:InactiveUsers/code.js' 
        
    ]
});

// 1. AjaxRC configuration option
var ajaxRefresh = 30000;
 
// 2. AjaxRC import statement
importScriptPage('Mediawiki:AjaxRC/code.js','dev');

var quizName = "Dishonored: Missione";
var quizLang = "it";
var resultsTextArray = [ 
	"Conosci a fondo le missioni di Dishonored!",
	"Conosci poco le missioni o le hai esplorate poco impenati di più, andrà meglio la prossima volta",
	"Conosci molto le missioni e speri che ti notino",
	"Sei un vero esperto delle missioni. dishonoreder te lo sei spolpato fino all'ultima briciola, lettera, audiografo, armi e personaggi verai"
	];
var questions = [
 ["Che succede nella prima missione dopo il ritorno di Corvo?",
	"Corvo uccide tutti dal primo all'ultimo",
	"Corvo inconrta Emily Kaldwin, con cui gioca ad acchiapparella",
	"Corvo bacia Jessamine Kaldwin",
	"Corvo uccide l'Imperatrice Jessamine Kaldwin"], 
 
	["Cosa succede a fine della prima missione?",
	"Mondo va in rovina, mondo divorato dai ratti",
	"Uccidono Corvo",
	"Hiram Burrows accusa Corvo di omicidio e di tradimento",
	"Corvo viene salva Jessamine Kaldwin e Emily Kaldwin",
	"Difficile tutto può cambiare"],
 
	["Cosa succede nella seconda missione di dishonored?",
	"Corvo viene torturato",
	"Corvo uccide Burrows e Campbell",
	"Il Torturatore Reale uccider Corvo",
	"Corvo vie portato in cella"],
 
	["Corvo usa i poteri nella prima missione quando è in prigione",
	"Vero",
	"Falso"],
 
	["Emily nella prima missione è stata in grado di trovare corvo",
	"Vero",
	"Falso"],
 
	["Il mondo è in rovina nel caso Basso",
	"Vero",
	"Falso"],
 
	["Cosa accade nella terza missione di dishonored?",
	"Corvo trova Emily",
	"Corvo non trova Emily",
	"Corvo incotra all'inzio Nonna Cencia",
	"Nessuna delle risposte"],
 
	["Nel caos alto della Casa del Piacere, chi uccidi per prima per farti lago fino alla stanza di Emily",
	"Mi muovo furtivo e lascio tutti in vita",
	"Prendo la runa, la chave e me scappo",
	"Uccido tutti, prendo la runa, trovo Emily e la porto in salvo",
	"Nessuna delle risposte"],
 
	["Corvo uccide Emily nella terza missione",
	"Vero",
	"Falso"],
 
	["Cosa può accadere se si incontra un branco di ratti?",
	"Ti fanno le feste",
	"Arriva Il Ragazzo Solitario dei Retti e li fa calmare",
	"Ti salva Nonna Cencia",
	"Ti divorano o li uccidi o scappi",
	"Ci parli "]
 
	];
 
importArticles({
    type: 'script',
    articles: [
        'u:dev:Quiz/code.js'
    ]
});