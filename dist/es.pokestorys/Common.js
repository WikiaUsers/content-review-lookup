// Cualquier c�digo insertado aqu� JavaScript ser� cargado para todos los usuarios
// ------------------------------------------------------------------------------------

importArticles({
    type: "script",
    articles: [
        // 1. Mostrar im�genes duplicadas
        "w:c:es.ben10:MediaWiki:Common.js/DupImageList.js",
        // 2. Res�menes de edici�n
        "MediaWiki:Common.js/resumenedicion.js"
    ]
});

// 1. NOMBREUSUARIO
importScriptPage('MediaWiki:Common.js/nombreUsuario.js');
importScriptPage('MediaWiki:Common.js/Clases/UtilityTools.js');
importScriptPage('MediaWiki:Common.js/Clases/ImageSwitcher.js');

// 2. Refrescar autom�ticamente p�ginas espec�ficas
 
// AjaxRCRefreshText = 'Act. autom�t.';
// AjaxRCRefreshHoverText = 'Refrescar esta p�gina autom�ticamente';
// ajaxPages = ["Especial:CambiosRecientes","Especial:WikiActivity","Especial:P�ginasNuevas"];
// importScriptPage('AjaxRC/code.js', 'dev');

// 3. Botones extras
importScript('MediaWiki:Common.js/botonesExtras.js');

// 4. Cuenta Regresiva
// **************************************************
// Javascript experimental cuenta regresiva (Splarka)
// Verci�n 0.0.3
// **************************************************
//
// Ejemplo de uso:
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