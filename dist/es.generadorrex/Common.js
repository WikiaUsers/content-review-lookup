/* Cualquier código JavaScript escrito aquí se cargará para todos los usuarios en cada carga de página. */

/* Usuarios Inactivos - idea de Sam Wang y dev.wikia.com */
importScriptPage('InactiveUsers/code.js', 'dev');
/* Collapsible classes
 * See w:c:dev:ShowHide for info and attribution
 */

importScriptPage('ShowHide/code.js','dev');

importScript('MediaWiki:Chat.js');

// ============================================================
// wikiSiteMeter
// 
// Function: Adds a counter from http://www.sitemeter.com/
// ============================================================
 
$(function() {
	if(skin == "oasis") {
		var $sidebar = $('.WikiaPagesOnWikiModule:first');
		var comboString = "<div style='margin-top:5px; align:center'><table style='width:100%'><td style='font-size:100%'>VISITANTES DESDE EL<br />1º  DE ENERO DE 2012 </td><td style='text-align:right'><a target='_top'><img src='http://contador-de-visitas.com/hit.php?id=1129113&counter=26' alt='Contador' border=0 /></a></td></tr></table></div>";
 
		$sidebar.html($sidebar.html() + comboString);
	} else if(skin == "monobook") {
		var $sidebar = $('#p-wikicities-nav');
		var comboString = "<div style='margin:5px'></div><h5>Contador</h5><div class='pBody'><div style='margin-top:2px; margin-bottom:5px'><table style='width:100%; text-align:center'><tr><td style='font-size:100%; background:transparent'>VISITANTES DESDE EL<br />1º  DE ENERO DE 2012</td></tr><tr><td><a target='_top'><img src='http://contador-de-visitas.com/hit.php?id=1129113&counter=26' alt='Contador' border=0 /></a></td></tr></table></div></div>";
		$sidebar.html($sidebar.html() + comboString);
	}
});

/* displayTimer */
importScript('MediaWiki:Common.js/displayTimer.js');


/* Any JavaScript here will be loaded for all users on every page load. */
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
//
// If the date is in the format "x|January 01 2007 00:00:00 PST", then the timer is periodic with period x seconds using the given date as the starting time.
function updatetimer(i) {
  var now = new Date();
  var then = timers[i].eventdate;
  var diff = Math.floor((then.getTime()-now.getTime())/1000);
 
  // catch bad date strings
  if(isNaN(diff)) { 
    timers[i].firstChild.nodeValue = '** ' + timers[i].eventdate + ' **' ;
    return;
  }
 
  // reduce modulo period if necessary
  if(timers[i].period > 0){
    if(diff<0) diff = timers[i].period - ((-diff)%timers[i].period); else diff = diff%timers[i].period;
  }
 
  // determine plus/minus
  if(diff<0) {
    diff = -diff;
    var tpm = ' ';
  } else {
    var tpm = ' ';
  }
 
  // calcuate the diff
  var left = (diff%60) + ' segundos';
    diff=Math.floor(diff/60);
  if(diff > 0) left = (diff%60) + ' minutos ' + left;
    diff=Math.floor(diff/60);
  if(diff > 0) left = (diff%24) + ' horas ' + left;
    diff=Math.floor(diff/24);
  if(diff > 0) left = diff + ' días ' + left
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
  timers = getElementsByClassName(document, 'span', 'countdowndate');
  timeouts = new Array(); // generic holder for the timeouts, global
  if(timers.length == 0) return;
  for(var i in timers) {
    var str = timers[i].firstChild.nodeValue;
    var j = str.indexOf('|');
    if(j == -1) timers[i].period = 0; else {
      timers[i].period = parseInt(str.substr(0, j));
      if(isNaN(timers[i].period) || timers[i].period < 0) timers[i].period = 0;
      str = str.substr(j + 1);
    }
    timers[i].eventdate = new Date(str);
    updatetimer(i);  //start it up
  }
}
addOnloadHook(checktimers);
 
// **************************************************
//  - end -  Experimental javascript countdown timer
// **************************************************

/*
/* 
------------------
NOMBRE DEL USUARIO
------------------
Inserta el nombre del usuario donde esté "<span class="insertusername"></span>"
  o la [[Plantilla:NOMBREUSUARIO]]

Traída de Inciclopedia, inicialmente de Uncyclopedia y corregida por uncyclopedia:es:user:Ciencia Al Poder, para que funcione correctamente usando ''class='' en vez de ''id=''.
*/

