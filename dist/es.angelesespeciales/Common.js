/* Cualquier c�digo JavaScript escrito aqu� se cargar� para todos los usuarios en cada carga de p�gina. */


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
  if(diff > 0) left = diff + ' d�as ' + left
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
------------------
NOMBRE DEL USUARIO
------------------
Inserta el nombre del usuario donde est� "<span class="insertusername"></span>"
  o la [[Plantilla:NOMBREUSUARIO]]

Tra�da de Inciclopedia, inicialmente de Uncyclopedia y corregida por uncyclopedia:es:user:Ciencia Al Poder, para que funcione correctamente usando ''class='' en vez de ''id=''.
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

// 1. Borrado r�pido
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
  'summary': 'REDIRECCI�N ROTA',
  'accesskey': '3',
  'label': 'R'};
fdButtons[fdButtons.length] = {
  'summary': 'Violaci�n de Copyright',
  'accesskey': '4',
  'label': 'Y'};
fdButtons[fdButtons.length] = {
  'summary': 'A petici�n del mismo autor',
  'accesskey': '5',
  'label': 'A'};
fdButtons[fdButtons.length] = {
  'summary': 'Art�culo demasiado corto (Infraesbozo)',
  'accesskey': '6',
  'label': 'E'};
fdButtons[fdButtons.length] = {
  'summary': 'Innecesario',
  'accesskey': '7',
  'label': 'I'};

importScriptPage('MediaWiki:Common.js/borradoR�pido.js');