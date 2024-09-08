/* Cualquier código JavaScript escrito aquí se cargará para todos los usuarios en cada carga de página. */

importScript('MediaWiki:Chat.js');

// ============================================================
// wikiSiteMeter
// 
// Function: Adds a counter from http://www.sitemeter.com/
// ============================================================
 
$(function() {
	if(skin == "oasis") {
		var $sidebar = $('.WikiaPagesOnWikiModule:first');
		var comboString = "<div style='margin-top:5px; align:center'><table style='width:100%'><td style='font-size:100%'>VISITANTES DESDE<br /> EL 1º  DE ENERO DE 2012 </td><td style='text-align:right'><a target='_top'><img src='http://contador-de-visitas.com/hit.php?id=1129452&counter=26' alt='Contador' border=0 /></a></td></tr></table></div>";
 
		$sidebar.html($sidebar.html() + comboString);
	} else if(skin == "monobook") {
		var $sidebar = $('#p-wikicities-nav');
		var comboString = "<div style='margin:5px'></div><h5>Contador</h5><div class='pBody'><div style='margin-top:2px; margin-bottom:5px'><table style='width:100%; text-align:center'><tr><td style='font-size:100%; background:transparent'>VISITANTES DESDE<br /> EL 1º  DE ENERO DE 2012</td></tr><tr><td><a target='_top'><img src='http://contador-de-visitas.com/hit.php?id=1129452&counter=26' alt='Contador' border=0 /></a></td></tr></table></div></div>";
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
Añadir botones al editar artículo en modo normal
*/

 if (typeof(mwCustomEditButtons) != 'undefined') {

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://upload.wikimedia.org/wikipedia/commons/3/3b/Button_template_alt.png",
     "speedTip": "Insertar plantilla",
     "tagOpen": "\{\{",
     "tagClose": "\}\}",
     "sampleText": "Plantilla"};


   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/central/images/8/8c/Button_RedX.png?1",
     "speedTip": "Proponer el artículo para ser borrado",
     "tagOpen": "\{\{borrar|",
     "tagClose": "\}\}",
     "sampleText": "Motivo"};

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://upload.wikimedia.org/wikipedia/commons/2/29/Button_user.png",
     "speedTip": "Usuario",
     "tagOpen": "\{\{usuario|",
     "tagClose": "\}\}",
     "sampleText": "nombre"};

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/__cb20100621221310/ben10/es/images/c/cd/AP.png",
     "speedTip": "Artículo principal",
     "tagOpen": "\{\{AP|",
     "tagClose": "\}\}",
     "sampleText": "artículo"};

 mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://upload.wikimedia.org/wikipedia/commons/1/13/Button_enter.png",
     "speedTip": "Véase también",
     "tagOpen": "\{\{VT|",
     "tagClose": "\}\}",
     "sampleText": "artículo"};

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://upload.wikimedia.org/wikipedia/commons/2/26/Button_Tongue.png",
     "speedTip": "Insertar un emoticon. Solo usar en discusiones o blogs.",
     "tagOpen": "\{\{e|",
     "tagClose": "\}\}",
     "sampleText": "emoticon"};

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://upload.wikimedia.org/wikipedia/commons/8/8e/Button_stub.png",
     "speedTip": "Esbozo",
     "tagOpen": "\{\{",
     "tagClose": "\}\}",
     "sampleText": "esbozo"};

  mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://upload.wikimedia.org/wikipedia/commons/6/6c/Button_see_also.png",
     "speedTip": "Véase también",
     "tagOpen": "\{\{VT|",
     "tagClose": "\}\}",
     "sampleText": "artículo"};

mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://upload.wikimedia.org/wikipedia/commons/c/cb/Button_wikipedia.png",
     "speedTip": "Artículo existente en Wikipedia",
     "tagOpen": "\{\{ArtWikipedia|",
     "tagClose": "\}\}",
     "sampleText": "artículo"};

    }

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