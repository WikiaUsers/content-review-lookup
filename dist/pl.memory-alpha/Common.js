/* Umieszczony tutaj kod JavaScript zostanie załadowany przez każdego użytkownika, podczas każdego ładowania strony. */
// **************************************************
// Experimental javascript countdown timer (Splarka)
// Version 0.0.3
// **************************************************
//
// Usage example:
//  <span class="countdown" style="display:none;">
//  Only <span class="countdowndate">January 01 2007 00:00:00 </span> until New years.
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
    var tpm = 'minęło ';
  } else {
    var tpm = 'zostało ';
  }

  // calcuate the diff
  var left = (diff%60) + ' s';
    diff=Math.floor(diff/60);
  if(diff > 0) left = (diff%60) + ' m ' + left;
    diff=Math.floor(diff/60);
  if(diff > 0) left = (diff%24) + ' g ' + left;
    diff=Math.floor(diff/24);
  if(diff > 0) left = diff + ' d ' + left
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

/* Komunikat */
function setCookie() {
	document.cookie = "PlHelpThread=closed; expires=0; path=/";
}

function getCookie(name) {
	var re = new RegExp(name + "=([^;]+)");
	var value = re.exec(document.cookie);
	return (value != null) ? unescape(value[1]) : null;
}

var notifNotClosed = getCookie("PlHelpThread") != "closed";

if (notifNotClosed) {

	var message = 'Pomóż Memory Alpha Polska!<br>Kliknij <a href="http://pl.memory-alpha.org/wiki/Specjalna:Potrzebne_strony" class="plainlinks">tutaj</a>, aby zobaczyć, jakich artykułów nam brakuje. Jeśli chciałbyś adoptować tą wiki, odwiedź <a href="http://spolecznosc.wikia.com/wiki/Centrum_Społeczności:Adoptuj_wiki" class="plainlinks">Centrum Społeczności</a>.';

	if ($('.WikiaNotifications').length > 0) {
		$('<li><div id="helpTheWiki" style=""><a class="sprite close-notification" onclick="setCookie()"></a>' + message + '</div></li>').prependTo('#WikiaNotifications');
	} else {
		$('<ul id="WikiaNotifications" class="WikiaNotifications"><li><div style="" id="helpTheWiki"><a class="sprite close-notification" onclick="setCookie()"></a>' + message + '</div></li></ul>').prependTo('.WikiaBarWrapper');
	}
}