function UserNameReplace() {
  if (wgUserName) {
    var spans = getElementsByClassName(document, "span", "insertusername");
    for (var i = 0; i < spans.length; i++) {
      spans[i].innerHTML = wgUserName;
    };
  };
};

addOnloadHook(UserNameReplace);

// 1. Borrado rápido
var fdButtons = [];
fdButtons[fdButtons.length] = {
  'summary': 'VANDALISMO',
  'accesskey': '1',
  'label': 'V'};
fdButtons[fdButtons.length] = {
  'summary': 'BASURA (SPAM)',
  'accesskey': '2',
  'label': 'S'};
fdButtons[fdButtons.length] = {
  'summary': 'REDIRECCIÓN ROTA',
  'accesskey': '3',
  'label': 'R'};
fdButtons[fdButtons.length] = {
  'summary': 'Violación de Copyright',
  'accesskey': '4',
  'label': 'Y'};
fdButtons[fdButtons.length] = {
  'summary': 'A petición del mismo autor',
  'accesskey': '5',
  'label': 'A'};
fdButtons[fdButtons.length] = {
  'summary': 'Artículo demasiado corto (Infraesbozo)',
  'accesskey': '6',
  'label': 'E'};
fdButtons[fdButtons.length] = {
  'summary': 'Innecesario',
  'accesskey': '7',
  'label': 'I'};

importScriptPage('MediaWiki:Common.js/borradoRápido.js');
/* Ability to change full page title
 * See w:c:dev:DISPLAYTITLE for info and attribution
 */
 
function fixPageName(){
	var newPageTitle = getElementsByClassName(document, 'span', 'changePageTitle')[0]; // Find the span with the new title
	if(newPageTitle == null) return; // If not found exit
	var oldPageTitle = getElementsByClassName(document, 'header', 'WikiaPageHeader')[0].getElementsByTagName( "h1" )[0]; //Find the page's title
	if(oldPageTitle == null) return; // If not found exit
	oldPageTitle.innerHTML = newPageTitle.innerHTML; // Set the title
}
addOnloadHook(fixPageName);
 
 
/* support for the Countdown template */
  var oldTime = new Date();
  var timerID = null;
  var entry = 0;
  var target; 
  var dst;      
  var jan = new Date(oldTime.getFullYear(), 0, 1);
  var jul = new Date(oldTime.getFullYear(), 6, 1);
  var stdOffset = Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset());
  if (oldTime.getTimezoneOffset() < stdOffset)
  {
     dst = 60;
  }
  else
  {
     dst = 0;
  }
 
        function Timecount() {
            entry++;
            var basedate = oldTime;
            if (entry == 1) {
                if (document.getElementById('TimeLeftCounter') != null) {
 
                    target = new Date(document.getElementById('TimeLeftCounter').innerHTML);
                }
                else {
 
                    return;
                }
            }
           var now = new Date();
           oldTime = now;
            var diff = new Date();
            var days = 0;
            var hours = 0;
            var minutes = 0;
 
            var seconds = 0;
            var daystring = "";
            var hourstring = "";
            var minutestring = "";
            var secondstring = "";
            diff.setTime(target.getTime() - basedate.getTime());
 
                if (diff.getTime() > new Date("January 1, 1970 00:00:00")) {
                    days = Math.floor((diff.getTime()-((now.getTimezoneOffset()+dst)*60000)) / 86400000);
                    hours = diff.getHours();
                    minutes = diff.getMinutes();
                    seconds = diff.getSeconds();
 
                    if (days != 0) {
                        daystring = days.toString() + "d, ";
                    }
 
                    if (hours != 0) {
                        hourstring = hours.toString() + "h ";
                    }
                    else {
                        if (days != 0) hourstring = hours.toString() + "h ";
                    }
 
                    if (minutes != 0) {
                        minutestring = minutes.toString() + "m ";
                    }
                    else {
                        if ((hours != 0) || (days != 0)) minutestring = minutes.toString() + "m ";
                    }
 
                    secondstring = seconds.toString() + "s";
 
                    document.getElementById("TimeLeftCounter").innerHTML = daystring + hourstring + minutestring + secondstring;
                    timerID = self.setTimeout(Timecount, 1000);
                }
                else {
                    document.getElementById("TimeLeftCounter").innerHTML = "0s";
 
                }
 
            }
addOnloadHook(Timecount);