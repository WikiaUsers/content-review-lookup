/* Tout JavaScript ici sera chargé avec chaque page accédée par n’importe quel utilisateur. */

 // Import [[MediaWiki:Onlyifuploading.js]] 
 
 if ( wgCanonicalSpecialPageName == "Upload" ) {
      document.write('<script type="text/javascript" src="/index.php?title=MediaWiki:Onlyifuploading.js&action=raw&ctype=text/javascript&dontcountme=s"></script>');
 }

 // ============================================================
 // BEGIN import Onlyifediting-functions
 // SEE ALSO [[MediaWiki:Onlyifediting.js]]
 
 if (document.URL.indexOf("action=edit") > 0 || document.URL.indexOf("action=submit") > 0) {
     document.write('<script type="text/javascript" src="/wiki/index.php?title=MediaWiki:Onlyifediting.js&action=raw&ctype=text/javascript&dontcountme=s"></script>');
 }
 
 // END import Onlyifediting-functions
 // ============================================================
/*
<nowiki> */

/*
URL DU WIKI
*/

var url_wiki = 'http://fr.louiseattaque.wikia.com';

/*
FONCTIONS GÉNÉRALES
*/ 

/*
 * Fonctions générales de lancement de fonctions ou de script
 */
 
/**
 * Installation d'une nouvelle fonction de cette façon :
 * addOnloadHook(nom_de_la_fonction); (sans parenthèses)
 * La procédure suivante ne doit plus être utilisée
 */
if (!window.aOnloadFunctions) { 
  var aOnloadFunctions = new Array(); 
}
 
window.onload = function() {
  if (window.aOnloadFunctions) {
    for (var _i=0; _i<aOnloadFunctions.length; _i++) {
      aOnloadFunctions[_i]();
    }
  }
}
 
function addLoadEvent(func) {
  addOnloadHook(func);
}
 
/**
 * insertAfter : insérer un élément dans une page
 */
function insertAfter(parent, node, referenceNode) {
  parent.insertBefore(node, referenceNode.nextSibling); 
}
 
/**
 * getElementsByClass : rechercher les élement de la page dont le paramètre "class" est celui recherché
 */
function getElementsByClass(searchClass,node,tag) {
  if ( node == null ) node = document;
  if ( tag == null ) tag = '*';
  return getElementsByClassName(node,tag,searchClass);
}
 
/**
 * Insérer un javascript d'une page particulière, idée de Mickachu
 */
function loadJs(page) {
 document.write('<script type="text/javascript" src="' +
                url_wiki + '/index.php?title=' + page +
                '&action=raw&ctype=text/javascript&dontcountme=s"></script>');
}
 
/**
 * Projet JavaScript
 */
function obtenir(name) {
  loadJs('MediaWiki:JSScripts/' + name);
}
 
/**
 * Récupère la valeur du cookie
 */
function getCookieVal(name) {
  var cookiePos = document.cookie.indexOf(name + "=");
  var cookieValue = "";
  if (cookiePos > -1) {
      cookiePos += name.length + 1;
      var endPos = document.cookie.indexOf(";", cookiePos);
      if (endPos > -1) {
          cookieValue = document.cookie.substring(cookiePos, endPos);
      } else {
          cookieValue = document.cookie.substring(cookiePos);
      }
  } else {
      cookieValue = false;
  }
  return cookieValue;
}
 
/* Fin des fonctions générales */


/*
CARACTÈRES SPÉCIAUX
*/

/*
 * Ajouter un menu pour choisir des sous-ensembles de caractères spéciaux
 * @note L'ordre de cette liste doit correspondre a celui de MediaWiki:Edittools !
 */
 
