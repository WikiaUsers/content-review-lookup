// *******************************************
// * Nouveaux boutons dans la barre d'outils *
// *******************************************

function addCustomButton(imageFile, speedTip, tagOpen, tagClose, sampleText)
{
 mwCustomEditButtons[mwCustomEditButtons.length] =
 {"imageFile": imageFile,
  "speedTip": speedTip,
  "tagOpen": tagOpen,
  "tagClose": tagClose,
  "sampleText": sampleText};
}

/* Bouton Redirection */
addCustomButton('http://upload.wikimedia.org/wikipedia/commons/4/47/Button_redir.png',
 'Redirection',
 '#REDIRECT [[',
 ']]',
 'nom de la destination',
 'mw-editbutton-redirect');

/* Bouton Sim1 */
addCustomButton('https://images.wikia.nocookie.net/sims/fr/images/3/30/Bouton_Sim1.png','Sim1','{{','}}','Sim1\n|Description\n|image               = \n|bio                 = \n|nom                 = \n|sexe                = \n|âge                 = \n|famille             = \n|parent(s)           = \n|fratrie             = \n|amour(s)            = \n|statut              = \n|enfant(s)           = \n|foyer               = \n|coloc               = \n|animal              = \n|Anatomie\n|espèce              = \n|peau                = \n|corpulence          = \n|cheveux             = \n|yeux                = \n|Personnalité\n|signe1              = \n|Informations\n|apparition          = \n|jouabilité          = \n|mort                = \n|quartier            = \n','');
 
/* Bouton Sim2Fanon */
addCustomButton('https://images.wikia.nocookie.net/sims/fr/images/2/2e/Bouton_Sim2.png','Sim2','{{','}}','Sim2Fanon\n|image               = \n|bio                 = \n|nom                 = \n|sexe                = \n|âge                 = \n|famille             = \n|parent(s)           = \n|fratrie             = \n|amour(s)            = \n|statut              = \n|enfant(s)           = \n|autre(s)            = \n|foyer               = \n|coloc               = \n|animal              = \n|espèce              = \n|peau                = \n|poids               = \n|physique            = \n|cheveux             = \n|yeux                = \n|signe2              = \n|asp                 = \n|apparition          = \n|jouabilité          = \n|mort                = \n|quartier            = \n','');
 
/* Bouton Sim3Fanon */
addCustomButton('https://images.wikia.nocookie.net/sims/fr/images/8/8b/Bouton_Sim3.png','Sim3','{{','}}','Sim3Fanon\n|image               = \n|bio                 = \n|nom                 = \n|sexe                = \n|âge                 = \n|célébrité           = \n|famille             = \n|parent(s)           = \n|fratrie             = \n|amour(s)            = \n|statut              = \n|enfant(s)           = \n|autre(s)            = \n|foyer               = \n|coloc               = \n|animal              = \n|espèce              = \n|peau                = \n|poids               = \n|physique            = \n|cheveux             = \n|yeux                = \n|trait1              = \n|trait2              = \n|trait3              = \n|trait4              = \n|trait5              = \n|signe3              = \n|souhait             = \n|musique             = \n|nourriture          = \n|couleur             = \n|apparition          = \n|jouabilité          = \n|mort                = \n|quartier            = \n','');
 
/* Bouton Simbio-début */
addCustomButton('https://images.wikia.nocookie.net/sims/fr/images/0/0f/Bouton_Simbio-d%C3%A9but.png','Simbio-début','{{','}}','Simbio-début\n|image                 = \n|nom                   = \n|sexe                  = \n|famille               = \n|parent(s)             = \n|fratrie               = \n|amour(s)              = \n|enfant(s)             = \n|autre(s)              = \n','');
 
/* Bouton Simbio1 */
addCustomButton('https://images.wikia.nocookie.net/sims/fr/images/a/a8/Bouton_Simbio1.png','Simbio1','{{','}}','Simbio1\n|image               = \n|bio                 = \n|nom                 = \n|âge                 = \n|statut              = \n|espèce              = \n|peau                = \n|corpulence          = \n|cheveux             = \n|yeux                = \n|signe1              = \n|apparition          = \n|jouabilité          = \n|mort                = \n|quartier            = \n','');
 
/* Bouton Simbio2 */
addCustomButton('https://images.wikia.nocookie.net/sims/fr/images/7/74/Bouton_Simbio2.png','Simbio2','{{','}}','Simbio2\n|image               = \n|bio                 = \n|nom                 = \n|âge                 = \n|statut              = \n|espèce              = \n|peau                = \n|poids               = \n|physique            = \n|cheveux             = \n|yeux                = \n|signe2              = \n|asp                 = \n|apparition          = \n|jouabilité          = \n|mort                = \n|quartier            = \n','');
 
/* Bouton Simbio3 */
addCustomButton('https://images.wikia.nocookie.net/sims/fr/images/1/11/Bouton_Simbio3.png','Simbio3','{{','}}','Simbio3\n|image               = \n|bio                 = \n|nom                 = \n|âge                 = \n|statut              = \n|espèce              = \n|peau                = \n|poids               = \n|physique            = \n|cheveux             = \n|yeux                = \n|trait1              = \n|trait2              = \n|trait3              = \n|trait4              = \n|trait5              = \n|souhait             = \n|musique             = \n|nourriture          = \n|couleur             = \n|apparition          = \n|jouabilité          = \n|mort                = \n|quartier            = \n','');
 
