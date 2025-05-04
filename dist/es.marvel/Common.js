/* Cualquier código JavaScript escrito aquí se cargará para todos los usuarios en cada carga de página. */
 window.dev = window.dev || {}; window.dev.editSummaries = { css: '#stdSummaries { width: 264px }', select: 'MediaWiki:Standard Edit Summary' };
 
SpoilerAlert = {
    question: 'Este artículo contiene spoilers sobre historias inéditas o recién estrenadas. ¿Estás absolutamente seguro de que quiere leerlo?,
    yes: 'Si, quiero continuar',
    no: 'No, gracias',
    isSpoiler: function () {
        return -1 !== wgCategories.indexOf('Spoilers');
    }
};
 
importScript('MediaWiki:Chat.js');
importScriptPage('Countdown/code.js', 'dev');
 
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
------------------
NOMBRE DEL USUARIO
------------------
Inserta el nombre del usuario donde esté "<span class="insertusername"></span>"
 
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
 
addOnloadHook(UserNameReplace)

var WikiaNotificationMessage = "¡<a href='/wiki/Captain_America:The_Winter/Soldier'>No te pierdas de Capitán America y el soldado del invierno solo en cines</a>";
/* </pre> */
 
// Incluir Gadget-HotCat.js
// Para desactivar, agrega "window.noHotCat = true" en tu Monobook.js
if (window.skin != 'oasis' && wgAction == 'view' &&
		(wgNamespaceNumber == 0 || wgNamespaceNumber == 6 || wgNamespaceNumber == 14) &&
		window.location.toString().indexOf('diff=') == -1) {
	$(function() {
		if (!document.getElementById('csAddCategorySwitch') && !window.noHotCat) {
			if ($('#catlinks').length == 0) {
				$('#'+(window.bodyContentId||'bodyContent')).children('div.printfooter').after('<div id="catlinks" class="catlinks"></div>');
			}
			if ($('#mw-normal-catlinks').length == 0) {
				$('#catlinks').prepend('<div id="mw-normal-catlinks"><a title="Especial:Categorías" href="'+wgArticlePath.replace('$1', 'Especial:Categorías')+'">Categorías</a></div>');
			}
			$('#mw-normal-catlinks').children('a').eq(0).after('<span class="noprint">&nbsp;<span>(<a style="cursor: pointer;" title="Modificar categorías"><span>+<sup>+</sup></span></a>)</span></span>').next().find('a').click(function() {
				$(this).unbind().parents('span.noprint').eq(0).remove();
				importScript('MediaWiki:Common.js/Gadget-HotCat.js');
				return false;
			});
			$('#catlinks').removeClass('catlinks-allhidden');
		}
	});
} else if (wgNamespaceNumber == -1 && wgCanonicalSpecialPageName == 'Upload') {
	importScript('MediaWiki:Common.js/Gadget-HotCat.js');
}

/* Cualquier código JavaScript escrito aquí se cargará para todos los usuarios en cada carga de página. */
 
importArticles({
type: "script",
articles: [ 
'u:dev:ShowHide/code.js', 
'u:dev:Countdown/code.js', 
'u:dev:SpoilerAlert/code.js', 
'u:dev:ReferencePopups/code.js', 
'MediaWiki:Common.js/Switch.js' 
] 
});

$(function() {
    $('.affiliation-toggle').click(function() {
        $(this).next('.affiliation-content').toggleClass('affiliation-content-show');
    });
});