function addCharSubsetMenu() {
  var specialchars = document.getElementById('specialchars');
  if (!specialchars) return;
 
  var charSubsetSelect = document.createElement("select");
  charSubsetSelect.setAttribute("style", "display:inline");
  // hard to find something that works both on IE and Fx...
  charSubsetSelect.onchange = function () { chooseCharSubset(this.selectedIndex); };
 
  var LanguesEdittools = [
   "Wiki",
   "Mathématiques",
   "API",
   "Latin/Romain",
   "Grec",
   "Cyrillique",
   "AHD",
   "Diacritiques",
   "Allemand",
   "Arabe",
   "Berbère",
   "Catalan",
   "Croate",
   "Espagnol",
   "Espéranto",
   "Estonien",
   "Gallois",
   "Hawaïen",
   "Hébreu",
   "Hiéroglyphe",
   "Hongrois",
   "Indo-européen",
   "Irlandais",
   "Islandais",
   "Italien",
   "Letton",
   "Lituanien",
   "Maltais",
   "Navajo & Apache",
   "Néerlandais",
   "Pinyin",
   "Polonais",
   "Portugais",
   "Romaji",
   "Roumain",
   "Scandinave",
   "Serbe",
   "Tchèque",
   "Turc",
   "Vieil anglais",
   "Vietnamien",
   "Yiddish" ];
 
  for (var i=0; i<LanguesEdittools.length; i++) {
    var opt = document.createElement("option");
    var txt = document.createTextNode(LanguesEdittools[i]);
    opt.appendChild(txt);
    charSubsetSelect.appendChild(opt);
  }
 
  specialchars.insertBefore(charSubsetSelect, specialchars.childNodes[0]);
 
  /* default subset - try to use a cookie some day */
  chooseCharSubset(0);
}
 
/* choisir la section de caractères spéciaux */
function chooseCharSubset(s) {
  var l = document.getElementById('specialchars').getElementsByTagName('p');
  for (var i = 0; i < l.length ; i++) {
    l[i].style.display = i == s ? 'inline' : 'none';
  }
}
addOnloadHook(addCharSubsetMenu);
 
/* Fin des caractères spéciaux */


/*
BOÎTES DÉROULANTES
*/

/** Collapsible tables *********************************************************
 *
 *  Description: Allows tables to be collapsed, showing only the header. See
 *               [[Wikipedia:NavFrame]].
 *  Maintainers: [[User:R. Koot]]
 */
 
var autoCollapse = 2;
var collapseCaption = "Enrouler";
var expandCaption = "Dérouler";
 
