importScriptPage('ShowHide/code.js', 'dev');

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

function ouvreChat()
{
  var span = document.getElementsByClassName("openchat");
  for(var i = 0; i < span.length; i++)
  {
    var a = span[i].childNodes[0];
    a.onclick = function() {
   window.open('/wiki/Special:Chat?useskin=wikia', 'fr-mco', 'width=600,height=600,menubar=no,status=no,location=no,toolbar=no,scrollbars=no,resizable=yes');
   return false;
    };
  }
}
 
addOnloadHook ( ouvreChat );