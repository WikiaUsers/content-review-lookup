/* Jedes JavaScript hier wird für alle Benutzer für jede Seite geladen. */

 // Import [[MediaWiki:Onlyifuploading.js]] 
 


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

importScriptPage('BackToTopButton/code.js', 'dev');

// **************************************************
// Experimental javascript countdown timer (Splarka)
// Version 0.0.3
// **************************************************
 
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
    var tpm = '';
  } else {
    var tpm = '';
  }
 
  // calcuate the diff
  var left = (diff%60) + ' Sekunden';
    diff=Math.floor(diff/60);
  if(diff > 0) left = (diff%60) + ' Minuten ' + left;
    diff=Math.floor(diff/60);
  if(diff > 0) left = (diff%24) + ' Stunden ' + left;
    diff=Math.floor(diff/24);
  if(diff > 0) left = diff + ' Tage ' + left
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
 
// Fix search result links - taken from pokemon.wikia.com
function fixSearchResultLinks() {
	$('ul.mw-search-results').find('a').each(function() {
		var a = $(this);
		a.attr('href', wgArticlePath.replace('$1', encodeURIComponent(a.text().replace(new RegExp(' ', 'g'), '_')).replace(new RegExp('%3A','g'),':')));
	});
}
 
if (window.wgNamespaceNumber == -1 && window.wgCanonicalSpecialPageName == 'Search') {
	$(fixSearchResultLinks);
}
 
function ttforhandy() {
  var doo = false;
  var agents = new Array(
    'Windows CE', 'Pocket', 'Mobile',
    'Portable', 'Smartphone', 'SDA',
    'PDA', 'Handheld', 'Symbian',
    'WAP', 'Palm', 'Avantgo',
    'cHTML', 'BlackBerry', 'Opera Mini',
    'Nokia', 'Android','Nintendo DSi'
  );
for (var i = 0; !doo && i<agents.length; i++) {
  if(navigator.userAgent.indexOf(agents[i]) > -1){
    doo = true;
  };
};
if(doo){
  var spans = document.getElementsByTagName("span");
  for (var i=0;  i<spans.length; i++) {
    if(spans[i].className == "tt_for_handy"){
      spans[i].style.display = "inline";
    };
  };
};
}
importArticles({
    type: "script",
    articles: [
        "w:c:dev:Countdown/code.js"
    ]
});
addOnloadHook(createNavigationBarToggleButton);
addOnloadHook(createSpoiler);
addOnloadHook(createContentTabs);
addOnloadHook(ttforhandy);
// </pre>