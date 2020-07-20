// ============================================================
// BEGIN Dynamic Navigation Bars

// set up the words in your language
var NavigationBarHide = '▲ Enrouler';
var NavigationBarShow = '▼ Dérouler';

// set up max count of Navigation Bars on page,
// if there are more, all will be hidden
// NavigationBarShowDefault = 0; // all bars will be hidden
// NavigationBarShowDefault = 1; // on pages with more than 1 bar all bars will be hidden
var NavigationBarShowDefault = 0;


// shows and hides content and picture (if available) of navigation bars
// Parameters:
//     indexNavigationBar: the index of navigation bar to be toggled
function toggleNavigationBar(indexNavigationBar)
{
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
            if (NavChild.className == 'NavPic') {
                NavChild.style.display = 'none';
            }
            if (NavChild.className == 'NavContent') {
                NavChild.style.display = 'none';
            }
            if (NavChild.className == 'NavToggle') {
                NavChild.firstChild.data = NavigationBarShow;
            }
        }

    // if hidden now
    } else if (NavToggle.firstChild.data == NavigationBarShow) {
        for (
                var NavChild = NavFrame.firstChild;
                NavChild != null;
                NavChild = NavChild.nextSibling
            ) {
            if (NavChild.className == 'NavPic') {
                NavChild.style.display = 'block';
            }
            if (NavChild.className == 'NavContent') {
                NavChild.style.display = 'block';
            }
            if (NavChild.className == 'NavToggle') {
                NavChild.firstChild.data = NavigationBarHide;
            }
        }
    }
}

// adds show/hide-button to navigation bars
function createNavigationBarToggleButton()
{
    var indexNavigationBar = 0;
    // iterate over all <div>-elements
    for(
            var i=0; 
            NavFrame = document.getElementsByTagName("div")[i]; 
            i++
        ) {
        // if found a navigation bar
        if (NavFrame.className == "NavFrame") {

            indexNavigationBar++;
            var NavToggle = document.createElement("a");
            NavToggle.className = 'NavToggle';
            NavToggle.setAttribute('id', 'NavToggle' + indexNavigationBar);
            NavToggle.setAttribute('href', 'javascript:toggleNavigationBar(' + indexNavigationBar + ');');

            var NavToggleText = document.createTextNode(NavigationBarHide);
            NavToggle.appendChild(NavToggleText);

            // add NavToggle-Button as first div-element 
            // in <div class="NavFrame">
            NavFrame.insertBefore(
                NavToggle,
                NavFrame.firstChild
            );
            NavFrame.setAttribute('id', 'NavFrame' + indexNavigationBar);
        }
    }
    // if more Navigation Bars found than Default: hide all
    if (NavigationBarShowDefault < indexNavigationBar) {
        for(
                var i=1; 
                i<=indexNavigationBar; 
                i++
        ) {
            toggleNavigationBar(i);
        }
    }

}

addOnloadHook ( createNavigationBarToggleButton );

// END Dynamic Navigation Bars
// ============================================================

// DEB Pour les spoilers dans les navigateurs de flashs
// Par [[Utilisateur:Wyz]]

//Note : la fonction getElementsByClassName(oElm, strTagName, oClassNames) est déclarée dans wikibits.js

function toggle_spoilers() {
  //Dans l'élément id "Nav-Flash", on cherche tous les spans ayant la classe "spoiler" et on les affiche/masque
  var spoilers = getElementsByClassName(document.getElementById("Nav-Flash"),"span","spoiler");
  for (var i=0;i < spoilers.length;i++) {
    var elm = spoilers[i];
    elm.style.display = (elm.style.display != 'none' ? 'none' : '' );
  }
}

function init_spoilers() {
  var lien;
  var lien_spoiler;
  var texte_lien;

  if (document.getElementById("Nav-Flash")) {

    //Ce qui suit pour ajouter le lien spoiler dans le navigateur de flashs (on ne peut pas mettre directement la balise <a href>)

    lien = document.createElement("a");
    lien.setAttribute("href", "javascript:toggle_spoilers();");
    lien.setAttribute("title", "Afficher/Masquer les spoilers");
    
    texte_lien = document.createTextNode("Spoilers");
    lien.appendChild(texte_lien);

    lien_spoiler = document.getElementById("LienSpoiler");
    lien_spoiler.appendChild(lien);

  }

}

addOnloadHook ( init_spoilers );

// ----- Caractères spéciaux , source : [http://fr.wiktionary.org/wiki/MediaWiki:Monobook.js]
/**
 * Ajoute le menu pour choisir des sous-ensembles de caractères spéciaux
 * @note :	L'ordre de cette liste doit correspondre à celui de MediaWiki:Edittools !
 */
 
function addCharSubsetMenu() {
  var specialchars = document.getElementById('specialchars');
 
  if (specialchars) {
    var menu = "<select style=\"display:inline\" onChange=\"chooseCharSubset(selectedIndex)\">";
    menu += "<option>Wiki</option>";
    menu += "<option>Math</option>";
    menu += "<option>API</option>";
    menu += "<option>Latin</option>";
    menu += "<option>Grec</option>";
    menu += "<option>Cyrillique</option>";
    menu += "<option>AHD</option>";
    menu += "<option>Diacritiques</option>";
    menu += "<option>Allemand</option>";
    menu += "<option>Arabe</option>";
    menu += "<option>Berbère</option>";
    menu += "<option>Catalan</option>";
    menu += "<option>Croate</option>";
    menu += "<option>Espagnol</option>";
    menu += "<option>Esperanto</option>";
    menu += "<option>Estonien</option>";
    menu += "<option>Gallois</option>";
    menu += "<option>Hawaien</option>";
    menu += "<option>Hebreu</option>";
    menu += "<option>Hieroglyphe</option>";
    menu += "<option>Hongrois</option>";
    menu += "<option>Indo-europeen</option>";
    menu += "<option>Irlandais</option>";
    menu += "<option>Islandais</option>";
    menu += "<option>Italien</option>";
    menu += "<option>Letton</option>";
    menu += "<option>Lituanien</option>";
    menu += "<option>Maltais</option>";
    menu += "<option>Néerlandais</option>";
    menu += "<option>Pinyin</option>";
    menu += "<option>Polonais</option>";
    menu += "<option>Portugais</option>";
    menu += "<option>Romaji</option>";
    menu += "<option>Roumain</option>";
    menu += "<option>Scandinave</option>";
    menu += "<option>Serbe</option>";
    menu += "<option>Tcheque</option>";
    menu += "<option>Serbe</option>";
    menu += "<option>Turc</option>";
    menu += "<option>Vieil anglais</option>";
    menu += "<option>Vietnamien</option>";
    menu += "<option>Yiddish</option>";
    menu += "</select>";
    specialchars.innerHTML = menu + specialchars.innerHTML;
 
    /* default subset - try to use a cookie some day */
    chooseCharSubset(0);
  }
}
 
/* select subsection of special characters */
function chooseCharSubset(s) {
  var l = document.getElementById('specialchars').getElementsByTagName('p');
  for (var i = 0; i < l.length ; i++) {
    l[i].style.display = i == s ? 'inline' : 'none';
    l[i].style.visibility = i == s ? 'visible' : 'hidden';
  }
}

addOnloadHook ( addCharSubsetMenu );

/* Test if an element has a certain class **************************************
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