function collapseTable( tableIndex ) {
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
 
function createCollapseButtons() {
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
 
 /** Dynamic Navigation Bars (experimental) *************************************
  *
  *  Description: See [[Wikipedia:NavFrame]].
  *  Maintainers: UNMAINTAINED
  */
 
// set up the words in your language
var NavigationBarHide = '[' + collapseCaption + ']';
var NavigationBarShow = '[' + expandCaption + ']';
 
// shows and hides content and picture (if available) of navigation bars
// Parameters:
//     indexNavigationBar: the index of navigation bar to be toggled
function toggleNavigationBar(indexNavigationBar) {
        var NavToggle = document.getElementById("NavToggle" + indexNavigationBar);
        var NavFrame = document.getElementById("NavFrame" + indexNavigationBar);
 
        if (!NavFrame || !NavToggle) {
                return false;
        }
 
        // if shown now
        if (NavToggle.firstChild.data == NavigationBarHide) {
                for (
                        var NavChild = NavFrame.firstChild;
                        NavChild != null;
                        NavChild = NavChild.nextSibling
                ) {
                if ( hasClass( NavChild, 'NavPic' ) ) {
                        NavChild.style.display = 'none';
                }
                if ( hasClass( NavChild, 'NavContent') ) {
                        NavChild.style.display = 'none';
                }
        }
        NavToggle.firstChild.data = NavigationBarShow;
 
        // if hidden now
        } else if (NavToggle.firstChild.data == NavigationBarShow) {
        for (
                var NavChild = NavFrame.firstChild;
                NavChild != null;
                NavChild = NavChild.nextSibling
        ) {
                if( hasClass(NavChild, 'NavPic') ) {
                        NavChild.style.display = 'block';
                }
                if( hasClass(NavChild, 'NavContent') ) {
                        NavChild.style.display = 'block';
                }
        }
        NavToggle.firstChild.data = NavigationBarHide;
        }
}
 
// adds show/hide-button to navigation bars
function createNavigationBarToggleButton() {
        var indexNavigationBar = 0;
        // iterate over all < div >-elements 
        var divs = document.getElementsByTagName("div");
        for(
                var i=0; 
                NavFrame = divs[i]; 
                i++
                ) {
        // if found a navigation bar
        if( hasClass(NavFrame, "NavFrame") ) {
 
                indexNavigationBar++;
                var NavToggle = document.createElement("a");
                NavToggle.className = 'NavToggle';
                NavToggle.setAttribute('id', 'NavToggle' + indexNavigationBar);
                NavToggle.setAttribute('href', 'javascript:toggleNavigationBar(' + indexNavigationBar + ');');
 
                var NavToggleText = document.createTextNode(NavigationBarHide);
                for (
                        var NavChild = NavFrame.firstChild;
                        NavChild != null;
                        NavChild = NavChild.nextSibling
                        ) {
                if ( hasClass( NavChild, 'NavPic' ) || hasClass( NavChild, 'NavContent' ) ) {
                        if (NavChild.style.display == 'none') {
                                NavToggleText = document.createTextNode(NavigationBarShow);
                                break;
                        }
                }
        }
 
                NavToggle.appendChild(NavToggleText);
                // Find the NavHead and attach the toggle link (Must be this complicated because Moz's firstChild handling is borked)
                for(
                        var j=0;
                        j < NavFrame.childNodes.length;
                        j++
                        ) {
                        if( hasClass(NavFrame.childNodes[j], "NavHead") ) {
                                NavFrame.childNodes[j].appendChild(NavToggle);
                        }
                }
                NavFrame.setAttribute('id', 'NavFrame' + indexNavigationBar);
                }
        }
}
 
addOnloadHook( createNavigationBarToggleButton );
 
 
/** Test if an element has a certain class **************************************
  *
  * Description: Uses regular expressions and caching for better performance.
  * Maintainers: [[User:Mike Dillon]], [[User:R. Koot]], [[User:SG]]
  */
 
var hasClass = (function () {
        var reCache = {};
        return function (element, className) {
                return (reCache[className] ? reCache[className] : (reCache[className] = new RegExp("(?:\\s|^)" + className + "(?:\\s|$)"))).test(element.className);
        };
})();
 

/*
BARRE D'OUTILS
*/


/**
 * Insertion de nouveaux boutons dans la barre d'outil
 */
 
//Remplit la variable mwCustomEditButtons (voir /skins-1.5/commons/wikibits.js) pour ajouter des boutons à la barre d'outils
function addCustomButton(imageFile, speedTip, tagOpen, tagClose, sampleText)
{
 mwCustomEditButtons[mwCustomEditButtons.length] =
 {"imageFile": imageFile,
  "speedTip": speedTip,
  "tagOpen": tagOpen,
  "tagClose": tagClose,
  "sampleText": sampleText};
}

/* 
addCustomButton(url_wiki + '/images/Button_enter.png','Aller à la ligne','<br />','','');

addCustomButton(url_wiki + '/images/Button_nbsp.png','Espace insécable','&nbsp\;','','');

addCustomButton(url_wiki + '/images/Button_small.png','Texte plus petit','<small>','</small>','');

addCustomButton(url_wiki + '/images/Button_big.png','Texte plus grand','<big>','</big>','');

addCustomButton(url_wiki + '/images/Button_upper_letter.png','Exposant','<sup>','</sup>','');

addCustomButton(url_wiki + '/images/Button_lower_letter.png','Indice','<sub>','</sub>','');

addCustomButton(url_wiki + '/images/Button_align_left.png','Texte aligné à gauche','<div style="text-align: left; direction: ltr; margin-left: 1em;">','</div>','Texte aligné à gauche');

addCustomButton(url_wiki + '/images/Button_center.png','Texte centré','<div style="text-align: center;">','</div>','Texte centré');

addCustomButton(url_wiki + '/images/Button_align_right.png','Texte aligné à droite','<div style="text-align: right; direction: ltr; margin-left: 1em;">','</div>','Texte aligné à droite');

addCustomButton(url_wiki + '/images/Button_array.png','Tableau','{|\n|-\n|\n|\n|}','','','mw-editbutton-array');
 
addCustomButton(url_wiki + '/images/Button_strike.png','Rayer','<s>','</s>','');
 
addCustomButton(url_wiki + '/images/Btn_toolbar_enum.png','Énumération','\n# élément 1\n# élément 2\n# élément 3','','');
 
addCustomButton(url_wiki + '/images/Btn_toolbar_liste.png','Liste','\n* élément A\n* élément B\n* élément C','','');
 
addCustomButton(url_wiki + '/images/Btn_toolbar_gallery.png','Galerie d\'images','\n<gallery>\nImage:Exemple.jpg|[[Louise Attaque]]\nImage:Exemple1.jpg|[[Tarmac]]\nImage:Exemple2.jpg|[[Ali Dragon]]\n</gallery>','','');
 
addCustomButton(url_wiki + '/images/Btn_toolbar_commentaire.png','Commentaire','<!--','-->','');
 
addCustomButton(url_wiki + '/images/Button_code.png','Code','<code>','</code>','code');
 
addCustomButton(url_wiki + '/images/Button_pre.png','Texte préformaté','<' + 'pre>','</' + 'pre>','texte préformaté');
 
addCustomButton(url_wiki + '/images/Button_redir.png','Redirection','#REDIRECT [[',']]','nom de la destination');
 
addCustomButton(url_wiki + '/images/Button_template.png','Modèle','{' + '{','}' + '}','nom du modèle');

addCustomButton(url_wiki + '/images/Button_category03.png','Catégorie','[[Catégorie:',']]','nom de la catégorie');

addCustomButton(url_wiki + '/images/Button_ref.png','Référence','<ref>','</ref>','référence, citation ou lien');
 
addCustomButton(url_wiki + '/images/Buttonrefvs8.png','Index des références','== Notes et références ==\n<references />','','');
*/
 
/*
RÉÉCRITURE DES TITRES
*/

/**
 * Réécriture des titres
 *
 * Fonction utilisée par [[Modèle:Titre incorrect]]
 * 
 * La fonction cherche un bandeau de la forme
 * <div id="RealTitleBanner">
 *   <span id="RealTitle">titre</span>
 * </div>
 *
 * Un élément comportant id="DisableRealTitle" désactive la fonction
 */
function rewritePageH1() {
  var realTitleBanner = document.getElementById('RealTitleBanner');
  if (realTitleBanner) {
    if (!document.getElementById('DisableRealTitle')) {
      var realTitle = document.getElementById('RealTitle');
      var h1 = document.getElementsByTagName('h1')[0];
      if (realTitle && h1) {
        var titleText = realTitle.innerHTML;
        if (titleText == '') h1.style.display = 'none';
        else h1.innerHTML = titleText;
        realTitleBanner.style.display = 'none';
      }
    }
  }
}
addOnloadHook(rewritePageH1);

/*
ICÔNES DE TITRE
*/

/*
Icônes de titre
---------------
 
Cherche les icônes de titre (class="icone de titre") et les
déplace à droite du titre de la page.
Doit être exécuté après une éventuelle correction de titre.
*/
 
function IconesDeTitre() {
  var h1 = document.getElementsByTagName("h1")[0];
  var icones = document.getElementsByTagName("div");
  var icones2 = new Array();
  var j = 0;
  for (var i = 0; i < icones.length; ++i) {
    if (icones[i].className == "icone de titre") {
      icones2[j++] = icones[i];
    }
  }
  for (; j > 0; --j) {
    icones2[j-1].style.display = "block"; /* annule display:none par défaut */
    icones2[j-1].style.borderWidth = "1px";
    icones2[j-1].style.borderStyle = "solid";
    icones2[j-1].style.borderColor = "white";
    h1.insertBefore(icones2[j-1], h1.firstChild); /* déplacement de l'élément */
  }
}
addOnloadHook(IconesDeTitre);


/*
==Transformer certaines pages en page de discussion avec le modèle {{M|page de discussion}}==
*/

function TransformeEnDiscussion() {
   var transformeEnPDD = document.getElementById("transformeEnPageDeDiscussion");
   if(transformeEnPDD) document.body.className = "ns-1";
}
 
addOnloadHook(TransformeEnDiscussion);

function TransformeEnArticle() {
   var transformeEnArticle = document.getElementById("transformeEnArticle");
   if(transformeEnArticle) document.body.className = "ns-0";
}
 
addOnloadHook(TransformeEnArticle);


/************************************************************/
/* Strictement spécifiques à un espace de nom ou à une page */
/************************************************************/
 
// ESPACE DE NOM 'ARTICLE'
if( wgNamespaceNumber == 0 ) {
 
 
} // Fin du code concernant l'espace de nom 'Article'
 
 
// PAGE D'ACCUEIL
if( wgTitle == 'Accueil' ) {
 
/**
 * Cache cadres de l'accueil
 *
 * Ajoute un lien sur la page d'accueil pour cacher facilement les cadres
 * Mémorisé par cookie.
 * Copyright 2007, fr:user:Plyd et fr:User:IAlex. Licence GFDL et GPL.
 */
var cookieCacheCadresName = "cacheCadresAccueil";
var CacheCadresVal = {};
var totalCadresAccueil = 0;
 
function affCadreAccueil(id) {
  visible = CacheCadresVal[id] = (!CacheCadresVal[id]);
  getElementsByClass('accueil_contenu',null,'div')[id].style.display = visible ? 'block' : 'none';
  document.getElementById('CacheCadreAccueil' + id).innerHTML = visible ? 'masquer' : 'afficher';
  sauverCookieAccueil();
}
 
function sauverCookieAccueil() {
  var date = new Date();
  date.setTime(date.getTime() + 30*86400*1000);
  var val = 0;
  for ( var i=0; i< totalCadresAccueil ; i++ ) {
    if (!CacheCadresVal[i]) val = val | Math.pow(2,i);
  }
  document.cookie = cookieCacheCadresName + "=" + val + "; expires="+date.toGMTString() + "; path=/";
}
 
function LiensCadresAccueil() {
  if (wgPageName != "Accueil") return;
  cookieCadresAccueil = getCookieVal(cookieCacheCadresName);
  for ( var i=0; i<5; i++) { 
    var titre = getElementsByClass('headergris',document,'h2')[i];
    if (!titre) break;
    titre.innerHTML += " <span style='font-size: xx-small; font-weight: normal; float: none; margin-right:100px' class='editsection'>[<a id='CacheCadreAccueil" + i + "' href='javascript:affCadreAccueil(" + i + ");'>masquer</a>]</span>";
    CacheCadresVal[i] = true;
    totalCadresAccueil++;
  }
  cookieCadresAccueil = getCookieVal(cookieCacheCadresName);
  for ( var i=0; i< totalCadresAccueil ; i++ ) {
    n =Math.pow(2,i);
    aff = !(cookieCadresAccueil & n);
    if (!aff) affCadreAccueil(i);
  }
}
addOnloadHook(LiensCadresAccueil);
} // Fin du code concernant la page d'accueil
 
 
// ESPACE DE NOM 'SPECIAL'
if( wgNamespaceNumber == -1 ) {
 
/**
 * Afficher une explication au nombre de caractères dans la liste de suivi
 */
function toolTipPlusMinus() {
  if(wgCanonicalSpecialPageName != "Watchlist") return
  var tt = "Nombre de caractères d'écart entre les deux dernières versions de la page";
  var elmts = document.getElementsByTagName("span");
  for(var cpt = 0; cpt < elmts.length; cpt++) {
    if (/mw-plusminus-(pos|neg|null)/.test(elmts[cpt].className) || /mw-plusminus-(pos|neg|null)/.test(elmts[cpt].getAttribute("class")))
      elmts[cpt].title = tt;
  }
}
addOnloadHook(toolTipPlusMinus);
 
/**
 * Modifie Special:Search pour pouvoir utiliser différents moteurs de recherche,
 * disponibles dans une boîte déroulante.
 * Auteurs : Jakob Voss, Guillaume, importé depuis la Wiki allemande
 * <pre><nowiki>
 */
 
function externalSearchEngines() {
  if (typeof SpecialSearchEnhanced2Disabled != 'undefined') return;
  if (wgPageName != "Special:Recherche") return;
 
  var mainNode;
  if (document.forms["search"]) { 
    mainNode = document.forms["search"];
  } else {
    mainNode = document.getElementById("powersearch");
    if (!mainNode) return;
    var mainNode = mainNode.lastChild;
    if (!mainNode) return;
 
    while(mainNode.nodeType == 3) {
      mainNode = mainNode.previousSibling;
    }
  }
 
  var firstEngine = "mediawiki";
 
  var choices = document.createElement("div");
  choices.setAttribute("id","searchengineChoices");
  choices.style.textAlign = "center";
 
  var lsearchbox = document.getElementById("powerSearchText");
  var initValue = lsearchbox.value;
 
  var space = "";
 
  for (var id in searchEngines) {
    var engine = searchEngines[id];
if(engine.ShortName)
   {
    if (space) choices.appendChild(space);
    space = document.createTextNode(" ");
 
    var attr = { 
      type: "radio", 
      name: "searchengineselect",
      value: id,
      onFocus: "changeSearchEngine(this.value)",
      id: "searchengineRadio-"+id
    };
 
    var html = "<input";
    for (var a in attr) html += " " + a + "='" + attr[a] + "'";
    html += " />";
    var span = document.createElement("span");
    span.innerHTML = html;
 
    choices.appendChild( span );
    var label = document.createElement("label");
    label.htmlFor = "searchengineRadio-"+id;
 
    label.appendChild( document.createTextNode( engine.ShortName ) );
    choices.appendChild( label );
  }
 }
  mainNode.appendChild(choices);
 
  var input = document.createElement("input");
  input.id = "searchengineextraparam";
  input.type = "hidden";
 
  mainNode.appendChild(input);
 
  changeSearchEngine(firstEngine, initValue);
}
 
function changeSearchEngine(selectedId, searchTerms) {
 
  var currentId = document.getElementById("searchengineChoices").currentChoice;
  if (selectedId == currentId) return;
 
  document.getElementById("searchengineChoices").currentChoice = selectedId;
  var radio = document.getElementById('searchengineRadio-'  + selectedId);
  radio.checked = "checked";
 
  var engine = searchEngines[selectedId];
  var p = engine.Template.indexOf('?');
  var params = engine.Template.substr(p+1);
 
  var form;
  if (document.forms["search"]) {
    form = document.forms["search"];
  } else {
    form = document.getElementById("powersearch");
  }
  form.setAttribute("action", engine.Template.substr(0,p));
 
  var l = ("" + params).split("&");
  for (var i in l) {
    var p = l[i].split("=");
    var pValue = p[1];
 
    if (pValue == "{language}") {
    } else if (pValue == "{searchTerms}") {
      var input;
      if (document.forms["search"]) {
        input = document.getElementById("searchText");
      } else {
        input = document.getElementById("powerSearchText");
      } 
 
      input.name = p[0];
    } else {
      var input = document.getElementById("searchengineextraparam");
 
      input.name = p[0];
      input.value = pValue;
    }
  }
}
if (wgPageName == "Special:Recherche") {
var searchEngines = {
  mediawiki: {
    ShortName: "Recherche interne",
    Template: "/index.php?search={searchTerms}"
  },
  google: {
    ShortName: "Google",
    Template: "http://www.google.fr/search?as_sitesearch=louiseattaquewiki.fr.nf&hl={language}&q={searchTerms}"
  },
 
  wlive: {
    ShortName: "Windows Live",
    Template: "http://search.live.com/results.aspx?q={searchTerms}&q1=site:louiseattaquewiki.fr.nf"
  },
  yahoo: {
    ShortName: "Yahoo!",
    Template: "http://fr.search.yahoo.com/search?p={searchTerms}&vs=louiseattaquewiki.fr.nf"
  }
};
addOnloadHook(externalSearchEngines);
}
 
} // Fin du code concernant l'espace de nom 'Special'
 
 
// ESPACE DE NOM 'UTILISATEUR'
if( wgNamespaceNumber == 2 ) {
 
/* En phase de test */
/* DÉBUT DU CODE JAVASCRIPT DE "CADRE À ONGLETS"
    Fonctionnement du [[Modèle:Cadre à onglets]]
    Modèle implanté par User:Peleguer de http://ca.wikipedia.org
    Actualisé par User:Joanjoc de http://ca.wikipedia.org
    Traduction et adaptation User:Antaya de http://fr.wikipedia.org
*/
function CadreOngletInit(){
 // retour si ailleurs que sur l'espace utilisateur, 
 // sachant que c'est une horreur au niveau de l'accessibilité
 // et qu'il est impossible de "récupérer" ou de recycler ce script
 // (celui-ci fonctionnant par inclusion de sous pages)
 if (wgCanonicalNamespace != 'User') return;  
  var i=0       
  for (i=0;i<=9;i++){
     var vMb = document.getElementById("mb"+i);
     if (!vMb) break;
 
     var j=1    
     var vOgIni = 0  
     for (j=1;j<=9;j++){
        var vBt = document.getElementById("mb"+i+"bt"+j);
        if (!vBt) break;
        vBt.onclick = CadreOngletVoirOnglet;          
        if (vBt.className=="mbBoutonSel") vOgIni=j;  
     }
 
     if (vOgIni == 0) { 
         vOgIni = 1+Math.floor((j-1)*Math.random()) ;
         document.getElementById("mb"+i+"og"+vOgIni).style.display = "block";
         document.getElementById("mb"+i+"og"+vOgIni).style.visibility = "visible";
         document.getElementById("mb"+i+"bt"+vOgIni).className="mbBoutonSel";
     } 
  }
 }
 
 function CadreOngletVoirOnglet(){
  var vMbNom = this.id.substr(0,3); 
  var vIndex = this.id.substr(5,1); 
 
  var i=1
  for (i=1;i<=9;i++){        
        var vOgElem = document.getElementById(vMbNom+"og"+i);
        if (!vOgElem) break;
        if (vIndex==i){ 
                vOgElem.style.display = "block";
                vOgElem.style.visibility = "visible";
                document.getElementById(vMbNom+"bt"+i).className="mbBoutonSel";
        } else {             
                vOgElem.style.display = "none";
                vOgElem.style.visibility = "hidden";
                document.getElementById(vMbNom+"bt"+i).className="mbBouton";
        }
  }
  return false; 
}
addOnloadHook(CadreOngletInit);
/*FIN DU CODE JAVASCRIPT DE "CADRE À ONGLETS"*/
} // Fin du code concernant l'espace de nom 'Utilisateur'

/*
BAS DE PAGE
*/
/*
addOnloadHook(function(){
var code = document.getElementById('footer');
if (!code) return;
code.innerHTML = code.innerHTML
+ '<ul>'
+ '<li><a href="http://www.000webhost.com/">000webhost.com</a></li>'
+ '<li><a href="http://www.azote.org/">Azote.org</a></li>'
+ '</ul>';
});
*/



/*
</nowiki> */