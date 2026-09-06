// **************************************************
// Experimental javascript countdown timer (Splarka)
// Version 0.0.2
// **************************************************
// Embed with a span class="countdowntimer", eg:
// <span class="countdowntimer" style="display:none;">April 12 2008 00:00:01 AM EST</span>
// default replacement text can accompany, eg: <span class="notimer">*javascript required*</span>

function updatetimer(i) {
  var now = new Date();
  var then = timers[i].eventdate;
  var diff = count=Math.floor((then.getTime()-now.getTime())/1000);

  // catch bad date strings
  if(isNaN(diff)) { 
    timers[i].firstChild.nodeValue = '** ' + timers[i].eventdate + ' **' ;
    return;
  }

  // catch negative dates
  if(diff<0) {
    diff = -diff;
    var left = 'depuis';
  } else {
    var left = 'avant';
  }

  // calcuate the diff
  left = (diff%60) + ' secondes ' + left;
    diff=Math.floor(diff/60);
  if(diff > 0) left = (diff%60) + ' minutes ' + left;
    diff=Math.floor(diff/60);
  if(diff > 0) left = (diff%24) + ' heures ' + left;
    diff=Math.floor(diff/24);
  if(diff > 0) left = diff + ' jours ' + left
  timers[i].firstChild.nodeValue = left;

  // a setInterval() is more efficient, but calling setTimeout()
  // makes errors break the script rather than infinitely recurse
  tim[i] = setTimeout('updatetimer(' + i + ')',1000);
}

function checktimers() {
  var untimers = getElementsByClassName(document, 'span', 'notimer');
  for(var i=0;i < untimers.length; i++) {
    untimers[i].style.display = 'none';    
  }
  timers = getElementsByClassName(document, 'span', 'countdowntimer');  //global
  tim = new Array(); // generic holder for the timeouts, global
  if(timers.length == 0) return;
  for(var i=0;i < timers.length; i++) {
    timers[i].eventdate = new Date(timers[i].firstChild.nodeValue);
    timers[i].firstChild.nodeValue = '0 jours 0 heures 0 minutes 0 secondes';
    timers[i].style.display = 'inline';
    updatetimer(i);  //start it up
  }
}
addOnloadHook(checktimers)

// **************************************************
//  - end -  Experimental javascript countdown timer
// **************************************************

/* ############################################################################# */
/* ### TICKER                                                                ### */
/* ### --------------------------------------------------------------------  ### */
/* ### Description: Displays a ticker, as in [[Template:Ticker]]             ### */
/* ### Credit:      unknown                                                  ### */
/* ###              User:FDekker                                             ### */
/* ############################################################################# */
$(function() {
    $(".ticker").each(function(_, ticker) {
        var step = 10;  // How many pixels to move text each tick
        var tickerSpeed = 200;
        
        ticker = $(ticker);
        
        if (ticker.attr('data-speed') !== undefined)
            tickerSpeed = parseInt(ticker.attr('data-speed'));
            
        if (ticker.attr('data-step') !== undefined)
            step = parseInt(ticker.attr('data-step'));
            
        ticker.css("display", "block");

        var wrapper = $(".tickerWrapper", ticker);
        wrapper.css("left", (step + ticker.width()) + "px");

        var text = $(".tickerText", ticker);
        var textWidth = text.outerWidth();

        setInterval(function() {
            var offset =
                (wrapper.position().left > -(textWidth + step))
                    ? (wrapper.position().left - step) + "px"  // Move left
                    : (ticker.width() + step) + "px";  // Reset
            wrapper.css("left", offset);
        }, tickerSpeed);
    });
});

/* ============================================================
* WIKISARA - Créateur de carte
*
* Ajoute un bouton "CARTE" directement dans la barre
* de l'éditeur visuel Fandom.
*
* Le bouton ouvre le Créateur de carte Wikisara.
* ============================================================ */