/* Bouton Simbio-fin */
addCustomButton('https://images.wikia.nocookie.net/sims/fr/images/3/3f/Bouton_Simbio-fin.png','Simbio-fin','{{','}}','Simbio-fin','');
 
/* Bouton DEFAULTSORT */
addCustomButton('https://images.wikia.nocookie.net/sims/fr/images/1/14/Bouton_Defaultsort.png','Simbio-fin','{{','}}','DEFAULTSORT:nom de famille, prénom','');

 
/* Test if an element has a certain class **************************************
  *
  * Description: Uses regular expressions and caching for better performance.
  * Taken from Wikipedia's Common.js.
  */
 
 var hasClass = (function () {
     var reCache = {};
     return function (element, className) {
         return (reCache[className] ? reCache[className] : (reCache[className] = new RegExp("(?:\\s|^)" + className + "(?:\\s|$)"))).test(element.className);
     };
 })();

 
/** Collapsible tables *********************************************************
 *
 *  Description: Allows tables to be collapsed, showing only the header. See
 *               [[Wikipedia:NavFrame]].
 *  Maintainers: [[User:R. Koot]]
 */
 
var autoCollapse = 2;
var collapseCaption = "masquer";
var expandCaption = "afficher";
 
function collapseTable( tableIndex )
{
    var Button = document.getElementById( "collapseButton" + tableIndex );
    var Table = document.getElementById( "collapsibleTable" + tableIndex );
 
    if ( !Table || !Button ) {
        return false;
    }
 
    var Rows = Table.rows;
 
    if ( Button.firstChild.data == collapseCaption ) {
        for ( var i = 1; i < Rows.length; i++ ) {
            Rows[i].style.display = "none";
        }
        Button.firstChild.data = expandCaption;
    } else {
        for ( var i = 1; i < Rows.length; i++ ) {
            Rows[i].style.display = Rows[0].style.display;
        }
        Button.firstChild.data = collapseCaption;
    }
}
 
function createCollapseButtons()
{
    var tableIndex = 0;
    var NavigationBoxes = new Object();
    var Tables = document.getElementsByTagName( "table" );
 
    for ( var i = 0; i < Tables.length; i++ ) {
        if ( hasClass( Tables[i], "collapsible" ) ) {
 
            /* only add button and increment count if there is a header row to work with */
            var HeaderRow = Tables[i].getElementsByTagName( "tr" )[0];
            if (!HeaderRow) continue;
            var Header = HeaderRow.getElementsByTagName( "th" )[0];
            if (!Header) continue;
 
            NavigationBoxes[ tableIndex ] = Tables[i];
            Tables[i].setAttribute( "id", "collapsibleTable" + tableIndex );
 
            var Button     = document.createElement( "span" );
            var ButtonLink = document.createElement( "a" );
            var ButtonText = document.createTextNode( collapseCaption );
 
            Button.style.styleFloat = "right";
            Button.style.cssFloat = "right";
            Button.style.fontWeight = "normal";
            Button.style.textAlign = "right";
            Button.style.width = "6em";
 
            ButtonLink.style.color = Header.style.color;
            ButtonLink.setAttribute( "id", "collapseButton" + tableIndex );
            ButtonLink.setAttribute( "href", "javascript:collapseTable(" + tableIndex + ");" );
            ButtonLink.appendChild( ButtonText );
 
            Button.appendChild( document.createTextNode( "[" ) );
            Button.appendChild( ButtonLink );
            Button.appendChild( document.createTextNode( "]" ) );
 
            Header.insertBefore( Button, Header.childNodes[0] );
            tableIndex++;
        }
    }
 
    for ( var i = 0;  i < tableIndex; i++ ) {
        if ( hasClass( NavigationBoxes[i], "collapsed" ) || ( tableIndex >= autoCollapse && hasClass( NavigationBoxes[i], "autocollapse" ) ) ) {
            collapseTable( i );
        }
    }
}
 
addOnloadHook( createCollapseButtons );




// *****************************************************
// * Experimental javascript countdown timer (Splarka) *
// * Version 0.0.3                                     *
// *****************************************************
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
    var tpm = '';
  } else {
    var tpm = '';
  }
 
  // Calculate the diff - Modified by Eladkse
  if ((diff%60) == 1) {
    left = (diff%60) + ' seconde';
  } else {
    left = (diff%60) + ' secondes';
  }
    diff=Math.floor(diff/60);
  if(diff > 0) {
    if ((diff%60) == 1) {
      left = (diff%60) + ' minute, et ' + left;
    } else {
      left = (diff%60) + ' minutes, et ' + left;
    }
  }
    diff=Math.floor(diff/60);
  if(diff > 0) {
    if ((diff%24) == 1) {
      left = (diff%24) + ' heure, ' + left;
    } else {
      left = (diff%24) + ' heures, ' + left;
    }
  }
    diff=Math.floor(diff/24);
  if(diff > 0) {
    if (diff == 1) {
      left = diff + ' jour, ' + left;
    } else {
      left = diff + ' jours, ' + left;
    }
  }
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