(function () {
'use strict';

var URL_CREATEUR =
'https://frantz58wiki.github.io/createur-carte-wikisara/';

var ID_BOUTON =
'wikisara-createur-carte-direct';

var initialisationFaite = false;


/* ========================================================
* Création du bouton
* ======================================================== */

function ajouterBoutonCarte() {

/*
* Ne jamais créer deux boutons.
*/
if (document.getElementById(ID_BOUTON)) {
return true;
}


/*
* Vérification de VisualEditor.
*/
if (
typeof OO === 'undefined' ||
typeof ve === 'undefined' ||
!ve.init ||
!ve.init.target ||
!ve.init.target.getToolbar
) {
return false;
}


var toolbar =
ve.init.target.getToolbar();


if (!toolbar) {
return false;
}


/* ====================================================
* Création d'un vrai bouton OOUI
* ==================================================== */

var bouton =
new OO.ui.ButtonWidget({
label: 'CARTE',
icon: 'map',
framed: false,
title:
'Ouvrir le Créateur de carte Wikisara'
});


/*
* Identifiant permettant de retrouver le bouton.
*/
bouton.$element.attr(
'id',
ID_BOUTON
);


/*
* Classe spécifique Wikisara.
*/
bouton.$element.addClass(
'wikisara-createur-carte-direct'
);


/* ====================================================
* Action du bouton
* ==================================================== */

bouton.on(
'click',
function () {

window.open(
URL_CREATEUR,
'_blank',
'noopener,noreferrer'
);

}
);


/* ====================================================
* Recherche du groupe "AVANCÉ"
* ==================================================== */

var groupes =
toolbar.$element.find(
'.oo-ui-toolGroup'
);


var groupeAvance = null;


groupes.each(
function () {

var texte =
$(this)
.text()
.replace(/\s+/g, ' ')
.trim();


if (
texte.indexOf('AVANCÉ') !== -1 ||
texte.indexOf('Avancé') !== -1
) {

groupeAvance =
$(this);

return false;
}

}
);


/*
* Si "AVANCÉ" n'est pas trouvé, on ne place
* pas le bouton au hasard.
*/
if (!groupeAvance) {
return false;
}


/* ====================================================
* Placement du bouton
* ==================================================== */

groupeAvance.after(
bouton.$element
);


/*
* Style.
*/
ajouterStyle();


return true;
}


/* ========================================================
* Style du bouton
* ======================================================== */

function ajouterStyle() {

if (
document.getElementById(
'wikisara-createur-carte-style'
)
) {
return;
}


var style =
document.createElement('style');


style.id =
'wikisara-createur-carte-style';


style.textContent = `

/*
* Le bouton est directement intégré
* dans la barre VisualEditor.
*/
#wikisara-createur-carte-direct {

display: inline-flex;

align-items: center;
justify-content: center;

height: 40px;

margin: 0;

padding: 0 10px;

box-sizing: border-box;

border: 0;

border-radius: 0;

background: transparent;

color: inherit;

font-family: inherit;

cursor: pointer;

}


/*
* Texte CARTE
*/
#wikisara-createur-carte-direct
.oo-ui-labelElement-label {

font-size: 13px;

font-weight: 600;

white-space: nowrap;

}


/*
* Icône
*/
#wikisara-createur-carte-direct
.oo-ui-iconElement-icon {

margin-right: 5px;

}


/*
* Survol
*/
#wikisara-createur-carte-direct:hover {

background:
rgba(0, 0, 0, 0.08);

}


/*
* Clic
*/
#wikisara-createur-carte-direct:active {

background:
rgba(0, 0, 0, 0.14);

}


/*
* Focus clavier
*/
#wikisara-createur-carte-direct:focus {

outline:
2px solid currentColor;

outline-offset:
-2px;

}


/*
* Téléphone / petit écran
*/
@media (max-width: 700px) {

#wikisara-createur-carte-direct {

width: 42px;

padding: 0;

}


#wikisara-createur-carte-direct
.oo-ui-labelElement-label {

display: none;

}


#wikisara-createur-carte-direct
.oo-ui-iconElement-icon {

margin-right: 0;

}

}

`;


document.head.appendChild(style);
}


/* ========================================================
* Initialisation
* ======================================================== */

function initialiser() {

/*
* On ne fait qu'une initialisation par activation
* de l'éditeur.
*/
if (initialisationFaite) {
return;
}


/*
* Plusieurs tentatives sont nécessaires car Fandom
* construit progressivement sa barre d'outils.
*/
var tentatives = 0;


var intervalle =
setInterval(
function () {

tentatives++;


if (
ajouterBoutonCarte()
) {

clearInterval(
intervalle
);

initialisationFaite = true;

}


/*
* Maximum 20 secondes.
*/
if (
tentatives >= 40
) {

clearInterval(
intervalle
);

}

},
500
);

}


/* ========================================================
* Déclenchement lorsque VisualEditor est prêt
* ======================================================== */

mw.hook(
've.activationComplete'
).add(
initialiser
);


})();